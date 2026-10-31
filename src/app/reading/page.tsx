import type { Metadata } from "next";
import { ReadingList } from "@/components/reading/ReadingList";

export const metadata: Metadata = {
  title: "Reading — Quinn Do",
  description: "Books, courses and documents worth your time, with the few things from each that changed how I work.",
};

export default function ReadingPage() {
  return (
    <main id="main" className="page">
      <ReadingList />
    </main>
  );
}
