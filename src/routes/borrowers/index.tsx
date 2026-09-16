import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useMemo, useCallback } from "react";
import { useApp } from "../../lib/store";
import { AppShell } from "../../components/layout/AppShell";
import { StressStateBadge } from "../../components/shared/StressStateBadge";
import { analyzeBorrower, inr } from "../../lib/engine";
import { slugFor } from "../../lib/data";
import { Search, ArrowRight } from "lucide-react";
import type { StressState } from "../../lib/types";

export const Route = createFileRoute("/borrowers/")({
  component: BorrowersPage,
});

function BorrowersPage() {
  const { state } = useApp();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return state.borrowers.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.id.toLowerCase().includes(q) ||
        b.occupation.toLowerCase().includes(q),
    );
  }, [state.borrowers, search]);

  const getAnalysis = useCallback(
    (borrowerId: string) => {
      if (state.analyses[borrowerId]) return state.analyses[borrowerId];
      const b = state.borrowers.find((x) => x.id === borrowerId);
      if (b) return analyzeBorrower(b, state.modelConfig);
      return null;
    },
    [state.analyses, state.borrowers, state.modelConfig],
  );

  return (
    <AppShell>
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-foreground">Borrowers</h1>
        <p className="text-[13px] text-muted-foreground mt-0.5">
          {state.borrowers.length} borrowers · Salem Central Branch
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-4 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by name, ID, or occupation…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 border border-border rounded text-[13px] bg-card focus:outline-none focus:ring-1 focus:ring-ring"
        />
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              {["Name", "Occupation", "ID", "Loan balance", "RSI", "State", "Seasonal match", ""].map((h) => (
                <th key={h} className="text-left text-[11px] text-muted-foreground font-semibold uppercase tracking-wide py-3 px-4 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.slice(0, 100).map((b) => {
              const a = getAnalysis(b.id);
              return (
                <tr key={b.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3 px-4">
                    <p className="font-medium text-foreground">{b.name}</p>
                    <p className="text-[11px] text-muted-foreground">Since {b.since}</p>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{b.occupation}</td>
                  <td className="py-3 px-4 font-mono text-[12px] text-muted-foreground">{b.id}</td>
                  <td className="py-3 px-4 font-medium">{inr(b.loan.balance)}</td>
                  <td className="py-3 px-4 font-semibold">{a?.rsi.value ?? "—"}</td>
                  <td className="py-3 px-4">
                    {a ? <StressStateBadge state={a.state} size="sm" /> : <span className="text-muted-foreground">—</span>}
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{a ? `${a.seasonalMatch}%` : "—"}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => navigate({ to: `/borrowers/${slugFor(b)}` })}
                      className="flex items-center gap-1 text-[12px] font-medium text-foreground hover:text-cfc-amber transition-colors"
                    >
                      Open analysis <ArrowRight className="h-3 w-3" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
        {filtered.length > 100 && (
          <div className="px-4 py-3 text-[12px] text-muted-foreground border-t border-border">
            Showing 100 of {filtered.length} results. Refine search to narrow results.
          </div>
        )}
      </div>
    </AppShell>
  );
}
