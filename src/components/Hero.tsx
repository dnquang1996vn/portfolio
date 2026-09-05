"use client";

import Image from "next/image";
import { useSite } from "@/components/providers/SiteProvider";
import { useTypewriter } from "@/hooks/useTypewriter";
import { contact } from "@/content/portfolio";
import { typedWords } from "@/content/translations";
import styles from "./Hero.module.css";

export function Hero() {
  const { t, lang } = useSite();
  const typed = useTypewriter(typedWords[lang]);

  return (
    <section id="about" data-screen-label="About" className={styles.hero}>
      <div className={styles.text}>
        <p className="kicker">{t.kicker}</p>
        <h1 className={styles.title}>
          <span className={styles.line1}>
            {t.heroPrefix}{" "}
            <span className={styles.typedGroup}>
              <span className={styles.typed}>{typed}</span>
              <span data-caret="" className={styles.caret} aria-hidden="true" />,
            </span>
          </span>
          <span className={styles.line2}>{t.heroLine2}</span>
        </h1>
        <p className={styles.tagline}>{t.heroTagline}</p>
        <div className={styles.actions}>
          <a className="btn btn-primary" href="#projects">{t.seeProjects}</a>
          <a className="btn btn-secondary" href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="btn btn-secondary btn-icon" href={`mailto:${contact.email}`} aria-label={`Email ${contact.email}`} title={contact.email}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </a>
        </div>
      </div>
      <figure data-media="" className={styles.portrait}>
        <Image
          src="/images/portrait.png"
          alt="Portrait of Quinn Do"
          width={960}
          height={1200}
          priority
          sizes="(max-width: 720px) 100vw, 40vw"
          className={styles.portraitImg}
        />
      </figure>
    </section>
  );
}
