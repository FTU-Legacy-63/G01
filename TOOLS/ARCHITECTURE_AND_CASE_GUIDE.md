Audio integration (2026-10-13): see `docs/AUDIO_INTEGRATION_OCT13.md` for the isolated audio service, UI adapter and asset configuration. Core/case data/save contracts are unchanged.

Current authoritative behavior: `docs/OPEN_DECISION_OCT03.md`. Earlier handover documents are historical and may describe removed research gates.

# Current contract — 2026-10-03

See `docs/OPEN_DECISION_OCT03.md` for the current flow, source update and restored case-owned presentation modules. Tutorial precedes Case 1. Research and Decision tabs are freely accessible. Only confirmation requires all checklist answers, an Invest/Reject choice and a valid allocation. Each case now has `presentation.js` loaded before campaign/session/UI. UI adapters contain no authored case data. Older linear flow illustrations below are suggested journeys, not navigation locks.

# Pitch & Ledger — Architecture, Campaign Flow & Case Authoring Guide

## 1. Design contract

Pitch & Ledger is a multi-case startup-investment game. The architecture deliberately separates **game rules** from **case content**:

```text
CASE DATA
  founder / pitch / documents / Q&A / checklist / deal / report commentary
        ↓
CORE ENGINES
  case validation / financial constraints / campaign ledger / final scoring
        ↓
STATE
  per-case progress + campaign decisions
        ↓
UI RENDERERS
  dialogue scenes / analyst workspace / final campaign report
        ↓
PLAYER ACTIONS
```

A new startup must be addable without editing scoring formulas or report logic. If adding a case requires a special `if (caseId === ...)` inside `core/`, `ui/` or `app.js`, the abstraction has been broken.

The project intentionally uses classic `<script>` files rather than ES modules so the extracted folder can still be opened by **double-clicking `index.html` (`file://`)** without a build step or local server.

## 2. Folder responsibilities

```text
pitch-ledger-scene-edition/
│
├── index.html
├── app.js                         # interaction wiring only
│
├── game/
│   ├── config.js                  # global fund + final-score weights
│   └── campaign.js                # enabled case order and campaign labels
│
├── core/
│   ├── registry.js                # case registration + structural validation
│   ├── narrative.js               # dialogue/pitch segmentation
│   ├── engine.js                  # pure single-case constraints/evaluation
│   ├── campaign-ledger.js         # shared capital + campaign persistence
│   ├── report-engine.js           # final campaign aggregation/scoring
│   ├── flow.js                    # stage guards
│   ├── state.js                   # per-case state/save
│   └── session.js                 # resolves active case + available capital
│
├── ui/
│   ├── scenes.js                  # visual-novel scenes + workspace composition
│   └── screens.js                 # documents, decision, final report content
│
├── cases/
│   ├── _template/case.js
│   └── plantfish/
│       ├── case.js                # Plantfish content only
│       └── scenes.js              # Plantfish visual presentation only
│
├── assets/
├── css/styles.css
├── README.md
└── VERIFICATION.txt
```

### Dependency direction

Allowed:

```text
case data → registry → engines → state → UI
```

Not allowed:

```text
core engine → Plantfish-specific content
report engine → special case IDs
case file → scoring formula
case file → campaign total score
```

## 3. Script loading order

`index.html` loads scripts in this order:

1. `game/config.js`
2. `core/registry.js`
3. all enabled case data and optional scene files
4. `game/campaign.js`
5. `core/narrative.js`
6. `core/engine.js`
7. `core/campaign-ledger.js`
8. `core/report-engine.js`
9. `core/flow.js`
10. `core/state.js`
11. `core/session.js`
12. `ui/screens.js`
13. `ui/scenes.js`
14. `app.js`

The order is part of the runtime contract. `session.js`, for example, needs the registry, campaign, financial engine and campaign ledger to exist before it can calculate the capital available for the active case.

## 4. Game flow

The player-facing flow is:

```text
CONFIDENTIAL FUND-MANAGER BRIEFING
                 ↓
CASE 1
Pitch → Investigation → Founder Q&A → Assessment → Commit decision
                 ↓
CASE 2
Pitch → Investigation → Founder Q&A → Assessment → Commit decision
                 ↓
...
                 ↓
FINAL CASE
Pitch → Investigation → Founder Q&A → Assessment → Commit decision
                 ↓
FINAL INVESTMENT REPORT
```

The confidential manager briefing is campaign-level and appears before the first case. Following cases open directly into their founder scene.

### Stage guards inside a case

- Pitch, Documents and Q&A are freely accessible after the mandatory tutorial, in any order.
- Decision is accessible immediately; pitch, document visits and Q&A are optional.
- All checklist answers plus an Invest/Reject selection are required before confirmation.
- Once confirmed, that case decision is locked into the campaign ledger.
- `Results` unlocks only when every case in `campaign.caseOrder` has a committed decision.

## 5. Shared campaign capital

