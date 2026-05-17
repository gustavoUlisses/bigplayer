import crypto from 'crypto';
import { enforceRateLimit } from './_lib/ratelimit.js';


function hmacSign(payload, secret) {
  const header  = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const body    = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig     = crypto.createHmac('sha256', secret).update(`${header}.${body}`).digest('base64url');
  return `${header}.${body}.${sig}`;
}

function timingSafeEqual(a, b) {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) {
    crypto.timingSafeEqual(ba, ba); // consume time anyway
    return false;
  }
  return crypto.timingSafeEqual(ba, bb);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  if (!(await enforceRateLimit(req, res, 'login'))) return;

  const { senha } = req.body ?? {};
  if (!senha || typeof senha !== 'string') return res.status(400).json({ error: 'Senha obrigatória.' });

  const SECRET   = process.env.CURSO_JWT_SECRET;
  const SENHA    = process.env.CURSO_SENHA;

  if (!SECRET || !SENHA) return res.status(500).json({ error: 'Configuração incompleta.' });

  const senhaHash      = crypto.createHash('sha256').update(senha.trim()).digest('hex');
  const senhaCorrectaH = crypto.createHash('sha256').update(SENHA.trim()).digest('hex');

  if (!timingSafeEqual(senhaHash, senhaCorrectaH)) {
    return res.status(401).json({ error: 'Senha incorreta.' });
  }

  const token = hmacSign(
    { sub: 'curso', iat: Math.floor(Date.now() / 1000), exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30 },
    SECRET
  );

  res.status(200).json({ token });
}
