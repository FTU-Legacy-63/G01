#### **Project Logic Chain** 

#### **1\. Problem** 

- Sinh viên Tài chính năm 3–4 nắm vững lý thuyết nhưng thiếu cơ hội thực hành quy trình thẩm định đầu tư (**Due Diligence \- DD**) và đánh giá thương vụ thực tế, đặc biệt là các thương vụ startups cần có nhiều kiến thức chuyên môn và năng lực thực chiến.  
- Thiếu kỹ năng thực chiến trong việc phân tích nội tại doanh nghiệp, nhận diện rủi ro/bẫy tài chính (**Red Flags**), chất vấn ban điều hành và đưa ra quyết định đầu tư có cấu trúc đối với các startups. 

#### **2\. Target User**

- Sinh viên năm 3–4 chuyên ngành Tài chính \- Ngân hàng có định hướng phát triển sự nghiệp trong các lĩnh vực Quản lý quỹ (VC/PE), Ngân hàng đầu tư (IB) hoặc Phân tích tài chính.

#### **3\. User Task & Core Decision** 

- **Vai trò:** Nhà đầu tư mạo hiểm (Venture Capitalist \- VC) quản lý một quỹ đầu tư gồm nhiều deal.  
- **Quyết định cốt lõi:** *"Có nên đầu tư vào doanh nghiệp này không? Nếu có, rót bao nhiêu vốn với mức định giá/tỷ lệ cổ phần nào?"*

#### **4\. Difficulty** 

- Đánh giá cơ hội đầu tư trong điều kiện **bất cân thông tin** (*Information Asymmetry*) và **giới hạn nguồn lực** (vốn, số lượng câu hỏi chất vấn).  
- Phân biệt giữa lời Pitch quảng cáo hấp dẫn của Founder và năng lực tài chính/vận hành thực tế (bẫy tăng trưởng ảo, COGS ẩn, tỷ lệ mất khách hàng, burn rate,v.v).

#### **5\. Technology Support** 

- **Môi trường phát triển:** VS Code (dễ triển khai, dễ quản lý source code).  
- **Công nghệ Front-End:** HTML, CSS và Vanilla JavaScript (không dùng React để giảm phức tạp, phù hợp quy mô MVP, dễ sửa lỗi trực tiếp).  
- **Lưu trữ dữ liệu:** Browser Local Storage (lưu tiến trình game trên máy người chơi) \+ SQL Server/Database nội bộ (lưu trữ và đồng bộ dữ liệu thô của nhóm).  
- **Triển khai (Deployment):** GitHub Pages (miễn phí, tối ưu cho website tĩnh).  
- **Công cụ hỗ trợ AI:** ChatGPT / GitHub Copilot (hỗ trợ giải thích syntax, debug, tối ưu code nhưng không thay thế việc nắm vững source code của nhóm).  
- **Phương án dự phòng (Fallback):** Ưu tiên duy trì Core Game Flow, cắt giảm tính năng nâng cao nếu gặp sự cố kỹ thuật để đảm bảo demo hoàn chỉnh.

#### **6\. Input (Dữ liệu đầu vào của trò chơi)**

- **Pitching & Thông tin cơ bản:** Vấn đề, Giải pháp, Tổng quan mô hình kinh doanh.  
- **Thông tin ngành:** Quy mô thị trường (Market Size), Tốc độ tăng trưởng, Độ hấp dẫn của ngành.  
- **Báo cáo tài chính (Financial Statements):** Doanh thu, Chi phí, Lợi nhuận, Dòng tiền, Bảng cân đối kế toán của 5 Startup.  
- **Tương tác Q\&A:** Các câu hỏi chất vấn Founder do người chơi lựa chọn.

#### **7\. Financial Logic (Logic Tài chính & Thẩm định)**

- Phân tích Chỉ số & Sức khỏe tài chính: Gross Margin, Net Margin, Burn Rate, ROA, Cash to assets, Debt ratio, EPS, revenue to employees, revenue to account receivables
- Trong quá trình Due Diligence, nhà đầu tư tìm hiểu và cân nhắc theo thứ tự ưu tiên sau từ trái qua phải:
**Founder -> Market -> Business Model -> Financial Projection -> Valuation (risk & return)**
- Ma trận đánh giá 5 tiêu chí (Checklist): Quy mô ngành, Mô hình kinh doanh, Sức khỏe tài chính, Lợi thế cạnh tranh, Năng lực Founder.  
- Định giá & Phân bổ vốn: Cân đối giữa mức độ rủi ro (Red Flags phát hiện được) và tỷ lệ sinh lời kỳ vọng.

#### **8\. Output (Kết quả đầu ra)**

- **Quyết định Đầu tư**: Đối với mỗi công ty khởi nghiệp (startup), người chơi chọn Đầu tư hoặc Từ chối. Nếu chọn đầu tư, người chơi sẽ chọn số vốn phân bổ trong khoảng chi tiêu đã được quy định sẵn.
+ Hiệu suất Danh mục Đầu tư: Trò chơi báo cáo kết quả tài chính từ danh mục đầu tư của người chơi, bao gồm:
+ Phần trăm cổ phần nhận được (Equity)
+ Giá trị đầu tư và Tỷ suất sinh lời (ROI) cho từng startup
+ Số tiền mặt còn lại
+ Tổng lợi nhuận của toàn bộ danh mục đầu tư

- **Báo cáo Phản hồi Quyết định**: Báo cáo này phản ánh hành vi đưa ra quyết định của người chơi thay vì đánh giá quyết định đầu tư đó là đúng hay sai. Báo cáo bao gồm:
+ Mức độ Nhất quán giữa Đánh giá và Phân bổ: Độ tương quan/sự phù hợp giữa đánh giá theo bảng kiểm (checklist) cuối cùng và số vốn cam kết đầu tư.
+ Xu hướng Đầu tư: Các mô hình/xu hướng phân bổ vốn lặp đi lặp lại qua từng trường hợp.
+ Phản hồi dựa trên Bằng chứng: Các bằng chứng quan trọng trong từng trường hợp có thể cần xem xét lại dựa trên đánh giá cuối cùng của người chơi.

#### **9\. User Action (Hành động & Bài học của người chơi)**

- Xem lại Đánh giá Hiệu suất (Performance & Feedback) để rút ra bài học kinh nghiệm (*Lessons Learned*).  
- Nhận diện các điểm mù/dấu hiệu rủi ro bị bỏ lỡ trong quá trình thẩm định.  
- Rèn luyện tư duy quản trị rủi ro và hình thành phương pháp thẩm định có hệ thống thay vì đầu tư theo cảm tính.

