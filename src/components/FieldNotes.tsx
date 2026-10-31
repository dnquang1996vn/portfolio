"use client";

import Link from "next/link";
import { useSite } from "@/components/providers/SiteProvider";
import { pick, posts } from "@/content/portfolio";
import styles from "./FieldNotes.module.css";

/** Three featured notes as editorial columns, the rest as a plain list, then the link to all posts. */
const FEATURED = 3;

export function FieldNotes() {
  const { t, lang } = useSite();
  const featured = posts.slice(0, FEATURED);
  // Newest first; `sort` is stable, so posts from the same year keep their authored order.
  const rest = posts.slice(FEATURED).sort((a, b) => Number(b.date) - Number(a.date));

  return (
    <section id="blog" data-screen-label="Field notes">
      <div className="section-head">
        <div>
          <p className="kicker">04 / {t.secNotes}</p>
          <h2 className="section-title">{t.notesTitle}</h2>
        </div>
        <Link href="/blog" className="link-arrow">{t.allArticles}</Link>
      </div>

      <div className={styles.grid}>
        {featured.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.card}>
            <div className={`mono ${styles.meta}`}>
              <span className={styles.topic}>{pick(post.topic, lang)}</span>
              <span>{post.date}</span>
            </div>
            <h3 className={styles.title}>{pick(post.title, lang)}</h3>
            <p className={styles.summary}>{pick(post.summary, lang)}</p>
          </Link>
        ))}
      </div>

      {rest.length > 0 && (
        <ul className={styles.list}>
          {rest.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className={styles.row}>
                <span className={`mono ${styles.rowDate}`}>{post.date}</span>
                <span className={styles.rowTitle}>{pick(post.title, lang)}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div className={styles.more}>
        <Link href="/blog" className="btn btn-secondary">{t.viewAllPosts} ({posts.length})</Link>
      </div>
    </section>
  );
}
