const ASAAS_BASE = 'https://api-sandbox.asaas.com/v3';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, cpfCnpj } = req.body;
  if (!name || !email || !cpfCnpj) {
    return res.status(400).json({ error: 'name, email e cpfCnpj são obrigatórios' });
  }

  try {
    const response = await fetch(`${ASAAS_BASE}/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access_token': process.env.ASAAS_API_KEY,
      },
      body: JSON.stringify({ name, email, cpfCnpj }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.errors?.[0]?.description || 'Erro ao criar cliente' });
    }

    return res.status(200).json({ customerId: data.id });
  } catch (err) {
    return res.status(500).json({ error: 'Erro interno' });
  }
}
