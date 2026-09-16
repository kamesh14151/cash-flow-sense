import { Star, ChevronRight } from "lucide-react";
import type { RepaymentPlanOption } from "../../lib/types";
import { inr } from "../../lib/engine";
import { cn } from "../../lib/utils";

interface Props {
  plans: RepaymentPlanOption[];
  onReview: (planId: string) => void;
  decidedPlanId?: string;
}

export function RepaymentPlans({ plans, onReview, decidedPlanId }: Props) {
  const riskColor = {
    Low: "text-success bg-success/10",
    Moderate: "text-warning bg-warning/10",
    Elevated: "text-danger bg-danger/10",
  } as const;

  const recoveryColor = {
    Strong: "text-success",
    Moderate: "text-warning",
    Limited: "text-muted-foreground",
  } as const;

  const recommendedPlan = plans.find((p) => p.recommended) ?? plans[0];
  const alternativePlans = plans.filter((p) => p.id !== recommendedPlan?.id);

  return (
    <div className="space-y-5">
      <div className="border-b border-border pb-3">
        <span className="text-[10px] font-bold text-cfc-amber uppercase tracking-widest block">
          SYSTEM RECOMMENDATION
        </span>
        <p className="text-[12px] text-muted-foreground mt-0.5">
          Based on the forecast, stress classification, repayment history and supporting evidence.
        </p>
      </div>

      {/* RECOMMENDED HERO PLAN */}
      {recommendedPlan && (
        <div
          key={recommendedPlan.id}
          className={cn(
            "border-2 rounded-xl p-5 relative transition-all bg-card shadow-xs",
            decidedPlanId === recommendedPlan.id
              ? "border-success ring-2 ring-success/30"
              : "border-cfc-amber/50 bg-cfc-amber/5",
          )}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="flex items-center gap-1.5 text-[11px] font-bold text-cfc-amber bg-cfc-amber/15 border border-cfc-amber/30 px-2.5 py-1 rounded-full uppercase tracking-wider">
              <Star className="h-3.5 w-3.5 fill-cfc-amber text-cfc-amber" />
              RECOMMENDED OPTION
            </span>
            {decidedPlanId === recommendedPlan.id && (
              <span className="text-[11px] font-bold text-success bg-success/15 border border-success/30 px-2.5 py-1 rounded-full">
                ✓ APPROVED DECISION
              </span>
            )}
          </div>

          <div className="pr-12">
            <h4 className="text-[16px] font-bold text-foreground">{recommendedPlan.type}</h4>
            <p className="text-[12px] text-muted-foreground mt-0.5">{recommendedPlan.summary}</p>
          </div>

          {/* Metrics grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mt-4">
            <div className="bg-background/80 border border-border rounded-lg p-2.5 sm:p-3">
              <p className="text-[9px] sm:text-[10px] text-muted-foreground uppercase tracking-wide">Proposed Installment</p>
              <p className="text-[14px] sm:text-[16px] font-bold text-cfc-amber mt-0.5">{inr(recommendedPlan.installment)}</p>
              {recommendedPlan.recoveryInstallment && (
                <p className="text-[10px] sm:text-[11px] text-muted-foreground mt-0.5">
                  Step-up: {inr(recommendedPlan.recoveryInstallment)}
                </p>
              )}
            </div>
            <div className="bg-background/80 border border-border rounded-lg p-2.5 sm:p-3">
              <p className="text-[9px] sm:text-[10px] text-muted-foreground uppercase tracking-wide">Projected Buffer</p>
              <p
                className={cn(
                  "text-[14px] sm:text-[16px] font-bold mt-0.5",
                  recommendedPlan.projectedBuffer >= 0 ? "text-success" : "text-danger",
                )}
              >
                {inr(recommendedPlan.projectedBuffer)}/m
              </p>
            </div>
            <div className="bg-background/80 border border-border rounded-lg p-2.5 sm:p-3">
              <p className="text-[9px] sm:text-[10px] text-muted-foreground uppercase tracking-wide">Tenure Impact</p>
              <p className="text-[14px] sm:text-[16px] font-bold text-foreground mt-0.5">
                {recommendedPlan.revisedTenure}m
                <span className="text-[10px] sm:text-[11px] font-normal text-muted-foreground ml-1">
                  ({recommendedPlan.tenureDelta >= 0 ? "+" : ""}{recommendedPlan.tenureDelta}m)
                </span>
              </p>
            </div>
            <div className="bg-background/80 border border-border rounded-lg p-2.5 sm:p-3">
              <p className="text-[9px] sm:text-[10px] text-muted-foreground uppercase tracking-wide">Recovery Impact</p>
              <p className={cn("text-[14px] sm:text-[16px] font-bold mt-0.5", recoveryColor[recommendedPlan.recoveryImpact])}>
                {recommendedPlan.recoveryImpact}
              </p>
            </div>
          </div>

          {/* Schedule */}
          <div className="mt-3 bg-muted/40 border border-border rounded-lg px-3 py-2 text-[11px] sm:text-[12px] flex flex-wrap items-center justify-between gap-1">
            <span className="text-muted-foreground font-medium">Proposed Schedule:</span>
            <span className="font-mono font-bold text-foreground">{recommendedPlan.schedule}</span>
          </div>

          {/* WHY THIS OPTION? Section inside card */}
          <div className="mt-3 border-t border-border/80 pt-3 space-y-1">
            <span className="text-[10px] font-bold text-cfc-amber uppercase tracking-wider block">
              WHY THIS OPTION?
            </span>
            <p className="text-[12px] text-foreground/90 italic leading-relaxed">
              &ldquo;{recommendedPlan.reason}&rdquo;
            </p>
          </div>

          {recommendedPlan.requiresEscalation && (
            <p className="text-[11px] text-warning font-medium mt-2">
              ⚠ Requires branch manager escalation prior to execution.
            </p>
          )}

          {/* Action button */}
          {decidedPlanId !== recommendedPlan.id && (
            <button
              onClick={() => onReview(recommendedPlan.id)}
              className="mt-4 w-full flex items-center justify-center gap-2 text-[13px] font-semibold px-4 py-2.5 rounded-lg bg-foreground text-background hover:bg-foreground/90 transition-colors shadow-xs"
            >
              Review recommendation
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      )}

      {/* ALTERNATIVE OPTIONS */}
      {alternativePlans.length > 0 && (
        <div className="space-y-3 pt-2">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">
            ALTERNATIVE REPAYMENT OPTIONS
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {alternativePlans.map((plan) => {
              const isDecided = decidedPlanId === plan.id;
              return (
                <div
                  key={plan.id}
                  className={cn(
                    "border border-border rounded-lg p-4 bg-card space-y-3 relative transition-all",
                    isDecided && "ring-2 ring-success/40 border-success",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded border border-border">
                      ALTERNATIVE
                    </span>
                    {isDecided && (
                      <span className="text-[10px] font-bold text-success bg-success/10 px-2 py-0.5 rounded">
                        ✓ APPROVED
                      </span>
                    )}
                  </div>

                  <div>
                    <h5 className="text-[14px] font-bold text-foreground">{plan.type}</h5>
                    <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">{plan.summary}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] bg-muted/30 border border-border rounded p-2.5">
                    <div>
                      <span className="text-muted-foreground block">Installment</span>
                      <span className="font-bold text-foreground font-mono">{inr(plan.installment)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block">Projected Buffer</span>
                      <span
                        className={cn(
                          "font-bold font-mono",
                          plan.projectedBuffer >= 0 ? "text-success" : "text-danger",
                        )}
                      >
                        {inr(plan.projectedBuffer)}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block">Tenure Impact</span>
                      <span className="font-semibold text-foreground">
                        {plan.revisedTenure}m ({plan.tenureDelta >= 0 ? "+" : ""}{plan.tenureDelta}m)
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block">Recovery Impact</span>
                      <span className={cn("font-semibold", recoveryColor[plan.recoveryImpact])}>
                        {plan.recoveryImpact}
                      </span>
                    </div>
                  </div>

                  {!isDecided && (
                    <button
                      onClick={() => onReview(plan.id)}
                      className="w-full text-[12px] font-medium py-1.5 px-3 rounded border border-border bg-transparent text-foreground hover:bg-muted transition-colors flex items-center justify-center gap-1"
                    >
                      Review alternative <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
