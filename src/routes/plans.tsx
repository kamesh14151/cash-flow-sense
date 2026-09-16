import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useApp } from "../lib/store";
import { AppShell } from "../components/layout/AppShell";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { StressStateBadge } from "../components/shared/StressStateBadge";
import { inr } from "../lib/engine";
import { slugFor } from "../lib/data";
import { ArrowRight, CheckCircle2, XCircle, Edit3 } from "lucide-react";
import type { DecisionAction, OfficerDecision } from "../lib/types";

export const Route = createFileRoute("/plans")({
  component: PlansPage,
});

const TABS: { value: DecisionAction | "pending"; label: string }[] = [
  { value: "pending", label: "Pending review" },
  { value: "Approved", label: "Approved" },
  { value: "Modified", label: "Modified" },
  { value: "Rejected", label: "Rejected" },
];

function PlansPage() {
  const { state } = useApp();
  const navigate = useNavigate();

  // Pending = analyses with recommendations that have no decision yet
  const pendingAnalyses = Object.values(state.analyses).filter((a) => {
    const hasRecommended = a.plans.some((p) => p.recommended);
    const hasDecision = state.decisions.some((d) => d.borrowerId === a.borrower.id);
    return hasRecommended && !hasDecision;
  });

  function decisionsByAction(action: DecisionAction): OfficerDecision[] {
    return state.decisions.filter((d) => d.action === action);
  }

  function DecisionRow({ d }: { d: OfficerDecision }) {
    return (
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-border py-3.5 px-4 hover:bg-muted/30">
        <div className="flex items-start gap-3">
          <div>
            <p className="font-medium text-foreground text-[13px]">{d.borrowerName}</p>
            <p className="text-[11px] text-muted-foreground">{d.borrowerId} · {d.planType}</p>
            <div className="flex items-center gap-2 mt-1">
              <StressStateBadge state={d.stateAtDecision} size="sm" />
              <span className="text-[11px] text-muted-foreground">RSI {d.rsiAtDecision}</span>
            </div>
          </div>
        </div>
        <div className="sm:text-right text-[12px]">
          <p className="text-muted-foreground">{d.officerName} · {new Date(d.timestamp).toLocaleDateString()}</p>
          {d.notes && <p className="text-muted-foreground/60 italic mt-1">"{d.notes}"</p>}
          {d.reason && d.action === "Rejected" && (
            <p className="text-danger mt-1 text-[11px]">{d.reason}</p>
          )}
          <button
            onClick={() => navigate({ to: `/audit-log` })}
            className="mt-1.5 text-[12px] hover:text-cfc-amber flex items-center gap-1 sm:ml-auto"
          >
            View audit <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <AppShell>
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-foreground">Plans</h1>
        <p className="text-[13px] text-muted-foreground mt-0.5">
          System-generated repayment restructuring recommendations
        </p>
      </div>

      <Tabs defaultValue="pending">
        <TabsList className="mb-4 flex overflow-x-auto whitespace-nowrap scrollbar-none w-full max-w-full justify-start">
          {TABS.map((t) => (
            <TabsTrigger key={t.value} value={t.value} className="text-[12px] sm:text-[13px] shrink-0">
              {t.label}
              {t.value === "pending" && pendingAnalyses.length > 0 && (
                <span className="ml-1.5 h-4 w-4 rounded-full bg-warning text-white text-[10px] flex items-center justify-center">
                  {pendingAnalyses.length}
                </span>
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="pending">
          {pendingAnalyses.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <CheckCircle2 className="h-8 w-8 mx-auto mb-3 opacity-30" />
              <p>No plans pending review</p>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              {pendingAnalyses.map((a) => {
                const recommended = a.plans.find((p) => p.recommended) ?? a.plans[0];
                if (!recommended) return null;
                return (
                  <div key={a.borrower.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border py-4 px-4 hover:bg-muted/30 last:border-b-0">
                    <div>
                      <p className="font-medium text-foreground">{a.borrower.name}</p>
                      <p className="text-[12px] text-muted-foreground">{a.borrower.id} · {a.borrower.occupation}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <StressStateBadge state={a.state} size="sm" />
                        <span className="text-[12px] text-muted-foreground">RSI {a.rsi.value}</span>
                      </div>
                      <p className="text-[12px] text-cfc-amber mt-1.5 font-medium">
                        Recommended: {recommended.type} · {inr(recommended.installment)}/m
                      </p>
                    </div>
                    <button
                      onClick={() => navigate({ to: `/borrowers/${slugFor(a.borrower)}` })}
                      className="flex items-center justify-center gap-1.5 text-[12px] font-medium bg-foreground text-background px-3 py-1.5 rounded hover:bg-foreground/90 shrink-0 self-start sm:self-center"
                    >
                      Review <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </TabsContent>

        {(["Approved", "Modified", "Rejected"] as DecisionAction[]).map((action) => (
          <TabsContent key={action} value={action}>
            {decisionsByAction(action).length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                {action === "Approved" && <CheckCircle2 className="h-8 w-8 mx-auto mb-3 opacity-30" />}
                {action === "Rejected" && <XCircle className="h-8 w-8 mx-auto mb-3 opacity-30" />}
                {action === "Modified" && <Edit3 className="h-8 w-8 mx-auto mb-3 opacity-30" />}
                <p>No {action.toLowerCase()} plans</p>
              </div>
            ) : (
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                {decisionsByAction(action).map((d) => (
                  <DecisionRow key={d.id} d={d} />
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </AppShell>
  );
}
