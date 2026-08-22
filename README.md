# PITCH & LEDGER – GAME SIMULATION

## Thành viên nhóm

| Thành viên          | Mã sinh viên |
| ------------------- | ------------ |
| Nguyễn Thị Kiều Anh | 2412380009   |
| Phùng Khánh Linh    | 2412380028   |
| Nguyễn Minh Trang   | 2412380050   |
| Hoàng Minh Nhật     | 2412380039   |
| Lê Đắc Phú Minh     | 2412380030   |

---

## Các Problem Candidates

### 1. Pitch & Ledger – Shark Tank Simulation *(Selected)*

**Target User:**
Học sinh, sinh viên các khối ngành Kinh tế/Tài chính/Quản trị và các nhà đầu tư cá nhân mới gia nhập thị trường.

**Task / Decision:**
Thực hành thẩm định doanh nghiệp, luyện tập đọc báo cáo tài chính, học cách quản lý dòng tiền, trải nghiệm các kịch bản đầu tư rủi ro.

**Difficulty:**

* **Specific:**
  Nhiệm vụ là thẩm định 6 thương vụ; quyết định **Deal / Reject / Offer**. Khó ở bất đối xứng thông tin và các bẫy BCTC.

* **Relevant:**
  Chuyên môn tài chính gồm:

  * Đọc BCTC
  * Unit Economics
  * Burn Rate
  * Runway
  * Định giá
  * Thẩm định đầu tư

* **Meaningful:**
  Rèn luyện kỹ năng thực hành phân tích doanh nghiệp và tư duy hoài nghi số liệu cho sinh viên / F0.

* **Supportable:**
  Logic dạng tĩnh (turn-based rời rạc). Mỗi startup là một file độc lập, tính toán trừ điểm IP và P/S không quá khó để code.

* **Feasible:**
  Chưa chắc về việc liệu data có access được không và có đủ data để xây game không.

  Kiến trúc game dạng các vòng độc lập gồm 6 module startup. Coder chỉ cần viết một khung giao diện mẫu, sau đó nạp data của từng startup vào.

**Financial Relevance:**
Nghiệp vụ tài chính doanh nghiệp và đầu tư mạo hiểm:

* Corporate Finance
* Valuation
* Financial Statement Analysis

**Problem:**
Các nhà đầu tư mới hoặc sinh viên thường nắm vững lý thuyết nhưng thiếu kỹ năng thực hành thẩm định dự án để đưa ra quyết định đầu tư.

Họ dễ bị thuyết phục bởi những dự án hay, hoành tráng, hình thức đẹp mắt hoặc các chỉ số ảo mà không biết cách đối chiếu với các thông tin khác như báo cáo tài chính và nội tại doanh nghiệp.

Họ thường đầu tư theo cảm tính và đến khi dự án không thành công, họ có thể chịu khoản lỗ lớn và phải rút khỏi thị trường.

---

### 2. Lifevest – Personal Financial Management

**Target User:**
Gen Z, người đi làm không có hiểu biết nhiều về tài chính và đầu tư nhưng muốn tham gia thị trường để tăng thêm thu nhập từ dòng tiền nhàn rỗi.

Có thể phát triển thành công cụ hỗ trợ broker tại các công ty chứng khoán.

**Task / Decision:**

* Quản lý dòng tiền cá nhân.
* Phản ứng trước các biến cố như:

  * Kinh tế đóng băng / khủng hoảng như COVID-19
  * Bệnh tật
  * Lập gia đình
  * Các biến cố tài chính bất ngờ
* Phân bổ tài sản vào:

  * Cổ phiếu
  * Trái phiếu
  * Quỹ đầu tư mạo hiểm
  * Quỹ hưu trí
  * Các tài sản khác

**Difficulty:**

* **Specific:**
  Task khá rộng, bao gồm cả đời sống, hôn nhân, y tế và đầu tư. Target user bị phân mảnh giữa B2C (Gen Z) và B2B (Broker).

* **Relevant:**
  Thuộc lĩnh vực Tài chính cá nhân và Tài chính hành vi.

* **Meaningful:**
  Giúp người trẻ nhận thức tầm quan trọng của:

  * Quỹ dự phòng
  * Quản lý dòng tiền
  * Phân bổ tài sản
  * Chuyển dịch tài sản khi về già

* **Supportable:**
  State management phức tạp vì các biến số đời sống ở tuổi 20 có thể ảnh hưởng đến tuổi 60, dễ phát sinh lỗi dây chuyền.

* **Feasible:**
  Dễ bị **scope creep** do sa đà vào việc viết các kịch bản drama đời sống thay vì tập trung vào tài chính.

**Financial Relevance:**
Thuộc mảng Tài chính cá nhân và kinh tế vĩ mô. Tuy nhiên, tính chất kỹ thuật tài chính tương đối thấp.

---

### 3. Green Finance & ESG Rating Platform

