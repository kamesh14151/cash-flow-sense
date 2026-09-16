import type {
  Analysis,
  Borrower,
  DecompositionResult,
  Evidence,
  ForecastPoint,
  ModelConfiguration,
  MonitoringOutcome,
  PeriodPoint,
  RSIComponents,
  RSIScore,
  RepaymentPlanOption,
  StressState,
} from "./types";

/* ------------------------------------------------------------------ *
 * Deterministic simulated analysis engine.
 * All model behaviour is isolated here so the UI never computes logic.
 * Replaceable later by STL / Prophet / XGBoost / SHAP services.
 * ------------------------------------------------------------------ */

export const DEFAULT_CONFIG: ModelConfiguration = {
  version: "cfc-model-2026.09.1",
  weights: { CBR: 25, RV: 15, TM: 20, RTR: 15, USD: 15, ESI: 10 },
  thresholds: { stable: 30, seasonal: 50, emerging: 70 },
  rules: {
    "Stable": ["Early Close", "Top-Up Eligibility"],
    "Seasonal Dip": ["Seasonal Step-Down", "Skip & Redistribute", "Tenure Extension"],
    "Emerging Stress": ["Seasonal Step-Down", "Tenure Extension", "Moratorium"],
    "Structural Decline": ["Moratorium", "Tenure Extension", "Skip & Redistribute"],
  },
};

export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
export const inr = (v: number) =>
  `${v < 0 ? "-" : ""}₹${Math.abs(Math.round(v)).toLocaleString("en-IN")}`;

export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const mean = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0);
const std = (xs: number[]) => {
  const m = mean(xs);
  return Math.sqrt(mean(xs.map((x) => (x - m) ** 2)));
};

/* ---------------------------- decomposition ---------------------------- */

export function decomposeCashFlow(b: Borrower): DecompositionResult {
  const h = b.history;
  const income = h.map((p) => p.income);
  const window = 5;
  const trend = income.map((_, i) => {
    const s = Math.max(0, i - Math.floor(window / 2));
    const e = Math.min(income.length, s + window);
    return mean(income.slice(s, e));
  });
  const detrended = income.map((v, i) => v - trend[i]);

  // seasonal profile learned from the first 12 observations (history baseline)
  const baseline = detrended.slice(0, Math.max(12, detrended.length - 6));
  const profile: number[] = Array.from({ length: 12 }, (_, m) => {
    const vals = baseline.filter((_, i) => i % 12 === m);
    return vals.length ? mean(vals) : 0;
  });
  const seasonal = detrended.map((_, i) => profile[i % 12]);
  const residual = income.map((v, i) => v - trend[i] - seasonal[i]);

  const avg = mean(income) || 1;
  const recentDetrended = detrended.slice(-4);
  const recentSeasonal = seasonal.slice(-4);
  // how well the recent deviation is explained by the learned seasonal shape
  const explained =
    1 -
    mean(recentDetrended.map((d, i) => Math.abs(d - recentSeasonal[i]))) /
      (mean(recentDetrended.map((d) => Math.abs(d))) + avg * 0.06);
  const seasonalMatch = Math.round(clamp(explained, 0.05, 0.96) * 100);

  const slope = (mean(income.slice(-4)) - mean(income.slice(-10, -4))) / avg;
  const trendDirection = slope > 0.03 ? "Improving" : slope < -0.06 ? "Declining" : "Stable";
  const rv = std(residual) / avg;

  return {
    borrowerId: b.id,
    points: h.map((p, i) => ({
      label: p.label,
      observed: Math.round(p.income),
      trend: Math.round(trend[i]),
      seasonal: Math.round(seasonal[i]),
      residual: Math.round(residual[i]),
    })),
    seasonalMatch: b.overrides?.seasonalMatch ?? seasonalMatch,
    trendDirection,
    residualVolatility: Number(rv.toFixed(3)),
    confidence: seasonalMatch > 70 ? "High" : seasonalMatch > 45 ? "Moderate" : "Low",
  };
}

/* ------------------------------- forecast ------------------------------ */

