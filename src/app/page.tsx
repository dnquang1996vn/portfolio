import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Feedback } from "@/components/Feedback";
import { Blog } from "@/components/Blog";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { PageEffects } from "@/components/PageEffects";

export default function Home() {
  return (
    <>
      <PageEffects />
      <Nav />
      <div className="page" data-page="">
        <Hero />
        <Stats />
        <Experience />
        <Skills />
        <Projects />
        <Feedback />
        <Blog />
      </div>
      <Contact />
      <Footer />
    </>
  );
}
