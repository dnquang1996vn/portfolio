"use client";

import Image from "next/image";
import Link from "next/link";
import { useSite } from "@/components/providers/SiteProvider";
import { useTypewriter } from "@/hooks/useTypewriter";
import { contact } from "@/content/portfolio";
import { typedWords } from "@/content/translations";
import { ArrowUpRight } from "./Icons";
import styles from "./Hero.module.css";

export function Hero() {
  const { t, lang } = useSite();
  const typed = useTypewriter(typedWords[lang]);

  return (
    <section id="about" data-screen-label="Hero" className={styles.section}>
      <div className={styles.hero} data-hero="">
        <div className={styles.text} data-hero-text="">
          <p className="kicker kicker-dot">{t.heroKicker}</p>
          <h1 className={styles.title}>
            {t.heroPrefix}{" "}
            <span className={styles.typedGroup}>
              <em>{typed}</em>
              <span data-caret="" className={styles.caret} aria-hidden="true" />,
            </span>
            <br />
            {t.heroTitle2}
          </h1>
          <p className={styles.intro}>{t.heroIntro}</p>
          <p className={styles.body}>{t.heroBody}</p>
          <div className={styles.actions}>
            <Link className="btn btn-primary" href="/projects">{t.exploreWork}</Link>
            <Link className="btn btn-ghost" href="/blog">{t.readBlog}</Link>
          </div>
          <ul className={styles.links}>
            <li><a href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight /></a></li>
            <li><Link href="/contact">{t.buildTogether}</Link></li>
          </ul>
        </div>

        <figure className={styles.figure} data-hero-figure="">
          <div className={styles.polaroid}>
            <Image
              src="/images/hero-desk.png"
              alt="Isometric diorama of Quinn Do at his desk workstation"
              width={1624}
              height={1637}
              priority
              sizes="(max-width: 860px) 80vw, 340px"
              className={styles.polaroidImg}
            />
            <p className={styles.name}>{t.heroName}</p>
            <p className={`mono ${styles.role}`}>{t.heroRole}</p>
          </div>
          <Link href="/about" className="link-arrow">{t.aboutMe}</Link>
          <figcaption className={styles.caption}>{t.heroCaption}</figcaption>
        </figure>
      </div>
    </section>
  );
}
