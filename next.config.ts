import type { NextConfig } from "next";
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

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default withNextIntl(nextConfig);
