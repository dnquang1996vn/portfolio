import type { Lang } from "./translations";

/** Bilingual string. Plain strings are shared by both languages. */
export type Bi = string | { en: string; vi: string };

export function pick(value: Bi, lang: Lang): string {
  return typeof value === "string" ? value : value[lang];
}

const P = (en: string, vi: string): Bi => ({ en, vi });

export const contact = {
  email: "dnquang1996vn@gmail.com",
  phone: "(+84) 359 785 001",
  phoneHref: "tel:+84359785001",
  linkedin: "https://linkedin.com/in/quang-do-nhat",
};

export interface Stat {
  value: number;
  decimals: number;
  suffix: string;
  label: Bi;
  detail: Bi;
}

export const stats: Stat[] = [
  {
    value: 9, decimals: 0, suffix: "+",
    label: P("Years shipping web", "Năm làm sản phẩm web"),
    detail: P("Frontend specialist to tech lead, 2017 → today.", "Từ chuyên gia frontend đến tech lead, 2017 → nay."),
  },
  {
    value: 180, decimals: 0, suffix: "+",
    label: P("Biomarkers in production", "Chỉ số sinh học đang vận hành"),
    detail: P(
      "Lab panels, telehealth and an AI health coach on one HIPAA platform.",
      "Xét nghiệm, khám từ xa và AI health coach trên một nền tảng chuẩn HIPAA.",
    ),
  },
  {
    value: 25, decimals: 0, suffix: "+",
    label: P("US states, one codebase", "Tiểu bang Mỹ, một codebase"),
    detail: P("Per-state compliance for Metrc, BioTrack and CCRS regulators.", "Tuân thủ theo từng bang với Metrc, BioTrack và CCRS."),
  },
  {
    value: 3, decimals: 0, suffix: "×",
    label: P("Company awards", "Giải thưởng công ty"),
    detail: "MVP 2025 · Most Proactive 2022 · Shining Star 2021.",
  },
];

export interface Job {
  period: Bi;
  length: Bi;
  company: string;
  role: string;
  about: Bi;
  site: string;
  href: string;
  logo: string;
  /** "cover" for square marks, "contain" for wide wordmarks. */
  logoFit: "cover" | "contain";
  brand: string;
  headline: Bi;
  points: Bi[];
}

