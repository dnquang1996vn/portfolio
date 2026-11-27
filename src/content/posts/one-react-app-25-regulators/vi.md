## Khác biệt trông thế nào

Có ba hệ thống truy xuất chính: Metrc, BioTrack và CCRS. Mỗi hệ có kiểu định danh riêng, các trường bắt buộc riêng cho một lệnh chuyển hàng, và quy tắc riêng về việc được sửa gì sau khi gửi. Ngoài ra từng bang còn thêm ràng buộc của mình, kể cả khi dùng chung một hệ. Khác biệt là thật, nhưng nó đi theo cụm.

## Quy tắc là dữ liệu, hành vi là strategy

Chúng tôi chia khác biệt thành hai loại. Loại khai báo được, như trường nào bắt buộc, trường nào chỉ đọc sau khi gửi, một tag hợp lệ trông ra sao, nằm trong bộ quy tắc theo bang: backend trả về, frontend áp dụng chung cho mọi bang. Loại thuộc về hành vi, như cách ghép một manifest chuyển hàng hay cách đọc một lỗi đồng bộ, nằm trong các module strategy theo từng hệ, cùng implement một interface.

```ts
export interface RegulatorStrategy {
  buildTransfer(order: Order, rules: StateRules): TransferPayload;
  parseSyncError(err: RegulatorError): UserFacingIssue;
  tagFormat: RegExp;
}

const strategies: Record<RegulatorId, RegulatorStrategy> = { metrc, biotrack, ccrs };
export const useRegulator = () => strategies[useTenant().regulator];
```

Màn hình không bao giờ hỏi “mình đang ở bang nào”. Nó hỏi bộ quy tắc xem một trường có bắt buộc không, và nhờ strategy tạo payload. Thêm một bang dùng hệ đã có chỉ là thêm dữ liệu. Thêm một hệ mới là viết một module mới theo interface có sẵn.

## Component đọc quy tắc thay vì đọc props

Mỗi trường trong form subscribe bộ quy tắc theo đúng path của nó. Trường tự render thành bắt buộc, tùy chọn, ẩn hay khóa dựa trên quy tắc trong context, nên một component form chuyển hàng dùng được cho mọi bang mà JSX không có điều kiện nào. Bộ test cũng chạy vòng qua chính bộ quy tắc đó: một component form, hai mươi lăm fixture quy tắc, một bộ assertion.

- Bộ quy tắc có version. Khi cơ quan quản lý đổi luật, chúng tôi phát hành một phiên bản quy tắc mới có ngày hiệu lực, không phải deploy code lúc nửa đêm.
- Module strategy không được import UI. Chúng trả ra dữ liệu và danh sách lỗi; hiển thị thế nào là việc của component.
- Mỗi strategy có contract test chạy trên response thật đã ghi lại của cơ quan quản lý, nên khi API phía họ đổi thì CI hỏng trước, người vận hành chưa kịp bị ảnh hưởng.

## Tránh được gì

Trong codebase không có switch hai mươi lăm nhánh nào, và cũng không có thư mục component theo bang. Khi một bang mới mở, phần việc frontend chỉ tính bằng giờ.
