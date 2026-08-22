# PITCH & LEDGER – GAME SIMULATION - CHECKPOINT WEEK 1

## Team Members

| **Member**          | **Student ID** |
| ------------------- | -------------- |
| Nguyễn Thị Kiều Anh | 2412380009     |
| Phùng Khánh Linh    | 2412380028     |
| Nguyễn Minh Trang   | 2412380050     |
| Hoàng Minh Nhật     | 2412380039     |
| Lê Đắc Phú Minh     | 2412380030     |

---

# Problem Candidates

| **Candidate**                                         | **Target User**                                                                                                                                    | **Task / Decision**                                                                                                                      | **Difficulty**                                                                                                                                                                                                                                                                                                                                                                                                                                                     | **Financial Relevance**                                                                                            | **Feasibility**                                                                                                                                                                                                                                                               |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Pitch & Ledger (Shark Tank Simulation) – Selected** | High school and university students in Economics, Finance, and Business Administration, as well as individual investors who are new to the market. | Practice business due diligence, financial statement analysis, cash flow management, and experience different investment risk scenarios. | New investors and students often understand financial theory but lack practical experience in evaluating investment opportunities. They may be persuaded by attractive pitches, impressive presentations, or manipulated/isolated metrics without knowing how to cross-check them against financial statements and the company's fundamentals. They may also make emotionally driven investment decisions and suffer significant losses when the investment fails. | Corporate Finance & Venture Capital, including **Corporate Finance, Valuation, and Financial Statement Analysis**. | The game can be structured into independent, turn-based modules. Each startup can be treated as a separate case, making the system relatively straightforward to implement. The main concern is whether sufficient and accessible data is available to build realistic cases. |

### Pitch & Ledger – Difficulty Assessment

#### Specific

The player is required to evaluate **six investment deals** and make one of three key decisions:

* **Deal**
* **Reject**
* **Offer**

The main difficulty comes from:

* Information asymmetry
* Financial statement traps
* Incomplete or misleading information
* The need to cross-check information from multiple sources

#### Relevant

The game requires practical financial knowledge, including:

* Financial Statement Analysis
* Unit Economics
* Burn Rate
* Runway
* Valuation
* Investment Due Diligence

#### Meaningful

The game aims to develop:

* Practical company analysis skills
* Financial decision-making skills
* Critical thinking
* A healthy skepticism toward financial information

This is particularly meaningful for students and first-time investors (F0).

#### Supportable

The game can use a static, turn-based structure.

Each startup can be developed as an independent case file. The system can calculate scores based on investment decisions and financial indicators such as:

* IP
* P/S

This structure reduces the complexity of the game logic.

#### Feasible

The main concern is whether the team can access enough reliable data to construct realistic investment cases.

However, the architecture can be designed as **six independent startup modules**. The developer only needs to build one core interface and then load the financial and scenario data for each startup into the system.

---

# 2. Lifevest – Personal Financial Management

| **Candidate**                                | **Target User**                                                                                                                                                                                                                                             | **Task / Decision**                                                                                                                                                                                                            | **Difficulty**                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | **Financial Relevance**                                                                                  | **Feasibility**                                                                                                           |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Lifevest (Personal Financial Management)** | Gen Z and young employees with limited financial and investment knowledge who want to participate in financial markets and generate additional returns from idle cash. It could potentially serve as a supporting tool for brokers at securities companies. | Manage personal cash flow; respond to unexpected life events such as economic downturns, illness, marriage, etc.; allocate assets among stocks, bonds, venture capital funds, retirement funds, and other investment vehicles. | Young people entering the workforce often receive their first stable income without knowing how to allocate it effectively. They may not anticipate unexpected events or have clear long-term financial goals such as buying a house. As a result, they may experience financial difficulties despite having a relatively stable income. Securities companies also tend to approach F0 investors through relatively generic surveys and recommendations, which may not be engaging enough. | Personal Finance & Behavioral Finance. However, the technical financial component is relatively limited. | Potentially feasible, but the scope is broad and may easily expand beyond financial management into lifestyle simulation. |

