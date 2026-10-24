### **GROUP FOOTPRINT**
**PRODUCT NAME: PITCH & LEDGER**   
**GROUP: G01**  
**LINK REPO: [https\://github.com/FTU-Legacy-63/G01](https://github.com/FTU-Legacy-63/G01)**  
**LINK DEMO: [pitch-and-ledger.netlify.app](http://pitch-and-ledger.netlify.app)**

1. **THE FINANCE OR BANKING PROBLEM** 

Year 3–4 finance students often possess strong theoretical knowledge but lack practical opportunities to apply it to startup due diligence and investment evaluation. They may have limited experience analyzing financial performance, identifying risks, challenging assumptions, and translating evidence into sound investment decisions.

To bridge this gap, **Pitch & Ledger** was developed as an educational investment simulation inspired by *Shark Tank*. Through realistic startup cases, students step into the role of investors, assess business opportunities, uncover financial and operational risks, and make evidence-based investment decisions.

2. **TARGET USER** 

Year 3-4 university students aspire to pursue careers in Venture Capital (VC), Private Equity (PE), Investment Banking (IB), financial analysis, and related fields. These students need practical exposure to investment due diligence and capital allocation to strengthen their analytical capabilities and prepare for the decision-making challenges encountered in professional investment settings.

3. **THE USER TASK OR DECISION SUPPORTED BY THE PRODUCT** 

**3.1. User task & Core decision**

* **Role:** Venture Capitalist (VC) managing a multi-deal investment fund.  
* **Core decision:** *“Should I invest in this company? If yes, how much capital should I commit?”*

Players assess each startup using industry information, business information, financial statements, founder responses, and supporting evidence before deciding to **Invest/ Reject.**

For investment decisions, players select a capital commitment using a slider, with equity determined by predefined investment terms. Rather than negotiating valuations, the game focuses on **evidence-based due diligence, risk identification, and disciplined capital allocation**.

**3.2. Desired outcome**

* **Risk & Red flag detection capability:** Evaluates the player's ability to identify core operational risks and financial statement red flags, such as artificial revenue growth, hidden COGS, negative cash flow, or unsustainable burn rates, during the due diligence process.  
* **Portfolio allocation outcome:** Evaluates the financial consequences of how the player allocates limited capital across investment opportunities.

4. **THE MAIN INPUT** 

The operation of **Pitch & Ledger** relies on two primary categories of inputs: System/Scenario inputs (which construct the due diligence environment) and Player inputs (which drive the financial evaluation logic).

**4.1. System/Scenario inputs (Data provided to the player):**

These inputs are predefined by the Scenario & Dialogue Writers and form the basis of the simulation for each startup case:

* **Entrepreneur pitch & Company overview:** Narrative strings providing the business problem, solution, and founder profiles.  
* **Industry information:** Quantitative metrics including Market Size (Float, \$) and Market Growth (Float, %, CAGR).  
* **Financial statements:** Comprehensive 3-statement financial data (Income Statement, Balance Sheet, Cash Flow) for the startup.  
* **Q\&A Dialogue trees:** Preset founder responses containing specific business insights and hidden red flags.  
* **Simulated ROI:** A fixed, predefined return rate (Float, %) assigned to each startup based on its internal health.

**4.2. Player inputs (Data submitted by the player):**

These are the exact data points the system collects from the player's interactions to calculate the final performance:

* **Checklist assessment:** Binary inputs (Yes/No) across a mandatory checklist evaluating the player's ability to identify the startup's strengths and red flags.  
* **Investment decision:** A binary categorical choice to either "Invest" or "Reject" the deal.  
* **Capital allocation:** A numerical input (Float, \$) representing the capital invested. This input is strictly bounded by validation rules (0 ≤ Invested Capital ≤ Maximum Investable Amount / Available Fund Balance).

*(Detailed data types, valid ranges, and units for each variable can be verified in the Input Dictionary section of the README file).*

5. **PROCESS**

**Pitch & Ledger** processes the information provided in each startup case and the player’s decisions to produce a structured due-diligence assessment and a simulated investment outcome.

The system follows a predefined workflow rather than relying on free-form AI conversations. Each startup has its own business scenario, financial information, founder dialogue, checklist benchmarks, and simulated investment outcome.

| Stage  | System process  | Purpose  |
| ----- | ----- | ----- |
| 1\. Case initialization  | Load the startup’s pitch, industry information, company overview, financial statements, founder profile, preset Q\&A branches, checklist benchmarks, and investment assumptions.  | Provide a consistent, case-specific environment for due diligence.  |
| 2\. Evidence review  | Display the available information through dedicated sections for Industry, Company, and Financial Statements.  | Enable players to compare the founder’s claims with business and financial evidence.  |
| 3\. Founder investigation  | Present predefined questions and corresponding founder responses through an interactive dialogue tree.  | Help players investigate potential red flags, clarify business claims, and identify genuine strengths.  |
| 4\. Checklist assessment  | Record the player’s Yes/No answers to the case-specific investment checklist and compare them with predefined benchmark answers.  | Evaluate the accuracy of the player’s assessment of the startup.  |
| 5\. Investment decision  | Record the player’s decision to Invest or Reject. If the player invests, allow capital allocation within the case’s predefined investment limits and the remaining fund balance.  | Translate the due-diligence assessment into an investment decision.  |
| 6\. Financial simulation  | Apply the case’s predefined investment return to the invested amount, calculate the resulting profit or loss, and update the remaining capital and portfolio results.  | Demonstrate the financial consequences of capital allocation under simulated conditions.  |
| 7\. Evaluation and feedback  | Calculate the relevant performance indicators and generate case-level feedback and the final investment report.  | Explain what the player identified correctly, what was missed, and how the overall portfolio performed.  |

**Important design principle:** The game evaluates analytical accuracy separately from investment performance. Checklist answers are assessed against predefined case benchmarks, while investment outcomes depend on simulated company returns. Therefore, a profitable outcome does not automatically mean that the player conducted accurate due diligence, and a company’s business quality does not necessarily make its investment terms attractive.

For example, in the CreoExchange case, players must distinguish genuine marketplace adoption and viable underlying economics from the separate questions of revenue monetization and whether the proposed valuation is justified by the evidence available today.

6. **OUTPUT** 

The main output is an **Investment Decision Report** that consolidates the player’s investment decisions, financial results, assessment accuracy, and learning feedback. 

| Output component  | Information presented  | Purpose  |
| ----- | ----- | ----- |
| Investment decision record  | Invest/Reject decision for each startup and the capital allocated when an investment is made.  | Preserve the player’s decisions across the game.  |
| Case-level investment results  | Investment amount, simulated return, and resulting profit or loss for each investment.  | Show the financial consequences of individual decisions.  |
| Portfolio overview  | Total capital invested, remaining capital, aggregate profit or loss, final capital, and portfolio return.  | Evaluate the outcome of allocating a limited fund across multiple opportunities.  |
| Checklist accuracy  | Percentage of checklist assessments that match the predefined benchmark answers.  | Measure how accurately the player identifies the case’s strengths and weaknesses.  |
| Return score  | A score assigned according to the game’s predefined portfolio-return thresholds  | Convert the simulated financial outcome into a standardized performance measure.  |
| Overall performance  | A combined score based on Checklist Accuracy and Return Score, followed by a performance classification.  | Assess analytical accuracy and investment outcomes together.  |
| Case-level learning feedback  | What the player identified well, what the player missed, and the benchmark investment view.  | Connect the player’s reasoning with the evidence and intended lesson of the case.  |
| Overall learning summary  | Strengths, areas for improvement, and key takeaways from the game.  | Encourage reflection on due diligence and capital allocation.  |

The game’s documented scoring framework gives equal weight to analytical accuracy and investment performance:

* Checklist Accuracy measures the proportion of assessments that match the predefined benchmark.  
* Return Score translates the portfolio outcome into the game’s scoring scale.  
* Overall Performance combines the two scores, with 50% assigned to each component.

The final classification uses the game’s five categories: Shark, Tuna, Clownfish, Pufferfish, and Minnow. Feedback is intended to explain the player’s performance rather than simply display a score.

### **Output limitations**

All results must be interpreted within the simulation. The benchmark answers reflect the development team’s assessment of each fictional case, while investment returns are predefined assumptions rather than forecasts of real-world performance. The report is designed as a learning tool, not as a substitute for professional investment analysis.

7. **THE FINANCIAL LOGIC, RULES, CALCULATIONS OR CLASSIFICATION USED**   
   **7.1. Checklist accuracy**

Checklist Accuracy measures how accurately players identify a company's strengths, weaknesses, and potential red flags. For each case, the percentage of correct Yes/No answers is calculated against the development team's predefined benchmark answers.

To determine the overall campaign score, individual case accuracies are combined using the weights assigned to each case. The default weight is 1, meaning all cases contribute equally regardless of their checklist lengths. This prevents cases with more questions from automatically having a greater influence on the final score.

## **7.2. Portfolio profit, loss and return**

Portfolio performance measures the financial outcome of players' capital allocation decisions. The profit or loss from each investment is determined by the amount invested and the startup's predetermined ROI. These results are aggregated to calculate total portfolio profit or loss, which is then compared with the initial fund to determine the portfolio return.

Uninvested capital earns a 0% return. Each startup's ROI is fixed by the development team rather than randomized, ensuring consistent outcomes across gameplay sessions.

## **7.3. Feasible opportunity envelope and return score**

Instead of using fixed return-score bands, the game calculates the best and worst feasible portfolio returns available within the actual campaign. This approach allows the scoring system to adapt to different combinations of startups, investment constraints, and simulated returns.

The calculation considers the initial fund, available cases, minimum and maximum investment amounts, permitted investment increments, currency-conversion rules, predetermined startup ROIs, and the shared-capital constraint. For each case, players may reject the opportunity or choose a valid investment amount within the permitted range.

The report engine uses a **Pareto-pruned dynamic programming algorithm** to identify the best and worst feasible campaign outcomes. The implementation is exact for the configured discrete investment steps, with a maximum of 20,000 possible investment amounts per case.

The player's Return Score is then normalized between these two outcomes on a scale of 0–100. A score of 0 corresponds to the worst feasible return, while 100 corresponds to the best feasible return. If the best and worst feasible returns are identical, the score is set to 50 because the campaign offers no meaningful variation in possible outcomes.

## **7.4. Overall performance**

Overall performance combines **Overall Checklist Accuracy** and **Return Score** using equal weights of 50% each. These weights are centrally configured in `game/config.js`, rather than defined separately for individual cases.

This approach evaluates both the player's ability to assess business information and the financial outcome of their capital allocation. The two measures remain distinct because accurate analysis does not necessarily guarantee the best portfolio outcome, while a favorable return does not necessarily demonstrate accurate analysis.

## **7.5. Performance classification**

After the campaign is completed, the overall score determines one fish classification:

* **Shark (85–100):** Excellent  
* **Tuna (70–84):** Strong  
* **Clownfish (50–69):** Average  
* **Pufferfish (30–49):** Weak  
* **Minnow (below 30):** Poor

The classification is generated once for the entire campaign rather than separately for each startup. These categories are designed to make feedback engaging and accessible, rather than serve as formal measures of real-world investment expertise.

## **7.6. Analytical performance and portfolio outcome comparison**

The game also compares **Checklist Accuracy** with **Return Score** to generate a summary of the player's performance.

* Checklist Accuracy exceeds Return Score by more than 10 points, the feedback indicates that due-diligence accuracy was stronger than the realized portfolio outcome.   
* Return Score exceeds Checklist Accuracy by more than 10 points, the portfolio outcome was stronger than analytical accuracy. 

Differences within 10 points in either direction are described as broadly balanced. This comparison describes the relationship between analytical accuracy and realized investment outcomes without assuming that portfolio returns directly measure decision-making skill.

8. **THE MAIN USER FLOW** 

Pitch & Ledger follows a sequential, case-based learning flow. Players complete the due diligence and investment decision process for each startup, receive immediate feedback on their decisions, and then proceed to the next case. After completing all three cases, players receive a final report summarizing their overall performance.

**Step 1: Start the game**

The player starts a new game and enters the investment simulation. The game initializes the player's starting capital and presents the first startup case.

**Step 2: Review the Startup Pitch**

The player reviews the startup's pitch to understand its business model, value proposition, target market, and fundraising objectives.

**Step 3: Examine Due Diligence information**

The player explores the available information about the startup, including its industry, business operations, financial performance, and other relevant case materials. This information provides the evidence needed to assess the company's quality and investment attractiveness.

**Step 4: Conduct Founder Q\&A**

The player selects questions from the predefined Q\&A options to investigate key uncertainties, clarify business assumptions, and gather additional evidence about the startup.

**Step 5: Complete the Due Diligence Checklist**

The player evaluates the startup against the predefined due diligence criteria by answering the checklist questions. These answers reflect the player's assessment of the company's strengths, weaknesses, and investment risks.

**Step 6: Make an Investment Decision**

Based on the information collected, the player decides whether to invest in or reject the startup.

* If the player rejects the startup, no capital is allocated to that case.  
* If the player decides to invest, the player selects the amount of capital to allocate within the game's investment limits.

The decision is recorded as part of the player's investment performance.

**Step 7: Simulate the Investment Outcome**

The game applies the predefined simulated investment return associated with the case. The outcome is used to calculate the financial result of the player's investment decision and update the portfolio's capital where applicable.

**Step 8: Receive Case-level Learning feedback**

Immediately after the investment outcome is revealed, the player receives learning feedback specific to the completed case. The feedback compares the player's due diligence and investment decision with the case's predefined benchmark.

The feedback highlights:

* What the player identified correctly during due diligence.  
* Important risks, weaknesses, or signals the player missed.  
* Whether the investment decision was consistent with the benchmark assessment.  
* The key lesson from the case, particularly the distinction between business quality and investment attractiveness.

This feedback allows the player to reflect on the decision before moving on to the next startup.

**Step 9: Proceed to the Next case**

After reviewing the case-level feedback, the player proceeds to the next startup and repeats the same process, from reviewing the pitch to receiving learning feedback.

This cycle continues until all three startup cases have been completed.

**Step 10: Receive the Final Investment Report**

After completing all three cases, the player receives a final report summarizing their overall performance across the simulation. The report includes:

* Portfolio performance and final capital.  
* Investment decisions and capital allocation across the three cases.  
* Simulated profit or loss and portfolio return.  
* Due diligence checklist accuracy.  
* Overall score, combining checklist accuracy and return performance.  
* Overall performance category and key learning takeaways.

The final report provides a consolidated view of the player's investment judgment and progress across the simulation.

**Overall Flow:** Start game → Review startup pitch → Examine due diligence information → Conduct founder Q\&A → Complete checklist → Make investment decision → Simulate investment outcome → Receive case-level learning feedback → Proceed to next case → Repeat until all 3 cases are completed → Receive final investment report.

9. **THE WORKING PRODUCT OR WORKING BUILD**

The current working build of **Pitch & Ledger** is a fully functional, web-based Minimum Viable Product (MVP) accessible via browser. The product translates complex financial logic into a gamified, interactive decision-making environment.

The working build operates on a highly structured split-view dashboard layout, designed to optimize the reading and processing of financial data without cognitive overload. It transitions smoothly between states using dynamic screen rendering rather than overlapping static pop-ups.

The working product consists of the following fully operational modules:

1) **Onboarding & Tutorial module:**

An initial walkthrough screen that introduces players to the core game mechanics, UI navigation, and the primary objective (managing a \$10,000,000 venture capital fund).

2) **Due Diligence hub (Investigation interface):**  
* **Founder Q\&A:** A working interactive dialogue tree allowing players to ask preset questions and uncover red flags or hidden traps.  
* **Financial Document Viewer:** A card-based “Intelligence Briefing” interface that displays the startup's Industry Overview, Company Profile, and 3-Statement Financial Reports. It incorporates visual tools like Gradient Benchmark bars for instant risk assessment.  
    
