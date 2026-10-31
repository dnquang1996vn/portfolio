"use client";

import Image from "next/image";
import Link from "next/link";
import { useSite } from "@/components/providers/SiteProvider";
import { contact, jobs, pick, posts } from "@/content/portfolio";
import { ArrowUp, ArrowUpRight, LinkedIn, Mail, Phone } from "./Icons";
import styles from "./Footer.module.css";

export function Footer() {
  const { t, lang } = useSite();
  const employer = jobs[0];
  return (
    <div className="page">
      <footer className={styles.footer}>
        <div className={styles.cols}>
          <div className={styles.brandCol}>
            <Link href="/" className={styles.brand}>
              <Image className={styles.markLight} src="/images/quinndev-mark-v2.png" alt="" width={24} height={24} />
              <Image className={styles.markDark} src="/images/quinndev-mark-dark-v2.png" alt="" width={24} height={24} />
              <span>Quinn<span className={styles.accent}>Dev</span></span>
            </Link>
            <p className={styles.tagline}>{t.footerTagline}</p>
            <p className={styles.about}>{t.footerAbout}</p>
            <a className={styles.affil} href={employer.href} target="_blank" rel="noreferrer">
              <Image src={employer.logo} alt="" width={18} height={18} style={{ objectFit: employer.logoFit }} />
              <span>{t.footerAffiliation}</span>
            </a>
            <ul className={styles.social}>
              <li><a href={contact.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedIn /></a></li>
              <li><a href={`mailto:${contact.email}`} aria-label={`Email ${contact.email}`}><Mail /></a></li>
              <li><a href={contact.phoneHref} aria-label={contact.phone}><Phone /></a></li>
            </ul>
          </div>

          <nav aria-label={t.footerExplore}>
            <h2 className={styles.colTitle}>{t.footerExplore}</h2>
            <ul className={styles.list}>
              <li><Link href="/">{t.navHome}</Link></li>
              <li><Link href="/about">{t.navAbout}</Link></li>
              <li><Link href="/projects">{t.navProjects}</Link></li>
              <li><Link href="/contact">{t.navContact}</Link></li>
            </ul>
          </nav>

          <nav aria-label={t.footerContent}>
            <h2 className={styles.colTitle}>{t.footerContent}</h2>
            <ul className={styles.list}>
              <li><Link href="/blog">{t.navBlog}</Link></li>
              {posts.slice(0, 2).map((p) => (
                <li key={p.slug}><Link href={`/blog/${p.slug}`}>{pick(p.title, lang)}</Link></li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={styles.colTitle}>{t.footerColophon}</h2>
            <ul className={styles.list}>
              <li><a href="https://nextjs.org" target="_blank" rel="noreferrer">{t.builtWith} <ArrowUpRight /></a></li>
              <li><a href="https://vercel.com" target="_blank" rel="noreferrer">{t.hostedOn} <ArrowUpRight /></a></li>
              <li><span>{t.typeset}</span></li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          {/* No year: `new Date()` here breaks the Cache Components prerender, and a
              hard-coded year goes stale. */}
          <span>© Do Nhat Quang. {t.rights}</span>
          <div className={styles.bottomRight}>
            <span className={styles.place}>{t.footerPlace}</span>
            <a href="#" className="link-arrow">{t.backToTop} <ArrowUp /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
