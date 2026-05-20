// ── STATE ────────────────────────────────────────────────────
let state = {
  customerId: null,
  paymentId: null,
  billingType: 'PIX',
  name: '',
  email: '',
  cpf: '',
  pollingTimer: null,
};

// ── DOM REFS ─────────────────────────────────────────────────
const overlay       = document.getElementById('modal-overlay');
const btnClose      = document.getElementById('btn-close-modal');
const formCheckout  = document.getElementById('form-checkout');
const formCard      = document.getElementById('form-card');
const formError     = document.getElementById('form-error');
const cardError     = document.getElementById('card-error');

const steps = {
  1:    document.getElementById('step-1'),
  pix:  document.getElementById('step-pix'),
  card: document.getElementById('step-card'),
  ok:   document.getElementById('step-confirmed'),
};

// ── PREÇOS ────────────────────────────────────────────────────
const PRICE_FULL = 29.90;
const PRICE_PIX  = 24.90;

function updatePriceSummary(billing) {
  const bar   = document.getElementById('pix-discount-bar');
  const price = document.getElementById('summary-price');
  const tag   = document.getElementById('summary-tag');
  if (!bar || !price) return;
  if (billing === 'PIX') {
    bar.style.display = 'block';
    price.textContent = 'R$24,90';
    tag.textContent   = 'R$5 off no PIX';
  } else {
    bar.style.display = 'none';
    price.textContent = 'R$29,90';
    tag.textContent   = 'à vista';
  }
}

// atualiza ao trocar forma de pagamento
document.querySelectorAll('input[name="payment"]').forEach((radio) => {
  radio.addEventListener('change', () => updatePriceSummary(radio.value));
});
// estado inicial (PIX marcado por padrão)
updatePriceSummary('PIX');

// ── MODAL ─────────────────────────────────────────────────────
// TEMPORÁRIO: enquanto o site está em desenvolvimento, todos os botões "Comprar"
// redirecionam para o WhatsApp com uma mensagem de interesse de compra,
// em vez de abrirem o modal de checkout. Para reverter, basta trocar
// `redirectToWhatsApp` por `openModal` na linha abaixo.
const WA_NUMBER  = '5511915790207';
const WA_MESSAGE = '*[Site Setup Didi Index]*\n\nOlá! Tenho interesse em comprar o Setup do Didi Index. Pode me ajudar?';
function redirectToWhatsApp(e) {
  if (e && e.preventDefault) e.preventDefault();
  window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(WA_MESSAGE), '_blank');
}
document.querySelectorAll('.js-buy').forEach((b) => b.addEventListener('click', redirectToWhatsApp));
btnClose.addEventListener('click', closeModal);
overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

