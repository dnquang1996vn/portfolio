## Hình dạng của sự khác biệt

Ba hệ truy xuất chiếm ưu thế: Metrc, BioTrack và CCRS. Mỗi hệ có định danh riêng, trường bắt buộc riêng trên một lệnh chuyển, quy tắc riêng về những gì được sửa sau khi gửi. Trên đó, từng bang lại chồng thêm ràng buộc của mình dù dùng chung một hệ. Khác biệt là thật, nhưng không ngẫu nhiên. Nó phân cụm.

## Quy tắc là dữ liệu, hành vi là strategy

Chúng tôi chia khác biệt thành hai loại. Khác biệt khai báo, như trường nào bắt buộc, trường nào chỉ đọc sau khi gửi và một tag hợp lệ trông thế nào, nằm trong bộ quy tắc theo bang mà backend cung cấp và frontend áp dụng một cách tổng quát. Khác biệt hành vi, như cách lắp ráp manifest chuyển hàng hay cách diễn giải lỗi đồng bộ, nằm trong các module strategy theo cơ quan quản lý, cùng triển khai một interface chung.

```ts
export interface RegulatorStrategy {
  buildTransfer(order: Order, rules: StateRules): TransferPayload;
  parseSyncError(err: RegulatorError): UserFacingIssue;
  tagFormat: RegExp;
}

const strategies: Record<RegulatorId, RegulatorStrategy> = { metrc, biotrack, ccrs };
export const useRegulator = () => strategies[useTenant().regulator];
```

Một màn hình không bao giờ hỏi “tôi đang ở bang nào”. Nó hỏi bộ quy tắc xem một trường có bắt buộc không và nhờ strategy tạo payload. Thêm một bang dùng hệ sẵn có là thay đổi dữ liệu. Thêm một hệ mới là một module mới theo interface đã biết.

## Component đọc quy tắc thay vì đọc props

Trường form subscribe bộ quy tắc theo đúng đường dẫn của mình. Một trường tự render là bắt buộc, tùy chọn, ẩn hay khóa dựa trên quy tắc trong context, nên cùng một component form chuyển hàng phục vụ mọi bang mà không có một điều kiện nào trong JSX. Bộ quy tắc cũng là thứ bộ test lặp qua: một component form, hai mươi lăm fixture quy tắc, một bộ khẳng định.

- Bộ quy tắc được version. Thay đổi từ cơ quan quản lý được phát hành như một phiên bản quy tắc mới có ngày hiệu lực, không phải một lần deploy code lúc nửa đêm.
- Module strategy bị cấm import UI. Chúng tạo ra dữ liệu và vấn đề; component quyết định cách hiển thị.
- Mỗi strategy có contract test trên phản hồi thật đã ghi lại của cơ quan quản lý, nên thay đổi API phía trên làm hỏng CI trước khi làm hỏng một ngày làm việc của nhà vận hành.

## Điều đã tránh được

Không có switch hai mươi lăm nhánh ở bất kỳ đâu trong codebase, và không có thư mục component theo bang. Khi một bang mới mở cửa, công việc frontend tính bằng giờ. Đó là khác biệt giữa đa hình và điều kiện: một bên tăng tuyến tính theo interface, bên kia tăng theo số khách hàng.
