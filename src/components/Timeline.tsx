"use client";

import { useRef, type ReactNode } from "react";
import { useTimelineProgress } from "@/hooks/useTimelineProgress";

/** The experience timeline's container: drives the scroll-linked fill over the spine. */
export function Timeline({ className, children }: { className: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useTimelineProgress(ref);
  return (
    <div ref={ref} data-timeline="" className={className}>
      {children}
    </div>
  );
}
