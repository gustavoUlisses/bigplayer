import { enforceRateLimit, clientIp } from './_lib/ratelimit.js';
import { readJson } from './_lib/http.js';

const ASAAS_BASE = 'https://api-sandbox.asaas.com/v3';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const body = req.body || {};
  const customerId = typeof body.customerId === 'string' ? body.customerId.trim() : '';
  const billingType = body.billingType;
  const { creditCard, creditCardHolderInfo } = body;
  const installments = billingType === 'CREDIT_CARD' ? (parseInt(body.installments) || 1) : 1;

  if (!/^cus_[\w]+$/.test(customerId)) {
    return res.status(400).json({ error: 'customerId inválido' });
  }
  if (!['PIX', 'CREDIT_CARD'].includes(billingType)) {
    return res.status(400).json({ error: 'billingType inválido' });
  }
  if (![1, 2, 3].includes(installments)) {
    return res.status(400).json({ error: 'Parcelamento inválido' });
  }

  // Cartão usa limite estrito (anti card-testing); PIX usa o limite padrão.
  const bucket = billingType === 'CREDIT_CARD' ? 'charge' : 'standard';
  if (!(await enforceRateLimit(req, res, bucket))) return;

  const today = new Date().toISOString().split('T')[0];

  // O valor vem SEMPRE do servidor — o frontend não envia preço.
  // PIX tem R$5 de desconto; cartão paga com juros compostos de 1,99% a.m. quando parcelado.
  const basePrice = parseFloat(process.env.PRODUCT_PRICE);

  function calcInstallment(principal, n, rate = 0.0199) {
    if (n === 1) return principal;
    return Math.round((principal * rate * Math.pow(1 + rate, n)) / (Math.pow(1 + rate, n) - 1) * 100) / 100;
  }

  const installmentValue = calcInstallment(basePrice, installments);
  const totalValue = billingType === 'PIX' ? basePrice - 5 : Math.round(installmentValue * installments * 100) / 100;

  const payload = {
    customer: customerId,
    billingType,
    value: totalValue,
    dueDate: today,
    description: 'Compra de produto digital',
    externalReference: 'bigplayer-checkout',
  };

  if (billingType === 'CREDIT_CARD') {
    if (!creditCard || typeof creditCard !== 'object' ||
        !creditCardHolderInfo || typeof creditCardHolderInfo !== 'object') {
      return res.status(400).json({ error: 'Dados do cartão são obrigatórios' });
    }
    if (installments > 1) {
      payload.installmentCount = installments;
      payload.installmentValue = installmentValue;
    }
    // Os dados do cartão apenas trafegam até o Asaas — nunca são gravados nem logados.
    payload.creditCard = creditCard;
    payload.creditCardHolderInfo = creditCardHolderInfo;
    // remoteIp é definido pelo servidor (não se confia no cliente) — usado pela antifraude.
    payload.remoteIp = clientIp(req);
  }

  try {
    const response = await fetch(`${ASAAS_BASE}/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        access_token: process.env.ASAAS_API_KEY,
      },
      body: JSON.stringify(payload),
    });

    const data = await readJson(response);

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
