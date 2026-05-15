// ── STATE ────────────────────────────────────────────────────
let state = {
  customerId: null,
  paymentId: null,
  billingType: 'PIX',
  name: '',
  email: '',
  pollingTimer: null,
};

// ── DOM REFS ─────────────────────────────────────────────────
const overlay       = document.getElementById('modal-overlay');
const btnOpen       = document.getElementById('btn-open-checkout');
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

// ── MODAL ─────────────────────────────────────────────────────
btnOpen.addEventListener('click', openModal);
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
  // re-trigger animation
  target.style.animation = 'none';
  target.offsetHeight;
  target.style.animation = '';
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

// ── CARD MASKS ────────────────────────────────────────────────
document.getElementById('inp-card-number').addEventListener('input', (e) => {
  let v = e.target.value.replace(/\D/g, '').slice(0, 16);
  v = v.replace(/(\d{4})(?=\d)/g, '$1 ');
  e.target.value = v;
});

document.getElementById('inp-card-expiry').addEventListener('input', (e) => {
  let v = e.target.value.replace(/\D/g, '').slice(0, 4);
  if (v.length > 2) v = v.slice(0,2) + '/' + v.slice(2);
  e.target.value = v;
});

// ── PIX COPY ─────────────────────────────────────────────────
document.getElementById('btn-copy-pix').addEventListener('click', () => {
  const payload = document.getElementById('pix-payload').textContent;
  navigator.clipboard.writeText(payload).then(() => {
    const btn = document.getElementById('btn-copy-pix');
    btn.textContent = 'Copiado!';
    setTimeout(() => { btn.textContent = 'Copiar'; }, 2000);
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

  if (!name)             return setError(formError, 'Informe seu nome.');
  if (!isValidEmail(email)) return setError(formError, 'Informe um e-mail válido.');
  if (cpfRaw.length !== 11) return setError(formError, 'Informe um CPF válido.');

  state.name = name;
  state.email = email;
  state.billingType = billing;

  const btn = document.getElementById('btn-step1-submit');
  setLoading(btn, true);

  try {
    // 1. criar cliente
    const customerRes = await api('/api/create-customer', 'POST', { name, email, cpfCnpj: cpfRaw });
    state.customerId = customerRes.customerId;

    // 2. criar cobrança (PIX cria aqui; cartão cria no step-card)
    if (billing === 'PIX') {
      const chargeRes = await api('/api/create-charge', 'POST', {
        customerId: state.customerId,
        billingType: 'PIX',
      });
      state.paymentId = chargeRes.paymentId;

      // 3. buscar QR code
      const qrRes = await api(`/api/pix-qrcode?paymentId=${state.paymentId}`, 'GET');
      document.getElementById('pix-qr-img').src = `data:image/png;base64,${qrRes.encodedImage}`;
      document.getElementById('pix-payload').textContent = qrRes.payload;

      showStep('pix');
      startPolling();
    } else {
      showStep('card');
    }
  } catch (err) {
    setError(formError, err.message || 'Erro ao processar. Tente novamente.');
  } finally {
    setLoading(btn, false);
  }
});

// ── STEP 2b CARD SUBMIT ───────────────────────────────────────
formCard.addEventListener('submit', async (e) => {
  e.preventDefault();
  setError(cardError, '');

  const number  = document.getElementById('inp-card-number').value.replace(/\s/g, '');
  const expiry  = document.getElementById('inp-card-expiry').value;
  const cvv     = document.getElementById('inp-card-cvv').value;
  const holder  = document.getElementById('inp-card-holder').value.trim().toUpperCase();
  const cepRaw  = document.getElementById('inp-card-cep').value.replace(/\D/g, '');

  if (number.length < 13)  return setError(cardError, 'Número do cartão inválido.');
  if (expiry.length !== 5) return setError(cardError, 'Validade inválida (MM/AA).');
  if (cvv.length < 3)      return setError(cardError, 'CVV inválido.');
  if (!holder)             return setError(cardError, 'Informe o nome no cartão.');
  if (cepRaw.length !== 8) return setError(cardError, 'CEP inválido.');

  const [expMonth, expYear] = expiry.split('/');

  const btn = document.getElementById('btn-card-submit');
  setLoading(btn, true);
  btn.disabled = true;

  try {
    const chargeRes = await api('/api/create-charge', 'POST', {
      customerId: state.customerId,
      billingType: 'CREDIT_CARD',
      remoteIp: await getClientIp(),
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
        cpfCnpj: document.getElementById('inp-cpf').value.replace(/\D/g, ''),
        postalCode: cepRaw,
        addressNumber: '0',
        phone: '00000000000',
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
  state.pollingTimer = setInterval(async () => {
    try {
      const res = await api(`/api/check-payment?paymentId=${state.paymentId}`, 'GET');
      if (res.status === 'CONFIRMED' || res.status === 'RECEIVED') {
        stopPolling();
        await sendEmail();
        showStep('ok');
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

// ── SEND EMAIL ────────────────────────────────────────────────
async function sendEmail() {
  await api('/api/send-email', 'POST', { to: state.email, name: state.name });
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

async function getClientIp() {
  try {
    const r = await fetch('https://api.ipify.org?format=json');
    const d = await r.json();
    return d.ip;
  } catch {
    return '127.0.0.1';
  }
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
  state = { customerId: null, paymentId: null, billingType: 'PIX', name: '', email: '', pollingTimer: null };
  formCheckout.reset();
  formCard.reset();
  setError(formError, '');
  setError(cardError, '');
  document.getElementById('card-waiting').classList.add('step--hidden');
  document.getElementById('card-waiting').style.display = 'none';
  document.getElementById('pix-qr-img').src = '';
  document.getElementById('pix-payload').textContent = '';
  document.getElementById('inp-card-cep').value = '';
  const cardBtn = document.getElementById('btn-card-submit');
  cardBtn.disabled = false;
  setLoading(cardBtn, false);
  setLoading(document.getElementById('btn-step1-submit'), false);
}
