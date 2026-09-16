import {
  CheckCircle2,
  Minus,
  AlertTriangle,
  TrendingDown,
} from "lucide-react";
import { cn } from "../../lib/utils";
import type { StressState } from "../../lib/types";

interface Props {
  state: StressState;
  size?: "sm" | "md";
  className?: string;
}

const CONFIG: Record<
  StressState,
  { label: string; icon: React.ElementType; textClass: string; bgClass: string; borderClass: string }
> = {
  Stable: {
    label: "Stable",
    icon: CheckCircle2,
    textClass: "text-success",
    bgClass: "bg-success/10",
    borderClass: "border-success/20",
  },
  "Seasonal Dip": {
    label: "Seasonal Dip",
    icon: Minus,
    textClass: "text-info",
    bgClass: "bg-info/10",
    borderClass: "border-info/20",
  },
  "Emerging Stress": {
    label: "Emerging Stress",
    icon: AlertTriangle,
    textClass: "text-warning",
    bgClass: "bg-warning/10",
    borderClass: "border-warning/20",
  },
  "Structural Decline": {
    label: "Structural Decline",
    icon: TrendingDown,
    textClass: "text-danger",
    bgClass: "bg-danger/10",
    borderClass: "border-danger/20",
  },
};

/** Always renders icon + label. Never relies on color alone. WCAG-compliant. */
export function StressStateBadge({ state, size = "md", className }: Props) {
  const cfg = CONFIG[state];
  const Icon = cfg.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded border font-medium",
        cfg.textClass,
        cfg.bgClass,
        cfg.borderClass,
        size === "sm" ? "px-1.5 py-0.5 text-[11px]" : "px-2 py-1 text-[12px]",
        className,
      )}
      role="status"
      aria-label={`Stress state: ${state}`}
    >
      <Icon className={size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5"} aria-hidden />
      {cfg.label}
    </span>
  );
}
