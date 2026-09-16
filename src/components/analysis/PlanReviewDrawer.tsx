import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import type { Analysis, RepaymentPlanOption } from "../../lib/types";
import { inr } from "../../lib/engine";
import { StressStateBadge } from "../shared/StressStateBadge";
import { ApprovalDialog } from "./ApprovalDialog";
import { RejectionDialog } from "./RejectionDialog";
import { cn } from "../../lib/utils";
import { Shield, RefreshCw } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  analysis: Analysis;
  planId: string;
  onApprove: (plan: RepaymentPlanOption, notes: string) => void;
  onReject: (plan: RepaymentPlanOption, reason: string, notes: string) => void;
  onModify: (plan: RepaymentPlanOption, notes: string) => void;
}

type Step = 1 | 2 | 3 | 4;

export function PlanReviewDrawer({
  open,
  onClose,
  analysis,
  planId,
  onApprove,
  onReject,
  onModify,
}: Props) {
  const [step, setStep] = useState<Step>(1);
  const [approvalOpen, setApprovalOpen] = useState(false);
  const [rejectionOpen, setRejectionOpen] = useState(false);
  const [officerNotes, setOfficerNotes] = useState("");

  // Modified plan state
  const plan = analysis.plans.find((p) => p.id === planId);
  const [modInstallment, setModInstallment] = useState(plan?.installment ?? 0);
  const [modTenure, setModTenure] = useState(plan?.revisedTenure ?? 0);
  const [modRecovery, setModRecovery] = useState(plan?.recoveryInstallment ?? 0);
  const [modifying, setModifying] = useState(false);

  const navigate = useNavigate();

  if (!plan) return null;

  const borrower = analysis.borrower;
  const loan = borrower.loan;
  const modBuffer = analysis.expectedInflow - analysis.expectedExpense - modInstallment;

  const STEPS = [
    { n: 1, label: "Understand" },
    { n: 2, label: "Compare" },
    { n: 3, label: "Decide" },
    { n: 4, label: "Record" },
  ];

  return (
    <>
      <Sheet
        open={open}
        onOpenChange={(v) => {
          if (!v) {
            onClose();
            setStep(1);
            setModifying(false);
          }
        }}
      >
        <SheetContent side="right" className="w-[520px] max-w-full flex flex-col p-0 overflow-y-auto">
          {/* Header */}
          <SheetHeader className="px-5 py-4 border-b border-border shrink-0">
            <div className="flex items-start justify-between gap-3">
              <div>
                <SheetTitle className="text-[15px] font-semibold">
                  Review Recommendation
                </SheetTitle>
                <p className="text-[12px] text-muted-foreground mt-0.5">
                  {borrower.name} · {borrower.id} · {plan.type}
                </p>
              </div>
              <StressStateBadge state={analysis.state} size="sm" />
            </div>
          </SheetHeader>

          {/* Human-in-the-loop banner */}
          <div className="mx-5 mt-4 border border-warning/30 bg-warning/8 rounded px-4 py-3 shrink-0">
            <p className="text-[12px] font-semibold text-warning">
              ⚠ Human review required
            </p>
            <p className="text-[12px] text-muted-foreground mt-0.5">
              This system recommendation requires officer approval before any action is taken.
              No loan restructuring will occur automatically.
            </p>
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-0 px-5 pt-4 shrink-0">
            {STEPS.map((s, i) => (
              <div key={s.n} className="flex items-center">
                <button
                  onClick={() => setStep(s.n as Step)}
                  className={cn(
                    "flex items-center gap-1.5 text-[12px] font-medium transition-colors",
                    step === s.n
                      ? "text-foreground"
                      : step > s.n
                        ? "text-success"
                        : "text-muted-foreground",
                  )}
                >
                  <span
                    className={cn(
                      "h-6 w-6 rounded-full flex items-center justify-center text-[11px] font-bold border",
                      step === s.n
                        ? "bg-foreground text-background border-foreground"
                        : step > s.n
                          ? "bg-success/15 text-success border-success/30"
                          : "bg-transparent text-muted-foreground border-border",
                    )}
                  >
                    {step > s.n ? "✓" : s.n}
                  </span>
                  {s.label}
                </button>
                {i < STEPS.length - 1 && (
                  <div className="mx-2 h-px w-6 bg-border" />
                )}
              </div>
            ))}
          </div>

          {/* Step content */}
          <div className="flex-1 overflow-y-auto px-5 pt-4 pb-4 space-y-4">
            {/* STEP 1: Understand */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-[13px] font-semibold text-foreground">Borrower Summary</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "RSI", value: `${analysis.rsi.value} / 100` },
                    { label: "State", value: analysis.state },
                    { label: "Seasonal match", value: `${analysis.seasonalMatch}%` },
                    { label: "Trend", value: analysis.trendDirection },
                    { label: "Cash buffer", value: inr(analysis.cashBuffer) },
                    { label: "Expected inflow", value: inr(analysis.expectedInflow) },
                    { label: "Loan balance", value: inr(loan.balance) },
                    { label: "Current installment", value: inr(loan.installment) },
                  ].map((m) => (
                    <div key={m.label} className="bg-muted/50 rounded p-2.5">
                      <p className="text-[11px] text-muted-foreground">{m.label}</p>
                      <p className="text-[13px] font-semibold text-foreground mt-0.5">{m.value}</p>
                    </div>
                  ))}
                </div>

                <h3 className="text-[13px] font-semibold text-foreground">Classification rationale</h3>
                <div className="space-y-2">
                  {analysis.evidence.slice(0, 3).map((e, i) => (
                    <div key={i} className="border border-border rounded p-2.5 text-[12px]">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{e.title}</span>
                        <span
                          className={cn(
                            "text-[11px] px-1.5 py-0.5 rounded",
                            e.direction === "supports"
                              ? "bg-danger/10 text-danger"
                              : "bg-success/10 text-success",
                          )}
                        >
                          {e.direction === "supports" ? "↑ Stress" : "↓ Counter"}
                        </span>
                      </div>
                      <p className="text-muted-foreground">{e.statement}</p>
                    </div>
                  ))}
                </div>

                <Button className="w-full" onClick={() => setStep(2)}>
                  Review plan details →
                </Button>
              </div>
            )}

            {/* STEP 2: Compare */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-[13px] font-semibold text-foreground">Plan Comparison</h3>

                {/* Current vs proposed */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="border border-border rounded p-3">
                    <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-2">
                      Current schedule
                    </p>
                    <p className="text-[20px] font-bold text-foreground">
                      {inr(loan.installment)}
                    </p>
                    <p className="text-[12px] text-muted-foreground">
                      × {loan.remainingPeriods} remaining
                    </p>
                  </div>
                  <div className="border border-cfc-amber/40 bg-cfc-amber/5 rounded p-3">
                    <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-2">
                      Proposed ({plan.type})
                    </p>
                    <p className="text-[20px] font-bold text-cfc-amber">
                      {inr(plan.installment)}
                    </p>
                    <p className="text-[12px] text-muted-foreground">
                      × {plan.revisedTenure} months
                    </p>
                  </div>
                </div>

                {/* Metrics */}
                <div className="space-y-2">
                  {[
                    {
                      label: "Projected buffer",
                      current: inr(analysis.cashBuffer),
                      proposed: inr(plan.projectedBuffer),
                      good: plan.projectedBuffer > analysis.cashBuffer,
                    },
                    {
                      label: "Affordability",
                      current: "—",
                      proposed: `${plan.affordability}%`,
                      good: plan.affordability > 70,
                    },
                    {
                      label: "Principal recovery",
                      current: "100%",
                      proposed: `${plan.principalRecovery}%`,
                      good: plan.principalRecovery >= 96,
                    },
                    {
                      label: "Recovery impact",
                      current: "—",
                      proposed: plan.recoveryImpact,
                      good: plan.recoveryImpact === "Strong",
                    },
                  ].map((m) => (
                    <div key={m.label} className="flex items-center border border-border rounded px-3 py-2 text-[12px]">
                      <span className="text-muted-foreground w-36 shrink-0">{m.label}</span>
                      <span className="font-medium text-muted-foreground w-20">{m.current}</span>
                      <span className={cn("font-semibold ml-auto", m.good ? "text-success" : "text-warning")}>
                        {m.proposed}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="bg-muted/50 rounded px-3 py-2 text-[12px]">
                  <span className="text-muted-foreground">Schedule: </span>
                  <span className="font-mono font-medium">{plan.schedule}</span>
                </div>

                <Button className="w-full" onClick={() => setStep(3)}>
                  Proceed to decision →
                </Button>
              </div>
            )}

            {/* STEP 3: Decide */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-[13px] font-semibold text-foreground">Officer Decision</h3>

                {/* Approval flow reminder */}
                <div className="bg-muted/50 rounded p-3 text-[12px] text-muted-foreground">
                  <div className="flex flex-col gap-1">
                    {[
                      "System recommendation",
                      "Officer review (you are here)",
                      "Officer decision",
                      "Audit record",
                      "Outcome monitoring",
                    ].map((s, i) => (
                      <div key={i} className={cn("flex items-center gap-2", i === 1 && "font-semibold text-foreground")}>
                        <span
                          className={cn(
                            "h-5 w-5 rounded-full flex items-center justify-center text-[10px]",
                            i === 0
                              ? "bg-muted text-muted-foreground"
                              : i === 1
                                ? "bg-cfc-amber text-white"
                                : "bg-muted text-muted-foreground opacity-50",
                          )}
                        >
                          {i + 1}
                        </span>
                        {s}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-1.5">
                  <Label htmlFor="officer-notes" className="text-[12px]">
                    Officer notes (optional)
                  </Label>
                  <Textarea
                    id="officer-notes"
                    value={officerNotes}
                    onChange={(e) => setOfficerNotes(e.target.value)}
                    placeholder="Add any observations or context for the audit record…"
                    rows={3}
                    className="text-[13px]"
                  />
                </div>

                {/* Modify toggle */}
                {!modifying && (
                  <button
                    onClick={() => setModifying(true)}
                    className="text-[12px] text-muted-foreground underline hover:text-foreground"
                  >
                    I want to modify the plan values
                  </button>
                )}

                {modifying && (
                  <div className="border border-border rounded p-3 space-y-3">
                    <p className="text-[12px] font-semibold text-foreground">Modify plan values</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-[11px]">New installment (₹)</Label>
                        <Input
                          type="number"
                          value={modInstallment}
                          onChange={(e) => setModInstallment(Number(e.target.value))}
                          className="text-[13px]"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[11px]">Revised tenure (months)</Label>
                        <Input
                          type="number"
                          value={modTenure}
                          onChange={(e) => setModTenure(Number(e.target.value))}
                          className="text-[13px]"
                        />
                      </div>
                      {plan.recoveryInstallment && (
                        <div className="space-y-1">
                          <Label className="text-[11px]">Recovery installment (₹)</Label>
                          <Input
                            type="number"
                            value={modRecovery}
                            onChange={(e) => setModRecovery(Number(e.target.value))}
                            className="text-[13px]"
                          />
                        </div>
                      )}
                    </div>
                    <div className="bg-muted/50 rounded p-2 text-[12px]">
                      <span className="text-muted-foreground">Recalculated projected buffer: </span>
                      <span className={cn("font-semibold", modBuffer >= 0 ? "text-success" : "text-danger")}>
                        {inr(modBuffer)}
                      </span>
                    </div>
                  </div>
                )}

                {/* Decision buttons */}
                <div className="space-y-2 pt-2">
                  {modifying ? (
                    <Button
                      className="w-full bg-foreground text-background hover:bg-foreground/90"
                      onClick={() => {
                        const modifiedPlan: RepaymentPlanOption = {
                          ...plan,
                          installment: modInstallment,
                          revisedTenure: modTenure,
                          ...(modRecovery ? { recoveryInstallment: modRecovery } : {}),
                          projectedBuffer: modBuffer,
                          tenureDelta: modTenure - loan.tenure,
                        };
                        onModify(modifiedPlan, officerNotes);
                        setStep(4);
                      }}
                    >
                      Save modified recommendation
                    </Button>
                  ) : (
                    <Button
                      className="w-full bg-success text-white hover:bg-success/90"
                      onClick={() => setApprovalOpen(true)}
                    >
                      Approve plan
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    className="w-full text-danger border-danger/30 hover:bg-danger/5"
                    onClick={() => setRejectionOpen(true)}
                  >
                    Reject recommendation
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 4: Record */}
            {step === 4 && (
              <div className="space-y-4 text-center py-6">
                <div className="h-14 w-14 rounded-full bg-success/15 flex items-center justify-center mx-auto">
                  <span className="text-2xl text-success">✓</span>
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-foreground">Decision recorded</h3>
                  <p className="text-[12px] text-muted-foreground mt-1">
                    An officer decision and audit event have been recorded.
                    No loan restructuring has been automatically executed by the prototype.
                  </p>
                </div>
                <div className="bg-muted/50 rounded p-3 text-left text-[12px] space-y-1.5 border border-border">
                  <p><span className="text-muted-foreground">Borrower: </span><span className="font-semibold text-foreground">{borrower.name}</span></p>
                  <p><span className="text-muted-foreground">Selected Plan: </span><span className="font-semibold text-foreground">{plan.type}</span></p>
                  <p><span className="text-muted-foreground">Officer: </span><span className="font-semibold text-foreground">Priya Sharma</span></p>
                  <p><span className="text-muted-foreground">Timestamp: </span><span className="font-mono text-muted-foreground">{new Date().toLocaleString()}</span></p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Button
                    variant="outline"
                    className="text-[12px] gap-1.5 border-border"
                    onClick={() => {
                      onClose();
                      navigate({ to: "/audit-log" });
                    }}
                  >
                    <Shield className="h-3.5 w-3.5" />
                    View audit record →
                  </Button>
                  <Button
                    variant="outline"
                    className="text-[12px] gap-1.5 border-border"
                    onClick={() => {
                      onClose();
                      navigate({ to: "/monitoring" });
                    }}
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    View monitoring →
                  </Button>
                </div>

                <Button variant="ghost" className="w-full text-[12px] text-muted-foreground" onClick={onClose}>
                  Close review drawer
                </Button>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <ApprovalDialog
        open={approvalOpen}
        onClose={() => setApprovalOpen(false)}
        analysis={analysis}
        plan={plan}
        notes={officerNotes}
        onConfirm={() => {
          onApprove(plan, officerNotes);
          setApprovalOpen(false);
          setStep(4);
        }}
      />

      <RejectionDialog
        open={rejectionOpen}
        onClose={() => setRejectionOpen(false)}
        analysis={analysis}
        plan={plan}
        onConfirm={(reason, notes) => {
          onReject(plan, reason, notes);
          setRejectionOpen(false);
          setStep(4);
        }}
      />
    </>
  );
}
