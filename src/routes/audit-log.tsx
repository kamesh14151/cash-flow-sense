import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useApp } from "../lib/store";
import { AppShell } from "../components/layout/AppShell";
import { StressStateBadge } from "../components/shared/StressStateBadge";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../components/ui/sheet";
import { ClipboardList, ChevronRight, Shield } from "lucide-react";
import type { AuditEvent } from "../lib/types";

export const Route = createFileRoute("/audit-log")({
  component: AuditLogPage,
});

function AuditLogPage() {
  const { state } = useApp();
  const [selected, setSelected] = useState<AuditEvent | null>(null);

  const actionColor = {
    Approved: "text-success",
    Modified: "text-warning",
    Rejected: "text-danger",
  } as const;

  return (
    <AppShell>
      <div className="mb-5 flex items-center gap-3">
        <div className="h-8 w-8 rounded bg-foreground/5 flex items-center justify-center">
          <Shield className="h-4 w-4 text-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Audit Log</h1>
          <p className="text-[13px] text-muted-foreground">
            Immutable record of all officer decisions and evidence snapshots
          </p>
        </div>
      </div>

      {state.auditLog.length === 0 ? (
        <div className="text-center py-16 bg-card border border-border rounded-lg">
          <ClipboardList className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-[15px] font-medium text-foreground">No audit events yet</p>
          <p className="text-[13px] text-muted-foreground mt-1">
            Approve or reject a plan to create the first audit record.
          </p>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {["Timestamp", "Officer", "Borrower", "Action", "Plan", "RSI", "State", "Audit ID", ""].map((h) => (
                  <th key={h} className="text-left text-[11px] text-muted-foreground font-semibold uppercase tracking-wide py-3 px-4 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {state.auditLog.map((event) => (
                <tr key={event.auditId} className="hover:bg-muted/30 cursor-pointer" onClick={() => setSelected(event)}>
                  <td className="py-3 px-4 text-muted-foreground whitespace-nowrap">
                    {new Date(event.timestamp).toLocaleString()}
                  </td>
                  <td className="py-3 px-4">{event.officerName}</td>
                  <td className="py-3 px-4">
                    <p className="font-medium text-foreground">{event.borrowerName}</p>
                    <p className="text-muted-foreground text-[11px]">{event.borrowerId}</p>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`font-semibold ${actionColor[event.action]}`}>
                      {event.action}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{event.planType}</td>
                  <td className="py-3 px-4 font-mono font-semibold">{event.rsiAtDecision}</td>
                  <td className="py-3 px-4">
                    <StressStateBadge state={event.stateAtDecision} size="sm" />
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-muted-foreground">
                    {event.auditId.slice(0, 12)}
                  </td>
                  <td className="py-3 px-4">
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Detail drawer */}
      <Sheet open={!!selected} onOpenChange={(v) => !v && setSelected(null)}>
        <SheetContent side="right" className="w-[480px] max-w-full flex flex-col p-0 overflow-y-auto">
          {selected && (
            <>
              <SheetHeader className="px-5 py-4 border-b border-border">
                <SheetTitle className="text-[15px] font-semibold">Decision snapshot</SheetTitle>
                <p className="text-[12px] text-muted-foreground">
                  {selected.auditId} · {new Date(selected.timestamp).toLocaleString()}
                </p>
              </SheetHeader>

              <div className="flex-1 p-5 space-y-4 overflow-y-auto">
                {/* Integrity notice */}
                <div className="bg-muted/50 border border-border rounded px-3 py-2.5 text-[11px] text-muted-foreground">
                  <p className="font-semibold text-foreground mb-0.5">Decision snapshot</p>
                  Evidence shown at decision time · Configuration at decision time · Immutable record
                </div>

                {/* Core details */}
                <div className="grid grid-cols-2 gap-2 text-[12px]">
                  {[
                    { label: "Decision", value: selected.action, bold: true },
                    { label: "Officer", value: selected.officerName },
                    { label: "Role", value: selected.role },
                    { label: "Borrower", value: selected.borrowerName },
                    { label: "Borrower ID", value: selected.borrowerId },
                    { label: "RSI at decision", value: `${selected.rsiAtDecision} / 100` },
                    { label: "State", value: selected.stateAtDecision },
                    { label: "Plan", value: selected.planType },
                    { label: "Model version", value: selected.modelVersion },
                    { label: "Config version", value: selected.configurationSnapshot?.version ?? selected.modelVersion },
                    { label: "Escalated", value: selected.escalated ? "Yes" : "No" },
                  ].map((r) => (
                    <div key={r.label} className="bg-muted/50 rounded px-2.5 py-2">
                      <p className="text-[10px] text-muted-foreground">{r.label}</p>
                      <p className={`font-medium text-foreground ${r.bold && selected.action === "Approved" ? "text-success" : r.bold && selected.action === "Rejected" ? "text-danger" : ""}`}>
                        {r.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Schedule */}
                <div>
                  <p className="text-[12px] font-semibold text-foreground mb-2">Schedule</p>
                  <div className="grid grid-cols-2 gap-2 text-[12px]">
                    <div className="border border-border rounded px-3 py-2">
                      <p className="text-[10px] text-muted-foreground mb-1">Previous</p>
                      <p className="font-mono font-medium">{selected.previousSchedule}</p>
                    </div>
                    <div className="border border-border rounded px-3 py-2">
                      <p className="text-[10px] text-muted-foreground mb-1">New</p>
                      <p className="font-mono font-medium">{selected.newSchedule}</p>
                    </div>
                  </div>
                </div>

                {/* Reason / notes */}
                {selected.reason && (
                  <div className="border border-border rounded px-3 py-2 text-[12px]">
                    <p className="text-[10px] text-muted-foreground mb-1">Reason</p>
                    <p>{selected.reason}</p>
                  </div>
                )}
                {selected.notes && (
                  <div className="border border-border rounded px-3 py-2 text-[12px]">
                    <p className="text-[10px] text-muted-foreground mb-1">Officer notes</p>
                    <p className="italic">"{selected.notes}"</p>
                  </div>
                )}

                {/* Evidence snapshot */}
                <div>
                  <p className="text-[12px] font-semibold text-foreground mb-2">
                    Evidence at decision time ({selected.evidenceSnapshot.length} items)
                  </p>
                  <div className="space-y-2">
                    {selected.evidenceSnapshot.map((e, i) => (
                      <div key={i} className="border border-border rounded px-3 py-2 text-[11px]">
                        <div className="flex justify-between mb-0.5">
                          <span className="font-medium">{e.title}</span>
                          <span className={e.direction === "supports" ? "text-danger" : "text-success"}>
                            {e.direction === "supports" ? "↑ Stress" : "↓ Counter"}
                          </span>
                        </div>
                        <p className="text-muted-foreground">{e.statement}</p>
                        <p className="text-muted-foreground/60 mt-0.5">Source: {e.source}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </AppShell>
  );
}
