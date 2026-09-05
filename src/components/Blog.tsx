"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { pick, posts } from "@/content/portfolio";
import styles from "./Blog.module.css";

export function Blog() {
  const { t, lang } = useSite();
  const gridRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const sync = useCallback(() => {
    const el = gridRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth - 1;
    const x = el.scrollLeft;
    setCanPrev(x > 2);
    setCanNext(x < max);
  }, []);

  useEffect(() => {
    const id = setTimeout(sync, 300);
    window.addEventListener("resize", sync);
    return () => {
      clearTimeout(id);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const step = (dir: -1 | 1) => {
    const el = gridRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 24;
    el.scrollBy({ left: dir * ((card ? card.getBoundingClientRect().width : 300) + gap), behavior: "smooth" });
  };

  return (
    <section id="blog" data-screen-label="Blog">
      <div className={styles.header}>
        <div>
          <p className="kicker">{t.secBlog}</p>
          <h2 className="section-title">{t.blogTitle}</h2>
        </div>
        <div className={styles.controls}>
          <a className="btn btn-secondary" href="#blog">{t.allPosts}</a>
          <button
            type="button"
            className="btn btn-secondary btn-icon"
            onClick={() => step(-1)}
            aria-label={t.prevPosts}
            style={{ visibility: canPrev ? "visible" : "hidden" }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-icon"
            onClick={() => step(1)}
            aria-label={t.nextPosts}
            style={{ visibility: canNext ? "visible" : "hidden" }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        </div>
      </div>
      <div className={styles.frame}>
        <div className={`${styles.fade} ${styles.fadeL}`} style={{ opacity: canPrev ? 1 : 0 }} aria-hidden="true" />
        <div className={`${styles.fade} ${styles.fadeR}`} style={{ opacity: canNext ? 1 : 0 }} aria-hidden="true" />
        <div data-blog-grid="" ref={gridRef} onScroll={sync} className={styles.grid}>
          {posts.map((post) => (
            <a key={post.slug} data-post="" href="#blog" className={styles.post}>
              <figure className={`grayscale ${styles.media}`} data-media="">
                <Image
                  src={post.image}
                  alt=""
                  width={900}
                  height={600}
                  sizes="(max-width: 720px) 78vw, (max-width: 1000px) 45vw, 30vw"
                  className={styles.mediaImg}
                />
              </figure>
              <div className={styles.meta}>
                <span className={styles.topic}>{pick(post.topic, lang)}</span>
                <span>·</span>
                <span>{pick(post.read, lang)}</span>
              </div>
              <h3 className={styles.title}>{pick(post.title, lang)}</h3>
              <p className={styles.summary}>{pick(post.summary, lang)}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
