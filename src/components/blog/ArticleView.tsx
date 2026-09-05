"use client";

import Image from "next/image";
import Link from "next/link";
import { useSite } from "@/components/providers/SiteProvider";
import { pick, type Post } from "@/content/portfolio";
import type { Article, Block } from "@/content/articles";
import { ArticleActions } from "./ArticleActions";
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

interface Props {
  post: Post;
  article: Article;
  prev: Post | null;
  next: Post | null;
}

export function ArticleView({ post, article, prev, next }: Props) {
  const { t, lang } = useSite();
  const content = article[lang];
  const title = pick(post.title, lang);

  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <Link href="/blog" className={styles.back}>← {t.backToPosts}</Link>
        <div className={styles.meta}>
          <span className={styles.topic}>{pick(post.topic, lang)}</span>
          <span>·</span>
          <span>{pick(post.read, lang)}</span>
          <span>·</span>
          <span>{t.published} {post.date}</span>
        </div>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.lede}>{content.lede}</p>
        <ArticleActions slug={post.slug} title={title} />
      </header>

      <figure className={`grayscale ${styles.cover}`} data-media="">
        <Image src={post.image} alt="" width={1800} height={1200} priority sizes="(max-width: 1200px) 100vw, 1200px" className={styles.coverImg} />
      </figure>

      <div className={styles.body}>
        {content.body.map((block, i) => <BlockView key={`${lang}-${i}`} block={block} />)}
      </div>

      <nav className={styles.pager} aria-label={t.otherPosts}>
        {prev ? (
          <Link href={`/blog/${prev.slug}`} className={styles.pagerLink}>
            <span className={styles.pagerLabel}>← {t.prevArticle}</span>
            <span className={styles.pagerTitle}>{pick(prev.title, lang)}</span>
          </Link>
        ) : <span />}
        {next ? (
          <Link href={`/blog/${next.slug}`} className={`${styles.pagerLink} ${styles.pagerNext}`}>
            <span className={styles.pagerLabel}>{t.nextArticle} →</span>
            <span className={styles.pagerTitle}>{pick(next.title, lang)}</span>
          </Link>
        ) : <span />}
      </nav>
    </article>
  );
}
