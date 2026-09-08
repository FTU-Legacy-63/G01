**INPUT DICTIONARY** 

| Output Component | Description |
| ----- | ----- |
| Khả năng nhận diện rủi ro/ red flags  | Evaluates the player's acumen in identifying core operational risks and financial statement traps (red flags)—such as artificial revenue growth, hidden COGS, negative cash flow, or unsustainable burn rates—through their question selections during the Investigation (Q\&A) phase and their final Checklist evaluation. |
| Capital allocation  | Đánh giá tư duy quản trị rủi ro và hiệu quả sử dụng nguồn vốn của người chơi, thể hiện qua việc quyết định quy mô vốn rót có phù hợp với mức độ rủi ro đã thẩm định của từng doanh nghiệp hay không |

| Input name | Meaning | Type | Unit | Example | Valid range | Source/owner |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| Capital Investment | Số lượng vốn người chơi quyết định đầu tư trong 1 vòng | Float | VND | 1,000,000,000 | 0 $\leq $ x $\leq $ %equity \* price per %equity | User Input |
| Max %equity | Phần trăm equity tối đa mà người chơi được phép mua của 1 công ty | Float | % | 10% | 0 \- 25% |  |
| Price per %equity | Mệnh giá của 1% vốn của công ty | Float | VND | 1,000,000 | Được quyết định bởi developer |  |
| %return | Phần trăm gia tăng giá trị vốn của công ty | Float | % | 5% | Range sẽ được quyết định bởi developer dựa vào thống kê real data |  |
| current\_ratio | Current ratio | Float | Ratio | 1.5 | 0 \- 10 | Vnstock library / Financial Statements |
| quick\_ratio | Quick ratio | Float | Ratio | 1.5 | 0 \- 10 | Vnstock library / Financial Statements |
| cash\_ratio | Cash ratio | Float | Ratio | 1.5 | 0 \- 10 | Vnstock library / Financial Statements |
| debt\_ratio | Debt ratio | Float | Ratio | 1.5 | 0 \- 10 | Vnstock library / Financial Statements |
| long-term\_debt\_ratio | Long-term debt ratio | Float | Ratio | 1.5 | 0 \- 10 | Vnstock library / Financial Statements |
| debt/equity\_ratio | debt/equity ratio | Float | Ratio | 1.5 | 0 \- 10 | Vnstock library / Financial Statements |
| total\_asset\_turnover\_ratio | Total asset turnover ratio | Float | Ratio | 1.5 | 0 \- 10 | Vnstock library / Financial Statements |
| fixed\_asset\_turnover\_ratio | Fixed asset turnover ratio | Float | Ratio | 1.5 | 0 \- 10 | Vnstock library / Financial Statements |
| average\_collection\_period | Average collection period | Float | Ratio | 1.5 | 0 \- 10 | Vnstock library / Financial Statements |
| inventory\_turnover\_ratio | Inventory turnover ratio | Float | Ratio | 1.5 | 0 \- 10 | Vnstock library / Financial Statements |
| profit\_margin | Profit margin | Float | Ratio | 1.5 | 0 \- 10 | Vnstock library / Financial Statements |
| return\_on\_assets | Return on assets | Float | Ratio | 1.5 | 0 \- 10 | Vnstock library / Financial Statements |
| return\_on\_equity | Return on equity | Float | Ratio | 1.5 | 0 \- 10 | Vnstock library / Financial Statements |
| pe\_ratio | price/earnings ratio | Float | Ratio | 1.5 | 0 \- 10 | Vnstock library / Financial Statements |
| pb\_ratio | Market-to-book ratio | Float | Ratio | 1.5 | 0 \- 10 | Vnstock library / Financial Statements |

