"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { Moon, Sun } from "./Icons";
import styles from "./Nav.module.css";

export function Nav() {
  const { t, theme, toggleTheme, toggleLang, lang } = useSite();
  const isDark = theme === "dark";
  const pathname = usePathname();
  const pillRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  const items: { href: string; label: string; active: boolean }[] = [
    { href: "/", label: t.navHome, active: pathname === "/" },
    { href: "/about", label: t.navAbout, active: pathname === "/about" },
    { href: "/projects", label: t.navProjects, active: pathname === "/projects" },
    { href: "/blog", label: t.navBlog, active: pathname.startsWith("/blog") },
    { href: "/contact", label: t.navContact, active: pathname === "/contact" },
  ];

  // The filled pill is one element that slides between tabs. It is measured from the
  // current link (labels change width with the language) and re-measured on resize.
  useLayoutEffect(() => {
    const pill = pillRef.current;
    const indicator = indicatorRef.current;
    if (!pill || !indicator) return;

    const place = () => {
      const active = pill.querySelector<HTMLAnchorElement>('a[aria-current="page"]');
      if (!active) {
        indicator.style.opacity = "0";
        return;
      }
      indicator.style.opacity = "1";
      indicator.style.width = `${active.offsetWidth}px`;
      indicator.style.transform = `translateX(${active.offsetLeft}px)`;
      // Phones scroll the pill sideways: keep the current tab in view.
      const left = active.offsetLeft - (pill.clientWidth - active.offsetWidth) / 2;
      if (pill.scrollWidth > pill.clientWidth) pill.scrollTo({ left, behavior: "smooth" });
    };

    place();
    pill.dataset.ready = "";
    const ro = new ResizeObserver(place);
    ro.observe(pill);
    return () => ro.disconnect();
  }, [pathname, lang]);

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Main">
        <Link className={styles.skip} href="#main">{t.skipToContent}</Link>
        <Link className={styles.brand} href="/">
          <Image className={styles.markLight} src="/images/quinndev-mark-v2.png" alt="" width={28} height={28} priority />
          <Image className={styles.markDark} src="/images/quinndev-mark-dark-v2.png" alt="" width={28} height={28} priority />
          <span className={styles.brandText}>
            <span className={styles.brandName}>Quinn<span className={styles.brandAccent}>Dev</span></span>
            <span className={styles.brandTagline}>{t.brandTagline}</span>
          </span>
        </Link>

        <div className={styles.pill} ref={pillRef}>
          <span className={styles.indicator} ref={indicatorRef} aria-hidden="true" />
          {items.map((item) => (
            <Link key={item.href} href={item.href} aria-current={item.active ? "page" : undefined}>
              {item.label}
            </Link>
          ))}
        </div>

        <div className={styles.right}>
          <Link className={`btn btn-primary btn-sm ${styles.cta}`} href="/contact">
            {t.letsTalk}
          </Link>
          <button
            type="button"
            className="btn btn-secondary btn-sm btn-lang"
            onClick={toggleLang}
            aria-label={t.switchLang}
            title={t.langTitle}
            lang={lang === "vi" ? "en" : "vi"}
          >
            {t.langLabel}
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-sm btn-icon"
            onClick={toggleTheme}
            aria-label={t.toggleTheme}
            aria-pressed={isDark}
            title={isDark ? t.themeToLight : t.themeToDark}
          >
            {isDark ? <Sun /> : <Moon />}
          </button>
        </div>
      </nav>
    </header>
  );
}
