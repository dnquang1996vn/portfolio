## Phần chính thì đúng, lỗi lặt vặt thì cả đống

Chuyện là thế này: có lần mình giao cho AI code trọn 1 feature khá to theo Figma. Nó chạy một mạch là xong, phần chính đúng hết, mình cũng hơi bất ngờ.

Có điều mở ra dùng thử thì lỗi lặt vặt cả đống: chỗ này sai 1 nhánh logic, chỗ kia đi nhầm 1 bước trong luồng, UI thì lệch Figma một tí. Không cái nào nghiêm trọng, nhưng mình phải ngồi feedback từng cái một cho AI sửa, mà sửa xong lại phải kiểm tra lại, nên rất lâu.

Tự nhảy vào sửa cũng chẳng nhanh hơn đâu. Code không phải mình viết, nên muốn đổi 1 chỗ bé tí cũng phải lần mò một hồi mới ra.

## Dựng 1 quy trình để AI tự code, tự test

Cái mình muốn là AI chạy được session dài, ít phải dừng lại hỏi mình. Muốn thế thì nó phải tự bắt được mấy lỗi lặt vặt trước khi tới tay mình, còn mình thì phải xem lại kết quả thật nhanh được.

Thế là mình sắp lại 2 thứ. Thứ nhất là bộ test, để AI sửa xong cái gì cũng có chỗ tự kiểm tra. Thứ hai là 1 trang nằm ngay trong app, bày sẵn mọi state của từng component, mình với QA mở ra là thấy luôn.

Còn việc của mình thì dồn hết về khâu đầu: feature này làm gì, luồng đi ra sao, phải có những case nào. Mấy cái đó mình quyết, phần còn lại để AI lo.

## Chia test theo hình chiếc cúp

Muốn AI tự kiểm được thì trước hết phải viết test và quản lý test cho đúng đã, chứ không phải spam test để lấy coverage. Coverage cao mà test sai tầng thì chạy vừa chậm, vừa chẳng cho biết feature có đúng hay không. Cái mình cần là ít test thôi, nhưng phủ được case thật và chạy nhanh.

Mình chia theo hình chiếc cúp (Testing Trophy) của Kent C. Dodds: unit mỏng, component test dày, end to end mỏng. Ông khuyên dồn phần lớn công sức vào tầng integration, phần lớn thôi chứ không phải tất cả [^trophy]. Với frontend, tầng đó chính là component test: render component với provider thật, router thật, chỉ fake mỗi phần network.

| Tầng | Cho mình biết | Giá |
| --- | --- | --- |
| Unit | 1 hàm tính đúng | Rẻ, nhưng không thấy màn hình |
| Component | Với dữ liệu này, màn hình hiện gì | Vừa phải |
| End to end | Ghép hết lại vẫn chạy | Chậm, dễ flaky |

Unit test với frontend thì hơi bị cục bộ. 1 component đâu chỉ có props, nó còn phụ thuộc context, route, rồi dữ liệu đang nằm trong cache nữa. Tách nó ra khỏi mấy thứ đó rồi test thì pass đấy, nhưng chẳng nói lên được màn hình người dùng nhìn thấy ra sao.

End to end thì ngược lại: sát thực tế nhất, có điều chậm, hay flaky, mà fail rồi cũng khó biết lỗi nằm ở đâu.

Nên mỗi feature mình chỉ giữ đúng 1 test end to end, chạy theo luồng chính. Edge case thì nằm hết ở component test. Unit test mình chỉ viết cho mấy hàm chủ động tách ra, kiểu format, reducer, xử lý ngày tháng.

Backend của tụi mình thì vẫn theo kim tự tháp quen thuộc: unit test nhiều nhất, càng lên cao càng ít. Lý do là backend khá đồng nhất: logic nằm trong các hàm có đầu vào đầu ra rõ ràng, tách riêng ra được, còn dữ liệu thì chỉ có 1 nguồn sự thật là database. Unit test ở đó chạy nhanh và cô lập được [^vocke], trong khi end to end phải dựng cả service lẫn database, setup đắt nên càng hạn chế càng tốt.

Frontend thì logic không nằm gọn trong 1 hàm, nó nằm ở chỗ component, state, route và dữ liệu từ API ghép vào nhau. Chính Dodds cũng nói chiếc cúp đến từ kinh nghiệm làm UI của ông, còn với backend thì ông mới chỉ nghĩ tới monolith [^classes].

## AI viết test, mình đọc diff

