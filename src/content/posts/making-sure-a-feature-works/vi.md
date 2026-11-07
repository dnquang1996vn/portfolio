## Câu hỏi quyết định mọi thứ

Viết test luôn là một bài toán đánh đổi. Một bên là mức tin cậy: test này cho tôi biết feature chạy đúng đến đâu. Bên kia là chi phí: viết, chạy, bảo trì, và sửa mỗi khi nó đỏ.

Tôi dùng hai quy tắc để cân. Test càng giống cách người dùng thật dùng sản phẩm thì càng đáng tin. Và test đỏ chỉ có giá trị khi nó chỉ thẳng ra lỗi nằm ở đâu, nên test nào báo lỗi càng rõ, tôi càng quý.

Nên trước khi viết test, tôi hỏi một câu: logic này nằm ở đâu? Nếu type hay lint rule đã bắt được thì khỏi cần test. Nếu là một quy tắc đứng độc lập thì unit test là đủ. Nếu chỉ xuất hiện khi nhiều phần ghép lại với nhau thì mới cần test ở tầng cao hơn, và tầng càng cao thì test càng ít.

## Backend: logic tách riêng được, nên unit test gánh phần lớn

Phần lớn logic backend là những quy tắc có đầu vào và đầu ra rõ ràng: tính giá, xét điều kiện, cộng trừ ngày tháng, chọn bác sĩ cho một lượt khám. Dependency được inject vào, nên mỗi hàm chạy riêng lẻ được trong vài mili giây, không cần database hay network. Đây là nơi tôi đặt phần lớn test của backend.

Ở biên của service, tôi thêm một tầng nữa: gửi HTTP request vào, rồi kiểm tra dữ liệu ghi xuống database. Database này là database thật chạy trong container, vì nếu fake chính tầng lưu trữ của mình thì rốt cuộc chỉ đang test cái fake. Còn những chỗ gọi sang hệ thống của team khác, tôi dùng contract check, chứ không viết test mà kết quả phụ thuộc vào việc hệ thống của họ có đang chạy hay không.

Đây chính là mô hình kim tự tháp quen thuộc. Nó hợp với backend vì ở đây mỗi unit thật sự chứa logic. Khi có gì hỏng, test gọi đúng tên quy tắc bị hỏng.

## Frontend: đơn vị để test là component

Ở frontend, khái niệm unit khác hẳn. Một component không chỉ phụ thuộc vào props, mà còn vào context, route, kích thước màn hình, ngôn ngữ, và dữ liệu đang nằm trong cache. Tách nó ra khỏi tất cả những thứ đó rồi test thì chẳng chứng minh được gì nhiều. Phần lớn bug frontend đến từ việc hai nguồn state đó không khớp nhau.

Vì vậy tôi test component cùng với provider thật, router thật, và chỉ fake mỗi phần gọi network. Câu hỏi rất đơn giản: với dữ liệu này, màn hình hiện gì, và khi người dùng bấm thì chuyện gì xảy ra? Mức tương tác đó là đủ để bắt được những bug thật sự lọt ra production.

Unit test vẫn có chỗ, nhưng chỉ cho những hàm tôi chủ động tách ra: một hàm format, một reducer, một helper xử lý ngày tháng. Phần còn lại là component test. Nên bộ test frontend có hình chiếc cúp chứ không phải kim tự tháp: cùng một cách đánh đổi, nhưng áp vào một hệ thống khác.

## End to end: đắt, nên mỗi feature chỉ một happy path

Test end to end chậm, dễ flaky, và khi fail thì khó biết lỗi nằm ở đâu. Tôi vẫn giữ, vì có những thứ chỉ kiểm tra được khi mọi phần ghép lại với nhau: đăng nhập, routing, proxy, hay một luồng thanh toán đi qua hai service. Chỉ là tôi giữ danh sách này thật ngắn.

Mỗi feature có đúng một test end to end, chạy theo luồng chính mà người dùng hay đi. Test tự tạo dữ liệu của mình qua API, mỗi lần chạy một bộ riêng, và tự dọn khi pass. Đây là test duy nhất chứng minh database thật, auth thật và màn hình thật khớp với nhau.

- Không kiểm tra edge case ở tầng này. Chúng đã có test ở tầng dưới, nơi rẻ hơn nhiều.
- Nếu test end to end bắt được một bug mà không test nào ở tầng dưới bắt được, tôi viết thêm test ở tầng dưới. Không thì kim tự tháp sẽ lộn ngược dần, mỗi lần một bug.
- Không bao giờ bật retry để ép test đỏ thành xanh. Retry chỉ để vượt qua lỗi hạ tầng, không phải để giấu race condition.

## Kết quả

Bộ test backend là kim tự tháp, bộ test frontend là chiếc cúp, và một lớp mỏng happy path phủ lên cả hai. Không tầng nào kiểm tra lại điều tầng dưới đã kiểm tra. Cả bộ chạy đủ nhanh để khi build đỏ, mọi người thật sự mở ra đọc.

Còn câu hỏi tôi hay quay lại nhất thì rất đơn giản: nếu ba tháng nữa chỗ này hỏng, ai sẽ nhận ra? Nếu là khách hàng, phải có test tự động, ở tầng thấp nhất nhìn thấy được lỗi đó. Nếu là cả team, ngay lập tức, thì kiểm tra tay là đủ.
