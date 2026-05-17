import crypto from 'crypto';
import { redis } from './_lib/redis.js';
import { enforceRateLimit } from './_lib/ratelimit.js';
import { readJson } from './_lib/http.js';

const ASAAS_BASE = 'https://api-sandbox.asaas.com/v3';
const PRODUCT_REF = 'bigplayer-checkout';   // etiqueta deste produto (externalReference)
const CLAIM_TTL = 600;                      // 10 min — janela de processamento
const DONE_TTL = 60 * 60 * 24 * 30;         // 30 dias — marca de "já entregue"
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Comparação de token resistente a timing attack.
function safeTokenEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  if (!(await enforceRateLimit(req, res, 'webhook'))) return;

  // Autenticação do webhook
  const expected = process.env.WEBHOOK_TOKEN;
  const token = String(req.headers['asaas-access-token'] || '');
  if (!expected || !safeTokenEqual(token, expected)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { return res.status(400).json({ error: 'JSON inválido' }); }
  }
  if (!body || typeof body !== 'object') return res.status(400).json({ error: 'Body ausente' });

  const { event, payment } = body;
  if (event !== 'PAYMENT_RECEIVED' && event !== 'PAYMENT_CONFIRMED') {
    return res.status(200).json({ ok: true, skipped: 'event' });
  }

  const paymentId = payment?.id;
  if (!paymentId || !/^pay_[\w]+$/.test(paymentId)) {
    return res.status(400).json({ error: 'paymentId inválido' });
  }

  // Libera a reserva de idempotência — só age se NÓS a tivermos feito.
  let weHoldClaim = false;
  const release = async () => {
    if (weHoldClaim && redis) {
      try { await redis.del(`delivery:${paymentId}`); } catch { /* noop */ }
    }
  };

  try {
    // 1. Fonte da verdade: re-consulta o pagamento na API do Asaas
    const payRes = await fetch(`${ASAAS_BASE}/payments/${paymentId}`, {
      headers: { access_token: process.env.ASAAS_API_KEY },
    });
    const payData = await readJson(payRes);
    if (!payRes.ok) {
      console.error(`[webhook] ${paymentId}: erro ao buscar pagamento no Asaas`);
      return res.status(502).json({ error: 'Erro ao buscar pagamento' });
    }

    // 2. Só entrega se realmente pago. Se ainda não consta pago (corrida rara),
    //    responde 503 para o Asaas reenviar — em vez de desistir calado.
    if (payData.status !== 'RECEIVED' && payData.status !== 'CONFIRMED') {
      console.warn(`[webhook] ${paymentId}: status "${payData.status}" ainda não pago — pedindo reenvio`);
      return res.status(503).json({ error: 'Pagamento ainda não confirmado' });
    }

    // 3. Confere se o pagamento é DESTE produto (a conta Asaas pode ter outros projetos)
    if (payData.externalReference !== PRODUCT_REF) {
      console.log(`[webhook] ${paymentId}: ignorado — não é deste produto (ref: ${payData.externalReference})`);
      return res.status(200).json({ ok: true, skipped: 'other-product' });
    }

    // 4. Confere o valor pago contra o preço esperado (aceita preço cheio e PIX com 5% off)
    const expectedPrice    = parseFloat(process.env.PRODUCT_PRICE);
    const expectedPricePix = Math.round(expectedPrice * 0.95 * 100) / 100;
    const paidValue        = Number(payData.value);
    if (Number.isFinite(expectedPrice) && paidValue !== expectedPrice && paidValue !== expectedPricePix) {
      console.error(`[webhook] ${paymentId}: VALOR DIVERGENTE — pago ${paidValue}, esperado ${expectedPrice} ou ${expectedPricePix}.`);
      return res.status(200).json({ ok: true, skipped: 'value-mismatch' });
    }

    // 5. Idempotência: só AGORA reserva a entrega — apenas entregas reais consomem reserva.
    if (redis) {
      let r;
      try {
        r = await redis.set(`delivery:${paymentId}`, 'processing', { nx: true, ex: CLAIM_TTL });
      } catch {
        r = 'OK'; // Redis indisponível — segue (fail-open) para não perder a entrega
      }
      if (r !== 'OK') {
        console.log(`[webhook] ${paymentId}: já entregue — ignorando duplicata`);
        return res.status(200).json({ ok: true, skipped: 'already-delivered' });
      }
      weHoldClaim = true;
    }

    // 6. Busca o cliente
    const custRes = await fetch(`${ASAAS_BASE}/customers/${payData.customer}`, {
      headers: { access_token: process.env.ASAAS_API_KEY },
    });
    const customer = await readJson(custRes);
    if (!custRes.ok) {
      await release();
      console.error(`[webhook] ${paymentId}: erro ao buscar cliente`);
      return res.status(502).json({ error: 'Erro ao buscar cliente' });
    }

    const email = customer.email;
    if (!email || !EMAIL_RE.test(email)) {
      await release();
      console.error(`[webhook] ${paymentId}: e-mail do cliente inválido`);
      return res.status(502).json({ error: 'E-mail do cliente inválido' });
    }
    const safeName = escapeHtml(customer.name || 'cliente');

    // 7. Baixa o arquivo do produto (Blob privado — URL permanente + token)
    const fileRes = await fetch(process.env.BLOB_FILE_URL, {
      headers: { Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` },
    });
    if (!fileRes.ok) {
      await release();
      console.error(`[webhook] ${paymentId}: erro ao baixar arquivo do Blob`);
      return res.status(502).json({ error: 'Erro ao baixar arquivo' });
    }
    const fileBuffer = await fileRes.arrayBuffer();
    const fileBase64 = Buffer.from(fileBuffer).toString('base64');

    // 8. Envia o e-mail de entrega
    const mailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'noreply@devgus.com.br',
        to: [email],
        subject: 'Seu arquivo está aqui!',
        html: `<div style="font-family:sans-serif;max-width:480px;margin:0 auto">
          <h2>Obrigado pela sua compra, ${safeName}!</h2>
          <p>Seu arquivo está anexado neste email. É só baixar e aproveitar.</p>
          <p>Qualquer dúvida, responda este email.</p>
        </div>`,
        attachments: [{ filename: 'SetupDindexBigPlayer-MT4-MT5.zip', content: fileBase64 }],
      }),
    });

    if (!mailRes.ok) {
      await release(); // libera a reserva para o Asaas reenviar e tentar de novo
      console.error(`[webhook] ${paymentId}: erro ao enviar e-mail (Resend)`);
      return res.status(502).json({ error: 'Erro ao enviar email' });
    }

    // 9. Sucesso: marca como entregue por 30 dias — qualquer duplicata futura é ignorada
    if (redis) {
      try { await redis.set(`delivery:${paymentId}`, 'done', { ex: DONE_TTL }); } catch { /* noop */ }
    }
    console.log(`[webhook] ${paymentId}: entregue com sucesso`);
    return res.status(200).json({ ok: true });
  } catch (err) {
    await release();
    console.error(`[webhook] ${paymentId}: erro interno —`, err?.message);
    return res.status(500).json({ error: 'Erro interno' });
  }
}
