## Chỉ virtualize dòng

Phiên bản đầu virtualize cả dòng lẫn cột. Virtualize cột gần như không được gì trên màn hình thật, làm cuộn ngang bị giật, còn cột sticky thì khổ đủ đường. Chúng tôi bỏ. Chỉ virtualize dòng, với chiều cao dòng cố định và một ít overscan, DOM giảm từ mười nghìn dòng xuống khoảng bốn mươi, và phần lớn vấn đề hiệu năng hết ngay từ bước này.

## Tách state layout khỏi state dữ liệu

Độ rộng, thứ tự, ghim và ẩn hiện cột là tùy chọn của người dùng. Dữ liệu dòng, sắp xếp và nhóm là state của query. Để chung một store thì kéo một mép cột là mọi ô render lại. Tách ra, header chỉ subscribe store layout, renderer của ô chỉ subscribe store dữ liệu, thì resize chỉ còn đụng tới header.

```ts
// Two stores, two subscriptions. Resizing a column never touches the body.
const width = useLayoutStore(s => s.columns[colId].width);
const cell  = useDataStore(s => s.rows[rowIndex]?.[colId]);
```

## Freeze và đổi thứ tự cột bằng CSS, khỏi tính toán

Cột freeze dùng position: sticky, mỗi cột ghim có một offset trái tính sẵn. Đổi thứ tự cột chỉ là đổi mảng thứ tự; grid render lại header và bốn mươi dòng đang hiện. Chúng tôi không tự tay di chuyển node DOM, và trong thân bảng không có chỗ nào dùng absolute positioning.

## Nhóm và cây là cùng một tính năng

Bảng có nhóm thực ra là một cây, với các dòng cha được sinh thêm. Khi mô hình cả hai thành một danh sách phẳng gồm những dòng đang hiện, mỗi dòng kèm độ sâu và cờ expanded, renderer không cần biết mình đang vẽ loại nào nữa. Mở một node là chèn các dòng con vào danh sách phẳng; phần còn lại virtualizer lo.

- Renderer của ô là hàm thuần, memo theo (dòng, cột). Format chạy một lần cho mỗi ô đang hiện, chứ không chạy lại mỗi lần gõ một phím trong ô lọc.
- Khi số dòng vượt ngưỡng, bộ lọc chạy trong worker, nên gõ không làm khựng frame.
- Mọi tương tác đều được đo trong CI với bộ dữ liệu giả mười nghìn dòng. Có regression là build fail trước khi người dùng kịp thấy.

## Vì sao nó vẫn là component được dùng lại nhiều nhất

Vì dùng nó rất nhàm chán. Một team khai báo cột, trỏ vào dữ liệu, là có sẵn resize, freeze, nhóm và cây. Nhiều năm sau component ấy vẫn nằm trong Portal, Trace và Sales với cùng một ngôn ngữ thiết kế, và tính năng mới vẫn chỉ cần thêm ở một chỗ.
