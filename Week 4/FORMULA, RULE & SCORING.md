# **Formula, Rule, Scoring and Classification**

The game applies financial formulas and decision rules to transform company information and player decisions into two main outputs: **Portfolio Performance** and a **Decision Reflection Report**.

The system does not assign a single investment ability score or determine whether an investment decision is objectively right or wrong. Instead, it reflects how the player evaluates each company, whether the final capital allocation is consistent with that assessment, which evidence may deserve further consideration, and what financial outcome results from the selected portfolio.

## **1\.  Formula**

Financial formulas are used for two purposes: (1) interpreting company financial information during due diligence and (2) calculating the financial outcome of the player's investment decisions. 

**A. Company Financial Indicators** 

| Formula | Purpose | Interpretation |
| ----- | ----- | ----- |
| Gross margin \= $\frac{Gross\ profit}{Revenue}$ | Measure operational efficiency  | Indicates how efficiently the company generates profit from its core business.  |
| Net margin \= $\frac{Net\ income}{Revenue}$ | Measure overall profitability  | Provides information about the company's current profitability or loss  |
| ROA \= $\frac{Net\ income}{Total\ assets}$ | Measures the company's ability to generate profit from its asset base  | Provides additional information about asset utilization and financial performance  |
| EPS \=  $\frac{Net\ income\ -\ Preferred\ Dividend\ }{Weighted\ average\ outstanding\ }$ | Measure net earnings allocated per share of common stock | Indicates profitability on a per-share basis and serves as a fundamental anchor for valuation multiples (P/E) |
| Revenue per employee \= $\frac{Revenue}{Total\ headcount\ (FTEs)}$ | Measures revenue generated relative to workforce size  | Provides evidence about operational productivity  |
| Cash-to-assets ratio \= $\frac{Cash\ &\ cash\ equivalents}{Total\ assets}$ | Measures the proportion of assets held in cash  | Provides information about the company's cash position  |
| Revenue to accounts receivable \=  $\frac{Revenue}{Account\ receivables\ }$ | Measures asset management efficiency and collection turnover speed | Indicates how effectively credit sales are collected and whether cash is trapped in unpaid customer receivables |
| Debt ratio \= $\frac{Total\ debt}{Total\ assets}$ | Measures the extent to which assets are financed by debt  | Provides evidence about financial leverage and financing risk  |

These financial indicators are treated as information for interpretation rather than automatic investment signals. For example, a negative Net Margin does not automatically mean that a startup is unattractive. The player is expected to interpret financial information together with business characteristics, industry context, founder explanations and other evidence available within the case. 

*Design principle:* Financial ratios provide supporting evidence rather than investment conclusions. No single financial metric is sufficient to determine whether a company is investable. 

**B. Investment and Equity Calculation** 

For each startup, the game defines a minimum investment amount and a maximum equity percentage available to the player.

The player selects the investment amount through a slider. The corresponding equity received changes according to the predefined investment terms of that case.

Conceptually:

${\ Equity}_{i}​=f({Investment}_{i}​)\$

Where: 

- ${Investment}_{i}$ \= capital allocated to the company $i$;   
- ${\ Equity}_{i}​$ \= ownership percentage received;   
- Equity is capped at the maximum percentage specified for that case, for example, 20%.

The exact investment–equity relationship will follow the fundraising terms established in the finalized case data.

**C.** **Investment and Portfolio Return**

After all investment decisions have been completed, the outcomes of the companies are revealed.

For company $i$: 

${Investment\ value}_{i}​={\ Equity}_{i}\ ×{\ Future\ company\ value}_{i}​\$

${Investment\ return}_{i}=\ {Investment\ value}_{i}\ -\ {Investment}_{i}$  

${ROI}_{I}=\ \frac{{Investment\ value}_{i}\ -\ {Investment}_{i}}{{Investment}_{i}}\ ×\ 100%$

At portfolio level: 

$Final\ portfolio\ value=Remaining\ cash+∑\ {Investment\ value}_{i}​$

And: 

$Portfolio\ return=\frac{Final\ portfolio\ return\ -\ Initial\ capital}{Initial\ capital}\ ×\ 100%\$

Portfolio Return represents the financial consequence of the player's capital allocation decisions within the simulation. It is reported separately from the Decision Reflection Report and is not treated as a direct measure of investment ability.

## **2\. Rules:** 

Throughout the investigation, players collect information from multiple sources, including founder dialogue, dashboard metrics, financial statements and industry context. The game applies predefined rules to organize these findings into evidence that supports later decision-making.

The rule-based component connects the player's final company assessment with their actual investment behaviour.

