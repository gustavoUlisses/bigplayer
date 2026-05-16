import { enforceRateLimit } from './_lib/ratelimit.js';

const ASAAS_BASE = 'https://api-sandbox.asaas.com/v3';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const body = req.body || {};
  const customerId = typeof body.customerId === 'string' ? body.customerId.trim() : '';
  const billingType = body.billingType;

  if (!/^cus_[\w]+$/.test(customerId)) {
    return res.status(400).json({ error: 'customerId inválido' });
  }
  if (!['PIX', 'CREDIT_CARD'].includes(billingType)) {
    return res.status(400).json({ error: 'billingType inválido' });
  }

  // Cartão usa limite estrito (anti card-testing); PIX usa o limite padrão.
  const bucket = billingType === 'CREDIT_CARD' ? 'charge' : 'standard';
  if (!(await enforceRateLimit(req, res, bucket))) return;

  const today = new Date().toISOString().split('T')[0];

  // O valor vem SEMPRE do servidor — o frontend não envia preço.
  // Dados de cartão NÃO são aceitos aqui: o pagamento com cartão é feito
  // no ambiente hospedado do Asaas (invoiceUrl), fora deste servidor.
  const payload = {
    customer: customerId,
    billingType,
    value: parseFloat(process.env.PRODUCT_PRICE),
    dueDate: today,
    description: 'Compra de produto digital',
  };

  try {
    const response = await fetch(`${ASAAS_BASE}/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        access_token: process.env.ASAAS_API_KEY,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.errors?.[0]?.description || 'Erro ao criar cobrança' });
    }

    return res.status(200).json({
      paymentId: data.id,
      status: data.status,
      invoiceUrl: data.invoiceUrl,
    });
  } catch {
    return res.status(500).json({ error: 'Erro interno' });
  }
}
