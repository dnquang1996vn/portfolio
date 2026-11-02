import type { Metadata } from "next";
import { routing } from "./routing";

/**
 * hreflang links for a page that exists in every locale: `path` is written without the
 * locale ("/blog"). Search engines then index /en and /vi as translations of one page.
 */
export function alternates(path: string): Metadata["alternates"] {
  const suffix = path === "/" ? "" : path;
  const languages: Record<string, string> = Object.fromEntries(routing.locales.map((l) => [l, `/${l}${suffix}`]));
  languages["x-default"] = `/${routing.defaultLocale}${suffix}`;
  return { languages };
}
