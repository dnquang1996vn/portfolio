"use client";

import { useCountUp } from "@/hooks/useCountUp";

/** A number that counts up from zero when it scrolls into view; the final value is in the HTML. */
export function CountUp({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const ref = useCountUp<HTMLSpanElement>(value, decimals);
  return <span ref={ref}>{value.toFixed(decimals)}</span>;
}