export const jobs: Job[] = [
  {
    period: P("2020 — Present", "2020 — Nay"),
    length: P("6 yrs · Hanoi / US remote", "6 năm · Hà Nội / remote Mỹ"),
    company: "Webprovise",
    role: "Tech Lead",
    about: P("US product studio — eCommerce, agriculture, healthcare", "Công ty Mỹ — eCommerce, nông nghiệp, y tế"),
    site: "webprovise.com",
    href: "https://webprovise.com/",
    logo: "/images/logo-webprovise.png",
    logoFit: "cover",
    brand: "#e8621a",
    headline: P(
      "From frontend hire to the engineer the company hands its hardest platform to.",
      "Từ frontend developer đến người được giao nền tảng khó nhất của công ty.",
    ),
    points: [
      P(
        "Architected a HIPAA-compliant, multi-tenant healthcare platform — 180+ biomarkers, telehealth, AI health coach — and shipped it.",
        "Thiết kế kiến trúc và triển khai nền tảng y tế multi-tenant chuẩn HIPAA — 180+ chỉ số sinh học, khám từ xa, AI health coach.",
      ),
      P(
        "Put AI into production: patient chatbot, AI-drafted SOAP notes, personalized care recommendations.",
        "Đưa AI vào sản phẩm thật: chatbot bệnh nhân, SOAP notes do AI soạn, gợi ý chăm sóc cá nhân hóa.",
      ),
      P(
        "Turned requirement churn into a feature: codebases built to absorb change, not fight it.",
        "Biến yêu cầu thay đổi liên tục thành lợi thế: codebase được thiết kế để hấp thụ thay đổi.",
      ),
      P(
        "Three company awards in five years — MVP 2025, Most Proactive 2022, Shining Star 2021.",
        "Ba giải thưởng trong năm năm — MVP 2025, Most Proactive 2022, Shining Star 2021.",
      ),
    ],
  },
  {
    period: "2019 — 2020",
    length: P("7 months · UK client", "7 tháng · khách hàng Anh"),
    company: "TwentyTech",
    role: "PHP Developer",
    about: P("Multinational proptech, London", "Proptech đa quốc gia, London"),
    site: "twenty-tech.com",
    href: "https://twenty-tech.com/",
    logo: "/images/logo-twentytech.png",
    logoFit: "cover",
    brand: "#5b2a8f",
    headline: P(
      "Turned raw UK property data into a marketplace people actually browse.",
      "Biến dữ liệu bất động sản Anh thô thành một marketplace người dùng thực sự dùng.",
    ),
    points: [
      P(
        "Owned features, estimates, reviews and releases on a Laravel + Vue property platform.",
        "Phụ trách tính năng, ước lượng, review và release trên nền tảng Laravel + Vue.",
      ),
      P(
        "Worked directly with the London team — requirements to production, no translation layer.",
        "Làm việc trực tiếp với đội London — từ yêu cầu đến production, không qua trung gian.",
      ),
    ],
  },
  {
    period: "2017 — 2019",
    length: P("2 yrs · Hanoi", "2 năm · Hà Nội"),
    company: "Extreme Vietnam",
    role: "Software Engineer",
    about: P("Japanese IT services, Hanoi", "Công ty IT Nhật Bản, Hà Nội"),
    site: "extremevn.com.vn",
    href: "https://extremevn.com.vn/about",
    logo: "/images/logo-extreme.png",
    logoFit: "contain",
    brand: "#d7262f",
    headline: P(
      "Hired as a third-year intern. Left on the team that wrote the standards.",
      "Vào làm thực tập sinh năm ba. Rời đi từ đội viết chuẩn code cho cả công ty.",
    ),
    points: [
      P(
        "Intern → part-time → full-time engineer, all before graduation.",
        "Thực tập → bán thời gian → kỹ sư chính thức, tất cả trước khi tốt nghiệp.",
      ),
      P(
        "Picked for the prototype team: reference projects every other team coded against.",
        "Được chọn vào đội prototype: các dự án mẫu làm chuẩn cho những đội khác.",
      ),
    ],
  },
];

export interface Skill {
  num: string;
  title: string;
  logos: { name: string; slug: string }[];
  tags: string[];
}

export const skills: Skill[] = [
  {
    num: "01", title: "Frontend",
    logos: [
      { name: "React", slug: "react" }, { name: "Next.js", slug: "nextdotjs" },
      { name: "TypeScript", slug: "typescript" }, { name: "Vue.js", slug: "vuedotjs" },
    ],
    tags: ["React", "Next.js", "TypeScript", "Redux", "Vue.js", "SCSS", "Responsive", "Web performance"],
  },
  {
    num: "02", title: "Backend",
    logos: [
      { name: "Node.js", slug: "nodedotjs" }, { name: "NestJS", slug: "nestjs" },
      { name: "Express", slug: "express" }, { name: "Laravel", slug: "laravel" },
    ],
    tags: ["Node.js", "NestJS", "Express", "REST APIs", "PHP / Laravel", "Multi-tenant", "White-label"],
  },
  {
    num: "03", title: "AI integration",
    logos: [
      { name: "Anthropic", slug: "anthropic" }, { name: "LangChain", slug: "langchain" },
      { name: "Hugging Face", slug: "huggingface" },
    ],
    tags: ["Patient chatbots", "AI-assisted SOAP notes", "Recommendation systems"],
  },
  {
    num: "04", title: "AI-assisted development",
    logos: [
      { name: "Claude Code", slug: "claude" }, { name: "Cursor", slug: "cursor" },
      { name: "GitHub", slug: "github" },
    ],
    tags: ["Claude Code", "Cursor", "Agentic workflows", "Custom skills", "Team usage policies"],
  },
  {
    num: "05", title: "Integrations & compliance",
    logos: [
      { name: "Stripe", slug: "stripe" }, { name: "PostgreSQL", slug: "postgresql" },
      { name: "Redis", slug: "redis" },
    ],
    tags: ["Labs", "Telehealth", "Email / SMS", "HIPAA & PHI", "State pricing & legal (US)"],
  },
  {
    num: "06", title: "DevOps & tools",
    logos: [
      { name: "Docker", slug: "docker" }, { name: "Kubernetes", slug: "kubernetes" },
      { name: "Linux", slug: "linux" }, { name: "Git", slug: "git" },
    ],
    tags: ["Docker", "Linux", "AWS", "Git", "CI/CD", "TDD", "English — TOEIC 780"],
  },
];

