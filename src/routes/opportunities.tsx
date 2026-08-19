import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { riyal, useSanad, ar } from "@/lib/sanad-store";

export const Route = createFileRoute("/opportunities")({
  head: () => ({
    meta: [
      { title: "فرصك | بنك سَنَد" },
      { name: "description", content: "فرصك القادمة في بنك سَنَد — من الهدف إلى الخطوة العملية." },
      { property: "og:title", content: "فرصك | بنك سَنَد" },
      { property: "og:description", content: "اكتشف فرصتك القادمة وخطتها الادخارية." },
    ],
  }),
  component: OpportunitiesPage,
});

const items = [
  { tag: "🎓 تطوير مهني", title: "شهادة الأمن السيبراني", note: "الأقرب لك حسب هدفك الحالي." },
  { tag: "💼 دخل إضافي", title: "دورة العمل الحر", note: "قد تزيد دخلك الشهري ١٢٪." },
  { tag: "🏠 استقرار", title: "خطة السكن الأولى", note: "ابدأ بادخار ٩٠٠ ر.س شهريًا." },
];

function OpportunitiesPage() {
  const { goals } = useSanad();
  const main = goals[0];
  const pct = Math.round((main.saved / main.target) * 100);

  return (
    <AppShell>
      <PageHeader title="فرصك" subtitle="أنت قريب من فرصتك القادمة." />

      <div className="surface p-5">
        <span className="rounded-full bg-secondary px-3 py-1 text-xs">🎓 تطوير مهني</span>
        <p className="mt-3 text-lg font-bold">{main.title}</p>
        <div className="mt-3 h-2 w-full rounded-full bg-secondary">
          <div className="h-2 rounded-full bg-primary" style={{ width: `${pct}%` }} />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          {ar(pct)}% — تبقى {riyal(main.target - main.saved)} للوصول لهدفك
        </p>
        <Link
          to="/goals"
          className="mt-4 inline-flex rounded-2xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          استكشف الفرصة
        </Link>
      </div>

      <h2 className="mt-7 mb-3 text-lg font-bold">خريطة الفرص</h2>
      <div className="flex flex-col gap-3">
        {items.map((i) => (
          <div key={i.title} className="surface p-4">
            <span className="text-xs text-muted-foreground">{i.tag}</span>
            <p className="mt-1 font-semibold">{i.title}</p>
            <p className="text-sm text-muted-foreground">{i.note}</p>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
