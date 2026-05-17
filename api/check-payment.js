import { readJson } from './_lib/http.js';

const ASAAS_BASE = 'https://api-sandbox.asaas.com/v3';

// Sem rate limit aqui: este endpoint só LÊ o status do pagamento (baixo risco)
// e é consultado em loop pelo polling — limitá-lo gastaria muito do Upstash à toa.
export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { paymentId } = req.query;
  if (!paymentId || !/^pay_[\w]+$/.test(paymentId)) {
    return res.status(400).json({ error: 'paymentId inválido' });
  }

  try {
    const response = await fetch(`${ASAAS_BASE}/payments/${paymentId}`, {
      headers: { access_token: process.env.ASAAS_API_KEY },
    });

    const data = await readJson(response);

    if (!response.ok) {
      return res.status(response.status).json({ error: data.errors?.[0]?.description || 'Erro ao verificar pagamento' });
    }

    return res.status(200).json({ status: data.status });
  } catch {
    return res.status(500).json({ error: 'Erro interno' });
  }
}
