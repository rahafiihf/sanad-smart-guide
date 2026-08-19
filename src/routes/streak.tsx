import { createFileRoute } from "@tanstack/react-router";
import { Flame, Check, Lock } from "lucide-react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { useSanad, ar } from "@/lib/sanad-store";

export const Route = createFileRoute("/streak")({
  head: () => ({
    meta: [
      { title: "Sanad Streak | استمراريتك الادخارية" },
      { name: "description", content: "تتبع استمراريتك على خطة الادخار في بنك سَنَد ومكافآت المراحل." },
      { property: "og:title", content: "Sanad Streak | استمراريتك الادخارية" },
      { property: "og:description", content: "استمرارك هو إنجازك — تابع أسابيعك ومراحلك." },
    ],
  }),
  component: StreakPage,
});

const milestones = [
  { weeks: 7, reward: "شارة الاستمرارية" },
  { weeks: 15, reward: "مكافأة خاصة" },
  { weeks: 30, reward: "ميزة من شركاء سَنَد" },
  { weeks: 60, reward: "عضوية سَنَد المميزة" },
];

function StreakPage() {
  const { streakWeeks } = useSanad();
  const next = milestones.find((m) => m.weeks > streakWeeks) ?? milestones[milestones.length - 1];
  const progress = Math.min(100, Math.round((streakWeeks / next.weeks) * 100));

  return (
    <AppShell>
      <PageHeader title="Sanad Streak" subtitle="نكافئ الاستمرارية، مو الثروة." />

      <section className="card-gradient shadow-raised rounded-3xl p-6 text-center text-primary-foreground">
        <Flame className="mx-auto size-8" />
        <p className="mt-2 text-4xl font-bold">{ar(streakWeeks)} أسبوع</p>
        <p className="mt-2 text-sm opacity-80">استمريت على خطتك لمدة {ar(streakWeeks)} أسبوع.</p>
      </section>

      <h2 className="mt-7 mb-3 text-lg font-bold">رحلتك</h2>
      <div className="surface grid grid-cols-4 gap-3 p-5">
        {Array.from({ length: 12 }, (_, i) => i + 1).map((w) => (
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
          <span className="text-muted-foreground">المرحلة القادمة</span>
          <span className="font-bold">{ar(next.weeks)} أسبوع</span>
        </div>
        <div className="mt-3 h-2 w-full rounded-full bg-secondary">
          <div className="h-2 rounded-full bg-primary" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          باقي {ar(Math.max(0, next.weeks - streakWeeks))} أسابيع على «{next.reward}».
        </p>
      </div>

      <h2 className="mt-7 mb-3 text-lg font-bold">المراحل والمكافآت</h2>
      <div className="flex flex-col gap-3">
        {milestones.map((m) => {
          const unlocked = streakWeeks >= m.weeks;
          return (
            <div key={m.weeks} className="surface flex items-center justify-between p-4">
              <div>
                <p className="font-semibold">{ar(m.weeks)} أسابيع</p>
                <p className="text-sm text-muted-foreground">{m.reward}</p>
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
        المكافآت تجريبية لأغراض العرض فقط — بدون قيمة نقدية حقيقية.
      </p>
    </AppShell>
  );
}
