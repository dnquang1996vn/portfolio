import type { Lang } from "./translations";

/**
 * Long-form article bodies, keyed by post slug (see posts in portfolio.ts).
 * Written as structured blocks so no markdown dependency is needed.
 */
export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "code"; lang: string; code: string };

export interface ArticleBody {
  lede: string;
  body: Block[];
}

export type Article = Record<Lang, ArticleBody>;

const tenantCode = `// Resolved once per request, then injected everywhere.
export interface TenantContext {
  id: string;
  brand: BrandConfig;          // colours, logo, legal name, support email
  features: FeatureFlags;      // what this tenant has turned on
  jurisdiction: StateRules[];  // pricing and legal rules per US state
}`;

const phiCode = `const { redacted, vault } = redactPhi(transcript, {
  identifiers: ["name", "dob", "address", "phone", "email", "memberId"],
});
const draft = await model.draftSoapNote(redacted, template);
const note  = rehydrate(draft, vault); // placeholders -> real values, in our boundary only`;

const gridCode = `// Two stores, two subscriptions. Resizing a column never touches the body.
const width = useLayoutStore(s => s.columns[colId].width);
const cell  = useDataStore(s => s.rows[rowIndex]?.[colId]);`;

const regulatorCode = `export interface RegulatorStrategy {
  buildTransfer(order: Order, rules: StateRules): TransferPayload;
  parseSyncError(err: RegulatorError): UserFacingIssue;
  tagFormat: RegExp;
}

const strategies: Record<RegulatorId, RegulatorStrategy> = { metrc, biotrack, ccrs };
export const useRegulator = () => strategies[useTenant().regulator];`;

