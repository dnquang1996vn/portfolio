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
  linkedin: "https://www.linkedin.com/in/nh%E1%BA%ADt-quang-%C4%91%E1%BB%97-b11ab014a/",
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
  /** Year the skill entered daily work; the detail dialog turns it into years of practice. */
  since: number;
  summary: Bi;
  /** Short notes for the detail dialog: what was built, how it is applied. */
  built: Bi[];
  apply: Bi[];
}

export const skills: Skill[] = [
  {
    num: "01", title: "Frontend",
    logos: [
      { name: "React", slug: "react" }, { name: "Next.js", slug: "nextdotjs" },
      { name: "TypeScript", slug: "typescript" }, { name: "Vue.js", slug: "vuedotjs" },
    ],
    tags: ["React", "Next.js", "TypeScript", "Redux", "Vue.js", "SCSS", "Responsive", "Web performance"],
    since: 2017,
    summary: P(
      "Where everything started. From the first React component in 2017 to leading the frontend of two platforms.",
      "Nơi mọi thứ bắt đầu. Từ component React đầu tiên năm 2017 đến dẫn frontend cho hai nền tảng.",
    ),
    built: [
      P("Bamboo: one React app serving regulators in 25+ US states, Redux Observable and MUI.", "Bamboo: một app React phục vụ cơ quan quản lý ở 25+ bang Mỹ, Redux Observable và MUI."),
      P("Welle care portal and storefront in React + TypeScript, themed per tenant, white-label ready.", "Care portal và storefront của Welle bằng React + TypeScript, theme theo tenant, sẵn sàng white-label."),
      P("A data grid that stays fast at 10k rows: resize, freeze, group, tree view.", "Bảng dữ liệu vẫn nhanh ở 10k dòng: resize, freeze, nhóm, dạng cây."),
    ],
    apply: [
      P("Component tests with real providers and router; unit tests only for logic pulled out on purpose.", "Test component với provider và router thật; unit test chỉ cho logic được tách ra có chủ đích."),
      P("Split stores and virtualization, measured before optimized.", "Tách store và virtualization, đo trước khi tối ưu."),
      P("Responsive, keyboard-friendly and reduced-motion aware by default.", "Responsive, dùng được bằng bàn phím và tôn trọng reduced-motion mặc định."),
    ],
  },
  {
    num: "02", title: "Backend",
    logos: [
      { name: "Node.js", slug: "nodedotjs" }, { name: "NestJS", slug: "nestjs" },
      { name: "Express", slug: "express" }, { name: "Laravel", slug: "laravel" },
    ],
    tags: ["Node.js", "NestJS", "Express", "REST APIs", "PHP / Laravel", "Multi-tenant", "White-label"],
    since: 2019,
    summary: P(
      "Started with Laravel for a London proptech, then Node and NestJS for the Welle platform.",
      "Bắt đầu với Laravel cho một proptech ở London, rồi Node và NestJS cho nền tảng Welle.",
    ),
    built: [
      P("Welle API on NestJS and Express: tenant context resolved once per request, injected everywhere.", "Welle API trên NestJS và Express: tenant context resolve một lần mỗi request, inject khắp nơi."),
      P("A Laravel + Vue property marketplace, from requirements to release with the London team.", "Marketplace bất động sản Laravel + Vue, từ yêu cầu đến release cùng đội London."),
      P("Multi-tenant, white-label architecture that serves SaaS customers and per-client logic from one codebase.", "Kiến trúc multi-tenant, white-label phục vụ khách SaaS lẫn logic riêng từng khách từ một codebase."),
    ],
    apply: [
      P("Business rules as injectable units that run in milliseconds; the HTTP boundary tested against a real database.", "Nghiệp vụ là các unit inject được, chạy trong mili giây; biên HTTP test với database thật."),
      P("Contract checks for other teams' systems instead of tests that depend on their uptime.", "Kiểm tra contract với hệ thống của đội khác thay vì test phụ thuộc uptime của họ."),
      P("Schemas and feature flags designed so requirement churn lands as config, not rewrites.", "Schema và feature flag thiết kế để thay đổi yêu cầu rơi vào config, không phải viết lại."),
    ],
  },
  {
    num: "03", title: "AI integration",
    logos: [
      { name: "Anthropic", slug: "anthropic" }, { name: "LangChain", slug: "langchain" },
      { name: "Hugging Face", slug: "huggingface" },
    ],
    tags: ["Patient chatbots", "AI-assisted SOAP notes", "Recommendation systems"],
    since: 2023,
    summary: P(
      "AI in a HIPAA product, where the PHI boundary is drawn before the first prompt is written.",
      "AI trong sản phẩm chuẩn HIPAA, nơi ranh giới PHI được vẽ trước khi viết prompt đầu tiên.",
    ),
    built: [
      P("A patient chatbot grounded on the member's own records and care plan.", "Chatbot bệnh nhân dựa trên hồ sơ và kế hoạch chăm sóc của chính họ."),
      P("AI-drafted SOAP notes: PHI redacted before the model, rehydrated inside our boundary.", "SOAP notes do AI soạn: PHI được ẩn trước khi vào model, khôi phục trong ranh giới của chúng tôi."),
      P("Personalized care recommendations from 180+ biomarkers.", "Gợi ý chăm sóc cá nhân hóa từ 180+ chỉ số sinh học."),
    ],
    apply: [
      P("The model proposes, the clinician signs. Every clinical draft gets human review.", "Model đề xuất, bác sĩ ký. Mọi bản nháp lâm sàng đều qua người duyệt."),
      P("Prompt changes are evaluated against real transcripts before they ship.", "Thay đổi prompt được đánh giá trên transcript thật trước khi lên production."),
      P("Cost and latency tracked per feature, so AI earns its place or gets removed.", "Chi phí và độ trễ theo dõi theo từng tính năng, AI phải xứng đáng chỗ đứng hoặc bị gỡ."),
    ],
  },
  {
    num: "04", title: "AI-assisted development",
    logos: [
      { name: "Claude Code", slug: "claude" }, { name: "Cursor", slug: "cursor" },
      { name: "GitHub", slug: "github" },
    ],
    tags: ["Claude Code", "Cursor", "Agentic workflows", "Custom skills", "Team usage policies"],
    since: 2024,
    summary: P(
      "Claude Code and Cursor as part of the team's daily workflow, with rules on what they may see and do.",
      "Claude Code và Cursor là một phần quy trình hằng ngày của đội, với quy tắc về những gì chúng được thấy và làm."),
    built: [
      P("Team usage policy: which repos and data an agent may touch, and what must stay out.", "Chính sách dùng cho đội: agent được chạm repo và dữ liệu nào, cái gì phải đứng ngoài."),
      P("Custom skills for tickets, reviews and release notes, so output stays consistent across people.", "Custom skill cho ticket, review và release note, để output nhất quán giữa mọi người."),
      P("Review habits for AI-written diffs: provenance, sandbox, CI backstops.", "Thói quen review diff do AI viết: nguồn gốc, sandbox, CI chặn hậu."),
    ],
    apply: [
      P("AI writes the first draft; the reviewer owns the merge.", "AI viết bản nháp đầu; người review chịu trách nhiệm merge."),
      P("Conventions live in skills, not in people's heads.", "Quy ước sống trong skill, không nằm trong đầu từng người."),
      P("Measure what stuck after a month; drop what did not.", "Đo lại sau một tháng xem gì ở lại; bỏ những gì không."),
    ],
  },
  {
    num: "05", title: "Integrations & compliance",
    logos: [
      { name: "Stripe", slug: "stripe" }, { name: "PostgreSQL", slug: "postgresql" },
      { name: "Redis", slug: "redis" },
    ],
    tags: ["Labs", "Telehealth", "Email / SMS", "HIPAA & PHI", "State pricing & legal (US)"],
    since: 2020,
    summary: P(
      "Healthcare and cannabis commerce, two industries where the rules are the product.",
      "Y tế và thương mại cannabis, hai ngành mà luật lệ chính là sản phẩm.",
    ),
    built: [
      P("HIPAA and PHI protection end to end on Welle: at rest, in transit, in logs.", "Bảo vệ HIPAA và PHI xuyên suốt trên Welle: lưu trữ, truyền tải, log."),
      P("Lab orders and results, telehealth sessions, transactional email and SMS, Stripe payments.", "Đặt và nhận kết quả xét nghiệm, khám từ xa, email và SMS giao dịch, thanh toán Stripe."),
      P("State pricing and legal rules for cannabis commerce in 25+ US states.", "Giá và quy định pháp lý theo bang cho thương mại cannabis ở 25+ bang Mỹ."),
    ],
    apply: [
      P("Compliance as architecture: the boundary is in code, not in a checklist.", "Tuân thủ là kiến trúc: ranh giới nằm trong code, không phải trong checklist."),
      P("Each regulator or vendor behind a strategy interface, so a new state is a file, not a rewrite.", "Mỗi cơ quan quản lý hay vendor đứng sau một strategy interface, thêm bang mới là thêm file, không viết lại."),
      P("Least-privilege access and an audit trail by default.", "Quyền tối thiểu và audit trail mặc định."),
    ],
  },
  {
    num: "06", title: "DevOps & tools",
    logos: [
      { name: "Docker", slug: "docker" }, { name: "Kubernetes", slug: "kubernetes" },
      { name: "Linux", slug: "linux" }, { name: "Git", slug: "git" },
    ],
    tags: ["Docker", "Linux", "AWS", "Git", "CI/CD", "TDD"],
    since: 2019,
    summary: P(
      "Enough infrastructure to keep deploys boring: containers, pipelines and the tests that gate them.",
      "Đủ hạ tầng để deploy luôn nhàm chán: container, pipeline và những test gác cổng."),
    built: [
      P("Docker environments for Welle services, the same locally and in CI.", "Môi trường Docker cho các service Welle, giống nhau ở local và CI."),
      P("CI/CD pipelines with tests, lint and type checks as merge gates.", "Pipeline CI/CD với test, lint và type check làm cổng merge."),
      P("AWS-hosted services on Linux, with PostgreSQL and Redis in containers.", "Service chạy trên AWS và Linux, PostgreSQL và Redis trong container."),
    ],
    apply: [
      P("One happy-path end-to-end test per feature; everything else lower and cheaper.", "Mỗi tính năng một test end-to-end đường chính; phần còn lại test ở tầng thấp hơn, rẻ hơn."),
      P("Reproducible first: if it only works on one laptop, it does not work.", "Tái tạo được là trên hết: chỉ chạy trên một laptop nghĩa là chưa chạy."),
      P("Automate the boring parts, keep a human on the release button.", "Tự động hóa phần nhàm chán, giữ người ở nút release."),
    ],
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
    frameLabel: "WELLE / WELLEHEALTH.COM",
    frameCaption: P("One codebase. Many tenants.", "Một codebase. Nhiều tenant."),
    name: P("Welle: US Healthcare Platform", "Welle: Nền tảng y tế Mỹ"),
    role: "Tech Lead",
    url: "wellehealth.com",
    href: "https://wellehealth.com",
    image: "/images/proj-welle.jpg",
    imagePos: "50% 0%",
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
    frameLabel: "BAMBOO / GETBAMBOO.COM",
    frameCaption: P("Per-state rules without a 25-way switch.", "Luật từng bang mà không cần switch 25 nhánh."),
    name: P("Bamboo: Cannabis Commerce Platform", "Bamboo: Nền tảng thương mại cannabis"),
    role: "FE Tech Lead",
    url: "getbamboo.com",
    href: "https://getbamboo.com",
    image: "/images/proj-bamboo.jpg",
    imagePos: "50% 0%",
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
    frameLabel: "TWENTYCI GROUP / UK PROPERTY DATA",
    frameCaption: P("Excel export, map views, filtered search.", "Xuất Excel, bản đồ, tìm kiếm có bộ lọc."),
    name: P("Property Data Platform", "Nền tảng dữ liệu bất động sản"),
    role: "Developer at TwentyTech",
    url: "",
    href: "#",
    image: "/images/proj-property.jpg",
    imagePos: "50% 0%",
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

/* — blog — */

/**
 * Tag registry. Keys are the stable ids used in `Post.tags` and in `/blog?tag=<id>`;
 * values are the labels. Add a line here before using a new tag on a post.
 */
export const tags = {
  architecture: P("Architecture", "Kiến trúc"),
  ai: "AI",
  compliance: P("Compliance", "Tuân thủ"),
  performance: P("Performance", "Hiệu năng"),
  frontend: "Frontend",
  leadership: P("Leadership", "Lãnh đạo"),
  tooling: P("Dev tooling", "Công cụ dev"),
  testing: P("Testing", "Kiểm thử"),
} as const satisfies Record<string, Bi>;

export type TagId = keyof typeof tags;

export function isTagId(value: string): value is TagId {
  return Object.hasOwn(tags, value);
}

export interface Post {
  slug: string;
  image: string;
  date: string;
  title: Bi;
  summary: Bi;
  topic: Bi;
  read: Bi;
  tags: readonly TagId[];
}

/**
 * Newest first. Array order is the display order on /blog, the home page, the footer,
 * and the prev/next links on an article, so a new post goes at the top.
 */
const postList = [
  {
    slug: "making-sure-a-feature-works", image: "/images/cover-feature-tests.png", date: "2026",
    title: P("How I make sure a feature works", "Cách tôi chắc một feature chạy đúng"),
    summary: P(
      "Unit tests where the knowledge is isolated, component tests where it interacts, one happy path end to end.",
      "Unit test cho logic tách riêng được, component test cho phần có tương tác, và một happy path end to end.",
    ),
    topic: P("Testing", "Kiểm thử"), read: P("3 min", "3 phút"),
    tags: ["testing", "frontend"],
  },
  {
    slug: "multi-tenant-white-label-one-codebase", image: "/images/cover-multi-tenant.png", date: "2026",
    title: P("Multi-tenant, white-label, and still one codebase", "Multi-tenant, white-label, và vẫn một codebase"),
    summary: P("How Welle serves SaaS customers and per-client custom logic without forking.", "Cách Welle phục vụ khách SaaS và logic riêng từng khách mà không fork."),
    topic: P("Architecture", "Kiến trúc"), read: P("8 min", "8 phút"),
    tags: ["architecture"],
  },
  {
    slug: "ai-soap-notes-under-hipaa", image: "/images/cover-soap-hipaa.png", date: "2026",
    title: P("Shipping AI-assisted SOAP notes under HIPAA", "Đưa SOAP notes có AI hỗ trợ lên production dưới HIPAA"),
    summary: P("Where PHI can and cannot go when an LLM is in the loop.", "PHI được và không được đi đâu khi có LLM trong vòng lặp."),
    topic: P("AI and compliance", "AI và tuân thủ"), read: P("6 min", "6 phút"),
    tags: ["ai", "compliance"],
  },
  {
    slug: "agentic-workflows-small-team", image: "/images/cover-agentic-workflows.png", date: "2025",
    title: P("Agentic workflows for a small team: what actually stuck", "Quy trình agentic cho đội nhỏ: điều gì thực sự ở lại"),
    summary: P(
      "Custom skills, usage policies and the review habits that kept quality up with Claude Code and Cursor.",
      "Skill tùy biến, chính sách sử dụng và thói quen review giữ chất lượng với Claude Code và Cursor.",
    ),
    topic: P("AI-assisted dev", "Lập trình với AI"), read: P("7 min", "7 phút"),
    tags: ["ai", "tooling"],
  },
  {
    slug: "data-tables-that-survive-10k-rows", image: "/images/cover-data-tables.png", date: "2025",
    title: P("Data tables that survive 10k rows", "Bảng dữ liệu sống được qua 10k dòng"),
    summary: P("Resize, freeze, group, tree, and still 60fps. What we learned building Bamboo’s grid.", "Resize, freeze, nhóm, cây, vẫn 60fps. Bài học từ grid của Bamboo."),
    topic: P("Performance", "Hiệu năng"), read: P("9 min", "9 phút"),
    tags: ["performance", "frontend"],
  },
  {
    slug: "estimating-work-you-have-never-done", image: "/images/cover-estimating.png", date: "2024",
    title: P("Estimating work you have never done before", "Ước lượng việc chưa từng làm"),
    summary: P("A tech lead’s honest method for sizing unknowns without padding everything 3×.", "Cách một tech lead ước lượng điều chưa biết mà không nhân ba mọi thứ."),
    topic: P("Leadership", "Lãnh đạo"), read: P("5 min", "5 phút"),
    tags: ["leadership"],
  },
  {
    slug: "one-react-app-25-regulators", image: "/images/cover-25-regulators.png", date: "2025",
    title: P("One React app, 25 regulators", "Một app React, 25 cơ quan quản lý"),
    summary: P("Per-state polymorphism in Bamboo’s frontend without a 25-way switch.", "Đa hình theo bang trong frontend Bamboo mà không cần switch 25 nhánh."),
    topic: "Frontend", read: P("5 min", "5 phút"),
    tags: ["frontend", "architecture"],
  },
] as const satisfies readonly Post[];

export const posts: readonly Post[] = postList;

/** Union of every post slug, so `articles` in articles.ts must cover each one. */
export type PostSlug = (typeof postList)[number]["slug"];

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
