# **PROJECT PROPOSAL**

1. **Problem Statement**

_Year 3–4 university students often possess a strong foundation in finance and investment theory but have limited opportunities to practice the end-to-end due diligence process used to evaluate start-ups._

The project aims to bridge the gap between financial theory and practical due diligence by simulating the start-up investment process. Students can analyze companies, evaluate financial and business fundamentals, conduct Q&A with founders, identify risks, and make informed investment decisions in a risk-free environment.

2. **Target User**

**Beginner investor** seeking a risk-free simulation to apply analytical thinking and make real-world investment decisions.

3. **User Task & Core Decision**  
* **Role:** Venture Capitalist (VC) managing a multi-deal investment fund.  
* **Core Decision:** *"Should I invest in this company? If yes, how much capital at what valuation/equity terms?"*  
    
4. **Desired Outcome**  
* Develop a structured due diligence methodology instead of relying on intuition.  
* Distinguish between promotional narratives and true fundamentals.  
* Understand capital allocation and risk-adjusted decision-making under resource constraints.

5. **Output: Investment Decision Report**

| Output Component | Description |
| ----- | ----- |
| **Investment Decision** | Reckon which project we invested, and how much is spent for each project |
| **Performance & Score** | Overall decision quality score based on diligence depth and deal terms. |
| **Portfolio Status** | Updated fund cash balance, active holdings, and projected fund IRR. |
| **Learning Feedback** | Personalized breakdown of analytical strengths, blind spots, and red flags missed. |

6. **Product Pattern: A financial learning game**  
* An educational web simulation placing students in the role of a Venture Capitalist evaluating early-stage startups across various industries.  
* Core Experience: Provides an active, scenario-based due diligence under realistic conditions of information asymmetry and resource constraints.

7. **Product Logic & Evaluation Workflow**

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
Investigation: Ask Entrepreneur Questions (Q&A)
  ├── Map questions with provided information
  └── Specific due diligence questions
  ↓
Evaluation: 
  ├── Market Size & Industry Attractiveness
  ├── Business Model Outlook
  ├── Financial Health
  │    ├── Revenue
  │    ├── Growth
  │    ├── Margin
  │    └── Cash Flow
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
Performance + Feedback
  ├── Investment Decision Quality
  ├── Strengths & Weaknesses
  └── Personalized Feedback
  ↓
END
