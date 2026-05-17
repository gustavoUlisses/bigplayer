const TOKEN_KEY = 'curso_token';

async function verificarToken(token) {
  try {
    const res = await fetch('/api/curso-verify', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.ok;
  } catch {
    return false;
  }
}

function mostrarCurso() {
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('curso-screen').style.display = 'block';
}

function mostrarLogin() {
  document.getElementById('login-screen').style.display = 'flex';
  document.getElementById('curso-screen').style.display = 'none';
}

(async () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token && await verificarToken(token)) {
    mostrarCurso();
  }
})();

document.getElementById('form-login').addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn   = document.getElementById('btn-login');
  const erro  = document.getElementById('login-error');
  const senha = document.getElementById('inp-senha').value;

  erro.textContent = '';
  btn.disabled = true;
  btn.textContent = 'Verificando...';

  try {
    const res  = await fetch('/api/curso-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ senha })
    });
    const data = await res.json();
    if (!res.ok) {
      erro.textContent = data.error || 'Senha incorreta.';
      return;
    }
    localStorage.setItem(TOKEN_KEY, data.token);
    mostrarCurso();
  } catch {
    erro.textContent = 'Erro de conexão. Tente novamente.';
  } finally {
    btn.disabled = false;
    btn.textContent = 'Entrar';
  }
});

document.getElementById('btn-logout').addEventListener('click', () => {
  localStorage.removeItem(TOKEN_KEY);
  mostrarLogin();
});

document.querySelectorAll('.modulo-header').forEach((header) => {
  header.addEventListener('click', () => {
    const modulo = header.closest('.modulo');
    const open   = modulo.classList.contains('open');
    document.querySelectorAll('.modulo.open').forEach(m => m.classList.remove('open'));
    if (!open) modulo.classList.add('open');
  });
});
