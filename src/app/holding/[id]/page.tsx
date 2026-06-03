"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { ConvictionScore } from "@/components/ConvictionScore";
import { ThesisStatusBadge } from "@/components/ThesisStatusBadge";
import { Timeline } from "@/components/Timeline";
import { generateWeeklyUpdate } from "@/lib/mock-ai";
import { useStore } from "@/lib/store";
import type { Decision } from "@/types/domain";

export default function HoldingDetailPage() {
  const params = useParams<{ id: string }>();
  const { data, saveReview } = useStore();
  const holding = data.holdings.find((item) => item.id === params.id);
  if (!holding) return <main className="shell py-12"><h1 className="text-3xl font-semibold">Holding not found</h1><Link href="/dashboard" className="mt-4 inline-block text-sm font-semibold text-[#856634]">Back to dashboard</Link></main>;
  const conviction = data.convictions.find((item) => item.holding_id === holding.id);
  const reviews = data.reviews.filter((item) => item.holding_id === holding.id);
  const update = generateWeeklyUpdate(holding, conviction);
  const [decision, setDecision] = useState<Decision>(conviction?.current_decision ?? "Hold");
  const [reason, setReason] = useState("");
  const score = conviction?.confidence_score ?? 0;

  return <main className="shell py-12"><Link href="/dashboard" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-500"><ArrowLeft size={16} /> Back to dashboard</Link><section className="dark-card rounded-[2rem] p-8 text-white"><div className="flex flex-wrap items-start justify-between gap-6"><div><p className="text-white/55">Ticker: {holding.ticker}</p><h1 className="mt-2 text-5xl font-semibold tracking-tight">{holding.name}</h1><div className="mt-4 flex flex-wrap gap-3"><ThesisStatusBadge status={holding.status} /><span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">Current action: {conviction?.current_decision ?? "Review"}</span></div></div><ConvictionScore score={score} /></div></section>
    <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_.9fr]"><section className="card rounded-3xl p-6"><h2 className="text-2xl font-semibold">Why I Own This</h2><ul className="mt-4 space-y-3 text-slate-600">{(conviction?.structured_thesis ?? ["No thesis captured yet."]).map((item) => <li key={item}>• {item}</li>)}</ul><h2 className="mt-8 text-2xl font-semibold">What Would Make Me Sell</h2><ul className="mt-4 space-y-3 text-slate-600">{(conviction?.sell_criteria ?? ["Add sell criteria during setup."]).map((item) => <li key={item}>• {item}</li>)}</ul></section>
      <section className="card rounded-3xl p-6"><h2 className="text-2xl font-semibold">Key Assumptions</h2><div className="mt-4 space-y-3">{(conviction?.key_assumptions ?? []).map((item) => <div key={item.text} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4"><span className="text-sm text-slate-700">{item.text}</span><span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600">{item.status}</span></div>)}</div></section></div>
    <div className="mt-6 grid gap-6 lg:grid-cols-2"><section className="card rounded-3xl p-6"><h2 className="text-2xl font-semibold">Timeline</h2><div className="mt-5"><Timeline initial={Math.max(1, score - .7)} reviews={reviews} /></div></section><section className="card rounded-3xl p-6"><h2 className="text-2xl font-semibold">AI Weekly Update</h2><p className="mt-4 leading-7 text-slate-600">This week your {holding.name} thesis appears to be {update.status.toLowerCase()}. {update.ai_summary}</p><p className="mt-4 font-semibold">Suggested action: {update.user_decision}</p></section></div>
    <section className="mt-6 card rounded-3xl p-6"><h2 className="text-2xl font-semibold">What do you want to do now?</h2><div className="mt-4 flex flex-wrap gap-2">{(["Hold", "Add", "Sell", "Unsure"] as Decision[]).map((item) => <button key={item} onClick={() => setDecision(item)} className={`rounded-full px-4 py-2 text-sm font-semibold ${decision === item ? "bg-[#07111f] text-white" : "bg-slate-100 text-slate-600"}`}>{item}</button>)}</div><textarea value={reason} onChange={(e) => setReason(e.target.value)} className="mt-4 w-full rounded-2xl border border-slate-200 p-4 text-sm" rows={3} placeholder="Why? Store your decision rationale." /><button onClick={() => saveReview({ ...update, user_decision: decision, user_reason: reason, user_agreement: "Agree" })} className="mt-4 rounded-full bg-[#07111f] px-5 py-3 text-sm font-semibold text-white">Save decision</button></section>
  </main>;
}
