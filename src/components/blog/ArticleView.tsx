"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSite } from "@/components/providers/SiteProvider";
import { contact, pick, tags, type Post } from "@/content/portfolio";
import type { Article, Block } from "@/content/articles";
import { ArrowUpRight, Facebook, Mail, Rss, XLogo } from "@/components/Icons";
import styles from "./ArticleView.module.css";

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "h2":
      return <h2 className={styles.h2}>{block.text}</h2>;
    case "p":
      return <p className={styles.p}>{block.text}</p>;
    case "ul":
      return (
        <ul className={`bullets ${styles.list}`}>
          {block.items.map((item, i) => (
            <li key={i}><span aria-hidden="true" /><span>{item}</span></li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className={styles.ol}>
          {block.items.map((item, i) => <li key={i}>{item}</li>)}
        </ol>
      );
    case "quote":
      return <blockquote className={styles.quote}>{block.text}</blockquote>;
    case "code":
      return (
        <pre className={styles.code} data-lang={block.lang}><code>{block.code}</code></pre>
      );
  }
}

const noop = () => () => {};
/** The page URL on the client, an empty string during SSR so the markup matches. */
const useHref = () => useSyncExternalStore(noop, () => window.location.href, () => "");

/** X, Facebook and email share links for the current page. */
function ShareRow({ title }: { title: string }) {
  const { t } = useSite();
  const url = useHref();
  const u = encodeURIComponent(url);
  const text = encodeURIComponent(title);
  const links = [
    { href: `https://x.com/intent/tweet?text=${text}&url=${u}`, label: t.shareOnX, Icon: XLogo },
    { href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, label: t.shareOnFacebook, Icon: Facebook },
    { href: `mailto:?subject=${text}&body=${u}`, label: t.shareByEmail, Icon: Mail },
  ];
  return (
    <div className={styles.share} aria-label={t.share}>
      {links.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={url ? href : undefined}
          target={href.startsWith("mailto:") ? undefined : "_blank"}
          rel="noreferrer"
          className={`btn btn-secondary btn-icon ${styles.shareBtn}`}
          aria-label={label}
          title={label}
        >
          <Icon />
        </a>
      ))}
    </div>
  );
}

interface Props {
  post: Post;
  article: Article;
  prev: Post | null;
  /** Up to three other posts for the "keep reading" list. */
  more: readonly Post[];
  /** Server-rendered engagement bar (views / like / share), streamed in via Suspense. */
  engagement: React.ReactNode;
}

export function ArticleView({ post, article, prev, more, engagement }: Props) {
  const { t, lang } = useSite();
  const content = article[lang];
  const title = pick(post.title, lang);
  // "@nhật-quang-đỗ": the LinkedIn slug, decoded, without the trailing id LinkedIn appends.
  const handle = "@" + decodeURIComponent(contact.linkedin)
    .replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, "")
    .replace(/\/$/, "")
    .replace(/-[0-9a-f]{8,}$/, "");

  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <Link href="/blog" className={styles.back}>← {t.backToPosts}</Link>
        <div className={styles.meta}>
          <span className={styles.topic}>{pick(post.topic, lang)}</span>
          <span>{pick(post.read, lang)}</span>
          <span>{t.published} {post.date}</span>
        </div>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.lede}>{content.lede}</p>
        {engagement}
      </header>

      <figure className={styles.cover} data-media="">
        <Image src={post.image} alt="" width={1800} height={1200} priority sizes="(max-width: 1200px) 100vw, 1200px" className={styles.coverImg} />
      </figure>

      <div className={styles.layout}>
        <aside className={styles.aside}>
          <div className={styles.author}>
            <Image src="/images/portrait.jpg" alt="" width={800} height={800} sizes="56px" className={styles.avatar} />
            <div className={styles.authorText}>
              <span className={styles.authorName}>{t.heroName}</span>
              <a href={contact.linkedin} target="_blank" rel="noreferrer" className={styles.handle} title={t.authorHandle}>
                {handle} <ArrowUpRight />
              </a>
            </div>
          </div>

          <div className={styles.asideBlock}>
            <p className={styles.asideLabel}>{t.tagsLabel}</p>
            <ul className={styles.tags}>
              {post.tags.map((id) => (
                <li key={id}>
                  <Link href={`/blog?tag=${id}`} className={`tag tag-neutral ${styles.tag}`}>{pick(tags[id], lang)}</Link>
                </li>
              ))}
            </ul>
          </div>

          {prev && (
            <div className={styles.asideBlock}>
              <p className={styles.asideLabel}>{t.prevArticle}</p>
              <Link href={`/blog/${prev.slug}`} className={styles.prevLink}>{pick(prev.title, lang)}</Link>
            </div>
          )}

          <Link href="/blog" className={`link-arrow ${styles.asideBack}`}>← {t.backToBlog}</Link>
        </aside>

        <div className={styles.body}>
          {content.body.map((block, i) => <BlockView key={`${lang}-${i}`} block={block} />)}
        </div>
      </div>

      <footer className={styles.footer}>
        <ShareRow title={title} />

        {more.length > 0 && (
          <section className={styles.more} aria-labelledby="keep-reading">
            <h2 id="keep-reading" className={styles.moreTitle}>{t.keepReading}</h2>
            <ul className={styles.moreList}>
              {more.map((p) => (
                <li key={p.slug} className={styles.moreItem}>
                  <Link href={`/blog/${p.slug}`} className={styles.moreLink}>{pick(p.title, lang)}</Link>
                  <p className={styles.moreSummary}>{pick(p.summary, lang)}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className={styles.follow}>
          <div>
            <p className={styles.followTitle}>{t.followTitle}</p>
            <p className={styles.followIntro}>{t.followIntro}</p>
          </div>
          <a href="/feed.xml" className={`btn btn-secondary ${styles.followBtn}`}>
            <Rss /> {t.subscribeRss}
          </a>
        </div>
      </footer>
    </article>
  );
}
