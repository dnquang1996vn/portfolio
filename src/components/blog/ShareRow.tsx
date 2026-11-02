"use client";

import type { Labels } from "@/i18n/labels";
import { useSyncExternalStore } from "react";
import { Facebook, Mail, XLogo } from "@/components/Icons";
import styles from "./ArticleView.module.css";

const noop = () => () => {};
/** The page URL on the client, an empty string during SSR so the markup matches. */
const useHref = () => useSyncExternalStore(noop, () => window.location.href, () => "");

/** X, Facebook and email share links for the current page. */
export function ShareRow({ title, t }: { title: string; t: Labels<"share" | "shareByEmail" | "shareOnFacebook" | "shareOnX"> }) {
  const url = useHref();
  const u = encodeURIComponent(url);
  const text = encodeURIComponent(title);
  const links = [
    { href: `https://x.com/intent/tweet?text=${text}&url=${u}`, label: t.shareOnX, Icon: XLogo },
    { href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, label: t.shareOnFacebook, Icon: Facebook },
    { href: `mailto:?subject=${text}&body=${u}`, label: t.shareByEmail, Icon: Mail },
  ];
  return (
    <div className={styles.share} aria-label={t.share}>
      {links.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={url ? href : undefined}
          target={href.startsWith("mailto:") ? undefined : "_blank"}
          rel="noreferrer"
          className={`btn btn-secondary btn-icon ${styles.shareBtn}`}
          aria-label={label}
          title={label}
        >
          <Icon />
        </a>
      ))}
    </div>
  );
}
