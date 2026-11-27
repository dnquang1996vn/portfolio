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
    detail: P("Frontend specialist to tech lead, 2017 → today.", "Từ frontend developer lên tech lead, 2017 → nay."),
  },
  {
    value: 180, decimals: 0, suffix: "+",
    label: P("Biomarkers in production", "Chỉ số sinh học trên production"),
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
      "Joined as a frontend developer in 2020. Now tech lead on the company's healthcare platform.",
      "Vào làm frontend developer năm 2020. Giờ là tech lead cho nền tảng y tế của công ty.",
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
        "Requirements changed often, so I designed the codebases to take most changes as configuration or one new module.",
        "Yêu cầu đổi liên tục, nên tôi thiết kế codebase để phần lớn thay đổi chỉ là cấu hình hoặc thêm một module.",
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
      "Built a UK property-data marketplace with the London team.",
      "Xây marketplace dữ liệu bất động sản Anh cùng team London.",
    ),
    points: [
      P(
        "Owned features, estimates, reviews and releases on a Laravel + Vue property platform.",
        "Phụ trách tính năng, ước lượng, review và release trên nền tảng Laravel + Vue.",
      ),
      P(
        "Worked directly with the London team, from requirements to production, with no go-between.",
        "Làm việc trực tiếp với team London, từ yêu cầu đến production, không qua trung gian.",
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
      "Vào từ thực tập sinh năm ba. Lúc rời đi, đang ở team chuẩn hóa code cho cả công ty.",
    ),
    points: [
      P(
        "Intern → part-time → full-time engineer, all before graduation.",
        "Thực tập → bán thời gian → kỹ sư chính thức, đều trước khi tốt nghiệp.",
      ),
      P(
        "Picked for the prototype team: reference projects every other team coded against.",
        "Được chọn vào team prototype: các dự án mẫu làm chuẩn cho những team khác.",
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
      "Nine years of React, from the first component to leading the frontend of two platforms.",
      "Chín năm React, từ component đầu tiên đến lead frontend cho hai nền tảng.",
    ),
    built: [
      P("Led the frontend of Bamboo: one React app, regulators in 25+ US states.", "Lead frontend Bamboo: một app React, cơ quan quản lý ở 25+ bang Mỹ."),
      P("Built Welle's care portal and storefront in React + TypeScript, themed per tenant.", "Xây care portal và storefront của Welle bằng React + TypeScript, theme theo tenant."),
      P("Shipped a data grid that stays fast at 10k rows: resize, freeze, group, tree view.", "Làm bảng dữ liệu vẫn mượt ở 10k dòng: resize, freeze, nhóm, dạng cây."),
    ],
    apply: [
      P("Test components with real providers and router; unit-test only extracted logic.", "Test component với provider và router thật; unit test chỉ cho logic đã tách."),
      P("Measure before optimizing: split stores, virtualize, then profile again.", "Đo trước khi tối ưu: tách store, virtualize, rồi đo lại."),
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
      "Laravel for a London proptech, then Node and NestJS for Welle's multi-tenant API.",
      "Laravel cho proptech ở London, rồi Node và NestJS cho API multi-tenant của Welle.",
    ),
    built: [
      P("Designed Welle's API on NestJS and Express: tenant context resolved once per request.", "Thiết kế API của Welle trên NestJS và Express: tenant context resolve một lần mỗi request."),
      P("Delivered a Laravel + Vue property marketplace with the London team, requirements to release.", "Làm marketplace bất động sản Laravel + Vue cùng team London, từ yêu cầu đến release."),
      P("Served SaaS tenants and per-client logic from one codebase, white-label included.", "Một codebase chạy cho cả khách SaaS lẫn logic riêng từng khách, kèm white-label."),
    ],
    apply: [
      P("Keep rules as injectable units; test the HTTP boundary against a real database.", "Giữ nghiệp vụ là các unit inject được; test biên HTTP với database thật."),
      P("Check contracts with other teams' systems instead of depending on their uptime.", "Kiểm tra contract với hệ thống team khác thay vì phụ thuộc uptime của họ."),
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
      "AI inside a HIPAA product, with the PHI boundary drawn before the first prompt.",
      "AI trong sản phẩm chuẩn HIPAA, xác định ranh giới PHI trước khi viết prompt đầu tiên.",
    ),
    built: [
      P("Shipped a patient chatbot grounded on each member's records and care plan.", "Làm chatbot cho bệnh nhân, trả lời dựa trên hồ sơ và kế hoạch chăm sóc của từng người."),
      P("Put AI-drafted SOAP notes in production: PHI redacted before the model, restored inside our boundary.", "Đưa SOAP notes do AI soạn lên production: ẩn PHI trước model, khôi phục lại bên trong hệ thống của mình."),
      P("Generated personalized care recommendations from 180+ biomarkers.", "Tạo gợi ý chăm sóc cá nhân hóa từ 180+ chỉ số sinh học."),
    ],
    apply: [
      P("The model drafts, the clinician signs; no clinical text ships without review.", "Model soạn, bác sĩ ký; văn bản lâm sàng nào cũng phải qua duyệt mới được dùng."),
      P("Draw the PHI boundary first, pick the model second.", "Xác định ranh giới PHI trước, chọn model sau."),
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
      "Claude Code and Cursor in the team's daily workflow, with rules for what they may touch.",
      "Claude Code và Cursor trong quy trình hằng ngày của team, kèm quy tắc về những gì chúng được đụng vào.",
    ),
    built: [
      P("Wrote the team's usage policy: which repos and data an agent may touch.", "Viết chính sách dùng cho team: agent được đụng vào repo và dữ liệu nào."),
      P("Built custom skills for tickets, reviews and release notes, so output is consistent across people.", "Viết custom skill cho ticket, review và release note, để ai làm output cũng giống nhau."),
      P("Set review rules for AI-written diffs: provenance, sandbox, CI backstops.", "Đặt luật review cho diff do AI viết: nguồn gốc, sandbox, CI chặn hậu."),
    ],
    apply: [
      P("AI writes the first draft; the reviewer owns the merge.", "AI viết bản nháp đầu; người review chịu trách nhiệm merge."),
      P("Keep what still helps after a month, drop the rest.", "Giữ những gì sau một tháng vẫn hữu ích, bỏ phần còn lại."),
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
      "Healthcare and cannabis commerce, where most of the hard requirements come from regulators.",
      "Y tế và thương mại cannabis, hai ngành mà phần lớn yêu cầu khó đến từ cơ quan quản lý.",
    ),
    built: [
      P("Enforced HIPAA and PHI protection across Welle: at rest, in transit, in logs.", "Áp dụng HIPAA và bảo vệ PHI trên toàn Welle: lưu trữ, truyền tải, log."),
      P("Integrated labs, telehealth, email and SMS, and Stripe payments.", "Tích hợp xét nghiệm, khám từ xa, email và SMS, thanh toán Stripe."),
      P("Encoded state pricing and legal rules for cannabis commerce in 25+ US states.", "Đưa giá và quy định pháp lý theo từng bang vào hệ thống, cho thương mại cannabis ở 25+ bang Mỹ."),
    ],
    apply: [
      P("Build compliance into the architecture, so it does not depend on someone remembering a checklist.", "Đưa tuân thủ vào kiến trúc, để không phụ thuộc vào việc ai đó nhớ checklist."),
      P("One strategy interface per regulator or vendor: adding a state means adding a file.", "Mỗi cơ quan quản lý hay vendor một strategy interface: thêm bang là thêm một file."),
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
      "Enough infrastructure to keep deploys boring: containers, pipelines and gating tests.",
      "Đủ kiến thức hạ tầng để deploy không còn gì hồi hộp: container, pipeline và test gác cổng.",
    ),
    built: [
      P("Containerized Welle's services with Docker, identical locally and in CI.", "Đóng gói service của Welle bằng Docker, giống nhau ở local và CI."),
      P("Set up CI/CD with tests, lint and type checks as merge gates.", "Dựng CI/CD với test, lint và type check làm cổng merge."),
      P("Ran services on AWS and Linux with PostgreSQL and Redis in containers.", "Vận hành service trên AWS và Linux, PostgreSQL và Redis trong container."),
    ],
    apply: [
      P("One happy-path end-to-end test per feature; everything else lower and cheaper.", "Mỗi tính năng một test end-to-end đường chính; phần còn lại test ở tầng thấp hơn, rẻ hơn."),
      P("Automate the boring parts, keep a human on the release button.", "Tự động hóa phần nhàm chán, nhưng nút release vẫn do người bấm."),
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
    subtitle: P("Preventive care for US patients.\nOne HIPAA-compliant platform.", "Chăm sóc dự phòng cho người Mỹ.\nMột nền tảng chuẩn HIPAA."),
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
      P("Enforced HIPAA and PHI data protection end to end.", "Áp dụng HIPAA và bảo vệ dữ liệu PHI trên toàn hệ thống."),
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
        "Lead frontend của hệ microservice với một ngôn ngữ thiết kế chung cho Portal, Trace và Sales.",
      ),
      P(
        "Built reusable, performance-tuned components: data tables with column resize, freeze, reorder, grouping, trees, sticky headers and filters.",
        "Xây component tái sử dụng, tối ưu hiệu năng: bảng dữ liệu với resize, freeze, sắp xếp cột, nhóm, cây, sticky header và bộ lọc.",
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
      "Đặt lịch, tra cứu dữ liệu bất động sản, gói thuê bao và cổng quản trị cho team bán hàng, một marketplace Laravel và Vue xây cùng team London.",
    ),
    overview: P(
      "UK property-services marketplace connecting users with real-estate and home-moving services: booking, property data lookup, subscription or direct purchase, plus an admin portal for the sales team.",
      "Marketplace dịch vụ bất động sản tại Anh: đặt lịch, tra cứu dữ liệu, mua theo gói hoặc trực tiếp, kèm cổng quản trị cho team bán hàng.",
    ),
    stack: ["Laravel", "Vue.js"],
    points: [
      P(
        "Built the pages that turn large property datasets into services a user can browse and book.",
        "Làm các trang biến tập dữ liệu bất động sản lớn thành dịch vụ mà người dùng xem và đặt được.",
      ),
      P(
        "Built Excel export, map views, and filter-based property search and ordering.",
        "Làm tính năng xuất Excel, bản đồ, tìm kiếm và đặt hàng bất động sản theo bộ lọc.",
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
  /** The opening paragraph under the title; also the RSS description and the OG description. */
  lede: Bi;
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
    slug: "what-devs-do-when-ai-codes", image: "/images/cover-ai-99.png", date: "2026",
    title: P("What devs do when AI writes 99%", "Dev làm gì khi AI code hết 99% rồi?"),
    summary: P(
      "What I changed after merging AI-written payment code I had not really read.",
      "Những gì mình đổi sau lần merge code thanh toán do AI viết mà không đọc kỹ.",
    ),
    lede: P(
      "I once had AI fix some payment logic, let it merge on its own, and forgot about it. A long time later, a user reported a bug. This post is about that, and what I changed in how I work with AI.",
      "Có lần mình nhờ AI sửa một đoạn logic thanh toán, để nó tự merge, rồi quên luôn. Rất lâu sau, user báo bug. Bài này kể lại lần đó và những gì mình đổi trong cách làm việc với AI.",
    ),
    topic: P("AI-assisted dev", "Lập trình với AI"), read: P("4 min", "4 phút"),
    tags: ["ai", "leadership"],
  },
  {
    slug: "making-sure-a-feature-works", image: "/images/cover-feature-tests.png", date: "2026",
    title: P("Keeping AI-written features under control", "Để AI code feature mà vẫn kiểm soát được"),
    summary: P(
      "Thin unit and end-to-end layers, thick component tests, and a page in the app that shows every state.",
      "Unit và end to end mỏng, component test dày, và một trang trong app bày sẵn mọi state.",
    ),
    lede: P(
      "I let an AI agent build a whole large feature from Figma. The main flow was right, but it got many small things wrong, and feeding them back one by one took very long. This is the process I set up so the agent can code, review and test on its own, and I can review faster.",
      "Mình giao cho AI code trọn 1 feature to theo Figma. Phần chính thì đúng, nhưng lỗi lặt vặt cả đống, ngồi feedback từng cái để sửa rất lâu. Bài này kể lại quy trình mình dựng để AI tự code, tự test được, còn mình thì review nhanh hơn.",
    ),
    topic: P("Testing", "Kiểm thử"), read: P("8 min", "8 phút"),
    tags: ["testing", "ai", "frontend"],
  },
  {
    slug: "multi-tenant-white-label-one-codebase", image: "/images/cover-multi-tenant.png", date: "2026",
    title: P("Multi-tenant, white-label, and still one codebase", "Multi-tenant, white-label, và vẫn một codebase"),
    summary: P("How Welle serves SaaS customers and per-client custom logic without forking.", "Cách Welle phục vụ khách SaaS và logic riêng từng khách mà không fork."),
    lede: P(
      "Welle runs as a SaaS product for some customers and as a heavily customised white-label deployment for others. Both ship from the same repository, on the same release train. Here is the shape that made that possible, and the two rules that keep it from rotting.",
      "Welle chạy dưới dạng SaaS cho một số khách hàng, và dưới dạng white-label tùy biến sâu cho những khách khác. Cả hai đều ra từ cùng một repository, cùng một lịch release. Bài này kể cấu trúc giúp làm được vậy, và hai nguyên tắc giữ cho nó không nát dần.",
    ),
    topic: P("Architecture", "Kiến trúc"), read: P("8 min", "8 phút"),
    tags: ["architecture"],
  },
  {
    slug: "ai-soap-notes-under-hipaa", image: "/images/cover-soap-hipaa.png", date: "2026",
    title: P("Shipping AI-assisted SOAP notes under HIPAA", "Đưa SOAP notes có AI hỗ trợ lên production theo chuẩn HIPAA"),
    summary: P("Where PHI can and cannot go when an LLM is in the loop.", "Khi có LLM tham gia, PHI được đi tới đâu và không được đi tới đâu."),
    lede: P(
      "Clinicians on Welle spend less time on documentation because a model drafts the SOAP note from the visit. Most of the work to make that acceptable under HIPAA went into one thing: deciding exactly where protected health information is allowed to travel.",
      "Bác sĩ trên Welle tốn ít thời gian ghi chép hơn vì một mô hình soạn bản nháp SOAP note từ buổi khám. Để làm được vậy mà vẫn đúng HIPAA, phần lớn công sức dồn vào một việc: xác định thật rõ thông tin sức khỏe được bảo vệ (PHI) được phép đi tới đâu.",
    ),
    topic: P("AI and compliance", "AI và tuân thủ"), read: P("6 min", "6 phút"),
    tags: ["ai", "compliance"],
  },
  {
    slug: "agentic-workflows-small-team", image: "/images/cover-agentic-workflows.png", date: "2025",
    title: P("Agentic workflows for a small team: what stuck", "Quy trình agentic cho team nhỏ: cái gì trụ lại"),
    summary: P(
      "Custom skills, usage policies and the review habits that kept quality up with Claude Code and Cursor.",
      "Custom skill, chính sách sử dụng và thói quen review giúp giữ chất lượng khi dùng Claude Code và Cursor.",
    ),
    lede: P(
      "We have used Claude Code and Cursor daily for over a year. Some of what we tried made the team faster. Some of it made pull requests longer and reviews worse. This is the list of what stayed.",
      "Chúng tôi dùng Claude Code và Cursor hằng ngày hơn một năm. Một số thứ đã thử giúp team nhanh hơn. Một số thứ làm pull request dài hơn và review tệ hơn. Đây là những gì còn dùng đến giờ.",
    ),
    topic: P("AI-assisted dev", "Lập trình với AI"), read: P("7 min", "7 phút"),
    tags: ["ai", "tooling"],
  },
  {
    slug: "data-tables-that-survive-10k-rows", image: "/images/cover-data-tables.png", date: "2025",
    title: P("Data tables that survive 10k rows", "Bảng dữ liệu chịu được 10k dòng"),
    summary: P("Resize, freeze, group, tree, and still 60fps. What we learned building Bamboo’s grid.", "Resize, freeze, nhóm, cây, vẫn 60fps. Bài học từ grid của Bamboo."),
    lede: P(
      "Bamboo’s users live in tables: inventory, orders, traceability events, thousands of rows at a time. The grid we built handles column resize, freeze, reorder, grouping, tree rows and sticky headers, and stays at 60fps. These are the decisions that mattered.",
      "Người dùng Bamboo làm việc trong bảng cả ngày: kho, đơn hàng, sự kiện truy xuất, hàng nghìn dòng mỗi lần. Grid chúng tôi xây xử lý resize cột, freeze, sắp lại thứ tự, nhóm, dòng dạng cây và header dính, và vẫn giữ 60fps. Đây là những quyết định quan trọng nhất.",
    ),
    topic: P("Performance", "Hiệu năng"), read: P("9 min", "9 phút"),
    tags: ["performance", "frontend"],
  },
  {
    slug: "estimating-work-you-have-never-done", image: "/images/cover-estimating.png", date: "2024",
    title: P("Estimating work you have never done before", "Ước lượng việc chưa từng làm"),
    summary: P("How I size work nobody on the team has done, without padding everything 3×.", "Cách tôi ước lượng việc chưa ai trong team từng làm mà không nhân ba mọi thứ."),
    lede: P(
      "Most estimation advice assumes you have done something similar before. The hard estimates are for the things you have not: a new regulator integration, a first AI feature, a migration nobody on the team has attempted. Here is the method I use, and why it does not involve multiplying by three.",
      "Phần lớn lời khuyên về ước lượng đều ngầm cho rằng bạn đã làm việc tương tự rồi. Cái khó là ước lượng những việc chưa từng làm: tích hợp một cơ quan quản lý mới, tính năng AI đầu tiên, một lần migration chưa ai trong team làm. Đây là cách tôi làm, và vì sao tôi không nhân ba.",
    ),
    topic: P("Leadership", "Lãnh đạo"), read: P("5 min", "5 phút"),
    tags: ["leadership"],
  },
  {
    slug: "one-react-app-25-regulators", image: "/images/cover-25-regulators.png", date: "2025",
    title: P("One React app, 25 regulators", "Một app React, 25 cơ quan quản lý"),
    summary: P("Per-state polymorphism in Bamboo’s frontend without a 25-way switch.", "Đa hình theo bang trong frontend Bamboo mà không cần switch 25 nhánh."),
    lede: P(
      "Legal cannabis in the US is regulated state by state. Bamboo’s frontend serves operators in more than twenty-five of them, each with its own traceability system, field rules and workflow quirks, from a single React codebase. The trick was refusing to write a switch statement.",
      "Cannabis hợp pháp ở Mỹ được quản lý theo từng bang. Frontend của Bamboo phục vụ nhà vận hành tại hơn hai mươi lăm bang, mỗi bang có hệ truy xuất, quy tắc trường dữ liệu và những quirk quy trình riêng, từ một codebase React duy nhất. Mấu chốt là nhất quyết không viết câu switch.",
    ),
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
      "Specs are drafts. I sit with the product owner, work out what the business needs, then design for the next three changes.",
      "Spec chỉ là bản nháp. Tôi ngồi cùng product owner, tìm hiểu bên kinh doanh cần gì, rồi thiết kế cho cả ba lần thay đổi tiếp theo.",
    ),
  },
  {
    title: P("Build codebases that absorb change.", "Xây codebase chịu được thay đổi."),
    body: P(
      "Multi-tenant, white-label, per-state rules: the variation lives in the architecture, so features never have to fork.",
      "Multi-tenant, white-label, luật theo từng bang: phần khác biệt nằm trong kiến trúc, để tính năng không bao giờ phải fork.",
    ),
  },
  {
    title: P("Ship AI where it earns its place.", "Dùng AI ở chỗ nó thật sự có ích."),
    body: P(
      "Patient chatbots, AI-drafted SOAP notes, care recommendations, in production, under HIPAA, with the PHI boundaries drawn first.",
      "Chatbot cho bệnh nhân, SOAP notes do AI soạn, gợi ý chăm sóc, chạy trên production, theo HIPAA, ranh giới PHI xác định từ đầu.",
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
    body: P("Where an LLM can and cannot go when PHI is in the loop.", "Khi có PHI, LLM được dùng ở đâu và không được dùng ở đâu."),
    href: "/blog/ai-soap-notes-under-hipaa",
  },
  {
    icon: "cpu",
    title: P("Agentic workflows for small teams", "Quy trình agentic cho team nhỏ"),
    body: P(
      "Custom skills, usage policies and review habits that keep quality up with Claude Code and Cursor.",
      "Custom skill, chính sách sử dụng và thói quen review giúp giữ chất lượng khi dùng Claude Code và Cursor.",
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
      "I'm Do Nhat Quang, Quinn to most people, a senior full-stack developer and tech lead in Hanoi. For nine years I've built web platforms for companies in the US, the UK and Japan. I started as a frontend developer and became a tech lead along the way.",
      "Tôi là Đỗ Nhật Quang, mọi người gọi là Quinn, senior full-stack developer kiêm tech lead ở Hà Nội. Chín năm qua tôi xây nền tảng web cho các công ty Mỹ, Anh và Nhật. Tôi bắt đầu từ frontend, rồi dần chuyển sang làm tech lead.",
    ),
    P(
      "At Webprovise I lead engineering on Welle, a HIPAA-compliant healthcare platform: 180+ biomarkers, telehealth, an AI health coach, and a multi-tenant, white-label architecture that serves SaaS customers and per-client logic from one codebase. Before that I led the frontend of Bamboo, a cannabis commerce platform that satisfies regulators in 25+ US states.",
      "Ở Webprovise, tôi là tech lead của Welle, một nền tảng y tế theo chuẩn HIPAA: 180+ chỉ số sinh học, khám từ xa, AI health coach, và kiến trúc multi-tenant, white-label phục vụ khách SaaS lẫn logic riêng từng khách từ một codebase. Trước đó tôi lead frontend của Bamboo, nền tảng thương mại cannabis phải tuân theo cơ quan quản lý ở 25+ bang của Mỹ.",
    ),
    P(
      "Most of my time goes to three things: working out what a requirement means before it becomes tickets, keeping the codebase easy to change, and deciding where AI belongs in a product that handles patient data.",
      "Phần lớn thời gian của tôi dành cho ba việc: hiểu cho ra yêu cầu thật trước khi nó thành ticket, giữ codebase dễ sửa, và quyết định AI nên nằm ở đâu trong một sản phẩm có dữ liệu bệnh nhân.",
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
