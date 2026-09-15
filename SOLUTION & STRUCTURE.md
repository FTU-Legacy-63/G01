# **SOLUTION STRUCTURE**

## **1\. Product Direction**

Year 3–4 university students often possess a strong foundation in finance and investment theory but have limited opportunities to practice the end-to-end due diligence process used to evaluate start-ups.

The project aims to bridge the gap between financial theory and practical due diligence by simulating the start-up investment process. Students can analyze companies, evaluate financial and business fundamentals, conduct Q\&A with founders, identify risks, and make informed investment decisions in a risk-free environment.

## **2\. Core User Flow**

Founder Pitch → Information Review → Due Diligence → Evaluation → Investment Decision → Portfolio Review → Feedback. 

## **3\. Initial Required Information**

Product & Solution, Industry Information, Company Profile, Business Model, Financial Information, and Founder Responses to Due Diligence Questions.

**4\. MVP Flow**

START  
  ↓  
Receive Entrepreneur Pitch  
  ├── Product Description   
  │    ├── Problem  
  │    └── Solution

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

## **5\. Target Product Direction**

A browser-based, single-player investment simulation inspired by a Shark Tank-style pitch environment, where users act as venture investors evaluating fictional start-ups before allocating a limited investment budget.

Each case should present a different business model, industry context, financial indicators, and investment story so that players learn to identify which information is relevant to each type of business. The relative importance of each evaluation dimension varies by case.

## **6\. Product Interface**

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

## **7\. MVP Scope**

* **Core user need:** A safe learning environment where students can practice a complete due diligence and investment decision-making process.  
* **Core user input:** After reviewing company information and investigating the founder, the player's main inputs are their final checklist assessment, Invest/Reject decision, and capital allocation amount.  
* **Core logic:** The game evaluates the player's due diligence assessment through Yes/No checklist accuracy, comparing their responses with predefined case benchmarks. Investment decisions are not evaluated as objectively right or wrong, as different investment strategies may lead to different outcomes. Instead, investment performance is evaluated based on the simulated financial results of the player's capital allocation, including the resulting profit or loss.  
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

After conducting due diligence, the player completes a final checklist to express their assessment of the company, then decides whether to invest. If investing, the player selects a capital amount within a predefined range, and the corresponding equity is determined by the fixed investment-equity terms of the case.

The player's checklist responses are compared with predefined case benchmarks to evaluate the accuracy of their company assessment and generate due diligence feedback. Separately, capital allocation determines the player's exposure to each investment, while predefined company outcomes determine the resulting investment value and portfolio return. 

The final output therefore reflects both **how the player made the decision** and **what financial outcome resulted from that decision**, without treating either as a definitive measure of real-world investment ability.

## **13\. Responsibility by Output** 

## 👥 Team & Responsibilities

This project is developed by a five-member team, with responsibilities distributed across **game mechanism design, scenario and dialogue writing, UI/UX design, financial content development, and technical development**.

The team follows an integrated workflow in which the **Game Mechanisms Design** establishes the gameplay structure and rules, while **Scenario, Financial Content, UI/UX, and Technical Development** build upon these foundations to create the final interactive investment simulation.

### Team Structure

| Member | Student ID | Role / Responsibility | Expected Output | Evidence Location | Dependency |
|---|---|---|---|---|---|
| **Nguyễn Thị Kiều Anh** | 2412380009 | **Group Coordinator, Game Mechanisms Design** | - Master roadmap & project progress management<br>- Comprehensive game rulebook covering game objectives, gameplay flow, player actions, investment rules, scoring mechanisms, and other game mechanics. | **WORKING SPACE (DRIVE)**<br>[Working Space](https://docs.google.com/spreadsheets/d/19SynORRdjiFYew95loX0qBw0IQCs3Bx_--9A4pDoDTw/edit?usp=sharing)<br><br>**READ ME FINAL & GAME RULEBOOK (DOCS)**<br>[Game Rulebook](https://docs.google.com/document/d/1zgVvz1iYpYHH8MqOHaSd2kW9Fm3yPzLRFarM6XLWCEA/edit?usp=sharing) | All team members’ outputs – Scenario, UI/UX, Financial Content, and Technical Development |
| **Phùng Khánh Linh** | 2412380028 | **Scenario & Dialogue Writer** | - Scripts and interactive dialogues for Founders, including Red Flag traps.<br>- Lessons learned and breakdown of the causes of profit/loss after each round. | **STORY DIALOGUE (WEB)**<br>[Story Dialogue](https://app.xmind.com/share/OyJ7hrp4?xid=FdC5W20h)<br><br>**CASE DESIGN (DOCS)**<br>[Case Design](https://docs.google.com/document/d/18SBXourICwvV_3lcKxK8txX_OLlsukreZx3DB2yCFTY/edit?tab=t.0#heading=h.3botbfphrpjs) | Financial Content Designer – startup information, financial data, and red flags based on true startup data |
| **Nguyễn Minh Trang** | 2412380050 | **UI/UX Design** | - Artwork for 5 Founders, gameplay screens, three financial statements, and summary screen.<br>- Design System covering buttons, tabs, checklists, cards, typography, color palette, icons, and UI components. | **GAME DESIGN (WEB)**<br>[Game Design](https://www.figma.com/proto/mLkkIjiFqhksbILlCUw6zF/PBL-Group-5?node-id=107-147&t=0eaJVzfkcSQMQpDX-1) | Game Mechanisms Design + Financial Content – gameplay flow, storytelling, required information, financial content, and game design |
| **Hoàng Minh Nhật** | 2412380039 | **Financial Content Designer** | - Three-statement financial reports for startups<br>- Industry information<br>- Data flow<br>- Input–process–output mapping<br>- Main data assumptions | **FINANCIAL CONTENT (DOCS)**<br>[Financial Content](https://docs.google.com/document/d/1VLQxfuGtaeozlGINbKeKfkMDokw30sJrYgPcqlPVyL0/edit?tab=t.bm2lrl3y6lul)<br><br>**SAMPLE DATA (EXCEL)**<br>[Sample Data](https://docs.google.com/spreadsheets/d/1tBoQxQN3m5QLP6MvOamRoRra-jPbxcOuHA7sBaexez8/edit?gid=368522091#gid=368522091) | Game Mechanisms Design – gameplay flow, inputs, outputs, and required financial information from story dialogues |
| **Lê Đắc Phú Minh** | 2412380030 | **Code & Tech Developer** | - Technical route<br>- Front-end and back-end financial calculation engine integration<br>- Logic testing<br>- Test cases<br>- Debugging<br>- System operation | **CODING**<br>[Sources & Code](https://drive.google.com/file/d/1lKImPaPpQL5qwYwtKKP9XpptYMqJpLbe/view) | Game Mechanisms Design + Financial Content + UI/UX Design – game rules, financial logic/data, and interface |

