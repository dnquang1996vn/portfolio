import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { PageHead } from "@/components/PageHead";
import { AboutProfile } from "@/components/AboutProfile";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Feedback } from "@/components/Feedback";
import { Credentials } from "@/components/Credentials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { PageEffects } from "@/components/PageEffects";

export const metadata: Metadata = {
  title: "About — Quinn Do",
  description: "Senior full-stack developer and tech lead in Hanoi: profile, skills, career journey and credentials.",
};

export default function AboutPage() {
  return (
    <>
      <PageEffects />
      <Nav />
      <main id="main" className="page" data-page="">
        <PageHead kicker="aboutKicker" title="aboutTitle" intro="aboutIntro" />
        <AboutProfile />
        <Skills />
        <Experience />
        <Feedback />
        <Credentials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
