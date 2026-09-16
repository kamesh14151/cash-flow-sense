import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "../components/layout/AppShell";
import { Settings, Bell, Lock, Building2, User } from "lucide-react";
import { useApp } from "../lib/store";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const { state } = useApp();

  return (
    <AppShell>
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-[13px] text-muted-foreground mt-0.5">
          Application and profile preferences
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-3xl">
        {/* Profile */}
        <div className="bg-card border border-border rounded-lg p-5">
          <div className="flex items-center gap-2 mb-4">
            <User className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-[14px] font-semibold text-foreground">Profile</h2>
          </div>
          <div className="space-y-3 text-[13px]">
            {[
              { label: "Name", value: state.currentUser.name },
              { label: "Role", value: state.currentUser.role },
              { label: "Branch", value: state.currentUser.branch },
              { label: "Username", value: "priya.sharma" },
            ].map((r) => (
              <div key={r.label} className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">{r.label}</span>
                <span className="font-medium text-foreground">{r.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Permissions */}
        <div className="bg-card border border-border rounded-lg p-5">
          <div className="flex items-center gap-2 mb-4">
            <Lock className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-[14px] font-semibold text-foreground">Permissions</h2>
          </div>
          <div className="space-y-2 text-[12px]">
            {[
              { label: "Review recommendations", allowed: true },
              { label: "Modify plan values", allowed: true },
              { label: "Approve plans", allowed: true },
              { label: "Reject plans", allowed: true },
              { label: "View audit log", allowed: true },
              { label: "Configure model", allowed: false },
              { label: "Execute loan changes", allowed: false, note: "Never automatic" },
            ].map((p) => (
              <div key={p.label} className="flex items-center justify-between py-1.5 border-b border-border last:border-b-0">
                <span className="text-muted-foreground">{p.label}</span>
                <div className="flex items-center gap-2">
                  {p.note && <span className="text-[10px] text-danger">{p.note}</span>}
                  <span className={p.allowed ? "text-success font-medium" : "text-muted-foreground/50"}>
                    {p.allowed ? "✓ Allowed" : "✗"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-card border border-border rounded-lg p-5">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-[14px] font-semibold text-foreground">Notifications</h2>
          </div>
          <div className="space-y-3">
            {[
              { label: "Structural decline alerts", id: "notif-decline" },
              { label: "Plan awaiting review", id: "notif-plan" },
              { label: "Forecast recalibration", id: "notif-forecast" },
              { label: "Data ingestion complete", id: "notif-ingest" },
            ].map((n) => (
              <div key={n.id} className="flex items-center justify-between">
                <Label htmlFor={n.id} className="text-[13px] text-foreground cursor-pointer">{n.label}</Label>
                <Switch id={n.id} defaultChecked />
              </div>
            ))}
          </div>
        </div>

        {/* System */}
        <div className="bg-card border border-border rounded-lg p-5">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-[14px] font-semibold text-foreground">System</h2>
          </div>
          <div className="space-y-2 text-[12px]">
            {[
              { label: "Model version", value: state.modelConfig.version },
              { label: "Borrower count", value: String(state.borrowers.length) },
              { label: "Decisions recorded", value: String(state.auditLog.length) },
              { label: "Monitoring cycles", value: String(state.monitoringCycle) },
              { label: "Branch", value: "Salem Central Branch" },
              { label: "Prototype", value: "v1.0 · 2026" },
            ].map((r) => (
              <div key={r.label} className="flex justify-between py-1.5 border-b border-border last:border-b-0">
                <span className="text-muted-foreground">{r.label}</span>
                <span className="font-mono text-foreground">{r.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
