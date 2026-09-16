import { mulberry32, hash } from "./engine";
import type { Archetype, Borrower, PeriodPoint, Transaction } from "./types";

export const TODAY = "September 16, 2026";
export const BRANCH = "Salem Central Branch";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const CACHED_PERIOD_KEYS: { month: string; label: string; m: number }[] = (function () {
  const keys: { month: string; label: string; m: number }[] = [];
  for (let i = 17; i >= 0; i--) {
    const d = new Date(Date.UTC(2026, 8 - i, 1));
    keys.push({
      month: `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`,
      label: `${MONTHS[d.getUTCMonth()]} ${String(d.getUTCFullYear()).slice(2)}`,
      m: d.getUTCMonth(),
    });
  }
  return keys;
})();

/** 18 periods ending 2026-09 */
export function periodKeys() {
  return CACHED_PERIOD_KEYS;
}

const FIRST = [
  "Meena", "Suresh", "Anitha", "Ravi", "Lakshmi", "Karthik", "Devi", "Murugan", "Kavitha",
  "Selvam", "Priya", "Ganesan", "Vijaya", "Arun", "Sumathi", "Bala", "Revathi", "Manikandan",
  "Saroja", "Dinesh", "Pushpa", "Vignesh", "Latha", "Senthil", "Malar", "Rajesh", "Indira",
  "Prakash", "Shanthi", "Muthu", "Geetha", "Kumaran", "Nithya", "Sekar", "Vasanthi", "Ramesh",
];
const LAST = [
  "Krishnan", "Kumar", "Devi", "Raman", "Natarajan", "Subramani", "Pillai", "Velu", "Iyer",
  "Rajan", "Sundaram", "Moorthy", "Chandran", "Arumugam", "Balan", "Perumal",
];
const OCCUPATIONS: { name: string; archetype: Archetype }[] = [
  { name: "Farmer", archetype: "Seasonal" },
  { name: "Vendor", archetype: "Regular / Stable" },
  { name: "Gig Worker", archetype: "Structurally Declining" },
  { name: "Tailor", archetype: "Regular / Stable" },
  { name: "Dairy Farmer", archetype: "Regular / Stable" },
  { name: "Shopkeeper", archetype: "Regular / Stable" },
  { name: "Weaver", archetype: "Seasonal" },
  { name: "Auto Driver", archetype: "Structurally Declining" },
  { name: "Fisherman", archetype: "Seasonal" },
  { name: "Beautician", archetype: "Regular / Stable" },
  { name: "Carpenter", archetype: "Seasonal" },
  { name: "Food Vendor", archetype: "Regular / Stable" },
];

function buildHistory(
  seed: number,
  archetype: Archetype,
  base: number,
  installment: number,
): PeriodPoint[] {
  const rnd = mulberry32(seed);
  const keys = periodKeys();
  return keys.map((k, i) => {
    const noise = 1 + (rnd() - 0.5) * 0.09;
    // monsoon/lean-season shape (Jun–Sep dip) repeated every year
    const seasonalFactor = [1.08, 1.1, 1.05, 1.0, 0.98, 0.86, 0.78, 0.74, 0.82, 1.0, 1.12, 1.15][k.m]!;
    let income: number;
    if (archetype === "Seasonal") {
      income = base * seasonalFactor * noise * (1 + i * 0.004);
    } else if (archetype === "Structurally Declining") {
      const decline = i < 12 ? 1 - i * 0.008 : 1 - 0.096 - (i - 11) * 0.055;
      income = base * (1 + (seasonalFactor - 1) * 0.15) * decline * noise;
    } else {
      income = base * (1 + (seasonalFactor - 1) * 0.2) * (1 + i * 0.006) * noise;
    }
    const expenseRatio =
      archetype === "Structurally Declining"
        ? 0.6 + Math.max(0, i - 10) * 0.028
        : 0.6 + (rnd() - 0.5) * 0.05;
    const paidOnTime =
      archetype === "Structurally Declining" ? (i < 11 ? rnd() > 0.1 : rnd() > 0.55) : rnd() > 0.06;
    return {
      month: k.month,
      label: k.label,
      income: Math.round(income / 100) * 100,
      expense: Math.round((income * expenseRatio) / 100) * 100,
      repayment: paidOnTime ? installment : 0,
      paidOnTime,
    };
  });
}

