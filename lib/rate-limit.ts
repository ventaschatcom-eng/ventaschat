// Rate limiter naive in-memory para Vercel Edge.
// IMPORTANTE: cada serverless cold-start resetea el mapa, por lo que no es 100% confiable
// entre instancias. Para producción seria considerar Upstash Redis con @upstash/ratelimit.
// Aún así, agrega una capa real de protección contra abuso desde una IP individual.

type Entry = { count: number; resetAt: number };
const store = new Map<string, Entry>();

// Cleanup periódico para evitar memory leak (corre cada vez que se llama check)
function cleanup() {
  const now = Date.now();
  for (const [k, v] of store) {
    if (v.resetAt < now) store.delete(k);
  }
}

export function checkRateLimit(input: {
  key: string;
  windowMs: number;
  max: number;
}): { ok: boolean; remaining: number; retryAfterSec: number } {
  cleanup();
  const now = Date.now();
  const existing = store.get(input.key);

  if (!existing || existing.resetAt < now) {
    store.set(input.key, { count: 1, resetAt: now + input.windowMs });
    return { ok: true, remaining: input.max - 1, retryAfterSec: 0 };
  }

  if (existing.count >= input.max) {
    return {
      ok: false,
      remaining: 0,
      retryAfterSec: Math.ceil((existing.resetAt - now) / 1000),
    };
  }

  existing.count += 1;
  return { ok: true, remaining: input.max - existing.count, retryAfterSec: 0 };
}

export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}
