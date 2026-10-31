import type { Metadata } from "next";
import { PageHead } from "@/components/PageHead";
import { ProfileCard } from "@/components/ProfileCard";
import { AboutProfile } from "@/components/AboutProfile";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Feedback } from "@/components/Feedback";
import { Credentials } from "@/components/Credentials";
import { Contact } from "@/components/Contact";
import { PageEffects } from "@/components/PageEffects";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About — Quinn Do",
  description: "Senior full-stack developer and tech lead in Hanoi: profile, skills, career journey and credentials.",
};

export default function AboutPage() {
  return (
    <>
      <PageEffects />
      <main id="main" className="page" data-page="">
        <PageHead kicker="aboutKicker" title="aboutTitle" intro="aboutIntro" />
        <div className={styles.layout}>
          <div className={styles.side}>
            <ProfileCard />
          </div>
          <div className={styles.content}>
            <AboutProfile />
            <Skills />
            <Experience />
          </div>
        </div>
        <Feedback />
        <Credentials />
        <Contact />
      </main>
    </>
  );
}
