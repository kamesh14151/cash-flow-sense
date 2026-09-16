import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { useApp } from "../../lib/store";
import { AppShell } from "../../components/layout/AppShell";
import { StressStateBadge } from "../../components/shared/StressStateBadge";
import { CashFlowChart } from "../../components/analysis/CashFlowChart";
import { DecompositionChart } from "../../components/analysis/DecompositionChart";
import { RSIGauge } from "../../components/analysis/RSIGauge";
import { RSIComponents } from "../../components/analysis/RSIComponents";
import { RSIHistory } from "../../components/analysis/RSIHistory";
import { EvidenceCards } from "../../components/analysis/EvidenceCards";
import { RepaymentPlans } from "../../components/analysis/RepaymentPlans";
import { PlanReviewDrawer } from "../../components/analysis/PlanReviewDrawer";
import { ScenarioSwitcher } from "../../components/analysis/ScenarioSwitcher";
import { analyzeBorrower, inr } from "../../lib/engine";
import { DEMO_BORROWERS } from "../../lib/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../../components/ui/sheet";
import {
  CheckCircle2,
  Clock,
  DollarSign,
  Calendar,
  ChevronLeft,
  Eye,
  Shield,
  RefreshCw,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import type { OfficerDecision, RepaymentPlanOption } from "../../lib/types";

export const Route = createFileRoute("/borrowers/$id")({
  component: BorrowerAnalysisPage,
});

function BorrowerAnalysisPage() {
  const { id } = Route.useParams();
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [reviewPlanId, setReviewPlanId] = useState<string | null>(null);
  const [evidenceDrawerOpen, setEvidenceDrawerOpen] = useState(false);

  // Resolve borrower from slug or ID
  const borrower = useMemo(() => {
    return state.borrowers.find(
      (b) =>
        b.id.toLowerCase() === id ||
        b.name.split(" ")[0]?.toLowerCase() === id.toLowerCase(),
    );
  }, [state.borrowers, id]);

  // Get or compute analysis
  const analysis = useMemo(() => {
    if (!borrower) return null;
    if (state.analyses[borrower.id]) return state.analyses[borrower.id];
    return analyzeBorrower(borrower, state.modelConfig);
  }, [borrower, state.analyses, state.modelConfig]);

  if (!borrower || !analysis) {
    return (
      <AppShell>
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-lg font-semibold text-foreground">Borrower not found</p>
          <p className="text-sm text-muted-foreground mt-1">ID or slug: {id}</p>
          <Button variant="outline" className="mt-4" onClick={() => navigate({ to: "/borrowers" })}>
            Back to borrowers
          </Button>
        </div>
      </AppShell>
    );
  }

  const loan = borrower.loan;
  const onTimeCount = borrower.history.slice(-12).filter((p) => p.paidOnTime).length;

  // Approved plan for this borrower
  const approvedDecision = state.decisions
    .filter((d) => d.borrowerId === borrower.id && d.action === "Approved")
    .slice(-1)[0];

  // Scenario switcher options from hero demo borrowers
  const scenarioOptions = DEMO_BORROWERS.slice(0, 2).map((b) => {
    const a = state.analyses[b.id] ?? analyzeBorrower(b, state.modelConfig);
    return {
      borrower: b,
      rsi: a.rsi.value,
      state: a.state,
      seasonalMatch: a.seasonalMatch,
    };
  });

  const isDemoScenario = ["BR-10482", "BR-10921"].includes(borrower.id);

  function handleApprove(plan: RepaymentPlanOption, notes: string) {
    const decision: OfficerDecision = {
      id: `DEC-${Date.now()}`,
      borrowerId: borrower!.id,
      borrowerName: borrower!.name,
      officerId: "OFF-001",
      officerName: state.currentUser.name,
      role: "Loan Officer",
      action: "Approved",
      planId: plan.id,
      planType: plan.type,
      previousSchedule: `${inr(loan.installment)} × ${loan.remainingPeriods}m`,
      newSchedule: plan.schedule,
      timestamp: new Date().toISOString(),
      reason: "Officer approved after review",
      notes: notes || undefined,
      rsiAtDecision: analysis!.rsi.value,
      stateAtDecision: analysis!.state,
      evidenceSnapshot: analysis!.evidence,
      configurationSnapshot: state.modelConfig,
      auditId: `AUD-${Date.now()}`,
      escalated: plan.requiresEscalation,
    };
    dispatch({ type: "APPROVE_PLAN", decision });
    setReviewPlanId(null);
  }

  function handleReject(plan: RepaymentPlanOption, reason: string, notes: string) {
    const decision: OfficerDecision = {
      id: `DEC-${Date.now()}`,
      borrowerId: borrower!.id,
      borrowerName: borrower!.name,
      officerId: "OFF-001",
      officerName: state.currentUser.name,
      role: "Loan Officer",
      action: "Rejected",
      planId: plan.id,
      planType: plan.type,
      previousSchedule: `${inr(loan.installment)} × ${loan.remainingPeriods}m`,
      newSchedule: `${inr(loan.installment)} × ${loan.remainingPeriods}m`,
      timestamp: new Date().toISOString(),
      reason,
      notes: notes || undefined,
      rsiAtDecision: analysis!.rsi.value,
      stateAtDecision: analysis!.state,
      evidenceSnapshot: analysis!.evidence,
      configurationSnapshot: state.modelConfig,
      auditId: `AUD-${Date.now()}`,
      escalated: false,
    };
    dispatch({ type: "REJECT_PLAN", decision });
    setReviewPlanId(null);
  }

  function handleModify(plan: RepaymentPlanOption, notes: string) {
    const decision: OfficerDecision = {
      id: `DEC-${Date.now()}`,
      borrowerId: borrower!.id,
      borrowerName: borrower!.name,
      officerId: "OFF-001",
      officerName: state.currentUser.name,
      role: "Loan Officer",
      action: "Modified",
      planId: plan.id,
      planType: plan.type,
      previousSchedule: `${inr(loan.installment)} × ${loan.remainingPeriods}m`,
      newSchedule: plan.schedule,
      timestamp: new Date().toISOString(),
      reason: "Officer modified plan values",
      notes: notes || undefined,
      rsiAtDecision: analysis!.rsi.value,
      stateAtDecision: analysis!.state,
      evidenceSnapshot: analysis!.evidence,
      configurationSnapshot: state.modelConfig,
      auditId: `AUD-${Date.now()}`,
      escalated: plan.requiresEscalation,
    };
    dispatch({ type: "MODIFY_PLAN", decision, modifiedPlan: plan });
    setReviewPlanId(null);
  }

  return (
    <AppShell>
      {/* Back */}
      <button
        onClick={() => navigate({ to: "/borrowers" })}
        className="flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground mb-4 transition-colors"
      >
        <ChevronLeft className="h-3.5 w-3.5" />
        All borrowers
      </button>

      {/* Borrower Header */}
      <div className="bg-card border border-border rounded-lg p-5 mb-5 shadow-xs space-y-3">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">{borrower.name}</h1>
            <p className="text-[13px] text-muted-foreground mt-0.5">
              {borrower.occupation} · {borrower.id} · Loan {loan.id}
            </p>
          </div>

          {/* Prominent State & Score Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <StressStateBadge state={analysis.state} />
            <div className="bg-muted px-3 py-1 rounded text-[13px] font-mono font-bold text-foreground border border-border">
              RSI {analysis.rsi.value} / 100
            </div>
            <div className="bg-muted px-3 py-1 rounded text-[13px] font-medium text-foreground border border-border">
              Seasonal match {analysis.seasonalMatch}%
            </div>
          </div>
        </div>

        {/* AI Interpretation statement */}
        <div className="border-t border-border pt-3">
          <p className="text-[13px] text-foreground/90 italic">
            &ldquo;
            {analysis.state === "Seasonal Dip"
              ? `Income pressure is present, but the current decline closely matches ${borrower.name.split(" ")[0]}'s historical seasonal pattern.`
              : analysis.state === "Structural Decline"
                ? `Current decline is poorly explained by historical seasonality and is accompanied by a persistent negative trend.`
                : analysis.state === "Emerging Stress"
                  ? `Recent income fluctuations indicate emerging repayment stress requiring officer monitoring.`
                  : `Cash flow remains stable and well within projected baseline parameters.`}
            &rdquo;
          </p>
        </div>
      </div>

      {/* AI Analysis Summary Card */}
      <div className="bg-card border border-border rounded-lg p-5 mb-6 space-y-3 shadow-xs">
        <div className="flex items-center justify-between border-b border-border pb-2">
          <span className="text-[11px] font-bold text-cfc-amber uppercase tracking-wider">
            Analysis summary
          </span>
          <span className="text-[11px] text-muted-foreground">
            Cycle {analysis.rsi.cycle} · Model v2026.09.1
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[12px]">
          {/* SIGNAL */}
          <div className="space-y-1 bg-muted/30 border border-border rounded p-3">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
              SIGNAL
            </span>
            <p className="font-semibold text-foreground text-[13px]">
              {analysis.state === "Stable" ? "Income is stable." : "Income is declining."}
            </p>
          </div>

          {/* INTERPRETATION */}
          <div className="space-y-1 bg-muted/30 border border-border rounded p-3">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
              INTERPRETATION
            </span>
            <p className="font-semibold text-foreground text-[13px]">
              {analysis.state === "Seasonal Dip"
                ? "The decline strongly matches historical seasonality."
                : analysis.state === "Structural Decline"
                  ? "The decline is poorly explained by historical seasonality."
                  : analysis.state === "Emerging Stress"
                    ? "The decline shows volatility exceeding normal seasonal variance."
                    : "Income aligns with expected baseline trajectory."}
            </p>
          </div>

          {/* IMPLICATION */}
          <div className="space-y-1 bg-muted/30 border border-border rounded p-3">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
              IMPLICATION
            </span>
            <p className="font-semibold text-foreground text-[13px]">
              {analysis.state === "Seasonal Dip"
                ? "Current evidence supports a temporary repayment adjustment rather than treating the decline as structural."
                : analysis.state === "Structural Decline"
                  ? "Current evidence supports temporary moratorium and structural loan restructuring."
                  : analysis.state === "Emerging Stress"
                    ? "Current evidence supports proactive tenure adjustment to mitigate default risk."
                    : "No restructuring required; borrower qualifies for standard terms."}
            </p>
          </div>
        </div>

        <p className="text-[11px] text-muted-foreground italic text-right pt-1">
          Based on current forecast and available repayment history.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main analysis */}
        <div className="col-span-2 space-y-5">
          {/* Loan stats row */}
          <div className="grid grid-cols-4 gap-3">
            {[
              {
                icon: DollarSign,
                label: "Cash buffer",
                value: inr(analysis.cashBuffer),
                color: analysis.cashBuffer >= 0 ? "text-success" : "text-danger",
              },
              {
                icon: Calendar,
                label: "Due date",
                value: loan.nextDue.split(",")[0],
                color: "text-foreground",
              },
              {
                icon: CheckCircle2,
                label: "On-time payments",
                value: `${onTimeCount}/12`,
                color: onTimeCount >= 10 ? "text-success" : onTimeCount >= 8 ? "text-warning" : "text-danger",
              },
              {
                icon: Clock,
                label: "Last payment",
                value: loan.lastPayment.split(",")[0],
                color: "text-foreground",
              },
            ].map((s) => (
              <div key={s.label} className="bg-card border border-border rounded-lg p-3">
                <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                  <s.icon className="h-3.5 w-3.5" />
                  <p className="text-[11px]">{s.label}</p>
                </div>
                <p className={`text-[16px] font-bold ${s.color}`}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Tabbed analysis */}
          <Tabs defaultValue="cashflow" className="bg-card border border-border rounded-lg">
            <TabsList className="w-full border-b border-border rounded-t-lg rounded-b-none bg-muted/30 h-auto p-1 justify-start gap-1">
              <TabsTrigger value="cashflow" className="text-[12px] font-medium px-3 py-1.5 rounded">
                Cash-Flow Outlook
              </TabsTrigger>
              <TabsTrigger value="decomposition" className="text-[12px] font-medium px-3 py-1.5 rounded">
                Decomposition
              </TabsTrigger>
              <TabsTrigger value="rsi" className="text-[12px] font-medium px-3 py-1.5 rounded">
                RSI Analysis
              </TabsTrigger>
              <TabsTrigger value="evidence" className="text-[12px] font-medium px-3 py-1.5 rounded">
                Evidence
              </TabsTrigger>
              <TabsTrigger value="plans" className="text-[12px] font-medium px-3 py-1.5 rounded">
                Repayment Plans
              </TabsTrigger>
            </TabsList>

            <div className="p-5">
              <TabsContent value="cashflow" className="mt-0">
                <CashFlowChart analysis={analysis} />
              </TabsContent>

              <TabsContent value="decomposition" className="mt-0">
                <div className="mb-4">
                  <h2 className="text-[14px] font-bold text-foreground">
                    What&apos;s driving the decline?
                  </h2>
                  <p className="text-[12px] text-muted-foreground mt-0.5">
                    STL decomposition into Trend, Seasonal, and Residual components.
                  </p>
                </div>
                <DecompositionChart
                  decomposition={analysis.decomposition}
                  seasonalMatch={analysis.seasonalMatch}
                />
              </TabsContent>

              <TabsContent value="rsi" className="mt-0 space-y-4">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <div>
                    <h2 className="text-[14px] font-bold text-foreground">
                      Repayment Stress Index (RSI)
                    </h2>
                    <p className="text-[12px] text-muted-foreground mt-0.5">
                      Composite risk score calculated from 6 weighted feature dimensions.
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[20px] font-bold font-mono text-foreground">
                      {analysis.rsi.value} / 100
                    </span>
                    <p className="text-[11px] text-muted-foreground">{analysis.state}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="col-span-1 flex flex-col items-center justify-center bg-muted/20 border border-border rounded-lg p-4">
                    <RSIGauge value={analysis.rsi.value} state={analysis.state} size={180} />
                    <div className="mt-4 text-center">
                      <p className="text-[12px] font-semibold text-foreground">{analysis.state}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        Cycle {analysis.rsi.cycle} evaluation
                      </p>
                    </div>
                  </div>

                  <div className="col-span-2">
                    <RSIComponents rsi={analysis.rsi} />
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <h3 className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                    Historical RSI Trajectory
                  </h3>
                  <RSIHistory history={analysis.rsiHistory} />
                </div>
              </TabsContent>

              <TabsContent value="evidence" className="mt-0">
                <div className="flex items-center justify-between mb-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-[12px] gap-1.5 ml-auto"
                    onClick={() => setEvidenceDrawerOpen(true)}
                  >
                    <Eye className="h-3.5 w-3.5" />
                    Feature attribution
                  </Button>
                </div>
                <EvidenceCards evidence={analysis.evidence} />
              </TabsContent>

              <TabsContent value="plans" className="mt-0 space-y-5">
                {/* DECISION CONTEXT STRIP */}
                <div className="bg-card border border-border rounded-lg p-4 space-y-2">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">
                    DECISION CONTEXT
                  </span>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-[12px]">
                    <div className="bg-muted/40 border border-border rounded p-2.5">
                      <span className="text-[10px] text-muted-foreground block">Stress state</span>
                      <span className="font-bold text-foreground">{analysis.state}</span>
                    </div>
                    <div className="bg-muted/40 border border-border rounded p-2.5">
                      <span className="text-[10px] text-muted-foreground block">Seasonal match</span>
                      <span className="font-bold text-foreground">{analysis.seasonalMatch}%</span>
                    </div>
                    <div className="bg-muted/40 border border-border rounded p-2.5">
                      <span className="text-[10px] text-muted-foreground block">Forecast confidence</span>
                      <span className="font-bold text-foreground">{analysis.forecastConfidence}%</span>
                    </div>
                    <div className="bg-muted/40 border border-border rounded p-2.5">
                      <span className="text-[10px] text-muted-foreground block">Projected buffer</span>
                      <span
                        className={`font-bold ${
                          analysis.cashBuffer >= 0 ? "text-success" : "text-danger"
                        }`}
                      >
                        {inr(analysis.cashBuffer)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* OFFICER REVIEW REQUIRED BANNER */}
                <div className="border-2 border-warning/50 bg-warning/8 rounded-xl p-4 flex items-center justify-between gap-4 flex-wrap shadow-xs">
                  <div>
                    <span className="text-[11px] font-bold text-warning uppercase tracking-widest block">
                      OFFICER REVIEW REQUIRED
                    </span>
                    <p className="text-[13px] font-semibold text-foreground mt-0.5">
                      Cash-Flow Copilot provides analytical recommendations. The loan officer makes the final decision.
                    </p>
                  </div>
                  {analysis.plans.find((p) => p.recommended) && (
                    <Button
                      onClick={() => {
                        const rec = analysis.plans.find((p) => p.recommended);
                        if (rec) setReviewPlanId(rec.id);
                      }}
                      className="bg-foreground text-background hover:bg-foreground/90 text-[13px] font-bold shadow-xs px-4"
                    >
                      Review recommendation →
                    </Button>
                  )}
                </div>

                {/* APPROVED DECISION BANNER & AUDIT / MONITORING LINKS */}
                {approvedDecision && (
                  <div className="bg-success/10 border border-success/30 rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-success text-[14px]">
                        ✓ PLAN APPROVED — {approvedDecision.planType}
                      </span>
                      <span className="text-[11px] font-mono text-muted-foreground">
                        {approvedDecision.auditId}
                      </span>
                    </div>
                    <p className="text-[12px] text-muted-foreground">
                      Approved by <strong className="text-foreground">{approvedDecision.officerName}</strong> ({approvedDecision.role}) on{" "}
                      {new Date(approvedDecision.timestamp).toLocaleString()}
                    </p>
                    <div className="flex items-center gap-3 pt-1 text-[12px]">
                      <button
                        onClick={() => navigate({ to: "/audit-log" })}
                        className="text-foreground font-semibold hover:text-cfc-amber flex items-center gap-1 transition-colors"
                      >
                        <Shield className="h-3.5 w-3.5" />
                        View audit record →
                      </button>
                      <span>·</span>
                      <button
                        onClick={() => navigate({ to: "/monitoring" })}
                        className="text-foreground font-semibold hover:text-cfc-amber flex items-center gap-1 transition-colors"
                      >
                        <RefreshCw className="h-3.5 w-3.5" />
                        View monitoring →
                      </button>
                    </div>
                  </div>
                )}

                <RepaymentPlans
                  plans={analysis.plans}
                  onReview={(planId) => setReviewPlanId(planId)}
                  decidedPlanId={approvedDecision?.planId}
                />
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Right sidebar */}
        <div className="col-span-1 space-y-4">
          {/* Scenario switcher for demo borrowers */}
          {isDemoScenario && (
            <ScenarioSwitcher current={borrower} options={scenarioOptions} />
          )}

          {/* Current State Status Block */}
          <div className="bg-card border border-border rounded-lg p-4 space-y-3">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">
              CURRENT STATE
            </span>

            <div className="flex items-center justify-between">
              <StressStateBadge state={analysis.state} />
              <span className="text-[16px] font-bold font-mono text-foreground">
                RSI {analysis.rsi.value}
              </span>
            </div>

            <div className="space-y-2 text-[12px] border-t border-border pt-2.5">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Seasonal match</span>
                <span className="font-semibold text-foreground">{analysis.seasonalMatch}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Forecast confidence</span>
                <span className="font-semibold text-foreground">{analysis.forecastConfidence}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Trend direction</span>
                <span className="font-semibold text-foreground">{analysis.trendDirection}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Cash buffer</span>
                <span
                  className={`font-semibold ${
                    analysis.cashBuffer >= 0 ? "text-success" : "text-danger"
                  }`}
                >
                  {inr(analysis.cashBuffer)}
                </span>
              </div>
            </div>
          </div>

          {/* Repayment history */}
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              Recent repayments
            </h3>
            <div className="space-y-1.5">
              {borrower.history.slice(-6).reverse().map((p, i) => (
                <div key={i} className="flex items-center justify-between text-[12px]">
                  <span className="text-muted-foreground">{p.label}</span>
                  <div className="flex items-center gap-2">
                    {p.repayment > 0 ? (
                      <span className="text-success font-medium">{inr(p.repayment)}</span>
                    ) : (
                      <span className="text-danger font-medium">Missed</span>
                    )}
                    {p.paidOnTime ? (
                      <CheckCircle2 className="h-3 w-3 text-success" />
                    ) : (
                      <span className="h-3 w-3 rounded-full bg-danger/20 border border-danger/40" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Plan Review Drawer */}
      {reviewPlanId && (
        <PlanReviewDrawer
          open={!!reviewPlanId}
          onClose={() => setReviewPlanId(null)}
          analysis={analysis}
          planId={reviewPlanId}
          onApprove={handleApprove}
          onReject={handleReject}
          onModify={handleModify}
        />
      )}

      {/* Feature attribution drawer */}
      <Sheet open={evidenceDrawerOpen} onOpenChange={setEvidenceDrawerOpen}>
        <SheetContent side="right" className="w-80 p-0 flex flex-col">
          <SheetHeader className="px-4 py-3 border-b border-border">
            <SheetTitle className="text-[14px]">Feature attribution</SheetTitle>
            <p className="text-[11px] text-muted-foreground">
              RSI component contributions · Cycle {analysis.rsi.cycle}
            </p>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <div className="text-[11px] text-muted-foreground bg-muted/50 rounded px-3 py-2">
              Feature-level contribution to RSI score of {analysis.rsi.value}.
              Chain-of-thought reasoning is not exposed.
            </div>
            {(Object.entries(analysis.rsi.components) as [string, number][]).map(([key, value]) => {
              const names: Record<string, string> = {
                CBR: "Cash Buffer Ratio",
                RV: "Residual Volatility",
                TM: "Trend Momentum",
                RTR: "Repayment Track Record",
                USD: "Unexplained Seasonal Dev.",
                ESI: "Expense Shock Index",
              };
              const maxes: Record<string, number> = { CBR: 25, RV: 15, TM: 20, RTR: 15, USD: 15, ESI: 10 };
              const pct = (value / (maxes[key] ?? 25)) * 100;
              return (
                <div key={key} className="space-y-1">
                  <div className="flex justify-between text-[12px]">
                    <span className="font-medium">{names[key] ?? key}</span>
                    <span className="font-mono text-foreground">+{value.toFixed(1)} pts</span>
                  </div>
                  <div className="h-1.5 bg-border rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${pct > 70 ? "bg-danger" : pct > 40 ? "bg-warning" : "bg-success"}`}
                      style={{ width: `${Math.min(100, pct)}%` }}
                    />
                  </div>
                </div>
              );
            })}
            {analysis.evidence.map((e, i) => (
              <div key={i} className="border border-border rounded p-2.5 text-[11px]">
                <div className="flex justify-between mb-0.5">
                  <span className="font-medium">{e.title}</span>
                  <span className="font-mono">+{e.contribution.toFixed(1)}</span>
                </div>
                <p className="text-muted-foreground">{e.value}</p>
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </AppShell>
  );
}
