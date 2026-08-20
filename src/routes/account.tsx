import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Shield, Bell, FileText, HelpCircle, Gauge, Flame } from "lucide-react";
import { AppShell, PageHeader } from "@/components/AppShell";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "حسابي | بنك سَنَد" },
      { name: "description", content: "إعدادات حسابك في بنك سَنَد والخدمات بدون زيارة الفرع." },
      { property: "og:title", content: "حسابي | بنك سَنَد" },
      { property: "og:description", content: "تحكم في حسابك وتفضيلاتك في بنك سَنَد." },
    ],
  }),
  component: AccountPage,
});

const settings = [
  { label: "بيانات الحساب", icon: FileText },
  { label: "الأمان", icon: Shield },
  { label: "الإشعارات", icon: Bell },
  { label: "حدود العمليات", icon: Gauge },
  { label: "المساعدة", icon: HelpCircle },
];

function AccountPage() {
  return (
    <AppShell>
      <PageHeader title="حسابي" />

      <div className="surface flex items-center gap-4 p-5">
        <span className="grid size-14 place-items-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
          ر ح
        </span>
        <div>
          <p className="font-bold">رهف حمدان</p>
          <p className="text-xs text-muted-foreground">SA03 8000 0000 6080 1016 4821</p>
        </div>
      </div>

      <h2 className="mt-7 mb-3 text-lg font-bold">تجارب سَنَد</h2>
      <div className="flex flex-col gap-3">
        <NavCard to="/services" icon={FileText} title="خدمات بدون زيارة الفرع" desc="أنجز خدماتك من مكانك." />
        <NavCard to="/streak" icon={Flame} title="Sanad Streak" desc="استمرارك هو إنجازك." />
      </div>

      <h2 className="mt-7 mb-3 text-lg font-bold">الإعدادات</h2>
      <div className="surface divide-y divide-border">
        {settings.map(({ label, icon: Icon }) => (
          <div key={label} className="flex items-center justify-between p-4">
            <span className="flex items-center gap-3 text-sm">
              <Icon className="size-4 text-primary" />
              {label}
            </span>
            <ChevronLeft className="size-4 text-muted-foreground" />
          </div>
        ))}
      </div>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        نموذج تجريبي لأغراض العرض فقط — بيانات وهمية، بدون عمليات مصرفية حقيقية.
        <br />
        بنك سَنَد.. سندك المالي
      </p>
    </AppShell>
  );
}

function NavCard({
  to,
  icon: Icon,
  title,
  desc,
}: {
  to: string;
  icon: typeof FileText;
  title: string;
  desc: string;
}) {
  return (
    <Link to={to} className="surface flex items-center justify-between p-4">
      <span className="flex items-center gap-3">
        <Icon className="size-5 text-primary" />
        <span>
          <span className="block font-semibold">{title}</span>
          <span className="block text-sm text-muted-foreground">{desc}</span>
        </span>
      </span>
      <ChevronLeft className="size-5 text-muted-foreground" />
    </Link>
  );
}
