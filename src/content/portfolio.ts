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
    detail: "MVP 2025, Most Proactive 2022, Shining Star 2021.",
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
    period: P("2020 to present", "2020 đến nay"),
    length: P("6 yrs, Hanoi / US remote", "6 năm, Hà Nội / remote Mỹ"),
    company: "Webprovise",
    role: "Tech Lead",
    about: P("US product studio: eCommerce, agriculture, healthcare", "Công ty Mỹ: eCommerce, nông nghiệp, y tế"),
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
        "Architected a HIPAA-compliant, multi-tenant healthcare platform with 180+ biomarkers, telehealth and an AI health coach, and shipped it.",
        "Thiết kế kiến trúc và triển khai nền tảng y tế multi-tenant chuẩn HIPAA: 180+ chỉ số sinh học, khám từ xa, AI health coach.",
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
        "Three company awards in five years: MVP 2025, Most Proactive 2022, Shining Star 2021.",
        "Ba giải thưởng trong năm năm: MVP 2025, Most Proactive 2022, Shining Star 2021.",
      ),
    ],
  },
  {
    period: "2019–2020",
    length: P("7 months, UK client", "7 tháng, khách hàng Anh"),
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
        "Worked directly with the London team, from requirements to production, no translation layer.",
        "Làm việc trực tiếp với đội London, từ yêu cầu đến production, không qua trung gian.",
      ),
    ],
  },
  {
    period: "2017–2019",
    length: P("2 yrs, Hanoi", "2 năm, Hà Nội"),
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
    tags: ["Docker", "Linux", "AWS", "Git", "CI/CD", "TDD"],
  },
];

