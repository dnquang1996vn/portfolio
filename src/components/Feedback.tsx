import { getLocale, getTranslations } from "next-intl/server";
import { feedback, pick } from "@/content/portfolio";
import { FeedbackCarousel } from "./FeedbackCarousel";

export async function Feedback() {
  const t = await getTranslations();
  const lang = await getLocale();
  const quotes = feedback.map((f) => ({ quote: pick(f.quote, lang), name: pick(f.name, lang), role: pick(f.role, lang) }));
  return <FeedbackCarousel feedback={quotes} kicker={t("secFeedback")} title={t("feedbackTitle")} />;
}
