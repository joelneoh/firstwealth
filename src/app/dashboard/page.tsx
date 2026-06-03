"use client";

import Link from "next/link";
import { ArrowRight, CalendarCheck } from "lucide-react";
import { AlertCard } from "@/components/AlertCard";
import { HoldingCard } from "@/components/HoldingCard";
import { PortfolioUnderstandingScore } from "@/components/PortfolioUnderstandingScore";
import { calculatePortfolioUnderstandingScore } from "@/lib/mock-ai";
import { useStore } from "@/lib/store";

export default function DashboardPage() {
  const { data } = useStore();
  const score = calculatePortfolioUnderstandingScore(data);
  return <main className="shell py-12"><div className="mb-8"><p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#b9965a]">Never forget why you invested</p><h1 className="mt-3 text-4xl font-semibold tracking-tight">Your Conviction Dashboard</h1><p className="mt-3 max-w-2xl text-slate-600">Track why you invested, whether your thesis is changing, and what deserves attention.</p></div>
    <div className="grid gap-6 lg:grid-cols-[.85fr_1.15fr]"><PortfolioUnderstandingScore score={score.score} lines={score.lines} /><section className="dark-card rounded-3xl p-6 text-white"><CalendarCheck className="text-[#d8c08b]" /><h2 className="mt-5 text-3xl font-semibold tracking-tight">Weekly Conviction Review</h2><p className="mt-3 text-white/65">Reality changes every week. Check whether conviction is moving because the thesis changed—or because price moved.</p><Link href="/review" className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950">Start review <ArrowRight size={16} /></Link></section></div>
    <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]"><section><h2 className="mb-4 text-2xl font-semibold tracking-tight">Holdings</h2><div className="grid gap-4 md:grid-cols-2">{data.holdings.map((holding) => <HoldingCard key={holding.id} holding={holding} conviction={data.convictions.find((c) => c.holding_id === holding.id)} review={data.reviews.find((r) => r.holding_id === holding.id)} />)}</div></section><aside><h2 className="mb-4 text-2xl font-semibold tracking-tight">Alerts</h2><div className="space-y-3">{data.alerts.map((alert) => <AlertCard key={alert.id} alert={alert} holding={data.holdings.find((h) => h.id === alert.holding_id)} />)}</div></aside></div>
  </main>;
}
