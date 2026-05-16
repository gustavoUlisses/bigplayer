import { enforceRateLimit } from './_lib/ratelimit.js';
import { readJson } from './_lib/http.js';

const ASAAS_BASE = 'https://api-sandbox.asaas.com/v3';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  if (!(await enforceRateLimit(req, res, 'standard'))) return;

  const { paymentId } = req.query;
  if (!paymentId || !/^pay_[\w]+$/.test(paymentId)) {
    return res.status(400).json({ error: 'paymentId inválido' });
  }

  try {
    const response = await fetch(`${ASAAS_BASE}/payments/${paymentId}/pixQrCode`, {
      headers: { access_token: process.env.ASAAS_API_KEY },
    });

    const data = await readJson(response);

    if (!response.ok) {
      return res.status(response.status).json({ error: data.errors?.[0]?.description || 'Erro ao buscar QR code' });
    }

    return res.status(200).json({
      encodedImage: data.encodedImage,
      payload: data.payload,
      expirationDate: data.expirationDate,
    });
  } catch {
    return res.status(500).json({ error: 'Erro interno' });
  }
}
