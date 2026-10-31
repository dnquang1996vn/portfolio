import type { Metadata } from "next";
import { BlogIndex } from "@/components/blog/BlogIndex";

export const metadata: Metadata = {
  title: "Blog — Quinn Do",
  description: "Notes from the codebase: architecture, compliance, performance and estimation, written from production.",
};

export default function BlogPage() {
  return (
    <>
      <main id="main" className="page">
        <BlogIndex />
      </main>
    </>
  );
}
