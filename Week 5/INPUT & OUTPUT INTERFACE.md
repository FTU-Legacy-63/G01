## **INPUT & OUTPUT TRÊN INTERFACE**

## **USER GOAL**

**User Goal :** Thực hiện due diligence một startup thông qua quy trình có cấu trúc, đưa ra quyết định đầu tư, phân bổ nguồn vốn hợp lý và nhận feedback về hiệu suất đầu tư và khả năng nhận diện red flags.

**Đánh giá mức độ đáp ứng User Goal trên Interface:**

* **Người dùng có biết bắt đầu ở đâu không?** Người chơi luôn bắt đầu từ Founder’s Pitch, sau đó được điều hướng tuần tự qua các thông tin Industry, Company, Financials và Q\&A.  
* **Mỗi bước có phục vụ goal không?** Mọi thông tin cung cấp đều là dữ liệu đầu vào cho quá trình due diligence. Checklist chuyển các phân tích của người chơi thành các đánh giá Yes/No có cấu trúc. Tab Decision hỗ trợ hoàn thành quyết định rót vốn.  
* **Có bước nào không cần thiết không?** Hệ thống được tối ưu để loại bỏ các thao tác thừa. Người chơi không cần nhập liệu thủ công; toàn bộ thông tin được cung cấp qua các Data Pop-up / Tab chuyên biệt.  
* **Output có dẫn tới next action rõ không?** Sau khi ấn “Confirm deal”, màn hình tự nhảy sang round tiếp theo hoặc Investment report, sau khi người chơi hoàn thành đủ hết các vòng.

### **1\. Nguyên tắc thiết kế Input**

* **Hiển thị dữ liệu:** Các thông tin (Pitch, Industry, Company, Financials) chỉ hiển thị ở dạng đọc (Read-only).  
* **Thiết kế Checklist:** Sử dụng Checkbox để cấu trúc hóa quá trình đánh giá, dễ dàng đối chiếu với Benchmark. Bắt buộc điền đủ 100%.  
* **Phân bổ vốn (Capital Allocation):** Dùng thanh trượt (Slider) để trực quan hóa lượng vốn, đi kèm đơn vị rõ ràng (Số tiền và % Equity). Giới hạn chặn trên (Max fund available on hand) và chặn dưới (Min \= $0).

### **2\. Nguyên tắc thiết kế Output & Explainability**

Output không chỉ là các con số khô khan mà là một hệ thống phản hồi (Feedback system) giúp người chơi rút kinh nghiệm.

| Output | Ý nghĩa / Diễn giải trên UI | Explainability (Cách UI giải thích) |
| :---- | :---- | :---- |
| **Checklist Accuracy** | Khả năng phát hiện bẫy DD. | Phân tích chi tiết các Red Flags đã bắt đúng hoặc lỡ bỏ sót. |
| **Profit / Loss** | Kết quả lãi/lỗ của khoản đầu tư. | Hiển thị rõ số vốn phân bổ sinh ra bao nhiêu lợi nhuận/thua lỗ. |
| **Portfolio ROI** | Hiệu suất sinh lời của toàn danh mục. | Đối chiếu % ROI với thang đánh giá tổng thể. |
| **Overall Performance** | Điểm tổng hợp (DD \+ Return Score). | Đánh giá năng lực toàn diện của người chơi trên hệ thống điểm. |
| **Fish Classification** | Phân loại Rank người chơi (Shark, Tuna...). | Mô tả ngắn gọn về trình độ đầu tư dựa trên Rank đạt được. |
| **Feedback** | Điểm mạnh, điểm yếu cần cải thiện. | Đoạn Text ngắn gọn chỉ ra các bài học kinh nghiệm sát với kịch bản. |

## 
