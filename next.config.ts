import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pages prerender statically; only components that read request-time data
  // (the article engagement counters) render dynamically inside Suspense.
  cacheComponents: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
