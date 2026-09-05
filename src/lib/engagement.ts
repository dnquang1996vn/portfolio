/**
 * In-memory engagement counters (views, likes) per article slug.
 * Lives on globalThis so it survives Next.js dev HMR; resets on server restart.
 */
export interface Engagement {
  views: number;
  likes: number;
}

const SEED: Engagement = { views: 323, likes: 36 };

type Store = Map<string, Engagement>;

const g = globalThis as unknown as { __engagementStore?: Store };
const store: Store = g.__engagementStore ?? (g.__engagementStore = new Map());

function entry(slug: string): Engagement {
  let e = store.get(slug);
  if (!e) {
    e = { ...SEED };
    store.set(slug, e);
  }
  return e;
}

export function getEngagement(slug: string): Engagement {
  return { ...entry(slug) };
}

export function addView(slug: string): Engagement {
  const e = entry(slug);
  e.views += 1;
  return { ...e };
}

export function setLike(slug: string, liked: boolean): Engagement {
  const e = entry(slug);
  e.likes = Math.max(0, e.likes + (liked ? 1 : -1));
  return { ...e };
}
