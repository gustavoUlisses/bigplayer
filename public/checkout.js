// ── STATE ────────────────────────────────────────────────────
let state = {
  customerId: null,
  paymentId: null,
  billingType: 'PIX',
  name: '',
  email: '',
  invoiceUrl: null,
  pollingTimer: null,
};

// ── DOM REFS ─────────────────────────────────────────────────
const overlay        = document.getElementById('modal-overlay');
const btnOpen        = document.getElementById('btn-open-checkout');
const btnClose       = document.getElementById('btn-close-modal');
const formCheckout   = document.getElementById('form-checkout');
const formError      = document.getElementById('form-error');
const btnCardInvoice = document.getElementById('btn-card-invoice');

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
  state.billingType = billing;

  const btn = document.getElementById('btn-step1-submit');
  setLoading(btn, true);

  try {
    // 1. criar cliente
    const customerRes = await api('/api/create-customer', 'POST', { name, email, cpfCnpj: cpfRaw });
    state.customerId = customerRes.customerId;

    // 2. criar cobrança (preço definido no servidor)
    const chargeRes = await api('/api/create-charge', 'POST', {
      customerId: state.customerId,
      billingType: billing,
    });
    state.paymentId = chargeRes.paymentId;

    if (billing === 'PIX') {
      // 3. buscar QR code
      const qrRes = await api(`/api/pix-qrcode?paymentId=${encodeURIComponent(state.paymentId)}`, 'GET');
      document.getElementById('pix-qr-img').src = `data:image/png;base64,${qrRes.encodedImage}`;
      document.getElementById('pix-payload').textContent = qrRes.payload;
      showStep('pix');
      startPolling();
    } else {
      // cartão: pagamento é concluído no ambiente seguro do Asaas
      state.invoiceUrl = chargeRes.invoiceUrl;
      document.getElementById('card-status-text').textContent = 'Aguardando pagamento...';
      showStep('card');
      startPolling();
    }
  } catch (err) {
    setError(formError, err.message || 'Erro ao processar. Tente novamente.');
  } finally {
    setLoading(btn, false);
  }
});

// ── CARTÃO: abrir o pagamento seguro do Asaas ─────────────────
btnCardInvoice.addEventListener('click', () => {
  if (state.invoiceUrl) {
    window.open(state.invoiceUrl, '_blank', 'noopener,noreferrer');
  }
});

// ── POLLING ───────────────────────────────────────────────────
function startPolling() {
  stopPolling();
  let attempts = 0;
  const MAX_ATTEMPTS = 200; // ~10 min at 3s intervals
  state.pollingTimer = setInterval(async () => {
    if (++attempts > MAX_ATTEMPTS) {
      stopPolling();
      const onCard = steps.card.style.display !== 'none';
      const errEl = document.getElementById(onCard ? 'card-status-text' : 'pix-status-text');
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
  state = { customerId: null, paymentId: null, billingType: 'PIX', name: '', email: '', invoiceUrl: null, pollingTimer: null };
  formCheckout.reset();
  setError(formError, '');
  document.getElementById('pix-qr-img').src = '';
  document.getElementById('pix-payload').textContent = '';
  document.getElementById('card-status-text').textContent = 'Aguardando pagamento...';
  setLoading(document.getElementById('btn-step1-submit'), false);
}
