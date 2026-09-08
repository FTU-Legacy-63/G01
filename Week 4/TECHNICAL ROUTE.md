## **Technical Readiness**

Nhóm lựa chọn một technical stack đơn giản và phù hợp với quy mô của MVP, ưu tiên khả năng tự phát triển, dễ sửa lỗi và dễ triển khai thay vì sử dụng nhiều công nghệ phức tạp.

### **1\. Coding Environment**

Visual Studio Code (VS Code) sẽ được sử dụng làm môi trường phát triển chính.

* Ưu điểm: miễn phí, phổ biến, hỗ trợ tốt HTML, CSS và JavaScript; có nhiều extension hỗ trợ debugging và quản lý project.  
* Hạn chế: cần cài đặt và cấu hình một số extension nếu muốn có thêm tính năng hỗ trợ.  
* Chi phí: miễn phí.  
* Khả năng nhóm tự sửa: cao, do code có cấu trúc đơn giản và các thành viên có thể truy cập trực tiếp vào source code.  
* Deployment: có thể kết hợp với GitHub để quản lý source code và deploy website.

### **2\. Framework / Programming Language**

Đối với MVP, nhóm dự kiến sử dụng HTML, CSS và JavaScript thuần (Vanilla JavaScript) thay vì sử dụng framework phức tạp như React.

* HTML: xây dựng cấu trúc của game.  
* CSS: thiết kế giao diện và layout.  
* JavaScript: xử lý game logic, lựa chọn đầu tư, tính toán kết quả và chuyển đổi giữa các màn chơi.

Lý do lựa chọn: Game có quy mô tương đối nhỏ và chủ yếu là giao diện tương tác cùng logic theo các nhánh lựa chọn. Vanilla JavaScript giúp nhóm giảm thời gian học framework và dễ hiểu toàn bộ source code.

Hạn chế: khi project trở nên lớn và có nhiều component hoặc trạng thái phức tạp, việc quản lý code bằng Vanilla JavaScript có thể khó hơn so với framework như React.

### **3\. Data Storage**

Vì tính đơn giản của game, nhóm ưu tiên sử dụng Browser Local Storage cho game. Các dữ liệu đã xử lý được sử dụng trong game (Company Profiles) sẽ được lưu trữ trực tiếp trong một arrow function của file Javascript. Tổng hợp dữ liệu thô mà các thành viên làm việc với nhau sẽ được lưu trữ thông qua một server SQL

Ưu điểm: đơn giản, miễn phí và không cần xây dựng database/server cho MVP.

Hạn chế: dữ liệu chỉ được lưu trên thiết bị/trình duyệt của người chơi và không phù hợp nếu sau này cần user accounts, multiplayer hoặc thu thập dữ liệu từ nhiều người chơi.

### **4\. Deployment Platform**

Nhóm dự kiến sử dụng GitHub Pages để deploy phiên bản MVP.

* Ưu điểm: miễn phí, phù hợp với website tĩnh sử dụng HTML/CSS/JavaScript.  
* Dễ kết hợp với GitHub repository.  
* Có thể cập nhật website trực tiếp sau khi push phiên bản mới.  
* Không yêu cầu thiết lập server riêng.

Hạn chế: phù hợp nhất với static website và không cung cấp backend/database server đầy đủ. Nếu project sau này yêu cầu backend hoặc database online, nhóm có thể chuyển sang các nền tảng như Vercel, Netlify hoặc Firebase.

### **5\. AI-Assisted Coding**

Nhóm có thể sử dụng ChatGPT / GitHub Copilot như công cụ hỗ trợ trong quá trình development.

AI sẽ được sử dụng để:

* giải thích syntax và programming concepts;  
* hỗ trợ debug;  
* đề xuất cách triển khai một chức năng;  
* tạo boilerplate code;  
* hỗ trợ tối ưu hoặc refactor code.

Tuy nhiên, AI không được xem là nguồn thay thế cho việc hiểu code của nhóm. Thành viên phụ trách coding cần kiểm tra, hiểu và có khả năng chỉnh sửa code do AI đề xuất. Điều này đặc biệt quan trọng đối với MVP vì nhóm cần có khả năng tự xử lý lỗi trong quá trình demo và presentation.

### **6\. Fallback Plan**

Trong trường hợp một số chức năng kỹ thuật không thể hoàn thành đúng thời hạn, nhóm sẽ ưu tiên duy trì core game flow thay vì bổ sung các tính năng nâng cao. Như vậy, ngay cả khi gặp vấn đề về technical implementation, nhóm vẫn có thể đảm bảo một functional MVP có thể chạy và demo được.