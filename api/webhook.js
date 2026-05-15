import fs from 'fs';
import path from 'path';

const ASAAS_BASE = 'https://api-sandbox.asaas.com/v3';

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const token = req.headers['asaas-access-token'];
  if (!token || token !== process.env.WEBHOOK_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { return res.status(400).json({ error: 'JSON inválido' }); }
  }
  if (!body) return res.status(400).json({ error: 'Body ausente' });

  const { event, payment } = body;

  if (event !== 'PAYMENT_CONFIRMED' && event !== 'PAYMENT_RECEIVED') {
    return res.status(200).json({ ok: true, skipped: true });
  }

  const paymentId = payment?.id;
  if (!paymentId) return res.status(400).json({ error: 'paymentId ausente' });

  try {
    // Busca pagamento no Asaas
    const payRes = await fetch(`${ASAAS_BASE}/payments/${paymentId}`, {
      headers: { 'access_token': process.env.ASAAS_API_KEY },
    });
    const payData = await payRes.json();
    if (!payRes.ok) return res.status(500).json({ error: 'Erro ao buscar pagamento' });

    // Busca cliente no Asaas
    const custRes = await fetch(`${ASAAS_BASE}/customers/${payData.customer}`, {
      headers: { 'access_token': process.env.ASAAS_API_KEY },
    });
    const customer = await custRes.json();
    if (!custRes.ok) return res.status(500).json({ error: 'Erro ao buscar cliente' });

    const email = customer.email;
    const safeName = escapeHtml(customer.name);

    // Lê o arquivo zip
    const filePath = path.join(process.cwd(), 'public', 'arquivo-teste.zip');
    const fileBase64 = fs.readFileSync(filePath).toString('base64');

    // Envia email via Resend
    const mailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
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
        attachments: [{ filename: 'arquivo-teste.zip', content: fileBase64 }],
      }),
    });

    if (!mailRes.ok) {
      const mailErr = await mailRes.json();
      return res.status(500).json({ error: mailErr.message || 'Erro ao enviar email' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
