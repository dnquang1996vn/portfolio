"use client";

import type { Labels } from "@/i18n/labels";
import { useEffect, useRef } from "react";
import type { Skill } from "@/content/portfolio";
import { Close } from "./Icons";
import styles from "./SkillDialog.module.css";

/** A skill with its text already in the page's language, so the bilingual content stays on the server. */
export type SkillView = Omit<Skill, "summary" | "built" | "apply"> & {
  summary: string;
  built: string[];
  apply: string[];
};

const FIRST_YEAR = 2017;
const THIS_YEAR = new Date().getFullYear();

/**
 * Detail sheet for one skill: years of practice on a ruled track, what was built, how it is used.
 * Native <dialog> gives focus trapping, Esc and focus return for free.
 */
export type SkillLabels = Labels<"skillDetails" | "close" | "skillApply" | "skillBuilt" | "skillSince" | "skillYear" | "skillYears">;

export function SkillDialog({ skill, onClose, t }: { skill: SkillView | null; onClose: () => void; t: SkillLabels }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (skill && !el.open) el.showModal();
    if (!skill && el.open) el.close();
  }, [skill]);

  const years = skill ? Math.max(1, THIS_YEAR - skill.since) : 0;
  const span = THIS_YEAR - FIRST_YEAR;
  const fill = skill ? ((THIS_YEAR - skill.since) / span) * 100 : 0;

  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      onClose={onClose}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      aria-labelledby="skill-dialog-title"
    >
      {skill && (
        <div className={styles.sheet}>
          <div className={styles.head}>
            <div className={styles.logos}>
              {skill.logos.map((lg) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={lg.slug} src={`https://cdn.simpleicons.org/${lg.slug}`} alt={lg.name} title={lg.name} width={24} height={24} className={styles.logo} />
              ))}
            </div>
            <button type="button" className={`btn btn-secondary btn-icon ${styles.close}`} onClick={onClose} aria-label={t.close}>
              <Close />
            </button>
          </div>

          <h2 id="skill-dialog-title" className={styles.title}>{skill.title}</h2>
          <p className={styles.summary}>{skill.summary}</p>

          <div className={styles.years}>
            <p className={styles.yearsLine}>
              <span className={styles.yearsNum}>{years}</span>
              <span className={styles.yearsUnit}>{years === 1 ? t.skillYear : t.skillYears}</span>
              <span className={styles.yearsSince}>{t.skillSince} {skill.since}</span>
            </p>
            {/* The track runs from the first year of the career to now; the filled part is this skill. */}
            <div className={styles.track} aria-hidden="true">
              <span className={styles.trackFill} style={{ width: `${fill}%` }} />
              <span className={styles.tick} style={{ left: 0 }}>{FIRST_YEAR}</span>
              <span className={`${styles.tick} ${styles.tickEnd}`}>{THIS_YEAR}</span>
            </div>
          </div>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>{t.skillBuilt}</h3>
            <ul className={`bullets ${styles.bullets}`}>
              {skill.built.map((b, i) => <li key={i}><span aria-hidden="true" /><span>{b}</span></li>)}
            </ul>
          </section>
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>{t.skillApply}</h3>
            <ul className={`bullets ${styles.bullets}`}>
              {skill.apply.map((b, i) => <li key={i}><span aria-hidden="true" /><span>{b}</span></li>)}
            </ul>
          </section>

          <div className={styles.tags}>
            {skill.tags.map((tag) => <span key={tag} className="tag tag-neutral">{tag}</span>)}
          </div>
        </div>
      )}
    </dialog>
  );
}
