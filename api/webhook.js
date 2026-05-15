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

async function sendEmail(to, name) {
  const filePath = path.join(process.cwd(), 'public', 'arquivo-teste.zip');
  const fileBuffer = fs.readFileSync(filePath);
  const fileBase64 = fileBuffer.toString('base64');
  const safeName = escapeHtml(name);

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'noreply@devgus.com.br',
      to: [to],
      subject: 'Seu arquivo está aqui!',
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
          <h2>Obrigado pela sua compra, ${safeName}!</h2>
          <p>Seu arquivo está anexado neste email. É só baixar e aproveitar.</p>
          <p>Qualquer dúvida, responda este email.</p>
        </div>
      `,
      attachments: [{ filename: 'arquivo-teste.zip', content: fileBase64 }],
    }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || 'Erro ao enviar email');
  }
}

async function getPaymentCustomer(paymentId) {
  const res = await fetch(`${ASAAS_BASE}/payments/${paymentId}`, {
    headers: { 'access_token': process.env.ASAAS_API_KEY },
  });
  const payment = await res.json();
  if (!res.ok) throw new Error('Erro ao buscar pagamento');

  const custRes = await fetch(`${ASAAS_BASE}/customers/${payment.customer}`, {
    headers: { 'access_token': process.env.ASAAS_API_KEY },
  });
  const customer = await custRes.json();
  if (!custRes.ok) throw new Error('Erro ao buscar cliente');

  return { email: customer.email, name: customer.name };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Valida o token do Asaas
  const token = req.headers['asaas-access-token'];
  if (!token || token !== process.env.WEBHOOK_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { event, payment } = req.body;

  // Só processa eventos de pagamento confirmado
  if (event !== 'PAYMENT_CONFIRMED' && event !== 'PAYMENT_RECEIVED') {
    return res.status(200).json({ ok: true, skipped: true });
  }

  // PIX dispara PAYMENT_RECEIVED direto (sem PAYMENT_CONFIRMED)
  // Cartão dispara PAYMENT_CONFIRMED — processamos nos dois para cobrir ambos
  const paymentId = payment?.id;
  if (!paymentId) return res.status(400).json({ error: 'paymentId ausente' });

  try {
    const { email, name } = await getPaymentCustomer(paymentId);
    await sendEmail(email, name);
    return res.status(200).json({ ok: true });
  } catch (err) {
    // Retorna 500 para o Asaas tentar reenviar automaticamente
    return res.status(500).json({ error: err.message });
  }
}
