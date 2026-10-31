import type { Metadata } from "next";
import { Archivo, JetBrains_Mono, Newsreader } from "next/font/google";
import { SiteProvider } from "@/components/providers/SiteProvider";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import "./globals.css";

// Archivo carries the brand and UI; Newsreader sets the editorial headings; the mono
// face is for kickers, numbers and labels. All three ship a Vietnamese subset.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});
const mono = JetBrains_Mono({
  variable: "--font-mono-face",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Quinn Do — Senior full-stack developer and tech lead",
  description: "Nine years. Three industries. One habit: own it end to end. Portfolio of Do Nhat Quang, Senior Full-Stack Developer and Tech Lead in Hanoi.",
  openGraph: {
    title: "Quinn Do — Senior full-stack developer and tech lead",
    description: "Nine years. Three industries. One habit: own it end to end.",
    type: "website",
  },
};

// Runs before hydration so the stored theme/lang apply without a flash.
const bootScript = `(function(){try{var t=localStorage.getItem('portfolio-theme');var l=localStorage.getItem('portfolio-lang');var h=document.documentElement;h.setAttribute('data-theme',t==='dark'?'dark':'light');if(l==='vi'||l==='en')h.lang=l;}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      data-rounded=""
      className={`${archivo.variable} ${newsreader.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      {/* suppressHydrationWarning: browser extensions (e.g. Grammarly) add attributes to <body> before React hydrates. */}
      <body suppressHydrationWarning>
        <SiteProvider>
          {/* Header and footer sit outside the page segment on purpose: Next scrolls a navigation to the
              segment's first DOM node and skips it when that node is already on screen. With the sticky
              header inside each page, that node was always visible and pages kept the old scroll offset. */}
          <Nav />
          <PageTransition>{children}</PageTransition>
          <Footer />
        </SiteProvider>
      </body>
    </html>
  );
}
