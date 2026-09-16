import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { useApp } from "../lib/store";
import { AppShell } from "../components/layout/AppShell";
import { forecastCashFlow, decomposeCashFlow, inr } from "../lib/engine";
import { DEMO_BORROWERS } from "../lib/data";
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { DecompositionChart } from "../components/analysis/DecompositionChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

export const Route = createFileRoute("/forecasts")({
  component: ForecastsPage,
});

function ForecastsPage() {
  const { state } = useApp();

  const demoForecasts = useMemo(() => {
    return DEMO_BORROWERS.map((b) => {
      const a = state.analyses[b.id];
      const forecast = a ? a.forecast : forecastCashFlow(b, 6);
      const decomp = a ? a.decomposition : decomposeCashFlow(b);
      const history = b.history.slice(-6).map((p) => ({
        period: p.label,
        actual: p.income,
        lower: undefined as number | undefined,
        upper: undefined as number | undefined,
        forecast: undefined as number | undefined,
      }));
      const forecastData = forecast.map((f) => ({
        period: f.period,
        actual: undefined as number | undefined,
        forecast: f.pointEstimate,
        lower: f.lowerBound,
        upper: f.upperBound,
      }));
      return { borrower: b, data: [...history, ...forecastData], decomp, analysis: a };
    });
  }, [state.analyses]);

  return (
    <AppShell>
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-foreground">Forecasts</h1>
        <p className="text-[13px] text-muted-foreground mt-0.5">
          STL + Prophet · 3-period forward horizon · {state.borrowers.length} borrowers
        </p>
      </div>

      {/* Coverage stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {[
          { label: "Forecast coverage", value: `${Object.keys(state.analyses).length}/${state.borrowers.length}` },
          { label: "Model", value: "STL + Prophet" },
          { label: "Horizon", value: "3 months" },
          { label: "Avg confidence", value: `${Math.round(Object.values(state.analyses).reduce((s, a) => s + a.forecastConfidence, 0) / Math.max(1, Object.values(state.analyses).length))}%` },
        ].map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-lg p-3 sm:p-4">
            <p className="text-[10px] sm:text-[11px] text-muted-foreground uppercase tracking-wide truncate">{s.label}</p>
            <p className="text-[16px] sm:text-[20px] font-bold text-foreground mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Demo borrower forecasts */}
      {demoForecasts.map(({ borrower, data, decomp, analysis }) => (
        <div key={borrower.id} className="bg-card border border-border rounded-lg mb-5">
          <div className="px-4 sm:px-5 py-3.5 sm:py-4 border-b border-border">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-[14px] sm:text-[15px] font-semibold text-foreground">{borrower.name}</h2>
                <p className="text-[11px] sm:text-[12px] text-muted-foreground">{borrower.occupation} · {borrower.id}</p>
              </div>
              {analysis && (
                <div className="sm:text-right text-[11px] sm:text-[12px]">
                  <p className="text-muted-foreground">Confidence: <span className="font-semibold text-foreground">{analysis.forecastConfidence}%</span></p>
                  <p className="text-muted-foreground">Expected inflow: <span className="font-semibold text-foreground">{inr(analysis.expectedInflow)}</span></p>
                </div>
              )}
            </div>
          </div>
          <Tabs defaultValue="forecast">
            <TabsList className="m-4 mb-0">
              <TabsTrigger value="forecast">Forecast</TabsTrigger>
              <TabsTrigger value="decomposition">Decomposition</TabsTrigger>
            </TabsList>
            <div className="p-5">
              <TabsContent value="forecast" className="mt-0">
                <ResponsiveContainer width="100%" height={220}>
                  <ComposedChart data={data} margin={{ top: 4, right: 8, bottom: 0, left: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                    <XAxis dataKey="period" tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} width={44} />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (!active || !payload?.length) return null;
                        return (
                          <div className="bg-card border border-border rounded shadow p-2 text-[12px]">
                            <p className="font-medium mb-1">{label}</p>
                            {payload.filter((p) => p.value !== undefined).map((p) => (
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
                    <Area dataKey="upper" stroke="none" fill="var(--color-cfc-amber)" fillOpacity={0.1} name="upper band" legendType="none" />
                    <Area dataKey="lower" stroke="none" fill="var(--color-background)" fillOpacity={1} name="lower band" legendType="none" />
                    <Line dataKey="actual" stroke="var(--color-foreground)" strokeWidth={2} dot={false} name="Actual" />
                    <Line dataKey="forecast" stroke="var(--color-cfc-amber)" strokeWidth={2} strokeDasharray="5 3" dot={false} name="Forecast" />
                  </ComposedChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="decomposition" className="mt-0">
                {analysis && <DecompositionChart decomposition={decomp} seasonalMatch={analysis.seasonalMatch} />}
              </TabsContent>
            </div>
          </Tabs>
        </div>
      ))}
    </AppShell>
  );
}