export function forecastCashFlow(b: Borrower, periods = 3, drift = 0): ForecastPoint[] {
  const d = decomposeCashFlow(b);
  const h = b.history;
  const income = h.map((p) => p.income);
  const avg = mean(income) || 1;
  const slope = (mean(income.slice(-3)) - mean(income.slice(-9, -3))) / 3;
  const last = h.length - 1;
  const rv = d.residualVolatility;

  return Array.from({ length: periods }, (_, k) => {
    const idx = last + k + 1;
    const seasonalTerm = d.points.length
      ? d.points[idx % 12 < d.points.length ? idx % 12 : 0].seasonal
      : 0;
    const base =
      mean(income.slice(-3)) + slope * (k + 1) + seasonalTerm * 0.6 + drift * avg * (k + 1);
    const band = avg * (0.07 + rv * 0.8) * (1 + k * 0.35);
    return {
      borrowerId: b.id,
      period: nextLabel(h[last].month, k + 1),
      pointEstimate: Math.round(base),
      lowerBound: Math.round(base - band),
      upperBound: Math.round(base + band),
    };
  });
}

export function nextLabel(month: string, offset: number) {
  const [y, m] = month.split("-").map(Number);
  const d = new Date(Date.UTC(y, m - 1 + offset, 1));
  return d.toLocaleString("en-US", { month: "short", year: "2-digit", timeZone: "UTC" });
}

/* --------------------------------- RSI --------------------------------- */

export function calculateRSI(
  b: Borrower,
  config: ModelConfiguration = DEFAULT_CONFIG,
  cycle = 6,
): RSIScore {
  const d = decomposeCashFlow(b);
  const f = forecastCashFlow(b);
  const h = b.history;
  const income = h.map((p) => p.income);
  const avg = mean(income) || 1;
  const expectedInflow = f[0].pointEstimate;
  const expectedExpense = mean(h.slice(-3).map((p) => p.expense));
  const buffer = expectedInflow - expectedExpense - b.loan.installment;
  const ratio = buffer / Math.max(1, b.loan.installment);

  const slope = (mean(income.slice(-4)) - mean(income.slice(-10, -4))) / avg;
  const missed = h.slice(-12).filter((p) => !p.paidOnTime).length;
  const expenseRatioNow = mean(h.slice(-3).map((p) => p.expense / Math.max(1, p.income)));
  const expenseRatioBefore = mean(h.slice(-12, -6).map((p) => p.expense / Math.max(1, p.income)));

  const raw: RSIComponents = {
    CBR: clamp(1 - (ratio + 0.2) / 1.1) * config.weights.CBR,
    RV: clamp(d.residualVolatility * 3.2) * config.weights.RV,
    TM: clamp((-slope + 0.02) / 0.22) * config.weights.TM,
    RTR: clamp(missed / 4) * config.weights.RTR,
    USD: clamp(1 - d.seasonalMatch / 100) * config.weights.USD,
    ESI: clamp((expenseRatioNow - expenseRatioBefore + 0.02) / 0.2) * config.weights.ESI,
  };

  const components: RSIComponents = {
    CBR: round1(b.overrides?.CBR ?? raw.CBR),
    RV: round1(b.overrides?.RV ?? raw.RV),
    TM: round1(b.overrides?.TM ?? raw.TM),
    RTR: round1(b.overrides?.RTR ?? raw.RTR),
    USD: round1(b.overrides?.USD ?? raw.USD),
    ESI: round1(b.overrides?.ESI ?? raw.ESI),
  };

  const value =
    b.overrides?.rsi ??
    Math.round(Object.values(components).reduce((a, c) => a + c, 0));

  return {
    borrowerId: b.id,
    cycle,
    value,
    components,
    state: b.overrides?.state ?? classifyStress(value, d.seasonalMatch, d.trendDirection, config),
  };
}

const round1 = (v: number) => Math.round(v * 10) / 10;

export function classifyStress(
  rsi: number,
  seasonalMatch: number,
  trend: "Improving" | "Stable" | "Declining",
  config: ModelConfiguration = DEFAULT_CONFIG,
): StressState {
  const t = config.thresholds;
  if (rsi <= t.stable) return "Stable";
  if (rsi <= t.seasonal) return seasonalMatch >= 60 ? "Seasonal Dip" : "Emerging Stress";
  if (rsi <= t.emerging) {
    if (seasonalMatch >= 75 && trend !== "Declining") return "Seasonal Dip";
    return "Emerging Stress";
  }
  return seasonalMatch >= 80 && trend !== "Declining" ? "Emerging Stress" : "Structural Decline";
}

/* ------------------------------- evidence ------------------------------ */

