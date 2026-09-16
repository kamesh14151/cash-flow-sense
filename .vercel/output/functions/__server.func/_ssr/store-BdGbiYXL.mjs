import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-BdGbiYXL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DEFAULT_CONFIG = {
	version: "cfc-model-2026.09.1",
	weights: {
		CBR: 25,
		RV: 15,
		TM: 20,
		RTR: 15,
		USD: 15,
		ESI: 10
	},
	thresholds: {
		stable: 30,
		seasonal: 50,
		emerging: 70
	},
	rules: {
		"Stable": ["Early Close", "Top-Up Eligibility"],
		"Seasonal Dip": [
			"Seasonal Step-Down",
			"Skip & Redistribute",
			"Tenure Extension"
		],
		"Emerging Stress": [
			"Seasonal Step-Down",
			"Tenure Extension",
			"Moratorium"
		],
		"Structural Decline": [
			"Moratorium",
			"Tenure Extension",
			"Skip & Redistribute"
		]
	}
};
var clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
var inr = (v) => `${v < 0 ? "-" : ""}₹${Math.abs(Math.round(v)).toLocaleString("en-IN")}`;
function mulberry32(seed) {
	let a = seed >>> 0;
	return () => {
		a = a + 1831565813 >>> 0;
		let t = Math.imul(a ^ a >>> 15, 1 | a);
		t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
var mean = (xs) => xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0;
var std = (xs) => {
	const m = mean(xs);
	return Math.sqrt(mean(xs.map((x) => (x - m) ** 2)));
};
function decomposeCashFlow(b) {
	const h = b.history;
	const income = h.map((p) => p.income);
	const window = 5;
	const trend = income.map((_, i) => {
		const s = Math.max(0, i - Math.floor(window / 2));
		const e = Math.min(income.length, s + window);
		return mean(income.slice(s, e));
	});
	const detrended = income.map((v, i) => v - trend[i]);
	const baseline = detrended.slice(0, Math.max(12, detrended.length - 6));
	const profile = Array.from({ length: 12 }, (_, m) => {
		const vals = baseline.filter((_, i) => i % 12 === m);
		return vals.length ? mean(vals) : 0;
	});
	const seasonal = detrended.map((_, i) => profile[i % 12]);
	const residual = income.map((v, i) => v - trend[i] - seasonal[i]);
	const avg = mean(income) || 1;
	const recentDetrended = detrended.slice(-4);
	const recentSeasonal = seasonal.slice(-4);
	const explained = 1 - mean(recentDetrended.map((d, i) => Math.abs(d - recentSeasonal[i]))) / (mean(recentDetrended.map((d) => Math.abs(d))) + avg * .06);
	const seasonalMatch = Math.round(clamp(explained, .05, .96) * 100);
	const slope = (mean(income.slice(-4)) - mean(income.slice(-10, -4))) / avg;
	const trendDirection = slope > .03 ? "Improving" : slope < -.06 ? "Declining" : "Stable";
	const rv = std(residual) / avg;
	return {
		borrowerId: b.id,
		points: h.map((p, i) => ({
			label: p.label,
			observed: Math.round(p.income),
			trend: Math.round(trend[i]),
			seasonal: Math.round(seasonal[i]),
			residual: Math.round(residual[i])
		})),
		seasonalMatch: b.overrides?.seasonalMatch ?? seasonalMatch,
		trendDirection,
		residualVolatility: Number(rv.toFixed(3)),
		confidence: seasonalMatch > 70 ? "High" : seasonalMatch > 45 ? "Moderate" : "Low"
	};
}
function forecastCashFlow(b, periods = 3, drift = 0) {
	const d = decomposeCashFlow(b);
	const h = b.history;
	const income = h.map((p) => p.income);
	const avg = mean(income) || 1;
	const slope = (mean(income.slice(-3)) - mean(income.slice(-9, -3))) / 3;
	const last = h.length - 1;
	const rv = d.residualVolatility;
	return Array.from({ length: periods }, (_, k) => {
		const idx = last + k + 1;
		const seasonalTerm = d.points.length ? d.points[idx % 12 < d.points.length ? idx % 12 : 0].seasonal : 0;
		const base = mean(income.slice(-3)) + slope * (k + 1) + seasonalTerm * .6 + drift * avg * (k + 1);
		const band = avg * (.07 + rv * .8) * (1 + k * .35);
		return {
			borrowerId: b.id,
			period: nextLabel(h[last].month, k + 1),
			pointEstimate: Math.round(base),
			lowerBound: Math.round(base - band),
			upperBound: Math.round(base + band)
		};
	});
}
function nextLabel(month, offset) {
	const [y, m] = month.split("-").map(Number);
	return new Date(Date.UTC(y, m - 1 + offset, 1)).toLocaleString("en-US", {
		month: "short",
		year: "2-digit",
		timeZone: "UTC"
	});
}
function calculateRSI(b, config = DEFAULT_CONFIG, cycle = 6) {
	const d = decomposeCashFlow(b);
	const f = forecastCashFlow(b);
	const h = b.history;
	const income = h.map((p) => p.income);
	const avg = mean(income) || 1;
	const ratio = (f[0].pointEstimate - mean(h.slice(-3).map((p) => p.expense)) - b.loan.installment) / Math.max(1, b.loan.installment);
	const slope = (mean(income.slice(-4)) - mean(income.slice(-10, -4))) / avg;
	const missed = h.slice(-12).filter((p) => !p.paidOnTime).length;
	const expenseRatioNow = mean(h.slice(-3).map((p) => p.expense / Math.max(1, p.income)));
	const expenseRatioBefore = mean(h.slice(-12, -6).map((p) => p.expense / Math.max(1, p.income)));
	const raw = {
		CBR: clamp(1 - (ratio + .2) / 1.1) * config.weights.CBR,
		RV: clamp(d.residualVolatility * 3.2) * config.weights.RV,
		TM: clamp((-slope + .02) / .22) * config.weights.TM,
		RTR: clamp(missed / 4) * config.weights.RTR,
		USD: clamp(1 - d.seasonalMatch / 100) * config.weights.USD,
		ESI: clamp((expenseRatioNow - expenseRatioBefore + .02) / .2) * config.weights.ESI
	};
	const components = {
		CBR: round1(b.overrides?.CBR ?? raw.CBR),
		RV: round1(b.overrides?.RV ?? raw.RV),
		TM: round1(b.overrides?.TM ?? raw.TM),
		RTR: round1(b.overrides?.RTR ?? raw.RTR),
		USD: round1(b.overrides?.USD ?? raw.USD),
		ESI: round1(b.overrides?.ESI ?? raw.ESI)
	};
	const value = b.overrides?.rsi ?? Math.round(Object.values(components).reduce((a, c) => a + c, 0));
	return {
		borrowerId: b.id,
		cycle,
		value,
		components,
		state: b.overrides?.state ?? classifyStress(value, d.seasonalMatch, d.trendDirection, config)
	};
}
var round1 = (v) => Math.round(v * 10) / 10;
function classifyStress(rsi, seasonalMatch, trend, config = DEFAULT_CONFIG) {
	const t = config.thresholds;
	if (rsi <= t.stable) return "Stable";
	if (rsi <= t.seasonal) return seasonalMatch >= 60 ? "Seasonal Dip" : "Emerging Stress";
	if (rsi <= t.emerging) {
		if (seasonalMatch >= 75 && trend !== "Declining") return "Seasonal Dip";
		return "Emerging Stress";
	}
	return seasonalMatch >= 80 && trend !== "Declining" ? "Emerging Stress" : "Structural Decline";
}
function generateEvidence(b, a) {
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
			statement: structural ? "Current decline does not resemble the borrower's historical seasonal pattern." : "Current income decline is consistent with the borrower's historical seasonal pattern.",
			component: "USD",
			direction: structural ? "supports" : "counters",
			contribution: rsi.components.USD,
			source: "Decomposition · seasonal profile (18 periods)"
		},
		{
			borrowerId: b.id,
			cycle: rsi.cycle,
			title: d.trendDirection === "Declining" ? "Long-term decline" : "Trend momentum",
			value: d.trendDirection,
			statement: d.trendDirection === "Declining" ? "Income has declined across six consecutive periods with no recovery signal." : "Underlying six-month income trend has not materially deteriorated.",
			component: "TM",
			direction: d.trendDirection === "Declining" ? "supports" : "counters",
			contribution: rsi.components.TM,
			source: "Trend component · 6-period slope"
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
			source: "Repayment ledger · last 12 periods"
		},
		{
			borrowerId: b.id,
			cycle: rsi.cycle,
			title: cashBuffer >= 0 ? "Cash buffer" : "Cash buffer pressure",
			value: cashBuffer >= 1500 ? "Moderate" : cashBuffer >= 0 ? "Thin" : "Negative projected",
			statement: cashBuffer >= 0 ? "Projected cash buffer remains positive through the next repayment period." : "Projected buffer becomes negative within two repayment periods.",
			component: "CBR",
			direction: cashBuffer >= 0 ? "counters" : "supports",
			contribution: rsi.components.CBR,
			source: "Forecast · inflow minus expenses and obligation"
		},
		{
			borrowerId: b.id,
			cycle: rsi.cycle,
			title: expNow - expBefore > .08 ? "Expense pressure" : "Expense shock",
			value: `${Math.round(expBefore * 100)}% → ${Math.round(expNow * 100)}%`,
			statement: expNow - expBefore > .08 ? `Expense-to-income ratio increased from ${Math.round(expBefore * 100)}% to ${Math.round(expNow * 100)}%.` : "No abnormal increase in expenses was detected.",
			component: "ESI",
			direction: expNow - expBefore > .08 ? "supports" : "counters",
			contribution: rsi.components.ESI,
			source: "Expense ledger · 3-period vs 6-period baseline"
		}
	];
}
function generateRepaymentPlans(b, a, config = DEFAULT_CONFIG) {
	const loan = b.loan;
	const state = a.state;
	const types = config.rules[state] ?? config.rules["Seasonal Dip"] ?? [];
	const inst = loan.installment;
	const afford = clamp((a.expectedInflow - a.expectedExpense) / Math.max(1, inst), 0, 2);
	const build = (type, i) => {
		const base = {
			id: `${loan.id}-P${i + 1}`,
			borrowerId: b.id,
			type,
			recommended: false,
			requiresEscalation: false
		};
		switch (type) {
			case "Seasonal Step-Down": {
				const low = Math.round(inst * .69 / 100) * 100;
				const high = Math.round(inst * 1.08 / 100) * 100;
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
					schedule: `${inr(low)} × 2, then ${inr(high)} × 4`
				};
			}
			case "Skip & Redistribute": {
				const ni = Math.round(inst * 1.2 / 100) * 100;
				return {
					...base,
					summary: "Skip one period and redistribute the obligation across the next five periods.",
					installment: ni,
					revisedTenure: loan.tenure + 1,
					tenureDelta: 1,
					projectedBuffer: Math.round(a.expectedInflow - a.expectedExpense),
					recoveryImpact: "Moderate",
					affordability: Math.round(clamp(afford * .85, 0, 1) * 100),
					principalRecovery: 100,
					riskSignal: "Moderate",
					reason: "Relieves one period of pressure without extending the book materially.",
					schedule: `Skip 1 period, then ${inr(ni)} × 5`
				};
			}
			case "Tenure Extension": {
				const ni = Math.round(inst * .84 / 100) * 100;
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
					schedule: `${inr(ni)} × ${loan.remainingPeriods + 3}`
				};
			}
			case "Moratorium": {
				const ni = Math.round(inst * .95 / 100) * 100;
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
					reason: "Projected buffer turns negative; a pause prevents avoidable default while income stabilises.",
					schedule: `Pause × 2, then ${inr(ni)} × ${loan.remainingPeriods + 4}`
				};
			}
			case "Early Close": return {
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
				schedule: `Settle ${inr(loan.balance)} across 2 periods`
			};
			default: return {
				...base,
				summary: "Borrower qualifies for an additional working-capital facility.",
				installment: Math.round(inst * 1.25 / 100) * 100,
				revisedTenure: loan.tenure + 6,
				tenureDelta: 6,
				projectedBuffer: Math.round(a.expectedInflow - a.expectedExpense - inst * 1.25),
				recoveryImpact: "Strong",
				affordability: 92,
				principalRecovery: 100,
				riskSignal: "Low",
				reason: "Sustained surplus supports a modest top-up without raising stress.",
				schedule: `Top-up ${inr(Math.round(loan.principal * .25))} · ${loan.tenure + 6} months`
			};
		}
	};
	const plans = types.map(build);
	if (plans.length) {
		const preferred = state === "Structural Decline" ? a.trendDirection === "Declining" ? "Moratorium" : "Tenure Extension" : state === "Emerging Stress" ? "Tenure Extension" : state === "Stable" ? "Early Close" : "Seasonal Step-Down";
		const idx = Math.max(0, plans.findIndex((p) => p.type === preferred));
		if (plans[idx]) plans[idx].recommended = state !== "Stable";
		if (state === "Stable") plans.forEach((p) => p.recommended = false);
	}
	return plans;
}
function analyzeBorrower(b, config = DEFAULT_CONFIG, cycle = 6) {
	const decomposition = decomposeCashFlow(b);
	const forecast = forecastCashFlow(b);
	const rsi = calculateRSI(b, config, cycle);
	const h = b.history;
	const expectedInflow = b.overrides?.expectedInflow ?? forecast[0].pointEstimate;
	const expectedExpense = b.overrides?.expectedExpense ?? Math.round(mean(h.slice(-3).map((p) => p.expense)));
	const cashBuffer = b.overrides?.cashBuffer ?? Math.round(expectedInflow - expectedExpense - b.loan.installment);
	const band = forecast[0].upperBound - forecast[0].lowerBound;
	const forecastConfidence = b.overrides?.forecastConfidence ?? Math.round(clamp(1 - band / (expectedInflow * 1.4), .35, .95) * 100);
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
		trendDirection: decomposition.trendDirection
	};
	const evidence = generateEvidence(b, partial);
	const plans = generateRepaymentPlans(b, partial, config);
	return {
		...partial,
		evidence,
		plans
	};
}
function rsiHistory(b, current) {
	const rnd = mulberry32(hash(b.id));
	const steps = [];
	let v = current;
	for (let i = 0; i < 5; i++) {
		v = Math.max(4, Math.round(v - (2 + rnd() * 4)));
		steps.unshift(v);
	}
	return [...steps, current].map((value, i) => ({
		cycle: `Cycle ${i + 1}`,
		value
	}));
}
function hash(s) {
	let h = 2166136261;
	for (let i = 0; i < s.length; i++) {
		h ^= s.charCodeAt(i);
		h = Math.imul(h, 16777619);
	}
	return h >>> 0;
}
function simulateOutcome(a, cycle, approvedPlan) {
	const rnd = mulberry32(hash(a.borrower.id) + cycle * 7919);
	const forecast = a.forecast[0].pointEstimate;
	const bias = a.state === "Structural Decline" ? -.11 : a.state === "Emerging Stress" ? -.04 : .02;
	const actual = Math.round(forecast * (1 + bias + (rnd() - .5) * .08));
	const errorPct = Number(((actual - forecast) / forecast * 100).toFixed(1));
	const outcome = approvedPlan ? a.state === "Structural Decline" ? "Still stressed" : "Recovering" : a.state === "Stable" ? "Recovered" : a.state === "Structural Decline" ? "Default risk" : "Still stressed";
	return {
		borrowerId: a.borrower.id,
		borrowerName: a.borrower.name,
		cycle,
		forecast,
		actual,
		errorPct,
		state: a.state,
		outcome
	};
}
function recalibrateForecast(outcomes) {
	if (!outcomes.length) return {
		drift: 0,
		mae: 0,
		mape: 0,
		coverage: 0,
		accuracy: 0
	};
	const errs = outcomes.map((o) => o.actual - o.forecast);
	const mae = Math.round(mean(errs.map(Math.abs)));
	const mape = Number(mean(outcomes.map((o) => Math.abs(o.errorPct))).toFixed(1));
	return {
		drift: Number((mean(outcomes.map((o) => o.errorPct)) / 100).toFixed(4)),
		mae,
		mape,
		coverage: Math.round(88 + (1 - clamp(mape / 30)) * 8),
		accuracy: Number((100 - mape).toFixed(1))
	};
}
var BRANCH = "Salem Central Branch";
var MONTHS = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec"
];
/** 18 periods ending 2026-09 */
function periodKeys() {
	const keys = [];
	for (let i = 17; i >= 0; i--) {
		const d = new Date(Date.UTC(2026, 8 - i, 1));
		keys.push({
			month: `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`,
			label: `${MONTHS[d.getUTCMonth()]} ${String(d.getUTCFullYear()).slice(2)}`,
			m: d.getUTCMonth()
		});
	}
	return keys;
}
var FIRST = [
	"Meena",
	"Suresh",
	"Anitha",
	"Ravi",
	"Lakshmi",
	"Karthik",
	"Devi",
	"Murugan",
	"Kavitha",
	"Selvam",
	"Priya",
	"Ganesan",
	"Vijaya",
	"Arun",
	"Sumathi",
	"Bala",
	"Revathi",
	"Manikandan",
	"Saroja",
	"Dinesh",
	"Pushpa",
	"Vignesh",
	"Latha",
	"Senthil",
	"Malar",
	"Rajesh",
	"Indira",
	"Prakash",
	"Shanthi",
	"Muthu",
	"Geetha",
	"Kumaran",
	"Nithya",
	"Sekar",
	"Vasanthi",
	"Ramesh"
];
var LAST = [
	"Krishnan",
	"Kumar",
	"Devi",
	"Raman",
	"Natarajan",
	"Subramani",
	"Pillai",
	"Velu",
	"Iyer",
	"Rajan",
	"Sundaram",
	"Moorthy",
	"Chandran",
	"Arumugam",
	"Balan",
	"Perumal"
];
var OCCUPATIONS = [
	{
		name: "Farmer",
		archetype: "Seasonal"
	},
	{
		name: "Vendor",
		archetype: "Regular / Stable"
	},
	{
		name: "Gig Worker",
		archetype: "Structurally Declining"
	},
	{
		name: "Tailor",
		archetype: "Regular / Stable"
	},
	{
		name: "Dairy Farmer",
		archetype: "Regular / Stable"
	},
	{
		name: "Shopkeeper",
		archetype: "Regular / Stable"
	},
	{
		name: "Weaver",
		archetype: "Seasonal"
	},
	{
		name: "Auto Driver",
		archetype: "Structurally Declining"
	},
	{
		name: "Fisherman",
		archetype: "Seasonal"
	},
	{
		name: "Beautician",
		archetype: "Regular / Stable"
	},
	{
		name: "Carpenter",
		archetype: "Seasonal"
	},
	{
		name: "Food Vendor",
		archetype: "Regular / Stable"
	}
];
function buildHistory(seed, archetype, base, installment) {
	const rnd = mulberry32(seed);
	return periodKeys().map((k, i) => {
		const noise = 1 + (rnd() - .5) * .09;
		const seasonalFactor = [
			1.08,
			1.1,
			1.05,
			1,
			.98,
			.86,
			.78,
			.74,
			.82,
			1,
			1.12,
			1.15
		][k.m];
		let income;
		if (archetype === "Seasonal") income = base * seasonalFactor * noise * (1 + i * .004);
		else if (archetype === "Structurally Declining") {
			const decline = i < 12 ? 1 - i * .008 : .904 - (i - 11) * .055;
			income = base * (1 + (seasonalFactor - 1) * .15) * decline * noise;
		} else income = base * (1 + (seasonalFactor - 1) * .2) * (1 + i * .006) * noise;
		const expenseRatio = archetype === "Structurally Declining" ? .6 + Math.max(0, i - 10) * .028 : .6 + (rnd() - .5) * .05;
		const paidOnTime = archetype === "Structurally Declining" ? i < 11 ? rnd() > .1 : rnd() > .55 : rnd() > .06;
		return {
			month: k.month,
			label: k.label,
			income: Math.round(income / 100) * 100,
			expense: Math.round(income * expenseRatio / 100) * 100,
			repayment: paidOnTime ? installment : 0,
			paidOnTime
		};
	});
}
function makeBorrower(i, seed) {
	const rnd = mulberry32(seed + i * 977);
	const occ = OCCUPATIONS[Math.floor(rnd() * OCCUPATIONS.length)];
	const first = FIRST[Math.floor(rnd() * FIRST.length)];
	const last = LAST[Math.floor(rnd() * LAST.length)];
	const roll = rnd();
	const archetype = roll < .68 ? "Regular / Stable" : roll < .9 ? "Seasonal" : "Structurally Declining";
	const base = 16e3 + Math.round(rnd() * 22e3);
	const principal = Math.round((5e4 + rnd() * 11e4) / 1e3) * 1e3;
	const balance = Math.round(principal * (.35 + rnd() * .5) / 100) * 100;
	const tenure = [
		12,
		15,
		18,
		24
	][Math.floor(rnd() * 4)];
	const installment = Math.round(principal / tenure * 1.06 / 100) * 100;
	const id = `BR-${11e3 + i * 7}`;
	return {
		id,
		name: `${first} ${last}`,
		occupation: occ.name,
		branch: BRANCH,
		phone: `+91 9${Math.floor(rnd() * 9e8 + 1e8)}`,
		since: `${2022 + Math.floor(rnd() * 3)}`,
		archetype,
		loan: {
			id: `LN-${29e3 + i * 11}`,
			borrowerId: id,
			principal,
			balance,
			installment,
			tenure,
			remainingPeriods: Math.max(3, Math.round(balance / installment)),
			nextDue: "September 24, 2026",
			lastPayment: "September 10, 2026"
		},
		history: buildHistory(hash(id), archetype, base, installment)
	};
}
function meena() {
	const keys = periodKeys();
	const incomes = [
		31200,
		32400,
		30800,
		29600,
		28800,
		25400,
		22800,
		21600,
		24200,
		29800,
		33100,
		34200,
		32600,
		31800,
		29400,
		25100,
		22600,
		21400
	];
	return {
		id: "BR-10482",
		name: "Meena Krishnan",
		occupation: "Farmer",
		branch: BRANCH,
		phone: "+91 98432 11907",
		since: "2023",
		archetype: "Seasonal",
		loan: {
			id: "LN-28491",
			borrowerId: "BR-10482",
			principal: 12e4,
			balance: 82e3,
			installment: 7500,
			tenure: 18,
			remainingPeriods: 11,
			nextDue: "September 24, 2026",
			lastPayment: "September 10, 2026"
		},
		history: keys.map((k, i) => ({
			month: k.month,
			label: k.label,
			income: incomes[i],
			expense: Math.round(incomes[i] * (.6 + i % 3 * .012) / 100) * 100,
			repayment: i === 13 ? 0 : 7500,
			paidOnTime: i !== 13
		})),
		overrides: {
			rsi: 34,
			seasonalMatch: 87,
			state: "Seasonal Dip",
			cashBuffer: 2100,
			forecastConfidence: 82,
			expectedInflow: 27800,
			expectedExpense: 18200,
			CBR: 18,
			RV: 5,
			TM: 4,
			RTR: 2,
			USD: 2,
			ESI: 3
		}
	};
}
function suresh() {
	const keys = periodKeys();
	const incomes = [
		29800,
		30100,
		29400,
		29900,
		28700,
		28900,
		28200,
		27600,
		27900,
		27100,
		26400,
		25200,
		24100,
		22600,
		21300,
		20100,
		19200,
		18400
	];
	return {
		id: "BR-10921",
		name: "Suresh Kumar",
		occupation: "Gig Worker",
		branch: BRANCH,
		phone: "+91 98765 40221",
		since: "2024",
		archetype: "Structurally Declining",
		loan: {
			id: "LN-28744",
			borrowerId: "BR-10921",
			principal: 95e3,
			balance: 61200,
			installment: 6800,
			tenure: 18,
			remainingPeriods: 9,
			nextDue: "September 22, 2026",
			lastPayment: "September 4, 2026"
		},
		history: keys.map((k, i) => ({
			month: k.month,
			label: k.label,
			income: incomes[i],
			expense: Math.round(incomes[i] * (i < 12 ? .61 : .61 + (i - 11) * .029) / 100) * 100,
			repayment: i >= 13 && i % 2 === 1 ? 0 : 6800,
			paidOnTime: !(i >= 12 && i % 2 === 1) && i !== 17
		})),
		overrides: {
			rsi: 76,
			seasonalMatch: 18,
			state: "Structural Decline",
			cashBuffer: -1500,
			forecastConfidence: 74,
			expectedInflow: 18900,
			expectedExpense: 13600,
			CBR: 23,
			RV: 11,
			TM: 17,
			RTR: 9,
			USD: 12,
			ESI: 4
		}
	};
}
function anitha() {
	return {
		id: "BR-10233",
		name: "Anitha Devi",
		occupation: "Vendor",
		branch: BRANCH,
		phone: "+91 90031 77420",
		since: "2022",
		archetype: "Regular / Stable",
		loan: {
			id: "LN-28110",
			borrowerId: "BR-10233",
			principal: 9e4,
			balance: 42e3,
			installment: 4800,
			tenure: 18,
			remainingPeriods: 9,
			nextDue: "September 26, 2026",
			lastPayment: "September 15, 2026"
		},
		history: periodKeys().map((k, i) => {
			const income = 24e3 + i * 320 + i % 4 * 450;
			return {
				month: k.month,
				label: k.label,
				income,
				expense: Math.round(income * .56 / 100) * 100,
				repayment: 4800,
				paidOnTime: true
			};
		}),
		overrides: {
			rsi: 18,
			seasonalMatch: 92,
			state: "Stable",
			forecastConfidence: 89
		}
	};
}
var DEMO_BORROWERS = [
	meena(),
	suresh(),
	anitha()
];
function generateBorrowers(count = 200, seed = 20260916) {
	const rest = Array.from({ length: Math.max(0, count - DEMO_BORROWERS.length) }, (_, i) => makeBorrower(i, seed));
	return [...DEMO_BORROWERS, ...rest];
}
function slugFor(b) {
	const first = b.name.split(" ")[0].toLowerCase();
	return [
		"BR-10482",
		"BR-10921",
		"BR-10233"
	].includes(b.id) ? first : b.id.toLowerCase();
}
function uid() {
	return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}
