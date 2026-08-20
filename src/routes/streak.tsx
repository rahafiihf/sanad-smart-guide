import { createFileRoute } from "@tanstack/react-router";
import { Flame, Check, Lock } from "lucide-react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { useSanad, ar } from "@/lib/sanad-store";

export const Route = createFileRoute("/streak")({
  head: () => ({
    meta: [
      { title: "Sanad Streak | كاش باك الاستمرارية" },
      { name: "description", content: "استمر في الادخار مع بنك سَنَد واحصل على كاش باك متدرج يزيد مع كل شهر." },
      { property: "og:title", content: "Sanad Streak | كاش باك الاستمرارية" },
      { property: "og:description", content: "استمرارك هو إنجازك — كاش باك يزيد مع كل شهر حتى ٠٫١٠٪." },
    ],
  }),
  component: StreakPage,
});

const MAX_MONTH = 10;

function cashbackFor(months: number) {
  const m = Math.min(Math.max(months, 0), MAX_MONTH);
  return m < 2 ? 0 : m / 100;
}

function fmtPct(v: number) {
  return `${v.toFixed(2).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[Number(d)]!).replace(".", "٫")}٪`;
}

function monthLabel(n: number, suffix = "") {
  if (n === 1) return `شهر${suffix}`;
  if (n === 2) return `شهرين${suffix}`;
  if (n <= 10) return `${ar(n)} أشهر${suffix}`;
  return `${ar(n)} شهر${suffix}`;
}

const milestones = Array.from({ length: MAX_MONTH - 1 }, (_, i) => {
  const months = i + 2;
  return { months, rate: cashbackFor(months), top: months === MAX_MONTH };
});

function StreakPage() {
  const { streakMonths } = useSanad();
  const rate = cashbackFor(streakMonths);
  const next = milestones.find((m) => m.months > streakMonths);
  const progress = next
    ? Math.min(100, Math.round((streakMonths / next.months) * 100))
    : 100;

  const journeyMonths = Math.max(12, streakMonths + 4);

  return (
    <AppShell>
      <PageHeader title="Sanad Streak" subtitle="نكافئ الاستمرارية، مو الثروة." />

      <section className="card-gradient shadow-raised rounded-3xl p-6 text-center text-primary-foreground">
        <Flame className="mx-auto size-8" />
        <p className="mt-2 text-4xl font-bold">{monthLabel(streakMonths, " متتالي")}</p>
        <p className="mt-2 text-sm opacity-80">
          استمريت على خطتك لمدة {monthLabel(streakMonths)} — والستريك مستمر.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-4 py-2 text-sm font-semibold">
          <Flame className="size-4" />
          Cash Back الحالي {fmtPct(rate)}
        </div>
      </section>

      <h2 className="mt-7 mb-3 text-lg font-bold">رحلتك</h2>
      <div className="surface grid grid-cols-4 gap-3 p-5">
        {Array.from({ length: journeyMonths }, (_, i) => i + 1).map((m) => (
          <div key={m} className="flex flex-col items-center gap-1">
            <span
              className={`grid size-10 place-items-center rounded-full ${
                m <= streakMonths ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
              }`}
            >
              <Check className="size-4" />
            </span>
            <span className="text-[11px] text-muted-foreground">شهر {ar(m)}</span>
          </div>
        ))}
      </div>

      <div className="surface mt-5 p-5">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{next ? "المرحلة القادمة" : "أعلى مرحلة"}</span>
          <span className="font-bold">
            {next
              ? `${monthLabel(next.months)} — ${fmtPct(next.rate)}`
              : `${fmtPct(cashbackFor(MAX_MONTH))} Cash Back`}
          </span>
        </div>
        <div className="mt-3 h-2 w-full rounded-full bg-secondary">
          <div className="h-2 rounded-full bg-primary" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          {next
            ? `باقي ${monthLabel(Math.max(0, next.months - streakMonths))} للوصول إلى ${fmtPct(next.rate)} Cash Back.`
            : `وصلت لأعلى نسبة كاش باك ${fmtPct(cashbackFor(MAX_MONTH))} — الستريك يستمر والنسبة تبقى مفعّلة.`}
        </p>
      </div>

      <h2 className="mt-7 mb-3 text-lg font-bold">مراحل كاش باك الاستمرارية</h2>
      <div className="flex flex-col gap-3">
        {milestones.map((m) => {
          const unlocked = streakMonths >= m.months;
          return (
            <div key={m.months} className="surface flex items-center justify-between p-4">
              <div>
                <p className="font-semibold">
                  {monthLabel(m.months)}
                  {m.top ? " فأكثر" : ""}
                </p>
                <p className="text-sm text-muted-foreground">{fmtPct(m.rate)} Cash Back 🔥</p>
              </div>
              <span
                className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs ${
                  unlocked ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                }`}
              >
                {unlocked ? <Check className="size-3" /> : <Lock className="size-3" />}
                {unlocked ? "مُفعّلة" : "مقفلة"}
              </span>
            </div>
          );
        })}
      </div>

      <p className="mt-5 text-center text-xs text-muted-foreground">
        الكاش باك تجريبي لأغراض العرض فقط — بدون قيمة نقدية حقيقية.
      </p>
    </AppShell>
  );
}
