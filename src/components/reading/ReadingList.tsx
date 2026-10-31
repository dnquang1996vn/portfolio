"use client";

import Image from "next/image";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { pick } from "@/content/portfolio";
import { isReadingType, reading, readingTags, readingTypes, type ReadingType } from "@/content/reading";
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

function readType(): ReadingType | null {
  const value = new URLSearchParams(window.location.search).get("type");
  return value && isReadingType(value) ? value : null;
}

function writeType(type: ReadingType | null) {
  const url = new URL(window.location.href);
  if (type) url.searchParams.set("type", type);
  else url.searchParams.delete("type");
  window.history.replaceState(window.history.state, "", url);
  listeners.forEach((listener) => listener());
}

const types = (Object.keys(readingTypes) as ReadingType[]).filter((t) => reading.some((r) => r.type === t));

/** "2025-06" → "Jun 2025" / "06/2025". */
function formatDate(date: string, lang: "en" | "vi") {
  const [y, m] = date.split("-");
  if (lang === "vi") return `${m}/${y}`;
  return new Date(Number(y), Number(m) - 1, 1).toLocaleString("en", { month: "short", year: "numeric" });
}

export function ReadingList() {
  const { t, lang } = useSite();
  const active = useSyncExternalStore(subscribe, readType, () => null);
  const items = [...reading]
    .filter((r) => !active || r.type === active)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

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
          {t.readingAll} <span className={styles.count}>{reading.length}</span>
        </button>
        {types.map((type) => (
          <button
            key={type}
            type="button"
            className={`tag ${active === type ? "tag-accent" : "tag-neutral"} ${styles.filter}`}
            aria-pressed={active === type}
            onClick={() => writeType(type)}
          >
            {pick(readingTypes[type], lang)} <span className={styles.count}>{reading.filter((r) => r.type === type).length}</span>
          </button>
        ))}
      </div>

      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.slug}>
            <Link href={`/reading/${item.slug}`} className={styles.row}>
              <figure className={styles.cover} data-media="">
                <Image src={item.cover} alt="" width={382} height={500} sizes="(max-width: 720px) 88px, 120px" className={styles.coverImg} />
              </figure>
              <div className={styles.text}>
                <div className={styles.meta}>
                  <span className={styles.type}>{pick(readingTypes[item.type], lang)}</span>
                  <span>{item.author}</span>
                  <span>{item.year}</span>
                </div>
                <h2 className={styles.itemTitle}>{item.title}</h2>
                <p className={styles.blurb}>{pick(item.blurb, lang)}</p>
                <p className={styles.verdict}>{pick(item.verdict, lang)}</p>
                <div className={styles.foot}>
                  <Stars value={item.rating} label={`${t.readingRating}: ${item.rating} ${t.readingOutOf}`} />
                  <span className={styles.footMeta}>{t.readingFinished} {formatDate(item.date, lang)}</span>
                  <span className={styles.footTags}>
                    {item.tags.map((id) => <span key={id} className="tag tag-neutral">{pick(readingTags[id], lang)}</span>)}
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
