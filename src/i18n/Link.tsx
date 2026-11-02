import NextLink from "next/link";
import type { ComponentProps } from "react";
import { getLocale } from "next-intl/server";
import { localePath } from "./navigation";

/** next/link for Server Components: write hrefs without the locale ("/blog"); the current one is prefixed. */
export async function Link({ href, ...rest }: Omit<ComponentProps<typeof NextLink>, "href"> & { href: string }) {
  const locale = await getLocale();
  return <NextLink href={localePath(locale, href)} {...rest} />;
}
