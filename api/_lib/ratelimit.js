import { Ratelimit } from '@upstash/ratelimit';
import { redis } from './redis.js';

function build(tokens, window) {
  if (!redis) return null;
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(tokens, window),
    prefix: 'rl',
    analytics: false,
  });
}

// Buckets de limite por IP.
const limiters = {
  standard: build(20, '60 s'),    // criação de cliente, QR code
  charge: build(10, '600 s'),     // cartão — janela curta corta ataques de teste de cartão sem punir compradores legítimos (inclusive em IPs compartilhados de operadora)
  webhook: build(300, '60 s'),    // proteção contra flood no webhook
};

export function clientIp(req) {
  const xff = req.headers['x-forwarded-for'];
  if (typeof xff === 'string' && xff.length) return xff.split(',')[0].trim();
  return req.headers['x-real-ip'] || 'unknown';
}

// Retorna true se permitido. Se bloqueado, já escreve a resposta 429 e retorna false.
// Se o Upstash não estiver configurado ou falhar, não bloqueia (fail-open).
export async function enforceRateLimit(req, res, bucket) {
  const limiter = limiters[bucket];
  if (!limiter) return true;
  try {
    const { success } = await limiter.limit(`${bucket}:${clientIp(req)}`);
    if (!success) {
      res.status(429).json({ error: 'Muitas requisições. Aguarde um instante e tente novamente.' });
      return false;
    }
    return true;
  } catch {
    return true;
  }
}
