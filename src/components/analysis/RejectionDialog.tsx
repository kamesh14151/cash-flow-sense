import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "../ui/alert-dialog";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import type { Analysis, RepaymentPlanOption } from "../../lib/types";
import { cn } from "../../lib/utils";

interface Props {
  open: boolean;
  onClose: () => void;
  analysis: Analysis;
  plan: RepaymentPlanOption;
  onConfirm: (reason: string, notes: string) => void;
}

const REJECTION_REASONS = [
  "Plan not affordable for the borrower",
  "Insufficient evidence for restructuring",
  "Borrower prefers current schedule",
  "Needs branch manager review",
  "Requires further verification",
  "Other",
];

export function RejectionDialog({ open, onClose, analysis, plan, onConfirm }: Props) {
  const [selectedReason, setSelectedReason] = useState("");
  const [notes, setNotes] = useState("");
  const canConfirm = selectedReason !== "";

  return (
    <AlertDialog open={open} onOpenChange={(v) => !v && onClose()}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-[16px]">Reject recommendation</AlertDialogTitle>
        </AlertDialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <p className="text-[13px] font-medium text-foreground mb-1">
              {analysis.borrower.name} · {plan.type}
            </p>
            <p className="text-[12px] text-muted-foreground">
              Rejecting this recommendation will create an audit record. The current loan schedule
              will remain unchanged.
            </p>
          </div>

          <div className="space-y-2">
            <Label className="text-[12px] font-medium">Reason for rejection *</Label>
            <div className="space-y-1.5">
              {REJECTION_REASONS.map((r) => (
                <button
                  key={r}
                  onClick={() => setSelectedReason(r)}
                  className={cn(
                    "w-full text-left text-[13px] px-3 py-2 rounded border transition-colors",
                    selectedReason === r
                      ? "border-danger/40 bg-danger/8 text-danger"
                      : "border-border hover:border-border/80 hover:bg-muted/50",
                  )}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="rejection-notes" className="text-[12px]">
              Additional notes (optional)
            </Label>
            <Textarea
              id="rejection-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add context or instructions for follow-up…"
              rows={3}
              className="text-[13px]"
            />
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel className="text-[13px]">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => canConfirm && onConfirm(selectedReason, notes)}
            disabled={!canConfirm}
            className="bg-danger text-white hover:bg-danger/90 text-[13px] disabled:opacity-50"
          >
            Confirm rejection
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