The fund is no longer reset for each startup.

Let initial campaign capital be:

```text
V0 = USD 10,000,000   (current config)
```

When a player allocates capital to a startup, that amount is committed and cannot be reused in a later case. If previous cases allocated USD 8m, the next case begins with USD 2m available.

The investment principal is not added back to available capital between cases. Outcomes are aggregated in the final report. This is what makes cases compete for the **same fund**.

If remaining campaign capital is below a case's minimum investment, Invest becomes unavailable for that case; Reject remains available.

## 6. Per-case evaluation (`core/engine.js`)

The single-case engine does **not** calculate an overall player score anymore. It validates the decision and returns case facts:

- checklist result
- Invest / Reject decision
- deal amount and equity
- capital allocated in fund currency
- authored case ROI
- realized profit/loss
- available capital before/after allocation

For case `i`:

```text
AllocatedCapital_i = valid player investment converted to fund currency
ProfitLoss_i        = AllocatedCapital_i × ROI_i
```

For Reject:

```text
AllocatedCapital_i = 0
ProfitLoss_i        = 0
```

**Invest and Reject are not scored as objectively correct/incorrect.** The decision affects portfolio exposure and therefore the realized portfolio outcome.

## 7. Campaign ledger (`core/campaign-ledger.js`)

The campaign ledger persists only player inputs required to reconstruct results:

```js
{
  completed: {
    "plantfish": {
      decision: "invest",
      amount: 1200,
      answers: { /* checklist booleans */ }
    }
  }
}
```

It does not trust or persist a final score. Case results are recomputed from current case definitions and current core formulas.

### Capital dependency and replay

A later case depends on allocations made earlier. Therefore replaying an earlier case clears its campaign decision **and all later campaign decisions**. This prevents a later case from retaining a decision that was made under a different capital constraint.

## 8. Final Investment Report

The final report follows three sections:

### 8.1 Overall Performance

Displays:

- Checklist Accuracy
- Portfolio Return
- Return Score
- Overall Performance
- Performance Category
- auto-generated comparison of analytical accuracy vs realized portfolio outcome

### 8.2 Portfolio Overview

One dynamic row per campaign case:

```text
Startup | Decision | Capital allocated | ROI | Profit/Loss | Accuracy | Details
```

There is no hard-coded case count. The renderer loops over `campaign.caseOrder` and the campaign results.

### 8.3 Case-by-case Due Diligence

Each case contains:

- Decision
- Capital Allocated
- Realized ROI
- Profit/Loss
- Case Checklist Accuracy
- checklist item comparison: player assessment vs benchmark
- What You Identified Well
- What You Missed
- Benchmark Investment View
- Key Takeaways

`Benchmark Investment View` is qualitative reference commentary. It must not convert the investment decision into a right/wrong quiz answer.

## 9. Final scoring formulas (`core/report-engine.js`)

### 9.1 Case checklist accuracy

For case `i`:

```text
A_i = CorrectItems_i / TotalItems_i × 100
```

### 9.2 Overall Checklist Accuracy

Each case supplies a positive `report.caseWeight` (`w_i`). Default authoring convention is `1`.

```text
A = Σ(w_i × A_i) / Σ(w_i)
```

Equal case weights mean a 15-question case does not automatically count three times as much as a 5-question case. Checklist length can therefore reflect case design needs without silently changing campaign weighting.

### 9.3 Portfolio profit/loss and return

```text
P_i = AllocatedCapital_i × ROI_i
P   = Σ P_i
FinalFundValue = V0 + P
PortfolioReturn (R_player) = P / V0
```

Unallocated capital earns 0% in the current simulation.

### 9.4 Feasible opportunity envelope

Fixed return-score bands were removed because they do not scale when the number, size or payoff of cases changes.

The engine instead calculates the best and worst feasible portfolio return from the **actual campaign opportunity set**, under the same:

- initial fund
- case order / case set
- minimum investment constraints
- maximum investment constraints
- investment steps
- case currencies/conversion rule
- realized case ROIs
- total shared-capital constraint

For each case, the feasible choices are:

```text
Reject (0 allocation)
OR
any valid discrete investment amount between min and max
```

The report engine solves the resulting discrete allocation problem using a Pareto-pruned dynamic program. It returns:

```text
R_best  = best feasible campaign return
R_worst = worst feasible campaign return
```

The implementation is exact for the configured discrete deal steps. To keep the state space practical, one case may expose at most 20,000 investment amounts; author meaningful investment increments rather than dollar-by-dollar sliders.

### 9.5 Return Score

```text
ReturnScore = clamp(
  100 × (R_player - R_worst) / (R_best - R_worst),
  0,
  100
)
```

If `R_best == R_worst`, the campaign opportunity set gives no meaningful outcome dispersion, so:

```text
ReturnScore = 50
```

### 9.6 Overall Performance

Weights live in `game/config.js`, not inside cases.

Current configuration:

```text
checklistWeight = 0.50
returnWeight    = 0.50
```

