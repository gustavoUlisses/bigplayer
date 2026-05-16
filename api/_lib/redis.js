import { Redis } from '@upstash/redis';

// Cliente Redis (Upstash). Fica null se as variáveis de ambiente ainda
// não estiverem configuradas — assim o checkout não quebra antes do setup.
let redis = null;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
}

export { redis };
