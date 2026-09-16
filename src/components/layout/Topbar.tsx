import { useRouter } from "@tanstack/react-router";
import { Bell, Search, RefreshCw, Menu } from "lucide-react";
import { useState } from "react";
import { useApp } from "../../lib/store";
import { Button } from "../ui/button";
import { NotificationDrawer } from "./NotificationDrawer";
import { CommandPalette } from "./CommandPalette";

interface TopbarProps {
  onOpenMobileMenu?: () => void;
}

export function Topbar({ onOpenMobileMenu }: TopbarProps) {
  const { state, dispatch } = useApp();
  const [notifOpen, setNotifOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const router = useRouter();

  const pendingCount = state.decisions.filter((d) => d.action === "Approved").length;
  const alertCount = Object.values(state.analyses).filter(
    (a) => a.state === "Structural Decline" || a.state === "Emerging Stress",
  ).length;

  return (
    <>
      <header className="fixed top-0 left-0 lg:left-56 right-0 z-30 h-14 flex items-center justify-between px-3 sm:px-5 bg-card border-b border-border">
        <div className="flex items-center gap-2">
          {/* Mobile Menu Toggle */}
          <button
            onClick={onOpenMobileMenu}
            className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted lg:hidden"
            aria-label="Open mobile menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Search trigger */}
          <button
            onClick={() => setCmdOpen(true)}
            className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded border border-border bg-muted/50 text-muted-foreground text-[12px] sm:text-[13px] hover:border-ring/50 transition-colors w-36 sm:w-64 max-w-[200px] sm:max-w-xs"
            aria-label="Open command palette"
          >
            <Search className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">Search borrowers…</span>
            <kbd className="hidden sm:inline-block ml-auto text-[10px] font-mono bg-border/80 px-1.5 py-0.5 rounded">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Reset demo */}
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground text-[11px] sm:text-[12px] gap-1 px-2 sm:px-3"
            onClick={() => {
              dispatch({ type: "RESET_DEMO" });
              router.navigate({ to: "/dashboard" });
            }}
            title="Reset demo to initial state"
          >
            <RefreshCw className="h-3.5 w-3.5 shrink-0" />
            <span className="hidden xs:inline sm:inline">Reset</span>
          </Button>

          {/* Notifications */}
          <button
            onClick={() => setNotifOpen(true)}
            className="relative h-8 w-8 flex items-center justify-center rounded hover:bg-muted transition-colors"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4 text-muted-foreground" />
            {alertCount > 0 && (
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-danger" />
            )}
          </button>

          {/* Avatar */}
          <div className="h-8 w-8 rounded-full bg-cfc-amber/15 flex items-center justify-center shrink-0">
            <span className="text-[11px] font-bold text-cfc-amber">PS</span>
          </div>
        </div>
      </header>

      <NotificationDrawer
        open={notifOpen}
        onClose={() => setNotifOpen(false)}
        pendingCount={pendingCount}
      />
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />
    </>
  );
}
