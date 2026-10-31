"use client";

import Image from "next/image";
import Link from "next/link";
import { useSite } from "@/components/providers/SiteProvider";
import { contact, pick, profile } from "@/content/portfolio";
import { LinkedIn, Mail } from "./Icons";
import styles from "./ProfileCard.module.css";

/** Sticky identity card for the About page: portrait, name, key facts and contact actions. */
export function ProfileCard() {
  const { t, lang } = useSite();
  return (
    <aside data-screen-label="Profile card" className={styles.card} aria-label={t.secProfile}>
      <div className={styles.identity}>
        <div className={styles.avatarRing}>
          <Image
            src="/images/portrait.jpg"
            alt="Quinn Do"
            width={800}
            height={800}
            sizes="(max-width: 960px) 96px, 152px"
            priority
            className={styles.avatar}
          />
        </div>
        <div className={styles.names}>
          <p className={styles.name}>{t.heroName}</p>
          <p className={styles.native}>Đỗ Nhật Quang</p>
          <p className={styles.kicker}>{t.brandTagline}</p>
        </div>
      </div>

      <dl className={styles.facts}>
        {profile.facts.map((f, i) => (
          <div key={i} className={styles.fact}>
            <dt className="mono">{pick(f.label, lang)}</dt>
            <dd>{pick(f.value, lang)}</dd>
          </div>
        ))}
      </dl>

      <div className={styles.actions}>
        <Link href="/contact" className={`btn btn-primary ${styles.primary}`}>
          <Mail /> {t.navContact}
        </Link>
        <a
          href={contact.linkedin}
          target="_blank"
          rel="noreferrer"
          className="btn btn-secondary btn-icon"
          aria-label="LinkedIn"
          title="LinkedIn"
        >
          <LinkedIn />
        </a>
        <a
          href={`mailto:${contact.email}`}
          className="btn btn-secondary btn-icon"
          aria-label={contact.email}
          title={contact.email}
        >
          <Mail />
        </a>
      </div>
    </aside>
  );
}
