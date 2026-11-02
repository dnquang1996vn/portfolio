import type { Metadata } from "next";
import { Archivo, JetBrains_Mono, Newsreader } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { getLabels } from "@/i18n/labels";
import { SiteProvider } from "@/components/providers/SiteProvider";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import "../globals.css";

// Archivo carries the brand and UI; Newsreader sets the editorial headings; the mono
// face is for kickers, numbers and labels. `subsets` only picks what is preloaded: every
// subset, Vietnamese included, stays in the CSS and loads by unicode-range when a page
// needs it. Preloading only latin keeps the font requests from crowding out the hero image
// on a slow first load.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});
const mono = JetBrains_Mono({
  variable: "--font-mono-face",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

// hreflang and Open Graph URLs must be absolute. Vercel sets the production domain at build time.
const siteUrl = `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL ?? "quinndev.vercel.app"}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Quinn Do — Senior full-stack developer and tech lead",
  description: "Nine years. Three industries. One habit: own it end to end. Portfolio of Do Nhat Quang, Senior Full-Stack Developer and Tech Lead in Hanoi.",
  openGraph: {
    title: "Quinn Do — Senior full-stack developer and tech lead",
    description: "Nine years. Three industries. One habit: own it end to end.",
    type: "website",
  },
};

// Runs before hydration so the stored theme applies without a flash.
const bootScript = `(function(){try{var t=localStorage.getItem('portfolio-theme');document.documentElement.setAttribute('data-theme',t==='dark'?'dark':'light');}catch(e){}})();`;

// One static prerender per locale.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return (
    <html
      lang={locale}
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
          {/* Client components get their strings as props (getLabels), so next-intl never runs in the browser. */}
          <Nav
            locale={locale}
            t={await getLabels([
              "brandTagline", "langLabel", "langTitle", "letsTalk", "navAbout", "navBlog", "navContact", "navHome",
              "navProjects", "navReading", "skipToContent", "switchLang", "themeToDark", "themeToLight", "toggleTheme",
            ])}
          />
          <PageTransition>{children}</PageTransition>
          <Footer />
        </SiteProvider>
      </body>
    </html>
  );
}
