## Đoạn code thanh toán mình chưa từng đọc

Hồi đó mình đang dùng chế độ auto merge: agent viết test, viết code, pipeline xanh là tự merge. Ticket là sửa một đoạn logic thanh toán. Mình không để ý nó viết gì, vì test pass và mình đang bận việc khác.

Đến khi user báo bug thì đã rất lâu sau đó. Mình mở lại PR, đọc các test case và nhận ra mình không hiểu hết chúng đang kiểm tra cái gì. Câu đầu tiên trong đầu lúc đó: “toang rồi”.

## AI viết 99% code, không phải 99% công việc

Nhìn lại thì phần gõ code chưa bao giờ là phần khó. Phần khó là biết thế nào là đúng, rồi kiểm chứng được điều đó. Lần đó mình bỏ qua đúng phần này.

Trong note mình có kẻ một bảng như vầy:

| Rẻ đi | Đắt lên |
| --- | --- |
| Viết CRUD, boilerplate | Biến yêu cầu mơ hồ thành spec đúng |
| Nhớ API và cú pháp | Quyết định kiến trúc và trade-off |
| Tự tay viết test | Thiết kế cách verify |
| Làm nhanh từng task | Vận hành an toàn trên production |
|  | Hiểu sâu domain |

Cột bên phải vốn là việc của architect hay tech lead. Khác ở chỗ giờ nó đến sớm hơn nhiều trong sự nghiệp, và dev nào dùng AI cũng phải làm.

## Một webhook thanh toán trông rất ổn

Đoạn dưới không phải code của lần đó, mà là một ví dụ cùng kiểu: logic thanh toán, đọc trôi, qua được test happy path. Thử tìm xem nó sai ở đâu trước khi đọc tiếp.

```ts
app.post("/webhooks/payment", async (req, res) => {
  const event = req.body;
  if (event.type === "payment.succeeded") {
    const order = await db.orders.find(event.data.orderId);
    await db.orders.update(order.id, { status: "paid" });
    await mailer.sendReceipt(order.email);
  }
  res.sendStatus(200);
});
```

Có ít nhất bốn chỗ:

1. Không verify chữ ký, ai biết URL cũng gửi được event giả.
2. Không idempotent. Provider retry khi timeout, khách nhận hai email hoá đơn.
3. Không chặn chuyển trạng thái, event đến muộn có thể ghi đè một đơn đã hoàn tiền.
4. Gửi email trước khi trả 200. Email chậm thì provider timeout, rồi retry, quay lại lỗi số 2.

Không chỗ nào là lỗi cú pháp. Muốn thấy thì phải biết webhook ngoài đời chạy thế nào. Test AI viết kèm vẫn pass hết, vì test và code ra đời từ cùng một cách hiểu, nên có chung điểm mù.

## “Nhưng AI cũng biết mà?”

Hỏi model về các bẫy của webhook thì nó kể đủ cả bốn. Nhưng nó không tự nêu ra, còn mình thì không hỏi vì không biết chúng tồn tại. Không ai prompt được cho một thứ mình không biết là có.

Viết skill hay checklist để AI tự check thì giúp được một phần. Với mình, skill làm cho hợp lý là được, không cần hoàn hảo. Có điều muốn biết thế nào là hợp lý thì người viết vẫn phải hiểu vấn đề.

Còn khi luồng thanh toán hỏng, người bị hỏi vẫn là mình.

## Lúc chạy nhiều agent cùng lúc

Có một giai đoạn mình chạy nhiều agent song song, mỗi agent một task. Mình cứ ngỡ năng suất cao thật.

Thực tế là phải nhảy qua lại giữa các task liên tục. Context switch nhiều tới mức không nhớ được gì, làm gì cũng hời hợt. Lần auto merge code thanh toán kia cũng nằm trong giai đoạn đó.

Giờ mình làm khác:

- Duyệt spec và scenario trước khi cho AI code. Sửa ở bước này rẻ hơn nhiều so với sửa trên diff cuối.
- Implement theo lát mỏng, mỗi lát có test fail trước, và AI không được sửa test mình đã duyệt.
- Một task deep tại một thời điểm. Chỉ chạy song song những việc độc lập và ít rủi ro.
- AI chờ mình. Mình gom feedback rồi xem theo khung giờ.

Task cũng được chia theo rủi ro. Việc ít rủi ro thì cho tự động tối đa. Việc như logic thanh toán thì có gate, không auto merge nữa.

Chậm hơn thì có. Nhưng tới giờ chưa ai phàn nàn.

## Học gì, học thế nào

Nền tảng vẫn phải học: data modeling và state machine, system design (consistency, idempotency, retry, cache, failure modes), security và privacy, testing strategy, frontend architecture, và domain nghiệp vụ. Chỉ là mục tiêu khác đi:

> Hiểu đủ để biết phải hỏi gì, và đủ để nhận ra khi câu trả lời sai.

Cách mình đang học là dùng AI làm đối thủ: bảo nó tìm cách phá design của mình, rồi tự kiểm chứng từng kịch bản lỗi. Phần nào đã hiểu thì mã hoá thành skill để lần sau AI tự check.

Có hai cái bẫy. Một là teo kỹ năng: chỉ duyệt mà không tự làm phần khó, một thời gian sau sẽ không còn đủ sức đánh giá output. Hai là chạy theo số lượng, nhiều MR nhưng ít hiểu, đúng như giai đoạn chạy nhiều agent của mình.

## AI khuếch đại người dùng nó

Trong note mình có ghi: AI khuếch đại người hiểu sâu thành người rất mạnh, và khuếch đại người hiểu nông thành người sai rất tự tin. Lần merge code thanh toán đó, mình thuộc nhóm thứ hai.

Bạn đã bao giờ merge code AI viết mà không hiểu hết chưa?
