import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { UserPen, CreditCard, Settings2, Headphones, LifeBuoy, Home, Check } from "lucide-react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { toast } from "sonner";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "خدمات بدون زيارة الفرع | بنك سَنَد" },
      { name: "description", content: "أنجز خدماتك المصرفية من مكانك: تحديث البيانات، طلب بطاقة، الدعم، وطلب خدمة منزلية." },
      { property: "og:title", content: "خدمات بدون زيارة الفرع | بنك سَنَد" },
      { property: "og:description", content: "أنجز خدماتك من مكانك مع بنك سَنَد." },
    ],
  }),
  component: ServicesPage,
});

const services = [
  { id: "data", label: "تحديث البيانات", icon: UserPen },
  { id: "card", label: "طلب بطاقة", icon: CreditCard },
  { id: "account", label: "إدارة الحساب", icon: Settings2 },
  { id: "support", label: "التواصل مع الدعم", icon: Headphones },
  { id: "help", label: "طلب مساعدة", icon: LifeBuoy },
];

function ServicesPage() {
  const [done, setDone] = useState<string[]>([]);
  const [home, setHome] = useState(false);

  function request(id: string, label: string) {
    setDone((d) => (d.includes(id) ? d : [...d, id]));
    toast.success(`تم استلام طلب «${label}» — سنتواصل معك خلال ٢٤ ساعة (نموذج تجريبي)`);
  }

  return (
    <AppShell>
      <PageHeader title="خدمات بدون زيارة الفرع" subtitle="أنجز خدماتك من مكانك." />

      <div className="flex flex-col gap-3">
        {services.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => request(id, label)}
            className="surface flex items-center justify-between p-4 text-right"
          >
            <span className="flex items-center gap-3">
              <Icon className="size-5 text-primary" />
              <span className="font-semibold">{label}</span>
            </span>
            <span className={`text-xs ${done.includes(id) ? "text-primary" : "text-muted-foreground"}`}>
              {done.includes(id) ? (
                <span className="flex items-center gap-1">
                  <Check className="size-4" /> تم الطلب
                </span>
              ) : (
                "اطلب"
              )}
            </span>
          </button>
        ))}
      </div>

      <div className="surface mt-5 p-5">
        <p className="flex items-center gap-2 font-bold">
          <Home className="size-5 text-primary" /> طلب خدمة منزلية
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          يزورك موظف سَنَد في موقعك لإنهاء الإجراءات التي تحتاج حضورًا شخصيًا.
        </p>
        <button
          onClick={() => {
            setHome(true);
            toast.success("تم جدولة زيارة منزلية — غدًا ١١:٠٠ ص (نموذج تجريبي)");
          }}
          className="mt-4 w-full rounded-2xl bg-primary py-3 text-sm font-semibold text-primary-foreground"
        >
          {home ? "تم جدولة الزيارة ✓" : "اطلب زيارة منزلية"}
        </button>
      </div>

      <p className="mt-5 text-center text-xs text-muted-foreground">
        نموذج تجريبي لأغراض العرض فقط — بدون عمليات مصرفية حقيقية.
      </p>
    </AppShell>
  );
}
