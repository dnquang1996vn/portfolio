"use client";

import Image from "next/image";
import { useSite } from "@/components/providers/SiteProvider";
import { pick, type Project } from "@/content/portfolio";
import { ArrowUpRight } from "./Icons";
import { BulletList } from "./BulletList";
import styles from "./FeaturedProject.module.css";

interface Props {
  project: Project;
  /** Adds the overview and bullet points; the home page shows the short version. */
  detailed?: boolean;
}

export function FeaturedProject({ project, detailed = false }: Props) {
  const { t, lang } = useSite();
  const name = pick(project.short, lang);
  return (
    <article className={`card ${styles.card}`}>
      <div className={styles.text}>
        <p className={styles.kicker}>{pick(project.kicker, lang)}</p>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.sub}>{pick(project.subtitle, lang)}</p>
        <p className={styles.body}>{detailed ? pick(project.overview, lang) : pick(project.tagline, lang)}</p>
        {detailed && <BulletList items={project.points} className={styles.points} />}
        <div className={styles.tags}>
          {project.stack.map((s) => <span key={s} className="tag">{s}</span>)}
        </div>
        <div className={styles.foot}>
          {project.url ? (
            <a className="link-arrow" href={project.href} target="_blank" rel="noreferrer">
              {t.explore} {name.replace(/\.$/, "")} <ArrowUpRight />
            </a>
          ) : null}
          <span className="mono">{pick(project.period, lang)}</span>
        </div>
      </div>

      <figure className={`frame ${styles.media}`}>
        <div className="frame-bar"><span>{project.frameLabel}</span></div>
        <div className={styles.img}>
          <Image
            src={project.image}
            alt=""
            fill
            sizes="(max-width: 860px) 100vw, 600px"
            style={{ objectFit: "cover", objectPosition: project.imagePos }}
          />
        </div>
        <figcaption className="frame-cap"><span>{pick(project.frameCaption, lang)}</span></figcaption>
      </figure>
    </article>
  );
}
