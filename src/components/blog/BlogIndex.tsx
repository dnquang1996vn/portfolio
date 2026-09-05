"use client";

import Image from "next/image";
import Link from "next/link";
import { useSite } from "@/components/providers/SiteProvider";
import { pick, posts } from "@/content/portfolio";
import styles from "./BlogIndex.module.css";

export function BlogIndex() {
  const { t, lang } = useSite();
  return (
    <section data-screen-label="Blog index" className={styles.section}>
      <p className="kicker">{t.secBlog}</p>
      <h1 className={`section-title ${styles.title}`}>{t.blogIndexTitle}</h1>
      <p className={styles.intro}>{t.blogIndexIntro}</p>
      <div className={styles.grid}>
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.post}>
            <figure className={`grayscale ${styles.media}`} data-media="">
              <Image src={post.image} alt="" width={900} height={600} sizes="(max-width: 720px) 100vw, (max-width: 1000px) 50vw, 33vw" className={styles.mediaImg} />
            </figure>
            <div className={styles.meta}>
              <span className={styles.topic}>{pick(post.topic, lang)}</span>
              <span>·</span>
              <span>{pick(post.read, lang)}</span>
              <span>·</span>
              <span>{post.date}</span>
            </div>
            <h2 className={styles.postTitle}>{pick(post.title, lang)}</h2>
            <p className={styles.summary}>{pick(post.summary, lang)}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
