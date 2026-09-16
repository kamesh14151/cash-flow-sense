import { Link, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  AlertTriangle,
  FileText,
  TrendingUp,
  Activity,
  BarChart3,
  Upload,
  ClipboardList,
  Settings,
  HelpCircle,
  Building2,
  ChevronDown,
} from "lucide-react";
import { cn } from "../../lib/utils";

interface NavItem {
  label: string;
  to: string;
  icon: React.ElementType;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    label: "LENDER OPERATIONS",
    items: [
      { label: "Overview", to: "/dashboard", icon: LayoutDashboard },
      { label: "Portfolio", to: "/portfolio", icon: Briefcase },
      { label: "Borrowers", to: "/borrowers", icon: Users },
      { label: "Alerts", to: "/alerts", icon: AlertTriangle },
      { label: "Plans", to: "/plans", icon: FileText },
    ],
  },
  {
    label: "ANALYTICS",
    items: [
      { label: "Forecasts", to: "/forecasts", icon: TrendingUp },
      { label: "Monitoring", to: "/monitoring", icon: Activity },
      { label: "Model Insights", to: "/model-insights", icon: BarChart3 },
    ],
  },
  {
    label: "OPERATIONS",
    items: [
      { label: "Data Ingestion", to: "/data-ingestion", icon: Upload },
      { label: "Audit Log", to: "/audit-log", icon: ClipboardList },
    ],
  },
  {
    label: "SYSTEM",
    items: [
      { label: "Settings", to: "/settings", icon: Settings },
      { label: "Help", to: "/help", icon: HelpCircle },
    ],
  },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-56 flex-col bg-sidebar border-r border-sidebar-border">
      {/* Logo */}
      <div className="flex h-14 items-center px-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded bg-cfc-amber flex items-center justify-center">
            <TrendingUp className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-sidebar-foreground leading-tight">
              Cash-Flow
            </p>
            <p className="text-[11px] font-semibold text-sidebar-primary leading-tight">
              Copilot
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {NAV_GROUPS.map((group) => (
          <div key={group.label} className="mb-4">
            <p className="px-2 mb-1 text-[10px] font-semibold tracking-widest text-sidebar-foreground/40 uppercase">
              {group.label}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active =
                  item.to === "/dashboard"
                    ? location.pathname === "/dashboard"
                    : location.pathname.startsWith(item.to);
                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className={cn(
                        "flex items-center gap-2.5 rounded px-2 py-1.5 text-[13px] font-medium transition-colors",
                        active
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
                      )}
                    >
                      <item.icon className="h-4 w-4 shrink-0 opacity-80" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-full bg-cfc-amber/20 flex items-center justify-center shrink-0">
            <span className="text-[11px] font-bold text-cfc-amber">PS</span>
          </div>
          <div className="min-w-0">
            <p className="text-[12px] font-semibold text-sidebar-foreground leading-tight truncate">
              Priya Sharma
            </p>
            <p className="text-[11px] text-sidebar-foreground/50 truncate">Loan Officer</p>
          </div>
          <ChevronDown className="h-3.5 w-3.5 shrink-0 text-sidebar-foreground/30 ml-auto" />
        </div>
        <div className="mt-2 flex items-center gap-1.5 px-0.5">
          <Building2 className="h-3 w-3 text-sidebar-foreground/30" />
          <p className="text-[10px] text-sidebar-foreground/40 truncate">Salem Central Branch</p>
        </div>
      </div>
    </aside>
  );
}
