"use client";

import Image from "next/image";
import { useSite } from "@/components/providers/SiteProvider";
import { pick, projects, type Project } from "@/content/portfolio";
import { BulletList } from "./BulletList";
import styles from "./Projects.module.css";

function ProjectArticle({ project }: { project: Project }) {
  const { lang } = useSite();
  return (
    <article className={styles.article} data-project-row="">
      <figure data-media="" className={styles.cover}>
        <div className={`grayscale ${styles.coverImage}`}>
          <Image
            src={project.image}
            alt=""
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            style={{ objectFit: "cover", objectPosition: project.imagePos }}
          />
        </div>
        <div data-project-cover="" className={styles.overlay}>
          <p className={styles.num}>{project.num} — {pick(project.role, lang)}</p>
          <h2 className={styles.name}>{pick(project.name, lang)}</h2>
          <p className={styles.tagline}>{pick(project.tagline, lang)}</p>
          <div className={styles.stack}>
            {project.stack.map((s) => <span key={s} className={`tag ${styles.stackTag}`}>{s}</span>)}
          </div>
        </div>
      </figure>
      <div data-project-body="" className={styles.body}>
        <div>
          <p className={styles.overview}>{pick(project.overview, lang)}</p>
          {project.url && (
            <p className={styles.linkRow}>
              <a href={project.href} target="_blank" rel="noreferrer" className={styles.link}>{project.url}</a>
            </p>
          )}
        </div>
        <BulletList items={project.points} gap={12} />
      </div>
    </article>
  );
}

export function Projects() {
  const { t } = useSite();
  return (
    <section id="projects" data-screen-label="Projects">
      <p className="kicker">{t.secProjects}</p>
      {projects.map((p) => <ProjectArticle key={p.num} project={p} />)}
    </section>
  );
}
