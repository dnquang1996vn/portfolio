import type { Metadata } from "next";
import { PageHead } from "@/components/PageHead";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Quinn Do",
  description: "Have a product to build or a hard technical question? Get in touch with Quinn Do.",
};

export default function ContactPage() {
  return (
    <main id="main" className="page" data-page="">
      <PageHead kicker="contactKicker" title="contactTitle" intro="contactIntro" />
      <ContactForm />
    </main>
  );
}