export function generateEvidence(b: Borrower, a: Omit<Analysis, "evidence" | "plans">): Evidence[] {
  const { rsi, decomposition: d, cashBuffer, onTimeCount } = a;
  const seasonal = d.seasonalMatch;
  const structural = seasonal < 45;
  const h = b.history;
  const expNow = mean(h.slice(-3).map((p) => p.expense / Math.max(1, p.income)));
  const expBefore = mean(h.slice(-12, -6).map((p) => p.expense / Math.max(1, p.income)));

  return [
    {
      borrowerId: b.id,
      cycle: rsi.cycle,
      title: structural ? "Low seasonal match" : "Seasonal pattern",
      value: `${seasonal}% match`,
      statement: structural
        ? "Current decline does not resemble the borrower's historical seasonal pattern."
        : "Current income decline is consistent with the borrower's historical seasonal pattern.",
      component: "USD",
      direction: structural ? "supports" : "counters",
      contribution: rsi.components.USD,
      source: "Decomposition · seasonal profile (18 periods)",
    },
    {
      borrowerId: b.id,
      cycle: rsi.cycle,
      title: d.trendDirection === "Declining" ? "Long-term decline" : "Trend momentum",
      value: d.trendDirection,
      statement:
        d.trendDirection === "Declining"
          ? "Income has declined across six consecutive periods with no recovery signal."
          : "Underlying six-month income trend has not materially deteriorated.",
      component: "TM",
      direction: d.trendDirection === "Declining" ? "supports" : "counters",
      contribution: rsi.components.TM,
      source: "Trend component · 6-period slope",
    },
    {
      borrowerId: b.id,
      cycle: rsi.cycle,
      title: "Repayment history",
      value: onTimeCount >= 10 ? "Strong" : onTimeCount >= 8 ? "Mixed" : "Irregular",
      statement: `${onTimeCount} of the last 12 scheduled repayments were made on time.`,
      component: "RTR",
      direction: onTimeCount >= 10 ? "counters" : "supports",
      contribution: rsi.components.RTR,
      source: "Repayment ledger · last 12 periods",
    },
    {
      borrowerId: b.id,
      cycle: rsi.cycle,
      title: cashBuffer >= 0 ? "Cash buffer" : "Cash buffer pressure",
      value: cashBuffer >= 1500 ? "Moderate" : cashBuffer >= 0 ? "Thin" : "Negative projected",
      statement:
        cashBuffer >= 0
          ? "Projected cash buffer remains positive through the next repayment period."
          : "Projected buffer becomes negative within two repayment periods.",
      component: "CBR",
      direction: cashBuffer >= 0 ? "counters" : "supports",
      contribution: rsi.components.CBR,
      source: "Forecast · inflow minus expenses and obligation",
    },
    {
      borrowerId: b.id,
      cycle: rsi.cycle,
      title: expNow - expBefore > 0.08 ? "Expense pressure" : "Expense shock",
      value: `${Math.round(expBefore * 100)}% → ${Math.round(expNow * 100)}%`,
      statement:
        expNow - expBefore > 0.08
          ? `Expense-to-income ratio increased from ${Math.round(expBefore * 100)}% to ${Math.round(expNow * 100)}%.`
          : "No abnormal increase in expenses was detected.",
      component: "ESI",
      direction: expNow - expBefore > 0.08 ? "supports" : "counters",
      contribution: rsi.components.ESI,
      source: "Expense ledger · 3-period vs 6-period baseline",
    },
  ];
}

/* --------------------------------- plans -------------------------------- */

