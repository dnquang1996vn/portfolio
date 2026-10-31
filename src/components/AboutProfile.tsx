"use client";

import Image from "next/image";
import { useSite } from "@/components/providers/SiteProvider";
import { contact, pick, profile } from "@/content/portfolio";
import { ArrowUpRight } from "./Icons";
import styles from "./AboutProfile.module.css";

export function AboutProfile() {
  const { t, lang } = useSite();
  return (
    <section data-screen-label="Profile" className={styles.section}>
      <p className="kicker">01 / {t.secProfile}</p>
      <div className={styles.grid}>
        <div className={styles.bio}>
          {profile.bio.map((p, i) => <p key={i}>{pick(p, lang)}</p>)}
          <ul className={styles.links}>
            <li><a href={contact.linkedin} target="_blank" rel="noreferrer" className="link-arrow">LinkedIn <ArrowUpRight /></a></li>
            <li><a href={`mailto:${contact.email}`} className="link-arrow">{contact.email}</a></li>
          </ul>
        </div>
        <aside className={styles.side}>
          <figure className={`frame ${styles.portrait}`}>
            <Image
              src="/images/hero-desk.png"
              alt="Isometric diorama of Quinn Do at his desk workstation"
              width={1624}
              height={1637}
              sizes="(max-width: 860px) 100vw, 360px"
              className={styles.portraitImg}
            />
          </figure>
          <dl className={styles.facts}>
            {profile.facts.map((f, i) => (
              <div key={i} className={styles.fact}>
                <dt className="mono">{pick(f.label, lang)}</dt>
                <dd>{pick(f.value, lang)}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  );
}
