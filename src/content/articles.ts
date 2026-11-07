import type { MDXProps } from "mdx/types";
import type { JSX } from "react";
import type { Lang } from "./translations";

/** A compiled article body. Pass `components` to style or replace the HTML elements. */
export type ArticleBody = (props: MDXProps) => JSX.Element;

/**
 * The body of a post in one language, from src/content/posts/<slug>/<lang>.md.
 * Returns undefined when the file does not exist.
 */
export async function loadArticle(slug: string, lang: Lang): Promise<ArticleBody | undefined> {
  if (!/^[a-z0-9-]+$/.test(slug)) return undefined;
  try {
    return (await import(`./posts/${slug}/${lang}.md`)).default as ArticleBody;
  } catch {
    return undefined;
  }
}
