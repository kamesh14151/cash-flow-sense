import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { useApp } from "../lib/store";
import { AppShell } from "../components/layout/AppShell";
import { StressStateBadge } from "../components/shared/StressStateBadge";
import { analyzeBorrower } from "../lib/engine";
import { slugFor } from "../lib/data";
import { AlertTriangle, TrendingDown, Minus, ArrowRight } from "lucide-react";
import type { StressState } from "../lib/types";

export const Route = createFileRoute("/alerts")({
  component: AlertsPage,
});

const CATEGORIES: { state: StressState; label: string; icon: typeof TrendingDown; color: string }[] = [
  { state: "Structural Decline", label: "Structural Decline", icon: TrendingDown, color: "text-danger" },
  { state: "Emerging Stress", label: "Emerging Stress", icon: AlertTriangle, color: "text-warning" },
  { state: "Seasonal Dip", label: "Seasonal Dip", icon: Minus, color: "text-info" },
];

function AlertsPage() {
  const { state } = useApp();
  const navigate = useNavigate();

  const byState = useMemo(() => {
    const analyses = { ...state.analyses };
    for (const b of state.borrowers.slice(0, 60)) {
      if (!analyses[b.id]) analyses[b.id] = analyzeBorrower(b, state.modelConfig);
    }
    const map: Partial<Record<StressState, typeof analyses[string][]>> = {};
    for (const a of Object.values(analyses)) {
      if (a.state !== "Stable") {
        if (!map[a.state]) map[a.state] = [];
        map[a.state]!.push(a);
      }
    }
    return map;
  }, [state.analyses, state.borrowers, state.modelConfig]);

  return (
    <AppShell>
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-foreground">Alerts</h1>
        <p className="text-[13px] text-muted-foreground mt-0.5">
          Borrowers requiring immediate attention
        </p>
      </div>

      <div className="space-y-6">
        {CATEGORIES.map(({ state: s, label, icon: Icon, color }) => {
          const items = byState[s] ?? [];
          if (items.length === 0) return null;
          return (
            <div key={s}>
              <div className="flex items-center gap-2 mb-3">
                <Icon className={`h-4 w-4 ${color}`} />
                <h2 className="text-[14px] font-semibold text-foreground">{label}</h2>
                <span className="text-[12px] text-muted-foreground">({items.length})</span>
              </div>
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <table className="w-full text-[12px]">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      {["Borrower", "Occupation", "RSI", "Seasonal match", "Trend", "Action"].map((h) => (
                        <th key={h} className="text-left text-[11px] text-muted-foreground font-semibold uppercase tracking-wide py-2.5 px-4">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {items.sort((a, b) => b.rsi.value - a.rsi.value).map((a) => (
                      <tr key={a.borrower.id} className="hover:bg-muted/30">
                        <td className="py-3 px-4">
                          <p className="font-medium text-foreground">{a.borrower.name}</p>
                          <p className="text-[11px] text-muted-foreground">{a.borrower.id}</p>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">{a.borrower.occupation}</td>
                        <td className="py-3 px-4 font-bold" style={{ color: s === "Structural Decline" ? "var(--color-danger)" : "var(--color-warning)" }}>
                          {a.rsi.value}
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">{a.seasonalMatch}%</td>
                        <td className="py-3 px-4 text-muted-foreground">{a.trendDirection}</td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => navigate({ to: `/borrowers/${slugFor(a.borrower)}` })}
                            className="flex items-center gap-1 text-[12px] font-medium hover:text-cfc-amber"
                          >
                            Analyse <ArrowRight className="h-3 w-3" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
        {Object.values(byState).flat().length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <AlertTriangle className="h-8 w-8 mx-auto mb-3 opacity-30" />
            <p>No active alerts</p>
          </div>
        )}
      </div>
    </AppShell>
  );
}
