"use client";

import { useCallback, useEffect, useState } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { pick, type Post } from "@/content/portfolio";
import type { Engagement } from "@/lib/engagement";
import styles from "./ArticleActions.module.css";

const LIKED_KEY = "portfolio-liked";

function readLiked(): Set<string> {
  try {
    return new Set(JSON.parse(localStorage.getItem(LIKED_KEY) ?? "[]") as string[]);
  } catch {
    return new Set();
  }
}

function writeLiked(set: Set<string>) {
  try { localStorage.setItem(LIKED_KEY, JSON.stringify([...set])); } catch { /* ignore */ }
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2.06 12.35a1 1 0 0 1 0-.7 10.75 10.75 0 0 1 19.88 0 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-19.88 0" /><circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
    </svg>
  );
}
function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2v13" /><path d="m16 6-4-4-4 4" /><path d="M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8" />
    </svg>
  );
}

const fmt = (n: number) => new Intl.NumberFormat("en-US").format(n);

interface Props {
  post: Post;
  /** Counters rendered on the server for this request. */
  initial: Engagement;
}

export function ArticleActions({ post, initial }: Props) {
  const { t, lang } = useSite();
  const slug = post.slug;
  const title = pick(post.title, lang);
  const [counts, setCounts] = useState<Engagement>(initial);
  const [liked, setLiked] = useState(false);
  const [busy, setBusy] = useState(false);
  const [shared, setShared] = useState<"idle" | "copied" | "failed">("idle");

  // Liked state lives in this browser's localStorage; read it after hydration.
  useEffect(() => {
    let cancelled = false;
    Promise.resolve().then(() => { if (!cancelled) setLiked(readLiked().has(slug)); });
    return () => { cancelled = true; };
  }, [slug]);

  const toggleLike = useCallback(async () => {
    if (busy) return;
    setBusy(true);
    const next = !liked;
    // Optimistic update.
    setLiked(next);
    setCounts((c) => ({ ...c, likes: Math.max(0, c.likes + (next ? 1 : -1)) }));
    const set = readLiked();
    if (next) set.add(slug); else set.delete(slug);
    writeLiked(set);
    try {
      const r = await fetch(`/api/articles/${slug}`, {
        method: "POST",
        body: JSON.stringify({ action: next ? "like" : "unlike" }),
        headers: { "Content-Type": "application/json" },
      });
      if (r.ok) setCounts((await r.json()) as Engagement);
    } catch {
      /* keep the optimistic state */
    } finally {
      setBusy(false);
    }
  }, [busy, liked, slug]);

  const share = useCallback(async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setShared("copied");
    } catch (err) {
      if ((err as DOMException)?.name === "AbortError") return; // user closed the share sheet
      setShared("failed");
    }
    setTimeout(() => setShared("idle"), 2000);
  }, [title]);

  return (
    <div className={styles.bar}>
      <span className={styles.stat} title={t.views}>
        <EyeIcon />
        <span className={styles.num}>{fmt(counts.views)}</span>
        <span className={styles.label}>{t.views}</span>
      </span>
      <button
        type="button"
        className={`btn btn-secondary ${styles.action} ${liked ? styles.liked : ""}`}
        onClick={toggleLike}
        aria-pressed={liked}
        aria-label={liked ? t.unlike : t.like}
        disabled={busy}
      >
        <HeartIcon filled={liked} />
        <span className={styles.num}>{fmt(counts.likes)}</span>
        <span className={styles.label}>{liked ? t.liked : t.like}</span>
      </button>
      <button type="button" className={`btn btn-secondary ${styles.action}`} onClick={share} aria-label={t.share}>
        <ShareIcon />
        <span className={styles.label}>
          {shared === "copied" ? t.linkCopied : shared === "failed" ? t.shareFailed : t.share}
        </span>
      </button>
    </div>
  );
}
