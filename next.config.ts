import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pages prerender statically; only components that read request-time data
  // (the article engagement counters) render dynamically inside Suspense.
  cacheComponents: true,
  // The whole stylesheet is ~14 KB, so it ships inside the HTML instead of as three
  // render-blocking requests a first-time visitor has to wait for.
  experimental: {
    inlineCss: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
