import type { MDXComponents } from "mdx/types";

// Required by @next/mdx in the App Router. Articles pass their own components from
// ArticleView (they need translated labels), so nothing is mapped globally.
const components: MDXComponents = {};

export function useMDXComponents(): MDXComponents {
  return components;
}
