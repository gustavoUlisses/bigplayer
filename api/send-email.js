import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { to, name } = req.body;
  if (!to || !name) return res.status(400).json({ error: 'to e name são obrigatórios' });

  try {
    const filePath = path.join(process.cwd(), 'public', 'arquivo-teste.zip');
    const fileBuffer = fs.readFileSync(filePath);
    const fileBase64 = fileBuffer.toString('base64');

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
            <h2>Obrigado pela sua compra, ${name}!</h2>
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
  } catch (err) {
    return res.status(500).json({ error: 'Erro interno ao enviar email' });
  }
}
