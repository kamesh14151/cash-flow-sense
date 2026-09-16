import { useState, type ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

interface Props {
  children: ReactNode;
  title?: string;
  breadcrumb?: { label: string; to?: string }[];
}

export function AppShell({ children }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />
      <Topbar onOpenMobileMenu={() => setMobileOpen(true)} />
      <main className="pl-0 lg:pl-56 pt-14 min-h-screen w-full max-w-full">
        <div className="p-3 sm:p-6 lg:p-8 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
