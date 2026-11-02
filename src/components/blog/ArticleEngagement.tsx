import { connection } from "next/server";
import { getLocale } from "next-intl/server";
import { addView } from "@/lib/engagement";
import { pick, type Post } from "@/content/portfolio";
import { getLabels } from "@/i18n/labels";
import { ArticleActions } from "./ArticleActions";
import styles from "./ArticleActions.module.css";

/**
 * Server component: the only dynamic part of an article page.
 * Reads (and bumps) the Redis-backed counters at request time and hands the
 * numbers to the client bar, so they are in the HTML instead of loading in.
 */
export async function ArticleEngagement({ post }: { post: Post }) {
  await connection(); // opt this subtree out of the static prerender
  const initial = await addView(post.slug);
  const lang = await getLocale();
  return <ArticleActions
      slug={post.slug}
      title={pick(post.title, lang)}
      initial={initial}
      t={await getLabels(["like", "liked", "linkCopied", "share", "shareFailed", "unlike", "views"])}
    />;
}

/** Suspense fallback with the same footprint so the layout does not jump. */
export function ArticleEngagementFallback() {
  return <div className={styles.bar} aria-hidden="true" style={{ minHeight: 60 }} />;
}
