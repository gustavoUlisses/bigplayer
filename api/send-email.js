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

// Rota desativada — entrega de email é feita exclusivamente pelo webhook (/api/webhook.js)
export default async function handler(req, res) {
  return res.status(410).json({ error: 'Gone' });
  // eslint-disable-next-line no-unreachable
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { to, name, paymentId } = req.body;
  if (!to || !name || !paymentId) {
    return res.status(400).json({ error: 'to, name e paymentId são obrigatórios' });
  }

  // Valida email básico
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
    return res.status(400).json({ error: 'Email inválido' });
  }

  // Confirma com o Asaas que o pagamento realmente foi confirmado antes de enviar
  try {
    const checkRes = await fetch(`${ASAAS_BASE}/payments/${paymentId}`, {
      headers: { 'access_token': process.env.ASAAS_API_KEY },
    });
    const payment = await checkRes.json();

    if (payment.status !== 'CONFIRMED' && payment.status !== 'RECEIVED') {
      return res.status(402).json({ error: 'Pagamento não confirmado' });
    }
  } catch {
    return res.status(500).json({ error: 'Erro ao verificar pagamento' });
  }

  try {
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
        attachments: [
          {
            filename: 'arquivo-teste.zip',
            content: fileBase64,
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.message || 'Erro ao enviar email' });
    }

    return res.status(200).json({ ok: true, emailId: data.id });
  } catch {
    return res.status(500).json({ error: 'Erro interno ao enviar email' });
  }
}