Bây giờ test cũng do AI viết, mình chỉ review. Mình dùng Playwright Test Agents, có từ bản 1.56, gồm 3 agent [^agents][^notes]. Planner đi một vòng qua app rồi viết kế hoạch test bằng Markdown vào `specs/`. Generator biến kế hoạch đó thành file test. Healer chạy lại mấy test đang fail rồi sửa tới khi nào pass thì thôi.

Mình đọc kĩ nhất là file spec. Nó viết bằng lời, nên luồng nào thiếu, case nào AI hiểu sai là mình thấy ngay, trước khi có dòng test nào được viết ra.

Healer mới là chỗ phải cẩn thận. Các bạn thử đoán xem diff này sai ở đâu:

```diff
 test("cancel a pending visit", async ({ page }) => {
   await page.getByRole("button", { name: "Cancel" }).click();
-  await expect(page.getByText("Cancelled")).toBeVisible();
+  await expect(page.getByText("Pending")).toBeVisible();
 });
```

Test xanh lại rồi đấy. Có điều bấm Huỷ mà lượt khám vẫn "Đang chờ" thì rõ ràng là bug của app, và test vừa được sửa cho khớp với bug luôn.

Mình không nói quá đâu. Prompt đi kèm healer ghi rõ: nó không hỏi lại người dùng, được sửa cả assertion lẫn giá trị mong đợi, và sẽ đánh `test.fixme()` khi nó tin app mới là bên hỏng [^healer].

Nó sửa sai nhiều hay ít thì mình chưa tìm được số đo nào. Nhưng prompt đã viết thế thì mình đặt 2 luật: diff nào của healer đổi giá trị mong đợi là mình phải đọc, và cứ có `fixme` mới là phải có người vào xem.

Luật cũ thì vẫn giữ nguyên: không bật retry để ép test đỏ thành xanh.

## Trang /design: mọi state, mở ra là thấy

Test bắt được logic sai. UI lệch thì Playwright cũng có phần so ảnh (`toHaveScreenshot()`): lần đầu nó chụp ảnh mẫu, mấy lần sau đem ra so [^visual]. Cái này bắt được kha khá, nhưng không hết.

Mà kể cả bắt hết thì vẫn cần mắt người nhìn trực tiếp. Phải nhìn mới biết UI/UX dùng có ổn không, còn chỗ nào nên cải thiện.

Tụi mình có 1 workflow khá dài, phải qua rất nhiều điều kiện mới tới được màn hình cuối. Code xong, QA báo có 1 chỗ UI chưa đúng, chỉnh một tí là xong.

Sửa thì nhanh thôi. Cái tốn là mở lại được đúng màn hình đó để kiểm tra: phải tạo dữ liệu, rồi bấm lại từng bước từ đầu.

Ví dụ như card lượt khám. Nó có các trạng thái requested, live, on hold, cancelled, mà mỗi trạng thái lại hiện khác nhau tùy dữ liệu. Muốn xem cho đủ thì phải ngồi tạo từng bộ dữ liệu (nghĩ thôi đã thấy lười).

Thế là mình build 1 trang `/design` ngay trong app, na ná Storybook. Mỗi component có 1 danh sách state, mỗi state là 1 fixture kèm API đã mock sẵn:

```ts
export const visitCardStates = {
  requested: { visit: visit({ status: "requested" }) },
  live: { visit: visit({ status: "live" }) },
  onHold: { visit: visit({ status: "on_hold" }) },
  cancelled: { visit: visit({ status: "cancelled" }) },
};
```

Giờ sửa xong là mình mở trang đó ra, thấy luôn mọi state của card, chắc chắn phần dev làm đã đúng rồi mới chuyển đi. QA thì vẫn nên test từ đầu trên luồng thật, trang này không thay được phần đó.

Nhìn vào danh sách còn biết card này có những trạng thái nào, phụ thuộc điều kiện gì. Với code do AI viết, đây là chỗ mình quay lại mỗi khi cần hiểu feature.

Phần mock thì mình dùng MSW (Mock Service Worker), 1 thư viện mock API cho cả trình duyệt lẫn Node.js, nó chặn request ngay ở tầng network [^msw]. Mình làm theo cách MSW khuyên: 1 bộ handler mô tả các response thành công, mỗi state khác là 1 override đè lên [^mswh]. Bộ handler đó dùng lại được cả ở Node lẫn trình duyệt [^mswq], nên component test với trang `/design` có thể dùng chung fixture.

## Sao không dùng Storybook cho xong?