function makeBorrower(i: number, seed: number): Borrower {
  const rnd = mulberry32(seed + i * 977);
  const occ = OCCUPATIONS[Math.floor(rnd() * OCCUPATIONS.length)]!;
  const first = FIRST[Math.floor(rnd() * FIRST.length)]!;
  const last = LAST[Math.floor(rnd() * LAST.length)]!;
  const roll = rnd();
  const archetype: Archetype =
    roll < 0.68 ? "Regular / Stable" : roll < 0.9 ? "Seasonal" : "Structurally Declining";
  const base = 16000 + Math.round(rnd() * 22000);
  const principal = Math.round((50000 + rnd() * 110000) / 1000) * 1000;
  const balance = Math.round((principal * (0.35 + rnd() * 0.5)) / 100) * 100;
  const tenure = [12, 15, 18, 24][Math.floor(rnd() * 4)]!;
  const installment = Math.round((principal / tenure) * 1.06 / 100) * 100;
  const id = `BR-${11000 + i * 7}`;
  return {
    id,
    name: `${first} ${last}`,
    occupation: occ.name,
    branch: BRANCH,
    phone: `+91 9${Math.floor(rnd() * 900000000 + 100000000)}`,
    since: `${2022 + Math.floor(rnd() * 3)}`,
    archetype,
    loan: {
      id: `LN-${29000 + i * 11}`,
      borrowerId: id,
      principal,
      balance,
      installment,
      tenure,
      remainingPeriods: Math.max(3, Math.round(balance / installment)),
      nextDue: "September 24, 2026",
      lastPayment: "September 10, 2026",
    },
    history: buildHistory(hash(id), archetype, base, installment),
  };
}

/* ------------------------ hand-crafted demo borrowers ------------------------ */

function meena(): Borrower {
  const keys = periodKeys();
  const incomes = [
    31200, 32400, 30800, 29600, 28800, 25400, 22800, 21600, 24200, 29800, 33100, 34200, 32600,
    31800, 29400, 25100, 22600, 21400,
  ];
  const history: PeriodPoint[] = keys.map((k, i) => ({
    month: k.month,
    label: k.label,
    income: incomes[i]!,
    expense: Math.round((incomes[i]! * (0.6 + (i % 3) * 0.012)) / 100) * 100,
    repayment: i === 13 ? 0 : 7500,
    paidOnTime: i !== 13,
  }));
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
      principal: 120000,
      balance: 82000,
      installment: 7500,
      tenure: 18,
      remainingPeriods: 11,
      nextDue: "September 24, 2026",
      lastPayment: "September 10, 2026",
    },
    history,
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
      ESI: 3,
    },
  };
}

function suresh(): Borrower {
  const keys = periodKeys();
  const incomes = [
    29800, 30100, 29400, 29900, 28700, 28900, 28200, 27600, 27900, 27100, 26400, 25200, 24100,
    22600, 21300, 20100, 19200, 18400,
  ];
  const history: PeriodPoint[] = keys.map((k, i) => ({
    month: k.month,
    label: k.label,
    income: incomes[i]!,
    expense: Math.round((incomes[i]! * (i < 12 ? 0.61 : 0.61 + (i - 11) * 0.029)) / 100) * 100,
    repayment: i >= 13 && i % 2 === 1 ? 0 : 6800,
    paidOnTime: !(i >= 12 && i % 2 === 1) && i !== 17,
  }));
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
      principal: 95000,
      balance: 61200,
      installment: 6800,
      tenure: 18,
      remainingPeriods: 9,
      nextDue: "September 22, 2026",
      lastPayment: "September 4, 2026",
    },
    history,
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
      ESI: 4,
    },
  };
}

function anitha(): Borrower {
  const keys = periodKeys();
  const history: PeriodPoint[] = keys.map((k, i) => {
    const income = 24000 + i * 320 + (i % 4) * 450;
    return {
      month: k.month,
      label: k.label,
      income,
      expense: Math.round((income * 0.56) / 100) * 100,
      repayment: 4800,
      paidOnTime: true,
    };
  });
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
      principal: 90000,
      balance: 42000,
      installment: 4800,
      tenure: 18,
      remainingPeriods: 9,
      nextDue: "September 26, 2026",
      lastPayment: "September 15, 2026",
    },
    history,
    overrides: {
      rsi: 18,
      seasonalMatch: 92,
      state: "Stable",
      forecastConfidence: 89,
    },
  };
}

export const DEMO_BORROWERS = [meena(), suresh(), anitha()];

export function generateBorrowers(count = 200, seed = 20260916): Borrower[] {
  const rest = Array.from({ length: Math.max(0, count - DEMO_BORROWERS.length) }, (_, i) =>
    makeBorrower(i, seed),
  );
  return [...DEMO_BORROWERS, ...rest];
}

export function slugFor(b: { id: string; name: string }) {
  const first = b.name.split(" ")[0]!.toLowerCase();
  return ["BR-10482", "BR-10921", "BR-10233"].includes(b.id) ? first : b.id.toLowerCase();
}

export function transactionsFor(b: Borrower): Transaction[] {
  const rows: Transaction[] = [];
  b.history.slice(-6).forEach((p, i) => {
    rows.push({
      id: `TX-${b.id}-${i}I`,
      borrowerId: b.id,
      date: `${p.month}-15`,
      amount: p.income,
      type: "income",
      source: b.occupation === "Farmer" ? "market_sales" : "daily_earnings",
    });
    rows.push({
      id: `TX-${b.id}-${i}E`,
      borrowerId: b.id,
      date: `${p.month}-20`,
      amount: p.expense,
      type: "expense",
      source: "household_and_inputs",
    });
    if (p.repayment)
      rows.push({
        id: `TX-${b.id}-${i}R`,
        borrowerId: b.id,
        date: `${p.month}-24`,
        amount: p.repayment,
        type: "repayment",
        source: "branch_collection",
      });
  });
  return rows.reverse();
}
