import { createFileRoute, Link } from "@tanstack/react-router";
import { Snowflake, Eye, Wallet, Gauge, RefreshCw, Settings, Accessibility, ChevronLeft } from "lucide-react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { riyal, useSanad } from "@/lib/sanad-store";

export const Route = createFileRoute("/cards")({
  head: () => ({
    meta: [
      { title: "البطاقات | بنك سَنَد" },
      { name: "description", content: "بطاقات سَنَد الافتراضية وبطاقة سَنَد مُيسّر مع التحكم بالإنفاق." },
      { property: "og:title", content: "البطاقات | بنك سَنَد" },
      { property: "og:description", content: "إدارة بطاقاتك وحدود إنفاقك في بنك سَنَد." },
    ],
  }),
  component: CardsPage,
});

const actions = [
  { label: "تجميد البطاقة", icon: Snowflake },
  { label: "إظهار البيانات", icon: Eye },
  { label: "إضافة للمحفظة", icon: Wallet },
  { label: "حد الإنفاق", icon: Gauge },
  { label: "استبدال البطاقة", icon: RefreshCw },
  { label: "إعدادات", icon: Settings },
];

function CardsPage() {
  const { balance } = useSanad();

  return (
    <AppShell>
      <PageHeader title="البطاقات" subtitle="بطاقة سَنَد الافتراضية" />

      <div className="card-gradient shadow-raised rounded-3xl p-6 text-primary-foreground">
        <div className="flex items-center justify-between text-sm font-semibold tracking-widest">
          <span>SANAD</span>
          <span className="opacity-70">VIRTUAL</span>
        </div>
        <p className="mt-10 text-xl tracking-[0.2em]">•••• •••• •••• 4821</p>
        <div className="mt-6 flex items-end justify-between text-xs opacity-80">
          <div>
            <p>CARD HOLDER</p>
            <p className="mt-1 text-sm font-semibold opacity-100">RAHAF H.</p>
          </div>
          <div>
            <p>EXPIRES</p>
            <p className="mt-1 text-sm font-semibold opacity-100">08/29</p>
          </div>
          <div>
            <p>CVV</p>
            <p className="mt-1 text-sm font-semibold opacity-100">•••</p>
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        الرصيد المرتبط — رهف حمدان <span className="font-bold text-foreground">{riyal(balance)}</span>
      </p>

      <div className="mt-5 grid grid-cols-3 gap-3">
        {actions.map(({ label, icon: Icon }) => (
          <button key={label} className="surface flex flex-col items-center gap-2 p-4 text-xs text-muted-foreground">
            <Icon className="size-5 text-primary" />
            {label}
          </button>
        ))}
      </div>

      <h2 className="mt-7 mb-3 text-lg font-bold">التحكم بالإنفاق</h2>
      <div className="surface p-5">
        <Limit label="الحد اليومي" value={riyal(500)} used="استُخدم اليوم: ٣٢٠ ر.س" pct={64} />
        <div className="mt-4">
          <Limit label="الحد الشهري" value={riyal(8000)} used="استُخدم هذا الشهر: ٤٬٢٨٠ ر.س" pct={53} />
        </div>
      </div>

      <h2 className="mt-7 mb-3 text-lg font-bold">بطاقة سَنَد مُيسّر</h2>
      <Link to="/maysar" className="surface flex items-center justify-between p-5">
        <div className="flex items-center gap-3">
          <Accessibility className="size-5 text-primary" />
          <div>
            <p className="font-semibold">تجربة مصرفية أسهل وأكثر وصولًا</p>
            <p className="text-sm text-muted-foreground">سَنَد يتكيّف معك، مو العكس.</p>
          </div>
        </div>
        <ChevronLeft className="size-5 text-muted-foreground" />
      </Link>
    </AppShell>
  );
}

function Limit({ label, value, used, pct }: { label: string; value: string; used: string; pct: number }) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-bold">{value}</span>
      </div>
      <div className="mt-2 h-2 w-full rounded-full bg-secondary">
        <div className="h-2 rounded-full bg-primary" style={{ width: `${pct}%` }} />
      </div>
      <p className="mt-1 text-xs text-muted-foreground">{used}</p>
    </div>
  );
}
