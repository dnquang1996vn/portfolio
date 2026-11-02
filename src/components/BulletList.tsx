import { getLocale } from "next-intl/server";
import { pick, type Bi } from "@/content/portfolio";

export async function BulletList({ items, className, gap }: { items: Bi[]; className?: string; gap?: number }) {
  const lang = await getLocale();
  return (
    <ul className={`bullets ${className ?? ""}`} style={gap ? { gap } : undefined}>
      {items.map((item, i) => (
        <li key={i}>
          <span aria-hidden="true" />
          <span>{pick(item, lang)}</span>
        </li>
      ))}
    </ul>
  );
}
