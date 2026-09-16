import { useEffect, useState } from "react";
import { useRouter } from "@tanstack/react-router";
import {
  Command,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandEmpty,
} from "../ui/command";
import { Dialog, DialogContent } from "../ui/dialog";
import { useApp } from "../../lib/store";
import { slugFor } from "../../lib/data";
import {
  Users,
  LayoutDashboard,
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
} from "lucide-react";

const PAGES = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { label: "Portfolio", to: "/portfolio", icon: Briefcase },
  { label: "Borrowers", to: "/borrowers", icon: Users },
  { label: "Alerts", to: "/alerts", icon: AlertTriangle },
  { label: "Plans", to: "/plans", icon: FileText },
  { label: "Forecasts", to: "/forecasts", icon: TrendingUp },
  { label: "Monitoring", to: "/monitoring", icon: Activity },
  { label: "Model Insights", to: "/model-insights", icon: BarChart3 },
  { label: "Data Ingestion", to: "/data-ingestion", icon: Upload },
  { label: "Audit Log", to: "/audit-log", icon: ClipboardList },
  { label: "Settings", to: "/settings", icon: Settings },
  { label: "Help", to: "/help", icon: HelpCircle },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export function CommandPalette({ open, onClose }: Props) {
  const { state } = useApp();
  const router = useRouter();
  const [query, setQuery] = useState("");

  // Cmd+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (!open) {
          // We don't have a direct open callback here — handled in Topbar
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  const filteredBorrowers = state.borrowers
    .filter(
      (b) =>
        b.name.toLowerCase().includes(query.toLowerCase()) ||
        b.id.toLowerCase().includes(query.toLowerCase()) ||
        b.occupation.toLowerCase().includes(query.toLowerCase()),
    )
    .slice(0, 8);

  function navigate(to: string) {
    router.navigate({ to } as Parameters<typeof router.navigate>[0]);
    onClose();
    setQuery("");
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="p-0 gap-0 max-w-lg overflow-hidden">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search borrowers, pages, alerts…"
            value={query}
            onValueChange={setQuery}
            className="text-[13px]"
          />
          <CommandList className="max-h-80">
            <CommandEmpty>No results found.</CommandEmpty>

            {query === "" && (
              <CommandGroup heading="Pages">
                {PAGES.map((p) => (
                  <CommandItem
                    key={p.to}
                    onSelect={() => navigate(p.to)}
                    className="gap-2 text-[13px]"
                  >
                    <p.icon className="h-4 w-4 text-muted-foreground" />
                    {p.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {filteredBorrowers.length > 0 && (
              <CommandGroup heading="Borrowers">
                {filteredBorrowers.map((b) => {
                  const analysis = state.analyses[b.id];
                  const slug = slugFor(b);
                  return (
                    <CommandItem
                      key={b.id}
                      onSelect={() => navigate(`/borrowers/${slug}`)}
                      className="gap-2 text-[13px]"
                    >
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{b.name}</span>
                      <span className="text-muted-foreground text-[12px]">
                        {b.id} · {b.occupation}
                      </span>
                      {analysis && (
                        <span className="ml-auto text-[11px] text-muted-foreground">
                          RSI {analysis.rsi.value}
                        </span>
                      )}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            )}

            {query !== "" && (
              <CommandGroup heading="Pages">
                {PAGES.filter((p) =>
                  p.label.toLowerCase().includes(query.toLowerCase()),
                ).map((p) => (
                  <CommandItem
                    key={p.to}
                    onSelect={() => navigate(p.to)}
                    className="gap-2 text-[13px]"
                  >
                    <p.icon className="h-4 w-4 text-muted-foreground" />
                    {p.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
