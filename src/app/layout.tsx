import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { SiteProvider } from "@/components/providers/SiteProvider";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Quinn Do — Senior Full-Stack Developer · Tech Lead",
  description: "Nine years. Three industries. One habit: own it end to end. Portfolio of Do Nhat Quang, Senior Full-Stack Developer and Tech Lead in Hanoi.",
  openGraph: {
    title: "Quinn Do — Senior Full-Stack Developer · Tech Lead",
    description: "Nine years. Three industries. One habit: own it end to end.",
    type: "website",
  },
};

// Runs before hydration so the stored theme/lang apply without a flash.
const bootScript = `(function(){try{var t=localStorage.getItem('portfolio-theme');var l=localStorage.getItem('portfolio-lang');var h=document.documentElement;h.setAttribute('data-theme',t==='dark'?'dark':'light');if(l==='vi'||l==='en')h.lang=l;}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-theme="light" data-rounded="" className={archivo.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <SiteProvider>{children}</SiteProvider>
      </body>
    </html>
  );
}
