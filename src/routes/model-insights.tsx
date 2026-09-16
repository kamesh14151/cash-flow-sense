import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { useApp } from "../lib/store";
import { AppShell } from "../components/layout/AppShell";
import { DEFAULT_CONFIG } from "../lib/engine";
import { RSIGauge } from "../components/analysis/RSIGauge";
import { Button } from "../components/ui/button";
import { Slider } from "../components/ui/slider";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import type { StressState } from "../lib/types";

export const Route = createFileRoute("/model-insights")({
  component: ModelInsightsPage,
});

const STATE_COLORS: Record<StressState, string> = {
  Stable: "#3F7957",
  "Seasonal Dip": "#536B87",
  "Emerging Stress": "#B47720",
  "Structural Decline": "#B64C3D",
};

const WEIGHT_KEYS = ["CBR", "RV", "TM", "RTR", "USD", "ESI"] as const;
const WEIGHT_LABELS: Record<string, string> = {
  CBR: "Cash Buffer Ratio",
  RV: "Residual Volatility",
  TM: "Trend Momentum",
  RTR: "Repayment Track Record",
  USD: "Unexplained Seasonal Deviation",
  ESI: "Expense Shock Index",
};
const WEIGHT_DEFAULTS: Record<string, number> = { CBR: 25, RV: 15, TM: 20, RTR: 15, USD: 15, ESI: 10 };

