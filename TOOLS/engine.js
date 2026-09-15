/* Classic script: supports both file:// and HTTP. */
(()=>{
"use strict";
window.PitchLedger = window.PitchLedger || {};
// Pure financial functions. No DOM, localStorage or mutation of case data.
const positive = x => Number.isFinite(x) && x > 0;
const EPS = 1e-8;
function fundValue(config) {
  const value = config.initialCapital * config.moneyUnit;
  return positive(config.initialCapital) && positive(config.moneyUnit) && config.currency && positive(value) ? value : null;
}
function conversionRate(config, p) {
  if (config.currency === p.deal.currency) return 1;
  return positive(config.dealToFundRate) ? config.dealToFundRate : null;
}
function investmentBounds(config, p) {
  const d = p.deal, issues = [], fund = fundValue(config), rate = conversionRate(config, p);
  if (fund === null) issues.push("Initial fund capital and currency are not configured.");
  if (!rate) issues.push(`A fixed ${config.currency || "fund currency"}-per-${d.currency || "deal currency"} conversion rate is required.`);
  if (!positive(d.unit) || !positive(d.referenceInvestment) || !positive(d.referenceEquity)) issues.push("The fixed investment–equity price is invalid.");
  if (!Number.isFinite(d.minEquity) || d.minEquity < 0 || d.minEquity > 1) issues.push("The case minimum equity is not specified.");
  if (!positive(d.maxEquity) || d.maxEquity > 1 || (Number.isFinite(d.minEquity) && d.maxEquity < d.minEquity)) issues.push("The case maximum equity is invalid.");
  if (!positive(d.investmentStep)) issues.push("The investment slider step is not specified.");
  if (issues.length) return { available: false, issues };
  // Amounts below are in case storage units; fund is in actual currency units.
  const price = d.referenceInvestment / d.referenceEquity;
  const step = d.investmentStep;
  const min = d.minEquity === 0 ? step : price * d.minEquity;
  const rawMax = Math.min(price * d.maxEquity, fund / rate / d.unit);
  const max = min + Math.floor((rawMax - min) / step + EPS) * step;
  if (max < min - EPS || min * d.unit * rate > fund + EPS) return { available: false, issues: ["Available fund capital is below the minimum investment."] };
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
function returnScore(config, returnRatio) {
  const band = config.returnScoreBands.find(b => returnRatio >= b.min);
  return band ? band.score : config.returnScoreBelowBands;
}
function classification(score) {
  if (score >= 85) return "Shark — Excellent";
  if (score >= 70) return "Tuna — Strong";
  if (score >= 50) return "Clownfish — Average";
  if (score >= 30) return "Pufferfish — Weak";
  return "Minnow — Poor";
}
function evaluate(config, p, answers, decision, amount) {
  const checklist = checklistResult(p, answers);
  if (!["invest", "reject"].includes(decision)) throw new Error("Select Invest or Reject.");
  const initialCapital = fundValue(config);
  if (initialCapital === null) throw new Error("Fund capital and currency are not configured.");
  if (!Number.isFinite(p.deal.roi) || p.deal.roi < -1) throw new Error("Invalid simulated return.");
  if (!Number.isFinite(config.checklistWeight) || !Number.isFinite(config.returnWeight) || config.checklistWeight < 0 || config.returnWeight < 0 || Math.abs(config.checklistWeight + config.returnWeight - 1) > EPS) throw new Error("Invalid scoring weights.");
  let investment = 0, equity = 0, investedFund = 0, rate = null;
  if (decision === "invest") {
    const bounds = investmentBounds(config, p);
    if (!bounds.available) throw new Error(bounds.issues.join(" "));
    if (!positive(amount) || amount < bounds.min - EPS || amount > bounds.max + EPS) throw new Error("Investment is outside the permitted range.");
    const steps = (amount - bounds.min) / bounds.step;
    if (Math.abs(steps - Math.round(steps)) > EPS) throw new Error("Investment does not match the slider step.");
    investment = amount;
    equity = investment / bounds.price;
    rate = bounds.rate;
    investedFund = investment * p.deal.unit * rate;
    if (investedFund > initialCapital + EPS) throw new Error("Investment exceeds available capital.");
  } else if (amount !== 0) throw new Error("A rejected deal must have zero investment.");
  const profit = investedFund === 0 ? 0 : investedFund * p.deal.roi;
  const recovered = investedFund + profit;
  const uninvestedCapital = initialCapital - investedFund;
  const finalCapital = uninvestedCapital + recovered;
  const portfolioReturn = profit / initialCapital;
  const score = returnScore(config, portfolioReturn);
  const overall = checklist.accuracy * config.checklistWeight + score * config.returnWeight;
  return { decision, investment, equity, rate, initialCapital, investedFund, uninvestedCapital,
    profit, recovered, finalCapital, portfolioReturn, returnScore: score,
    overall, classification: classification(overall), checklist };
}
function confirmationProblem(config, p, state) {
  if (state.committed) return "This decision is already confirmed.";
  try { evaluate(config, p, state.answers, state.decision, state.amount); return ""; }
  catch (error) { return error.message; }
}

Object.assign(window.PitchLedger, { fundValue, conversionRate, investmentBounds, checklistResult, returnScore, classification, evaluate, confirmationProblem });
})();
