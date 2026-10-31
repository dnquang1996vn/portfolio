import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { PageHead } from "@/components/PageHead";
import { ProjectsList } from "@/components/ProjectsList";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { PageEffects } from "@/components/PageEffects";

export const metadata: Metadata = {
  title: "Projects — Quinn Do",
  description: "Welle, Bamboo and a UK property data platform: three products led from brief to production.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageEffects />
      <Nav />
      <main id="main" className="page" data-page="">
        <PageHead kicker="projectsKicker" title="projectsTitle" intro="projectsIntro" />
        <ProjectsList />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
