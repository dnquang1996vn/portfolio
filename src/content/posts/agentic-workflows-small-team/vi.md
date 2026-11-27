## Những thứ còn dùng

1. Skill riêng cho quy ước của team. Một skill biết chúng tôi tổ chức module NestJS thế nào, đặt tên migration ra sao và viết mô tả Jira kiểu gì là hết hẳn một loạt comment review kiểu “làm theo pattern giùm”.
2. Agent cho những việc đã rõ spec và nhàm chán. Đổi tên trên cả codebase, thêm một trường từ đầu đến cuối, viết bản nháp test đầu tiên cho một hàm có sẵn. Tức là việc nào spec gói gọn trong ba câu và kết quả dễ kiểm tra.
3. Việc nào không đơn giản thì lên plan trước. Bảo nó viết plan, đọc, sửa, rồi mới cho làm. Mười phút đọc plan đỡ được một giờ gỡ những chỗ nó làm sai mà rất tự tin.
4. Review diff như thể người viết là nhân viên mới. Mà đúng là vậy thật: làm nhanh, đọc nhiều, và không biết gì về sự cố tháng trước.

## Những thứ đã bỏ

- Để agent tự mở pull request mà không ai theo dõi. PR nhiều lên, thứ đáng đọc ít đi, reviewer bắt đầu đọc lướt. Chúng tôi quay về cách cũ: mỗi PR có một người đứng tên, chịu trách nhiệm cho từng dòng trong đó.
- Prompt cả một tính năng từ ticket có một dòng. Kết quả trông hoàn chỉnh, và lần nào cũng giấu ba giả định sai.
- Chỉ dựa vào test do agent viết. Loại test này chỉ xác nhận code đang làm đúng cái nó đang làm. Còn nó nên làm gì thì vẫn phải có người quyết.

## Một trang chính sách để dùng cho an toàn

Chúng tôi viết một trang chính sách rồi ghim lại. Trong đó không có gì cao siêu. Nhưng nhờ mấy quy tắc nhàm chán ấy mà chúng tôi dám giao một codebase y tế cho công cụ mà vẫn ngủ ngon.

> Không đưa credential production, dữ liệu khách hàng hay PHI vào bất kỳ prompt hay context nào. Thứ gì bạn không dám dán vào một kênh chat công khai thì cũng đừng dán vào agent.

- Agent làm trên nhánh riêng, không bao giờ trên main. Thay đổi nào cũng đi qua quy trình review bình thường.
- Code do AI sinh ra phải qua đúng các bước lint, type và test như code người viết. Không có ngoại lệ kiểu “tại AI làm”.
- Ai merge thì người đó chịu trách nhiệm. Công cụ không gánh lỗi thay.

## Tóm lại thay đổi gì

Chúng tôi bớt thời gian cho boilerplate và migration, và có thêm thời gian cho những phần cần cân nhắc: data model, ranh giới bảo mật, và việc ngồi hỏi lại stakeholder xem ý họ thật ra là gì. Team vẫn bấy nhiêu người.
