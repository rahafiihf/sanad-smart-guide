import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Plus, ArrowLeftRight, Sparkles, Target, PiggyBank, CreditCard, Send, Flame, ChevronLeft } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Splash } from "@/components/Splash";
import { useSanad, riyal, ar } from "@/lib/sanad-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "بنك سَنَد | سندك المالي" },
      { name: "description", content: "بنك سَنَد الرقمي — مالك، هدفك، فرصتك، وخطوتك القادمة في مكان واحد." },
      { property: "og:title", content: "بنك سَنَد | سندك المالي" },
      { property: "og:description", content: "بنك سَنَد الرقمي — لأن كل طموح يحتاج سند." },
    ],
  }),
  component: Index,
});

const quick = [
  { to: "/money", label: "تحويل", icon: Send },
  { to: "/cards", label: "دفع", icon: CreditCard },
  { to: "/goals", label: "ادخار", icon: PiggyBank },
  { to: "/goals", label: "هدف جديد", icon: Target },
  { to: "/opportunities", label: "فرصك", icon: Sparkles },
] as const;

function Index() {
  const [splash, setSplash] = useState(true);
  const { balance, goals, streakWeeks } = useSanad();

  useEffect(() => {
    if (sessionStorage.getItem("sanad-splash") === "seen") setSplash(false);
  }, []);

  if (splash) {
    return (
      <Splash
        onDone={() => {
          sessionStorage.setItem("sanad-splash", "seen");
          setSplash(false);
        }}
      />
    );
  }

  const main = goals[0];
  const progress = Math.round((main.saved / main.target) * 100);

  return (
    <AppShell>
      <div className="animate-soft-fade">
        <div className="mb-5">
          <h1 className="text-2xl font-bold">هلا رهف 👋</h1>
          <p className="text-sm text-muted-foreground">وش خطوتك الجاية؟</p>
        </div>

        <section className="card-gradient shadow-raised rounded-3xl p-6 text-primary-foreground">
          <p className="text-sm opacity-80">الرصيد المتاح</p>
          <p className="mt-1 text-4xl font-bold">{riyal(balance)}</p>
          <p className="mt-2 text-xs opacity-70">حساب جاري • SA03 8000 0000…</p>
          <div className="mt-5 flex gap-3">
            <Link
              to="/money"
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-primary-soft py-3 text-sm font-semibold"
            >
              <Plus className="size-4" /> إضافة أموال
            </Link>
            <Link
              to="/money"
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-primary-foreground/15 py-3 text-sm font-semibold"
            >
              <ArrowLeftRight className="size-4" /> تحويل سريع
            </Link>
          </div>
        </section>

        <div className="-mx-5 mt-5 flex gap-3 overflow-x-auto px-5 pb-1">
          {quick.map(({ to, label, icon: Icon }) => (
            <Link key={label} to={to} className="flex w-20 shrink-0 flex-col items-center gap-2">
              <span className="surface flex size-16 items-center justify-center text-primary">
                <Icon className="size-6" />
              </span>
              <span className="text-xs text-muted-foreground">{label}</span>
            </Link>
          ))}
        </div>

        <SectionTitle title="صورتك المالية" href="/money" action="قصتك المالية" />
        <div className="surface flex items-center gap-5 p-5">
          <Ring value={progress} />
          <div className="text-sm">
            <p className="text-muted-foreground">مصروفك هذا الشهر</p>
            <p className="text-lg font-bold">{riyal(4280)}</p>
            <p className="mt-2 text-muted-foreground">ادخارك</p>
            <p className="text-lg font-bold text-primary">{riyal(1750)}</p>
          </div>
        </div>

        <SectionTitle title="استمراريتك" href="/streak" action="شوف الـStreak" />
        <Link to="/streak" className="surface flex items-center justify-between gap-3 p-5">
          <div>
            <p className="flex items-center gap-2 text-base font-bold">
              <Flame className="size-5 text-gold" /> {ar(streakWeeks)} أسبوع متتالي
            </p>
            <p className="mt-1 text-sm text-muted-foreground">استمرارك هو إنجازك.</p>
          </div>
          <ChevronLeft className="size-5 text-muted-foreground" />
        </Link>

        <SectionTitle title="هدفك القادم" href="/goals" action="أهدافي" />
        <Link to="/goals" className="surface block p-5">
          <p className="text-sm text-muted-foreground">
            {main.emoji} {main.title}
          </p>
          <p className="mt-2 text-lg font-bold">
            {ar(main.saved)} من {riyal(main.target)}
          </p>
          <div className="mt-3 h-2 w-full rounded-full bg-secondary">
            <div className="h-2 rounded-full bg-primary" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            تبقى {riyal(main.target - main.saved)} للوصول لهدفك
          </p>
        </Link>

        <SectionTitle title="سَنَد الذكي" href="/chat" action="Sanad AI" />
        <Link to="/chat" className="surface block p-5">
          <p className="text-sm">لاحظنا أنك تصرف أكثر على الاشتراكات هذا الشهر.</p>
          <p className="mt-2 text-sm text-muted-foreground">
            إذا خفّضت اشتراكاتك بمقدار ٨٠ ر.س شهريًا، ستصل لهدفك قبل شهرين.
          </p>
          <span className="mt-4 inline-flex rounded-2xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
            اسأل سَنَد الذكي
          </span>
        </Link>
      </div>
    </AppShell>
  );
}

function SectionTitle({ title, href, action }: { title: string; href: string; action: string }) {
  return (
    <div className="mt-7 mb-3 flex items-center justify-between">
      <h2 className="text-lg font-bold">{title}</h2>
      <Link to={href} className="text-sm text-primary">
        {action}
      </Link>
    </div>
  );
}

function Ring({ value }: { value: number }) {
  return (
    <div
      className="grid size-28 shrink-0 place-items-center rounded-full"
      style={{
        background: `conic-gradient(var(--primary) ${value * 3.6}deg, var(--secondary) 0deg)`,
      }}
    >
      <div className="grid size-20 place-items-center rounded-full bg-card text-center">
        <div>
          <p className="text-lg font-bold text-primary">{value}%</p>
          <p className="text-[10px] text-muted-foreground">تقدمك</p>
        </div>
      </div>
    </div>
  );
}
