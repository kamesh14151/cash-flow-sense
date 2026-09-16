import type { RSIScore } from "../../lib/types";
import { cn } from "../../lib/utils";

interface Props {
  rsi: RSIScore;
}

const COMPONENT_META: Record<
  string,
  { label: string; description: string; maxWeight: number }
> = {
  CBR: {
    label: "Cash Buffer Ratio",
    description: "Projected inflow minus expenses and repayment obligation, relative to installment.",
    maxWeight: 25,
  },
  RV: {
    label: "Residual Volatility",
    description: "Unexplained income variance after removing trend and seasonal components.",
    maxWeight: 15,
  },
  TM: {
    label: "Trend Momentum",
    description: "Direction and strength of the six-period income trend slope.",
    maxWeight: 20,
  },
  RTR: {
    label: "Repayment Track Record",
    description: "Proportion of scheduled repayments made on time in the last 12 periods.",
    maxWeight: 15,
  },
  USD: {
    label: "Unexplained Seasonal Deviation",
    description: "Degree to which income decline is not explained by the learned seasonal profile.",
    maxWeight: 15,
  },
  ESI: {
    label: "Expense Shock Index",
    description: "Recent increase in expense-to-income ratio versus 6-period baseline.",
    maxWeight: 10,
  },
};

export function RSIComponents({ rsi }: Props) {
  const components = rsi.components;

  return (
    <div className="space-y-4">
      <div className="border-b border-border pb-2">
        <h4 className="text-[12px] font-bold text-cfc-amber uppercase tracking-wider">
          WHY THIS SCORE?
        </h4>
        <p className="text-[12px] text-muted-foreground mt-0.5">
          Six model feature components contributing to the Repayment Stress Index score of {rsi.value}.
        </p>
      </div>

      <div className="space-y-3">
        {(Object.entries(components) as [string, number][]).map(([key, value]) => {
          const meta = COMPONENT_META[key];
          if (!meta) return null;
          const pct = (value / meta.maxWeight) * 100;
          const severity = pct > 75 ? "bg-danger text-white" : pct > 40 ? "bg-warning text-white" : "bg-success text-white";

          return (
            <div key={key} className="bg-card border border-border rounded-lg p-3 space-y-1.5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[13px] font-semibold text-foreground">{meta.label}</span>
                  <span className="ml-2 text-[11px] font-mono text-muted-foreground">({key})</span>
                </div>
                <div className="text-right flex items-center gap-2">
                  <span className="text-[11px] text-muted-foreground font-mono">
                    Weight: {meta.maxWeight} pts
                  </span>
                  <span className="text-[12px] font-bold font-mono px-2 py-0.5 rounded bg-muted/80 text-foreground">
                    +{value.toFixed(1)} pts
                  </span>
                </div>
              </div>
              <div className="h-1.5 bg-border rounded-full overflow-hidden">
                <div
                  className={cn("h-full rounded-full transition-all", severity.split(" ")[0])}
                  style={{ width: `${Math.min(100, pct)}%` }}
                />
              </div>
              <p className="text-[12px] text-muted-foreground leading-relaxed pt-0.5">
                {meta.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
