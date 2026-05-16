import crypto from 'crypto';
import { redis } from './_lib/redis.js';
import { enforceRateLimit } from './_lib/ratelimit.js';

const ASAAS_BASE = 'https://api-sandbox.asaas.com/v3';
const CLAIM_TTL = 600;                  // 10 min — janela de processamento
const DONE_TTL = 60 * 60 * 24 * 30;     // 30 dias — marca de "já entregue"
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

  // ── Idempotência: tenta "reservar" a entrega deste pagamento ──────────
  // Se a chave já existe, outro webhook (duplicado/reentrega) já tratou.
  let claimed = true;
  if (redis) {
    try {
      const r = await redis.set(`delivery:${paymentId}`, 'processing', { nx: true, ex: CLAIM_TTL });
      claimed = r === 'OK';
    } catch {
      claimed = true; // Redis indisponível — segue (fail-open) para não perder a entrega
    }
  }
  if (!claimed) {
    return res.status(200).json({ ok: true, skipped: 'already-delivered' });
  }

  const release = async () => {
    if (redis) { try { await redis.del(`delivery:${paymentId}`); } catch { /* noop */ } }
  };

  try {
    // Fonte da verdade: re-consulta o pagamento na API do Asaas
    const payRes = await fetch(`${ASAAS_BASE}/payments/${paymentId}`, {
      headers: { access_token: process.env.ASAAS_API_KEY },
    });
    const payData = await payRes.json();
    if (!payRes.ok) { await release(); return res.status(502).json({ error: 'Erro ao buscar pagamento' }); }

    // Só entrega se o pagamento estiver realmente pago
    if (payData.status !== 'RECEIVED' && payData.status !== 'CONFIRMED') {
      return res.status(200).json({ ok: true, skipped: 'not-paid' });
    }

    // Confere o valor pago contra o preço esperado do produto
    const expectedPrice = parseFloat(process.env.PRODUCT_PRICE);
    if (Number.isFinite(expectedPrice) && Number(payData.value) !== expectedPrice) {
      return res.status(200).json({ ok: true, skipped: 'value-mismatch' });
    }

    const custRes = await fetch(`${ASAAS_BASE}/customers/${payData.customer}`, {
      headers: { access_token: process.env.ASAAS_API_KEY },
    });
    const customer = await custRes.json();
    if (!custRes.ok) { await release(); return res.status(502).json({ error: 'Erro ao buscar cliente' }); }

    const email = customer.email;
    if (!email || !EMAIL_RE.test(email)) {
      await release();
      return res.status(502).json({ error: 'E-mail do cliente inválido' });
    }
    const safeName = escapeHtml(customer.name || 'cliente');

    // Baixa o arquivo do Blob privado usando a URL permanente + token.
    const fileRes = await fetch(process.env.BLOB_FILE_URL, {
      headers: { Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` },
    });
    if (!fileRes.ok) { await release(); return res.status(502).json({ error: 'Erro ao baixar arquivo' }); }
    const fileBuffer = await fileRes.arrayBuffer();
    const fileBase64 = Buffer.from(fileBuffer).toString('base64');

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
      // Libera a reserva para o Asaas reenviar o webhook e tentar de novo
      await release();
      return res.status(502).json({ error: 'Erro ao enviar email' });
    }

    // Sucesso: marca como entregue por 30 dias — qualquer duplicata futura é ignorada
    if (redis) {
      try { await redis.set(`delivery:${paymentId}`, 'done', { ex: DONE_TTL }); } catch { /* noop */ }
    }
    return res.status(200).json({ ok: true });
  } catch {
    await release();
    return res.status(500).json({ error: 'Erro interno' });
  }
}