export interface Project {
  num: string;
  /** Short display name for the featured card, e.g. "Welle." */
  short: Bi;
  /** Mono label above the name: domain and shape of the product. */
  kicker: Bi;
  /** Two-line serif subtitle; "\n" breaks the line. */
  subtitle: Bi;
  period: Bi;
  frameLabel: string;
  frameCaption: Bi;
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
    short: "Welle.",
    kicker: P("Healthcare, multi-tenant SaaS", "Y tế, SaaS đa tenant"),
    subtitle: P("Preventive care for US patients.\nOne HIPAA-compliant platform.", "Chăm sóc dự phòng cho bệnh nhân Mỹ.\nMột nền tảng chuẩn HIPAA."),
    period: P("Tech lead, Webprovise", "Tech lead, Webprovise"),
    frameLabel: "WELLE / CARE PORTAL",
    frameCaption: P("One codebase. Many tenants.", "Một codebase. Nhiều tenant."),
    name: P("Welle: US Healthcare Platform", "Welle: Nền tảng y tế Mỹ"),
    role: "Tech Lead",
    url: "wellehealth.com",
    href: "https://wellehealth.com",
    image: "/images/proj-welle.png",
    imagePos: "50% 30%",
    tagline: P(
      "Lab panels covering 180+ biomarkers, telehealth visits and an AI health coach, served to SaaS customers and per-client logic from one multi-tenant codebase.",
      "Xét nghiệm 180+ chỉ số sinh học, khám từ xa và AI health coach, phục vụ khách SaaS lẫn logic riêng từng khách từ một codebase multi-tenant.",
    ),
    overview: P(
      "Personalized longevity and preventive-care platform for US customers: lab panels covering 180+ biomarkers, recurring test scheduling, telehealth visits, clinician consultations and an AI health coach.",
      "Nền tảng chăm sóc sức khỏe và trường thọ cá nhân hóa cho khách hàng Mỹ: gói xét nghiệm 180+ chỉ số, lịch xét nghiệm định kỳ, khám từ xa, tư vấn bác sĩ và AI health coach.",
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
    short: "Bamboo.",
    kicker: P("Cannabis commerce, 25+ US states", "Thương mại cannabis, 25+ bang Mỹ"),
    subtitle: P("Seed-to-sale commerce.\nOne frontend, every regulator.", "Thương mại seed-to-sale.\nMột frontend, mọi cơ quan quản lý."),
    period: P("Frontend lead, Webprovise", "Frontend lead, Webprovise"),
    frameLabel: "BAMBOO / PORTAL, TRACE, SALES",
    frameCaption: P("Per-state rules without a 25-way switch.", "Luật từng bang mà không cần switch 25 nhánh."),
    name: P("Bamboo: Cannabis Commerce Platform", "Bamboo: Nền tảng thương mại cannabis"),
    role: "FE Tech Lead",
    url: "getbamboo.com",
    href: "https://getbamboo.com",
    image: "/images/proj-bamboo.png",
    imagePos: "50% 20%",
    tagline: P(
      "Traceability, sales CRM, inventory and fulfillment for legal cannabis, kept in sync with Metrc, BioTrack and CCRS across 25+ US states.",
      "Truy xuất nguồn gốc, CRM bán hàng, kho và giao hàng cho cannabis hợp pháp, đồng bộ với Metrc, BioTrack và CCRS trên 25+ bang của Mỹ.",
    ),
    overview: P(
      "All-in-one platform for legal cannabis distribution in the US: seed-to-sale traceability, sales CRM, inventory, orders and fulfillment, synced with state regulators (Metrc, BioTrack, CCRS) across 25+ states.",
      "Nền tảng all-in-one cho phân phối cannabis hợp pháp tại Mỹ: truy xuất seed-to-sale, CRM bán hàng, kho, đơn hàng và giao nhận, đồng bộ với cơ quan quản lý (Metrc, BioTrack, CCRS) tại 25+ bang.",
    ),
    stack: ["React", "Redux Observable", "MUI"],
    points: [
      P(
        "Led the frontend of a microservice system with one design language across Portal, Trace and Sales.",
        "Dẫn dắt frontend của hệ microservice với một ngôn ngữ thiết kế chung cho Portal, Trace và Sales.",
      ),
      P(
        "Built reusable, performance-tuned components: data tables with column resize, freeze, reorder, grouping, trees, sticky headers and filters.",
        "Xây component tái sử dụng, tối ưu hiệu năng: bảng dữ liệu với resize, freeze, sắp xếp cột, nhóm, cây, header dính và bộ lọc.",
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
    short: P("Property Data Platform.", "Nền tảng dữ liệu bất động sản."),
    kicker: P("Proptech, UK marketplace", "Proptech, sàn giao dịch Anh"),
    subtitle: P("Raw property data,\nturned into services people book.", "Dữ liệu bất động sản thô,\nthành dịch vụ người dùng đặt thật."),
    period: P("Developer, TwentyTech, 2019–2020", "Developer, TwentyTech, 2019–2020"),
    frameLabel: "TWENTYTECH / MARKETPLACE",
    frameCaption: P("Excel export, map views, filtered search.", "Xuất Excel, bản đồ, tìm kiếm có bộ lọc."),
    name: P("Property Data Platform", "Nền tảng dữ liệu bất động sản"),
    role: "Developer at TwentyTech",
    url: "",
    href: "#",
    image: "/images/proj-property.png",
    imagePos: "50% 50%",
    tagline: P(
      "Booking, property data lookup, subscriptions and an admin portal for the sales team, a Laravel and Vue marketplace built with the London team.",
      "Đặt lịch, tra cứu dữ liệu bất động sản, gói thuê bao và cổng quản trị cho đội bán hàng, một marketplace Laravel và Vue xây cùng đội London.",
    ),
    overview: P(
      "UK property-services marketplace connecting users with real-estate and home-moving services: booking, property data lookup, subscription or direct purchase, plus an admin portal for the sales team.",
      "Marketplace dịch vụ bất động sản tại Anh: đặt lịch, tra cứu dữ liệu, mua theo gói hoặc trực tiếp, kèm cổng quản trị cho đội bán hàng.",
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
    role: P("Welle, US healthcare platform", "Welle, nền tảng y tế Mỹ"),
  },
  {
    quote: P(
      "“The data grid he built for Bamboo is still the most reused component we have. Resize, freeze, group, tree view, ten thousand rows, and it never became the slow part of the page.”",
      "“Bảng dữ liệu anh xây cho Bamboo đến giờ vẫn là component được tái sử dụng nhiều nhất. Resize, freeze, nhóm, dạng cây, mười nghìn dòng, và nó chưa bao giờ là phần chậm của trang.”",
    ),
    name: P("Engineering Manager", "Engineering Manager"),
    role: P("Bamboo, cannabis commerce platform", "Bamboo, nền tảng thương mại cannabis"),
  },
  {
    quote: P(
      "“His code reviews taught me more than any course I took. Direct, specific, and always about the why, not just what to change.”",
      "“Review code của anh dạy tôi nhiều hơn bất kỳ khóa học nào. Thẳng thắn, cụ thể, và luôn nói về lý do, không chỉ là sửa cái gì.”",
    ),
    name: P("Frontend Developer", "Frontend Developer"),
    role: P("Webprovise, teammate since 2021", "Webprovise, đồng đội từ 2021"),
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
    topic: P("AI and compliance", "AI và tuân thủ"), read: P("6 min", "6 phút"),
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
    summary: P("Resize, freeze, group, tree, and still 60fps. What we learned building Bamboo’s grid.", "Resize, freeze, nhóm, cây, vẫn 60fps. Bài học từ grid của Bamboo."),
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

/* — home: how I lead — */
export interface Principle { title: Bi; body: Bi }
export const principles: Principle[] = [
  {
    title: P("Start with the real requirement.", "Bắt đầu từ yêu cầu thật."),
    body: P(
      "Specs are drafts. I sit with the product owner, work out what the business actually needs, then design for the next three changes, not just this one.",
      "Spec chỉ là bản nháp. Tôi ngồi cùng product owner, tìm ra doanh nghiệp thực sự cần gì, rồi thiết kế cho ba lần thay đổi tiếp theo, không chỉ lần này.",
    ),
  },
  {
    title: P("Build codebases that absorb change.", "Xây codebase chịu được thay đổi."),
    body: P(
      "Multi-tenant, white-label, per-state rules: the variation lives in the architecture, so features never have to fork.",
      "Multi-tenant, white-label, luật theo từng bang: phần biến thiên nằm trong kiến trúc, để tính năng không bao giờ phải fork.",
    ),
  },
  {
    title: P("Ship AI where it earns its place.", "Đưa AI vào đúng chỗ nó xứng đáng."),
    body: P(
      "Patient chatbots, AI-drafted SOAP notes, care recommendations, in production, under HIPAA, with the PHI boundaries drawn first.",
      "Chatbot cho bệnh nhân, SOAP notes do AI soạn, gợi ý chăm sóc, chạy thật, dưới HIPAA, với ranh giới PHI được vẽ trước.",
    ),
  },
];

/* — home: current focus — */
export type ExplorationIcon = "shield" | "cpu" | "layers";
export interface Exploration { icon: ExplorationIcon; title: Bi; body: Bi; href: string }
export const explorations: Exploration[] = [
  {
    icon: "shield",
    title: P("AI inside regulated products", "AI trong sản phẩm có quy định chặt"),
    body: P("Where an LLM can and cannot go when PHI is in the loop.", "LLM được và không được đi đâu khi có PHI trong vòng lặp."),
    href: "/blog/ai-soap-notes-under-hipaa",
  },
  {
    icon: "cpu",
    title: P("Agentic workflows for small teams", "Quy trình agentic cho đội nhỏ"),
    body: P(
      "Custom skills, usage policies and review habits that keep quality up with Claude Code and Cursor.",
      "Skill tùy biến, chính sách sử dụng và thói quen review giữ chất lượng với Claude Code và Cursor.",
    ),
    href: "/blog/agentic-workflows-small-team",
  },
  {
    icon: "layers",
    title: P("One codebase, many regulators", "Một codebase, nhiều cơ quan quản lý"),
    body: P("Per-tenant and per-state behaviour without a 25-way switch.", "Hành vi theo tenant và theo bang mà không cần switch 25 nhánh."),
    href: "/blog/one-react-app-25-regulators",
  },
];

/* — about — */
export const profile = {
  bio: [
    P(
      "I'm Do Nhat Quang, Quinn to most people, a senior full-stack developer and tech lead in Hanoi. For nine years I've built web platforms for companies in the US, the UK and Japan, moving from frontend specialist to the engineer a company hands its hardest platform to.",
      "Tôi là Đỗ Nhật Quang, mọi người gọi là Quinn, senior full-stack developer kiêm tech lead ở Hà Nội. Chín năm qua tôi xây nền tảng web cho các công ty Mỹ, Anh và Nhật, đi từ chuyên gia frontend đến người được giao nền tảng khó nhất của công ty.",
    ),
    P(
      "At Webprovise I lead engineering on Welle, a HIPAA-compliant healthcare platform: 180+ biomarkers, telehealth, an AI health coach, and a multi-tenant, white-label architecture that serves SaaS customers and per-client logic from one codebase. Before that I led the frontend of Bamboo, a cannabis commerce platform that satisfies regulators in 25+ US states.",
      "Tại Webprovise tôi dẫn dắt kỹ thuật cho Welle, nền tảng y tế chuẩn HIPAA: 180+ chỉ số sinh học, khám từ xa, AI health coach, và kiến trúc multi-tenant, white-label phục vụ khách SaaS lẫn logic riêng từng khách từ một codebase. Trước đó tôi dẫn frontend của Bamboo, nền tảng thương mại cannabis đáp ứng cơ quan quản lý ở 25+ bang của Mỹ.",
    ),
    P(
      "I care about requirements more than tickets, about codebases that absorb change, and about putting AI into production where it earns its place, with the PHI boundaries drawn first.",
      "Tôi quan tâm đến yêu cầu hơn là ticket, đến codebase chịu được thay đổi, và đến việc đưa AI vào production ở đúng chỗ nó xứng đáng, với ranh giới PHI được vẽ trước.",
    ),
  ] as Bi[],
  facts: [
    { label: P("Location", "Nơi làm việc"), value: P("Hanoi, Vietnam", "Hà Nội, Việt Nam") },
    { label: P("Role", "Vai trò"), value: P("Tech Lead at Webprovise", "Tech Lead tại Webprovise") },
    { label: P("Shipping since", "Làm nghề từ"), value: "2017" },
    { label: P("Languages", "Ngôn ngữ"), value: P("Vietnamese and English (TOEIC 780)", "Tiếng Việt và tiếng Anh (TOEIC 780)") },
  ] as { label: Bi; value: Bi }[],
};

export interface Credential { title: Bi; detail: Bi }
export const credentials: Credential[] = [
  {
    title: P("B.Eng. Information Technology", "Kỹ sư Công nghệ thông tin"),
    detail: P("Hanoi University of Science and Technology, 2019", "Đại học Bách khoa Hà Nội, 2019"),
  },
  { title: P("Three company awards", "Ba giải thưởng công ty"), detail: "MVP 2025, Most Proactive 2022, Shining Star 2021" },
  { title: P("English", "Tiếng Anh"), detail: "TOEIC 780" },
];
