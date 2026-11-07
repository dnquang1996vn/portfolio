import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/Link";
import { contact, pick, tags, type Post } from "@/content/portfolio";
import type { ComponentProps } from "react";
import type { ArticleBody } from "@/content/articles";
import { ArrowUpRight, Rss } from "@/components/Icons";
import { getLabels } from "@/i18n/labels";
import { CodeBlock } from "./CodeBlock";
import { ShareRow } from "./ShareRow";
import styles from "./ArticleView.module.css";

/** Gives a GFM table a scroll container so a wide one never widens the page on a phone. */
function Table(props: ComponentProps<"table">) {
  return <div className={styles.tableWrap}><table {...props} /></div>;
}

interface Props {
  post: Post;
  /** The Markdown body in the current language. */
  Body: ArticleBody;
  prev: Post | null;
  /** Up to three other posts for the "keep reading" list. */
  more: readonly Post[];
  /** Server-rendered engagement bar (views / like / share), streamed in via Suspense. */
  engagement: React.ReactNode;
}

export async function ArticleView({ post, Body, prev, more, engagement }: Props) {
  const t = await getTranslations();
  const lang = await getLocale();
  const title = pick(post.title, lang);
  const codeLabels = await getLabels(["copyCode", "codeCopied"]);
  // "@nhật-quang-đỗ": the LinkedIn slug, decoded, without the trailing id LinkedIn appends.
  const handle = "@" + decodeURIComponent(contact.linkedin)
    .replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, "")
    .replace(/\/$/, "")
    .replace(/-[0-9a-f]{8,}$/, "");

  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <Link href="/blog" className={styles.back}>← {t("backToPosts")}</Link>
        <div className={styles.meta}>
          <span className={styles.topic}>{pick(post.topic, lang)}</span>
          <span>{pick(post.read, lang)}</span>
          <span>{t("published")} {post.date}</span>
        </div>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.lede}>{pick(post.lede, lang)}</p>
        {engagement}
      </header>

      <figure className={styles.cover} data-media="">
        <Image src={post.image} alt="" width={1800} height={1200} preload sizes="(max-width: 1200px) 100vw, 1200px" className={styles.coverImg} />
      </figure>

      <div className={styles.layout}>
        <aside className={styles.aside}>
          <div className={styles.author}>
            <Image src="/images/portrait.jpg" alt="" width={800} height={800} sizes="56px" className={styles.avatar} />
            <div className={styles.authorText}>
              <span className={styles.authorName}>{t("heroName")}</span>
              <a href={contact.linkedin} target="_blank" rel="noreferrer" className={styles.handle} title={t("authorHandle")}>
                {handle} <ArrowUpRight />
              </a>
            </div>
          </div>

          <div className={styles.asideBlock}>
            <p className={styles.asideLabel}>{t("tagsLabel")}</p>
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
              <p className={styles.asideLabel}>{t("prevArticle")}</p>
              <Link href={`/blog/${prev.slug}`} className={styles.prevLink}>{pick(prev.title, lang)}</Link>
            </div>
          )}

          <Link href="/blog" className={`link-arrow ${styles.asideBack}`}>← {t("backToBlog")}</Link>
        </aside>

        <div className={styles.body}>
          <Body components={{ pre: (props) => <CodeBlock {...props} t={codeLabels} />, table: Table }} />
        </div>
      </div>

      <footer className={styles.footer}>
        <ShareRow title={title} t={await getLabels(["share", "shareByEmail", "shareOnFacebook", "shareOnX"])} />

        {more.length > 0 && (
          <section className={styles.more} aria-labelledby="keep-reading">
            <h2 id="keep-reading" className={styles.moreTitle}>{t("keepReading")}</h2>
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
            <p className={styles.followTitle}>{t("followTitle")}</p>
            <p className={styles.followIntro}>{t("followIntro")}</p>
          </div>
          <a href="/feed.xml" className={`btn btn-secondary ${styles.followBtn}`}>
            <Rss /> {t("subscribeRss")}
          </a>
        </div>
      </footer>
    </article>
  );
}
