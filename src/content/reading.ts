import type { Bi } from "./portfolio";

/**
 * Books, courses and documents Quinn has read, with the notes that stuck.
 * Shown at /reading (list) and /reading/<slug> (notes). Newest first.
 * Entries are added by the reading-note skill from a Notion notes page.
 */

const P = (en: string, vi: string): Bi => ({ en, vi });

export type ReadingType = "book" | "course" | "doc";

export const readingTypes: Record<ReadingType, Bi> = {
  book: P("Book", "Sách"),
  course: P("Course", "Khóa học"),
  doc: P("Docs & articles", "Tài liệu"),
};

/** Tag registry for reading entries. Add a line here before using a new tag. */
export const readingTags = {
  craft: P("Craft", "Nghề code"),
  architecture: P("Architecture", "Kiến trúc"),
  frontend: "Frontend",
  ai: "AI",
  productivity: P("Productivity", "Năng suất"),
  leadership: P("Leadership", "Lãnh đạo"),
  thinking: P("Thinking", "Tư duy"),
} as const satisfies Record<string, Bi>;

export type ReadingTagId = keyof typeof readingTags;

export function isReadingTagId(value: string): value is ReadingTagId {
  return Object.hasOwn(readingTags, value);
}

export function isReadingType(value: string): value is ReadingType {
  return Object.hasOwn(readingTypes, value);
}

export interface ReadingItem {
  slug: string;
  type: ReadingType;
  title: string;
  /** Authors, instructors or the publishing site. */
  author: string;
  /** First published, as shown on the card. */
  year: string;
  /** Local cover under /images/reading/, about 2:3. */
  cover: string;
  /** Where to get it. */
  link: string;
  /** One sentence from the publisher or the web, not Quinn's opinion. */
  blurb: Bi;
  tags: readonly ReadingTagId[];
  /** When Quinn finished it, "YYYY-MM". Drives the order. */
  date: string;
  /** 1–5, Quinn's call. */
  rating: 1 | 2 | 3 | 4 | 5;
  /** Who should read it and why, one or two sentences. */
  verdict: Bi;
  /** 3–6 things that stuck, in Quinn's words. */
  takeaways: readonly Bi[];
}

const readingList = [
  {
    slug: "the-pragmatic-programmer",
    type: "book",
    title: "The Pragmatic Programmer",
    author: "Andy Hunt, Dave Thomas",
    year: "1999",
    cover: "/images/reading/pragmatic-programmer.jpg",
    link: "https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/",
    blurb: P(
      "The classic on working as a programmer: DRY, orthogonality, tracer bullets, and code that stays easy to change.",
      "Cuốn kinh điển về nghề lập trình: DRY, tính trực giao, tracer bullet, và code luôn dễ thay đổi.",
    ),
    tags: ["craft"],
    date: "2025-06",
    rating: 5,
    verdict: P(
      "Read it in your first two years, then again at five. The habits outlast any framework.",
      "Đọc trong hai năm đầu đi làm, rồi đọc lại ở năm thứ năm. Thói quen trong sách sống lâu hơn mọi framework.",
    ),
    takeaways: [
      P(
        "DRY and orthogonality are the same promise from two sides: change one part without touching another.",
        "DRY và tính trực giao là cùng một lời hứa nhìn từ hai phía: sửa phần này không ảnh hưởng phần khác.",
      ),
      P(
        "Reversibility. Assume the decision will change, keep the app flexible, and abstract the parts most likely to move.",
        "Reversibility. Mặc định quyết định hôm nay sẽ đổi, giữ app linh hoạt, và abstract những phần dễ phải thay nhất.",
      ),
      P(
        "Debugging is a mindset before it is a technique: nothing is impossible, find the root cause, reproduce it, read the exception, binary-search the problem, log and trace, talk it through.",
        "Debug là tư duy trước khi là kỹ thuật: không có gì là impossible, tìm root cause, reproduce lại, đọc kỹ exception, chia đôi để khoanh vùng, log và trace, nói chuyện với con vịt.",
      ),
      P(
        "Keep a bug as a lesson. Every one answers a question about the system you did not know you had.",
        "Giữ mỗi bug lại như một bài học. Bug nào cũng trả lời một câu hỏi về hệ thống mà bạn chưa biết mình có.",
      ),
      P(
        "Balance resources: whoever allocates, releases. Phrase conditions as positives, not negatives.",
        "Cân bằng resource: ai cấp phát thì người đó đóng. Viết điều kiện ở dạng khẳng định thay vì phủ định.",
      ),
      P(
        "Break the problem into small steps and get feedback constantly: hit the API, write the unit test, demo. Do not over-build for a future you cannot see; write code that is cheap to change instead.",
        "Chia nhỏ vấn đề và lấy feedback liên tục: gọi thử API, viết unit test, demo. Đừng xây sẵn cho một tương lai chưa thấy; viết code rẻ để sửa thì hơn.",
      ),
    ],
  },
] as const satisfies readonly ReadingItem[];

export const reading: readonly ReadingItem[] = readingList;

export type ReadingSlug = (typeof readingList)[number]["slug"];

export function getReadingItem(slug: string): ReadingItem | undefined {
  return reading.find((item) => item.slug === slug);
}
