import { getTranslations } from "next-intl/server";
import type { T } from "@/content/translations";

type Key = keyof T;

/** Kicker, h1 and lede for a sub-page, read from the translation table by key. */
export async function PageHead({ kicker, title, intro }: { kicker: Key; title: Key; intro: Key }) {
  const t = await getTranslations();
  return (
    <section data-screen-label="Page head" className="page-head">
      <p className="kicker">{t(kicker)}</p>
      <h1>{t(title)}</h1>
      <p className="lede">{t(intro)}</p>
    </section>
  );
}
