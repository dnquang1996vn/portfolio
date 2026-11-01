"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { contact, pick, profile } from "@/content/portfolio";
import { Close, LinkedIn, Mail } from "./Icons";
import styles from "./ProfileCard.module.css";

/** Sticky identity card for the About page: portrait, name, key facts and contact actions. */
export function ProfileCard() {
  const { t, lang } = useSite();
  const [portraitOpen, setPortraitOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Native <dialog> gives focus trapping, Esc and focus return for free.
  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (portraitOpen && !el.open) el.showModal();
    if (!portraitOpen && el.open) el.close();
  }, [portraitOpen]);

  return (
    <aside data-screen-label="Profile card" className={styles.card} aria-label={t.secProfile}>
      <div className={styles.identity}>
        <button type="button" className={styles.avatarRing} onClick={() => setPortraitOpen(true)} aria-label={t.viewPortrait}>
          <Image
            src="/images/portrait.jpg"
            alt="Quinn Do"
            width={800}
            height={800}
            sizes="(max-width: 960px) 96px, 152px"
            priority
            className={styles.avatar}
          />
        </button>
        <dialog
          ref={dialogRef}
          className={styles.portraitDialog}
          onClose={() => setPortraitOpen(false)}
          onClick={(e) => { if (e.target === e.currentTarget) setPortraitOpen(false); }}
          aria-label={t.viewPortrait}
        >
          {portraitOpen && (
            <figure className={styles.portraitFigure}>
              <Image
                src="/images/portrait.jpg"
                alt="Quinn Do"
                width={800}
                height={800}
                sizes="(max-width: 760px) 92vw, 680px"
                className={styles.portraitFull}
              />
              <figcaption className={styles.portraitCaption}>
                <span className={styles.portraitName}>{t.heroName}</span>
                <span className="mono">{t.heroRole}</span>
              </figcaption>
              <button type="button" className={`btn btn-secondary btn-icon ${styles.portraitClose}`} onClick={() => setPortraitOpen(false)} aria-label={t.close}>
                <Close />
              </button>
            </figure>
          )}
        </dialog>
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
