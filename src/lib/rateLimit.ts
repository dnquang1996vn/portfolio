/**
 * Fixed-window rate limit keyed by caller, backed by the shared Upstash client when it is
 * configured and by a process-local map otherwise (fine for one dev server, not for a fleet).
 */
import { sharedRedis } from "./engagement";

const g = globalThis as unknown as { __rateWindows?: Map<string, { count: number; resetAt: number }> };
const memory = g.__rateWindows ?? (g.__rateWindows = new Map());

export async function rateLimit(key: string, limit: number, windowSeconds: number): Promise<{ ok: boolean; remaining: number }> {
  if (sharedRedis) {
    try {
      const k = `rate:${key}`;
      const count = await sharedRedis.incr(k);
      if (count === 1) await sharedRedis.expire(k, windowSeconds);
      return { ok: count <= limit, remaining: Math.max(0, limit - count) };
    } catch (err) {
      console.warn("[rateLimit] Redis unavailable, using memory:", (err as Error).message);
    }
  }
  const now = Date.now();
  const w = memory.get(key);
  if (!w || w.resetAt <= now) {
    memory.set(key, { count: 1, resetAt: now + windowSeconds * 1000 });
    return { ok: true, remaining: limit - 1 };
  }
  w.count += 1;
  return { ok: w.count <= limit, remaining: Math.max(0, limit - w.count) };
}
