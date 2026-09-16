import { cn } from "../../lib/utils";
import type { ReactNode } from "react";

interface Props {
  label: string;
  value: string | number;
  sub?: string;
  icon?: ReactNode;
  accent?: boolean;
  className?: string;
}

export function KPICard({ label, value, sub, icon, accent, className }: Props) {
  return (
    <div
      className={cn(
        "bg-card border border-border rounded-lg p-4 flex flex-col gap-1",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-[12px] text-muted-foreground font-medium uppercase tracking-wide">
          {label}
        </p>
        {icon && <span className="text-muted-foreground">{icon}</span>}
      </div>
      <p
        className={cn(
          "text-3xl font-bold tracking-tight leading-none mt-1",
          accent ? "text-cfc-amber" : "text-foreground",
        )}
      >
        {value}
      </p>
      {sub && <p className="text-[12px] text-muted-foreground">{sub}</p>}
    </div>
  );
}
