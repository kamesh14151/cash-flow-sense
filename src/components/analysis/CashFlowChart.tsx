import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { useState, useMemo } from "react";
import type { Analysis } from "../../lib/types";
import { inr } from "../../lib/engine";

interface Props {
  analysis: Analysis;
}

type Horizon = "6M" | "12M" | "18M";

export function CashFlowChart({ analysis }: Props) {
  const [horizon, setHorizon] = useState<Horizon>("12M");

  const data = useMemo(() => {
    const historyCount = horizon === "6M" ? 6 : horizon === "12M" ? 12 : 18;
    const history = analysis.borrower.history.slice(-historyCount).map((p) => ({
      period: p.label,
      income: p.income,
      expense: p.expense,
      repayment: p.repayment,
      net: p.income - p.expense - p.repayment,
      type: "actual" as const,
      lower: undefined as number | undefined,
      upper: undefined as number | undefined,
    }));

    const forecast = analysis.forecast.map((f) => ({
      period: f.period,
      income: f.pointEstimate,
      expense: analysis.expectedExpense,
      repayment: analysis.borrower.loan.installment,
      net: f.pointEstimate - analysis.expectedExpense - analysis.borrower.loan.installment,
      type: "forecast" as const,
      lower: f.lowerBound,
      upper: f.upperBound,
    }));

    return [...history, ...forecast];
  }, [analysis, horizon]);

  const lastActualIdx = data.filter((d) => d.type === "actual").length - 1;
  const splitPeriod = data[lastActualIdx]?.period;

  return (
    <div className="space-y-3">
      {/* Chart Question & Horizon controls */}
      <div className="flex items-center justify-between pb-1">
        <div>
          <p className="text-[11px] font-semibold text-cfc-amber uppercase tracking-wider">
            Baseline Outlook
          </p>
          <p className="text-[13px] font-medium text-foreground">
            What happens to the borrower&apos;s cash flow if nothing changes?
          </p>
        </div>
        <div className="flex gap-1">
          {(["6M", "12M", "18M"] as Horizon[]).map((h) => (
            <button
              key={h}
              onClick={() => setHorizon(h)}
              className={`px-3 py-1 text-[12px] font-medium rounded border transition-colors ${
                horizon === h
                  ? "bg-foreground text-background border-foreground"
                  : "bg-transparent text-muted-foreground border-border hover:border-foreground/30"
              }`}
            >
              {h}
            </button>
          ))}
        </div>
      </div>

      {/* Legend bar */}
      <div className="flex items-center gap-4 text-[11px] text-muted-foreground bg-muted/40 px-3 py-2 rounded border border-border flex-wrap">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-5 h-0.5 bg-foreground" />
          Actual
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-5 h-0.5 border-t-2 border-dashed border-cfc-amber" />
          Forecast
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-5 h-2 bg-cfc-amber/20 rounded" />
          Confidence band
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-5 h-0.5 bg-danger opacity-70" />
          Expenses
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-5 h-0.5 bg-warning opacity-70" />
          Repayment
        </span>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={290}>
        <ComposedChart data={data} margin={{ top: 18, right: 8, bottom: 0, left: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
          <XAxis
            dataKey="period"
            tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            width={48}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (!active || !payload?.length) return null;
              const entry = data.find((d) => d.period === label);
              return (
                <div className="bg-card border border-border rounded shadow-md p-3 text-[12px] min-w-[160px]">
                  <p className="font-semibold text-foreground mb-2">{label}</p>
                  {payload.map((p) => (
                    <div key={p.name} className="flex justify-between gap-4">
                      <span className="text-muted-foreground capitalize">{p.name}</span>
                      <span className="font-medium" style={{ color: p.color }}>
                        {inr(Number(p.value))}
                      </span>
                    </div>
                  ))}
                  {entry?.type === "forecast" && (
                    <p className="mt-2 text-[11px] text-muted-foreground border-t border-border pt-2">
                      Band: {inr(entry.lower ?? 0)} – {inr(entry.upper ?? 0)}
                    </p>
                  )}
                </div>
              );
            }}
          />

          {/* Forecast confidence band */}
          <Area
            dataKey="upper"
            stroke="none"
            fill="var(--color-cfc-amber)"
            fillOpacity={0.08}
            name="upper"
            legendType="none"
          />
          <Area
            dataKey="lower"
            stroke="none"
            fill="var(--color-background)"
            fillOpacity={1}
            name="lower"
            legendType="none"
          />

          {/* Income */}
          <Line
            dataKey="income"
            name="income"
            stroke="var(--color-foreground)"
            strokeWidth={2}
            dot={false}
            strokeDasharray={(d: { type: string }) => (d.type === "forecast" ? "5 3" : undefined)}
          />
          {/* Expenses */}
          <Line
            dataKey="expense"
            name="expense"
            stroke="var(--color-danger)"
            strokeWidth={1.5}
            strokeOpacity={0.7}
            dot={false}
          />
          {/* Repayment obligation */}
          <Line
            dataKey="repayment"
            name="repayment"
            stroke="var(--color-warning)"
            strokeWidth={1.5}
            strokeOpacity={0.7}
            dot={false}
          />
          {/* Net cash flow */}
          <Line
            dataKey="net"
            name="net cash"
            stroke="var(--color-success)"
            strokeWidth={1.5}
            strokeOpacity={0.8}
            dot={false}
            strokeDasharray="4 2"
          />

          {splitPeriod && (
            <ReferenceLine
              x={splitPeriod}
              stroke="var(--color-foreground)"
              strokeDasharray="3 3"
              label={{
                value: "TODAY",
                position: "top",
                fontSize: 10,
                fontWeight: "bold",
                fill: "var(--color-foreground)",
              }}
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>

      {/* WHAT THE FORECAST SAYS Section */}
      <div className="border border-border rounded-lg p-4 bg-muted/20 space-y-3 mt-3">
        <div>
          <span className="text-[10px] font-bold text-cfc-amber uppercase tracking-wider">
            WHAT THE FORECAST SAYS
          </span>
          <p className="text-[13px] font-medium text-foreground mt-0.5">
            {analysis.state === "Seasonal Dip"
              ? "Projected cash flow remains pressured, but the decline is consistent with the borrower's historical seasonal pattern."
              : analysis.state === "Structural Decline"
                ? "Projected cash flow is negative under current installment obligations due to structural decline in earnings."
                : analysis.state === "Emerging Stress"
                  ? "Projected cash flow buffer is narrowing due to recent expense growth and income variance."
                  : "Projected cash flow provides adequate buffer for current loan obligations."}
          </p>
        </div>

        {/* 4 Summary Metrics */}
        <div className="grid grid-cols-4 gap-3">
          <div className="bg-card border border-border rounded p-3">
            <p className="text-[11px] text-muted-foreground">Expected inflow</p>
            <p className="text-[15px] font-semibold text-foreground mt-0.5">
              {inr(analysis.expectedInflow)}
            </p>
          </div>
          <div className="bg-card border border-border rounded p-3">
            <p className="text-[11px] text-muted-foreground">Expected expenses</p>
            <p className="text-[15px] font-semibold text-danger mt-0.5">
              {inr(analysis.expectedExpense)}
            </p>
          </div>
          <div className="bg-card border border-border rounded p-3">
            <p className="text-[11px] text-muted-foreground">Repayment obligation</p>
            <p className="text-[15px] font-semibold text-warning mt-0.5">
              {inr(analysis.borrower.loan.installment)}
            </p>
          </div>
          <div className="bg-card border border-border rounded p-3">
            <p className="text-[11px] text-muted-foreground">Projected buffer</p>
            <p
              className={`text-[15px] font-semibold mt-0.5 ${
                analysis.cashBuffer >= 0 ? "text-success" : "text-danger"
              }`}
            >
              {inr(analysis.cashBuffer)}
            </p>
          </div>
        </div>

        {/* Forecast confidence bar */}
        <div className="flex items-center gap-2 text-[12px] text-muted-foreground pt-1">
          <span>Forecast confidence:</span>
          <span className="font-semibold text-foreground">{analysis.forecastConfidence}%</span>
          <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-cfc-amber rounded-full"
              style={{ width: `${analysis.forecastConfidence}%` }}
            />
          </div>
          <span className="text-[11px] font-mono">STL + Prophet Engine</span>
        </div>
      </div>
    </div>
  );
}
