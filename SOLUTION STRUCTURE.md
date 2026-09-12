# **SOLUTION STRUCTURE**

## **1\. Product Direction**

Year 3–4 university students often possess a strong foundation in finance and investment theory but have limited opportunities to practice the end-to-end due diligence process used to evaluate start-ups.

The project aims to bridge the gap between financial theory and practical due diligence by simulating the start-up investment process. Students can analyze companies, evaluate financial and business fundamentals, conduct Q\&A with founders, identify risks, and make informed investment decisions in a risk-free environment.

## **2\. Core User Flow**

Receive entrepreneur pitch → review initial company information → investigate through financial/industry information and questions → evaluate the opportunity → decide whether and how much to invest → repeat for multiple companies → review portfolio performance and decision quality. 

## **3\. Initial Required Information**

New product and solution, industry information, company profile, business model, financial performance and entrepreneur responses to selected questions. 

**4\. MVP Flow**

START  
  ↓  
Receive Entrepreneur Pitch  
  ├── Product Description   
       ├── Problem  
       └── Solution

  ↓  
Review General Information  
  ├── Industry Information  
  ├── Company Overview  
  └── Financial Information (Financial Statements)  
        
  ↓  
Investigation: Ask Entrepreneur Questions (Q\&A) \- Red Flags Detection   
  ├── Map questions with provided information  
  └── Specific due diligence questions  
  ↓  
Evaluation \-  Checklist   
  ├── Market Size & Industry Attractiveness \- Industry Information   
  ├── Business Model Outlook \- Company Overview   
  ├── Financial Health \- Financial Information   
  ├── Product & Competitive Advantage \- Q\&As  
  └── Management / Founder's Experience \- Q\&As  
  ↓  
Investment Decision: Invest / Reject  
  ↓  
Repeat for Remaining Companies  
  ↓  
Investment Report (Portfolio Results, Performance & Feedback)  
  ↓  
END

## **6\. Target Product Direction**

A browser-based, single-player investment simulation inspired by a Shark Tank-style pitch environment, where users act as venture investors evaluating fictional start-ups before allocating a limited investment budget.

Each case should present a different business model, industry context, financial indicators, and investment story so that players learn to identify which information is relevant to each type of business.

## **7\. Product Interface**

The current concept proposes 6 main tabs and other sub-tabs:

- Entrepreneur Pitch Tab  
- General Information Tab  
+ Industry Overview Sub-Tab  
+ Company Overview Sub-Tab  
+ Financial Information Sub-Tab   
    
- Q\&A Tab (for conversation with the entrepreneurs)  
- Checklist Tab   
- Investment Decision Tab  
- Investment Report Tab 

## **8\. MVP Scope**

* **Core user need:** A safe learning environment where students can practice a complete due diligence and investment decision-making process.  
* **Core user input:** After reviewing company information and investigating the founder, the player's main inputs are their final checklist assessment, Invest/Reject decision, and capital allocation amount.  
* **Core logic:** The game does not determine whether the player's investment decision is objectively correct or incorrect. Instead, it examines how the player's final assessment relates to their capital commitment and highlights relevant evidence that may deserve reconsideration. Capital allocation also determines the equity received and therefore affects the player's simulated portfolio return.  
* **Core output:** Investment report provides feedback on the player's investment decisions, highlighting strengths, mistakes, risk-taking behavior, and areas for improvement.

## **9\. Target Scope**

After the MVP works, expansion may include:

* more levels and start-up cases  
* more complex dialogue trees  
* improved UI and interaction design  
* negotiation of investment and equity terms  
* additional information sources such as news articles, online research, expert calls, or customer interviews  
* more advanced portfolio and risk-adjusted performance analysis  
* more sophisticated case-specific valuation or outcome models

## **10\. Fallback Scope**

If implementation becomes too complex:

* Reduce the number of entrepreneurs  
* Simplify dialogue trees  
* Simplify the user interface  
* Use fewer financial indicators per case  
* Simplify the Decision Reflection Report while maintaining the core due diligence flow

## **11\. Out of Scope for MVP**

- Complex UI animations  
- Account systems  
- Complex backend infrastructure  
- Negotiation of valuation or equity terms  
- Full financial forecasting or DCF valuation by the player  
- Legal, tax, technical, and macroeconomic risks  
- Advanced risk-adjusted portfolio performance evaluation  
* 

## **12\. Initial Rule Hypothesis**

The player starts with a fixed amount of investment capital and evaluates a fixed number of start-ups. Information is provided through the entrepreneur pitch, company and industry information, case-specific financial indicators, and founder Q\&A.

After conducting due diligence, the player completes a final checklist to express their assessment of the company, then decides whether to invest. If investing, the player selects a capital amount within a predefined range, and the corresponding equity is determined by the fixed investment–equity terms of the case.

The game compares the player's assessment with their capital commitment to generate decision-reflection feedback. Company outcomes are predefined within each case, and the equity held by the player determines the resulting investment value and portfolio return.

The final output therefore reflects both **how the player made the decision** and **what financial outcome resulted from that decision**, without treating either as a definitive measure of real-world investment ability.

## **13\. Responsibility by Output** 

| Member | Student ID | Role / Responsibility | Specific Output |
| ----- | ----- | ----- | ----- |
| **Nguyễn Thị Kiều Anh** | 2412380009 | **Group Coordinator, Game Mechanisms Design** | \- Master roadmap & project progress management- \- Game rulebook: Develop the comprehensive rulebook covering game objectives, gameplay flow, player actions, investment rules, scoring mechanisms, win/lose conditions, and other game mechanics. |
| **Phùng Khánh Linh** | 2412380028 | **Scenario & Dialogue Writer** | \- Scripts and interactive dialogues for Founders, including Red Flag traps. \- Lessons learned and breakdown of the causes of profit/loss after each round. |
| **Nguyễn Minh Trang** | 2412380050 | **UI/UX Design** | \- Artwork for 5 Founders, gameplay screens, three financial statements, and summary screen. \- Design System: Establish consistent visual and interaction guidelines for buttons, tabs, checklist, cards, typography, color palette, icons, and UI components across the game. |
| **Hoàng Minh Nhật** | 2412380039 | **Financial Content Designer**  | \- Three-statement financial reports for startups, Industry Information  \- Data flow, input-process-output mapping, main data assumptions  |
| **Lê Đắc Phú Minh** | 2412380030 | **Code & Tech Developer** | \- Technical route, Integration of the front-end and back-end financial calculation engine. \- Logic testing, test cases, debugging, and ensuring smooth system operation.  |