function openModal() {
  overlay.classList.add('is-open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  showStep(1);
}

function closeModal() {
  overlay.classList.remove('is-open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  stopPolling();
  resetState();
}

document.getElementById('btn-confirmed-close').addEventListener('click', closeModal);

// ── STEP NAV ──────────────────────────────────────────────────
function showStep(key) {
  Object.values(steps).forEach(el => {
    el.classList.add('step--hidden');
    el.style.display = 'none';
  });
  const target = steps[key];
  target.style.display = 'block';
  target.classList.remove('step--hidden');
  target.style.animation = 'none';
  target.offsetHeight;
  target.style.animation = '';
  updateProgress(key);
}

function updateProgress(key) {
  const items = document.querySelectorAll('.step-progress__item');
  const lines = document.querySelectorAll('.step-progress__line');
  const stepNum = key === 1 ? 1 : (key === 'pix' || key === 'card') ? 2 : 3;
  items.forEach((item, i) => {
    const n = i + 1;
    item.classList.toggle('active', n === stepNum);
    item.classList.toggle('done', n < stepNum);
  });
  lines.forEach((line, i) => {
    line.classList.toggle('done', i + 1 < stepNum);
  });
}

// ── CPF MASK ──────────────────────────────────────────────────
document.getElementById('inp-cpf').addEventListener('input', (e) => {
  let v = e.target.value.replace(/\D/g, '').slice(0, 11);
  if (v.length > 9)      v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
  else if (v.length > 6) v = v.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
  else if (v.length > 3) v = v.replace(/(\d{3})(\d{1,3})/, '$1.$2');
  e.target.value = v;
});

// ── CEP MASK ──────────────────────────────────────────────────
document.getElementById('inp-card-cep').addEventListener('input', (e) => {
  let v = e.target.value.replace(/\D/g, '').slice(0, 8);
  if (v.length > 5) v = v.slice(0, 5) + '-' + v.slice(5);
  e.target.value = v;
});

// ── CARD BRAND DETECTION ──────────────────────────────────────
const BRAND_SVGS = {
  visa:       `<img src="/images/visa.png" alt="Visa" class="card-brand-img">`,
  mastercard: `<img src="/images/mastercard.png" alt="Mastercard" class="card-brand-img">`,
  amex:       `<img src="/images/amex.png" alt="Amex" class="card-brand-img">`,
  elo:        `<img src="/images/elo.png" alt="Elo" class="card-brand-img">`,
  hipercard:  `<img src="/images/hipercard.png" alt="Hipercard" class="card-brand-img">`,
  diners:     `<img src="/images/diners.png" alt="Diners" class="card-brand-img">`,
  default:    `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" opacity=".3"><rect x="2" y="5" width="20" height="14" rx="3" stroke="#9ca3af" stroke-width="1.5"/><path d="M2 10h20" stroke="#9ca3af" stroke-width="1.5"/><circle cx="7" cy="15" r="1.2" fill="#9ca3af"/></svg>`,
};

function detectBrand(num) {
  const n = num.replace(/\D/g, '');
  if (/^4/.test(n)) return 'visa';
  if (/^5[1-5]|^2[2-7]/.test(n)) return 'mastercard';
  if (/^3[47]/.test(n)) return 'amex';
  if (/^(636368|438935|504175|451416|636297|5067|4576|4011)/.test(n)) return 'elo';
  if (/^(384100|384140|384160|606282|637095|637599|637568)/.test(n)) return 'hipercard';
  if (/^(30[0-5]|36|38)/.test(n)) return 'diners';
  return 'default';
}

// ── CARD MASKS ────────────────────────────────────────────────
document.getElementById('inp-card-number').addEventListener('input', (e) => {
  let v = e.target.value.replace(/\D/g, '').slice(0, 16);
  v = v.replace(/(\d{4})(?=\d)/g, '$1 ');
  e.target.value = v;
  const icon = document.getElementById('card-brand-icon');
  if (icon) icon.innerHTML = BRAND_SVGS[detectBrand(v)] || BRAND_SVGS.default;
});

document.getElementById('inp-card-expiry').addEventListener('input', (e) => {
  let v = e.target.value.replace(/\D/g, '').slice(0, 4);
  if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2);
  e.target.value = v;
});

// ── PHONE MASK ────────────────────────────────────────────────
document.getElementById('inp-card-phone').addEventListener('input', (e) => {
  let v = e.target.value.replace(/\D/g, '').slice(0, 11);
  if (v.length > 10)     v = v.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
  else if (v.length > 6) v = v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
  else if (v.length > 2) v = v.replace(/(\d{2})(\d{0,5})/, '($1) $2');
  else if (v.length > 0) v = v.replace(/(\d{0,2})/, '($1');
  e.target.value = v;
});

// ── PIX COPY ─────────────────────────────────────────────────
document.getElementById('btn-copy-pix').addEventListener('click', () => {
  const payload = document.getElementById('pix-payload').textContent;
  navigator.clipboard.writeText(payload).then(() => {
    const btn = document.getElementById('btn-copy-pix');
    btn.textContent = 'Copiado ✓';
    setTimeout(() => { btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" stroke-width="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="currentColor" stroke-width="2"/></svg> Copiar'; }, 2000);
  });
});

// ── STEP 1 SUBMIT ─────────────────────────────────────────────
formCheckout.addEventListener('submit', async (e) => {
  e.preventDefault();
  setError(formError, '');

  const name    = document.getElementById('inp-name').value.trim();
  const email   = document.getElementById('inp-email').value.trim();
  const cpfRaw  = document.getElementById('inp-cpf').value.replace(/\D/g, '');
  const billing = document.querySelector('input[name="payment"]:checked').value;

  if (name.length < 2)      return setError(formError, 'Informe seu nome completo.');
  if (!isValidEmail(email)) return setError(formError, 'Informe um e-mail válido.');
  if (cpfRaw.length !== 11) return setError(formError, 'Informe um CPF válido.');

  state.name = name;
  state.email = email;
  state.cpf = cpfRaw;
  state.billingType = billing;

  const btn = document.getElementById('btn-step1-submit');
  setLoading(btn, true);

  try {
    // 1. criar cliente
    const customerRes = await api('/api/create-customer', 'POST', { name, email, cpfCnpj: cpfRaw });
    state.customerId = customerRes.customerId;

    if (billing === 'PIX') {
      // 2. criar cobrança PIX (com desconto de 5%)
      const chargeRes = await api('/api/create-charge', 'POST', {
        customerId: state.customerId,
        billingType: 'PIX',
      });
      state.paymentId = chargeRes.paymentId;

      // 3. buscar QR code
      const qrRes = await api(`/api/pix-qrcode?paymentId=${encodeURIComponent(state.paymentId)}`, 'GET');
      document.getElementById('pix-qr-img').src = `data:image/png;base64,${qrRes.encodedImage}`;
      document.getElementById('pix-payload').textContent = qrRes.payload;

      showStep('pix');
      startPolling();
    } else {
      // cartão: cobrança é criada no submit do formulário de cartão
      showStep('card');
    }
  } catch (err) {
    setError(formError, err.message || 'Erro ao processar. Tente novamente.');
  } finally {
    setLoading(btn, false);
  }
});

// ── INSTALLMENTS LABEL ────────────────────────────────────────
const INSTALLMENT_LABELS = {
  1: 'Pagar 1x R$29,90',
  2: 'Pagar 2x R$15,49',
  3: 'Pagar 3x R$10,49',
};
document.getElementById('inp-card-installments').addEventListener('change', (e) => {
  const label = document.getElementById('btn-card-label');
  if (label) label.textContent = INSTALLMENT_LABELS[parseInt(e.target.value)] || INSTALLMENT_LABELS[1];
});

// ── STEP 2b CARD SUBMIT ───────────────────────────────────────
formCard.addEventListener('submit', async (e) => {
  e.preventDefault();
  setError(cardError, '');

  const number       = document.getElementById('inp-card-number').value.replace(/\s/g, '');
  const expiry       = document.getElementById('inp-card-expiry').value;
  const cvv          = document.getElementById('inp-card-cvv').value;
  const holder       = document.getElementById('inp-card-holder').value.trim().toUpperCase();
  const phoneRaw     = document.getElementById('inp-card-phone').value.replace(/\D/g, '');
  const cepRaw       = document.getElementById('inp-card-cep').value.replace(/\D/g, '');
  const addrNum      = document.getElementById('inp-card-addrnum').value.replace(/\D/g, '');
  const installments = parseInt(document.getElementById('inp-card-installments').value) || 1;

  if (number.length < 13)   return setError(cardError, 'Número do cartão inválido.');
  if (expiry.length !== 5)  return setError(cardError, 'Validade inválida (MM/AA).');
  if (cvv.length < 3)       return setError(cardError, 'CVV inválido.');
  if (!holder)              return setError(cardError, 'Informe o nome no cartão.');
  if (phoneRaw.length < 10) return setError(cardError, 'Telefone inválido (com DDD).');
  if (cepRaw.length !== 8)  return setError(cardError, 'CEP inválido.');
  if (!addrNum)             return setError(cardError, 'Informe o número do endereço.');

  const [expMonth, expYear] = expiry.split('/');

  const btn = document.getElementById('btn-card-submit');
  setLoading(btn, true);
  btn.disabled = true;

  try {
    const chargeRes = await api('/api/create-charge', 'POST', {
      customerId: state.customerId,
      billingType: 'CREDIT_CARD',
      installments,
      creditCard: {
        holderName: holder,
        number,
        expiryMonth: expMonth,
        expiryYear: '20' + expYear,
        ccv: cvv,
      },
      creditCardHolderInfo: {
        name: state.name,
        email: state.email,
        cpfCnpj: state.cpf,
        postalCode: cepRaw,
        addressNumber: addrNum,
        phone: phoneRaw,
      },
    });

    state.paymentId = chargeRes.paymentId;

    document.getElementById('card-waiting').classList.remove('step--hidden');
    document.getElementById('card-waiting').style.display = 'flex';

    startPolling();
  } catch (err) {
    setError(cardError, err.message || 'Erro no cartão. Verifique os dados.');
    btn.disabled = false;
    setLoading(btn, false);
  }
});

// ── POLLING ───────────────────────────────────────────────────
function startPolling() {
  stopPolling();
  let attempts = 0;
  const MAX_ATTEMPTS = 600; // ~30 min at 3s intervals (alinhado à validade do QR Pix)
  state.pollingTimer = setInterval(async () => {
    if (++attempts > MAX_ATTEMPTS) {
      stopPolling();
      const onCard = steps.card.style.display !== 'none';
      const errEl = document.getElementById(onCard ? 'card-error' : 'pix-status-text');
      if (errEl) errEl.textContent = 'Tempo esgotado. Verifique seu e-mail ou entre em contato.';
      return;
    }
    try {
      const res = await api(`/api/check-payment?paymentId=${encodeURIComponent(state.paymentId)}`, 'GET');
      if (res.status === 'CONFIRMED' || res.status === 'RECEIVED') {
        stopPolling();
        document.getElementById('confirmed-email').textContent = state.email;
        showStep('ok');
        // o email é enviado pelo webhook do Asaas — independe da aba estar aberta
      }
    } catch (_) { /* silently retry */ }
  }, 3000);
}

function stopPolling() {
  if (state.pollingTimer) {
    clearInterval(state.pollingTimer);
    state.pollingTimer = null;
  }
}

// ── HELPERS ───────────────────────────────────────────────────
async function api(url, method, body) {
  const opts = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(url, opts);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erro desconhecido');
  return data;
}

function setError(el, msg) {
  el.textContent = msg;
}

function setLoading(btn, loading) {
  btn.classList.toggle('is-loading', loading);
  btn.disabled = loading;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function resetState() {
  state = { customerId: null, paymentId: null, billingType: 'PIX', name: '', email: '', cpf: '', pollingTimer: null };
  formCheckout.reset();
  formCard.reset();
  setError(formError, '');
  setError(cardError, '');
  document.getElementById('card-waiting').classList.add('step--hidden');
  document.getElementById('card-waiting').style.display = 'none';
  document.getElementById('pix-qr-img').src = '';
  document.getElementById('pix-payload').textContent = '';
  const cardBtn = document.getElementById('btn-card-submit');
  cardBtn.disabled = false;
  setLoading(cardBtn, false);
  setLoading(document.getElementById('btn-step1-submit'), false);
  const installSel = document.getElementById('inp-card-installments');
  if (installSel) installSel.value = '1';
  const cardLabel = document.getElementById('btn-card-label');
  if (cardLabel) cardLabel.textContent = 'Pagar 1x R$29,90';
}

// ══ LANDING — FAQ accordion ══════════════════════════════════
(() => {
  document.querySelectorAll('.faq-item').forEach((item) => {
    item.addEventListener('click', () => {
      const open = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach((i) => i.classList.remove('open'));
      if (!open) item.classList.add('open');
    });
  });
})();