export interface Project {
  num: string;
  name: Bi;
  role: Bi;
  url: string;
  href: string;
  image: string;
  imagePos: string;
  tagline: Bi;
  overview: Bi;
  stack: string[];
  points: Bi[];
}

export const projects: Project[] = [
  {
    num: "01",
    name: P("Welle — US Healthcare Platform", "Welle — Nền tảng y tế Mỹ"),
    role: "Tech Lead",
    url: "wellehealth.com",
    href: "https://wellehealth.com",
    image: "/images/proj-welle.png",
    imagePos: "50% 30%",
    tagline: P(
      "Preventive care for US patients — 180+ biomarkers, telehealth and an AI health coach on one HIPAA-compliant platform.",
      "Chăm sóc phòng ngừa cho bệnh nhân Mỹ — 180+ chỉ số sinh học, khám từ xa và AI health coach trên một nền tảng chuẩn HIPAA.",
    ),
    overview: P(
      "Personalized longevity and preventive-care platform for US customers — lab panels covering 180+ biomarkers, recurring test scheduling, telehealth visits, clinician consultations and an AI health coach.",
      "Nền tảng chăm sóc sức khỏe và trường thọ cá nhân hóa cho khách hàng Mỹ — gói xét nghiệm 180+ chỉ số, lịch xét nghiệm định kỳ, khám từ xa, tư vấn bác sĩ và AI health coach.",
    ),
    stack: ["Node.js", "NestJS / Express", "React", "TypeScript"],
    points: [
      P(
        "Designed the multi-tenant, white-label architecture so the product runs as SaaS and with per-client custom logic.",
        "Thiết kế kiến trúc multi-tenant, white-label để sản phẩm chạy dạng SaaS và tùy biến logic theo từng khách hàng.",
      ),
      P(
        "Integrated AI: patient chatbot, AI-assisted SOAP notes, personalized test and care recommendations.",
        "Tích hợp AI: chatbot bệnh nhân, SOAP notes có AI hỗ trợ, gợi ý xét nghiệm và chăm sóc cá nhân hóa.",
      ),
      P(
        "Integrated labs, telehealth, email and SMS providers; implemented state-by-state pricing and legal compliance.",
        "Tích hợp phòng lab, khám từ xa, email và SMS; triển khai giá và tuân thủ pháp lý theo từng bang.",
      ),
      P("Enforced HIPAA and PHI data protection end to end.", "Bảo vệ dữ liệu HIPAA và PHI xuyên suốt hệ thống."),
    ],
  },
  {
    num: "02",
    name: P("Bamboo — Cannabis Commerce Platform", "Bamboo — Nền tảng thương mại cannabis"),
    role: "FE Tech Lead",
    url: "getbamboo.com",
    href: "https://getbamboo.com",
    image: "/images/proj-bamboo.png",
    imagePos: "50% 20%",
    tagline: P(
      "Seed-to-sale commerce for legal cannabis — one frontend, 25+ state regulators.",
      "Thương mại seed-to-sale cho cannabis hợp pháp — một frontend, 25+ cơ quan quản lý bang.",
    ),
    overview: P(
      "All-in-one platform for legal cannabis distribution in the US — seed-to-sale traceability, sales CRM, inventory, orders and fulfillment, synced with state regulators (Metrc, BioTrack, CCRS) across 25+ states.",
      "Nền tảng all-in-one cho phân phối cannabis hợp pháp tại Mỹ — truy xuất seed-to-sale, CRM bán hàng, kho, đơn hàng và giao nhận, đồng bộ với cơ quan quản lý (Metrc, BioTrack, CCRS) tại 25+ bang.",
    ),
    stack: ["React", "Redux Observable", "MUI"],
    points: [
      P(
        "Led the frontend of a microservice system with one design language across Portal, Trace and Sales.",
        "Dẫn dắt frontend của hệ microservice với một ngôn ngữ thiết kế chung cho Portal, Trace và Sales.",
      ),
      P(
        "Built reusable, performance-tuned components — data tables with column resize, freeze, reorder, grouping, trees, sticky headers and filters.",
        "Xây component tái sử dụng, tối ưu hiệu năng — bảng dữ liệu với resize, freeze, sắp xếp cột, nhóm, cây, header dính và bộ lọc.",
      ),
      P(
        "Per-state polymorphism: one codebase adapting to each regulator’s compliance rules with fully tracked traceability data.",
        "Đa hình theo bang: một codebase thích ứng với quy định của từng cơ quan quản lý, dữ liệu truy xuất đầy đủ.",
      ),
      P("Integrated third-party sellers and wholesale/retail services.", "Tích hợp người bán bên thứ ba và dịch vụ bán sỉ/lẻ."),
    ],
  },
  {
    num: "03",
    name: P("Property Data Platform", "Nền tảng dữ liệu bất động sản"),
    role: "Developer · TwentyTech",
    url: "",
    href: "#",
    image: "/images/proj-property.png",
    imagePos: "50% 50%",
    tagline: P(
      "A UK marketplace that turns raw property data into services people actually book.",
      "Marketplace tại Anh biến dữ liệu bất động sản thô thành dịch vụ người dùng thực sự đặt.",
    ),
    overview: P(
      "UK property-services marketplace connecting users with real-estate and home-moving services — booking, property data lookup, subscription or direct purchase, plus an admin portal for the sales team.",
      "Marketplace dịch vụ bất động sản tại Anh — đặt lịch, tra cứu dữ liệu, mua theo gói hoặc trực tiếp, kèm cổng quản trị cho đội bán hàng.",
    ),
    stack: ["Laravel", "Vue.js"],
    points: [
      P(
        "Turned large datasets into intuitive, visually engaging service views that drive engagement.",
        "Biến tập dữ liệu lớn thành giao diện dịch vụ trực quan, hấp dẫn và giữ chân người dùng.",
      ),
      P(
        "Built Excel export, map views, and filter-based property search and ordering.",
        "Xây xuất Excel, bản đồ, tìm kiếm và đặt hàng bất động sản theo bộ lọc.",
      ),
    ],
  },
];

