"use client";

import Image from "next/image";
import Link from "next/link";
import { useSite } from "@/components/providers/SiteProvider";
import { contact } from "@/content/portfolio";
import styles from "./Nav.module.css";

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

export function Nav() {
  const { t, theme, toggleTheme, toggleLang, lang } = useSite();
  const isDark = theme === "dark";

  return (
    <nav className={`nav ${styles.nav}`}>
      <Link className={`nav-brand ${styles.brand}`} href="/#about">
        <Image className={styles.markLight} src="/images/quinndev-mark-v2.png" alt="" width={24} height={24} priority />
        <Image className={styles.markDark} src="/images/quinndev-mark-dark-v2.png" alt="" width={24} height={24} priority />
        <span className={styles.brandText}>
          Quinn<span className={styles.brandAccent}>Dev</span>
        </span>
      </Link>
      <Link href="/#about">{t.navAbout}</Link>
      <Link href="/#skills">{t.navSkills}</Link>
      <Link href="/#projects">{t.navProjects}</Link>
      <Link href="/#feedback">{t.navFeedback}</Link>
      <Link href="/blog">{t.navBlog}</Link>
      <a className="btn btn-primary" href={`mailto:${contact.email}`}>{t.hire}</a>
      <button
        type="button"
        className="btn btn-secondary btn-lang"
        onClick={toggleLang}
        aria-label={t.switchLang}
        title={t.langTitle}
        lang={lang === "vi" ? "en" : "vi"}
      >
        {t.langLabel}
      </button>
      <button
        type="button"
        className="btn btn-secondary btn-icon"
        onClick={toggleTheme}
        aria-label={t.toggleTheme}
        aria-pressed={isDark}
        title={isDark ? t.themeToLight : t.themeToDark}
      >
        {isDark ? <SunIcon /> : <MoonIcon />}
      </button>
    </nav>
  );
}
