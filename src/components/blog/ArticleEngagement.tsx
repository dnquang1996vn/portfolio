import { connection } from "next/server";
import { addView } from "@/lib/engagement";
import type { Post } from "@/content/portfolio";
import { ArticleActions } from "./ArticleActions";
import styles from "./ArticleActions.module.css";

/**
 * Server component: the only dynamic part of an article page.
 * Reads (and bumps) the in-memory counters at request time and hands the
 * numbers to the client bar, so they are in the HTML instead of loading in.
 */
export async function ArticleEngagement({ post }: { post: Post }) {
  await connection(); // opt this subtree out of the static prerender
  const initial = addView(post.slug);
  return <ArticleActions post={post} initial={initial} />;
}

/** Suspense fallback with the same footprint so the layout does not jump. */
export function ArticleEngagementFallback() {
  return <div className={styles.bar} aria-hidden="true" style={{ minHeight: 60 }} />;
}
