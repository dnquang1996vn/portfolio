import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { BlogIndex } from "@/components/blog/BlogIndex";

export const metadata: Metadata = {
  title: "Blog — Quinn Do",
  description: "Notes from the codebase: architecture, compliance, performance and estimation, written from production.",
};

export default function BlogPage() {
  return (
    <>
      <Nav />
      <div className="page">
        <BlogIndex />
      </div>
      <Footer />
    </>
  );
}
