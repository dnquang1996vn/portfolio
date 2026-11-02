import { getTranslations } from "next-intl/server";
import type { T } from "@/content/translations";

/** The translated strings a client component needs, picked by key. */
export type Labels<K extends keyof T> = Pick<T, K>;

/**
 * Resolves strings on the server for a client component's props. Client components take
 * their text this way instead of calling useTranslations(), so neither the message catalog
 * nor next-intl's message formatter ships in the browser bundle. Values are raw: a
 * placeholder such as {name} is left for the component to fill.
 */
export async function getLabels<K extends keyof T>(keys: readonly K[]): Promise<Labels<K>> {
  const t = await getTranslations();
  return Object.fromEntries(keys.map((k) => [k, t.raw(k)])) as Labels<K>;
}
