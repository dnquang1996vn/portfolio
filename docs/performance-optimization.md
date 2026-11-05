# Tối ưu performance portfolio (11/2026)

Ghi lại những gì đã làm trong PR #11 và #12: lý do, số đo, và những hướng đã thử nhưng bỏ.
Số liệu đo bằng Lighthouse 12.8.2 (mobile, simulated throttling) trên `next build && next start`,
trừ khi ghi là production.

## Kết quả

| | Trước | Sau |
|---|---|---|
| Mobile perf (local, `/en`) | 83 | 90–91 |
| Mobile LCP (local) | 4.5 s | 3.6 s |
| Mobile FCP (local) | 1.4 s | 1.0–1.1 s |
| TBT (production, báo cáo ban đầu) | 420 ms | 20–70 ms |
| Accessibility | 96 | 100 |
| JS lần tải đầu (gzip) | ~167 KB | 150 KB |
| HTML trang chủ (gzip) | 45 KB | 18 KB |
| PageSpeed Insights `/vi` mobile | — | 94 |
| Desktop `/en`, `/vi` | — | 100 |

## 1. LCP: để phần tử LCP được paint ngay từ HTML server

Phần tử LCP trên mobile là **chữ H1**, không phải ảnh. Nó chỉ được tính sau khi hydrate vì ba lý do:

- **Typewriter làm H1 thay đổi liên tục.** Server render từ được gõ là chuỗi rỗng. Sau hydrate, mỗi lần gõ thêm một ký tự lại làm Chrome ghi nhận H1 là LCP mới.
  - Server render sẵn từ đầu tiên (`useTypewriter` khởi tạo bằng `words[0]`, giữ 1600ms rồi mới xoá).
  - `<em>` chứa chữ gõ có `display: inline-block`, nên nó là một block riêng. Gõ chữ chỉ repaint block đó, không đụng tới H1.
- **`useReveal` ẩn lại (opacity 0) chữ hero đã có sẵn trong HTML**, rồi mới fade-in. Đã bỏ chữ hero khỏi JS reveal, chỉ còn ảnh.
- **`.page-enter` bắt đầu từ `opacity: 0`.** Chrome không tính phần tử opacity 0 là đã paint. Lần tải đầu giờ chỉ trượt lên (`page-rise`, chỉ transform). Hiệu ứng fade chỉ chạy khi điều hướng phía client (`html[data-navigated]`).

> Bài học: **đừng để nội dung trong màn hình đầu tiên khởi đầu bằng opacity 0**, và đừng thay đổi text của phần tử LCP sau khi hydrate.
> Trên desktop, Lighthouse dùng observed LCP: khi nó bằng FCP (~85ms) là đã đúng hướng.

## 2. Ảnh

- **`sizes` khớp với kích thước hiển thị thật.** Hero dùng `316px` (khung polaroid tối đa 340px trừ padding). Ảnh project dùng `(max-width: 860px) calc(100vw - 88px), 500px`.
- **Ảnh LCP:** `loading="eager"` + `fetchPriority="high"`.
  - Ở Next 16, `priority` đã bị thay bằng `preload`, và `preload` **không** tự gắn `fetchpriority="high"`. Chỉ dùng `preload` thì ảnh vẫn ở priority Low.
  - Docs Next 16 khuyên dùng `loading="eager"` / `fetchPriority="high"` thay vì `preload`.
- **Không preload cả 2 logo** sáng/tối trên nav (một cái luôn bị ẩn).
- Các chỗ còn dùng `priority` được đổi sang `preload` (prop cũ đã deprecated).

## 3. Font

- **`subsets` của `next/font` chỉ quyết định file nào được preload.** Mọi subset vẫn nằm trong CSS và được tải theo `unicode-range` khi trang cần.
  - Chỉ preload `latin`, để font không tranh băng thông với ảnh hero.
- **Archivo là variable font:** 5 weight dùng chung một file 35KB. Bớt weight không giảm được byte nào. Font nặng nhất là Newsreader (normal 58KB, italic 64KB).
- **Tiếng Việt cần thêm khoảng 8 file font (~166KB).** Các ký tự ă, đ, ơ, ư nằm trong subset `latin-ext`, còn ạ, ế… nằm trong `vietnamese`. Lighthouse local cho `/vi` khoảng 80 điểm, nhưng PageSpeed Insights cho 94, nên quyết định **không tối ưu thêm**.
- Tắt preload font mono đã thử, nhưng làm FCP chậm từ 1.0s lên 1.2s, nên đã bỏ.

## 4. CSS: tắt `experimental.inlineCss`

- PR #11 bật `inlineCss` để loại bỏ các request CSS chặn render. Đo riêng thì nó **làm chậm hơn**: CSS bị lặp, một lần trong `<style>` và **hai lần nữa trong RSC payload**.
- Hệ quả: HTML trang chủ 267KB raw / 45KB gzip. Tắt đi chỉ còn 53KB / 11KB, và điểm tăng từ 90 lên 91 (LCP 3.7s xuống 3.5s).
- Đã tắt trong PR #12. Phần CSS chặn render (~10KB) có tác động nhỏ hơn nhiều so với HTML phình to.

