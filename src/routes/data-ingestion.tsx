import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useApp } from "../lib/store";
import { AppShell } from "../components/layout/AppShell";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { Upload, FileText, CheckCircle2, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/data-ingestion")({
  component: DataIngestionPage,
});

function DataIngestionPage() {
  const { state, dispatch } = useApp();
  const [generating, setGenerating] = useState(false);
  const [count, setCount] = useState<50 | 100 | 200>(200);
  const [generated, setGenerated] = useState(false);

  function handleGenerate() {
    setGenerating(true);
    setTimeout(() => {
      dispatch({ type: "GENERATE_BORROWERS", count });
      setGenerating(false);
      setGenerated(true);
    }, 800);
  }

  return (
    <AppShell>
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-foreground">Data Ingestion</h1>
        <p className="text-[13px] text-muted-foreground mt-0.5">
          Import transaction data or generate synthetic datasets
        </p>
      </div>

      <Tabs defaultValue="upload">
        <TabsList className="mb-5">
          <TabsTrigger value="upload">Upload data</TabsTrigger>
          <TabsTrigger value="synthetic">Generate synthetic data</TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          <div className="bg-card border border-border rounded-lg p-6 max-w-xl">
            <h2 className="text-[15px] font-semibold text-foreground mb-2">Upload transaction file</h2>
            <p className="text-[12px] text-muted-foreground mb-4">CSV or JSON format</p>

            {/* Drop zone */}
            <div className="border-2 border-dashed border-border rounded-lg p-10 text-center hover:border-cfc-amber/40 transition-colors cursor-pointer mb-5">
              <Upload className="h-8 w-8 text-muted-foreground/40 mx-auto mb-3" />
              <p className="text-[13px] font-medium text-foreground">Drag and drop your file here</p>
              <p className="text-[12px] text-muted-foreground mt-1">or click to browse</p>
              <p className="text-[11px] text-muted-foreground/60 mt-3">CSV, JSON · max 50MB</p>
            </div>

            {/* Required fields */}
            <div className="border border-border rounded p-3 mb-4">
              <p className="text-[12px] font-semibold text-foreground mb-2">Required columns</p>
              <div className="grid grid-cols-2 gap-1 text-[11px] font-mono text-muted-foreground">
                {["borrower_id", "date", "amount", "type", "source"].map((f) => (
                  <span key={f} className="bg-muted/50 px-2 py-1 rounded">{f}</span>
                ))}
              </div>
            </div>

            <Button className="w-full gap-2" variant="outline">
              <FileText className="h-4 w-4" />
              Select file
            </Button>

            {/* Quality preview (demo placeholder) */}
            <div className="mt-4 space-y-2">
              <p className="text-[12px] font-semibold text-foreground">Last ingestion — Sep 16, 2026</p>
              <div className="grid grid-cols-2 gap-2 text-[12px]">
                {[
                  { label: "Records", value: "1,847" },
                  { label: "Borrowers", value: "200" },
                  { label: "Date range", value: "Apr 2025 – Sep 2026" },
                  { label: "Quality score", value: "97.3%" },
                  { label: "Missing values", value: "12" },
                  { label: "Irregular intervals", value: "3" },
                ].map((s) => (
                  <div key={s.label} className="flex justify-between bg-muted/50 rounded px-2.5 py-1.5">
                    <span className="text-muted-foreground">{s.label}</span>
                    <span className="font-medium">{s.value}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 text-[12px] text-success mt-2">
                <CheckCircle2 className="h-3.5 w-3.5" />
                All records validated
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="synthetic">
          <div className="bg-card border border-border rounded-lg p-6 max-w-xl">
            <h2 className="text-[15px] font-semibold text-foreground mb-2">Generate synthetic dataset</h2>
            <p className="text-[12px] text-muted-foreground mb-4">
              Deterministic seeded generation using the existing engine. Includes all three archetypes.
            </p>

            <div className="mb-4">
              <p className="text-[12px] font-medium text-foreground mb-2">Number of borrowers</p>
              <div className="flex gap-2">
                {([50, 100, 200] as const).map((n) => (
                  <button
                    key={n}
                    onClick={() => setCount(n)}
                    className={`px-4 py-2 text-[13px] font-medium rounded border transition-colors ${
                      count === n
                        ? "bg-foreground text-background border-foreground"
                        : "border-border hover:border-foreground/30"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-muted/50 rounded p-3 mb-4 text-[12px] space-y-1">
              <p className="font-medium text-foreground">Archetypes included</p>
              <div className="grid grid-cols-3 gap-2 mt-1">
                <div className="bg-card border border-border rounded px-2 py-1.5 text-center">
                  <p className="font-semibold text-success">~{Math.round(count * 0.68)}</p>
                  <p className="text-muted-foreground text-[10px]">Stable</p>
                </div>
                <div className="bg-card border border-border rounded px-2 py-1.5 text-center">
                  <p className="font-semibold text-info">~{Math.round(count * 0.22)}</p>
                  <p className="text-muted-foreground text-[10px]">Seasonal</p>
                </div>
                <div className="bg-card border border-border rounded px-2 py-1.5 text-center">
                  <p className="font-semibold text-danger">~{Math.round(count * 0.10)}</p>
                  <p className="text-muted-foreground text-[10px]">Declining</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-muted-foreground bg-muted/50 rounded px-3 py-2 mb-4">
              <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
              This will replace the current borrower dataset. Demo borrowers (Meena, Suresh, Anitha) are always preserved at the top.
            </div>

            <Button className="w-full" onClick={handleGenerate} disabled={generating}>
              {generating ? "Generating…" : `Generate ${count} borrowers`}
            </Button>

            {generated && (
              <div className="mt-3 flex items-center gap-2 text-[12px] text-success">
                <CheckCircle2 className="h-3.5 w-3.5" />
                {count} borrowers generated · Analysis engine ready
              </div>
            )}

            <p className="text-[11px] text-muted-foreground mt-3">
              Current dataset: {state.borrowers.length} borrowers
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}
