import { useRouter } from "@tanstack/react-router";
import { X, AlertTriangle, TrendingDown, Bell, RefreshCw } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { useApp } from "../../lib/store";
import { slugFor } from "../../lib/data";
import { cn } from "../../lib/utils";
import { formatDistanceToNow } from "date-fns";

interface Props {
  open: boolean;
  onClose: () => void;
  pendingCount: number;
}

export function NotificationDrawer({ open, onClose }: Props) {
  const { state } = useApp();
  const router = useRouter();

  const notifications = [
    ...Object.values(state.analyses)
      .filter((a) => a.state === "Structural Decline")
      .slice(0, 3)
      .map((a) => ({
        id: `decline-${a.borrower.id}`,
        icon: TrendingDown,
        iconColor: "text-danger",
        bg: "bg-danger/8",
        title: "Structural decline detected",
        detail: `${a.borrower.name} — RSI ${a.rsi.value}`,
        time: new Date(Date.now() - 18 * 60000),
        borrowerId: a.borrower.id,
        slug: slugFor(a.borrower),
      })),
    ...state.decisions.slice(-3).map((d) => ({
      id: `decision-${d.id}`,
      icon: Bell,
      iconColor: "text-warning",
      bg: "bg-warning/8",
      title: `Plan ${d.action.toLowerCase()} — ${d.borrowerName}`,
      detail: `${d.planType} · ${d.officerName}`,
      time: new Date(d.timestamp),
      borrowerId: d.borrowerId,
      slug: "",
    })),
    {
      id: "recalib",
      icon: RefreshCw,
      iconColor: "text-success",
      bg: "bg-success/8",
      title: "Forecast recalibration complete",
      detail: `${state.borrowers.length} borrowers updated`,
      time: new Date(Date.now() - 45 * 60000),
      borrowerId: null,
      slug: "",
    },
    ...Object.values(state.analyses)
      .filter((a) => a.state === "Seasonal Dip")
      .slice(0, 2)
      .map((a) => ({
        id: `seasonal-${a.borrower.id}`,
        icon: AlertTriangle,
        iconColor: "text-info",
        bg: "bg-info/8",
        title: "Seasonal dip — plan awaiting review",
        detail: `${a.borrower.name} — RSI ${a.rsi.value}`,
        time: new Date(Date.now() - 2 * 3600000),
        borrowerId: a.borrower.id,
        slug: slugFor(a.borrower),
      })),
  ].slice(0, 8);

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent side="right" className="w-80 p-0 flex flex-col">
        <SheetHeader className="px-4 py-3 border-b border-border flex-row items-center justify-between">
          <SheetTitle className="text-[15px] font-semibold">Notifications</SheetTitle>
          <button onClick={onClose} className="h-7 w-7 flex items-center justify-center rounded hover:bg-muted">
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto divide-y divide-border">
          {notifications.map((n) => (
            <button
              key={n.id}
              className={cn(
                "w-full text-left px-4 py-3 hover:bg-muted/50 transition-colors",
              )}
              onClick={() => {
                if (n.slug) {
                  router.navigate({ to: `/borrowers/${n.slug}` });
                  onClose();
                }
              }}
            >
              <div className="flex gap-3 items-start">
                <div className={cn("h-7 w-7 rounded-full flex items-center justify-center shrink-0 mt-0.5", n.bg)}>
                  <n.icon className={cn("h-3.5 w-3.5", n.iconColor)} />
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-medium text-foreground leading-tight">{n.title}</p>
                  <p className="text-[12px] text-muted-foreground mt-0.5">{n.detail}</p>
                  <p className="text-[11px] text-muted-foreground/60 mt-1">
                    {formatDistanceToNow(n.time, { addSuffix: true })}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