export function generateRepaymentPlans(
  b: Borrower,
  a: Omit<Analysis, "plans" | "evidence">,
  config: ModelConfiguration = DEFAULT_CONFIG,
): RepaymentPlanOption[] {
  const loan = b.loan;
  const state = a.state;
  const types = config.rules[state] ?? config.rules["Seasonal Dip"];
  const inst = loan.installment;
  const afford = clamp((a.expectedInflow - a.expectedExpense) / Math.max(1, inst), 0, 2);

  const build = (type: string, i: number): RepaymentPlanOption => {
    const base = {
      id: `${loan.id}-P${i + 1}`,
      borrowerId: b.id,
      type: type as RepaymentPlanOption["type"],
      recommended: false,
      requiresEscalation: false,
    };
    switch (type) {
      case "Seasonal Step-Down": {
        const low = Math.round((inst * 0.69) / 100) * 100;
        const high = Math.round((inst * 1.08) / 100) * 100;
        return {
          ...base,
          summary: "Reduce instalments during the low-income window and recover during the upswing.",
          installment: low,
          lowInstallment: low,
          recoveryInstallment: high,
          revisedTenure: loan.tenure + 1,
          tenureDelta: 1,
          projectedBuffer: Math.round(a.expectedInflow - a.expectedExpense - low),
          recoveryImpact: "Strong",
          affordability: Math.round(clamp(afford * 1.3, 0, 1) * 100),
          principalRecovery: 100,
          riskSignal: "Low",
          reason: "Matches the borrower's recurring seasonal income cycle.",
          schedule: `${inr(low)} × 2, then ${inr(high)} × 4`,
        };
      }
      case "Skip & Redistribute": {
        const ni = Math.round((inst * 1.2) / 100) * 100;
        return {
          ...base,
          summary: "Skip one period and redistribute the obligation across the next five periods.",
          installment: ni,
          revisedTenure: loan.tenure + 1,
          tenureDelta: 1,
          projectedBuffer: Math.round(a.expectedInflow - a.expectedExpense),
          recoveryImpact: "Moderate",
          affordability: Math.round(clamp(afford * 0.85, 0, 1) * 100),
          principalRecovery: 100,
          riskSignal: "Moderate",
          reason: "Relieves one period of pressure without extending the book materially.",
          schedule: `Skip 1 period, then ${inr(ni)} × 5`,
        };
      }
      case "Tenure Extension": {
        const ni = Math.round((inst * 0.84) / 100) * 100;
        return {
          ...base,
          summary: "Extend tenure to lower the periodic obligation.",
          installment: ni,
          revisedTenure: loan.tenure + 3,
          tenureDelta: 3,
          projectedBuffer: Math.round(a.expectedInflow - a.expectedExpense - ni),
          recoveryImpact: "Moderate",
          affordability: Math.round(clamp(afford * 1.15, 0, 1) * 100),
          principalRecovery: 96,
          riskSignal: "Moderate",
          reason: "Lowers the obligation to a level supported by the projected inflow.",
          schedule: `${inr(ni)} × ${loan.remainingPeriods + 3}`,
        };
      }
      case "Moratorium": {
        const ni = Math.round((inst * 0.95) / 100) * 100;
        return {
          ...base,
          requiresEscalation: true,
          summary: "Pause principal for two periods while stabilising cash flow, then resume.",
          installment: ni,
          revisedTenure: loan.tenure + 4,
          tenureDelta: 4,
          projectedBuffer: Math.round(a.expectedInflow - a.expectedExpense),
          recoveryImpact: "Limited",
          affordability: Math.round(clamp(afford * 1.5, 0, 1) * 100),
          principalRecovery: 88,
          riskSignal: "Elevated",
          reason:
            "Projected buffer turns negative; a pause prevents avoidable default while income stabilises.",
          schedule: `Pause × 2, then ${inr(ni)} × ${loan.remainingPeriods + 4}`,
        };
      }
      case "Early Close":
        return {
          ...base,
          summary: "Borrower can settle the remaining balance ahead of schedule.",
          installment: inst,
          revisedTenure: Math.max(1, loan.tenure - 2),
          tenureDelta: -2,
          projectedBuffer: Math.round(a.expectedInflow - a.expectedExpense - inst),
          recoveryImpact: "Strong",
          affordability: 100,
          principalRecovery: 100,
          riskSignal: "Low",
          reason: "Strong upward cash-flow trend with a consistent repayment record.",
          schedule: `Settle ${inr(loan.balance)} across 2 periods`,
        };
      default:
        return {
          ...base,
          summary: "Borrower qualifies for an additional working-capital facility.",
          installment: Math.round((inst * 1.25) / 100) * 100,
          revisedTenure: loan.tenure + 6,
          tenureDelta: 6,
          projectedBuffer: Math.round(a.expectedInflow - a.expectedExpense - inst * 1.25),
          recoveryImpact: "Strong",
          affordability: 92,
          principalRecovery: 100,
          riskSignal: "Low",
          reason: "Sustained surplus supports a modest top-up without raising stress.",
          schedule: `Top-up ${inr(Math.round(loan.principal * 0.25))} · ${loan.tenure + 6} months`,
        };
    }
  };

  const plans = types.map(build);
  if (plans.length) {
    const preferred =
      state === "Structural Decline"
        ? a.trendDirection === "Declining"
          ? "Moratorium"
          : "Tenure Extension"
        : state === "Emerging Stress"
          ? "Tenure Extension"
          : state === "Stable"
            ? "Early Close"
            : "Seasonal Step-Down";
    const idx = Math.max(
      0,
      plans.findIndex((p) => p.type === preferred),
    );
    plans[idx].recommended = state !== "Stable";
    if (state === "Stable") plans.forEach((p) => (p.recommended = false));
  }
  return plans;
}