export const articles: Record<string, Article> = {
  "multi-tenant-white-label-one-codebase": {
    en: {
      lede:
        "Welle runs as a SaaS product for some customers and as a heavily customised white-label deployment for others. Both ship from the same repository, on the same release train. Here is the shape that made that possible, and the two rules that keep it from rotting.",
      body: [
        { type: "h2", text: "The problem we were actually solving" },
        { type: "p", text: "When the first white-label client signed, the tempting move was a fork. Copy the codebase, swap the branding, add their custom intake flow, done. Forks are fast on day one and ruinous by month six: every bug fix lands twice, every dependency upgrade lands twice, and the two products drift until nobody can say which behaviour is the product and which is the client." },
        { type: "p", text: "So the constraint we set was blunt: one repository, one deployable artifact, one migration history. Per-client differences had to be data or configuration, never a branch." },
        { type: "h2", text: "Tenancy is a request property, not a build property" },
        { type: "p", text: "Every request resolves a tenant early, from the hostname first and from an explicit header in service-to-service calls. That tenant object travels through the request context and is the only way code is allowed to learn who it is serving. Nothing reads an environment variable to decide client behaviour." },
        { type: "code", lang: "ts", code: tenantCode },
        { type: "p", text: "Data isolation is enforced at the repository layer. Every query builder is created from the tenant context and appends the tenant filter itself, so a developer cannot forget it. We tried the “remember to add the where clause” approach first. We stopped after the second near miss in code review." },
        { type: "h2", text: "Custom logic without custom builds" },
        { type: "p", text: "Most client-specific behaviour is not exotic. It is a different intake questionnaire, a different set of lab panels, a different consent form, a different email cadence. All of that is content and configuration, versioned in the database and editable by the operations team without a deploy." },
        { type: "p", text: "For the genuinely custom pieces, we use a small set of named extension points: a hook that runs after a lab result is imported, a hook that decides which clinician a visit is routed to, a hook that can add line items at checkout. Each extension point has a default implementation and a registry keyed by tenant id. A client override is a class in the same repository, covered by the same tests, and it dies if the interface changes because the compiler says so." },
        { type: "ul", items: [
          "Extension points are few and named. If a new client needs a sixth, we ask whether the fifth should have been more general.",
          "Overrides may not import from each other. Client A must never depend on Client B’s code.",
          "Every override has a test that runs against the default fixtures. If the core contract changes, the client build breaks loudly in CI, not quietly in production.",
        ] },
        { type: "h2", text: "What it bought us" },
        { type: "p", text: "Features built for one client ship to all of them behind a flag. Security fixes land once. The white-label client that started as an exception is now just the tenant with the most configuration. The discipline cost a few weeks up front. The forks would have cost a team." },
      ],
    },
    vi: {
      lede:
        "Welle chạy dưới dạng SaaS cho một số khách hàng, và dưới dạng white-label tùy biến sâu cho những khách khác. Cả hai đều xuất phát từ cùng một repository, cùng một chu kỳ phát hành. Đây là cấu trúc giúp điều đó khả thi, và hai nguyên tắc giữ cho nó không mục rữa theo thời gian.",
      body: [
        { type: "h2", text: "Vấn đề thực sự cần giải" },
        { type: "p", text: "Khi khách white-label đầu tiên ký hợp đồng, cách làm hấp dẫn nhất là fork. Sao chép codebase, đổi thương hiệu, thêm luồng tiếp nhận riêng của họ, xong. Fork nhanh ở ngày đầu và tai hại ở tháng thứ sáu: mỗi bản sửa lỗi phải làm hai lần, mỗi lần nâng cấp dependency phải làm hai lần, và hai sản phẩm trôi xa nhau đến mức không ai còn nói được đâu là hành vi của sản phẩm, đâu là của khách." },
        { type: "p", text: "Vì vậy ràng buộc chúng tôi đặt ra rất thẳng: một repository, một artifact triển khai, một lịch sử migration. Khác biệt theo từng khách phải là dữ liệu hoặc cấu hình, không bao giờ là một nhánh code." },
        { type: "h2", text: "Tenant là thuộc tính của request, không phải của bản build" },
        { type: "p", text: "Mỗi request xác định tenant từ rất sớm: trước hết từ hostname, và từ một header tường minh trong các lời gọi giữa service. Đối tượng tenant đó đi theo request context và là cách duy nhất mà code được phép biết mình đang phục vụ ai. Không có chỗ nào đọc biến môi trường để quyết định hành vi theo khách." },
        { type: "code", lang: "ts", code: tenantCode },
        { type: "p", text: "Cách ly dữ liệu được ép ở tầng repository. Mọi query builder đều được tạo từ tenant context và tự thêm điều kiện lọc tenant, nên developer không thể quên. Ban đầu chúng tôi thử cách “nhớ thêm mệnh đề where”. Sau lần suýt lọt thứ hai trong code review thì dừng hẳn." },
        { type: "h2", text: "Logic riêng mà không cần bản build riêng" },
        { type: "p", text: "Phần lớn hành vi riêng của khách không hề lạ lùng. Đó là một bộ câu hỏi tiếp nhận khác, một bộ xét nghiệm khác, một mẫu đồng ý khác, một nhịp gửi email khác. Tất cả đều là nội dung và cấu hình, được version trong database và đội vận hành có thể sửa mà không cần deploy." },
        { type: "p", text: "Với những phần thực sự cần tùy biến, chúng tôi dùng một số ít điểm mở rộng có tên: một hook chạy sau khi nhập kết quả xét nghiệm, một hook quyết định lượt khám được chuyển tới bác sĩ nào, một hook có thể thêm dòng hàng khi thanh toán. Mỗi điểm mở rộng có một triển khai mặc định và một registry theo tenant id. Bản ghi đè cho khách là một class trong cùng repository, được cùng bộ test bao phủ, và sẽ hỏng ngay nếu interface đổi vì compiler báo lỗi." },
        { type: "ul", items: [
          "Điểm mở rộng ít và có tên. Nếu một khách mới cần điểm thứ sáu, chúng tôi tự hỏi liệu điểm thứ năm có nên tổng quát hơn không.",
          "Các bản ghi đè không được import nhau. Code của khách A không bao giờ được phụ thuộc vào khách B.",
          "Mỗi bản ghi đè có test chạy trên fixture mặc định. Nếu hợp đồng lõi thay đổi, bản build của khách hỏng to trong CI, không phải hỏng âm thầm trên production.",
        ] },
        { type: "h2", text: "Kết quả thu được" },
        { type: "p", text: "Tính năng xây cho một khách được phát hành cho tất cả, sau một feature flag. Bản vá bảo mật chỉ cần làm một lần. Khách white-label từng là ngoại lệ giờ chỉ là tenant có nhiều cấu hình nhất. Kỷ luật này tốn vài tuần ban đầu. Fork thì sẽ tốn cả một đội." },
      ],
    },
  },

  "ai-soap-notes-under-hipaa": {
    en: {
      lede:
        "Clinicians on Welle spend less time on documentation because a model drafts the SOAP note from the visit. Making that acceptable under HIPAA was less about the model and more about drawing a very clear line around where protected health information is allowed to travel.",
      body: [
        { type: "h2", text: "Start with the data flow, not the prompt" },
        { type: "p", text: "Before anyone wrote a prompt, we drew the diagram: which fields leave our boundary, to whom, under what agreement, and for how long they are retained. If a box on that diagram could not answer all four questions, it did not get PHI. That single exercise killed two vendor options and shaped the whole design." },
        { type: "p", text: "The provider we use is covered by a Business Associate Agreement, with zero data retention and no training on our inputs. That is table stakes. It does not remove the obligation to minimise what we send." },
        { type: "h2", text: "Minimise, then minimise again" },
        { type: "p", text: "The model does not need a name, a date of birth, an address or an insurance id to write a clinical note. So it never sees them. A pre-processing step replaces direct identifiers with stable placeholders before the request is built, and a post-processing step maps them back when the draft is stored. Free-text fields go through a scrubbing pass as well, because patients say their own names in visit transcripts more often than you would think." },
        { type: "code", lang: "ts", code: phiCode },
        { type: "h2", text: "The clinician owns the note" },
        { type: "p", text: "A draft is a draft. It is stored as unsigned, shown with the source transcript beside it, and cannot be filed without a clinician reviewing and signing. Every edit between draft and signature is recorded. That audit trail is what allows us to say, truthfully, that AI assisted the note and a licensed human authored it." },
        { type: "ul", items: [
          "Drafts are stored encrypted with the same key hierarchy as the rest of the chart, not in a side table with weaker controls.",
          "Access to the draft is gated by the same role checks as the visit itself.",
          "The prompt template is versioned, and each note records which version produced it.",
        ] },
        { type: "h2", text: "What we deliberately did not do" },
        { type: "p", text: "No fine-tuning on patient data. No retrieval over other patients’ charts to “improve” a note. No autonomous filing, even for low-risk visit types. Each of those would have made the compliance story a paragraph longer and the trust story a paragraph shorter. The feature is popular with clinicians precisely because it is boring where it needs to be." },
      ],
    },
    vi: {
      lede:
        "Bác sĩ trên Welle tốn ít thời gian ghi chép hơn vì một mô hình soạn bản nháp SOAP note từ buổi khám. Để điều đó chấp nhận được dưới HIPAA, việc quan trọng không nằm ở mô hình mà ở việc vẽ một ranh giới rất rõ: thông tin sức khỏe được bảo vệ (PHI) được phép đi đến đâu.",
      body: [
        { type: "h2", text: "Bắt đầu từ luồng dữ liệu, không phải từ prompt" },
        { type: "p", text: "Trước khi ai đó viết prompt, chúng tôi vẽ sơ đồ: trường nào rời khỏi ranh giới của mình, đi tới ai, theo thỏa thuận nào, và được lưu bao lâu. Nếu một ô trên sơ đồ không trả lời được cả bốn câu hỏi, ô đó không nhận PHI. Chỉ riêng bài tập này đã loại hai nhà cung cấp và định hình toàn bộ thiết kế." },
        { type: "p", text: "Nhà cung cấp chúng tôi dùng có Business Associate Agreement, không lưu dữ liệu và không huấn luyện trên dữ liệu đầu vào của chúng tôi. Đó là điều kiện tối thiểu. Nó không xóa bỏ nghĩa vụ phải giảm thiểu những gì mình gửi đi." },
        { type: "h2", text: "Giảm thiểu, rồi giảm thiểu thêm lần nữa" },
        { type: "p", text: "Mô hình không cần tên, ngày sinh, địa chỉ hay mã bảo hiểm để viết một ghi chú lâm sàng. Nên nó không bao giờ thấy chúng. Một bước tiền xử lý thay các định danh trực tiếp bằng placeholder ổn định trước khi tạo request, và một bước hậu xử lý ánh xạ ngược khi lưu bản nháp. Các trường văn bản tự do cũng đi qua một lượt làm sạch, vì bệnh nhân tự nói tên mình trong bản ghi buổi khám nhiều hơn bạn tưởng." },
        { type: "code", lang: "ts", code: phiCode },
        { type: "h2", text: "Bác sĩ là chủ của ghi chú" },
        { type: "p", text: "Bản nháp chỉ là bản nháp. Nó được lưu ở trạng thái chưa ký, hiển thị cạnh bản ghi nguồn, và không thể được lưu hồ sơ nếu bác sĩ chưa xem lại và ký. Mọi chỉnh sửa giữa bản nháp và chữ ký đều được ghi lại. Chính dấu vết kiểm toán đó cho phép chúng tôi nói một cách trung thực: AI hỗ trợ ghi chú, và một người có giấy phép hành nghề là tác giả." },
        { type: "ul", items: [
          "Bản nháp được mã hóa với cùng hệ thống khóa như phần còn lại của hồ sơ, không nằm ở một bảng phụ với kiểm soát lỏng hơn.",
          "Quyền truy cập bản nháp đi qua đúng các kiểm tra vai trò như chính buổi khám.",
          "Mẫu prompt được version, và mỗi ghi chú lưu lại phiên bản nào đã tạo ra nó.",
        ] },
        { type: "h2", text: "Những gì chúng tôi cố tình không làm" },
        { type: "p", text: "Không fine-tune trên dữ liệu bệnh nhân. Không truy xuất hồ sơ của bệnh nhân khác để “cải thiện” ghi chú. Không tự động lưu hồ sơ, kể cả với loại khám rủi ro thấp. Mỗi điều trong số đó sẽ làm câu chuyện tuân thủ dài thêm một đoạn và câu chuyện niềm tin ngắn đi một đoạn. Tính năng được bác sĩ ưa dùng chính vì nó nhàm chán đúng ở những chỗ cần nhàm chán." },
      ],
    },
  },

  "agentic-workflows-small-team": {
    en: {
      lede:
        "We have used Claude Code and Cursor daily for over a year. Some of what we tried made the team faster. Some of it made pull requests longer and reviews worse. This is the honest list of what stayed.",
      body: [
        { type: "h2", text: "What stuck" },
        { type: "ol", items: [
          "Custom skills for our own conventions. A skill that knows how we structure a NestJS module, how we name migrations and how we write a Jira description removes an entire class of “please follow the pattern” review comments.",
          "Agents for the well-specified and boring. Rename across a codebase, add a field end to end, write the first draft of tests for an existing function. Anything where the spec fits in three sentences and the result is easy to verify.",
          "Plan first on anything non-trivial. Ask for the plan, read it, correct it, then let it build. Ten minutes on the plan saves an hour of undoing a confident wrong turn.",
          "Review the diff as if a new hire wrote it. Because in effect one did: fast, well read, and with no memory of last month’s incident.",
        ] },
        { type: "h2", text: "What did not" },
        { type: "ul", items: [
          "Letting agents open pull requests unattended. Volume went up, signal went down, and reviewers started skimming. We reverted to one human owner per PR who is accountable for every line in it.",
          "Prompting for whole features from a one-line ticket. The output looked complete and hid three wrong assumptions each time.",
          "Agent-written tests as the only tests. They confirm the code does what the code does. A human still has to decide what it should do.",
        ] },
        { type: "h2", text: "The usage policy that made it safe" },
        { type: "p", text: "We wrote a one-page policy and pinned it. Nothing in it is clever. It is the boring rules that let us hand a healthcare codebase to a tool without losing sleep." },
        { type: "quote", text: "No production credentials, no customer data, no PHI in any prompt or context. If you would not paste it into a public chat, do not paste it into an agent." },
        { type: "ul", items: [
          "Agents work on a branch, never on main. Every change lands through the normal review path.",
          "Generated code is held to the same lint, type and test gates as human code. There is no “it was the AI” exemption.",
          "The person who merges is responsible. Tools do not carry blame.",
        ] },
        { type: "h2", text: "The net effect" },
        { type: "p", text: "Less time on boilerplate and migrations, more time on the parts that need judgement: data models, security boundaries, the conversation with the stakeholder about what they actually meant. The team did not get bigger. Its attention got better spent." },
      ],
    },
    vi: {
      lede:
        "Chúng tôi dùng Claude Code và Cursor hằng ngày hơn một năm. Một số thứ đã thử giúp đội nhanh hơn. Một số thứ làm pull request dài hơn và review tệ hơn. Đây là danh sách trung thực về những gì còn ở lại.",
      body: [
        { type: "h2", text: "Những gì ở lại" },
        { type: "ol", items: [
          "Skill tùy biến cho quy ước riêng của đội. Một skill biết chúng tôi tổ chức module NestJS thế nào, đặt tên migration thế nào và viết mô tả Jira thế nào sẽ xóa sổ cả một lớp nhận xét review kiểu “vui lòng theo đúng pattern”.",
          "Agent cho những việc rõ đặc tả và nhàm chán. Đổi tên xuyên codebase, thêm một trường từ đầu đến cuối, viết bản nháp test đầu tiên cho một hàm sẵn có. Bất cứ việc gì mà đặc tả gọn trong ba câu và kết quả dễ kiểm chứng.",
          "Lên kế hoạch trước với mọi việc không tầm thường. Yêu cầu kế hoạch, đọc, sửa, rồi mới cho nó xây. Mười phút cho kế hoạch tiết kiệm một giờ gỡ một ngã rẽ sai đầy tự tin.",
          "Review diff như thể một người mới viết. Vì thực chất đúng là vậy: nhanh, đọc nhiều, và không nhớ gì về sự cố tháng trước.",
        ] },
        { type: "h2", text: "Những gì không ở lại" },
        { type: "ul", items: [
          "Để agent tự mở pull request không giám sát. Số lượng tăng, chất lượng tín hiệu giảm, reviewer bắt đầu đọc lướt. Chúng tôi quay về một người chủ cho mỗi PR, chịu trách nhiệm cho từng dòng trong đó.",
          "Prompt cả tính năng từ một ticket một dòng. Kết quả trông hoàn chỉnh và lần nào cũng giấu ba giả định sai.",
          "Test do agent viết là bộ test duy nhất. Chúng xác nhận code làm đúng những gì code đang làm. Con người vẫn phải quyết định nó nên làm gì.",
        ] },
        { type: "h2", text: "Chính sách sử dụng giúp mọi thứ an toàn" },
        { type: "p", text: "Chúng tôi viết một chính sách dài một trang và ghim lại. Không có gì thông minh trong đó. Chính những quy tắc nhàm chán ấy cho phép giao một codebase y tế cho công cụ mà không mất ngủ." },
        { type: "quote", text: "Không thông tin đăng nhập production, không dữ liệu khách hàng, không PHI trong bất kỳ prompt hay context nào. Nếu bạn không dán nó vào một cuộc chat công khai, đừng dán nó vào agent." },
        { type: "ul", items: [
          "Agent làm việc trên nhánh, không bao giờ trên main. Mọi thay đổi đi qua đường review bình thường.",
          "Code sinh ra chịu cùng cửa kiểm lint, type và test như code của người. Không có ngoại lệ “tại AI làm”.",
          "Người merge là người chịu trách nhiệm. Công cụ không gánh lỗi.",
        ] },
        { type: "h2", text: "Hiệu quả thực" },
        { type: "p", text: "Ít thời gian hơn cho boilerplate và migration, nhiều thời gian hơn cho những phần cần phán đoán: mô hình dữ liệu, ranh giới bảo mật, cuộc trò chuyện với stakeholder về điều họ thực sự muốn nói. Đội không lớn hơn. Sự chú ý của đội được dùng đúng chỗ hơn." },
      ],
    },
  },

  "data-tables-that-survive-10k-rows": {
    en: {
      lede:
        "Bamboo’s users live in tables: inventory, orders, traceability events, thousands of rows at a time. The grid we built handles column resize, freeze, reorder, grouping, tree rows and sticky headers, and stays at 60fps. These are the decisions that mattered.",
      body: [
        { type: "h2", text: "Virtualise rows, and only rows" },
        { type: "p", text: "The first version virtualised rows and columns. Column virtualisation bought little on real screens, broke horizontal scroll smoothness, and made sticky columns a nightmare. We removed it. Row virtualisation alone, with a fixed row height and a small overscan, took the DOM from ten thousand rows to about forty and solved most of the performance problem in one move." },
        { type: "h2", text: "Separate layout state from data state" },
        { type: "p", text: "Column widths, order, pinning and visibility are user preferences. Row data, sorting and grouping are query state. Mixing them in one store meant that dragging a column boundary re-rendered every cell. Splitting them, with the layout store subscribed only by headers and the cell renderer subscribed only by data, made resize a header-only operation." },
        { type: "code", lang: "ts", code: gridCode },
        { type: "h2", text: "Freeze and reorder with CSS, not maths" },
        { type: "p", text: "Frozen columns use position: sticky with a computed left offset per pinned column. Reorder is a change to the column order array; the grid re-renders headers and the visible forty rows. We never move DOM nodes around by hand, and there is no absolute positioning anywhere in the table body." },
        { type: "h2", text: "Grouping and trees are the same feature" },
        { type: "p", text: "A grouped table is a tree with generated parent rows. Once we modelled both as a flat list of visible rows with a depth and an expanded flag, the renderer stopped caring which one it was drawing. Expanding a node inserts its children into the flat list; the virtualiser does the rest." },
        { type: "ul", items: [
          "Cell renderers are pure and memoised on (row, column). Formatting is done once per visible cell, not once per keystroke in the filter box.",
          "Filters run in a worker when the row count crosses a threshold, so typing never blocks the frame.",
          "Every interaction is measured in CI with a synthetic ten-thousand-row dataset. A regression fails the build before a user feels it.",
        ] },
        { type: "h2", text: "Why it is still the most reused component" },
        { type: "p", text: "Because it is boring to use. A team declares columns, points it at data, and gets resize, freeze, group and tree for free. Years later the same component sits in Portal, Trace and Sales with one design language, and new features still land in one place." },
      ],
    },
    vi: {
      lede:
        "Người dùng Bamboo sống trong các bảng: kho, đơn hàng, sự kiện truy xuất, hàng nghìn dòng mỗi lần. Grid chúng tôi xây xử lý resize cột, freeze, sắp lại thứ tự, nhóm, dòng dạng cây và header dính, và vẫn giữ 60fps. Đây là những quyết định quan trọng nhất.",
      body: [
        { type: "h2", text: "Ảo hóa dòng, và chỉ dòng" },
        { type: "p", text: "Phiên bản đầu ảo hóa cả dòng và cột. Ảo hóa cột đem lại rất ít trên màn hình thực, phá độ mượt của cuộn ngang, và biến cột dính thành ác mộng. Chúng tôi bỏ nó. Chỉ ảo hóa dòng, với chiều cao dòng cố định và một chút overscan, đã đưa DOM từ mười nghìn dòng xuống khoảng bốn mươi và giải quyết phần lớn vấn đề hiệu năng trong một bước." },
        { type: "h2", text: "Tách trạng thái bố cục khỏi trạng thái dữ liệu" },
        { type: "p", text: "Độ rộng, thứ tự, ghim và ẩn hiện cột là sở thích người dùng. Dữ liệu dòng, sắp xếp và nhóm là trạng thái truy vấn. Trộn chúng vào một store nghĩa là kéo một mép cột sẽ render lại mọi ô. Tách ra, với store bố cục chỉ được header subscribe và renderer ô chỉ subscribe dữ liệu, biến resize thành thao tác chỉ chạm tới header." },
        { type: "code", lang: "ts", code: gridCode },
        { type: "h2", text: "Freeze và sắp lại bằng CSS, không phải bằng toán" },
        { type: "p", text: "Cột đóng băng dùng position: sticky với offset trái tính sẵn cho từng cột ghim. Sắp lại thứ tự là thay đổi mảng thứ tự cột; grid render lại header và bốn mươi dòng đang hiện. Chúng tôi không bao giờ tự tay di chuyển node DOM, và không có absolute positioning ở bất kỳ đâu trong thân bảng." },
        { type: "h2", text: "Nhóm và cây là cùng một tính năng" },
        { type: "p", text: "Một bảng được nhóm là một cây với các dòng cha được sinh ra. Khi đã mô hình hóa cả hai thành một danh sách phẳng các dòng đang hiện, kèm độ sâu và cờ mở rộng, renderer không còn quan tâm mình đang vẽ cái nào. Mở một node là chèn các con của nó vào danh sách phẳng; phần còn lại do bộ ảo hóa lo." },
        { type: "ul", items: [
          "Renderer ô là hàm thuần và được memo theo (dòng, cột). Định dạng làm một lần cho mỗi ô đang hiện, không phải mỗi lần gõ phím trong ô lọc.",
          "Bộ lọc chạy trong worker khi số dòng vượt ngưỡng, nên việc gõ không bao giờ chặn khung hình.",
          "Mọi tương tác được đo trong CI với bộ dữ liệu tổng hợp mười nghìn dòng. Một hồi quy làm hỏng build trước khi người dùng cảm nhận được.",
        ] },
        { type: "h2", text: "Vì sao nó vẫn là component được tái sử dụng nhiều nhất" },
        { type: "p", text: "Vì dùng nó rất nhàm chán. Một đội khai báo cột, trỏ vào dữ liệu, và có resize, freeze, nhóm và cây miễn phí. Nhiều năm sau cùng component ấy nằm trong Portal, Trace và Sales với một ngôn ngữ thiết kế, và tính năng mới vẫn chỉ cần thêm ở một chỗ." },
      ],
    },
  },

  "estimating-work-you-have-never-done": {
    en: {
      lede:
        "Most estimation advice assumes you have done something similar before. The hard estimates are for the things you have not: a new regulator integration, a first AI feature, a migration nobody on the team has attempted. Here is the method I use, and why it does not involve multiplying by three.",
      body: [
        { type: "h2", text: "Split the unknown from the known" },
        { type: "p", text: "Every scary task is mostly ordinary work wrapped around a small core of real uncertainty. Building a state regulator integration is forms, validation, persistence, retries and UI, all of which we have done, plus one genuinely unknown piece: how that regulator’s API actually behaves. Estimate the ordinary parts normally. Isolate the unknown." },
        { type: "h2", text: "Buy information before you buy a number" },
        { type: "p", text: "For the unknown core, do not estimate yet. Time-box a spike, usually half a day to two days, with one question to answer. Can we authenticate and submit one record? Does the model give usable output on our real data? The output of a spike is not code. It is an estimate you can defend." },
        { type: "quote", text: "An estimate given before the spike is a guess with a number attached. The same estimate after the spike is a plan." },
        { type: "h2", text: "Give a range and name the risk" },
        { type: "p", text: "A single number hides everything useful. “Two to four weeks, and the difference is whether their sandbox matches production” tells the stakeholder what could go wrong and what would resolve it. Ranges also stop the game where the optimistic number becomes the commitment." },
        { type: "ul", items: [
          "The low end assumes the spike’s findings hold and nothing else surprises us.",
          "The high end assumes one named risk materialises. If you cannot name it, you have not finished the spike.",
          "Anything beyond the high end is a new conversation, not a missed estimate.",
        ] },
        { type: "h2", text: "Why not just pad it" },
        { type: "p", text: "Padding everything by a factor hides the unknowns from the people who need to see them and trains stakeholders to discount every number you give. It also pads the work you understand perfectly well, which is most of it. Padding buys comfort. Spikes buy knowledge. Only one of those makes the next estimate better." },
        { type: "h2", text: "Re-estimate on purpose" },
        { type: "p", text: "When the unknown becomes known, say so and update the range, in writing, to the same people who got the original. Nobody minds an estimate that narrows. They mind an estimate that was quietly wrong for six weeks." },
      ],
    },
    vi: {
      lede:
        "Hầu hết lời khuyên về ước lượng giả định bạn đã làm việc tương tự trước đó. Những ước lượng khó là cho việc chưa từng làm: tích hợp một cơ quan quản lý mới, tính năng AI đầu tiên, một cuộc migration chưa ai trong đội thử. Đây là phương pháp tôi dùng, và vì sao nó không liên quan đến việc nhân ba.",
      body: [
        { type: "h2", text: "Tách phần chưa biết khỏi phần đã biết" },
        { type: "p", text: "Mọi nhiệm vụ đáng sợ phần lớn là việc bình thường bao quanh một lõi nhỏ thực sự bất định. Xây tích hợp với cơ quan quản lý bang là form, validation, lưu trữ, retry và UI, tất cả đều đã làm, cộng một phần thực sự chưa biết: API của cơ quan đó hành xử thế nào. Ước lượng phần bình thường như thường lệ. Cô lập phần chưa biết." },
        { type: "h2", text: "Mua thông tin trước khi mua con số" },
        { type: "p", text: "Với lõi chưa biết, đừng ước lượng vội. Đóng khung thời gian một spike, thường nửa ngày đến hai ngày, với một câu hỏi cần trả lời. Có xác thực và gửi được một bản ghi không? Mô hình có cho đầu ra dùng được trên dữ liệu thật của mình không? Đầu ra của spike không phải code. Nó là một ước lượng bạn có thể bảo vệ." },
        { type: "quote", text: "Ước lượng đưa ra trước spike là một phỏng đoán gắn thêm con số. Cũng ước lượng ấy sau spike là một kế hoạch." },
        { type: "h2", text: "Đưa ra khoảng và gọi tên rủi ro" },
        { type: "p", text: "Một con số duy nhất che giấu mọi thứ hữu ích. “Hai đến bốn tuần, và khác biệt nằm ở việc sandbox của họ có giống production hay không” cho stakeholder biết điều gì có thể sai và điều gì sẽ giải quyết nó. Khoảng cũng chấm dứt trò chơi mà con số lạc quan trở thành cam kết." },
        { type: "ul", items: [
          "Mức thấp giả định kết quả spike đúng và không có gì khác gây bất ngờ.",
          "Mức cao giả định một rủi ro đã được gọi tên xảy ra. Nếu bạn không gọi tên được, bạn chưa làm xong spike.",
          "Vượt quá mức cao là một cuộc trò chuyện mới, không phải một ước lượng bị trượt.",
        ] },
        { type: "h2", text: "Vì sao không đơn giản là cộng đệm" },
        { type: "p", text: "Nhân mọi thứ với một hệ số che giấu những điều chưa biết khỏi những người cần thấy chúng, và dạy stakeholder chiết khấu mọi con số bạn đưa ra. Nó cũng đệm cả phần việc bạn hiểu rất rõ, vốn là phần lớn. Đệm mua sự thoải mái. Spike mua kiến thức. Chỉ một trong hai giúp ước lượng lần sau tốt hơn." },
        { type: "h2", text: "Ước lượng lại một cách chủ đích" },
        { type: "p", text: "Khi điều chưa biết trở thành đã biết, hãy nói ra và cập nhật khoảng, bằng văn bản, cho đúng những người đã nhận bản đầu. Không ai khó chịu với một ước lượng thu hẹp lại. Họ khó chịu với một ước lượng sai âm thầm suốt sáu tuần." },
      ],
    },
  },

  "one-react-app-25-regulators": {
    en: {
      lede:
        "Legal cannabis in the US is regulated state by state. Bamboo’s frontend serves operators in more than twenty-five of them, each with its own traceability system, field rules and workflow quirks, from a single React codebase. The trick was refusing to write a switch statement.",
      body: [
        { type: "h2", text: "The shape of the variation" },
        { type: "p", text: "Three traceability regulators dominate: Metrc, BioTrack and CCRS. Each has its own identifiers, its own required fields on a transfer, its own rules about what can be edited after submission. On top of that, individual states layer their own constraints even when they share a regulator. The variation is real, but it is not random. It clusters." },
        { type: "h2", text: "Rules as data, behaviour as strategy" },
        { type: "p", text: "We split the variation into two kinds. Declarative differences, such as which fields are required, which are read-only after submission and what a valid tag looks like, live in a per-state rule set that the backend serves and the frontend applies generically. Behavioural differences, such as how a transfer manifest is assembled or how a sync error is interpreted, live in regulator strategy modules that implement one shared interface." },
        { type: "code", lang: "ts", code: regulatorCode },
        { type: "p", text: "A screen never asks “which state am I in”. It asks the rule set whether a field is required and asks the strategy to build a payload. Adding a state that uses an existing regulator is a data change. Adding a new regulator is one new module against a known interface." },
        { type: "h2", text: "Components that read rules instead of props" },
        { type: "p", text: "Form fields subscribe to the rule set for their own path. A field renders itself as required, optional, hidden or locked based on the rules in context, so the same transfer form component serves every state without a single conditional in its JSX. The rule set is also what the test suite iterates over: one form component, twenty-five rule fixtures, one set of assertions." },
        { type: "ul", items: [
          "Rule sets are versioned. A regulator change ships as a new rule version with an effective date, not as a code deploy at midnight.",
          "Strategy modules are forbidden from importing UI. They produce data and issues; components decide how to show them.",
          "Every strategy has a contract test against recorded regulator responses, so an upstream API change breaks CI before it breaks an operator’s day.",
        ] },
        { type: "h2", text: "What it avoided" },
        { type: "p", text: "There is no twenty-five-way switch anywhere in the codebase, and no per-state component folder. When a new state opened, the frontend work was measured in hours. That is the difference between polymorphism and conditionals: one grows linearly with the interface, the other grows with the number of customers." },
      ],
    },
    vi: {
      lede:
        "Cannabis hợp pháp ở Mỹ được quản lý theo từng bang. Frontend của Bamboo phục vụ nhà vận hành tại hơn hai mươi lăm bang, mỗi bang có hệ truy xuất, quy tắc trường dữ liệu và những quirk quy trình riêng, từ một codebase React duy nhất. Bí quyết là từ chối viết một câu lệnh switch.",
      body: [
        { type: "h2", text: "Hình dạng của sự khác biệt" },
        { type: "p", text: "Ba hệ truy xuất chiếm ưu thế: Metrc, BioTrack và CCRS. Mỗi hệ có định danh riêng, trường bắt buộc riêng trên một lệnh chuyển, quy tắc riêng về những gì được sửa sau khi gửi. Trên đó, từng bang lại chồng thêm ràng buộc của mình dù dùng chung một hệ. Khác biệt là thật, nhưng không ngẫu nhiên. Nó phân cụm." },
        { type: "h2", text: "Quy tắc là dữ liệu, hành vi là strategy" },
        { type: "p", text: "Chúng tôi chia khác biệt thành hai loại. Khác biệt khai báo, như trường nào bắt buộc, trường nào chỉ đọc sau khi gửi và một tag hợp lệ trông thế nào, nằm trong bộ quy tắc theo bang mà backend cung cấp và frontend áp dụng một cách tổng quát. Khác biệt hành vi, như cách lắp ráp manifest chuyển hàng hay cách diễn giải lỗi đồng bộ, nằm trong các module strategy theo cơ quan quản lý, cùng triển khai một interface chung." },
        { type: "code", lang: "ts", code: regulatorCode },
        { type: "p", text: "Một màn hình không bao giờ hỏi “tôi đang ở bang nào”. Nó hỏi bộ quy tắc xem một trường có bắt buộc không và nhờ strategy tạo payload. Thêm một bang dùng hệ sẵn có là thay đổi dữ liệu. Thêm một hệ mới là một module mới theo interface đã biết." },
        { type: "h2", text: "Component đọc quy tắc thay vì đọc props" },
        { type: "p", text: "Trường form subscribe bộ quy tắc theo đúng đường dẫn của mình. Một trường tự render là bắt buộc, tùy chọn, ẩn hay khóa dựa trên quy tắc trong context, nên cùng một component form chuyển hàng phục vụ mọi bang mà không có một điều kiện nào trong JSX. Bộ quy tắc cũng là thứ bộ test lặp qua: một component form, hai mươi lăm fixture quy tắc, một bộ khẳng định." },
        { type: "ul", items: [
          "Bộ quy tắc được version. Thay đổi từ cơ quan quản lý được phát hành như một phiên bản quy tắc mới có ngày hiệu lực, không phải một lần deploy code lúc nửa đêm.",
          "Module strategy bị cấm import UI. Chúng tạo ra dữ liệu và vấn đề; component quyết định cách hiển thị.",
          "Mỗi strategy có contract test trên phản hồi thật đã ghi lại của cơ quan quản lý, nên thay đổi API phía trên làm hỏng CI trước khi làm hỏng một ngày làm việc của nhà vận hành.",
        ] },
        { type: "h2", text: "Điều đã tránh được" },
        { type: "p", text: "Không có switch hai mươi lăm nhánh ở bất kỳ đâu trong codebase, và không có thư mục component theo bang. Khi một bang mới mở cửa, công việc frontend tính bằng giờ. Đó là khác biệt giữa đa hình và điều kiện: một bên tăng tuyến tính theo interface, bên kia tăng theo số khách hàng." },
      ],
    },
  },
};
