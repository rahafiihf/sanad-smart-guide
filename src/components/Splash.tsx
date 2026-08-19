import { useEffect, useState } from "react";
import symbol from "@/assets/sanad-symbol.png.asset.json";
import word from "@/assets/sanad-word.png.asset.json";
import tag from "@/assets/sanad-tag.png.asset.json";

export function Splash({ onDone }: { onDone: () => void }) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const out = setTimeout(() => setLeaving(true), 3200);
    const done = setTimeout(onDone, 3800);
    return () => {
      clearTimeout(out);
      clearTimeout(done);
    };
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-background ${
        leaving ? "animate-splash-out" : ""
      }`}
    >
      <img
        src={symbol.url}
        alt="شعار بنك سند"
        className="animate-rise h-44 w-auto object-contain"
        style={{ animationDelay: "0.1s" }}
      />
      <img
        src={word.url}
        alt="سند SANAD"
        className="animate-soft-fade mt-4 h-24 w-auto object-contain"
        style={{ animationDelay: "1.1s" }}
      />

      <img
        src={tag.url}
        alt="بنك سند.. سندك المالي"
        className="animate-line mt-4 h-10 w-auto object-contain"
        style={{ animationDelay: "1.9s" }}
      />
    </div>
  );
}
