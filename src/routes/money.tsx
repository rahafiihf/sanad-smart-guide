import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { riyal, useSanad } from "@/lib/sanad-store";

export const Route = createFileRoute("/money")({
  head: () => ({
    meta: [
      { title: "أموالي | بنك سَنَد" },
      { name: "description", content: "صورتك المالية في بنك سَنَد: إنفاقك، ادخارك، وعملياتك الأخيرة." },
      { property: "og:title", content: "أموالي | بنك سَنَد" },
      { property: "og:description", content: "افهم مالك وشوف أين يذهب كل ريال." },
    ],
  }),
  component: MoneyPage,
});

const spend = [
  { emoji: "🛍️", label: "تسوق", amount: 850 },
  { emoji: "🍽️", label: "مطاعم", amount: 620 },
  { emoji: "🚗", label: "مواصلات", amount: 310 },
  { emoji: "🧾", label: "فواتير", amount: 260 },
];

const tx = [
  { emoji: "🛍️", title: "نون", meta: "تسوق • ١٧ أغسطس ٢٠٢٦", amount: "− ٢٤٩ ر.س" },
  { emoji: "💰", title: "تحويل وارد — عبدالله ح.", meta: "دخل • ١٦ أغسطس ٢٠٢٦", amount: "+ ٢٬٥٠٠ ر.س" },
  { emoji: "📱", title: "STC", meta: "اشتراكات • ١٥ أغسطس ٢٠٢٦", amount: "− ٧٩ ر.س" },
  { emoji: "☕", title: "مقهى ذا رووم", meta: "مطاعم • ١٥ أغسطس ٢٠٢٦", amount: "− ٢٨ ر.س" },
];

function MoneyPage() {
  const { balance } = useSanad();
  return (
    <AppShell>
      <PageHeader title="المال" subtitle="ماذا حدث بمالك؟" />

      <div className="card-gradient shadow-raised rounded-3xl p-6 text-primary-foreground">
        <p className="text-sm opacity-80">الرصيد المتاح</p>
        <p className="mt-1 text-3xl font-bold">{riyal(balance)}</p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {spend.map((s) => (
          <div key={s.label} className="surface p-4">
            <p className="text-2xl">{s.emoji}</p>
            <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
            <p className="font-bold">{riyal(s.amount)}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-7 mb-3 text-lg font-bold">عملياتك الأخيرة</h2>
      <div className="surface divide-y divide-border">
        {tx.map((t) => (
          <div key={t.title} className="flex items-center justify-between p-4">
            <span className="flex items-center gap-3">
              <span className="text-xl">{t.emoji}</span>
              <span>
                <span className="block text-sm font-semibold">{t.title}</span>
                <span className="block text-xs text-muted-foreground">{t.meta}</span>
              </span>
            </span>
            <span className="text-sm font-semibold">{t.amount}</span>
          </div>
        ))}
      </div>

      <Link
        to="/chat"
        className="mt-5 block rounded-2xl bg-primary py-3 text-center text-sm font-semibold text-primary-foreground"
      >
        حلّل أموالي مع Sanad AI
      </Link>
    </AppShell>
  );
}
