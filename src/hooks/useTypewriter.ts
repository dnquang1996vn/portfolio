"use client";

import { useEffect, useState } from "react";

interface TyperState {
  words: string[];
  text: string;
}

/**
 * Type / hold / delete loop with the design's timings. Restarts when `words` changes.
 * It starts with the first word already typed, so the server HTML carries the full
 * headline: the h1 is the page's LCP element, and typing it in after hydration would
 * push LCP back to when the first word finished.
 */
export function useTypewriter(words: string[]) {
  const [state, setState] = useState<TyperState>({ words, text: words[0] ?? "" });

  // Reset during render when the word list changes (React's recommended pattern, no setState in effect).
  if (state.words !== words) {
    setState({ words, text: words[0] ?? "" });
  }

  useEffect(() => {
    // Reduced motion: show the first word in full, no loop.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const once = setTimeout(() => setState({ words, text: words[0] }), 0);
      return () => clearTimeout(once);
    }
    // Begin holding the first word, then delete it and carry on with the loop.
    let w = 0;
    let i = words[0]?.length ?? 0;
    let del = true;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const word = words[w];
      i += del ? -1 : 1;
      setState({ words, text: word.slice(0, i) });
      let wait = del ? 45 : 85;
      if (!del && i === word.length) {
        del = true;
        wait = 1600;
      } else if (del && i === 0) {
        del = false;
        w = (w + 1) % words.length;
        wait = 350;
      }
      timer = setTimeout(tick, wait);
    };
    timer = setTimeout(tick, 1600);
    return () => clearTimeout(timer);
  }, [words]);

  return state.words === words ? state.text : (words[0] ?? "");
}
