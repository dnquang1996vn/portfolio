"use client";

import { useEffect, useState } from "react";

interface TyperState {
  words: string[];
  text: string;
}

/** Type / hold / delete loop with the design's timings. Restarts when `words` changes. */
export function useTypewriter(words: string[]) {
  const [state, setState] = useState<TyperState>({ words, text: "" });

  // Reset during render when the word list changes (React's recommended pattern, no setState in effect).
  if (state.words !== words) {
    setState({ words, text: "" });
  }

  useEffect(() => {
    // Reduced motion: show the first word in full, no loop.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const once = setTimeout(() => setState({ words, text: words[0] }), 0);
      return () => clearTimeout(once);
    }
    let w = 0;
    let i = 0;
    let del = false;
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
    timer = setTimeout(tick, 400);
    return () => clearTimeout(timer);
  }, [words]);

  return state.words === words ? state.text : "";
}
