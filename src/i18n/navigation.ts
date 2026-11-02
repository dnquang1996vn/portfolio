import type { Locale } from "./routing";

/**
 * Prefixes an in-site path with a locale: ("vi", "/blog?tag=ai") -> "/vi/blog?tag=ai".
 * Fragments and absolute URLs are returned as they are.
 *
 * Links use plain next/link with this rather than next-intl's navigation APIs: those need
 * NextIntlClientProvider in the browser, which ships next-intl's message formatter
 * (~20 KB gzip) even when no component translates on the client.
 */
export function localePath(locale: Locale, path: string): string {
  if (!path.startsWith("/")) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/** Splits "/vi/blog/x" into its locale and the rest ("/blog/x"); a path without one is returned whole. */
export function splitLocale(pathname: string, locales: readonly string[]): { locale: string | null; path: string } {
  const [, first, ...rest] = pathname.split("/");
  if (!locales.includes(first)) return { locale: null, path: pathname };
  return { locale: first, path: `/${rest.join("/")}` };
}
