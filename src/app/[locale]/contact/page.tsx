import type { Metadata } from "next";
import { alternates } from "@/i18n/metadata";
import { PageHead } from "@/components/PageHead";
import { ContactForm } from "@/components/ContactForm";
import { contact } from "@/content/portfolio";
import { getLabels } from "@/i18n/labels";

export const metadata: Metadata = {
  title: "Contact — Quinn Do",
  description: "Have a product to build or a hard technical question? Get in touch with Quinn Do.",
  alternates: alternates("/contact"),
};

export default async function ContactPage() {
  return (
    <main id="main" className="page" data-page="">
      <PageHead kicker="contactKicker" title="contactTitle" intro="contactIntro" />
      <ContactForm
        contact={contact}
        t={await getLabels([
          "contactLeadBody", "contactLeadTitle", "contactNote", "formEmail", "formError", "formHelper", "formInvalidEmail",
          "formMessage", "formName", "formRequired", "preferEmail", "sendAnother", "sendMessage", "sending", "sentBody", "sentTitle",
        ])}
      />
    </main>
  );
}
