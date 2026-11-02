"use client";

import { useCallback, useState, type CSSProperties, type PointerEvent } from "react";
import { Plus } from "./Icons";
import { SkillDialog, type SkillLabels, type SkillView } from "./SkillDialog";
import styles from "./Skills.module.css";

function SkillCard({ skill, index, onOpen, t }: { skill: SkillView; index: number; onOpen: (s: SkillView) => void; t: SkillLabels }) {
  return (
    <div
      className={`card ${styles.card}`}
      data-skill-card=""
      style={{ "--i": index } as CSSProperties}
    >
      {/* Light play: a prismatic sheen, a cursor-led glint and three twinkles. All decorative. */}
      <span className={styles.ring} aria-hidden="true" />
      <span className={styles.sheen} aria-hidden="true" />
      <span className={styles.glow} aria-hidden="true" />
      <span className={styles.spark} aria-hidden="true" />
      <span className={styles.spark} aria-hidden="true" />
      <span className={styles.spark} aria-hidden="true" />
      <div className={styles.top}>
        <div className={styles.logos}>
          {skill.logos.map((lg) => (
            // Simple Icons serves SVG; a plain <img> matches the design and avoids next/image SVG config.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={lg.slug}
              src={`https://cdn.simpleicons.org/${lg.slug}`}
              alt={lg.name}
              title={lg.name}
              width={28}
              height={28}
              loading="lazy"
              className={styles.logo}
            />
          ))}
        </div>
      </div>
      <h3 className={styles.title}>{skill.title}</h3>
      <div className={styles.tags}>
        {skill.tags.map((tag) => <span key={tag} className="tag tag-neutral">{tag}</span>)}
      </div>
      <button type="button" className={`btn btn-ghost btn-sm ${styles.details}`} onClick={() => onOpen(skill)} aria-haspopup="dialog">
        <Plus /> {t.skillDetails}
      </button>
    </div>
  );
}

/** The interactive part of the Skills section: cards that catch the light and open a detail sheet. */
export function SkillsGrid({ skills, t }: { skills: SkillView[]; t: SkillLabels }) {
  const [open, setOpen] = useState<SkillView | null>(null);

  // The glint follows the pointer and the card tilts a few degrees toward it, like a facet catching light.
  const onPointerMove = useCallback((e: PointerEvent<HTMLDivElement>) => {
    const card = (e.target as HTMLElement).closest<HTMLElement>("[data-skill-card]");
    if (!card) return;
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);
    card.style.setProperty("--ry", `${((x / r.width) - 0.5) * 8}deg`);
    card.style.setProperty("--rx", `${(0.5 - (y / r.height)) * 8}deg`);
  }, []);
  const onPointerOut = useCallback((e: PointerEvent<HTMLDivElement>) => {
    const card = (e.target as HTMLElement).closest<HTMLElement>("[data-skill-card]");
    if (!card || card.contains(e.relatedTarget as Node | null)) return;
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  }, []);

  return (
    <>
      <div data-skill-grid="" className={styles.grid} onPointerMove={onPointerMove} onPointerOut={onPointerOut}>
        {skills.map((s, i) => <SkillCard key={s.num} skill={s} index={i} onOpen={setOpen} t={t} />)}
      </div>
      <SkillDialog skill={open} onClose={() => setOpen(null)} t={t} />
    </>
  );
}
