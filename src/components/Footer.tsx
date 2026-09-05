"use client";

import { useSite } from "@/components/providers/SiteProvider";
import styles from "./Footer.module.css";

export function Footer() {
  const { t } = useSite();
  return (
    <div className="page">
      <footer className={styles.footer}>
        <span>{t.footerLeft}</span>
        <span>{t.footerRight}</span>
      </footer>
    </div>
  );
}
