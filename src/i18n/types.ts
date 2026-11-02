import type { T } from "@/content/translations";
import type { Locale } from "./routing";

// Types next-intl's APIs: useTranslations()/getTranslations() only accept existing keys,
// and useLocale()/getLocale() return "en" | "vi".
declare module "next-intl" {
  interface AppConfig {
    Locale: Locale;
    Messages: T;
  }
}
