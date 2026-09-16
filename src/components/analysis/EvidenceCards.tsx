import { ArrowUp, ArrowDown, Minus } from "lucide-react";
import type { Evidence } from "../../lib/types";
import { cn } from "../../lib/utils";

interface Props {
  evidence: Evidence[];
}

const COMPONENT_LABELS: Record<string, string> = {
  CBR: "Cash Buffer Ratio",
  RV: "Residual Volatility",
  TM: "Trend Momentum",
  RTR: "Repayment Track Record",
  USD: "Unexplained Seasonal Deviation",
  ESI: "Expense Shock Index",
};

export function EvidenceCards({ evidence }: Props) {
  return (
    <div className="space-y-4">
      <div className="border-b border-border pb-3">
        <h3 className="text-[14px] font-bold text-foreground">
          Why the system reached this conclusion
        </h3>
        <p className="text-[12px] text-muted-foreground mt-0.5">
          Review the evidence before making a decision.
        </p>
      </div>

      <div className="space-y-3">
        {evidence.map((e, i) => {
          const isSupports = e.direction === "supports";
          const Icon = isSupports ? ArrowUp : ArrowDown;
          const dirColor = isSupports ? "text-danger" : "text-success";
          const dirBg = isSupports ? "bg-danger/8" : "bg-success/8";
          const dirBorder = isSupports ? "border-danger/20 bg-danger/2" : "border-success/20 bg-success/2";

          return (
            <div
              key={i}
              className={cn(
                "border rounded-lg p-4 space-y-2 bg-card",
                dirBorder,
              )}
            >
              <div className="flex items-start gap-3">
                <div className={cn("h-7 w-7 rounded-full flex items-center justify-center shrink-0 mt-0.5", dirBg)}>
                  <Icon className={cn("h-3.5 w-3.5", dirColor)} aria-hidden />
                </div>
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div>
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                        SIGNAL
                      </span>
                      <p className="text-[13px] font-bold text-foreground">{e.title}</p>
                    </div>
                    <span
                      className={cn(
                        "text-[11px] font-semibold px-2 py-0.5 rounded",
                        isSupports
                          ? "bg-danger/10 text-danger border border-danger/20"
                          : "bg-success/10 text-success border border-success/20",
                      )}
                    >
                      {isSupports ? "↑ Raises Stress" : "↓ Counters Stress"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 bg-muted/40 rounded p-2 text-[12px]">
                    <div>
                      <span className="text-[10px] text-muted-foreground block">VALUE</span>
                      <span className="font-mono font-bold text-foreground">{e.value}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-muted-foreground block">WEIGHT IMPACT</span>
                      <span className="font-mono font-semibold text-foreground">
                        +{e.contribution.toFixed(1)} pts ({COMPONENT_LABELS[e.component] ?? e.component})
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-0.5">
                      INTERPRETATION
                    </span>
                    <p className="text-[12px] text-foreground/90 leading-relaxed">
                      {e.statement}
                    </p>
                  </div>

                  <p className="text-[11px] text-muted-foreground/70 border-t border-border pt-1.5 mt-1">
                    Telemetry Source: {e.source}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
