"use client";

import { useReveal } from "@/hooks/useReveal";

/** Mounts page-wide scroll-reveal behavior. Renders nothing. */
export function PageEffects() {
  useReveal();
  return null;
}
