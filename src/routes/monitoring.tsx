import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { useApp } from "../lib/store";
import { AppShell } from "../components/layout/AppShell";
import { recalibrateForecast, inr } from "../lib/engine";
import { Button } from "../components/ui/button";
import { ArrowDown, RefreshCw, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import type { StressState } from "../lib/types";

export const Route = createFileRoute("/monitoring")({
  component: MonitoringPage,
});

const OUTCOME_COLORS = {
  Recovered: "text-success",
  Recovering: "text-info",
  "Still stressed": "text-warning",
  "Re-entered stress": "text-warning",
  "Default risk": "text-danger",
} as const;

function MonitoringPage() {
  const { state, dispatch } = useApp();

  const latestCycleOutcomes = useMemo(() => {
    const maxCycle = Math.max(0, ...state.outcomes.map((o) => o.cycle));
    return state.outcomes.filter((o) => o.cycle === maxCycle);
  }, [state.outcomes]);

  const calib = useMemo(() => recalibrateForecast(latestCycleOutcomes), [latestCycleOutcomes]);

  const chartData = latestCycleOutcomes.slice(0, 10).map((o) => ({
    name: o.borrowerName.split(" ")[0],
    forecast: o.forecast,
    actual: o.actual,
    error: Math.abs(o.actual - o.forecast),
  }));

  // Pipeline flow steps
  const pipelineSteps = [
    { label: "FORECAST", sub: `${Object.keys(state.analyses).length} borrowers`, active: true },
    { label: "ACTUAL", sub: latestCycleOutcomes.length > 0 ? `${latestCycleOutcomes.length} outcomes` : "Awaiting cycle", active: latestCycleOutcomes.length > 0 },
    { label: "ERROR", sub: latestCycleOutcomes.length > 0 ? `MAPE ${calib.mape}%` : "—", active: latestCycleOutcomes.length > 0 },
    { label: "RECALIBRATION", sub: latestCycleOutcomes.length > 0 ? `Drift ${(calib.drift * 100).toFixed(2)}%` : "—", active: latestCycleOutcomes.length > 0 },
    { label: "NEXT CYCLE", sub: `Cycle ${state.monitoringCycle + 1}`, active: false },
  ];

  return (
    <AppShell>
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Monitoring</h1>
          <p className="text-[13px] text-muted-foreground mt-0.5">
            Forecast vs actual outcome tracking · Cycle {state.monitoringCycle}
          </p>
        </div>
        <Button
          className="gap-2"
          onClick={() => dispatch({ type: "RUN_NEXT_CYCLE" })}
        >
          <RefreshCw className="h-4 w-4" />
          Run next cycle
        </Button>
      </div>

      {/* Pipeline flow */}
      <div className="bg-card border border-border rounded-lg p-5 mb-5">
        <h2 className="text-[13px] font-semibold text-foreground mb-4">Monitoring pipeline</h2>
        <div className="flex items-center gap-2 flex-wrap">
          {pipelineSteps.map((s, i) => (
            <div key={s.label} className="flex items-center gap-2">
              <div className={`text-center px-4 py-3 rounded border ${s.active ? "border-cfc-amber/40 bg-cfc-amber/8" : "border-border bg-muted/30"}`}>
                <p className={`text-[12px] font-bold ${s.active ? "text-cfc-amber" : "text-muted-foreground"}`}>
                  {s.label}
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{s.sub}</p>
              </div>
              {i < pipelineSteps.length - 1 && (
                <ArrowDown className="h-4 w-4 text-muted-foreground rotate-[-90deg]" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        {[
          { label: "Forecast accuracy", value: latestCycleOutcomes.length > 0 ? `${calib.accuracy}%` : "—" },
          { label: "MAPE", value: latestCycleOutcomes.length > 0 ? `${calib.mape}%` : "—" },
          { label: "MAE", value: latestCycleOutcomes.length > 0 ? inr(calib.mae) : "—" },
          { label: "Coverage", value: latestCycleOutcomes.length > 0 ? `${calib.coverage}%` : "—" },
        ].map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-lg p-4">
            <p className="text-[11px] text-muted-foreground uppercase tracking-wide">{s.label}</p>
            <p className="text-[22px] font-bold text-foreground mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      {latestCycleOutcomes.length > 0 ? (
        <>
          {/* Chart */}
          <div className="bg-card border border-border rounded-lg p-5 mb-5">
            <h2 className="text-[14px] font-semibold text-foreground mb-4">Forecast vs Actual</h2>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={chartData} margin={{ top: 0, right: 8, bottom: 0, left: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} width={44} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (!active || !payload?.length) return null;
                    return (
                      <div className="bg-card border border-border rounded shadow p-2 text-[12px]">
                        <p className="font-medium mb-1">{label}</p>
                        {payload.map((p) => (
                          <div key={p.name} className="flex justify-between gap-3">
                            <span className="text-muted-foreground capitalize">{p.name}</span>
                            <span style={{ color: p.color }}>{inr(Number(p.value))}</span>
                          </div>
                        ))}
                      </div>
                    );
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="forecast" name="Forecast" fill="var(--color-cfc-amber)" fillOpacity={0.7} radius={[2, 2, 0, 0]} />
                <Bar dataKey="actual" name="Actual" fill="var(--color-foreground)" fillOpacity={0.8} radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Outcomes table */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="px-5 py-3 border-b border-border">
              <h2 className="text-[14px] font-semibold text-foreground">Outcome tracking</h2>
            </div>
            <table className="w-full text-[12px]">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  {["Borrower", "State", "Forecast", "Actual", "Error %", "Outcome"].map((h) => (
                    <th key={h} className="text-left text-[11px] text-muted-foreground font-semibold uppercase tracking-wide py-2.5 px-4">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {latestCycleOutcomes.map((o) => (
                  <tr key={o.borrowerId} className="hover:bg-muted/30">
                    <td className="py-3 px-4">
                      <p className="font-medium text-foreground">{o.borrowerName}</p>
                      <p className="text-[11px] text-muted-foreground">{o.borrowerId}</p>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{o.state}</td>
                    <td className="py-3 px-4">{inr(o.forecast)}</td>
                    <td className="py-3 px-4">{inr(o.actual)}</td>
                    <td className="py-3 px-4" style={{ color: Math.abs(o.errorPct) > 10 ? "var(--color-danger)" : "var(--color-muted-foreground)" }}>
                      {o.errorPct > 0 ? "+" : ""}{o.errorPct}%
                    </td>
                    <td className="py-3 px-4">
                      <span className={OUTCOME_COLORS[o.outcome]}>{o.outcome}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="text-center py-16 bg-card border border-border rounded-lg">
          <TrendingUp className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-[15px] font-medium text-foreground">No outcomes recorded yet</p>
          <p className="text-[13px] text-muted-foreground mt-1">
            Click "Run next cycle" to simulate outcomes and recalibrate forecasts.
          </p>
        </div>
      )}
    </AppShell>
  );
}
