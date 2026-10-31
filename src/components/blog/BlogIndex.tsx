"use client";

import Image from "next/image";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { isTagId, pick, posts, tags, type TagId } from "@/content/portfolio";
import styles from "./BlogIndex.module.css";

/** Tags that at least one post uses, in registry order, so the filter never shows an empty result. */
const usedTags = (Object.keys(tags) as TagId[]).filter((id) => posts.some((p) => p.tags.includes(id)));

/*
 * The selected tag lives in the URL (`/blog?tag=<id>`), so a link from an article or a shared
 * URL opens the index pre-filtered. The URL is the only source of truth; the store below just
 * tells React when it changed.
 */
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("popstate", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("popstate", listener);
  };
}

function readTag(): TagId | null {
  const value = new URLSearchParams(window.location.search).get("tag");
  return value && isTagId(value) ? value : null;
}

function writeTag(tag: TagId | null) {
  const url = new URL(window.location.href);
  if (tag) url.searchParams.set("tag", tag);
  else url.searchParams.delete("tag");
  window.history.replaceState(window.history.state, "", url);
  listeners.forEach((listener) => listener());
}

export function BlogIndex() {
  const { t, lang } = useSite();
  // Server snapshot is `null` so the static HTML and the first client render agree.
  const active = useSyncExternalStore(subscribe, readTag, () => null);
  const visible = active ? posts.filter((p) => p.tags.includes(active)) : posts;

  return (
    <section data-screen-label="Blog index" className={styles.section}>
      <p className="kicker">{t.secBlog}</p>
      <h1 className={`section-title ${styles.title}`}>{t.blogIndexTitle}</h1>
      <p className={styles.intro}>{t.blogIndexIntro}</p>

      <div className={styles.filters} role="group" aria-label={t.tagsLabel}>
        <button
          type="button"
          className={`tag ${active === null ? "tag-accent" : "tag-neutral"} ${styles.filter}`}
          aria-pressed={active === null}
          onClick={() => writeTag(null)}
        >
          {t.filterAll}
        </button>
        {usedTags.map((id) => (
          <button
            key={id}
            type="button"
            className={`tag ${active === id ? "tag-accent" : "tag-neutral"} ${styles.filter}`}
            aria-pressed={active === id}
            onClick={() => writeTag(id)}
          >
            {pick(tags[id], lang)}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {visible.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.post}>
            <figure className={styles.media} data-media="">
              <Image src={post.image} alt="" width={900} height={600} sizes="(max-width: 720px) 100vw, (max-width: 1000px) 50vw, 33vw" className={styles.mediaImg} />
            </figure>
            <div className={styles.meta}>
              <span className={styles.topic}>{pick(post.topic, lang)}</span>
              <span>{pick(post.read, lang)}</span>
              <span>{post.date}</span>
            </div>
            <h2 className={styles.postTitle}>{pick(post.title, lang)}</h2>
            <p className={styles.summary}>{pick(post.summary, lang)}</p>
            <ul className={styles.tags} aria-label={t.tagsLabel}>
              {post.tags.map((id) => <li key={id} className="tag tag-neutral">{pick(tags[id], lang)}</li>)}
            </ul>
          </Link>
        ))}
      </div>
    </section>
  );
}