/* ------------------------------- analysis ------------------------------- */

export function analyzeBorrower(
  b: Borrower,
  config: ModelConfiguration = DEFAULT_CONFIG,
  cycle = 6,
): Analysis {
  const decomposition = decomposeCashFlow(b);
  const forecast = forecastCashFlow(b);
  const rsi = calculateRSI(b, config, cycle);
  const h = b.history;
  const expectedInflow = forecast[0].pointEstimate;
  const expectedExpense = Math.round(mean(h.slice(-3).map((p) => p.expense)));
  const cashBuffer =
    b.overrides?.cashBuffer ?? Math.round(expectedInflow - expectedExpense - b.loan.installment);
  const band = forecast[0].upperBound - forecast[0].lowerBound;
  const forecastConfidence =
    b.overrides?.forecastConfidence ??
    Math.round(clamp(1 - band / (expectedInflow * 1.4), 0.35, 0.95) * 100);
  const onTimeCount = h.slice(-12).filter((p) => p.paidOnTime).length;

  const partial = {
    borrower: b,
    rsi,
    rsiHistory: rsiHistory(b, rsi.value),
    decomposition,
    forecast,
    seasonalMatch: decomposition.seasonalMatch,
    state: rsi.state,
    cashBuffer,
    expectedInflow,
    expectedExpense,
    forecastConfidence,
    onTimeCount,
    trendDirection: decomposition.trendDirection,
  };

  const evidence = generateEvidence(b, partial);
  const plans = generateRepaymentPlans(b, partial, config);
  return { ...partial, evidence, plans };
}

function rsiHistory(b: Borrower, current: number) {
  const rnd = mulberry32(hash(b.id));
  const steps: number[] = [];
  let v = current;
  for (let i = 0; i < 5; i++) {
    v = Math.max(4, Math.round(v - (2 + rnd() * 4)));
    steps.unshift(v);
  }
  return [...steps, current].map((value, i) => ({ cycle: `Cycle ${i + 1}`, value }));
}

export function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/* ------------------------------ monitoring ------------------------------ */

export function simulateOutcome(a: Analysis, cycle: number, approvedPlan?: string): MonitoringOutcome {
  const rnd = mulberry32(hash(a.borrower.id) + cycle * 7919);
  const forecast = a.forecast[0].pointEstimate;
  const bias =
    a.state === "Structural Decline" ? -0.11 : a.state === "Emerging Stress" ? -0.04 : 0.02;
  const actual = Math.round(forecast * (1 + bias + (rnd() - 0.5) * 0.08));
  const errorPct = Number((((actual - forecast) / forecast) * 100).toFixed(1));
  const outcome: MonitoringOutcome["outcome"] = approvedPlan
    ? a.state === "Structural Decline"
      ? "Still stressed"
      : "Recovering"
    : a.state === "Stable"
      ? "Recovered"
      : a.state === "Structural Decline"
        ? "Default risk"
        : "Still stressed";
  return {
    borrowerId: a.borrower.id,
    borrowerName: a.borrower.name,
    cycle,
    forecast,
    actual,
    errorPct,
    state: a.state,
    outcome,
  };
}

export function recalibrateForecast(outcomes: MonitoringOutcome[]) {
  if (!outcomes.length) return { drift: 0, mae: 0, mape: 0, coverage: 0, accuracy: 0 };
  const errs = outcomes.map((o) => o.actual - o.forecast);
  const mae = Math.round(mean(errs.map(Math.abs)));
  const mape = Number(mean(outcomes.map((o) => Math.abs(o.errorPct))).toFixed(1));
  const drift = Number((mean(outcomes.map((o) => o.errorPct)) / 100).toFixed(4));
  return {
    drift,
    mae,
    mape,
    coverage: Math.round(88 + (1 - clamp(mape / 30)) * 8),
    accuracy: Number((100 - mape).toFixed(1)),
  };
}

export function stateColorKey(state: StressState) {
  switch (state) {
    case "Stable":
      return "success" as const;
    case "Seasonal Dip":
      return "info" as const;
    case "Emerging Stress":
      return "warning" as const;
    default:
      return "danger" as const;
  }
}

export function buildTransactions(b: Borrower): { rows: PeriodPoint[] } {
  return { rows: b.history };
}
