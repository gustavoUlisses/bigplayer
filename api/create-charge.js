const ASAAS_BASE = 'https://api-sandbox.asaas.com/v3';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { customerId, billingType, remoteIp, creditCard, creditCardHolderInfo } = req.body;
  if (!customerId || !billingType) {
    return res.status(400).json({ error: 'customerId e billingType são obrigatórios' });
  }
  if (!['PIX', 'CREDIT_CARD'].includes(billingType)) {
    return res.status(400).json({ error: 'billingType inválido' });
  }

  const today = new Date().toISOString().split('T')[0];

  const payload = {
    customer: customerId,
    billingType,
    value: parseFloat(process.env.PRODUCT_PRICE),
    dueDate: today,
    description: 'Compra de produto digital',
  };

  if (billingType === 'CREDIT_CARD') {
    if (!remoteIp || !creditCard || !creditCardHolderInfo) {
      return res.status(400).json({ error: 'Dados do cartão são obrigatórios' });
    }
    payload.remoteIp = remoteIp;
    payload.creditCard = creditCard;
    payload.creditCardHolderInfo = creditCardHolderInfo;
  }

  try {
    const response = await fetch(`${ASAAS_BASE}/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access_token': process.env.ASAAS_API_KEY,
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
  } catch (err) {
    return res.status(500).json({ error: 'Erro interno' });
  }
}
