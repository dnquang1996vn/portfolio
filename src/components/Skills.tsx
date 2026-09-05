"use client";

import { useSite } from "@/components/providers/SiteProvider";
import { skills, type Skill } from "@/content/portfolio";
import styles from "./Skills.module.css";

function SkillCard({ skill }: { skill: Skill }) {
  return (
    <div className={`card ${styles.card}`} data-skill-card="">
      <div className={styles.top}>
        <p className={styles.num}>{skill.num}</p>
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
    </div>
  );
}

export function Skills() {
  const { t } = useSite();
  return (
    <section id="skills" data-band="" data-screen-label="Skills">
      <p className="kicker">{t.secSkills}</p>
      <h2 className={`section-title ${styles.heading}`}>{t.skillsTitle}</h2>
      <div data-skill-grid="" className={styles.grid}>
        {skills.map((s) => <SkillCard key={s.num} skill={s} />)}
      </div>
    </section>
  );
}
