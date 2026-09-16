export type StressState =
  | "Stable"
  | "Seasonal Dip"
  | "Emerging Stress"
  | "Structural Decline";

export type Role = "Loan Officer" | "Risk Manager" | "Auditor";

export type Archetype = "Regular / Stable" | "Seasonal" | "Structurally Declining";

export interface Loan {
  id: string;
  borrowerId: string;
  principal: number;
  balance: number;
  installment: number;
  tenure: number;
  remainingPeriods: number;
  nextDue: string;
  lastPayment: string;
}

export interface Transaction {
  id: string;
  borrowerId: string;
  date: string;
  amount: number;
  type: "income" | "expense" | "repayment";
  source: string;
}

export interface PeriodPoint {
  /** YYYY-MM */
  month: string;
  label: string;
  income: number;
  expense: number;
  repayment: number;
  paidOnTime: boolean;
}

export interface Borrower {
  id: string;
  name: string;
  occupation: string;
  branch: string;
  phone: string;
  since: string;
  archetype: Archetype;
  loan: Loan;
  history: PeriodPoint[];
  overrides?: Partial<RSIComponents> & {
    rsi?: number;
    seasonalMatch?: number;
    state?: StressState;
    cashBuffer?: number;
    forecastConfidence?: number;
    expectedInflow?: number;
    expectedExpense?: number;
  };
}

export interface RSIComponents {
  CBR: number;
  RV: number;
  TM: number;
  RTR: number;
  USD: number;
  ESI: number;
}

export interface RSIScore {
  borrowerId: string;
  cycle: number;
  value: number;
  components: RSIComponents;
  state: StressState;
}

export interface ForecastPoint {
  borrowerId: string;
  period: string;
  pointEstimate: number;
  lowerBound: number;
  upperBound: number;
}

export interface DecompositionPoint {
  label: string;
  observed: number;
  trend: number;
  seasonal: number;
  residual: number;
}

export interface DecompositionResult {
  borrowerId: string;
  points: DecompositionPoint[];
  seasonalMatch: number;
  trendDirection: "Improving" | "Stable" | "Declining";
  residualVolatility: number;
  confidence: "High" | "Moderate" | "Low";
}

export interface Evidence {
  borrowerId: string;
  cycle: number;
  title: string;
  value: string;
  statement: string;
  component: keyof RSIComponents;
  direction: "supports" | "counters";
  contribution: number;
  source: string;
}

export type PlanType =
  | "Seasonal Step-Down"
  | "Skip & Redistribute"
  | "Tenure Extension"
  | "Moratorium"
  | "Early Close"
  | "Top-Up Eligibility";

export interface RepaymentPlanOption {
  id: string;
  borrowerId: string;
  type: PlanType;
  summary: string;
  installment: number;
  lowInstallment?: number;
  recoveryInstallment?: number;
  revisedTenure: number;
  tenureDelta: number;
  projectedBuffer: number;
  recoveryImpact: "Strong" | "Moderate" | "Limited";
  affordability: number;
  principalRecovery: number;
  riskSignal: "Low" | "Moderate" | "Elevated";
  reason: string;
  recommended: boolean;
  requiresEscalation: boolean;
  schedule: string;
}

export type DecisionAction = "Approved" | "Modified" | "Rejected";

export interface OfficerDecision {
  id: string;
  borrowerId: string;
  borrowerName: string;
  officerId: string;
  officerName: string;
  role: Role;
  action: DecisionAction;
  planId: string;
  planType: PlanType;
  previousSchedule: string;
  newSchedule: string;
  timestamp: string;
  reason: string;
  notes?: string;
  rsiAtDecision: number;
  stateAtDecision: StressState;
  evidenceSnapshot: Evidence[];
  configurationSnapshot: ModelConfiguration;
  auditId: string;
  escalated: boolean;
}

export interface AuditEvent extends OfficerDecision {
  modelVersion: string;
}

export interface MonitoringOutcome {
  borrowerId: string;
  borrowerName: string;
  cycle: number;
  forecast: number;
  actual: number;
  errorPct: number;
  state: StressState;
  outcome: "Recovered" | "Recovering" | "Still stressed" | "Re-entered stress" | "Default risk";
}

export interface ModelConfiguration {
  version: string;
  weights: RSIComponents;
  thresholds: { stable: number; seasonal: number; emerging: number };
  rules: Record<string, PlanType[]>;
}

export interface ActivityEvent {
  id: string;
  time: string;
  title: string;
  detail: string;
  kind: "forecast" | "detection" | "decision" | "ingest" | "monitor";
  borrowerId?: string;
}

export interface Analysis {
  borrower: Borrower;
  rsi: RSIScore;
  rsiHistory: { cycle: string; value: number }[];
  decomposition: DecompositionResult;
  forecast: ForecastPoint[];
  seasonalMatch: number;
  state: StressState;
  evidence: Evidence[];
  plans: RepaymentPlanOption[];
  cashBuffer: number;
  expectedInflow: number;
  expectedExpense: number;
  forecastConfidence: number;
  onTimeCount: number;
  trendDirection: "Improving" | "Stable" | "Declining";
}
