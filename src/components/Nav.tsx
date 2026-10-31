"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSite } from "@/components/providers/SiteProvider";
import { contact } from "@/content/portfolio";
import { Moon, Sun } from "./Icons";
import styles from "./Nav.module.css";

export function Nav() {
  const { t, theme, toggleTheme, toggleLang, lang } = useSite();
  const isDark = theme === "dark";
  const pathname = usePathname();

  const items: { href: string; label: string; active: boolean }[] = [
    { href: "/", label: t.navHome, active: pathname === "/" },
    { href: "/about", label: t.navAbout, active: pathname === "/about" },
    { href: "/projects", label: t.navProjects, active: pathname === "/projects" },
    { href: "/blog", label: t.navBlog, active: pathname.startsWith("/blog") },
    { href: "/#contact", label: t.navContact, active: false },
  ];

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

        <div className={styles.pill}>
          {items.map((item) => (
            <Link key={item.href} href={item.href} aria-current={item.active ? "page" : undefined}>
              {item.label}
            </Link>
          ))}
        </div>

        <div className={styles.right}>
          <a className={`btn btn-primary btn-sm ${styles.cta}`} href={`mailto:${contact.email}`}>
            {t.letsTalk}
          </a>
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
