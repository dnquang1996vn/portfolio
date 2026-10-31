import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Work } from "@/components/Work";
import { Leadership } from "@/components/Leadership";
import { Explorations } from "@/components/Explorations";
import { FieldNotes } from "@/components/FieldNotes";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { PageEffects } from "@/components/PageEffects";

export default function Home() {
  return (
    <>
      <PageEffects />
      <Nav />
      <main id="main" className="page" data-page="">
        <Hero />
        <Stats />
        <Work />
        <Leadership />
        <Explorations />
        <FieldNotes />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
