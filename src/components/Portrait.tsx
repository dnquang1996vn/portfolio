"use client";

import type { Labels } from "@/i18n/labels";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Close } from "./Icons";
import styles from "./ProfileCard.module.css";

/** The About card's avatar, and the lightbox it opens with the full portrait. */
export function Portrait({ t }: { t: Labels<"close" | "heroName" | "heroRole" | "viewPortrait"> }) {
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
    <>
      <button type="button" className={styles.avatarRing} onClick={() => setPortraitOpen(true)} aria-label={t.viewPortrait}>
        <Image
          src="/images/portrait.jpg"
          alt="Quinn Do"
          width={800}
          height={800}
          sizes="(max-width: 960px) 96px, 152px"
          preload
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
    </>
  );
}