**Tên:**
**Green Finance & ESG Rating Platform – Nền tảng thẩm định ESG & định giá tài chính xanh**

**Target User:**

* **Đối tượng chính:**

  * Chuyên viên Phân tích
  * Chuyên viên Ngân hàng Đầu tư (IB) tại các Công ty Chứng khoán
  * Bộ phận Thẩm định Tín dụng Xanh tại các Ngân hàng Thương mại

* **Đối tượng thứ cấp:**

  * Doanh nghiệp niêm yết / SMEs
  * Giới nghiên cứu
  * Giảng viên
  * Học viên Tài chính cần bộ dữ liệu ESG chuẩn hóa tại Việt Nam

**Task / Decision:**
Thu thập và đối chiếu dữ liệu Báo cáo tài chính 3 bảng với các chỉ số phi tài chính:

* Môi trường (Environmental)
* Xã hội (Social)
* Quản trị (Governance)

Đồng thời:

* Quét các tín hiệu **Greenwashing**
* Đánh giá rủi ro địa chính trị
* Đánh giá rủi ro đứt gãy chuỗi cung ứng
* Đối chiếu với các chuẩn quốc tế:

  * GRI
  * ISSB
  * SASB
  * CBAM
  * EUDR

**Difficulty / Problem:**

### Bất đối xứng thông tin & Dữ liệu phân tán

Dữ liệu ESG và dữ liệu tài chính thường nằm ở nhiều nguồn khác nhau và chưa được chuẩn hóa.

### Rủi ro Greenwashing

Doanh nghiệp có thể công bố các thông tin ESG tích cực nhưng không phản ánh đầy đủ thực trạng hoạt động.

### Đứt gãy giữa dữ liệu ESG & tài chính

Thiếu công cụ quy đổi các chỉ số ESG, chẳng hạn lượng phát thải Carbon, thành **con số tác động trực tiếp lên BCTC 3 bảng và dòng tiền (Cash Flow)**.

**Financial Relevance:**

* Tích hợp ESG Rating giúp CTCK tiếp cận nguồn vốn từ các Quỹ đầu tư tác động (Impact Investing).
* Nâng tầm báo cáo phân tích.
* Thúc đẩy dịch vụ IB.
* Hỗ trợ tín dụng xanh.
* Cải thiện quản trị rủi ro chuỗi cung ứng.

**Feasibility:**
Khả thi ở mức trung bình.

Có thể thu hẹp scope vào việc xây dựng **Model thẩm định & Chấm điểm ESG Scorecard tích hợp BCTC 3 bảng** cho các doanh nghiệp niêm yết đại diện cho các ngành xuất khẩu chủ lực.

Tuy nhiên, việc tiếp cận dữ liệu cần thời gian và yêu cầu độ chính xác cao.

---

### 4. Grow a Tree

**Target User:**
Bất kỳ ai muốn luyện tập ra quyết định trong bối cảnh môi trường bất định mà không muốn trải nghiệm sự "khô khan" của tài chính.

**Task:**

* Monitor sự sống của cây.
* Thu thập dữ liệu liên quan tới:

  * Sự sống của cây
  * Môi trường xung quanh

**Decision:**

* Allocate bao nhiêu nước?
* Allocate bao nhiêu phân bón?
* Có sử dụng vật phẩm phòng ngừa thiên tai không?
* Có mua đồ từ cửa hàng không?
* Có mua dự báo thời tiết không?

**Difficulty:**

* Không biết tương lai cửa hàng sẽ cung cấp những vật phẩm gì.
* Không biết chính xác hiện tại cây còn bao nhiêu sự sống.
* Không biết chính xác ngày mai thời tiết sẽ như thế nào.
* Không biết chính xác đặc tính của từng loại cây.

**Financial Relevance:**

Game có các yếu tố tương đồng với vấn đề tài chính:

* Nguồn lực hữu hạn:

  * Sự sống của cây
  * Nước
  * Phân bón
* Có sự không chắc chắn.
* Các quyết định ảnh hưởng đến sự sống của cây.
* Một số quyết định mang tính **irreversible**.

**Feasibility:**

* Nhóm có thể giải quyết một phần có ý nghĩa trong 7 tuần: khả năng cao là có.
* Có thể tập trung vào việc luyện tập ra quyết định trong bối cảnh tương lai bất định.
* Có thể thu hẹp user, task và context.
* Không cần hệ thống hoặc dữ liệu mà nhóm không thể tiếp cận.
* Game giúp người chơi hoàn thiện decision-making process thay vì phụ thuộc vào số liệu thực tế.

---

## Target User được lựa chọn

Người dùng chúng tôi hướng đến là **những nhà đầu tư mới gia nhập thị trường**.

Họ là những người còn thiếu kiến thức và kinh nghiệm trong việc sử dụng các thông tin công khai sẵn có để nghiên cứu nền tảng của các công ty và đưa ra quyết định đầu tư đúng đắn.

---

## User Task / Decision