function ModelInsightsPage() {
  const { state, dispatch } = useApp();
  const [weights, setWeights] = useState({ ...state.modelConfig.weights });
  const [saved, setSaved] = useState(false);

  const total = Object.values(weights).reduce((s, v) => s + v, 0);
  const isValid = Math.abs(total - 100) < 1;

  function setWeight(key: string, val: number) {
    setWeights((prev) => ({ ...prev, [key]: val }));
    setSaved(false);
  }

  function saveConfig() {
    const newConfig = {
      ...state.modelConfig,
      weights: weights as typeof state.modelConfig.weights,
      version: `cfc-model-2026.09.${Date.now().toString(36)}`,
    };
    dispatch({ type: "UPDATE_CONFIG", config: newConfig });
    setSaved(true);
  }

  function resetWeights() {
    setWeights({ ...WEIGHT_DEFAULTS } as typeof weights);
    setSaved(false);
  }

  const stateDistribution = useMemo(() => {
    const counts: Record<StressState, number> = {
      Stable: 0,
      "Seasonal Dip": 0,
      "Emerging Stress": 0,
      "Structural Decline": 0,
    };
    for (const a of Object.values(state.analyses)) counts[a.state]++;
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [state.analyses]);

  const rsiDistData = useMemo(() => {
    const buckets = [
      { range: "0–20", min: 0, max: 20, count: 0 },
      { range: "21–40", min: 21, max: 40, count: 0 },
      { range: "41–60", min: 41, max: 60, count: 0 },
      { range: "61–80", min: 61, max: 80, count: 0 },
      { range: "81–100", min: 81, max: 100, count: 0 },
    ];
    for (const a of Object.values(state.analyses)) {
      const v = a.rsi.value;
      const b = buckets.find((bk) => v >= bk.min && v <= bk.max);
      if (b) b.count++;
    }
    return buckets;
  }, [state.analyses]);

  return (
    <AppShell>
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-foreground">Model Insights</h1>
        <p className="text-[13px] text-muted-foreground mt-0.5">
          RSI model configuration, distribution, and feature importance
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left: Config */}
        <div className="col-span-1 space-y-4">
          {/* RSI weights */}
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[14px] font-semibold text-foreground">RSI weights</h2>
              <span className={`text-[12px] font-semibold ${isValid ? "text-success" : "text-danger"}`}>
                Total: {total}%
              </span>
            </div>

            <div className="space-y-4">
              {WEIGHT_KEYS.map((key) => (
                <div key={key} className="space-y-1.5">
                  <div className="flex justify-between text-[12px]">
                    <span className="font-medium text-foreground">{WEIGHT_LABELS[key]}</span>
                    <span className="font-mono text-muted-foreground">{weights[key]}%</span>
                  </div>
                  <Slider
                    min={0}
                    max={40}
                    step={1}
                    value={[weights[key]]}
                    onValueChange={([v]) => setWeight(key, v ?? 0)}
                    className="w-full"
                  />
                </div>
              ))}
            </div>

            <div className="mt-4 flex gap-2">
              <Button
                className="flex-1 text-[12px]"
                onClick={saveConfig}
                disabled={!isValid}
              >
                {saved ? "✓ Saved" : "Save configuration"}
              </Button>
              <Button variant="outline" className="text-[12px]" onClick={resetWeights}>
                Reset
              </Button>
            </div>

            {!isValid && (
              <p className="text-[11px] text-danger mt-2">
                Weights must sum to exactly 100%.
              </p>
            )}

            <p className="text-[11px] text-muted-foreground/60 mt-3 border-t border-border pt-3">
              ⚠ Prototype configuration. Changes affect all future RSI calculations and are reflected in the model version.
            </p>
          </div>

          {/* Stress thresholds */}
          <div className="bg-card border border-border rounded-lg p-4">
            <h2 className="text-[14px] font-semibold text-foreground mb-3">Stress thresholds</h2>
            <div className="space-y-2 text-[12px]">
              {[
                { label: "Stable", range: "0–30", color: "text-success" },
                { label: "Seasonal Dip", range: "31–50", color: "text-info" },
                { label: "Emerging Stress", range: "51–70", color: "text-warning" },
                { label: "Structural Decline", range: "71–100", color: "text-danger" },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between">
                  <span className={`font-medium ${s.color}`}>{s.label}</span>
                  <span className="font-mono text-muted-foreground">{s.range}</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-muted-foreground/60 mt-3 border-t border-border pt-3">
              ⚠ Prototype configuration. Not editable in this build.
            </p>
          </div>
        </div>

        {/* Right: Distributions */}
        <div className="col-span-2 space-y-4">
          {/* State distribution pie */}
          <div className="bg-card border border-border rounded-lg p-4">
            <h2 className="text-[14px] font-semibold text-foreground mb-3">Stress state distribution</h2>
            <div className="flex items-center gap-4">
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={stateDistribution} cx="50%" cy="50%" outerRadius={70} dataKey="value" paddingAngle={2}>
                    {stateDistribution.map((entry) => (
                      <Cell key={entry.name} fill={STATE_COLORS[entry.name as StressState]} opacity={0.85} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload || !payload.length || !payload[0]) return null;
                      const d = payload[0];
                      return (
                        <div className="bg-card border border-border rounded shadow p-2 text-[12px]">
                          <p className="font-medium">{String(d.name)}</p>
                          <p className="text-muted-foreground">{String(d.value)} borrowers</p>
                        </div>
                      );
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2">
                {stateDistribution.map((s) => (
                  <div key={s.name} className="flex items-center gap-2 text-[12px]">
                    <div className="h-3 w-3 rounded-full" style={{ background: STATE_COLORS[s.name as StressState] }} />
                    <span className="text-muted-foreground">{s.name}</span>
                    <span className="font-semibold ml-auto">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RSI distribution bar */}
          <div className="bg-card border border-border rounded-lg p-4">
            <h2 className="text-[14px] font-semibold text-foreground mb-3">RSI distribution</h2>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={rsiDistData} margin={{ top: 0, right: 8, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="range" tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }} axisLine={false} tickLine={false} width={30} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (!active || !payload?.length) return null;
                    return (
                      <div className="bg-card border border-border rounded shadow p-2 text-[12px]">
                        <p className="font-medium">RSI {label}</p>
                        <p className="text-muted-foreground">{String(payload[0]?.value)} borrowers</p>
                      </div>
                    );
                  }}
                />
                <Bar dataKey="count" name="Borrowers" fill="var(--color-cfc-amber)" fillOpacity={0.75} radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Structuring rules */}
          <div className="bg-card border border-border rounded-lg p-4">
            <h2 className="text-[14px] font-semibold text-foreground mb-3">Structuring rules</h2>
            <div className="space-y-2">
              {Object.entries(state.modelConfig.rules).map(([state_, plans]) => (
                <div key={state_} className="flex items-center gap-3 text-[12px]">
                  <span className="w-36 font-medium text-foreground shrink-0">{state_}</span>
                  <div className="flex flex-wrap gap-1">
                    {plans.map((p) => (
                      <span key={p} className="bg-muted border border-border px-2 py-0.5 rounded text-[11px] text-muted-foreground">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
