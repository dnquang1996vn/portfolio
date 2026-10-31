/**
 * Engagement counters (views, likes) per article slug.
 *
 * Backed by Upstash Redis (Vercel KV) when the REST credentials are present,
 * otherwise by an in-memory map so local development works without a store.
 * Each article is a Redis hash `engagement:<slug>` with `views` and `likes`,
 * seeded on first touch.
 */
import { Redis } from "@upstash/redis";

export interface Engagement {
  views: number;
  likes: number;
}

const SEED: Engagement = { views: 323, likes: 36 };
const key = (slug: string) => `engagement:${slug}`;

// ---- Redis (Vercel KV / Upstash) -------------------------------------------

function redisFromEnv(): Redis | null {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? new Redis({ url, token }) : null;
}

const g = globalThis as unknown as { __redis?: Redis | null; __engagementStore?: Map<string, Engagement> };
const redis: Redis | null = g.__redis === undefined ? (g.__redis = redisFromEnv()) : g.__redis;

/** The shared Upstash client, or null when no REST credentials are configured. */
export const sharedRedis = redis;

async function seedIfMissing(r: Redis, slug: string) {
  const p = r.pipeline();
  p.hsetnx(key(slug), "views", SEED.views);
  p.hsetnx(key(slug), "likes", SEED.likes);
  await p.exec();
}

function toEngagement(h: Record<string, unknown> | null): Engagement {
  return {
    views: Number(h?.views ?? SEED.views),
    likes: Number(h?.likes ?? SEED.likes),
  };
}

// ---- In-memory fallback ------------------------------------------------------

const memory: Map<string, Engagement> = g.__engagementStore ?? (g.__engagementStore = new Map());

function memEntry(slug: string): Engagement {
  let e = memory.get(slug);
  if (!e) {
    e = { ...SEED };
    memory.set(slug, e);
  }
  return e;
}

/**
 * Runs a Redis operation, falling back to the in-memory counters when the store is
 * unreachable (DNS, network, expired credentials). A counter must never take the
 * article page down with it.
 */
async function viaRedis(op: (r: Redis) => Promise<Engagement>, fallback: () => Engagement): Promise<Engagement> {
  if (!redis) return fallback();
  try {
    return await op(redis);
  } catch (err) {
    console.warn("[engagement] Redis unavailable, using in-memory counters:", (err as Error).message);
    return fallback();
  }
}

// ---- Public API ------------------------------------------------------------------

export const engagementBackend: "redis" | "memory" = redis ? "redis" : "memory";

export function getEngagement(slug: string): Promise<Engagement> {
  return viaRedis(
    async (r) => {
      await seedIfMissing(r, slug);
      return toEngagement(await r.hgetall<Record<string, unknown>>(key(slug)));
    },
    () => ({ ...memEntry(slug) }),
  );
}

export function addView(slug: string): Promise<Engagement> {
  return viaRedis(
    async (r) => {
      await seedIfMissing(r, slug);
      const p = r.pipeline();
      p.hincrby(key(slug), "views", 1);
      p.hget(key(slug), "likes");
      const [views, likes] = (await p.exec()) as [number, unknown];
      return { views: Number(views), likes: Number(likes ?? SEED.likes) };
    },
    () => {
      const e = memEntry(slug);
      e.views += 1;
      return { ...e };
    },
  );
}

export function setLike(slug: string, liked: boolean): Promise<Engagement> {
  return viaRedis(
    async (r) => {
      await seedIfMissing(r, slug);
      const p = r.pipeline();
      p.hincrby(key(slug), "likes", liked ? 1 : -1);
      p.hget(key(slug), "views");
      const [likes, views] = (await p.exec()) as [number, unknown];
      if (likes < 0) await r.hset(key(slug), { likes: 0 });
      return { views: Number(views ?? SEED.views), likes: Math.max(0, Number(likes)) };
    },
    () => {
      const e = memEntry(slug);
      e.likes = Math.max(0, e.likes + (liked ? 1 : -1));
      return { ...e };
    },
  );
}
