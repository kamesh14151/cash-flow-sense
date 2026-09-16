import { useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { cn } from "../../lib/utils";
import { slugFor } from "../../lib/data";
import type { Borrower } from "../../lib/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { StressStateBadge } from "../shared/StressStateBadge";
import { ArrowRight, Layers } from "lucide-react";

interface ScenarioOption {
  borrower: Borrower;
  rsi: number;
  state: string;
  seasonalMatch: number;
}

interface Props {
  current: Borrower;
  options: ScenarioOption[];
}

export function ScenarioSwitcher({ current, options }: Props) {
  const router = useRouter();
  const [compareOpen, setCompareOpen] = useState(false);

  return (
    <>
      <div className="bg-card border border-border rounded-lg p-3 space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">
            DEMO SCENARIO
          </p>
          <span className="text-[10px] text-cfc-amber bg-cfc-amber/10 px-1.5 py-0.5 rounded font-mono font-medium">
            Hero Pair
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {options.map((opt) => {
            const isActive = opt.borrower.id === current.id;
            const slug = slugFor(opt.borrower);
            return (
              <button
                key={opt.borrower.id}
                onClick={() => router.navigate({ to: `/borrowers/${slug}` })}
                className={cn(
                  "text-left rounded border px-3 py-2.5 transition-all",
                  isActive
                    ? "border-foreground bg-foreground/5 shadow-sm"
                    : "border-border hover:border-foreground/30 hover:bg-muted/50",
                )}
              >
                <p className="text-[12px] font-semibold text-foreground leading-tight">
                  {opt.borrower.name}
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  {opt.borrower.occupation}
                </p>
                <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                  <span className="text-[11px] font-mono font-bold text-foreground">
                    RSI {opt.rsi}
                  </span>
                  <span className="text-[10px] text-muted-foreground">·</span>
                  <span className="text-[10px] text-muted-foreground">
                    {opt.seasonalMatch}% seasonal
                  </span>
                </div>
                <p
                  className="text-[10px] font-semibold mt-1"
                  style={{
                    color:
                      opt.state === "Structural Decline"
                        ? "var(--color-danger)"
                        : opt.state === "Seasonal Dip"
                          ? "var(--color-info)"
                          : "var(--color-success)",
                  }}
                >
                  {opt.state}
                </p>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => setCompareOpen(true)}
          className="w-full text-center text-[11px] font-medium text-muted-foreground hover:text-foreground pt-1 flex items-center justify-center gap-1 transition-colors"
        >
          <Layers className="h-3 w-3" />
          Compare scenarios →
        </button>
      </div>

      {/* Presentation Comparison Modal */}
      <Dialog open={compareOpen} onOpenChange={setCompareOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-[16px] font-bold">
              Hero Scenario Comparison — Two income drops. Two different stories.
            </DialogTitle>
            <p className="text-[12px] text-muted-foreground">
              Comparing temporary seasonal dip versus permanent structural revenue decline.
            </p>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 py-3">
            {/* Meena */}
            <div className="border border-info/30 bg-info/5 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-[14px] font-bold text-foreground">Meena Krishnan</h4>
                  <p className="text-[11px] text-muted-foreground">Farmer · BR-10482</p>
                </div>
                <StressStateBadge state="Seasonal Dip" size="sm" />
              </div>

              <div className="bg-card/80 border border-border rounded p-3 space-y-1 text-[12px]">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">RSI Score:</span>
                  <span className="font-bold text-foreground">34 / 100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Seasonal Match:</span>
                  <span className="font-bold text-info">87%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Classification:</span>
                  <span className="font-semibold text-info">Seasonal Dip</span>
                </div>
              </div>

              <div className="text-[12px] text-muted-foreground space-y-1">
                <p className="font-medium text-foreground">Interpretation:</p>
                <p className="italic">
                  "Decline is strongly consistent with historical seasonality. Inflow is expected to recover after harvest lull."
                </p>
              </div>

              <div className="text-[12px] border-t border-info/20 pt-2">
                <span className="font-semibold text-foreground">System Recommendation:</span>
                <p className="text-info font-medium mt-0.5">Seasonal Step-Down Repayment</p>
              </div>

              <button
                onClick={() => {
                  setCompareOpen(false);
                  router.navigate({ to: "/borrowers/$id", params: { id: "meena" } });
                }}
                className="w-full text-[12px] bg-info text-white font-medium py-1.5 rounded flex items-center justify-center gap-1 hover:bg-info/90 transition-colors"
              >
                Analyse Meena <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Suresh */}
            <div className="border border-danger/30 bg-danger/5 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-[14px] font-bold text-foreground">Suresh Kumar</h4>
                  <p className="text-[11px] text-muted-foreground">Gig Worker · BR-10921</p>
                </div>
                <StressStateBadge state="Structural Decline" size="sm" />
              </div>

              <div className="bg-card/80 border border-border rounded p-3 space-y-1 text-[12px]">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">RSI Score:</span>
                  <span className="font-bold text-foreground">76 / 100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Seasonal Match:</span>
                  <span className="font-bold text-danger">18%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Classification:</span>
                  <span className="font-semibold text-danger">Structural Decline</span>
                </div>
              </div>

              <div className="text-[12px] text-muted-foreground space-y-1">
                <p className="font-medium text-foreground">Interpretation:</p>
                <p className="italic">
                  "Current decline is poorly explained by historical seasonality and is accompanied by a persistent negative trend."
                </p>
              </div>

              <div className="text-[12px] border-t border-danger/20 pt-2">
                <span className="font-semibold text-foreground">System Recommendation:</span>
                <p className="text-danger font-medium mt-0.5">Temporary Moratorium & Restructure</p>
              </div>

              <button
                onClick={() => {
                  setCompareOpen(false);
                  router.navigate({ to: "/borrowers/$id", params: { id: "suresh" } });
                }}
                className="w-full text-[12px] bg-danger text-white font-medium py-1.5 rounded flex items-center justify-center gap-1 hover:bg-danger/90 transition-colors"
              >
                Analyse Suresh <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
