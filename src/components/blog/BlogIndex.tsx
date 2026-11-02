"use client";

import type { Labels } from "@/i18n/labels";
import Image from "next/image";
import { useSyncExternalStore } from "react";
import Link from "next/link";
import styles from "./BlogIndex.module.css";

/** A post card's text, already in the page's language. */
export interface PostCard {
  slug: string;
  /** Locale-prefixed link to the article. */
  href: string;
  image: string;
  date: string;
  title: string;
  summary: string;
  topic: string;
  read: string;
  tags: string[];
}

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

function readTag(): string | null {
  return new URLSearchParams(window.location.search).get("tag");
}

function writeTag(tag: string | null) {
  const url = new URL(window.location.href);
  if (tag) url.searchParams.set("tag", tag);
  else url.searchParams.delete("tag");
  window.history.replaceState(window.history.state, "", url);
  listeners.forEach((listener) => listener());
}

interface Props {
  posts: PostCard[];
  /** Tag id to label, for the tags at least one post uses, in registry order. */
  tags: Record<string, string>;
}

export function BlogIndex({ posts, tags, t }: Props & { t: Labels<"blogIndexIntro" | "blogIndexTitle" | "filterAll" | "secBlog" | "tagsLabel"> }) {
  // Server snapshot is `null` so the static HTML and the first client render agree.
  const requested = useSyncExternalStore(subscribe, readTag, () => null);
  const active = requested && requested in tags ? requested : null;
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
        {Object.keys(tags).map((id) => (
          <button
            key={id}
            type="button"
            className={`tag ${active === id ? "tag-accent" : "tag-neutral"} ${styles.filter}`}
            aria-pressed={active === id}
            onClick={() => writeTag(id)}
          >
            {tags[id]}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {visible.map((post) => (
          <Link key={post.slug} href={post.href} className={styles.post}>
            <figure className={styles.media} data-media="">
              <Image src={post.image} alt="" width={900} height={600} sizes="(max-width: 720px) 100vw, (max-width: 1000px) 50vw, 33vw" className={styles.mediaImg} />
            </figure>
            <div className={styles.meta}>
              <span className={styles.topic}>{post.topic}</span>
              <span>{post.read}</span>
              <span>{post.date}</span>
            </div>
            <h2 className={styles.postTitle}>{post.title}</h2>
            <p className={styles.summary}>{post.summary}</p>
            <ul className={styles.tags} aria-label={t.tagsLabel}>
              {post.tags.map((id) => <li key={id} className="tag tag-neutral">{tags[id]}</li>)}
            </ul>
          </Link>
        ))}
      </div>
    </section>
  );
}
