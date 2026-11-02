"use client";

import type { Labels } from "@/i18n/labels";
import Image from "next/image";
import { useSyncExternalStore } from "react";
import Link from "next/link";
import { Stars } from "./Stars";
import styles from "./ReadingList.module.css";

/*
 * The type filter lives in the URL (`/reading?type=book`), same pattern as the blog tags:
 * the URL is the source of truth and the store below only tells React when it changed.
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

function readType(): string | null {
  return new URLSearchParams(window.location.search).get("type");
}

function writeType(type: string | null) {
  const url = new URL(window.location.href);
  if (type) url.searchParams.set("type", type);
  else url.searchParams.delete("type");
  window.history.replaceState(window.history.state, "", url);
  listeners.forEach((listener) => listener());
}

/** One entry, already in the page's language, newest first. */
export interface ReadingRow {
  slug: string;
  /** Locale-prefixed link to the notes page. */
  href: string;
  cover: string;
  type: string;
  typeLabel: string;
  author: string;
  year: string;
  title: string;
  blurb: string;
  verdict: string;
  rating: number;
  finished: string;
  tags: string[];
}

interface Props {
  items: ReadingRow[];
  /** Type id to label, for the types at least one entry has. */
  types: Record<string, string>;
}

export function ReadingList({ items: all, types, t }: Props & { t: Labels<"readingAll" | "readingFinished" | "readingIntro" | "readingKicker" | "readingNotes" | "readingOutOf" | "readingRating" | "readingTitle"> }) {
  const requested = useSyncExternalStore(subscribe, readType, () => null);
  const active = requested && requested in types ? requested : null;
  const items = all.filter((r) => !active || r.type === active);

  return (
    <section data-screen-label="Reading" className={styles.section}>
      <p className="kicker">{t.readingKicker}</p>
      <h1 className={`section-title ${styles.title}`}>{t.readingTitle}</h1>
      <p className={styles.intro}>{t.readingIntro}</p>

      <div className={styles.filters} role="group" aria-label={t.readingKicker}>
        <button
          type="button"
          className={`tag ${active === null ? "tag-accent" : "tag-neutral"} ${styles.filter}`}
          aria-pressed={active === null}
          onClick={() => writeType(null)}
        >
          {t.readingAll} <span className={styles.count}>{all.length}</span>
        </button>
        {Object.keys(types).map((type) => (
          <button
            key={type}
            type="button"
            className={`tag ${active === type ? "tag-accent" : "tag-neutral"} ${styles.filter}`}
            aria-pressed={active === type}
            onClick={() => writeType(type)}
          >
            {types[type]} <span className={styles.count}>{all.filter((r) => r.type === type).length}</span>
          </button>
        ))}
      </div>

      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.slug}>
            <Link href={item.href} className={styles.row}>
              <figure className={styles.cover} data-media="">
                <Image src={item.cover} alt="" width={382} height={500} sizes="(max-width: 720px) 88px, 120px" className={styles.coverImg} />
              </figure>
              <div className={styles.text}>
                <div className={styles.meta}>
                  <span className={styles.type}>{item.typeLabel}</span>
                  <span>{item.author}</span>
                  <span>{item.year}</span>
                </div>
                <h2 className={styles.itemTitle}>{item.title}</h2>
                <p className={styles.blurb}>{item.blurb}</p>
                <p className={styles.verdict}>{item.verdict}</p>
                <div className={styles.foot}>
                  <Stars value={item.rating} label={`${t.readingRating}: ${item.rating} ${t.readingOutOf}`} />
                  <span className={styles.footMeta}>{t.readingFinished} {item.finished}</span>
                  <span className={styles.footTags}>
                    {item.tags.map((tag) => <span key={tag} className="tag tag-neutral">{tag}</span>)}
                  </span>
                  <span className={styles.notes}>{t.readingNotes} →</span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
