"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore } from "react";
import { translations, type Lang, type T } from "@/content/translations";

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
  const toggleTheme = useCallback(() => writeStored(THEME_KEY, getTheme() === "dark" ? "light" : "dark"), []);

  const value = useMemo<SiteContextValue>(
    () => ({ lang, theme, t: translations[lang], toggleLang, toggleTheme }),
    [lang, theme, toggleLang, toggleTheme],
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite(): SiteContextValue {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used inside <SiteProvider>");
  return ctx;
}
