import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Lock } from "lucide-react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { useSanad, riyal, ar, etaLabel, withdrawFromGoal, setMonthlySaving, type Goal } from "@/lib/sanad-store";
import { toast } from "sonner";

export const Route = createFileRoute("/goals")({
  head: () => ({
    meta: [
      { title: "أهدافي | بنك سَنَد" },
      { name: "description", content: "تابع أهدافك الادخارية في بنك سَنَد وعدّل خطتك الشهرية." },
      { property: "og:title", content: "أهدافي | بنك سَنَد" },
      { property: "og:description", content: "خطتك الادخارية وأهدافك في مكان واحد." },
    ],
  }),
  component: GoalsPage,
});

function GoalsPage() {
  const { goals } = useSanad();
  const [withdrawGoal, setWithdrawGoal] = useState<Goal | null>(null);

  return (
    <AppShell>
      <PageHeader title="أهدافي" subtitle={`${ar(goals.length)} أهداف نشطة`} />

      <div className="flex flex-col gap-4">
        {goals.map((g) => {
          const pct = Math.round((g.saved / g.target) * 100);
          return (
            <div key={g.id} className="surface p-5">
              <div className="flex items-start justify-between">
                <p className="font-bold">
                  {g.emoji} {g.title}
                </p>
                <span className="text-sm text-primary">{ar(pct)}%</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {ar(g.saved)} / {riyal(g.target)} • {etaLabel(g)}
              </p>
              <div className="mt-3 h-2 w-full rounded-full bg-secondary">
                <div className="h-2 rounded-full bg-primary" style={{ width: `${pct}%` }} />
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => {
                    setMonthlySaving(g.id, 750);
                    toast.success("تم تحديث خطتك إلى ٧٥٠ ر.س شهريًا");
                  }}
                  className="flex-1 rounded-2xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground"
                >
                  عدّل خطتي
                </button>
                <button
                  onClick={() => setWithdrawGoal(g)}
                  className="flex-1 rounded-2xl bg-secondary py-2.5 text-sm font-semibold text-secondary-foreground"
                >
                  سحب من المدخرات
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {withdrawGoal && <WithdrawSheet goal={withdrawGoal} onClose={() => setWithdrawGoal(null)} />}
    </AppShell>
  );
}

function WithdrawSheet({ goal, onClose }: { goal: Goal; onClose: () => void }) {
  const amount = 500;
  const before = etaLabel(goal);
  const after = etaLabel({ ...goal, saved: goal.saved - amount });
  const delayDays = Math.max(1, Math.round((amount / goal.monthly) * 30));

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-foreground/40" onClick={onClose}>
      <div
        dir="rtl"
        onClick={(e) => e.stopPropagation()}
        className="animate-soft-fade mx-auto w-full max-w-md rounded-t-3xl bg-card p-6"
      >
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-border" />
        <p className="flex items-center gap-2 text-xl font-bold">
          <Lock className="size-5 text-primary" /> لحظة...
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          سحب {riyal(amount)} من مدخراتك قد يؤخر وصولك لهدفك.
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-secondary p-4 text-center">
            <p className="text-xs text-muted-foreground">قبل السحب</p>
            <p className="mt-1 text-xs text-muted-foreground">الوصول المتوقع</p>
            <p className="mt-1 font-bold">{before}</p>
          </div>
          <div className="rounded-2xl bg-accent p-4 text-center">
            <p className="text-xs text-muted-foreground">بعد السحب</p>
            <p className="mt-1 text-xs text-muted-foreground">الوصول المتوقع</p>
            <p className="mt-1 font-bold text-primary">{after}</p>
          </div>
        </div>

        <p className="mt-4 text-center text-sm">قد يتأخر هدفك {ar(delayDays)} يومًا.</p>

        <div className="mt-6 flex flex-col gap-2">
          <button
            onClick={() => {
              toast.success("أبقينا مدخراتك كما هي 🔒");
              onClose();
            }}
            className="rounded-2xl bg-primary py-3 text-sm font-semibold text-primary-foreground"
          >
            أبقي مدخراتي
          </button>
          <button
            onClick={() => {
              withdrawFromGoal(goal.id, amount);
              toast(`تم سحب ${riyal(amount)} — حدّثنا تقدم هدفك.`);
              onClose();
            }}
            className="rounded-2xl bg-secondary py-3 text-sm font-semibold text-secondary-foreground"
          >
            اسحب على أي حال
          </button>
        </div>
      </div>
    </div>
  );
}
