import { enforceRateLimit } from './_lib/ratelimit.js';

const ASAAS_BASE = 'https://api-sandbox.asaas.com/v3';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  if (!(await enforceRateLimit(req, res, 'standard'))) return;

  const body = req.body || {};
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const cpfCnpj = typeof body.cpfCnpj === 'string' ? body.cpfCnpj.replace(/\D/g, '') : '';

  if (name.length < 2 || name.length > 100) {
    return res.status(400).json({ error: 'Nome inválido' });
  }
  if (!EMAIL_RE.test(email) || email.length > 150) {
    return res.status(400).json({ error: 'E-mail inválido' });
  }
  if (cpfCnpj.length !== 11 && cpfCnpj.length !== 14) {
    return res.status(400).json({ error: 'CPF/CNPJ inválido' });
  }

  try {
    const response = await fetch(`${ASAAS_BASE}/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        access_token: process.env.ASAAS_API_KEY,
      },
      body: JSON.stringify({ name, email, cpfCnpj }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.errors?.[0]?.description || 'Erro ao criar cliente' });
    }

    return res.status(200).json({ customerId: data.id });
  } catch {
    return res.status(500).json({ error: 'Erro interno' });
  }
}
