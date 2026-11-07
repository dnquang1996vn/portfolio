## Vấn đề thực sự cần giải

Khi khách white-label đầu tiên ký hợp đồng, cách làm hấp dẫn nhất là fork. Sao chép codebase, đổi thương hiệu, thêm luồng tiếp nhận riêng của họ, xong. Fork nhanh ở ngày đầu và tai hại ở tháng thứ sáu: mỗi bản sửa lỗi phải làm hai lần, mỗi lần nâng cấp dependency phải làm hai lần, và hai sản phẩm trôi xa nhau đến mức không ai còn nói được đâu là hành vi của sản phẩm, đâu là của khách.

Vì vậy ràng buộc chúng tôi đặt ra rất thẳng: một repository, một artifact triển khai, một lịch sử migration. Khác biệt theo từng khách phải là dữ liệu hoặc cấu hình, không bao giờ là một nhánh code.

## Tenant là thuộc tính của request, không phải của bản build

Mỗi request xác định tenant từ rất sớm: trước hết từ hostname, và từ một header tường minh trong các lời gọi giữa service. Đối tượng tenant đó đi theo request context và là cách duy nhất mà code được phép biết mình đang phục vụ ai. Không có chỗ nào đọc biến môi trường để quyết định hành vi theo khách.

```ts
// Resolved once per request, then injected everywhere.
export interface TenantContext {
  id: string;
  brand: BrandConfig;          // colours, logo, legal name, support email
  features: FeatureFlags;      // what this tenant has turned on
  jurisdiction: StateRules[];  // pricing and legal rules per US state
}
```

Cách ly dữ liệu được ép ở tầng repository. Mọi query builder đều được tạo từ tenant context và tự thêm điều kiện lọc tenant, nên developer không thể quên. Ban đầu chúng tôi thử cách “nhớ thêm mệnh đề where”. Sau lần suýt lọt thứ hai trong code review thì dừng hẳn.

## Logic riêng mà không cần bản build riêng

Phần lớn hành vi riêng của khách không hề lạ lùng. Đó là một bộ câu hỏi tiếp nhận khác, một bộ xét nghiệm khác, một mẫu đồng ý khác, một nhịp gửi email khác. Tất cả đều là nội dung và cấu hình, được version trong database và đội vận hành có thể sửa mà không cần deploy.

Với những phần thực sự cần tùy biến, chúng tôi dùng một số ít điểm mở rộng có tên: một hook chạy sau khi nhập kết quả xét nghiệm, một hook quyết định lượt khám được chuyển tới bác sĩ nào, một hook có thể thêm dòng hàng khi thanh toán. Mỗi điểm mở rộng có một triển khai mặc định và một registry theo tenant id. Bản ghi đè cho khách là một class trong cùng repository, được cùng bộ test bao phủ, và sẽ hỏng ngay nếu interface đổi vì compiler báo lỗi.

- Điểm mở rộng ít và có tên. Nếu một khách mới cần điểm thứ sáu, chúng tôi tự hỏi liệu điểm thứ năm có nên tổng quát hơn không.
- Các bản ghi đè không được import nhau. Code của khách A không bao giờ được phụ thuộc vào khách B.
- Mỗi bản ghi đè có test chạy trên fixture mặc định. Nếu hợp đồng lõi thay đổi, bản build của khách hỏng to trong CI, không phải hỏng âm thầm trên production.

## Kết quả thu được

Tính năng xây cho một khách được phát hành cho tất cả, sau một feature flag. Bản vá bảo mật chỉ cần làm một lần. Khách white-label từng là ngoại lệ giờ chỉ là tenant có nhiều cấu hình nhất. Kỷ luật này tốn vài tuần ban đầu. Fork thì sẽ tốn cả một đội.