Mình có cân nhắc Storybook rồi. Có 3 thứ làm mình ngại: phải chạy thêm 1 server trên port khác, component trong đó nhiều lúc chạy không giống trong app thật, và mock API khá vất vả.

Cái thứ hai không phải do mình khó tính đâu. Tính đến tháng 11/2026, tài liệu Storybook cho Next.js ghi là story không được server render, còn hỗ trợ server component thì vẫn nằm sau cờ `experimentalRSC`. Page nào import module chỉ chạy được ở Node là build của Storybook crash luôn [^sbnext][^sbrsc].

Nói đi cũng phải nói lại, cách của mình không miễn phí. React Cosmos cũng render fixture qua 1 route trong app Next.js, mà vẫn cần 1 process thứ hai cho giao diện của nó [^cosmos]. Trang `/design` né được chuyện đó vì nó chỉ là 1 route. Bù lại mình phải tự viết, tự giữ, và không có addon nào của Storybook.

Nhưng mà bây giờ token Claude nhiều mà, maintain cũng không phải chuyện gì khó. Quan trọng là nó giúp tăng chất lượng.

## AI cũng dùng trang /design

AI cũng dùng trang `/design` để so. Mình cho nó dùng Playwright chụp từng state trên trang rồi so với Figma, nên nhiều lỗi lệch bị bắt từ sớm.

Nhưng so ảnh thôi thì chưa đủ, mình vẫn để AI chạy lại workflow thật ở local. Hồi chưa có file spec, AI tự test khá là ngu, vì nó không biết hết các luồng. Giờ tận dụng được spec của Playwright rồi thì nó mở browser lên test thật luôn, bắt ra được nhiều lỗi tương tác.

Lưu ý nhé: AI chạy hết rồi thì mình vẫn phải tự chạy lại 1 lượt. Vừa để verify, vừa để mình nắm được feature. Chỉ là đỡ mất thời gian fix mấy lỗi lặt vặt thôi.

## Cái giá phải trả

Chủ yếu là tốn token. Component đổi thì trang `/design` cũng phải đổi theo.

Tụi mình giữ 1 quy tắc 1 chiều: trang `/design` chạy theo component. Không sửa component, không thêm prop chỉ để nó hiện được trên trang `/design`.

Token có tốn thêm thật, nhưng không đáng kể. Quan trọng là chạy chính xác.

## Mai thử được gì

- Mỗi feature viết đúng 1 test end to end cho luồng chính, còn edge case thì đẩy xuống component test.
- Đọc file spec trước, rồi mới cho AI viết test.
- Soi diff của healer: chỗ nào đổi giá trị mong đợi, chỗ nào có `fixme` thì phải có người xem.
- Chọn component nhiều state nhất, bày hết state của nó ra 1 trang trong app.

Trong phạm vi 1 bài mình không kể hết được, và cách này chắc chắn còn chỗ chưa ổn. Còn các bạn thì sao, lần gần nhất phải sửa 1 feature do AI viết, các bạn mất bao lâu mới mở lại được đúng màn hình cần xem?

## Nguồn tham khảo

[^vocke]: Ham Vocke, [The Practical Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html), 2018.
[^trophy]: Kent C. Dodds, [Write tests. Not too many. Mostly integration.](https://kentcdodds.com/blog/write-tests)
[^classes]: Kent C. Dodds, [The Testing Trophy and Testing Classifications](https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications), 2021.
[^agents]: Playwright, [Test Agents](https://playwright.dev/docs/test-agents).
[^notes]: Playwright, [Release notes, version 1.56](https://playwright.dev/docs/release-notes).
[^healer]: Playwright, [healer agent prompt, 1.64.1](https://unpkg.com/playwright@1.64.1/lib/agents/playwright-test-healer.agent.md).
[^visual]: Playwright, [Visual comparisons](https://playwright.dev/docs/test-snapshots).
[^msw]: Mock Service Worker, [Introduction](https://mswjs.io/docs/).
[^mswh]: Mock Service Worker, [Structuring handlers](https://mswjs.io/docs/best-practices/structuring-handlers).
[^mswq]: Mock Service Worker, [Quick start](https://mswjs.io/docs/quick-start).
[^sbnext]: Storybook, [Storybook for Next.js with Vite](https://storybook.js.org/docs/get-started/frameworks/nextjs-vite).
[^sbrsc]: Storybook, [Storybook for React Server Components](https://storybook.js.org/blog/storybook-react-server-components/), 2023.
[^cosmos]: React Cosmos, [Next.js](https://reactcosmos.org/docs/getting-started/next).
