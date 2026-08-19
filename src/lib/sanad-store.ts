import { useSyncExternalStore } from "react";

export type Goal = {
  id: string;
  emoji: string;
  title: string;
  saved: number;
  target: number;
  monthly: number;
  eta: string;
};

export type SanadState = {
  balance: number;
  monthlySaving: number;
  streakWeeks: number;
  goals: Goal[];
};

const initial: SanadState = {
  balance: 24850,
  monthlySaving: 600,
  streakWeeks: 12,
  goals: [
    {
      id: "cyber",
      emoji: "🎓",
      title: "شهادة الأمن السيبراني",
      saved: 8400,
      target: 12000,
      monthly: 600,
      eta: "أبريل ٢٠٢٧",
    },
    { id: "japan", emoji: "✈️", title: "رحلة اليابان", saved: 3400, target: 8000, monthly: 400, eta: "مارس ٢٠٢٧" },
    { id: "device", emoji: "💻", title: "جهاز جديد", saved: 4650, target: 6000, monthly: 350, eta: "نوفمبر ٢٠٢٦" },
    { id: "project", emoji: "🚀", title: "مشروعي الخاص", saved: 6100, target: 30000, monthly: 800, eta: "٢٠٢٨" },
  ],
};

let state: SanadState = initial;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getState() {
  return state;
}

export function useSanad() {
  return useSyncExternalStore(subscribe, getState, getState);
}

export function withdrawFromGoal(goalId: string, amount: number) {
  state = {
    ...state,
    balance: state.balance + amount,
    goals: state.goals.map((g) => (g.id === goalId ? { ...g, saved: Math.max(0, g.saved - amount) } : g)),
  };
  emit();
}

export function setMonthlySaving(goalId: string, monthly: number) {
  state = {
    ...state,
    monthlySaving: monthly,
    goals: state.goals.map((g) => (g.id === goalId ? { ...g, monthly } : g)),
  };
  emit();
}

const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

export function ar(n: number) {
  return n
    .toLocaleString("en-US")
    .replace(/,/g, "٬")
    .replace(/\d/g, (d) => arabicDigits[Number(d)]);
}

export function riyal(n: number) {
  return `${ar(n)} ر.س`;
}

export function monthsToFinish(goal: Goal, monthly = goal.monthly) {
  const remaining = Math.max(0, goal.target - goal.saved);
  if (monthly <= 0) return Infinity;
  return Math.ceil(remaining / monthly);
}

const months = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
];

export function etaLabel(goal: Goal, extraMonths = 0, monthly = goal.monthly) {
  const m = monthsToFinish(goal, monthly) + extraMonths;
  const base = new Date(2026, 7, 1);
  base.setMonth(base.getMonth() + m);
  return `${months[base.getMonth()]} ${ar(base.getFullYear())}`;
}
