import { Redis } from '@upstash/redis';

// Lê as credenciais do Upstash aceitando os vários nomes que a Vercel
// pode gerar (integração nativa Upstash, KV, ou com prefixo personalizado).
const url =
  process.env.UPSTASH_REDIS_REST_URL ||
  process.env.KV_REST_API_URL ||
  process.env.STORAGE_REST_API_URL ||
  process.env.STORAGE_KV_REST_API_URL ||
  process.env.STORAGE_URL;

const token =
  process.env.UPSTASH_REDIS_REST_TOKEN ||
  process.env.KV_REST_API_TOKEN ||
  process.env.STORAGE_REST_API_TOKEN ||
  process.env.STORAGE_KV_REST_API_TOKEN ||
  process.env.STORAGE_TOKEN;

// Fica null se ainda não houver credenciais — assim o checkout não quebra.
let redis = null;
if (url && token) {
  redis = new Redis({ url, token });
}

export { redis };
