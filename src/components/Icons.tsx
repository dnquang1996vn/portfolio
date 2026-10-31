import type { SVGProps } from "react";

/** One stroke style (1.75px, round caps) for every icon on the site. */
function Svg(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    />
  );
}

export const Arrow = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></Svg>
);
export const ArrowUpRight = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}><path d="M7 17 17 7" /><path d="M8 7h9v9" /></Svg>
);
export const ArrowUp = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}><path d="M12 19V5" /><path d="m6 11 6-6 6 6" /></Svg>
);
export const Sun = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2m-7.07-17.07 1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </Svg>
);
export const Moon = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></Svg>
);
export const Mail = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></Svg>
);
export const Phone = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.9 2Z" />
  </Svg>
);
export const LinkedIn = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" />
    <rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" />
  </Svg>
);
export const Shield = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}><path d="M12 3 4 6v6c0 5 3.5 8.5 8 9.5 4.5-1 8-4.5 8-9.5V6l-8-3Z" /><path d="m9 12 2 2 4-4" /></Svg>
);
export const Cpu = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}>
    <rect x="5" y="5" width="14" height="14" rx="2" /><rect x="9" y="9" width="6" height="6" />
    <path d="M9 2v3m6-3v3M9 19v3m6-3v3M2 9h3m-3 6h3m14-6h3m-3 6h3" />
  </Svg>
);
export const Layers = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 13 9 5 9-5" /><path d="m3 17 9 5 9-5" /></Svg>
);
