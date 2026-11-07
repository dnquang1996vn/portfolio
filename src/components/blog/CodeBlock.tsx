"use client";

import { useRef, useState, type ComponentProps } from "react";
import type { Labels } from "@/i18n/labels";
import { Check, Copy } from "@/components/Icons";
import styles from "./ArticleView.module.css";

/** A highlighted <pre> from the Markdown body, with a button that copies its text. */
export function CodeBlock({ t, ...props }: ComponentProps<"pre"> & { t: Labels<"copyCode" | "codeCopied"> }) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  async function copy() {
    const text = ref.current?.textContent ?? "";
    try {
      await navigator.clipboard.writeText(text.replace(/\n$/, ""));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard blocked (insecure origin or denied permission): leave the button as is.
    }
  }

  return (
    <div className={styles.codeWrap}>
      <pre ref={ref} {...props} />
      <button type="button" className={styles.copy} onClick={copy} aria-label={copied ? t.codeCopied : t.copyCode}>
        {copied ? <Check /> : <Copy />}
        <span>{copied ? t.codeCopied : t.copyCode}</span>
      </button>
    </div>
  );
}
