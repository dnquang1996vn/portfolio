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
    slug: "the-7-habits-of-highly-effective-people",
    type: "book",
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen R. Covey",
    year: "1989",
    cover: "/images/reading/seven-habits.jpg",
    link: "https://www.franklincovey.com/the-7-habits/",
    blurb: P(
      "Stephen Covey's principle-centred approach to personal and professional effectiveness, built on seven habits from being proactive to sharpening the saw.",
      "Cách tiếp cận lấy nguyên tắc làm gốc của Stephen Covey về hiệu quả cá nhân và công việc, gói trong bảy thói quen, từ chủ động đến mài lại lưỡi cưa.",
    ),
    tags: ["thinking", "leadership"],
    date: "2024-04",
    rating: 4,
    verdict: P(
      "For a developer who is good at the code and wants the mindset to go with it. Half of being effective on a team is habits two, five and six, and none of them are technical.",
      "Cho developer đã code tốt và muốn có tư duy đi kèm. Một nửa chuyện làm việc hiệu quả trong team nằm ở thói quen hai, năm và sáu, và chẳng cái nào là kỹ thuật.",
    ),
    takeaways: [
      P(
        "Build habits on principles, not appearances. Decide who you want to become, list the qualities that person has, and grow the habits that produce them.",
        "Xây thói quen trên nguyên tắc, không phải vẻ bề ngoài. Muốn trở thành ai, hãy xem người đó cần phẩm chất gì, rồi hình thành thói quen tạo ra phẩm chất đó.",
      ),
      P(
        "Be proactive. When something goes wrong, skip the blame and find the root cause you can actually control, then change that. Same move as debugging.",
        "Chủ động. Khi có chuyện, đừng đổ cho ngoại cảnh; tìm root cause mình kiểm soát được rồi sửa nó. Y hệt lúc debug.",
      ),
      P(
        "Begin with the end in mind. Write down what you actually want and believe you can reach; a clear destination makes staying on the path much easier.",
        "Bắt đầu với đích đến trong đầu. Viết ra điều mình thực sự muốn và tin là làm được; đích rõ thì đi đúng đường dễ hơn nhiều.",
      ),
      P(
        "First things first. Sort by urgency and importance, then give extra time to the important-but-not-urgent work, because it needs preparation and nobody wants to start it at the deadline.",
        "Việc quan trọng trước. Xếp theo cấp bách và quan trọng, rồi dành thêm thời gian cho việc quan trọng nhưng chưa gấp, vì nó cần chuẩn bị và không ai muốn nước đến chân mới nhảy.",
      ),
      P(
        "Seek win-win, and listen before you speak. No advice until you truly understand what the other person is trying to say, their situation and their thinking.",
        "Hướng tới đôi bên cùng thắng, và nghe trước khi nói. Chưa hiểu thật sự người kia đang muốn nói gì, hoàn cảnh và suy nghĩ của họ, thì chưa khuyên.",
      ),
      P(
        "Sharpen the saw. Rest on purpose: exercise and sleep for the body, books and new skills for the mind, noticing the good around you for the spirit, and checking on the people close to you.",
        "Mài lại lưỡi cưa. Nghỉ ngơi có chủ đích: tập luyện và ngủ đủ cho cơ thể, đọc sách và học kỹ năng mới cho trí não, cảm nhận cái đẹp quanh mình cho tinh thần, và hỏi thăm người thân cho các mối quan hệ.",
      ),
    ],
  },
  {
    slug: "deep-work",
    type: "book",
    title: "Deep Work",
    author: "Cal Newport",
    year: "2016",
    cover: "/images/reading/deep-work.jpg",
    link: "https://calnewport.com/deep-work-rules-for-focused-success-in-a-distracted-world/",
    blurb: P(
      "Cal Newport's case that focused, distraction-free work is a rare skill worth training, with four rules for doing it.",
      "Cal Newport lập luận rằng làm việc tập trung, không xao nhãng là kỹ năng hiếm đáng rèn, kèm bốn quy tắc để làm được.",
    ),
    tags: ["productivity"],
    date: "2024-03",
    rating: 4,
    verdict: P(
      "For anyone running three AI agents at once and feeling busier than ever. The agents can multitask; you still cannot, and deciding what they should do next is the deep work.",
      "Cho ai đang chạy ba agent AI cùng lúc mà thấy bận hơn bao giờ hết. Agent thì multitask được, còn bạn thì vẫn không, và nghĩ xem chúng nên làm gì tiếp mới là việc cần tập trung.",
    ),
    takeaways: [
      P(
        "Quality of work equals time spent times intensity of focus. Two skills decide a career: learning hard things quickly, and producing at an elite level, fast and good at once.",
        "Chất lượng công việc = thời gian bỏ ra × cường độ tập trung. Hai kỹ năng quyết định sự nghiệp: học nhanh những thứ khó, và làm ra sản phẩm ở mức elite, vừa nhanh vừa tốt.",
      ),
      P(
        "One task at a time. Switching from A to B costs a settling-in period before you can focus again, so cut the day into long blocks nobody interrupts.",
        "Mỗi lúc một việc. Chuyển từ task A sang B mất một khoảng ổn định lại mới tập trung được, nên chia ngày thành những khoảng dài không ai cắt ngang.",
      ),
      P(
        "Make it a ritual: a fixed slot decided in advance, say 5 to 7 a.m., with the rules inside it written down. No browsing, no replying, music or a quiet room if it helps.",
        "Biến nó thành nghi thức: một khung giờ cố định quyết định trước, ví dụ 5 đến 7 giờ sáng, với luật chơi viết sẵn. Không lướt web, không trả lời tin nhắn, bật nhạc hoặc tìm chỗ yên nếu cần.",
      ),
      P(
        "Focus is a muscle. Train it in regular high-intensity sessions, get comfortable with boredom, and schedule internet time instead of grabbing the phone at every lull. Sleep, meditation and walks feed it.",
        "Tập trung là cơ bắp. Rèn bằng những phiên cường độ cao đều đặn, tập chịu được nhàm chán, lên lịch giờ dùng internet thay vì cứ chán là với điện thoại. Ngủ đủ, thiền, đi bộ là nguồn nuôi nó.",
      ),
      P(
        "Drain the shallows: batch the small stuff, schedule and review it, stop at the agreed hour, and skip the replies that are off-topic, hard to answer well, or harmless to ignore.",
        "Vét cạn việc nông: gộp việc vặt lại, lên lịch rồi review, hết giờ là dừng, và bỏ qua những tin nhắn, email không liên quan, khó trả lời cho ra hồn, hoặc bỏ qua cũng chẳng sao.",
      ),
      P(
        "Plan evenings and weekends before they start. Going deep on something turns out to be better rest than scrolling.",
        "Lên kế hoạch cho buổi tối và cuối tuần trước khi chúng bắt đầu. Đắm mình vào một việc gì đó hóa ra còn nghỉ ngơi tốt hơn lướt web.",
      ),
    ],
  },
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
