import { createFileRoute } from "@tanstack/react-router";
import { Flame, Check, Lock } from "lucide-react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { useSanad, ar } from "@/lib/sanad-store";

export const Route = createFileRoute("/streak")({
  head: () => ({
    meta: [
      { title: "Sanad Streak | كاش باك الاستمرارية" },
      { name: "description", content: "استمر في الادخار مع بنك سَنَد واحصل على كاش باك متدرج يزيد مع كل أسبوع." },
      { property: "og:title", content: "Sanad Streak | كاش باك الاستمرارية" },
      { property: "og:description", content: "استمرارك هو إنجازك — كاش باك يزيد مع كل أسبوع حتى ٠٫١٠٪." },
    ],
  }),
  component: StreakPage,
});

const MAX_WEEK = 10;

function cashbackFor(weeks: number) {
  const w = Math.min(Math.max(weeks, 0), MAX_WEEK);
  return w < 2 ? 0 : w / 100;
}

function fmtPct(v: number) {
  return `${v.toFixed(2).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[Number(d)]!).replace(".", "٫")}٪`;
}

const milestones = Array.from({ length: MAX_WEEK - 1 }, (_, i) => {
  const weeks = i + 2;
  return { weeks, rate: cashbackFor(weeks), top: weeks === MAX_WEEK };
});

function StreakPage() {
  const { streakWeeks } = useSanad();
  const rate = cashbackFor(streakWeeks);
  const next = milestones.find((m) => m.weeks > streakWeeks);
  const progress = next
    ? Math.min(100, Math.round((streakWeeks / next.weeks) * 100))
    : 100;

  const journeyWeeks = Math.max(12, streakWeeks + 4);

  return (
    <AppShell>
      <PageHeader title="Sanad Streak" subtitle="نكافئ الاستمرارية، مو الثروة." />

      <section className="card-gradient shadow-raised rounded-3xl p-6 text-center text-primary-foreground">
        <Flame className="mx-auto size-8" />
        <p className="mt-2 text-4xl font-bold">{ar(streakWeeks)} أسبوع</p>
        <p className="mt-2 text-sm opacity-80">استمريت على خطتك لمدة {ar(streakWeeks)} أسبوع — والستريك مستمر.</p>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-4 py-2 text-sm font-semibold">
          <Flame className="size-4" />
          Cash Back الحالي {fmtPct(rate)}
        </div>
      </section>

      <h2 className="mt-7 mb-3 text-lg font-bold">رحلتك</h2>
      <div className="surface grid grid-cols-4 gap-3 p-5">
        {Array.from({ length: journeyWeeks }, (_, i) => i + 1).map((w) => (
          <div key={w} className="flex flex-col items-center gap-1">
            <span
              className={`grid size-10 place-items-center rounded-full ${
                w <= streakWeeks ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
              }`}
            >
              <Check className="size-4" />
            </span>
            <span className="text-[11px] text-muted-foreground">أسبوع {ar(w)}</span>
          </div>
        ))}
      </div>

      <div className="surface mt-5 p-5">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{next ? "المرحلة القادمة" : "أعلى مرحلة"}</span>
          <span className="font-bold">
            {next ? `${ar(next.weeks)} أسبوع — ${fmtPct(next.rate)}` : `${fmtPct(cashbackFor(MAX_WEEK))} Cash Back`}
          </span>
        </div>
        <div className="mt-3 h-2 w-full rounded-full bg-secondary">
          <div className="h-2 rounded-full bg-primary" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          {next
            ? `باقي ${ar(Math.max(0, next.weeks - streakWeeks))} أسبوع للوصول إلى ${fmtPct(next.rate)} Cash Back.`
            : `وصلت لأعلى نسبة كاش باك ${fmtPct(cashbackFor(MAX_WEEK))} — الستريك يستمر والنسبة تبقى مفعّلة.`}
        </p>
      </div>

      <h2 className="mt-7 mb-3 text-lg font-bold">مراحل كاش باك الاستمرارية</h2>
      <div className="flex flex-col gap-3">
        {milestones.map((m) => {
          const unlocked = streakWeeks >= m.weeks;
          return (
            <div key={m.weeks} className="surface flex items-center justify-between p-4">
              <div>
                <p className="font-semibold">
                  {m.weeks === 2 ? "أسبوعين" : `${ar(m.weeks)} أسابيع`}
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