### Specific

The task is relatively broad because it covers:

* Personal life
* Marriage
* Healthcare
* Investment
* Long-term financial planning

The target users are also fragmented between:

* **B2C:** Gen Z / young employees
* **B2B:** Brokers

### Relevant

The concept is related to:

* Personal Finance
* Behavioral Finance

### Meaningful

The game could help young people understand the importance of:

* Emergency funds
* Cash flow management
* Asset allocation
* Long-term financial planning
* Wealth transition in later life

### Supportable

State management would be relatively complex because decisions made at age 20 could affect financial outcomes at age 60, creating potential cascading dependencies and system errors.

### Feasible

There is a significant risk of **scope creep**, as the project could become overly focused on creating dramatic life scenarios instead of maintaining its core focus on financial decision-making.

---

# 3. Green Finance & ESG Rating Platform

| **Candidate**                                                                                 | **Target User**                                                                                                                                                                                                                                                                              | **Task / Decision**                                                                                                                                                                                                                                                                          | **Difficulty**                                                                                                                                                                                                                                                                                                                                                                                                                                            | **Financial Relevance**                                                                                                                                                                                                               | **Feasibility**                                                                                                                                                                                                                                                                                         |
| --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Green Finance & ESG Rating Platform – ESG Assessment & Green Financial Valuation Platform** | **Primary:** Financial analysts and investment banking professionals at securities companies, as well as green credit assessment teams at commercial banks. **Secondary:** Listed companies/SMEs and researchers, lecturers, and finance students who need standardized ESG data in Vietnam. | Collect and cross-check three-statement financial data with non-financial indicators (Environmental, Social, Governance); detect greenwashing signals; assess geopolitical risks and supply-chain disruption risks based on international standards such as GRI, ISSB, SASB, CBAM, and EUDR. | **Information asymmetry & fragmented data:** ESG and financial information are often dispersed across different sources. **Greenwashing risk:** Companies may present positive ESG information without fully reflecting their actual performance. **Disconnect between ESG and financial data:** There is a lack of tools that convert ESG indicators, such as carbon emissions, into measurable impacts on the three financial statements and cash flow. | A standardized ESG Rating could help securities companies attract capital from Impact Investment Funds, improve equity research, support Investment Banking and Green Credit activities, and strengthen supply-chain risk management. | **Moderately feasible:** The scope could be narrowed to an ESG assessment model and ESG Scorecard integrated with the three financial statements for representative listed companies in key export industries. However, accessing sufficiently accurate data would require significant time and effort. |

### Key Problems

#### Information Asymmetry & Data Fragmentation

ESG and financial information is often distributed across multiple sources and is not consistently standardized.

#### Greenwashing Risk

Companies may disclose positive ESG information that does not fully reflect their actual environmental, social, or governance performance.

#### Disconnect Between ESG & Financial Data

There is a lack of tools capable of converting ESG indicators, such as carbon emissions, into **measurable financial impacts on the three financial statements and cash flow**.

---

# 4. Grow a Tree

| **Candidate**   | **Target User**                                                                                                           | **Task / Decision**                                                                                                                                                                                                                                     | **Difficulty**                                                                                                                                                                    | **Financial Relevance**                                                                                                                                                                 | **Feasibility**                                                                                                                                                                     |
| --------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Grow a Tree** | Anyone who wants to practice decision-making under uncertainty without experiencing the “dryness” of traditional finance. | **Tasks:** Monitor the tree's health and collect data related to the tree and its surrounding environment. **Decisions:** Allocate water and fertilizer; purchase disaster-prevention items; purchase items from the store; purchase weather forecasts. | The player does not know what items the store will offer in the future, the tree's exact current health level, tomorrow's weather conditions, or the characteristics of the tree. | The game involves limited resources, uncertainty, and irreversible decisions. Resources include tree health, water, and fertilizer. Decisions directly affect the survival of the tree. | Highly feasible within seven weeks. The scope can be narrowed to practicing decision-making under uncertainty. The game does not require access to external or real-world datasets. |

### Financial Relevance

