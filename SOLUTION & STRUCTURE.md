# **SOLUTION STRUCTURE**

## **1\. Product Direction**

Year 3–4 university students often possess a strong foundation in finance and investment theory but have limited opportunities to practice the end-to-end due diligence process used to evaluate start-ups.

The project aims to bridge the gap between financial theory and practical due diligence by simulating the start-up investment process. Students can analyze companies, evaluate financial and business fundamentals, conduct Q\&A with founders, identify risks, and make informed investment decisions in a risk-free environment.

## **2\. Core User Flow**

Receive entrepreneur pitch → review initial company information → investigate through financial/industry information and questions → evaluate the opportunity → decide whether and how much to invest → repeat for multiple companies → review portfolio performance and decision quality. 

## **3\. Initial Required Information**

Company profile, business model, financial performance and entrepreneur responses to selected questions. 

## **4\. Core Process Type**

Information-gathering and decision-making simulation involving due diligence, financial analysis, risk assessment, valuation, and capital allocation under limited information and resources. 

## **5\. MVP Flow**

The MVP should consist of one complete gameplay loop:   
START  
  ↓  
Receive Entrepreneur Pitch  
  ↓  
Review Basic Company Information  
  ↓  
General Information  
  ├── Product Description  
  │    ├── Problem  
  │    └── Solution  
  ├── Industry Information  
  │    ├── Market Size & Growth  
  │    └── Industry Attractiveness  
  ├── Company Overview  
  │    └── Business Model  
  └── Financial Information (Financial Statements)  
        
  ↓  
Investigation: Ask Entrepreneur Questions (Q\&A)  
  ├── Map questions with provided information  
  └── Specific due diligence questions  
  ↓  
Evaluation:   
  ├── Market Size & Industry Attractiveness  
  ├── Business Model Outlook  
  ├── Financial Health  
  │    ├── Revenue  
  │    ├── Growth  
  │    ├── Other indicators related to industry & case stories - Main indicators: ROA, EPS, revenue per FTEs, revenue per AR, cash to assets, gross/ net profit   margin, debt to assets (leverage ratio) 
  ├── Product & Competitive Advantage  
  └── Management / Founder's Experience  
  ↓  
Investment Decision (Checklist)  
  ↓  
Invest / Negotiate / Reject  
  ├── Reject → Move to next company  
  └── Invest → Negotiate Investment Terms  
  ↓  
Repeat for Remaining Companies  
  ↓  
Portfolio Results  
  ├── Portfolio Composition  
  ├── Investment Performance  
  └── Overall Portfolio Return  
  ↓  
Performance \+ Feedback  
  ├── Investment Decision Quality  
  ├── Strengths & Weaknesses  
  └── Personalized Feedback  
  ↓  
END

## **6\. Target Product Direction**

A browser-based, single-player investment simulation inspired by a Shark Tank-style pitch environment, where users act as fund managers and evaluate fictional businesses before allocating a limited investment budget. 

## **7\. Product Interface**

The current concept proposes three main tabs:

- Investment Decision tab  
- Financial Statements tab  
- Questions tab (for conversing with the entrepreneurs)

## **8\. MVP Scope**

* Core user need: A safe learning opportunity where they can practice a complete investment process.   
* Core user input: After navigating company information and conversing with the entrepreneur, the core investment from the user would be their investment decision and the investing amount  
* Core logic: If the due diligence process is done well and the user extracts the most from the information given in the game, they make the correct investment decision and their portfolio result as well as performance evaluation improves. If not, the opposite happens: they make a bad decision and the performance evaluation suffers.  
* Core output: A basic scoring results screen showing their investment returns and decision quality, as well as what clues the user might have missed in the due diligence process

## **9\. Target Scope**

After the MVP works, expansion may include:  
\- more levels  
\- more complex dialogue trees  
\- better UI  
\- negotiation process (money invested for equity amount)  
\- more sources of information for the user: newspaper, internet, phone calls  
\- risk adjusted performance evaluation.

## **10\. Fallback Scope**

If implementation becomes too complex:  
\- Reduce the number of entrepreneurs  
\- Less complicated dialogue trees  
\- Simpler UI  
\- Exclude negotiation process

## **11\. Out of Scope for MVP**

- Complex UI animations  
- Account systems  
- Complex backend  
- Negotiation process  
- Incorporating the risk factor in performance evaluation  
* 

## **12\. Initial Rule Hypothesis**

The player starts with a fixed amount of capital and evaluates a fixed number of entrepreneurs. Information is revealed through different sources and limited questioning. The player decides whether to invest and how much to allocate. Investments subsequently generate gains or losses, and the player's final portfolio performance and investment decisions are evaluated. 

## **13\. Responsibility by Output**

| Member | Student ID | Role / Responsibility | Specific Output |
| ----- | ----- | ----- | ----- |
| **Nguyễn Thị Kiều Anh** | 2412380009 | **Group Coordinator, Game Mechanisms Design** | \- Master roadmap & project progress management.- Game rulebook, margin loan rules, fees for unlocking analytical reports, ROI summary table, and 5-criteria Widget Checklist. |
| **Phùng Khánh Linh** | 2412380028 | **Scenario & Dialogue Writer** | \- Scripts and interactive dialogues for 5 Founders, including Red Flag traps.- Lessons learned and breakdown of the causes of profit/loss after each round. |
| **Nguyễn Minh Trang** | 2412380050 | **UI/UX Design** | \- Artwork for 5 Founders, gameplay screens, three financial statements, and ROI summary screen.- Design System: icon set, buttons, and 5-criteria checklist widget. |
| **Hoàng Minh Nhật** | 2412380039 | **Code & Tech Developer** | \- Integration of the front-end and back-end financial calculation engine.- Logic testing, test cases, debugging, and ensuring smooth system operation. |
| **Lê Đắc Phú Minh** | 2412380030 | **Financial Content Designer** | \- Three-statement financial reports for 5 startups.- Financial models, valuation traps, and financial formulas. |

