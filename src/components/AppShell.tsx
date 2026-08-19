import { Link } from "@tanstack/react-router";
import { Home, Compass, Wallet, CreditCard, User } from "lucide-react";
import type { ReactNode } from "react";

const nav = [
  { to: "/", label: "الرئيسية", icon: Home },
  { to: "/opportunities", label: "فرصك", icon: Compass },
  { to: "/money", label: "المال", icon: Wallet },
  { to: "/cards", label: "البطاقات", icon: CreditCard },
  { to: "/account", label: "حسابي", icon: User },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div dir="rtl" className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-background">
      <main className="flex-1 px-5 pt-6 pb-28">{children}</main>
      <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto flex w-full max-w-md items-center justify-between border-t border-border bg-card/95 px-3 py-2 backdrop-blur">
        {nav.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            activeOptions={{ exact: to === "/" }}
            className="flex flex-1 flex-col items-center gap-1 rounded-2xl px-2 py-2 text-muted-foreground transition-colors data-[status=active]:bg-secondary data-[status=active]:text-primary"
          >
            <Icon className="size-5" />
            <span className="text-[11px] font-medium">{label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="mb-5">
      <h1 className="text-2xl font-bold text-foreground">{title}</h1>
      {subtitle ? <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p> : null}
    </header>
  );
}
