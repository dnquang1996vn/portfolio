"use client";

import { useTypewriter } from "@/hooks/useTypewriter";

/** The hero's typed word and its blinking caret: the only part of the hero that runs on the client. */
export function TypedWord({ words, caretClassName }: { words: string[]; caretClassName: string }) {
  const typed = useTypewriter(words);
  return (
    <>
      <em>{typed}</em>
      <span data-caret="" className={caretClassName} aria-hidden="true" />
    </>
  );
}
