import { defineRouting } from "next-intl/routing";

export const LOCALE_COOKIE = "NEXT_LOCALE";

/**
 * Every page lives under its locale: /en/... and /vi/... A path without one (the root, or an
 * old link like /blog) is redirected by the proxy to the visitor's language: the locale they
 * last chose (NEXT_LOCALE cookie), else the browser's Accept-Language, else English.
 */
export const routing = defineRouting({
  locales: ["en", "vi"],
  defaultLocale: "en",
  localePrefix: "always",
  // A language picked with the switch outlives the session (the default is a session cookie).
  localeCookie: { name: LOCALE_COOKIE, maxAge: 60 * 60 * 24 * 365 },
});

export type Locale = (typeof routing.locales)[number];
