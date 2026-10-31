import styles from "./Stars.module.css";

/** Five small stars, `value` of them filled. Decorative; the label carries the number. */
export function Stars({ value, label }: { value: number; label: string }) {
  return (
    <span className={styles.stars} role="img" aria-label={label}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" className={i < value ? styles.on : styles.off} aria-hidden="true">
          <path d="M10 1.8l2.5 5.3 5.8.7-4.3 4 1.1 5.8L10 14.8l-5.1 2.8 1.1-5.8-4.3-4 5.8-.7z" />
        </svg>
      ))}
    </span>
  );
}