## 5. i18n theo route + server components (next-intl)

**Vấn đề:**
- Ngôn ngữ trước đây nằm ở localStorage, nên server luôn render tiếng Anh. Khách tiếng Việt thấy trang đổi từ tiếng Anh sang tiếng Việt sau khi hydrate. Lần render lại này khiến TBT lên 420ms trong báo cáo ban đầu.
- 32 client component import `portfolio.ts` cùng translations của cả 2 ngôn ngữ, gửi khoảng 17KB gzip xuống trình duyệt ở mọi trang.

**Cách làm:**
- **`app/[locale]/` với `/en` và `/vi`**, kèm `generateStaticParams`, nên mỗi ngôn ngữ vẫn được prerender tĩnh.
- **`proxy.ts`** (middleware của next-intl) redirect `/` và link cũ theo thứ tự: cookie `NEXT_LOCALE` (giữ 1 năm), rồi `Accept-Language`, cuối cùng là `en`.
- **`i18n/request.ts` đọc locale bằng `next/root-params`**, không dùng `headers()`, nên trang không bị chuyển sang dynamic khi bật `cacheComponents`.
- **Component chỉ hiển thị chuyển sang server component**, dùng `getTranslations()` / `getLocale()`.
- **Component có tương tác giữ ở client** nhưng nhận chuỗi đã dịch qua props (`getLabels` dùng `t.raw`), và nhận nội dung đã chọn sẵn một ngôn ngữ.
- **Link dùng `next/link` với href đã gắn locale** (`localePath`, và component `i18n/Link` cho server).
- **SEO:** `hreflang` có URL tuyệt đối (qua `metadataBase`), `<html lang>` đúng từ server, tiêu đề bài viết theo ngôn ngữ. RSS giữ guid cũ để feed reader không coi mọi bài là mới.

> Bẫy: `IntlProvider` của use-intl luôn import bộ message formatter (~12–20KB gzip). `Link`, `usePathname` và `useLocale` phía client của next-intl đều cần provider này. Tức là **cứ dùng next-intl ở client là mất ~20KB gzip**, kể cả khi không dịch gì ở client. Giải pháp: chỉ dùng next-intl ở server (proxy, request config, `getTranslations`).

**Kết quả:** JS client giảm từ ~167KB xuống 150KB gzip; nội dung, translations và formatter đều không còn trong bundle. HTML lớn hơn bản không inline CSS (18KB so với 11KB gzip), vì chữ do server component render nằm trong cả HTML lẫn RSC payload. Đổi lại, khách tiếng Việt nhận đúng tiếng Việt ngay từ lần paint đầu.

## 6. Accessibility

- **Chữ "Dev" (brand accent):** đổi từ `--color-accent` (#ec3013, tỉ lệ tương phản 3.75:1) sang `--color-accent-700` (6.4:1), đúng màu mà `h1 em` và link đang dùng.
- **Nút đổi ngôn ngữ:** accessible name phải chứa chữ hiển thị (`"VI, Switch language"` thay vì `"Switch language"`).

## Đã thử và bỏ

| Thử | Kết quả | Lý do bỏ |
|---|---|---|
| Lazy-load cả 3 overlay hero (`next/dynamic`, `ssr: false`) | +1 điểm, FCP nhanh hơn 0.2s | Cây đèn không có sẵn trong ảnh nên sẽ hiện lên muộn |
| Chỉ lazy-load Scene và Clock | Không thay đổi | Hai component quá nhỏ (~3KB) |
| Tắt preload font mono | FCP tệ đi | — |
| `inlineCss` | HTML gấp ~4 lần, chậm hơn | Xem mục 4 |
| next-intl ở client (`useTranslations`, `Link`) | +12–20KB JS | Xem mục 5 |

## Cách đo ở local

```bash
pnpm build && PORT=3123 pnpm start
npx lighthouse@12.8.2 http://localhost:3123/en --view                    # mobile
npx lighthouse@12.8.2 http://localhost:3123/en --preset=desktop --view
```

- **Không đo trên `pnpm dev`.** Mỗi cấu hình nên chạy 3 lần rồi lấy trung vị.
- **Tắt hẳn server cũ trước khi `start` lại** (`lsof -ti tcp:3123 | xargs kill`). Nếu không, trang sẽ trả HTML cũ đi kèm asset mới, gây lỗi 500.
- **Lighthouse mobile là số mô phỏng (Lantern).** Nó tính mọi request bắt đầu trước observed LCP vào băng thông, kể cả JS mà ảnh không thật sự phải chờ. Xem `metrics.observedLargestContentfulPaint` để biết LCP thật.
- **Lấy PageSpeed Insights làm chuẩn.** Lighthouse chạy từ máy local qua mạng Việt Nam cho số thấp hơn (`/vi`: 80 so với 94). Sau vài tuần, xem thêm Core Web Vitals từ người dùng thật (field data).
- **Local:** sharp bị treo khi tạo bản AVIF `w=384` của `hero-desk.png`. Production không bị, vì Vercel dùng bộ tối ưu ảnh riêng.
