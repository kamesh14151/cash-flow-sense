import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useEffect } from "react";
import { useApp } from "../lib/store";
import { AppShell } from "../components/layout/AppShell";
import { KPICard } from "../components/shared/KPICard";
import { StressStateBadge } from "../components/shared/StressStateBadge";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  Tooltip,
  Cell,
  PieChart,
  Pie,
  Legend,
} from "recharts";
import { analyzeBorrower } from "../lib/engine";
import { inr } from "../lib/engine";
import { slugFor, DEMO_BORROWERS } from "../lib/data";
import { formatDistanceToNow } from "date-fns";
import { Users, Briefcase, AlertTriangle, Clock, ArrowRight } from "lucide-react";
import type { StressState } from "../lib/types";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});

const STATE_COLORS: Record<StressState, string> = {
  Stable: "#3F7957",
  "Seasonal Dip": "#536B87",
  "Emerging Stress": "#B47720",
  "Structural Decline": "#B64C3D",
};

function DashboardPage() {
  const { state } = useApp();
  const navigate = useNavigate();

  const counts = useMemo(() => {
    const c = { Stable: 0, "Seasonal Dip": 0, "Emerging Stress": 0, "Structural Decline": 0 };
    for (const a of Object.values(state.analyses)) {
      if (a?.state && c[a.state] !== undefined) {
        c[a.state]++;
      }
    }
    return c;
  }, [state.analyses]);

  const total = state.borrowers.length;
  const needsAttention = counts["Seasonal Dip"] + counts["Emerging Stress"];
  const structuralDecline = counts["Structural Decline"];

  // Attention queue — first 6 borrowers needing attention from cached analyses
  const attentionQueue = useMemo(() => {
    return Object.values(state.analyses)
      .filter((a) => a.state !== "Stable")
      .sort((a, b) => b.rsi.value - a.rsi.value)
      .slice(0, 6);
  }, [state.analyses]);

  const pieData = [
    { name: "Stable", value: counts.Stable },
    { name: "Seasonal Dip", value: counts["Seasonal Dip"] },
    { name: "Emerging Stress", value: counts["Emerging Stress"] },
    { name: "Structural Decline", value: counts["Structural Decline"] },
  ];

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const meenaBorrower = state.borrowers.find((b) => b.id === "BR-10482") ?? (DEMO_BORROWERS[0] as typeof DEMO_BORROWERS[number]);
  const sureshBorrower = state.borrowers.find((b) => b.id === "BR-10921") ?? (DEMO_BORROWERS[1] as typeof DEMO_BORROWERS[number]);
  const meenaAnalysis = state.analyses["BR-10482"] ?? analyzeBorrower(meenaBorrower, state.modelConfig);
  const sureshAnalysis = state.analyses["BR-10921"] ?? analyzeBorrower(sureshBorrower, state.modelConfig);

  return (
    <AppShell>
      {/* Page header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {greeting}, Priya.
          </h1>
          <p className="text-[14px] text-muted-foreground mt-1">
            Here&apos;s what needs your attention across the branch.
          </p>
        </div>
      </div>

      {/* Hero Presentation Showcase Card */}
      <div className="bg-card border border-border rounded-lg p-5 mb-6 bg-gradient-to-r from-card to-muted/20">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-[10px] font-bold text-cfc-amber uppercase tracking-widest bg-cfc-amber/10 px-2 py-0.5 rounded">
              Presentation Mode · Core Hero Scenarios
            </span>
            <h2 className="text-lg font-bold text-foreground mt-1">
              Two income drops. Two different stories.
            </h2>
          </div>
          <p className="text-[12px] text-muted-foreground hidden sm:block max-w-xs text-right">
            AI analysis differentiates temporary monsoon dips from permanent structural revenue decline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {/* Meena Card */}
          <div
            onClick={() => navigate({ to: "/borrowers/$id", params: { id: "meena" } })}
            className="cursor-pointer border border-info/30 bg-info/5 hover:border-info/60 rounded-lg p-4 transition-all hover:shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[13px] font-bold text-foreground">Meena Krishnan</span>
                <StressStateBadge state={meenaAnalysis.state} size="sm" />
              </div>
              <p className="text-[12px] text-muted-foreground mb-3">Farmer · Monsoon harvest gap</p>
              <div className="grid grid-cols-3 gap-2 text-[12px] bg-background/60 rounded p-2.5 mb-3 border border-border">
                <div>
                  <p className="text-[10px] text-muted-foreground">RSI Score</p>
                  <p className="font-bold text-foreground text-[14px]">{meenaAnalysis.rsi.value}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">Seasonal Match</p>
                  <p className="font-bold text-foreground text-[14px]">{meenaAnalysis.seasonalMatch}%</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">Classification</p>
                  <p className="font-semibold text-info text-[12px]">{meenaAnalysis.state}</p>
                </div>
              </div>
              <p className="text-[12px] text-muted-foreground">
                <strong className="text-foreground">Recommendation:</strong> Seasonal Step-Down during harvest lull.
              </p>
            </div>
            <div className="mt-4 flex items-center justify-end text-[12px] font-semibold text-info gap-1">
              Analyse Meena <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* Suresh Card */}
          <div
            onClick={() => navigate({ to: "/borrowers/$id", params: { id: "suresh" } })}
            className="cursor-pointer border border-danger/30 bg-danger/5 hover:border-danger/60 rounded-lg p-4 transition-all hover:shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[13px] font-bold text-foreground">Suresh Kumar</span>
                <StressStateBadge state={sureshAnalysis.state} size="sm" />
              </div>
              <p className="text-[12px] text-muted-foreground mb-3">Gig Worker · Platform earnings drop</p>
              <div className="grid grid-cols-3 gap-2 text-[12px] bg-background/60 rounded p-2.5 mb-3 border border-border">
                <div>
                  <p className="text-[10px] text-muted-foreground">RSI Score</p>
                  <p className="font-bold text-foreground text-[14px]">{sureshAnalysis.rsi.value}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">Seasonal Match</p>
                  <p className="font-bold text-foreground text-[14px]">{sureshAnalysis.seasonalMatch}%</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">Classification</p>
                  <p className="font-semibold text-danger text-[12px]">{sureshAnalysis.state}</p>
                </div>
              </div>
              <p className="text-[12px] text-muted-foreground">
                <strong className="text-foreground">Recommendation:</strong> Temporary Moratorium & Restructure.
              </p>
            </div>
            <div className="mt-4 flex items-center justify-end text-[12px] font-semibold text-danger gap-1">
              Analyse Suresh <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </div>
        </div>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <KPICard
          label="Active loans"
          value={total}
          sub="Across all archetypes"
          icon={<Users className="h-4 w-4" />}
        />
        <KPICard
          label="Stable"
          value={counts.Stable}
          sub={`${Math.round((counts.Stable / total) * 100)}% of portfolio`}
          icon={<Briefcase className="h-4 w-4" />}
          className="border-success/20"
        />
        <KPICard
          label="Needs attention"
          value={needsAttention}
          sub={`${Math.round((needsAttention / total) * 100)}% of portfolio`}
          icon={<AlertTriangle className="h-4 w-4" />}
          className="border-warning/20"
        />
        <KPICard
          label="Structural decline"
          value={structuralDecline}
          sub={`${Math.round((structuralDecline / total) * 100)}% of portfolio`}
          icon={<AlertTriangle className="h-4 w-4" />}
          className="border-danger/20"
          accent
        />
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* Portfolio health chart */}
        <div className="col-span-1 bg-card border border-border rounded-lg p-4">
          <h2 className="text-[14px] font-semibold text-foreground mb-1">Portfolio health</h2>
          <p className="text-[11px] text-muted-foreground mb-3">{total} active loans</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={2}
                dataKey="value"
              >
                {pieData.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={STATE_COLORS[entry.name as StressState]}
                    opacity={0.85}
                  />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload || !payload.length || !payload[0]) return null;
                  const d = payload[0];
                  return (
                    <div className="bg-card border border-border rounded shadow p-2 text-[12px]">
                      <p className="font-medium">{String(d.name)}</p>
                      <p className="text-muted-foreground">{String(d.value)} borrowers</p>
                    </div>
                  );
                }}
              />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: 11 }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Attention queue */}
        <div className="col-span-2 bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[14px] font-semibold text-foreground">Attention queue</h2>
            <button
              onClick={() => navigate({ to: "/borrowers" })}
              className="text-[12px] text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              View all <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="border-b border-border">
                  {["Borrower", "Occupation", "RSI", "State", "Seasonal", "Action"].map((h) => (
                    <th key={h} className="text-left text-muted-foreground font-medium pb-2 pr-4 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {attentionQueue.map((a) => (
                  <tr key={a.borrower.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-2.5 pr-4">
                      <p className="font-medium text-foreground">{a.borrower.name}</p>
                      <p className="text-muted-foreground text-[11px]">{a.borrower.id}</p>
                    </td>
                    <td className="py-2.5 pr-4 text-muted-foreground">{a.borrower.occupation}</td>
                    <td className="py-2.5 pr-4 font-semibold text-foreground">{a.rsi.value}</td>
                    <td className="py-2.5 pr-4">
                      <StressStateBadge state={a.state} size="sm" />
                    </td>
                    <td className="py-2.5 pr-4 text-muted-foreground">{a.seasonalMatch}%</td>
                    <td className="py-2.5">
                      <button
                        onClick={() => navigate({ to: `/borrowers/${slugFor(a.borrower)}` })}
                        className="text-foreground font-medium hover:text-cfc-amber transition-colors text-[12px] flex items-center gap-1"
                      >
                        Analyse <ArrowRight className="h-3 w-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* System activity */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h2 className="text-[14px] font-semibold text-foreground mb-3">System activity</h2>
        <div className="space-y-0 divide-y divide-border">
          {state.activityFeed.slice(0, 6).map((event) => (
            <div key={event.id} className="flex items-start gap-3 py-2.5">
              <div
                className={`mt-0.5 h-2 w-2 rounded-full shrink-0 ${
                  event.kind === "forecast"
                    ? "bg-info"
                    : event.kind === "detection"
                      ? "bg-warning"
                      : event.kind === "decision"
                        ? "bg-success"
                        : "bg-muted-foreground"
                }`}
              />
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-foreground">{event.title}</p>
                <p className="text-[12px] text-muted-foreground mt-0.5">{event.detail}</p>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-muted-foreground shrink-0">
                <Clock className="h-3 w-3" />
                {formatDistanceToNow(new Date(event.time), { addSuffix: true })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
