# INPUT - LOGIC - OUTPUT MAPPING

| **Input** | **Financial meaning** | **Rule / Calculation / Process** | **Output** |
|---|---|---|---|
| `net_margin` | Overall profit retained per dollar of sales after all operational, financial, and tax expenses | Compare against industry benchmark<br><br>Net income / Revenue | **Net profitability status — Bottom-line Health:**<br>• `< Benchmark`: "High Burn / Unprofitable"<br>• `≥ Benchmark`: "Healthy Bottom-line" |
| `gross_margin` | Product profitability & pricing power | Compare against industry benchmark<br><br>Gross profit / Revenue | **Cost Control Status:**<br>• `< Benchmark`: "Abnormal / High Cost"<br>• `≥ Benchmark`: "Healthy Margin"<br><br>**Chart:** Startup GM vs. Industry Median |
| `return_on_assets` | Asset utilization efficiency | Net income / Total assets | **Asset efficiency rating:**<br>• `< Benchmark`: "Capital-Intensive / Low Turnover"<br>• `≥ Benchmark`: "Asset-Light / High Efficiency" |
| `earnings_per_share` | Earnings per share & equity return | Compare EPS against target funding valuation | **Valuation fairness:**<br>• `< Benchmark`: "Fair"<br>• `≥ Benchmark`: "Overpriced" |
| `revenue_per_employees` | Workforce productivity and operational revenue generation per employee | Revenue / Total headcounts (FTEs)<br><br>Compare against peer median | **Human Capital Productivity:**<br>• `< Benchmark`: "Overstaffed / Low Productivity"<br>• `≥ Benchmark`: "High Operational Efficiency" |
| `cash_to_assets` | Immediate liquidity reserve ratio relative to the total asset base | Cash & cash equivalents / Total assets<br><br>Compare Cash/Assets vs. **Benchmark_Liquidity** & check **Runway < 6 months** | **Liquidity Risk Level:**<br>• Runway `< 6m`: "Liquidity Distress / Insolvency Risk"<br>• Runway `≥ 6m`: "Safe Operational Runway" |
| `revenue_to_account_receivables` | Asset management efficiency and speed of credit collection | Revenue / Account receivables<br><br>Compare with Industry Days Sales Outstanding (DSO) | **Working Capital Health:**<br>• DSO `>` Benchmark: "Working Capital Lock / Cash Trap"<br>• DSO `≤` Benchmark: "Fast Cash Conversion" |
| `debt_ratio` | Structural financial leverage and proportion of debt-financed assets | Total debt / Total assets<br><br>Compare with Startup Sector Capital Structure | **Leverage Risk:**<br>• `> Benchmark`: "Over-leveraged / High Financial Risk"<br>• `≤ Benchmark`: "Conservative Capital Structure" |

---

# MASTER LOOK-UP TABLE FOR BACKEND / JAVASCRIPT

| **Chỉ số (Metric)** | **F&B** | **Pharmacy** | **Software / IT** | **AI (Artificial Intelligence)** | **E-commerce** |
|---|---|---|---|---|---|
| **Gross Margin** | 60% – 70% | 65% – 80% | 70% – 85% | 50% – 70% | 30% – 50% |
| **Net Margin** | 5% – 15% | 12% – 22% | 15% – 25% | **-20% – 15%** | 3% – 10% |
| **ROA** | 10% – 20% | 8% – 15% | > 15% *(Asset-light)* | **10% – 20%** | 8% – 15% |
| **Rev per FTE** | $30k – $50k | $150k – $300k | $100k – $200k | **$250k – $500k+** | $80k – $150k |
| **DSO** | `≤` 15 – 30 ngày | 60 – 90 ngày *(Kênh bệnh viện/đại lý)* | 30 – 45 ngày | **`≤` 0 – 30 ngày**<br>*(B2C/SaaS AI trả trước qua thẻ; B2B 30–45 ngày)* | `≤` 7 – 14 ngày *(COD/Ví)* |
| **Debt Ratio** | 40% – 50% | 20% – 30% | 10% – 20% | 10% – 30% | 30% – 40% |
| **EPS & P/E Multiple** | P/E: 12x – 18x<br>• EPS dương & ổn định | P/E: 15x – 25x<br>• EPS thấp giai đoạn R&D | P/E: 20x – 35x<br>• EPS tăng trưởng do scale | P/E: 30x – 60x+ *(hoặc P/S 15x–30x)*<br>• EPS thường âm giai đoạn đầu<br>• Định giá theo ARR / Compute efficiency | P/E: 15x – 25x<br>• EPS biên mỏng |
| **Đặc điểm mô hình** | Lợi nhuận phụ thuộc vị trí & quản trị NL. | Chi phí R&D cao, chu kỳ thu hồi tiền lâu nhưng Gross Margin lớn. | Asset-light, chi phí biến đổi thấp, khả năng mở rộng (Scale) nhanh. | Chi phí vận hành Cloud/GPU/Model Training cực cao; tăng trưởng doanh thu nhanh nhưng Gross Margin chịu áp lực nặng từ chi phí hạ tầng (Inference Cost). | Biên mỏng, phụ thuộc chi phí Marketing (CAC) và kho vận. |
