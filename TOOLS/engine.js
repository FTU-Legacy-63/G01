/* Pure per-case financial functions. No DOM or storage. */
(()=>{
"use strict";
window.PitchLedger = window.PitchLedger || {};
const positive = x => Number.isFinite(x) && x > 0;
const EPS = 1e-8;
function fundValue(config) {
  const value = config.initialCapital * config.moneyUnit;
  return positive(config.initialCapital) && positive(config.moneyUnit) && config.currency && positive(value) ? value : null;
}
function availableFundValue(config) {
  const initial = fundValue(config);
  if (initial === null) return null;
  return Number.isFinite(config.availableCapital) && config.availableCapital >= 0 ? Math.min(config.availableCapital, initial) : initial;
}
function conversionRate(config, p) {
  if (config.currency === p.deal.currency) return 1;
  return positive(config.dealToFundRate) ? config.dealToFundRate : null;
}
function investmentBounds(config, p, availableOverride) {
  const d = p.deal, issues = [];
  const fund = Number.isFinite(availableOverride) ? availableOverride : availableFundValue(config);
  const rate = conversionRate(config, p);
  if (fund === null || fund < 0) issues.push("Available fund capital and currency are not configured.");
  if (!rate) issues.push(`A fixed ${config.currency || "fund currency"}-per-${d.currency || "deal currency"} conversion rate is required.`);
  if (!positive(d.unit) || !positive(d.referenceInvestment) || !positive(d.referenceEquity)) issues.push("The fixed investment–equity price is invalid.");
  if (!Number.isFinite(d.minEquity) || d.minEquity < 0 || d.minEquity > 1) issues.push("The case minimum equity is not specified.");
  if (!positive(d.maxEquity) || d.maxEquity > 1 || (Number.isFinite(d.minEquity) && d.maxEquity < d.minEquity)) issues.push("The case maximum equity is invalid.");
  if (!positive(d.investmentStep)) issues.push("The investment slider step is not specified.");
  if (issues.length) return { available: false, issues };
  const price = d.referenceInvestment / d.referenceEquity;
  const step = d.investmentStep;
  const min = d.minEquity === 0 ? step : price * d.minEquity;
  const rawMax = Math.min(price * d.maxEquity, fund / rate / d.unit);
  const max = min + Math.floor((rawMax - min) / step + EPS) * step;
  if (max < min - EPS || min * d.unit * rate > fund + EPS) return { available: false, issues: ["Available campaign capital is below the minimum investment for this case."] };
  return { available: true, issues: [], min, max, step, price, rate, fund };
}
function checklistResult(p, answers) {
  if (!Array.isArray(p.checklist) || !p.checklist.length) throw new Error("The case checklist is empty.");
  const seen = new Set();
  const items = p.checklist.map(item => {
    if (seen.has(item.id)) throw new Error("Duplicate checklist ID.");
    seen.add(item.id);
    if (typeof item.benchmark !== "boolean") throw new Error("A checklist benchmark is missing.");
    if (typeof answers[item.id] !== "boolean") throw new Error("Complete all checklist questions first.");
    return { id: item.id, statement: item.statement, answer: answers[item.id], expected: item.benchmark,
      correct: answers[item.id] === item.benchmark, explanation: item.explanation,
      feedback: item.feedback, evidenceIds: item.evidenceIds };
  });
  const correct = items.filter(item => item.correct).length;
  return { items, correct, total: items.length, accuracy: correct / items.length * 100 };
}
function evaluateCase(config, p, answers, decision, amount, availableOverride) {
  const checklist = checklistResult(p, answers);
  if (!["invest", "reject"].includes(decision)) throw new Error("Select Invest or Reject.");
  const campaignInitialCapital = fundValue(config);
  const availableCapitalBefore = Number.isFinite(availableOverride) ? availableOverride : availableFundValue(config);
  if (campaignInitialCapital === null || availableCapitalBefore === null) throw new Error("Fund capital and currency are not configured.");
  if (!Number.isFinite(p.deal.roi) || p.deal.roi < -1) throw new Error("Invalid simulated return.");
  let investment = 0, equity = 0, allocatedCapital = 0, rate = null;
  if (decision === "invest") {
    const bounds = investmentBounds(config, p, availableCapitalBefore);
    if (!bounds.available) throw new Error(bounds.issues.join(" "));
    if (!positive(amount) || amount < bounds.min - EPS || amount > bounds.max + EPS) throw new Error("Investment is outside the permitted range.");
    const steps = (amount - bounds.min) / bounds.step;
    if (Math.abs(steps - Math.round(steps)) > EPS) throw new Error("Investment does not match the slider step.");
    investment = amount;
    equity = investment / bounds.price;
    rate = bounds.rate;
    allocatedCapital = investment * p.deal.unit * rate;
    if (allocatedCapital > availableCapitalBefore + EPS) throw new Error("Investment exceeds available campaign capital.");
  } else if (amount !== 0) throw new Error("A rejected deal must have zero investment.");
  const profit = allocatedCapital * p.deal.roi;
  const recovered = allocatedCapital + profit;
  return {
    caseId: p.id, caseName: p.name, decision, investment, equity, rate,
    campaignInitialCapital, availableCapitalBefore, allocatedCapital,
    availableCapitalAfterAllocation: availableCapitalBefore - allocatedCapital,
    roi: p.deal.roi, profit, recovered, checklist
  };
}
function confirmationProblem(config, p, state) {
  if (state.committed) return "This decision is already confirmed.";
  try { evaluateCase(config, p, state.answers, state.decision, state.amount); return ""; }
  catch (error) { return error.message; }
}
Object.assign(window.PitchLedger, {
  fundValue, availableFundValue, conversionRate, investmentBounds, checklistResult,
  evaluateCase, evaluate: evaluateCase, confirmationProblem
});
})();
