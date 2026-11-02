import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { locale as rootLocale } from "next/root-params";
import { translations } from "@/content/translations";
import { routing } from "./routing";

// The locale comes from the [locale] root segment (next/root-params) rather than request
// headers, so next-intl's server APIs keep pages statically prerendered.
export default getRequestConfig(async () => {
  const requested = await rootLocale();
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  return { locale, messages: translations[locale] };
});
