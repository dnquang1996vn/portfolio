"use client";

import Link from "next/link";
import { useSite } from "@/components/providers/SiteProvider";
import { projects } from "@/content/portfolio";
import { FeaturedProject } from "./FeaturedProject";

export function Work() {
  const { t } = useSite();
  return (
    <section id="projects" data-screen-label="Selected work">
      <div className="section-head">
        <div>
          <p className="kicker">01 / {t.secWork}</p>
          <h2 className="section-title">{t.workTitle}</h2>
        </div>
        <Link href="/projects" className="link-arrow">{t.allProjects}</Link>
      </div>
      <FeaturedProject project={projects[0]} />
    </section>
  );
}
