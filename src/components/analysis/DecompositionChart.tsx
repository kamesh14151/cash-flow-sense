import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { DecompositionResult } from "../../lib/types";
import { inr } from "../../lib/engine";

interface Props {
  decomposition: DecompositionResult;
  seasonalMatch: number;
}

export function DecompositionChart({ decomposition, seasonalMatch }: Props) {
  const data = decomposition.points.slice(-12);

  const matchMsg =
    seasonalMatch >= 70
      ? `The current income decline closely matches this borrower's historical seasonal pattern (${seasonalMatch}% alignment).`
      : seasonalMatch >= 45
        ? `Partial seasonal alignment detected. Some unexplained residual deviation present (${seasonalMatch}% match).`
        : `The current decline does not closely match historical seasonal behavior. Structural factors likely driving income reduction (${seasonalMatch}% seasonal match).`;

  const matchColor = seasonalMatch >= 70 ? "text-info" : seasonalMatch >= 45 ? "text-warning" : "text-danger";

  return (
    <div className="space-y-4">
      {/* 3 Columns: TREND / SEASONAL / RESIDUAL */}
      <div className="grid grid-cols-3 gap-3">
        {/* Column 1: TREND */}
        <div
          className={`border rounded-lg p-3.5 ${
            decomposition.trendDirection === "Declining" && seasonalMatch < 50
              ? "border-danger/40 bg-danger/5 shadow-sm"
              : "border-border bg-card"
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              TREND
            </span>
            {decomposition.trendDirection === "Declining" && seasonalMatch < 50 && (
              <span className="text-[10px] font-bold text-danger bg-danger/10 px-1.5 py-0.5 rounded">
                DOMINANT DRIVER
              </span>
            )}
          </div>
          <p className="text-[14px] font-bold text-foreground">
            {decomposition.trendDirection}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
            What is happening to the underlying income trajectory?
          </p>
          <p className="text-[11px] text-muted-foreground font-mono mt-2 pt-2 border-t border-border">
            Baseline: {decomposition.confidence} confidence
          </p>
        </div>

        {/* Column 2: SEASONAL */}
        <div
          className={`border rounded-lg p-3.5 ${
            seasonalMatch >= 70
              ? "border-info/40 bg-info/5 shadow-sm"
              : "border-border bg-card"
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              SEASONAL
            </span>
            {seasonalMatch >= 70 && (
              <span className="text-[10px] font-bold text-info bg-info/10 px-1.5 py-0.5 rounded">
                DOMINANT DRIVER
              </span>
            )}
          </div>
          <p className="text-[14px] font-bold text-foreground">
            {seasonalMatch}% Match
          </p>
          <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
            How much of the change matches historical seasonality?
          </p>
          <p className="text-[11px] text-muted-foreground font-mono mt-2 pt-2 border-t border-border">
            {seasonalMatch >= 70 ? "Strong seasonal dip pattern" : "Low seasonal correlation"}
          </p>
        </div>

        {/* Column 3: RESIDUAL */}
        <div className="border border-border bg-card rounded-lg p-3.5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              RESIDUAL
            </span>
          </div>
          <p className="text-[14px] font-bold text-foreground font-mono">
            {decomposition.residualVolatility.toFixed(3)}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
            How much remains unexplained by trend & seasonality?
          </p>
          <p className="text-[11px] text-muted-foreground font-mono mt-2 pt-2 border-t border-border">
            Residual noise index
          </p>
        </div>
      </div>

      {/* Observed vs trend */}
      <div>
        <p className="text-[12px] font-medium text-muted-foreground mb-2 uppercase tracking-wide">
          Observed vs Trend
        </p>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={data} margin={{ top: 0, right: 8, bottom: 0, left: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} width={40} />
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
            <Bar dataKey="observed" name="Observed" fill="var(--color-foreground)" fillOpacity={0.85} radius={[2, 2, 0, 0]} />
            <Bar dataKey="trend" name="Trend" fill="var(--color-cfc-amber)" fillOpacity={0.7} radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Seasonal & residual */}
      <div>
        <p className="text-[12px] font-medium text-muted-foreground mb-2 uppercase tracking-wide">
          Seasonal Component & Residual
        </p>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={data} margin={{ top: 0, right: 8, bottom: 0, left: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} width={40} />
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
            <Bar dataKey="seasonal" name="Seasonal" fill="var(--color-info)" fillOpacity={0.7} radius={[2, 2, 0, 0]} />
            <Bar dataKey="residual" name="Residual" fill="var(--color-muted-foreground)" fillOpacity={0.5} radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
