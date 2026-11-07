## Bắt đầu từ luồng dữ liệu, không phải từ prompt

Trước khi ai đó viết prompt, chúng tôi vẽ sơ đồ: trường nào rời khỏi ranh giới của mình, đi tới ai, theo thỏa thuận nào, và được lưu bao lâu. Nếu một ô trên sơ đồ không trả lời được cả bốn câu hỏi, ô đó không nhận PHI. Chỉ riêng bài tập này đã loại hai nhà cung cấp và định hình toàn bộ thiết kế.

Nhà cung cấp chúng tôi dùng có Business Associate Agreement, không lưu dữ liệu và không huấn luyện trên dữ liệu đầu vào của chúng tôi. Đó là điều kiện tối thiểu. Nó không xóa bỏ nghĩa vụ phải giảm thiểu những gì mình gửi đi.

## Giảm thiểu, rồi giảm thiểu thêm lần nữa

Mô hình không cần tên, ngày sinh, địa chỉ hay mã bảo hiểm để viết một ghi chú lâm sàng. Nên nó không bao giờ thấy chúng. Một bước tiền xử lý thay các định danh trực tiếp bằng placeholder ổn định trước khi tạo request, và một bước hậu xử lý ánh xạ ngược khi lưu bản nháp. Các trường văn bản tự do cũng đi qua một lượt làm sạch, vì bệnh nhân tự nói tên mình trong bản ghi buổi khám nhiều hơn bạn tưởng.

```ts
const { redacted, vault } = redactPhi(transcript, {
  identifiers: ["name", "dob", "address", "phone", "email", "memberId"],
});
const draft = await model.draftSoapNote(redacted, template);
const note  = rehydrate(draft, vault); // placeholders -> real values, in our boundary only
```

## Bác sĩ là chủ của ghi chú

Bản nháp chỉ là bản nháp. Nó được lưu ở trạng thái chưa ký, hiển thị cạnh bản ghi nguồn, và không thể được lưu hồ sơ nếu bác sĩ chưa xem lại và ký. Mọi chỉnh sửa giữa bản nháp và chữ ký đều được ghi lại. Chính dấu vết kiểm toán đó cho phép chúng tôi nói một cách trung thực: AI hỗ trợ ghi chú, và một người có giấy phép hành nghề là tác giả.

- Bản nháp được mã hóa với cùng hệ thống khóa như phần còn lại của hồ sơ, không nằm ở một bảng phụ với kiểm soát lỏng hơn.
- Quyền truy cập bản nháp đi qua đúng các kiểm tra vai trò như chính buổi khám.
- Mẫu prompt được version, và mỗi ghi chú lưu lại phiên bản nào đã tạo ra nó.

## Những gì chúng tôi cố tình không làm

Không fine-tune trên dữ liệu bệnh nhân. Không truy xuất hồ sơ của bệnh nhân khác để “cải thiện” ghi chú. Không tự động lưu hồ sơ, kể cả với loại khám rủi ro thấp. Mỗi điều trong số đó sẽ làm câu chuyện tuân thủ dài thêm một đoạn và câu chuyện niềm tin ngắn đi một đoạn. Tính năng được bác sĩ ưa dùng chính vì nó nhàm chán đúng ở những chỗ cần nhàm chán.
