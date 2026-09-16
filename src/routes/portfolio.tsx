import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { useApp } from "../lib/store";
import { AppShell } from "../components/layout/AppShell";
import { StressStateBadge } from "../components/shared/StressStateBadge";
import { analyzeBorrower, inr } from "../lib/engine";
import { slugFor } from "../lib/data";
import { Search, SlidersHorizontal, ArrowRight, ArrowUpDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import type { StressState } from "../lib/types";

export const Route = createFileRoute("/portfolio")({
  component: PortfolioPage,
});

type SortField = "rsi" | "balance" | "name" | "seasonalMatch";

function PortfolioPage() {
  const { state } = useApp();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filterState, setFilterState] = useState<"all" | StressState>("all");
  const [filterOcc, setFilterOcc] = useState("all");
  const [sortField, setSortField] = useState<SortField>("rsi");
  const [sortDesc, setSortDesc] = useState(true);

  const occupations = useMemo(
    () => ["all", ...Array.from(new Set(state.borrowers.map((b) => b.occupation)))],
    [state.borrowers],
  );

  function getAnalysis(borrowerId: string) {
    if (state.analyses[borrowerId]) return state.analyses[borrowerId];
    const b = state.borrowers.find((x) => x.id === borrowerId);
    if (b) return analyzeBorrower(b, state.modelConfig);
    return null;
  }

  const rows = useMemo(() => {
    const q = search.toLowerCase();
    return state.borrowers
      .filter((b) => {
        const matchSearch =
          b.name.toLowerCase().includes(q) ||
          b.id.toLowerCase().includes(q) ||
          b.occupation.toLowerCase().includes(q);
        const a = getAnalysis(b.id);
        const matchState = filterState === "all" || a?.state === filterState;
        const matchOcc = filterOcc === "all" || b.occupation === filterOcc;
        return matchSearch && matchState && matchOcc;
      })
      .map((b) => ({ borrower: b, analysis: getAnalysis(b.id) }))
      .sort((x, y) => {
        const av = x.analysis, bv = y.analysis;
        let diff = 0;
        if (sortField === "rsi") diff = (av?.rsi.value ?? 0) - (bv?.rsi.value ?? 0);
        else if (sortField === "balance") diff = x.borrower.loan.balance - y.borrower.loan.balance;
        else if (sortField === "seasonalMatch") diff = (av?.seasonalMatch ?? 0) - (bv?.seasonalMatch ?? 0);
        else diff = x.borrower.name.localeCompare(y.borrower.name);
        return sortDesc ? -diff : diff;
      })
      .slice(0, 100);
  }, [state.borrowers, state.analyses, search, filterState, filterOcc, sortField, sortDesc]);

  const STATES: StressState[] = ["Stable", "Seasonal Dip", "Emerging Stress", "Structural Decline"];

  return (
    <AppShell>
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-foreground">Portfolio</h1>
        <p className="text-[13px] text-muted-foreground mt-0.5">
          {state.borrowers.length} active loans · Salem Central Branch
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search borrowers…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-border rounded text-[13px] bg-card focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
        <Select value={filterState} onValueChange={(v) => setFilterState(v as "all" | StressState)}>
          <SelectTrigger className="w-44 text-[13px]">
            <SelectValue placeholder="All states" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All states</SelectItem>
            {STATES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={filterOcc} onValueChange={setFilterOcc}>
          <SelectTrigger className="w-44 text-[13px]">
            <SelectValue placeholder="All occupations" />
          </SelectTrigger>
          <SelectContent>
            {occupations.map((o) => <SelectItem key={o} value={o}>{o === "all" ? "All occupations" : o}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={sortField} onValueChange={(v) => setSortField(v as SortField)}>
          <SelectTrigger className="w-40 text-[13px]">
            <SlidersHorizontal className="h-3.5 w-3.5 mr-1.5" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rsi">RSI (highest)</SelectItem>
            <SelectItem value="balance">Balance</SelectItem>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="seasonalMatch">Seasonal match</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {[
                  { label: "Borrower", field: "name" },
                  { label: "Occupation", field: null },
                  { label: "Balance", field: "balance" },
                  { label: "Next installment", field: null },
                  { label: "RSI", field: "rsi" },
                  { label: "State", field: null },
                  { label: "Seasonal", field: "seasonalMatch" },
                  { label: "Last updated", field: null },
                  { label: "", field: null },
                ].map((h) => (
                  <th
                    key={h.label}
                    className="text-left text-[11px] text-muted-foreground font-semibold uppercase tracking-wide py-3 px-4 whitespace-nowrap"
                    onClick={() => h.field && (setSortField(h.field as SortField), setSortDesc((p) => !p))}
                    style={{ cursor: h.field ? "pointer" : "default" }}
                  >
                    <div className="flex items-center gap-1">
                      {h.label}
                      {h.field && <ArrowUpDown className="h-3 w-3 opacity-50" />}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map(({ borrower: b, analysis: a }) => (
                <tr
                  key={b.id}
                  className="hover:bg-muted/30 transition-colors cursor-pointer"
                  onClick={() => navigate({ to: `/borrowers/${slugFor(b)}` })}
                >
                  <td className="py-3 px-4">
                    <p className="font-medium text-foreground">{b.name}</p>
                    <p className="text-[11px] text-muted-foreground font-mono">{b.id}</p>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{b.occupation}</td>
                  <td className="py-3 px-4 font-medium">{inr(b.loan.balance)}</td>
                  <td className="py-3 px-4 text-muted-foreground">{inr(b.loan.installment)}</td>
                  <td className="py-3 px-4">
                    <span className={`font-bold ${a && a.rsi.value > 70 ? "text-danger" : a && a.rsi.value > 50 ? "text-warning" : "text-foreground"}`}>
                      {a?.rsi.value ?? "—"}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {a ? <StressStateBadge state={a.state} size="sm" /> : <span className="text-muted-foreground">—</span>}
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{a ? `${a.seasonalMatch}%` : "—"}</td>
                  <td className="py-3 px-4 text-muted-foreground">Sep 2026</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={(e) => { e.stopPropagation(); navigate({ to: `/borrowers/${slugFor(b)}` }); }}
                      className="flex items-center gap-1 text-[12px] font-medium hover:text-cfc-amber transition-colors"
                    >
                      Open <ArrowRight className="h-3 w-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {rows.length === 100 && (
          <div className="px-4 py-3 text-[12px] text-muted-foreground border-t border-border">
            Showing top 100 results. Use filters to narrow.
          </div>
        )}
      </div>
    </AppShell>
  );
}
