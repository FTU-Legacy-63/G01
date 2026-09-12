# PROJECT PROPOSAL

## 1. Problem Statement

> **Year 3–4 finance students often have strong theoretical knowledge but limited opportunities to practice investment due diligence and deal evaluation.**

They lack hands-on experience in:
- Analyzing financial and business fundamentals
- Assessing investment risks
- Challenging management assumptions
- Interpreting incomplete or conflicting evidence
- Translating their analysis into structured investment decisions

As a result, they may struggle to apply theoretical knowledge effectively in realistic investment settings.

---

## 2. Target User

Year 3–4 university students aspiring to pursue careers in:
- Venture Capital (VC)
- Private Equity (PE)
- Investment Banking
- Financial Analysis
- Related finance fields

These students need practical exposure to the investment due diligence process.

---

## 3. User Task & Core Decision

### Role

**Venture Capitalist (VC)** managing a multi-deal investment fund.

### Core Decision

> **“Should I invest in this company? If yes, how much capital should I commit?”**

If the player chooses to invest, they select an investment amount within a predefined range using a **slider**.

The corresponding equity received changes according to the predetermined **investment–equity terms** of each case.

> **Note:** The player does not independently value the startup or negotiate valuation and equity terms.

---

## 4. Desired Outcome

### 4.1 Risk & Red Flag Detection Capability

Evaluates the player's ability to identify core operational risks and financial statement red flags, such as:

- Artificial revenue growth
- Hidden COGS
- Negative cash flow
- Unsustainable burn rates
- Other case-specific operational and financial risks

These risks are identified during the due diligence process.

### 4.2 Capital Allocation Efficiency

Evaluates whether the amount of capital allocated to each startup is appropriate relative to:

- The level of risk identified
- The player's overall assessment of the company
- The player's available investment capital
- The expected investment potential

---

## 5. Output: Investment Decision Report

| **Output Component** | **Description** |
|---|---|
| **Investment Portfolio & Investment Decisions** | After reviewing the project information and evaluating its investment potential, the player decides whether to invest/reject each project and determines the amount of capital allocated to each selected project. |
| **Total Investment Profit/Loss** | Reports the total profit/loss generated from the player's investment decisions and evaluates the overall financial performance of the portfolio. |
| **Checklist Score** | Shows the number of investment checklist questions answered correctly out of the total number of questions, indicating the player's ability to identify key investment considerations. |
| **Investment Performance Analysis** | Provides feedback on the player's investment decisions, highlighting strengths, mistakes, risk-taking behavior, and areas for improvement. |

---

## 6. Product Pattern: A Financial Learning Game

- An educational web-based simulation placing students in the role of a **Venture Capitalist** evaluating early-stage startups across different industries.
- Each case presents a different:
  - Business model
  - Investment story
  - Set of financial indicators
  - Due diligence risks
- **Core Experience:** Active, scenario-based due diligence under conditions of information asymmetry and limited investment capital.
- The game emphasizes **evidence interpretation and decision-making**, rather than finding a single correct investment answer.
- Financial indicators are case-specific and selected according to the startup's:
  - Industry
  - Business model
  - Investment story

---

## 7. Product Logic & Evaluation Workflow

```text
START
  ↓
Receive Entrepreneur Pitch
  ├── Product Description
  │     ├── Problem
  │     └── Solution
  │
  ↓
Review General Information
  ├── Industry Information
  ├── Company Overview
  └── Financial Information (Financial Statements)
  │
  ↓
Investigation: Ask Entrepreneur Questions (Q&A)
  └── Red Flags Detection
        ├── Map questions with provided information
        └── Specific due diligence questions
  │
  ↓
Evaluation - Checklist
  ├── Market Size & Industry Attractiveness
  │     └── Industry Information
  │
  ├── Business Model Outlook
  │     └── Company Overview
  │
  ├── Financial Health
  │     └── Financial Information
  │
  ├── Product & Competitive Advantage
  │     └── Q&As
  │
  └── Management / Founder's Experience
        └── Q&As
  │
  ↓
Investment Decision
  ├── Invest
  └── Reject
  │
  ↓
Repeat for Remaining Companies
  │
  ↓
Investment Report
  ├── Portfolio Results
  ├── Performance
  └── Feedback
  │
  ↓
END