export interface Feedback {
  quote: Bi;
  name: Bi;
  role: Bi;
}

export const feedback: Feedback[] = [
  {
    quote: P(
      "“Quang doesn’t wait for a finished spec. He sits with us, works out what the requirement really is, and comes back with an architecture that still holds after the next three changes.”",
      "“Quang không chờ spec hoàn chỉnh. Anh ngồi cùng chúng tôi, tìm ra yêu cầu thực sự là gì, rồi quay lại với một kiến trúc vẫn đứng vững sau ba lần thay đổi tiếp theo.”",
    ),
    name: P("Product Owner", "Product Owner"),
    role: P("Welle · US healthcare platform", "Welle · Nền tảng y tế Mỹ"),
  },
  {
    quote: P(
      "“The data grid he built for Bamboo is still the most reused component we have. Resize, freeze, group, tree view, ten thousand rows — and it never became the slow part of the page.”",
      "“Bảng dữ liệu anh xây cho Bamboo đến giờ vẫn là component được tái sử dụng nhiều nhất. Resize, freeze, nhóm, dạng cây, mười nghìn dòng — và nó chưa bao giờ là phần chậm của trang.”",
    ),
    name: P("Engineering Manager", "Engineering Manager"),
    role: P("Bamboo · Cannabis commerce platform", "Bamboo · Nền tảng thương mại cannabis"),
  },
  {
    quote: P(
      "“His code reviews taught me more than any course I took. Direct, specific, and always about the why — not just what to change.”",
      "“Review code của anh dạy tôi nhiều hơn bất kỳ khóa học nào. Thẳng thắn, cụ thể, và luôn nói về lý do — không chỉ là sửa cái gì.”",
    ),
    name: P("Frontend Developer", "Frontend Developer"),
    role: P("Webprovise · Teammate, 2021 — present", "Webprovise · Đồng đội, 2021 — nay"),
  },
];

