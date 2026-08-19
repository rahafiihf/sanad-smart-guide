import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Accessibility, Type, Ear, Hand, Eye, ChevronLeft } from "lucide-react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { toast } from "sonner";

export const Route = createFileRoute("/maysar")({
  head: () => ({
    meta: [
      { title: "سَنَد مُيسّر | تجربة مصرفية للجميع" },
      { name: "description", content: "سَنَد مُيسّر: تجربة مصرفية مصممة لسهولة الوصول — سَنَد يتكيّف معك، مو العكس." },
      { property: "og:title", content: "سَنَد مُيسّر | تجربة مصرفية للجميع" },
      { property: "og:description", content: "خيارات وصول، وبطاقة مُيسّر، وخدمات بدون زيارة الفرع." },
    ],
  }),
  component: MaysarPage,
});

const options = [
  { label: "تكبير النص", desc: "خط أوضح وأكبر في كل الشاشات", icon: Type },
  { label: "قراءة صوتية", desc: "استمع لأرصدتك وعملياتك", icon: Ear },
  { label: "تباين عالٍ", desc: "ألوان أوضح وحدود أقوى", icon: Eye },
  { label: "لمسة واحدة", desc: "اختصارات كبيرة وسهلة الوصول", icon: Hand },
];

function MaysarPage() {
  const [active, setActive] = useState<string[]>(["تكبير النص"]);

  function toggle(label: string) {
    setActive((a) => (a.includes(label) ? a.filter((x) => x !== label) : [...a, label]));
  }

  return (
    <AppShell>
      <PageHeader title="سَنَد مُيسّر" subtitle="سَنَد يتكيّف معك، مو العكس." />

      <section className="card-gradient shadow-raised rounded-3xl p-6 text-primary-foreground">
        <Accessibility className="size-7" />
        <p className="mt-3 text-lg font-bold">تجربة مصرفية مصممة للوصول</p>
        <p className="mt-2 text-sm opacity-80">
          خيارات تتحكم فيها أنت، بنفس جودة وتصميم تجربة سَنَد الأساسية.
        </p>
      </section>

      <h2 className="mt-7 mb-3 text-lg font-bold">خيارات الوصول</h2>
      <div className="flex flex-col gap-3">
        {options.map(({ label, desc, icon: Icon }) => {
          const on = active.includes(label);
          return (
            <button
              key={label}
              onClick={() => toggle(label)}
              className="surface flex items-center justify-between p-4 text-right"
            >
              <span className="flex items-center gap-3">
                <Icon className="size-5 text-primary" />
                <span>
                  <span className="block font-semibold">{label}</span>
                  <span className="block text-sm text-muted-foreground">{desc}</span>
                </span>
              </span>
              <span
                className={`flex h-7 w-12 items-center rounded-full p-1 transition-colors ${
                  on ? "bg-primary" : "bg-secondary"
                }`}
              >
                <span
                  className={`size-5 rounded-full bg-card transition-transform ${on ? "-translate-x-5" : ""}`}
                />
              </span>
            </button>
          );
        })}
      </div>

      <h2 className="mt-7 mb-3 text-lg font-bold">بطاقة سَنَد مُيسّر</h2>
      <div className="card-gradient shadow-raised rounded-3xl p-6 text-primary-foreground">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold tracking-widest">SANAD</span>
          <span className="flex gap-1" aria-hidden>
            <span className="size-2 rounded-full bg-primary-foreground/80" />
            <span className="size-2 rounded-full bg-primary-foreground/60" />
            <span className="size-2 rounded-full bg-primary-foreground/40" />
          </span>
        </div>
        <p className="mt-8 text-2xl font-semibold tracking-[0.18em]">**** **** **** 4821</p>
        <div className="mt-6 flex items-center justify-between">
          <p className="text-base font-semibold">RAHAF H.</p>
          <span className="rounded-full bg-primary-foreground/15 px-3 py-1 text-xs">علامة لمسية</span>
        </div>
      </div>
      <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">
        <li>• تصميم بصري واضح وتباين مريح</li>
        <li>• حافة محززة تسهّل معرفة اتجاه البطاقة</li>
        <li>• علامة لمسية للتعرف السريع</li>
        <li>• ترتيب بيانات بسيط وسهل القراءة</li>
      </ul>
      <p className="mt-3 text-sm">بطاقة مصممة لتجربة مصرفية أسهل وأكثر وصولًا.</p>
      <button
        onClick={() => toast.success("تم إرسال طلب بطاقة سَنَد مُيسّر (نموذج تجريبي)")}
        className="mt-4 w-full rounded-2xl bg-primary py-3 text-sm font-semibold text-primary-foreground"
      >
        اطلب البطاقة
      </button>

      <h2 className="mt-7 mb-3 text-lg font-bold">خدمات بدون زيارة الفرع</h2>
      <Link to="/services" className="surface flex items-center justify-between p-5">
        <div>
          <p className="font-semibold">أنجز خدماتك من مكانك.</p>
          <p className="text-sm text-muted-foreground">تحديث البيانات، طلب بطاقة، الدعم، وأكثر.</p>
        </div>
        <ChevronLeft className="size-5 text-muted-foreground" />
      </Link>

      <p className="mt-5 text-center text-xs text-muted-foreground">
        نموذج تجريبي لأغراض العرض فقط — بدون عمليات مصرفية حقيقية.
      </p>
    </AppShell>
  );
}
