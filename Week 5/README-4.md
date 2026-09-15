## **USER FLOW** 

### **1\. Happy Path (Luồng lựa chọn đầu tư)**

| Step | User Action | System Response | Evidence |
| :---- | :---- | :---- | :---- |
| 1 | Đọc bài pitch | Hiển thị Pitching screen | Data pop-up |
| 2 | Xem thông tin Industry, Company, Financials | Hiển thị các cửa sổ BCTC và thông tin doanh nghiệp | Data pop-up |
| 3 | Investigation – Đặt câu hỏi | Hiển thị lời thoại trả lời của Founder | Khung hội thoại Q\&A |
| 4 | Điền Checklist (Bắt Red flags) | Lưu trạng thái lựa chọn Yes/No của người chơi | Widget Checklist |
| 5 | Chọn Invest và điều chỉnh Slider vốn | Tự động tính vốn, % Equity và hiện nút "Confirm deal" | Slider, Equity label, Nút Confirm |
| 6 | Bấm "Confirm deal" | Ghi nhận số vốn, khóa Slider, chạy logic tính ROI & Checklist Tải kịch bản startup tiếp theo | Code chạy tính toánMở home screen của round tiếp theo |
| 7 | Hoàn thiện đủ các vòng chơi | Hiện Investment report | Report gồm: lãi/lỗ, điểm, feedback |

### 

### **2\. Alternative Path (Luồng từ chối đầu tư)**

| Step | User Action | System Response | Evidence |
| :---- | :---- | :---- | :---- |
| 1 | Xem Pitch và BCTC | Phát hiện dấu hiệu xấu (VD: Net margin âm sâu) | Màn hình Pitch / Pop-up |
| 2 | Investigation – Đặt câu hỏi | Hiển thị phản hồi từ Founder | Khung hội thoại Q\&A |
| 3 | Điền Checklist | Lưu trạng thái lựa chọn Yes/No của người chơi | Widget Checklist |
| 4 | Bấm nút "Reject" | Hiện cảnh báo xác nhận bỏ qua deal | Màn hình xác nhận |
| 5 | Bấm "Yes" để xác nhận | Ghi nhận vốn \= 0, chuyển thẳng tới màn hình Report | Lưu trạng thái số vốn |
| 6 | Đọc báo cáo và bấm "Next Startup" | Chỉ hiển thị điểm Checklist (không có ROI), tải vòng chơi mới | Màn hình đầu ra |

### 

### **3\. Error Path (Luồng xử lý lỗi / UI Validation)**

| Step | User Action | System Response | Evidence |
| :---- | :---- | :---- | :---- |
| E1 | Chưa điền đủ Checklist nhưng bấm Invest/Reject | Khóa nút xác nhận, highlight đỏ các câu bị sót kèm thông báo yêu cầu hoàn thành | Checklist error state  |
| E2 | Kéo Slider dưới mức Minimum Capital rồi bấm Confirm | Chặn thao tác, thanh trượt tự động snap về mức tối thiểu | Slider validation warning |
| E3 | Chọn "Reject" nhưng cố tình kéo thanh trượt | Slider bị khóa ở mức $0 và chuyển sang trạng thái mờ (Disabled) | Disabled slider  |
| E4 | Chọn "Invest" nhưng ngân sách quỹ không đủ | Vô hiệu hóa lựa chọn Invest, hiện cảnh báo thiếu vốn, hướng dẫn chọn Reject | Insufficient fund alert  |

## 