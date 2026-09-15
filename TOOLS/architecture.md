# Kiến trúc bước 4

## Luồng xử lý
app.js đọc config và case, gọi loadState để khôi phục lượt chơi. ui.js hiển thị trạng thái. Người chơi tương tác; app.js kiểm tra trạng thái khóa, gọi engine khi cần, cập nhật state rồi lưu.

## Trạng thái
- screen: home, pitch, documents, dialogue, decision hoặc report.
- answers: object theo ID checklist, chỉ có true/false cho câu đã trả lời.
- decision: null, invest hoặc reject.
- amount: tiền đầu tư theo đơn vị case deal.unit; reject là 0.
- committed: khóa checklist/decision sau xác nhận.
- result: tính bằng engine từ committed inputs; không lưu như nguồn sự thật.
- history: nội dung được tái tạo từ các choice ID gốc khi khôi phục.

## Tiền tệ
BCTC và offer có metadata riêng. Không dùng financials.unit để tự định giá thương vụ.
Giá tiền cho một tỷ lệ equity = referenceInvestment / referenceEquity.
Vốn đầu tư bằng tiền thật của deal = amount × deal.unit.
Vốn quy đổi sang quỹ = vốn đầu tư bằng tiền thật × dealToFundRate.
Nếu tiền tệ quỹ và deal giống nhau, tỷ giá là 1.
Thiếu tỷ giá khi hai tiền tệ khác nhau thì chặn Invest; không chặn Reject.

## Tính kết quả
Profit = investedFund × ROI.
Recovered = investedFund + profit.
Uninvested = initialCapital − investedFund.
FinalCapital = uninvested + recovered.
PortfolioReturn = profit / initialCapital.
ChecklistAccuracy = correct / total × 100.
Overall = checklistWeight × ChecklistAccuracy + returnWeight × ReturnScore.
Không chiết khấu khi chưa có kỳ hạn. ROI là số tổng kỳ, không phải annual ROI.
Đáp án đầu tư Reject trong caseAnalysis là quan điểm của designer, không là điểm đúng/sai cộng thêm.

## Quy tắc chấm điểm
Bảng README được diễn giải thành các khoảng liên tục, xét từ trên xuống, không làm tròn return trước khi so ngưỡng.
Ví dụ 16,875% → 60 điểm, sửa lỗi số học trong ví dụ README (40 điểm).
Phân hạng Overall theo ngưỡng 85, 70, 50, 30; dùng điểm chưa làm tròn.

## Lưu dữ liệu
Local Storage theo origin và storageKey. Signature gồm toàn bộ config và case để không áp kết quả cũ vào nội dung mới. Save hỏng hoặc khác phiên bản tạo lượt mới và thông báo. Nếu trình duyệt cấm lưu, game vẫn hoạt động trong bộ nhớ, kèm cảnh báo mất tiến trình khi tải lại.

## Phạm vi một case
Engine dùng initial capital là vốn khả dụng cho Plantfish. Chưa triển khai danh mục nhiều case hoặc tái đầu tư tiền thu hồi. Sidebar sau xác nhận hiển thị vốn chưa đầu tư; Report hiển thị giá trị quỹ cuối kỳ.

## Đính chính đang áp dụng
Quỹ USD 100 triệu; deal USD 2 triệu cho 20%; equity tối thiểu 10%, tối đa 20%; bước 1 điểm phần trăm. investmentStep = 100 theo đơn vị nghìn USD, tương ứng USD 100.000. Không dùng tỷ giá cho case này; hàm quy đổi tổng quát vẫn có thể phục vụ case khác về sau.

## Bước 5
Chuyển từ ES modules sang classic scripts để hỗ trợ file://. Mỗi file dùng IIFE và window.PitchLedger; index.html nạp data trước, engine/state/ui tiếp theo, app cuối cùng. Không có build step hoặc dữ liệu nhân bản trong bundle.
ui.js mountPages dùng CSS multi-column để phân trang theo chiều cao thực tế; ResizeObserver cập nhật khi cửa sổ thay đổi và sự kiện toggle cập nhật khi mở feedback. Page controls nằm ngoài vùng nội dung, không dịch chuyển theo trang.
Kiểm thử logic nạp các classic script bằng Node VM. Logic tính toán, schema dữ liệu và điều khoản không đổi.
