import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  // Pages prerender statically, once per locale; only components that read request-time
  // data (the article engagement counters) render dynamically inside Suspense.
  // CSS is not inlined: experimental.inlineCss also copies every stylesheet into the RSC
  // payload, which made the home page HTML ~5x larger and measured slower.
  cacheComponents: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

// Article bodies live in src/content/posts/<slug>/<lang>.md. Plugins are named by string so
// Turbopack can pass their (serializable) options to the loader.
const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: [
      // Highlighted at build time. Both themes are emitted as CSS variables and
      // ArticleView.module.css picks one from html[data-theme].
      ["rehype-pretty-code", { theme: { light: "github-light", dark: "github-dark" }, keepBackground: false }],
    ],
  },
});

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default withNextIntl(withMDX(nextConfig));