Importantly, the system does not track whether a player has successfully "discovered" or understood a specific piece of evidence simply because they opened or read it. Dialogue, financial statements, dashboard information, and industry context provide information for the player to interpret independently.

The player's interpretation becomes observable to the system primarily through the final checklist and capital allocation decision.

### **Rule 1 — Checklist Assessment**

At the end of each case, the player completes a short **Yes/No checklist** covering key dimensions of the investment.

For example:

- Does the company demonstrate sustainable market potential?  
- Is the business model scalable?  
- Does the company have a sustainable competitive advantage?  
- Is the founder capable of executing the proposed strategy?  
- Are the company's financial risks acceptable?

For system processing:

$Yes\ =\ 1;\ \ \ \ \ \ \ \ No\ =\ 0$

The overall assessment can therefore be represented as: 

$Assessment\ score=\ \frac{\Sigma \ Yes}{Number\ of\ checklist\ items}×\ 100%\$

This score represents how positively the player assessed the company. It is not an accuracy score, and the checklist answers are not treated as objectively correct or incorrect.

### **Rule 2 — Investment Conviction**

Capital allocation is used as an observable indicator of how strongly the player is willing to financially commit to the company.

Because different cases may contain different minimum and maximum investment amounts, allocation can be normalized:

$Investment\ conviction\ =\ \frac{Investment-Minimum\ investment\ }{Maximum\ investment-Minimum\ investment\ }$

This converts the player's capital allocation into a 0–100 scale that can be compared with the Checklist Assessment.

Capital allocation therefore has two separate functions:

1. **Decision-reflection function:** it reflects the strength of the player's investment commitment and can be compared with the checklist assessment.  
2. **Financial function:** it determines the equity received and therefore affects the player's final portfolio return.

### **Rule 3 — Decision Consistency**

The system compares the player's Checklist Assessment with Investment Conviction.

$Consistency\ gap=∣Assessment\ score-Investment\ conviction∣\$

A smaller gap indicates stronger alignment between assessment and action. The direction of the gap is also considered: for example, a positive assessment with low allocation may indicate a more conservative tendency, while a negative assessment with high allocation may indicate greater risk tolerance. 

### **Rule 4 — Evidence Reflection**

The system does not track whether the player has actually recognized individual evidence. Instead, checklist responses are compared with predefined important evidence within each case. When relevant evidence provides a perspective not reflected in the player's final assessment, the report highlights it as Evidence to Reconsider, rather than classifying the player's judgement as correct or incorrect. 

# **3\. Scoring:**

# The game does not generate an overall investment score. Numerical measures are used only to support the Decision Reflection Report and Portfolio Performance. 

| Measure  | Calculation / Input  | Purpose  |
| :---- | :---- | :---- |
| Assessment score  | % of “Yes” responses in the final checklist  | Represents how positively the player assesses the company  |
| Investment conviction  | Normalized capital allocation  | Represents the relative strength of capital commitment  |
| Consistency gap  | |Assessment score − Investment conviction|  | Measures alignment between assessment and investment action  |
| Portfolio return  | Investment value relative to initial capital | Measures the simulated financial outcome  |

Evidence Reflection is qualitative and is not scored. Dialogue choices are also not assigned points. These measures are not combined into an overall score because decision behaviour and financial outcome represent different aspects of the simulation. 

### **4\. Classification**

Classification is used only to translate the above measures into understandable feedback.

Decision consistency: 

| Consistency gap | Classification |
| :---- | :---- |
| 0 \- 20 | High consistency |
| 21 \- 40 | Moderate consistency  |
| \> 40 | Low consistency |

The direction of inconsistency is interpreted separately. For example, a **positive assessment with low allocation** suggests a more conservative investment tendency, while a **negative assessment with high allocation** suggests greater willingness to accept risk.

Across the three cases, recurring assessment–allocation patterns may be summarized into descriptive investment tendencies such as High-Conviction, Conservative, Risk-Tolerant, Risk-Sensitive, or Assessment-Responsive.

Evidence Reflection is not numerically classified. Instead, the report highlights important case evidence that may deserve reconsideration based on the player's checklist responses.

**Note:** All classification thresholds are internal MVP design assumptions for reflective purposes, not industry-standard measures of investment competence. 

### **5\. Assumptions and Limitations**

- The final checklist is assumed to reasonably represent the player's overall assessment of each company.  
- Investment amount is used as an indicator of investment conviction, although it may also be influenced by portfolio strategy and remaining capital.  
- The system cannot determine whether the player actually noticed or understood specific evidence; therefore, Evidence Reflection only highlights information that may deserve reconsideration.  
- Portfolio Return is based on predefined company outcomes and does not represent or predict the player's real-world investment ability.

