"use client";

import Image from "next/image";
import Link from "next/link";
import { useSite } from "@/components/providers/SiteProvider";
import { pick } from "@/content/portfolio";
import { readingTags, readingTypes, type ReadingItem } from "@/content/reading";
import { ArrowUpRight } from "@/components/Icons";
import { Stars } from "./Stars";
import styles from "./ReadingDetail.module.css";

interface Props {
  item: ReadingItem;
  /** Other entries, newest first, for the "more" list. */
  more: readonly ReadingItem[];
}

export function ReadingDetail({ item, more }: Props) {
  const { t, lang } = useSite();
  const [y, m] = item.date.split("-");
  const finished = lang === "vi" ? `${m}/${y}` : new Date(Number(y), Number(m) - 1, 1).toLocaleString("en", { month: "long", year: "numeric" });

  return (
    <article className={styles.article}>
      <Link href="/reading" className={styles.back}>← {t.readingBack}</Link>

      <div className={styles.layout}>
        <aside className={styles.aside}>
          <figure className={styles.cover} data-media="">
            <Image src={item.cover} alt="" width={382} height={500} priority sizes="(max-width: 900px) 160px, 240px" className={styles.coverImg} />
          </figure>
          <a href={item.link} target="_blank" rel="noreferrer" className={`btn btn-secondary ${styles.getIt}`}>
            {t.readingGetIt} <ArrowUpRight />
          </a>
          <dl className={styles.facts}>
            <dt>{t.readingRating}</dt>
            <dd><Stars value={item.rating} label={`${item.rating} ${t.readingOutOf}`} /> <span className={styles.ratingNum}>{item.rating}/5</span></dd>
            <dt>{t.readingFinished}</dt>
            <dd>{finished}</dd>
            <dt>{t.tagsLabel}</dt>
            <dd className={styles.tags}>
              {item.tags.map((id) => <span key={id} className="tag tag-neutral">{pick(readingTags[id], lang)}</span>)}
            </dd>
          </dl>
        </aside>

        <div className={styles.main}>
          <header className={styles.header}>
            <div className={styles.meta}>
              <span className={styles.type}>{pick(readingTypes[item.type], lang)}</span>
              <span>{item.author}</span>
              <span>{item.year}</span>
            </div>
            <h1 className={styles.title}>{item.title}</h1>
            <p className={styles.blurb}>{pick(item.blurb, lang)}</p>
          </header>

          <section className={styles.block}>
            <h2 className={styles.h2}>{t.readingVerdict}</h2>
            <p className={styles.verdict}>{pick(item.verdict, lang)}</p>
          </section>

          <section className={styles.block}>
            <h2 className={styles.h2}>{t.readingTakeaways}</h2>
            <ol className={styles.takeaways}>
              {item.takeaways.map((note, i) => <li key={i}>{pick(note, lang)}</li>)}
            </ol>
          </section>

          {more.length > 0 && (
            <section className={styles.more}>
              <h2 className={styles.h2}>{t.readingBack}</h2>
              <ul className={styles.moreList}>
                {more.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/reading/${r.slug}`} className={styles.moreLink}>
                      <span className={styles.moreType}>{pick(readingTypes[r.type], lang)}</span>
                      <span className={styles.moreTitle}>{r.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </article>
  );
}
