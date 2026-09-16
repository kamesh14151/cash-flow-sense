import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

interface Props {
  history: { cycle: string; value: number }[];
}

export function RSIHistory({ history }: Props) {
  const maxVal = Math.max(...history.map((h) => h.value), 100);

  return (
    <ResponsiveContainer width="100%" height={160}>
      <LineChart data={history} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
        <XAxis
          dataKey="cycle"
          tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          domain={[0, Math.max(maxVal, 100)]}
          tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }}
          axisLine={false}
          tickLine={false}
          width={28}
        />
        <Tooltip
          content={({ active, payload, label }) => {
            if (!active || !payload?.length) return null;
            const v = Number(payload[0]?.value ?? 0);
            const stateLabel =
              v <= 30 ? "Stable" : v <= 50 ? "Seasonal Dip" : v <= 70 ? "Emerging Stress" : "Structural Decline";
            const stateColor =
              v <= 30
                ? "var(--color-success)"
                : v <= 50
                  ? "var(--color-info)"
                  : v <= 70
                    ? "var(--color-warning)"
                    : "var(--color-danger)";
            return (
              <div className="bg-card border border-border rounded shadow p-2 text-[12px]">
                <p className="text-muted-foreground mb-1">{label}</p>
                <p className="font-semibold" style={{ color: stateColor }}>
                  RSI {v} — {stateLabel}
                </p>
              </div>
            );
          }}
        />
        {/* Threshold zones */}
        <ReferenceLine y={30} stroke="var(--color-success)" strokeDasharray="3 3" strokeOpacity={0.4} />
        <ReferenceLine y={50} stroke="var(--color-info)" strokeDasharray="3 3" strokeOpacity={0.4} />
        <ReferenceLine y={70} stroke="var(--color-warning)" strokeDasharray="3 3" strokeOpacity={0.4} />

        <Line
          dataKey="value"
          stroke="var(--color-cfc-amber)"
          strokeWidth={2}
          dot={{ fill: "var(--color-cfc-amber)", r: 4, strokeWidth: 0 }}
          activeDot={{ r: 6, fill: "var(--color-cfc-amber)" }}
          name="RSI"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
