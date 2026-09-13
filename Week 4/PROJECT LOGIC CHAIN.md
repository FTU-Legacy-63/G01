#### Project Logic Chain

#### 1. Problem

- Sinh viên Tài chính năm 3–4 nắm vững lý thuyết nhưng thiếu cơ hội thực hành quy trình thẩm định đầu tư (**Due Diligence - DD**) và đánh giá thương vụ thực tế, đặc biệt là các thương vụ startups cần có nhiều kiến thức chuyên môn và năng lực thực chiến.
- Thiếu kỹ năng thực chiến trong việc phân tích nội tại doanh nghiệp, nhận diện rủi ro/bẫy tài chính (**Red Flags**), chất vấn ban điều hành và đưa ra quyết định đầu tư có cấu trúc đối với các startups.

#### 2. Target User

- Sinh viên năm 3–4 chuyên ngành Tài chính - Ngân hàng có định hướng phát triển sự nghiệp trong các lĩnh vực Quản lý quỹ (VC/PE), Ngân hàng đầu tư (IB) hoặc Phân tích tài chính.

#### 3. User Task & Core Decision

- **Vai trò:** Nhà đầu tư mạo hiểm (Venture Capitalist - VC) quản lý một quỹ đầu tư gồm nhiều deal.
- **Quyết định cốt lõi:** *"Có nên đầu tư vào doanh nghiệp này không? Nếu có, phân bổ bao nhiêu vốn trong các investment–equity terms đã định trước?"*

#### 4. Difficulty

- Đánh giá cơ hội đầu tư trong điều kiện **bất cân thông tin** (*Information Asymmetry*) giữa Founder và người chơi.
- Phân biệt giữa lời Pitch quảng cáo hấp dẫn của Founder và năng lực tài chính/vận hành thực tế (bẫy tăng trưởng ảo, COGS ẩn, tỷ lệ mất khách hàng, burn rate,v.v).

#### 5. Technology Support

- **Môi trường phát triển:** VS Code (dễ triển khai, dễ quản lý source code).
- **Công nghệ Front-End:** HTML, CSS và Vanilla JavaScript (không dùng React để giảm phức tạp, phù hợp quy mô MVP, dễ sửa lỗi trực tiếp).
- **Lưu trữ dữ liệu:** Browser Local Storage (lưu tiến trình game trên máy người chơi) + SQL Server/Database nội bộ (lưu trữ và đồng bộ dữ liệu thô của nhóm).
- **Triển khai (Deployment):** GitHub Pages (miễn phí, tối ưu cho website tĩnh).
- **Công cụ hỗ trợ AI:** ChatGPT / GitHub Copilot (hỗ trợ giải thích syntax, debug, tối ưu code nhưng không thay thế việc nắm vững source code của nhóm).
- **Phương án dự phòng (Fallback):** Ưu tiên duy trì Core Game Flow, cắt giảm tính năng nâng cao nếu gặp sự cố kỹ thuật để đảm bảo demo hoàn chỉnh.

#### 6. Input (Dữ liệu đầu vào của trò chơi)

- **Pitching & Thông tin cơ bản:** Vấn đề, Giải pháp, Tổng quan mô hình kinh doanh.
- **Thông tin ngành:** Quy mô thị trường (Market Size), Tốc độ tăng trưởng, Độ hấp dẫn của ngành.
- **Thông tin doanh nghiệp:** Mô hình kinh doanh, sơ lược về lãnh đạo.
- **Báo cáo tài chính (Financial Statements):** Doanh thu, Chi phí, Lợi nhuận, Dòng tiền, Bảng cân đối kế toán của 3 Startup.
- **Tương tác Q&A:** Các câu hỏi chất vấn Founder do người chơi lựa chọn.

#### 7. Financial Logic (Logic Tài chính & Thẩm định)

- Trong quá trình DD, nhà đầu tư nên tìm hiểu và cân nhắc theo thứ tự ưu tiên sau từ trái qua phải:

**Founder’s Pitch -> Industry Information -> Company Overview -> Financial Statements -> Q&A with Founder**

- **Founder’s Pitch:** Người chơi tìm hiểu về luận điểm của chủ doanh nghiệp, về sản phẩm của doanh nghiệp và mục đích của sản phẩm đó.
- **Industry Information:** Người chơi có thể tìm kiếm thông tin về triển vọng ngành của doanh nghiệp.
- **Company Overview:** Sơ lược về doanh nghiệp và ban lãnh đạo.
- **Financial Statements:** Bộ 3 bản báo cáo tài chính giúp người chơi định hình sức khỏe tài chính và triển vọng phát triển của doanh nghiệp.
- **Q&A with Founder:** Người chơi tìm hiểu thêm về doanh nghiệp thông qua màn đối chất với chủ doanh nghiệp.

* **Checklist:** Dựa vào input game cung cấp, người chơi trả lời những câu hỏi Yes/No liên quan tới các khía cạnh then chốt của một doanh nghiệp để đưa ra quyết định đầu tư.
* **Phân bổ vốn:** Dựa trên quá trình DD được người chơi thực hiện, họ quyết định có đầu tư không và nếu có thì đầu tư bao nhiêu trong mức cho phép và so với tổng số tiền sở hữu (Initial Capital).

#### 8. Output (Kết quả đầu ra)

**Báo cáo kết quả đầu tư:** Sau khi hoàn thành trò chơi, người chơi nhận được báo cáo kết quả đầu tư, bao gồm:

- **Lựa chọn đầu tư đã thực hiện:** Đối với mỗi công ty, hiển thị lựa chọn đầu tư và từ chối. Nếu lựa chọn đầu tư, hiển thị số vốn phân bổ.
- **Hiệu suất danh mục đầu tư:** Giá trị từng khoản đầu tư và số vốn còn lại; ROI của từng khoản đầu tư và của toàn bộ danh mục.
- **Checklist Accuracy:** Mức độ người chơi xác định đúng đặc điểm và rủi ro của startup dựa trên thông tin được cung cấp.
- **Đánh giá tổng quan:** Dựa vào Overall Performance Score để phân loại người chơi theo các cấp độ *hình tượng cá (\*)*. Feedback dựa trên hiệu suất đầu tư và checklist accuracy.

#### 9. User Action (Hành động & Bài học của người chơi)

- Xem lại Đánh giá Hiệu suất (Performance & Feedback) để rút ra bài học kinh nghiệm (*Lessons Learned*).
- Nhận diện các điểm mù/dấu hiệu rủi ro bị bỏ lỡ trong quá trình thẩm định.
- Rèn luyện tư duy quản trị rủi ro và hình thành phương pháp thẩm định có hệ thống thay vì đầu tư theo cảm tính.
