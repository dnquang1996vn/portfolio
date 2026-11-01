"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { translations, type Lang, type T } from "@/content/translations";
import { ThemeSun, type SunDirection } from "@/components/ThemeSun";

type Theme = "light" | "dark";

interface SiteContextValue {
  lang: Lang;
  theme: Theme;
  t: T;
  toggleLang: () => void;
  toggleTheme: () => void;
}

const SiteContext = createContext<SiteContextValue | null>(null);

const LANG_KEY = "portfolio-lang";
const THEME_KEY = "portfolio-theme";
const CHANGE_EVENT = "portfolio-prefs-change";

// A tiny external store over localStorage so React can subscribe without setState-in-effect.
function subscribe(cb: () => void) {
  window.addEventListener("storage", cb);
  window.addEventListener(CHANGE_EVENT, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(CHANGE_EVENT, cb);
  };
}

function readStored<Type extends string>(key: string, allowed: readonly Type[], fallback: Type): Type {
  try {
    const v = localStorage.getItem(key);
    return allowed.includes(v as Type) ? (v as Type) : fallback;
  } catch {
    return fallback;
  }
}

function writeStored(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* storage unavailable: state still updates for this session via the event */
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

const getLang = () => readStored<Lang>(LANG_KEY, ["en", "vi"], "en");
const getTheme = () => readStored<Theme>(THEME_KEY, ["light", "dark"], "light");

// While the sun crosses the page, html[data-sun] makes every colour on the page fade over
// the same duration (globals.css), so the theme change reads as daylight arriving or leaving.

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getLang, () => "en" as Lang);
  const theme = useSyncExternalStore(subscribe, getTheme, () => "light" as Theme);

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-theme", theme);
    html.lang = lang;
    html.toggleAttribute("data-rounded", true);
  }, [theme, lang]);

  const toggleLang = useCallback(() => writeStored(LANG_KEY, getLang() === "vi" ? "en" : "vi"), []);

  // Theme flips send a sun across the page; a flip in progress ignores new clicks.
  const [sun, setSun] = useState<{ dir: SunDirection; id: number } | null>(null);
  const sunBusy = useRef(false);
  const toggleTheme = useCallback(() => {
    const next: Theme = getTheme() === "dark" ? "light" : "dark";
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      writeStored(THEME_KEY, next);
      return;
    }
    if (sunBusy.current) return;
    sunBusy.current = true;
    document.documentElement.setAttribute("data-sun", "");
    setSun({ dir: next === "dark" ? "sunset" : "sunrise", id: Date.now() });
    writeStored(THEME_KEY, next);
  }, []);
  const endSun = useCallback(() => {
    sunBusy.current = false;
    document.documentElement.removeAttribute("data-sun");
    setSun(null);
  }, []);

  const value = useMemo<SiteContextValue>(
    () => ({ lang, theme, t: translations[lang], toggleLang, toggleTheme }),
    [lang, theme, toggleLang, toggleTheme],
  );

  return (
    <SiteContext.Provider value={value}>
      {children}
      {sun && <ThemeSun key={sun.id} dir={sun.dir} onDone={endSun} />}
    </SiteContext.Provider>
  );
}

export function useSite(): SiteContextValue {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used inside <SiteProvider>");
  return ctx;
}