3) **Decision & Allocation engine:**  
* **Interactive Checklist Widget:** A mandatory 5-criteria assessment tool (binary Yes/No inputs) that records the player's ability to catch red flags.  
* **Capital Allocation Slider:** A dynamic UI control that enforces budget constraints (min/max investable amounts) and automatically calculates the corresponding equity percentage in real-time. It includes strict UI validations (e.g., disabling the slider if the user selects "Reject" or lacks sufficient funds).  
    
4) **Performance report (Output screen):**

A dynamic summary screen generated at the end of the simulation. It calculates and displays Checklist Accuracy, individual deal Profit/Loss, total Portfolio ROI, detailed feedback, and the player's final investment rank (from Minnow to Shark).

**Working build evidence:**

* Live demo (Coded  build): [**pitch-and-ledger.netlify.app**](http://pitch-and-ledger.netlify.app)  
* Interactive prototype (Pre-build validation): [**Prototype**](https://www.figma.com/proto/mLkkIjiFqhksbILlCUw6zF/PBL-Group-5?node-id=107-563&p=f&t=RulIk6OZVSehsfWG-1&scaling=scale-down&content-scaling=fixed&page-id=107:147&starting-point-node-id=293:395&fbclid=IwZXh0bgNhZW0CMTEAcGRvZgRzcnRjBmFwcF9pZA80Mzc2MjYzMTY5NzM3ODgAAR7NmD83P8bH-EbtZfJn-35bQti_-eOKX08qYWXg375rEbsNHzAhYiJmIptAxw_aem_mF7p96rlwyCI7PRCXXcL0g)

*(This interactive prototype was used to validate the Happy/Alternative/Error paths before technical deployment).*

10. **THE DEPLOYMENT OR RELEASE STATUS** 

A public demo has been made available at [https\://pitch-and-ledger.netlify.app/](https://pitch-and-ledger.netlify.app/). The game contains three startup cases: Plantfish, CreoExchange and Clinova AI. Its runtime uses static files and browser-local progress storage; it does not require a backend, an account or an AI service during gameplay.

Known release limitations include full-page navigation between cases, which prevents a guarantee of uninterrupted cross-case audio. Mobile hardware, Windows file-based execution, throttled networks and perceptual audio latency have not been directly verified for this release.

11. **THE DATA, ASSUMPTIONS AND SOURCES (NHẬT)** 

**11.1. Data Sources**

The project uses publicly available information and real-world startup cases to inform the development of fictional companies and their investment scenarios. Wefunder ([https\://wefunder.com/](https://wefunder.com/)) is one of the platforms consulted to explore startup business models, fundraising campaigns, company presentations, and investment propositions. These cases provide inspiration for the business scenarios presented in the game; they are not necessarily reproduced directly.

Additional industry reports and publicly available information are used where relevant to establish market context and inform financial and operational assumptions. For example, industry research may provide estimates of market size, projected growth, and sector-specific characteristics.

All startup profiles, financial statements, investment theses, checklist benchmarks, simulated returns, and game classifications are developed or adapted by the project team for educational purposes. The resulting data are intended to create realistic decision-making scenarios rather than represent the actual financial performance of existing companies.

**11.2. Assumptions and Limitations**

**11.2.1. Company assumptions**

* All companies featured in the game are fictional and represent predefined business scenarios.  
* Each startup has a predefined investment thesis, including its strengths, weaknesses, risks, and intended investment outcome.  
* Company information and financial indicators are designed to provide players with sufficient evidence to assess the investment opportunity within the simulated environment.  
    
  **11.2.2. Financial assumptions**  
* The time value of money is not incorporated into the investment evaluation. Returns are predetermined game outcomes rather than discounted cash-flow valuations.  
* Classification thresholds are established by the development team using relevant benchmarks where available or explicit game-design assumptions where reliable benchmarks are unavailable.  
* Financial reference ranges are intended to support comparisons and analytical reasoning. They should not automatically be interpreted as definitive industry standards.  
    
  **11.2.3. Investment assumptions**  
* Each startup has a predetermined simulated return on investment (ROI). Returns are fixed rather than randomized, ensuring that the investment outcomes remain consistent across gameplay sessions.  
* Within the game's predefined scenarios, simulated returns represent the intended investment outcomes assigned by the development team. They do not constitute forecasts of actual investment performance.  
* Uninvested capital earns a 0% return.  
* The amount allocated to an investment cannot exceed the maximum investable amount defined by the game.  
* The simulation simplifies the relationship between business performance, valuation, and investment returns. In real-world investing, a strong business may still be an unattractive investment if its valuation is too high.

**11.2.4. Player assumptions**

* Players are assumed to make decisions based on the information available to them, including company profiles, financial data, industry information, and responses obtained through gameplay.  
* Players begin with a fixed amount of capital.  
* Checklist answers are evaluated against predefined benchmark checklists developed by the project team.  
* The game does not include additional penalties specifically designed to punish random guesses. However, checklist accuracy reflects the extent to which a player's answers agree with the predefined benchmarks.  
* The relationship between checklist accuracy and capital allocation is not required to be consistent. A player may demonstrate accurate analysis but allocate capital poorly, or achieve a favorable portfolio outcome despite weaker analytical accuracy.

**11.2.5. Evaluation assumptions**

The game evaluates player performance using checklist accuracy, portfolio ROI, an overall performance score, and a final fish classification.

* **Checklist Accuracy:** Measures the proportion of checklist answers that match the predefined benchmark answers. Checklist items use binary Yes/No responses.  
* **Portfolio ROI:** Measures the investment outcome relative to the player's initial capital. It reflects the combined effect of investment returns and capital allocation within the game.  
* **Overall Performance:** Combines checklist accuracy and portfolio performance according to the scoring weights established by the development team.  
* **Fish Classification:** Assigns players to game-design categories based on their overall scores. These categories are intended to make the experience engaging and provide feedback; they are not measures of real-world investment expertise.

The evaluation system is designed to assess performance within the rules and assumptions of the simulation. Its results should therefore be interpreted as educational feedback rather than a definitive assessment of a player's ability to make real-world investment decisions.

**11.3. Data Limitations**  
The project simplifies real-world investment analysis to maintain an accessible and manageable gameplay experience. Financial markets involve uncertainty, changing valuations, time-dependent cash flows, and outcomes that cannot be known with certainty in advance. These features are not fully represented by the game's fixed-return model.

Furthermore, checklist benchmarks and classification thresholds involve developer judgment. Although external sources and relevant benchmarks may inform these assumptions, not every threshold can be established from a directly comparable industry dataset. As a result, the scoring system reflects the project's chosen analytical framework rather than a universal standard for investment quality.

Finally, because investment outcomes are predetermined, the game prioritizes consistent evaluation and structured learning over the simulation of real-world market uncertainty. Players should use the experience to practice interpreting evidence, identifying risks, and comparing investment opportunities, rather than treating the game's classifications or returns as investment advice.

**11.4. Sources**

* **Wefunder.** Startup profiles, fundraising campaigns, and business-model examples used as references when developing fictional startup scenarios. [https\://wefunder.com/](https://wefunder.com/)  
* **Industry reports and publicly available market research.** Used where applicable to inform market size, growth forecasts, industry characteristics, and financial reference ranges. Specific reports are cited alongside the relevant data in the game or its supporting documentation.  
* [https\://multiples.vc/public-comps/oatly-valuation-multiples](https://multiples.vc/public-comps/oatly-valuation-multiples)  
* [https\://investors.beyondmeat.com/news-releases/news-release-details/beyond-meatr-reports-fourth-quarter-and-full-year-2025-financial](https://investors.beyondmeat.com/news-releases/news-release-details/beyond-meatr-reports-fourth-quarter-and-full-year-2025-financial)  
* [https\://www\.marketsandmarkets.com/Market-Reports/artificial-intelligence-medical-diagnostics-market-22519734.html](https://www.marketsandmarkets.com/Market-Reports/artificial-intelligence-medical-diagnostics-market-22519734.html)  
* [https\://www\.goldmansachs.com/insights/articles/the-creator-economy-could-approach-half-a-trillion-dollars-by-2027](https://www.goldmansachs.com/insights/articles/the-creator-economy-could-approach-half-a-trillion-dollars-by-2027)  
* [https\://www\.sec.gov/resources-small-businesses/small-business-compliance-guides/regulation-crowdfunding-guidance-issuers](https://www.sec.gov/resources-small-businesses/small-business-compliance-guides/regulation-crowdfunding-guidance-issuers)  
* [https\://firstpagesage.com/business/fintech-valuation-multiples](https://firstpagesage.com/business/fintech-valuation-multiples)  
* [https\://multiples.vc/insights/fintech-payments-valuation-multiples](https://multiples.vc/insights/fintech-payments-valuation-multiples)

  **11.5. Project team assumptions and simulated data.** 

Fictional company profiles, financial statements, predetermined investment returns, checklist benchmarks, scoring weights, and fish-classification thresholds developed specifically for the educational simulation.

12. **THE TEST CASES AND RESULTS** 

| Test group and input | Expected result | Recorded result and evidence |
| ----- | ----- | ----- |
| *Case registration and assets* Load all three cases. | Valid IDs, reachable dialogue, existing scripts and asset paths. | PASS \- campaign.test.cjs; clinova-update.test.cjs. |
| *Portfolio calculations* Enumerate 672 legal investment combinations. | Allocations respect the shared fund; profit agrees with configured ROI. | PASS \- campaign.test.cjs. 672 combinations are inputs inside a test, not 672 additional tests. |
| *Decision validation* Skip documents; leave checklist incomplete; omit choice; exceed funds or use invalid steps. | Direct Decision is allowed. Confirmation requires a complete checklist, a choice and valid allocation. | PASS \- campaign.test.cjs; clinova-update.test.cjs. |
| *Persistence and report* Save/reload, corrupt storage, replay earlier decisions. | Valid progress restores; invalid state is handled; report availability and later decisions remain consistent. | PASS \- campaign.test.cjs. |
| *Tutorial and rendering* Load slides asynchronously; press arrows; change text and tabs. | Eleven slides stay ordered; arrows work while the tutorial is open; scene images are reused. | PASS \- ui-render.test.cjs. |
| *Loading and image failure* Duplicate requests; failed image; retry or continue. | Wait for image readiness, deduplicate requests, allow explicit recovery. | PASS \- image-loader.test.cjs; loading.test.cjs. |
| *Audio lifecycle* Prepare tracks, switch scenes, mute, block autoplay, move slider. | Preparation does not play audio; scene/mute behavior and retries work; slider sounds are throttled. | PASS \- audio.test.cjs. Actual perceived latency was not measured. |

13. **THE KNOWN STRENGTHS**   
* **Clear learning objectives:** Bridges the gap between financial theory and practical due diligence by helping students assess start-ups, identify risks, and make structured investment decisions.  
* **End-to-end investment process:** Guides players through pitch review, financial analysis, founder Q\&A, due diligence, investment decisions, capital allocation, and performance review.  
* **Evidence-based analysis:** Integrates financial data, industry context, and founder responses to encourage cross-checking information and evaluating risks beyond the initial pitch.  
* **Structured evaluation:** Combines Checklist Accuracy and Investment Performance to distinguish the quality of due diligence from financial outcomes, supported by case-level feedback and investment reports.  
* **Scalable MVP structure:** Uses standardized cases, predefined investment terms, and branching dialogue to enable manageable development, systematic testing, and future case expansion.  
    
14. **THE KNOWN LIMITATIONS**   
* **Simplified investment conditions:** Predefined investment–equity terms and simulated returns limit the game's ability to replicate real-world valuation, negotiation, and investment uncertainty.  
* **Limited interaction and case diversity:** Preset dialogue branches restrict open-ended exploration, while the three available cases cover only a limited range of industries and investment scenarios.  
* **Simplified performance measurement:** Binary checklists may oversimplify investment judgments, while the equal weighting of Checklist Accuracy and Return Score has not been empirically validated.  
* **Usability and engagement challenges:** Text-heavy content, technical terminology, repetitive interactions, and limited feedback may increase cognitive burden and reduce player engagement.  
* **Limited evidence of learning effectiveness:** Current testing and feedback do not yet establish whether the game measurably improves players’ due diligence and investment decision-making skills.  
    
15. **THE MAIN REVISIONS MADE AFTER THE MIDTERM & WHAT WE HAVE LEARNT** 

Following the midterm, we completed our first game demo and identified several key areas for improvement:

* Replace text-heavy data presentations with charts to help players identify industry and business trends more intuitively, while improving engagement and reducing reading fatigue.  
* Introduce a checklist after each case to help players identify strengths and weaknesses in their analysis, review their decisions, and learn from each investment scenario.  
* Standardize the investment report format across the game to ensure consistency in how players’ analyses, decisions, and investment outcomes are presented.  
* Develop a cohesive visual identity aligned with the game’s educational objectives, using distinctive character designs and facial expressions to make founder interactions more engaging.  
* Introduced an evidence check map to organize key information and help the team locate and track supporting evidence for each case more efficiently.  
* Added introductory gameplay instructions to clarify the player’s role, objectives, and required actions, ensuring a smoother and more accessible gaming experience.

Throughout the development of **Pitch & Ledger,** we gained several important lessons that shaped both our approach to product development and our understanding of financial education.

* **The most important lesson**: Understanding players’ needs throughout the gaming journey is essential. We consistently asked, *“How can players understand what to do next?”* This highlighted the importance of clear instructions, intuitive navigation, accessible terminology, and meaningful feedback.  
* **Alignment with project objectives:** Every feature, from gameplay mechanics to financial analysis and evidence mapping, must support our core objectives: helping players practice due diligence, identify risks, and make informed investment decisions.  
* **Centralized documentation:** Maintaining an organized repository for case materials, financial data, dialogue scripts, and evidence ensures continuity across development stages, minimizes inconsistencies, and keeps the team aligned.  
    
16. **RECOMMENDATION FOR FURTHER DEVELOPMENT**   
* **Improve usability and engagement:** Simplify initial instructions, reduce text-heavy content, clarify financial terminology, and make founder dialogues more natural and distinctive.  
* **Expand the case library:** Introduce startups across diverse industries, business models, and financial conditions while maintaining a consistent case structure and incorporating varied risks and evidence.  
* **Enhance realism gradually:** Introduce additional information sources, valuation models, investment negotiations, and portfolio analysis once the core gameplay is reliable.  
* **Strengthen user testing:** Test with target users to evaluate usability, engagement, and learning outcomes, using feedback to refine cases, Q\&A branches, checklists, and post-case feedback.  
* **Prioritize core quality:** Focus on reliable financial logic, transparent evaluation, and measurable learning value before introducing more complex features.