export interface Post {
  slug: string;
  image: string;
  date: string;
  title: Bi;
  summary: Bi;
  topic: Bi;
  read: Bi;
}

export const posts: Post[] = [
  {
    slug: "multi-tenant-white-label-one-codebase", image: "/images/blog-1.png", date: "2026",
    title: P("Multi-tenant, white-label, and still one codebase", "Multi-tenant, white-label, và vẫn một codebase"),
    summary: P("How Welle serves SaaS customers and per-client custom logic without forking.", "Cách Welle phục vụ khách SaaS và logic riêng từng khách mà không fork."),
    topic: P("Architecture", "Kiến trúc"), read: P("8 min", "8 phút"),
  },
  {
    slug: "ai-soap-notes-under-hipaa", image: "/images/blog-2.png", date: "2026",
    title: P("Shipping AI-assisted SOAP notes under HIPAA", "Đưa SOAP notes có AI hỗ trợ lên production dưới HIPAA"),
    summary: P("Where PHI can and cannot go when an LLM is in the loop.", "PHI được và không được đi đâu khi có LLM trong vòng lặp."),
    topic: P("AI · Compliance", "AI · Tuân thủ"), read: P("6 min", "6 phút"),
  },
  {
    slug: "agentic-workflows-small-team", image: "/images/blog-3.png", date: "2025",
    title: P("Agentic workflows for a small team: what actually stuck", "Quy trình agentic cho đội nhỏ: điều gì thực sự ở lại"),
    summary: P(
      "Custom skills, usage policies and the review habits that kept quality up with Claude Code and Cursor.",
      "Skill tùy biến, chính sách sử dụng và thói quen review giữ chất lượng với Claude Code và Cursor.",
    ),
    topic: P("AI-assisted dev", "Lập trình với AI"), read: P("7 min", "7 phút"),
  },
  {
    slug: "data-tables-that-survive-10k-rows", image: "/images/blog-5.png", date: "2025",
    title: P("Data tables that survive 10k rows", "Bảng dữ liệu sống được qua 10k dòng"),
    summary: P("Resize, freeze, group, tree — and still 60fps. What we learned building Bamboo’s grid.", "Resize, freeze, nhóm, cây — vẫn 60fps. Bài học từ grid của Bamboo."),
    topic: P("Performance", "Hiệu năng"), read: P("9 min", "9 phút"),
  },
  {
    slug: "estimating-work-you-have-never-done", image: "/images/blog-6.png", date: "2024",
    title: P("Estimating work you have never done before", "Ước lượng việc chưa từng làm"),
    summary: P("A tech lead’s honest method for sizing unknowns without padding everything 3×.", "Cách một tech lead ước lượng điều chưa biết mà không nhân ba mọi thứ."),
    topic: P("Leadership", "Lãnh đạo"), read: P("5 min", "5 phút"),
  },
  {
    slug: "one-react-app-25-regulators", image: "/images/blog-4.png", date: "2025",
    title: P("One React app, 25 regulators", "Một app React, 25 cơ quan quản lý"),
    summary: P("Per-state polymorphism in Bamboo’s frontend without a 25-way switch.", "Đa hình theo bang trong frontend Bamboo mà không cần switch 25 nhánh."),
    topic: "Frontend", read: P("5 min", "5 phút"),
  },
];