Người chơi sẽ **navigate trong số những nguồn thông tin được cung cấp về một doanh nghiệp** để đưa ra quyết định mấu chốt:

> **Đầu tư hay không, và nếu đầu tư thì đầu tư bao nhiêu?**

---

## Draft Problem Statement

> **Target user gặp khó khăn trong việc lựa chọn đầu tư hay không đầu tư, và nếu đầu tư thì đầu tư bao nhiêu trong bối cảnh nguồn vốn hữu hạn, thông tin bất cân xứng và tương đối nhiều thông tin để xử lý.**

---

## Vì sao đây là vấn đề tài chính hoặc ngân hàng?

Vì một trong những vấn đề cốt lõi của tài chính là **cân đối giữa rủi ro và lợi nhuận**.

Điều này xuất phát từ hệ quả của hai yếu tố:

1. **Tài nguyên là hữu hạn.**
2. **Những lựa chọn thường không thể được lựa chọn lại.**

Do đó, người ra quyết định cần đánh giá thông tin, cân nhắc rủi ro – lợi nhuận và quyết định cách phân bổ nguồn vốn hữu hạn.

---

## Đóng góp của từng thành viên

| Thành viên              | Đóng góp                                                                                                                |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Nguyễn Thị Kiều Anh** | Tìm, mô tả và xác định data cho candidate 3; xác định tính khả thi của candidate 3; tổng hợp README và ghi decision log |
| **Phùng Khánh Linh**    | Tìm, mô tả và xác định data cho candidate 4; xác định tính khả thi của candidate 4                                      |
| **Nguyễn Minh Trang**   | Đánh giá tính khả thi; tìm và mô tả candidate 1, 2 (2 game simulation được lựa chọn)                                    |
| **Hoàng Minh Nhật**     | Phân tích target user; viết user task & decision                                                                        |
| **Lê Đắc Phú Minh**     | Xác định draft problem statement & finance – banking relevance của đề tài lựa chọn                                      |

---

# Feedback từ Checkpoint

### Feedback 1

Ý tưởng **Pitch & Ledger** có tính thực tiễn tốt khi đánh đúng vào tâm lý F0 / sinh viên thiếu kinh nghiệm thực hành thẩm định.

Tuy nhiên, cần đảm bảo giữ trọng tâm vào **toán tài chính**, đặc biệt:

* Đọc BCTC 3 bảng
* Burn Rate
* Định giá

Thay vì sa đà vào tính giải trí thuần túy.

### Feedback 2

Cần kiểm soát chặt chẽ scope dữ liệu trong 7 tuần.

Tránh mở quá nhiều tính năng phức tạp như **Chatbot AI tự do cho Founder**, khiến kịch bản bị lệch khỏi các công thức kiểm tra tài chính cốt lõi.

---

# Revision sau Checkpoint

### Nội dung đã thay đổi

Chuyển toàn bộ tương tác thẩm định với Founder sang dạng **Cây câu hỏi trắc nghiệm nhánh (Preset Decision Trees)** để kiểm soát 100% tính chính xác của các chỉ số BCTC và bẫy tài chính.

### Lý do thay đổi

Tiếp thu phản hồi từ checkpoint để:

* Đảm bảo hàm lượng chuyên môn tài chính doanh nghiệp.
* Tránh lỗi hệ thống khi kiểm thử.
* Đảm bảo tính khả thi cao trong 7 tuần.

### Evidence / Commit

Updated `README.md` (bản hiện tại và giữ nguyên những ý tưởng đã chốt).

---

# Decision

**Quyết định: Keep – Idea Pitch & Ledger**

Giữ nguyên:

* Problem Statement
* Target User
* User Task / Decision

Đồng thời thu hẹp scope sản phẩm về **kịch bản đóng gồm 5–6 thương vụ thẩm định chuẩn hóa**.

---

# Open Questions for Week 2

## 1. Main Output

**Main output cụ thể của sản phẩm là gì?**

Game hướng tới giá trị gì riêng biệt và có thể áp dụng cho thực tiễn, ngoài việc:

* Giảng dạy
* Giải trí
* Cung cấp kiến thức
* Mang lại cơ hội trải nghiệm cho người tham gia?

## 2. Product Pattern

**Product pattern nào phù hợp nhất với main output đó?**

Cần xác định dạng sản phẩm / interaction pattern phù hợp để truyền tải giá trị cốt lõi của Pitch & Ledger.

## 3. MVP

**MVP tối thiểu nào vẫn giữ được giá trị cốt lõi của user task?**

MVP cần đảm bảo người chơi vẫn có thể:

1. Tiếp nhận thông tin về doanh nghiệp.
2. Phân tích các thông tin tài chính quan trọng.
3. Nhận diện các dấu hiệu rủi ro / bẫy tài chính.
4. Đưa ra quyết định đầu tư.
5. Quyết định mức vốn đầu tư trong điều kiện nguồn lực hữu hạn.
