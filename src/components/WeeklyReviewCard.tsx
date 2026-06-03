"use client";

import { useState } from "react";
import { generateWeeklyUpdate } from "@/lib/mock-ai";
import type { Agreement, Conviction, Decision, Holding, Review } from "@/types/domain";
import { ThesisStatusBadge } from "./ThesisStatusBadge";

export function WeeklyReviewCard({ holding, conviction, onSave }: { holding: Holding; conviction?: Conviction; onSave: (review: Review) => void }) {
  const update = generateWeeklyUpdate(holding, conviction);
  const [agreement, setAgreement] = useState<Agreement>("Agree");
  const [score, setScore] = useState(update.updated_score);
  const [decision, setDecision] = useState<Decision>(update.user_decision);
  const [reason, setReason] = useState("");

  function save() { onSave({ ...update, user_agreement: agreement, updated_score: score, user_decision: decision, user_reason: reason }); }

  return (
    <article className="card rounded-3xl p-6">
      <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xl font-semibold">{holding.name}</p><p className="text-sm text-slate-500">Original thesis: {conviction?.structured_thesis.join(" · ") ?? "No thesis captured yet"}</p></div><ThesisStatusBadge status={update.status} /></div>
      <div className="mt-5 rounded-2xl bg-slate-50 p-4"><p className="text-sm font-semibold text-slate-700">This week’s update</p><p className="mt-2 text-sm leading-6 text-slate-600">{update.ai_summary}</p><p className="mt-3 text-sm font-semibold">Conviction: {update.previous_score.toFixed(1)} → {score.toFixed(1)}</p></div>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <div><p className="text-sm font-semibold">Do you agree?</p><div className="mt-2 flex flex-wrap gap-2">{(["Agree", "Disagree", "Not sure"] as Agreement[]).map((item) => <button key={item} onClick={() => setAgreement(item)} className={`rounded-full px-3 py-2 text-sm ${agreement === item ? "bg-[#07111f] text-white" : "bg-slate-100 text-slate-600"}`}>{item}</button>)}</div></div>
        <label><span className="text-sm font-semibold">Updated conviction: {score.toFixed(1)}</span><input type="range" min="1" max="10" step="0.1" value={score} onChange={(e) => setScore(Number(e.target.value))} className="mt-3 w-full" /></label>
        <label><span className="text-sm font-semibold">Decision</span><select value={decision} onChange={(e) => setDecision(e.target.value as Decision)} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm"><option>Hold</option><option>Add</option><option>Sell</option><option>Unsure</option><option>Review</option></select></label>
      </div>
      <textarea value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Why? Capture your reasoning, not the price action." className="mt-5 w-full rounded-2xl border border-slate-200 bg-white p-4 text-sm" rows={3} />
      <button onClick={save} className="mt-4 rounded-full bg-[#07111f] px-5 py-3 text-sm font-semibold text-white">Save review</button>
    </article>
  );
}
