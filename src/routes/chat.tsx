import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import symbol from "@/assets/sanad-symbol.png.asset.json";
import { useSanad, riyal, ar } from "@/lib/sanad-store";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "Sanad AI | مساعدك المالي الذكي" },
      { name: "description", content: "مساعد سَنَد الذكي يجاوبك عن أهدافك، ادخارك، ومصروفك بناءً على بياناتك." },
      { property: "og:title", content: "Sanad AI | مساعدك المالي الذكي" },
      { property: "og:description", content: "اسأل سَنَد عن هدفك وخطتك الادخارية." },
    ],
  }),
  component: ChatPage,
});

type Msg = { id: number; role: "user" | "ai"; text: string; cta?: boolean };

const suggestions = [
  "كيف أوصل لهدفي أسرع؟",
  "وين أقدر أوفر؟",
  "وش تأثير مصروفي على هدفي؟",
  "كم أحتاج أدخر شهريًا؟",
];

function ChatPage() {
  const { goals } = useSanad();
  const goal = goals[0];
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  function reply(q: string): Msg {
    const remaining = goal.target - goal.saved;
    if (q.includes("أسرع") || q.includes("هدفي أسرع"))
      return {
        id: Date.now() + 1,
        role: "ai",
        cta: true,
        text: `هدفك الحالي ${riyal(goal.target)}، والمدخر حاليًا ${riyal(goal.saved)}.\nإذا رفعت ادخارك الشهري من ${ar(600)} إلى ${riyal(750)}، تقدر توصل لهدفك أسرع بشهرين تقريبًا.`,
      };
    if (q.includes("أوفر") || q.includes("وين"))
      return {
        id: Date.now() + 1,
        role: "ai",
        cta: true,
        text: `أكبر فرصة توفير عندك في الاشتراكات (${riyal(310)} شهريًا) والمطاعم (${riyal(620)} شهريًا).\nتخفيض ٢٥٪ من الاثنين يعطيك ${riyal(232)} إضافية لهدفك كل شهر.`,
      };
    if (q.includes("مصروفي"))
      return {
        id: Date.now() + 1,
        role: "ai",
        cta: true,
        text: `مصروفك هذا الشهر ${riyal(4280)} مقابل ادخار ${riyal(1750)}.\nلو بقيت على نفس النمط، يتبقى لك ${riyal(remaining)} للهدف — أي حوالي ٦ أشهر.`,
      };
    if (q.includes("أدخر") || q.includes("شهريًا") || q.includes("كم"))
      return {
        id: Date.now() + 1,
        role: "ai",
        cta: true,
        text: `للوصول لهدفك في أبريل ٢٠٢٧ تحتاج ادخار ${riyal(600)} شهريًا.\nولو حبيت توصل قبلها بشهرين: ${riyal(750)} شهريًا.`,
      };
    return {
      id: Date.now() + 1,
      role: "ai",
      cta: true,
      text: `حسب بياناتك: مدخراتك ${riyal(goal.saved)} من ${riyal(goal.target)}، وادخارك الشهري ${riyal(goal.monthly)}.\nأقدر أساعدك تسرّع الوصول لهدفك أو تعدل خطتك الادخارية.`,
    };
  }

  function send(text: string) {
    const q = text.trim();
    if (!q) return;
    setMessages((m) => [...m, { id: Date.now(), role: "user", text: q }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, reply(q)]);
      setTyping(false);
      inputRef.current?.focus();
    }, 700);
  }

  return (
    <AppShell>
      <div className="flex flex-col">
        <header className="flex items-center gap-3">
          <img src={symbol.url} alt="سَنَد" className="h-11 w-auto" />
          <div>
            <h1 className="text-xl font-bold">Sanad AI</h1>
            <p className="text-sm text-muted-foreground">مساعدك المالي الذكي</p>
          </div>
        </header>

        {messages.length === 0 && (
          <div className="mt-6">
            <p className="text-lg font-bold">كيف أقدر أساعدك اليوم؟</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground shadow-soft"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 flex flex-col gap-4">
          {messages.map((m) =>
            m.role === "user" ? (
              <div key={m.id} className="self-start max-w-[85%] rounded-2xl bg-primary px-4 py-3 text-sm text-primary-foreground">
                {m.text}
              </div>
            ) : (
              <div key={m.id} className="max-w-[92%] self-end">
                <p className="mb-1 text-xs font-semibold text-primary">SANAD AI</p>
                <p className="text-sm leading-relaxed whitespace-pre-line text-foreground">{m.text}</p>
                {m.cta && (
                  <Link
                    to="/goals"
                    className="mt-3 inline-flex rounded-2xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                  >
                    عدّل خطتي
                  </Link>
                )}
              </div>
            ),
          )}
          {typing && <p className="self-end text-sm text-muted-foreground">سَنَد يكتب…</p>}
          <div ref={endRef} />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="fixed inset-x-0 bottom-20 mx-auto flex w-full max-w-md items-center gap-2 px-5"
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="اكتب سؤالك..."
            className="flex-1 rounded-2xl border border-border bg-card px-4 py-3 text-sm shadow-soft outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            type="submit"
            aria-label="إرسال"
            className="grid size-12 place-items-center rounded-2xl bg-primary text-primary-foreground"
          >
            <Send className="size-5" />
          </button>
        </form>
      </div>
    </AppShell>
  );
}
