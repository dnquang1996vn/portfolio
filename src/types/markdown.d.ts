// Article bodies are Markdown compiled by @next/mdx (see next.config.ts).
declare module "*.md" {
  import type { MDXProps } from "mdx/types";
  export default function MDXContent(props: MDXProps): React.JSX.Element;
}