Formula:

```text
OverallPerformance
  = ChecklistAccuracy × checklistWeight
  + ReturnScore × returnWeight
```

### 9.7 Performance Category

```text
>= 85   Shark — Excellent
>= 70   Tuna — Strong
>= 50   Clownfish — Average
>= 30   Pufferfish — Weak
<  30   Minnow — Poor
```

The category is produced once for the whole campaign, not once per case.

### 9.8 Summary sentence

Let:

```text
D = ChecklistAccuracy - ReturnScore
```

- `D > 10`: due-diligence accuracy was stronger than realized portfolio outcome.
- `D < -10`: realized portfolio outcome was stronger than due-diligence accuracy.
- otherwise: analytical performance and realized portfolio outcome were broadly balanced.

The wording intentionally says **realized portfolio outcome**, not “decision-making skill,” because realized returns are an outcome measure rather than a pure measurement of skill.

## 10. Case schema relevant to the final report

Every case continues to provide its own `checklist` and `deal.roi`, and now must also provide:

```js
report: {
  caseWeight: 1,

  benchmarkInvestmentView:
    "Qualitative reference interpretation. Do not declare Invest/Reject objectively correct.",

  keyTakeaways: [
    "Case-specific lesson 1.",
    "Case-specific lesson 2."
  ]
}
```

### Ownership of fields

Case-owned:

```text
checklist benchmarks + feedback
caseWeight
deal.roi
benchmarkInvestmentView
keyTakeaways
```

Core-owned:

```text
overall checklist formula
portfolio aggregation
R_best / R_worst optimization
Return Score formula
Overall Performance formula
performance categories
summary thresholds
```

Never place a hard-coded `returnScore`, `overallPerformance`, `classification`, “correct investment decision,” or campaign total inside `case.js`.

## 11. Adding a new case

1. Copy `cases/_template/case.js` to `cases/<new-id>/case.js`.
2. Replace all sample content and give the case a unique lowercase slug.
3. Supply pitch, documents, financial statements, Q&A, checklist and deal terms.
4. Supply an authored realized `deal.roi`. The engine does not infer ROI from financial statements.
5. Add the `report` block shown above.
6. Optionally create `scenes.js` with background, sprite/expression mapping, pitch lines and voice clips.
7. Add the case `<script>` tags to `index.html` after `core/registry.js` and before `game/campaign.js`.
8. Add the case ID to `game/campaign.js` → `caseOrder` in intended play order.
9. Do **not** edit `report-engine.js`, `campaign-ledger.js`, `ui/screens.js` or `app.js` merely because a new case was added.
10. Test full flow, min/max/step constraints, reload, replay, blocked storage and final report.

## 12. Case registry validation

`core/registry.js` rejects a case when required structural fields are missing or malformed. Report authoring now requires:

- positive finite `report.caseWeight`
- non-empty `report.benchmarkInvestmentView`
- non-empty string array `report.keyTakeaways`

The validator also checks dialogue IDs, choice targets, checklist IDs/benchmarks, financial-row dimensions and evidence references.

## 13. Storage

There are two separate save layers:

```text
pitch-ledger-campaign-v1
    campaign decisions / shared-capital progression

pitch-ledger-scenes-v2:case:<case-id>
    scene progress / document visits / notes / local case state
```

The campaign save signature includes the global fund/scoring configuration, campaign case order, and score-relevant case definitions. Meaningful changes invalidate incompatible campaign saves rather than silently mixing old decisions with new rules.

Per-case saves include the active case data plus the campaign capital available before that case.

If `localStorage` is blocked, the game remains playable in memory but progress may not survive reload.

## 14. Presentation architecture

Pitch and Q&A share the visual-novel renderer. Case-specific `scenes.js` may supply:

- background image
- sprite sheet
- expression map
- default expression
- authored pitch segmentation
- voice clips

Documents and Assessment use the analyst workspace renderer. The Final Investment Report is campaign-level even though it is displayed while the final case page is active.

## 15. Authoring principles

- Keep authored content as plain text; UI inserts it with `textContent`.
- Do not infer missing financial units or source facts.
- Checklist benchmarks measure analytical identification, not whether the player chose Invest or Reject.
- Case ROI is a simulation outcome chosen by the level designer and should be documented.
- Benchmark Investment View can explain a reasonable interpretation, but it must acknowledge that investment strategies and risk tolerance can differ.
- The final score deliberately separates **analytical accuracy** from **realized portfolio outcome**.
# Ghi chú bản tích hợp 2026-09-28

Campaign hiện có Plantfish, CreoExchange, Clinova AI. Đọc `docs/ARCHITECTURE.md` và `docs/CONTENT_EDITING.md` để biết các trường tùy chọn mới (`industryTables`, `operatingMetrics`, `financials.notes`), evidence anchors và quy trình nhập nguồn. Phần dưới được giữ từ tài liệu kỹ thuật bản nền.
