import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "../ui/alert-dialog";
import type { Analysis, RepaymentPlanOption } from "../../lib/types";
import { inr } from "../../lib/engine";

interface Props {
  open: boolean;
  onClose: () => void;
  analysis: Analysis;
  plan: RepaymentPlanOption;
  notes: string;
  onConfirm: () => void;
}

export function ApprovalDialog({ open, onClose, analysis, plan, notes, onConfirm }: Props) {
  const borrower = analysis.borrower;
  const loan = borrower.loan;
  const now = new Date();

  return (
    <AlertDialog open={open} onOpenChange={(v) => !v && onClose()}>
      <AlertDialogContent className="max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-[16px]">Confirm plan approval</AlertDialogTitle>
        </AlertDialogHeader>

        <div className="space-y-3 py-2">
          {/* Summary rows */}
          <div className="grid grid-cols-2 gap-2 text-[12px]">
            {[
              { label: "Borrower", value: borrower.name },
              { label: "Borrower ID", value: borrower.id },
              { label: "Selected plan", value: plan.type },
              { label: "RSI at decision", value: `${analysis.rsi.value} / 100` },
              { label: "State", value: analysis.state },
              { label: "Seasonal match", value: `${analysis.seasonalMatch}%` },
              { label: "Officer", value: "Priya Sharma" },
              { label: "Timestamp", value: now.toLocaleString() },
            ].map((r) => (
              <div key={r.label} className="bg-muted/50 rounded px-2.5 py-2">
                <p className="text-[10px] text-muted-foreground">{r.label}</p>
                <p className="font-medium text-foreground">{r.value}</p>
              </div>
            ))}
          </div>

          {/* Schedule comparison & Projected buffer */}
          <div className="grid grid-cols-3 gap-2 text-[12px]">
            <div className="border border-border rounded px-3 py-2">
              <p className="text-[10px] text-muted-foreground mb-1">Current schedule</p>
              <p className="font-semibold">{inr(loan.installment)} × {loan.remainingPeriods}m</p>
            </div>
            <div className="border border-cfc-amber/40 bg-cfc-amber/5 rounded px-3 py-2">
              <p className="text-[10px] text-muted-foreground mb-1">Proposed schedule</p>
              <p className="font-semibold text-cfc-amber">{plan.schedule}</p>
            </div>
            <div className="border border-border rounded px-3 py-2">
              <p className="text-[10px] text-muted-foreground mb-1">Projected buffer</p>
              <p className="font-semibold text-success">{inr(plan.projectedBuffer)}/m</p>
            </div>
          </div>

          {/* Evidence summary */}
          <div className="bg-muted/30 border border-border rounded px-3 py-2 text-[11px] space-y-1">
            <p className="font-semibold text-foreground">Evidence summary ({analysis.evidence.length} signals)</p>
            <p className="text-muted-foreground leading-tight">
              {analysis.evidence.map((e) => `${e.title}: ${e.value}`).join(" · ")}
            </p>
          </div>

          {notes && (
            <div className="bg-muted/50 rounded px-3 py-2 text-[12px]">
              <p className="text-[10px] text-muted-foreground mb-1">Officer notes</p>
              <p className="text-foreground italic">&ldquo;{notes}&rdquo;</p>
            </div>
          )}

          {/* Critical disclaimer */}
          <div className="border border-warning/30 bg-warning/8 rounded px-3 py-2.5 text-[12px]">
            <p className="font-semibold text-warning mb-1">⚠ Important</p>
            <p className="text-muted-foreground">
              This records the officer's decision. The prototype does not automatically execute
              a loan-system change. The decision and evidence snapshot will be saved to the audit log.
            </p>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel className="text-[13px]">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-success text-white hover:bg-success/90 text-[13px]"
          >
            Confirm approval
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
