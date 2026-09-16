import { useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useApp } from "../lib/store";
import { TrendingUp, ArrowRight, Shield } from "lucide-react";

export const Route = createFileRoute("/")({
  component: LoginPage,
});

function LoginPage() {
  const { dispatch } = useApp();
  const navigate = useNavigate();

  function handleLogin() {
    dispatch({ type: "LOGIN" });
    navigate({ to: "/dashboard" });
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-[480px] bg-foreground p-12">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded bg-cfc-amber flex items-center justify-center">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-[15px] font-bold text-background leading-tight">Cash-Flow</p>
            <p className="text-[13px] font-bold text-cfc-amber leading-tight">Copilot</p>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-background leading-tight">
              Two income drops.
              <br />
              Two different
              <br />
              stories.
            </h1>
            <p className="mt-4 text-[15px] text-background/60 leading-relaxed">
              Understand the cash flow. Detect the stress. Structure the recovery.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                label: "Seasonal Dip",
                sub: "Pattern-matched to historical profile",
                color: "bg-info",
              },
              {
                label: "Structural Decline",
                sub: "Unexplained by seasonal factors",
                color: "bg-danger",
              },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <div className={`h-2.5 w-2.5 rounded-full ${s.color}`} />
                <div>
                  <p className="text-[13px] font-semibold text-background">{s.label}</p>
                  <p className="text-[12px] text-background/50">{s.sub}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-background/10 pt-6">
            <p className="text-[12px] text-background/40 uppercase tracking-wide mb-3">
              Human-in-the-loop workflow
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              {["Detect", "Forecast", "Classify", "Recommend", "Officer Review", "Audit"].map(
                (s, i) => (
                  <div key={s} className="flex items-center gap-2">
                    <span className="text-[12px] text-background/70">{s}</span>
                    {i < 5 && <ArrowRight className="h-3 w-3 text-background/30" />}
                  </div>
                ),
              )}
            </div>
          </div>
        </div>

        <div className="text-[11px] text-background/30">
          Salem Central Branch · Prototype v1.0 · {new Date().getFullYear()}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-8">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 lg:hidden">
            <div className="h-8 w-8 rounded bg-cfc-amber flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-[14px] font-bold text-foreground leading-tight">Cash-Flow Copilot</p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground">Sign in</h2>
            <p className="mt-1 text-[13px] text-muted-foreground">
              Salem Central Branch · Lender Operations
            </p>
          </div>

          <div className="space-y-4">
            {/* Pre-filled for demo */}
            <div className="space-y-1.5">
              <label className="text-[12px] font-medium text-foreground">Username</label>
              <input
                type="text"
                value="priya.sharma"
                readOnly
                className="w-full border border-border rounded px-3 py-2 text-[13px] bg-muted/50 text-foreground"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[12px] font-medium text-foreground">Password</label>
              <input
                type="password"
                value="••••••••"
                readOnly
                className="w-full border border-border rounded px-3 py-2 text-[13px] bg-muted/50 text-foreground"
              />
            </div>

            <div className="flex items-center gap-2 text-[12px] text-muted-foreground bg-muted/50 border border-border rounded px-3 py-2">
              <Shield className="h-3.5 w-3.5 shrink-0" />
              <span>Demo mode — credentials are pre-filled. Click Sign in to continue.</span>
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-foreground text-background rounded py-2.5 text-[14px] font-semibold hover:bg-foreground/90 transition-colors flex items-center justify-center gap-2"
            >
              Sign in
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="border-t border-border pt-4">
            <div className="space-y-1 text-[12px] text-muted-foreground">
              <p className="font-medium text-foreground">Demo credentials</p>
              <p>Officer: Priya Sharma · Loan Officer</p>
              <p>Branch: Salem Central Branch</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
