"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, type ReactNode } from "react";

/**
 * Remounts the page on each route so it gets one short entrance (CSS: .page-enter) and
 * starts at the top. Next's own scroll restores the segment's first node into view, which
 * can leave a sticky-header offset; an instant scroll to 0 keeps every page consistent.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  useLayoutEffect(() => {
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return <div key={pathname} className="page-enter">{children}</div>;
}