The concept reflects several fundamental financial decision-making characteristics:

* **Limited resources**

  * Tree health
  * Water
  * Fertilizer
* **Uncertainty**
* **Trade-offs**
* **Irreversible decisions**

The game therefore provides an intuitive environment for practicing decision-making under uncertainty.

---

# Selected Target User

Our target users are **new investors entering the financial market**.

They are individuals who lack sufficient knowledge and experience in using publicly available information to research the fundamentals of listed companies and make informed investment decisions.

---

# User Task / Decision

Players will navigate through different sources of information provided about a company and make the key decision:

> **Should I invest, and if so, how much should I invest?**

---

# Draft Problem Statement

> **Target users struggle to decide whether to invest and how much to invest in a context where capital is limited, information is asymmetric, and there is a relatively large amount of information to process.**

---

# Finance – Banking Relevance

One of the fundamental problems in finance is the need to **balance risk and return**.

This arises from two fundamental conditions:

1. **Resources are limited.**
2. **Investment choices are often difficult or impossible to reverse.**

Therefore, investors need to evaluate available information, assess risk and return, and decide how to allocate their limited capital among different investment opportunities.

---

# Member Contributions

| **Member**              | **Contribution**                                                                                                                                              |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Nguyễn Thị Kiều Anh** | Researched, described, and identified data for Candidate 3; assessed the feasibility of Candidate 3; consolidated the README and maintained the decision log. |
| **Phùng Khánh Linh**    | Researched, described, and identified data for Candidate 4; assessed the feasibility of Candidate 4.                                                          |
| **Nguyễn Minh Trang**   | Assessed feasibility; researched and described Candidates 1 and 2 (the two selected game simulations).                                                        |
| **Hoàng Minh Nhật**     | Analyzed the target user; defined the user task and decision.                                                                                                 |
| **Lê Đắc Phú Minh**     | Developed the draft problem statement and identified the finance–banking relevance of the selected topic.                                                     |

---

# Feedback from Checkpoint

### Feedback 1

The **Pitch & Ledger** idea has strong practical relevance because it addresses the behavior of F0 investors and students who lack practical experience in financial due diligence.

However, the project needs to maintain a strong focus on **financial calculations and analysis**, particularly:

* Three-statement financial statement analysis
* Burn Rate
* Valuation

rather than becoming primarily entertainment-oriented.

### Feedback 2

The scope of data needs to be strictly controlled within the seven-week development period.

The team should avoid overly complex features such as a **free-form AI chatbot for the Founder**, as this could shift the scenario away from the core financial analysis and verification mechanisms.

---

# Revision After Checkpoint

### Change Implemented

All interactions with the Founder during the due diligence process have been changed to a **Preset Decision Tree** format.

This allows the team to control the accuracy of:

* Financial statement indicators
* Financial traps
* Decision outcomes
* Scoring logic

### Reason for the Change

The revision was made in response to checkpoint feedback in order to:

* Maintain the corporate finance focus of the project.
* Avoid system errors during testing.
* Ensure that the project remains feasible within seven weeks.

### Evidence / Commit

Updated `README.md` while maintaining the core ideas that had already been agreed upon.

---

# Decision

**Decision: KEEP – Pitch & Ledger**

The team will maintain:

* The current problem statement
* The selected target user
* The user task / decision

The product scope will be narrowed to a **closed set of 5–6 standardized investment due diligence cases**.

---

# Open Questions for Week 2

### 1. What is the Main Output?

What is the specific main output of the product?

What unique value does the game provide that can be applied to real-world situations beyond:

* Education
* Entertainment
* Knowledge acquisition
* Providing participants with investment experience?

### 2. What Product Pattern Fits the Main Output?

Which product pattern is most appropriate for delivering the identified main output and value proposition?

### 3. What Is the Minimum Viable Product?

What is the minimum MVP that can still preserve the **core value of the user task**?

The MVP should ideally allow players to:

1. Access information about a company.
2. Analyze key financial information.
3. Identify financial risks and potential financial statement traps.
4. Make an investment decision.
5. Decide how much capital to allocate under limited resources.
