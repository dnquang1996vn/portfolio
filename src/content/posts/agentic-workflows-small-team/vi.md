## Những gì ở lại

1. Skill tùy biến cho quy ước riêng của đội. Một skill biết chúng tôi tổ chức module NestJS thế nào, đặt tên migration thế nào và viết mô tả Jira thế nào sẽ xóa sổ cả một lớp nhận xét review kiểu “vui lòng theo đúng pattern”.
2. Agent cho những việc rõ đặc tả và nhàm chán. Đổi tên xuyên codebase, thêm một trường từ đầu đến cuối, viết bản nháp test đầu tiên cho một hàm sẵn có. Bất cứ việc gì mà đặc tả gọn trong ba câu và kết quả dễ kiểm chứng.
3. Lên kế hoạch trước với mọi việc không tầm thường. Yêu cầu kế hoạch, đọc, sửa, rồi mới cho nó xây. Mười phút cho kế hoạch tiết kiệm một giờ gỡ một ngã rẽ sai đầy tự tin.
4. Review diff như thể một người mới viết. Vì thực chất đúng là vậy: nhanh, đọc nhiều, và không nhớ gì về sự cố tháng trước.

## Những gì không ở lại

- Để agent tự mở pull request không giám sát. Số lượng tăng, chất lượng tín hiệu giảm, reviewer bắt đầu đọc lướt. Chúng tôi quay về một người chủ cho mỗi PR, chịu trách nhiệm cho từng dòng trong đó.
- Prompt cả tính năng từ một ticket một dòng. Kết quả trông hoàn chỉnh và lần nào cũng giấu ba giả định sai.
- Test do agent viết là bộ test duy nhất. Chúng xác nhận code làm đúng những gì code đang làm. Con người vẫn phải quyết định nó nên làm gì.

## Chính sách sử dụng giúp mọi thứ an toàn

Chúng tôi viết một chính sách dài một trang và ghim lại. Không có gì thông minh trong đó. Chính những quy tắc nhàm chán ấy cho phép giao một codebase y tế cho công cụ mà không mất ngủ.

> Không thông tin đăng nhập production, không dữ liệu khách hàng, không PHI trong bất kỳ prompt hay context nào. Nếu bạn không dán nó vào một cuộc chat công khai, đừng dán nó vào agent.

- Agent làm việc trên nhánh, không bao giờ trên main. Mọi thay đổi đi qua đường review bình thường.
- Code sinh ra chịu cùng cửa kiểm lint, type và test như code của người. Không có ngoại lệ “tại AI làm”.
- Người merge là người chịu trách nhiệm. Công cụ không gánh lỗi.

## Hiệu quả thực

Ít thời gian hơn cho boilerplate và migration, nhiều thời gian hơn cho những phần cần phán đoán: mô hình dữ liệu, ranh giới bảo mật, cuộc trò chuyện với stakeholder về điều họ thực sự muốn nói. Đội không lớn hơn. Sự chú ý của đội được dùng đúng chỗ hơn.
