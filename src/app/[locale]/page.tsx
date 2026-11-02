import type { Metadata } from "next";
import { alternates } from "@/i18n/metadata";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Work } from "@/components/Work";
import { Leadership } from "@/components/Leadership";
import { Explorations } from "@/components/Explorations";
import { FieldNotes } from "@/components/FieldNotes";
import { Contact } from "@/components/Contact";
import { PageEffects } from "@/components/PageEffects";

export const metadata: Metadata = { alternates: alternates("/") };

export default function Home() {
  return (
    <>
      <PageEffects />
      <main id="main" className="page" data-page="">
        <Hero />
        <Stats />
        <Work />
        <Leadership />
        <Explorations />
        <FieldNotes />
        <Contact />
      </main>
    </>
  );
}
