## Ảo hóa dòng, và chỉ dòng

Phiên bản đầu ảo hóa cả dòng và cột. Ảo hóa cột đem lại rất ít trên màn hình thực, phá độ mượt của cuộn ngang, và biến cột dính thành ác mộng. Chúng tôi bỏ nó. Chỉ ảo hóa dòng, với chiều cao dòng cố định và một chút overscan, đã đưa DOM từ mười nghìn dòng xuống khoảng bốn mươi và giải quyết phần lớn vấn đề hiệu năng trong một bước.

## Tách trạng thái bố cục khỏi trạng thái dữ liệu

Độ rộng, thứ tự, ghim và ẩn hiện cột là sở thích người dùng. Dữ liệu dòng, sắp xếp và nhóm là trạng thái truy vấn. Trộn chúng vào một store nghĩa là kéo một mép cột sẽ render lại mọi ô. Tách ra, với store bố cục chỉ được header subscribe và renderer ô chỉ subscribe dữ liệu, biến resize thành thao tác chỉ chạm tới header.

```ts
// Two stores, two subscriptions. Resizing a column never touches the body.
const width = useLayoutStore(s => s.columns[colId].width);
const cell  = useDataStore(s => s.rows[rowIndex]?.[colId]);
```

## Freeze và sắp lại bằng CSS, không phải bằng toán

Cột đóng băng dùng position: sticky với offset trái tính sẵn cho từng cột ghim. Sắp lại thứ tự là thay đổi mảng thứ tự cột; grid render lại header và bốn mươi dòng đang hiện. Chúng tôi không bao giờ tự tay di chuyển node DOM, và không có absolute positioning ở bất kỳ đâu trong thân bảng.

## Nhóm và cây là cùng một tính năng

Một bảng được nhóm là một cây với các dòng cha được sinh ra. Khi đã mô hình hóa cả hai thành một danh sách phẳng các dòng đang hiện, kèm độ sâu và cờ mở rộng, renderer không còn quan tâm mình đang vẽ cái nào. Mở một node là chèn các con của nó vào danh sách phẳng; phần còn lại do bộ ảo hóa lo.

- Renderer ô là hàm thuần và được memo theo (dòng, cột). Định dạng làm một lần cho mỗi ô đang hiện, không phải mỗi lần gõ phím trong ô lọc.
- Bộ lọc chạy trong worker khi số dòng vượt ngưỡng, nên việc gõ không bao giờ chặn khung hình.
- Mọi tương tác được đo trong CI với bộ dữ liệu tổng hợp mười nghìn dòng. Một hồi quy làm hỏng build trước khi người dùng cảm nhận được.

## Vì sao nó vẫn là component được tái sử dụng nhiều nhất

Vì dùng nó rất nhàm chán. Một đội khai báo cột, trỏ vào dữ liệu, và có resize, freeze, nhóm và cây miễn phí. Nhiều năm sau cùng component ấy nằm trong Portal, Trace và Sales với một ngôn ngữ thiết kế, và tính năng mới vẫn chỉ cần thêm ở một chỗ.