function now() {
	return (/* @__PURE__ */ new Date()).toISOString();
}
var INITIAL_BORROWERS = generateBorrowers(200);
/** Pre-compute analyses for the three hero demo borrowers so the app is
*  immediately interactive on load. All other borrowers are analyzed lazily. */
function buildInitialAnalyses(config) {
	const map = {};
	for (const b of DEMO_BORROWERS) map[b.id] = analyzeBorrower(b, config);
	return map;
}
var INITIAL_CONFIG = DEFAULT_CONFIG;
var INITIAL_STATE = {
	borrowers: INITIAL_BORROWERS,
	analyses: buildInitialAnalyses(INITIAL_CONFIG),
	selectedBorrowerId: null,
	decisions: [],
	auditLog: [],
	outcomes: [],
	activityFeed: [
		{
			id: uid(),
			time: (/* @__PURE__ */ new Date(Date.now() - 18e4)).toISOString(),
			title: "Forecast recalibrated",
			detail: "STL + Prophet cycle complete — 200 borrowers updated.",
			kind: "forecast"
		},
		{
			id: uid(),
			time: (/* @__PURE__ */ new Date(Date.now() - 108e4)).toISOString(),
			title: "Structural decline detected",
			detail: "Suresh Kumar — RSI elevated to 76, Structural Decline.",
			kind: "detection",
			borrowerId: "BR-10921"
		},
		{
			id: uid(),
			time: (/* @__PURE__ */ new Date(Date.now() - 27e5)).toISOString(),
			title: "Seasonal dip detected",
			detail: "Meena Krishnan — RSI 34, pattern consistent with seasonal profile.",
			kind: "detection",
			borrowerId: "BR-10482"
		},
		{
			id: uid(),
			time: (/* @__PURE__ */ new Date(Date.now() - 72e5)).toISOString(),
			title: "Data ingestion complete",
			detail: "Sep 2026 transaction batch — 200 borrowers, 1,847 records.",
			kind: "ingest"
		}
	],
	modelConfig: INITIAL_CONFIG,
	monitoringCycle: 6,
	isLoggedIn: false,
	currentUser: {
		name: "Priya Sharma",
		role: "Loan Officer",
		branch: "Salem Central Branch"
	},
	reviewingPlanId: null,
	pendingDecisionBorrowerId: null
};
function reducer(state, action) {
	switch (action.type) {
		case "LOGIN": return {
			...state,
			isLoggedIn: true
		};
		case "LOGOUT": return {
			...state,
			isLoggedIn: false
		};
		case "SELECT_BORROWER": {
			const { borrowerId } = action;
			if (!state.analyses[borrowerId]) {
				const b = state.borrowers.find((x) => x.id === borrowerId);
				if (b) return {
					...state,
					selectedBorrowerId: borrowerId,
					analyses: {
						...state.analyses,
						[borrowerId]: analyzeBorrower(b, state.modelConfig)
					}
				};
			}
			return {
				...state,
				selectedBorrowerId: borrowerId
			};
		}
		case "DESELECT_BORROWER": return {
			...state,
			selectedBorrowerId: null
		};
		case "REVIEW_PLAN": return {
			...state,
			reviewingPlanId: action.planId,
			pendingDecisionBorrowerId: action.borrowerId
		};
		case "CLOSE_REVIEW": return {
			...state,
			reviewingPlanId: null,
			pendingDecisionBorrowerId: null
		};
		case "APPROVE_PLAN": {
			const decision = action.decision;
			const auditEvent = {
				...decision,
				modelVersion: state.modelConfig.version
			};
			const activity = {
				id: uid(),
				time: now(),
				title: "Plan approved",
				detail: `${decision.borrowerName} — ${decision.planType} approved by ${decision.officerName}.`,
				kind: "decision",
				borrowerId: decision.borrowerId
			};
			return {
				...state,
				decisions: [...state.decisions, decision],
				auditLog: [...state.auditLog, auditEvent],
				activityFeed: [activity, ...state.activityFeed],
				reviewingPlanId: null,
				pendingDecisionBorrowerId: null
			};
		}
		case "REJECT_PLAN": {
			const decision = action.decision;
			const auditEvent = {
				...decision,
				modelVersion: state.modelConfig.version
			};
			const activity = {
				id: uid(),
				time: now(),
				title: "Recommendation rejected",
				detail: `${decision.borrowerName} — recommendation rejected. Reason: ${decision.reason}.`,
				kind: "decision",
				borrowerId: decision.borrowerId
			};
			return {
				...state,
				decisions: [...state.decisions, decision],
				auditLog: [...state.auditLog, auditEvent],
				activityFeed: [activity, ...state.activityFeed],
				reviewingPlanId: null,
				pendingDecisionBorrowerId: null
			};
		}
		case "MODIFY_PLAN": {
			const { decision, modifiedPlan } = action;
			const existingAnalysis = state.analyses[decision.borrowerId];
			const updatedAnalyses = existingAnalysis ? {
				...state.analyses,
				[decision.borrowerId]: {
					...existingAnalysis,
					plans: existingAnalysis.plans.map((p) => p.id === modifiedPlan.id ? modifiedPlan : p)
				}
			} : state.analyses;
			const auditEvent = {
				...decision,
				modelVersion: state.modelConfig.version
			};
			const activity = {
				id: uid(),
				time: now(),
				title: "Plan modified and saved",
				detail: `${decision.borrowerName} — plan modified by ${decision.officerName}.`,
				kind: "decision",
				borrowerId: decision.borrowerId
			};
			return {
				...state,
				decisions: [...state.decisions, decision],
				auditLog: [...state.auditLog, auditEvent],
				activityFeed: [activity, ...state.activityFeed],
				analyses: updatedAnalyses,
				reviewingPlanId: null,
				pendingDecisionBorrowerId: null
			};
		}
		case "RUN_NEXT_CYCLE": {
			const nextCycle = state.monitoringCycle + 1;
			const newOutcomes = Object.values(state.analyses).map((a) => {
				const prevDecision = state.decisions.find((d) => d.borrowerId === a.borrower.id);
				return simulateOutcome(a, nextCycle, prevDecision?.planId);
			});
			const calib = recalibrateForecast(newOutcomes);
			const activity = {
				id: uid(),
				time: now(),
				title: "Monitoring cycle complete",
				detail: `Cycle ${nextCycle} — MAE ₹${calib.mae.toLocaleString("en-IN")}, MAPE ${calib.mape}%, forecast drift ${(calib.drift * 100).toFixed(1)}%.`,
				kind: "monitor"
			};
			return {
				...state,
				monitoringCycle: nextCycle,
				outcomes: [...state.outcomes, ...newOutcomes],
				activityFeed: [activity, ...state.activityFeed]
			};
		}
		case "RESET_DEMO": {
			const freshConfig = DEFAULT_CONFIG;
			return {
				...INITIAL_STATE,
				analyses: buildInitialAnalyses(freshConfig),
				isLoggedIn: state.isLoggedIn,
				activityFeed: [{
					id: uid(),
					time: now(),
					title: "Demo reset",
					detail: "Application state restored to initial baseline.",
					kind: "ingest"
				}, ...INITIAL_STATE.activityFeed]
			};
		}
		case "UPDATE_CONFIG": {
			const newAnalyses = {};
			for (const [id, _] of Object.entries(state.analyses)) {
				const b = state.borrowers.find((x) => x.id === id);
				if (b) newAnalyses[id] = analyzeBorrower(b, action.config);
			}
			return {
				...state,
				modelConfig: action.config,
				analyses: newAnalyses
			};
		}
		case "GENERATE_BORROWERS": {
			const newBorrowers = generateBorrowers(action.count);
			const newAnalyses = {};
			for (const b of DEMO_BORROWERS) newAnalyses[b.id] = analyzeBorrower(b, state.modelConfig);
			const activity = {
				id: uid(),
				time: now(),
				title: "Synthetic data generated",
				detail: `${action.count} borrowers generated across all archetypes.`,
				kind: "ingest"
			};
			return {
				...state,
				borrowers: newBorrowers,
				analyses: newAnalyses,
				activityFeed: [activity, ...state.activityFeed]
			};
		}
		case "ADD_ACTIVITY": return {
			...state,
			activityFeed: [action.event, ...state.activityFeed]
		};
		default: return state;
	}
}
var AppContext = (0, import_react.createContext)(null);
function AppProvider({ children }) {
	const [state, dispatch] = (0, import_react.useReducer)(reducer, INITIAL_STATE);
	const getAnalysis = (0, import_react.useCallback)((borrowerId) => {
		if (state.analyses[borrowerId]) return state.analyses[borrowerId];
		if (!state.borrowers.find((x) => x.id === borrowerId)) return null;
		dispatch({
			type: "SELECT_BORROWER",
			borrowerId
		});
		return null;
	}, [state.analyses, state.borrowers]);
	const selectedAnalysis = (0, import_react.useMemo)(() => state.selectedBorrowerId ? state.analyses[state.selectedBorrowerId] ?? null : null, [state.selectedBorrowerId, state.analyses]);
	const value = (0, import_react.useMemo)(() => ({
		state,
		dispatch,
		getAnalysis,
		selectedAnalysis
	}), [
		state,
		dispatch,
		getAnalysis,
		selectedAnalysis
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppContext.Provider, {
		value,
		children
	});
}
function useApp() {
	const ctx = (0, import_react.useContext)(AppContext);
	if (!ctx) throw new Error("useApp must be used within AppProvider");
	return ctx;
}
//#endregion
export { forecastCashFlow as a, slugFor as c, decomposeCashFlow as i, useApp as l, DEMO_BORROWERS as n, inr as o, analyzeBorrower as r, recalibrateForecast as s, AppProvider as t };
