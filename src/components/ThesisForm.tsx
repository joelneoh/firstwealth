"use client";

import { Mic, Save } from "lucide-react";
import { useState } from "react";
import { structureThesis } from "@/lib/mock-ai";
import type { Decision, Holding } from "@/types/domain";

const decisions: Decision[] = ["Hold", "Add", "Sell", "Unsure"];

export function ThesisForm({ holding, onSave }: { holding: Holding; onSave: (conviction: ReturnType<typeof structureThesis>) => void }) {
  const [why, setWhy] = useState(`I own ${holding.name} because `);
  const [sell, setSell] = useState("I would sell if ");
  const [confidence, setConfidence] = useState(7);
  const [horizon, setHorizon] = useState("3-5 years");
  const [decision, setDecision] = useState<Decision>("Hold");

  function submit() {
    const conviction = structureThesis(holding, why, sell, confidence);
    conviction.time_horizon = horizon;
    conviction.current_decision = decision;
    onSave(conviction);
  }

  return (
    <div className="card rounded-3xl p-6">
      <div className="flex items-center justify-between gap-4"><div><p className="text-lg font-semibold">{holding.name}</p><p className="text-sm text-slate-500">{holding.ticker}</p></div><button className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-500"><Mic size={15} className="mr-2 inline" /> Voice note soon</button></div>
      <label className="mt-6 block text-sm font-semibold text-slate-700">Why do you own this?</label>
      <textarea value={why} onChange={(e) => setWhy(e.target.value)} rows={4} className="focus-ring mt-2 w-full rounded-2xl border border-slate-200 bg-white p-4 text-sm" placeholder="I own Nvidia because AI infrastructure spending will continue growing..." />
      <label className="mt-5 block text-sm font-semibold text-slate-700">What would make you sell?</label>
      <textarea value={sell} onChange={(e) => setSell(e.target.value)} rows={3} className="focus-ring mt-2 w-full rounded-2xl border border-slate-200 bg-white p-4 text-sm" placeholder="I would sell if demand slows materially..." />
      <div className="mt-5 grid gap-5 md:grid-cols-3">
        <label className="block"><span className="text-sm font-semibold text-slate-700">Confidence: {confidence}/10</span><input type="range" min="1" max="10" step="0.1" value={confidence} onChange={(e) => setConfidence(Number(e.target.value))} className="mt-3 w-full" /></label>
        <label className="block"><span className="text-sm font-semibold text-slate-700">Expected holding period</span><select value={horizon} onChange={(e) => setHorizon(e.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm"><option>Less than 1 year</option><option>1-3 years</option><option>3-5 years</option><option>5+ years</option></select></label>
        <label className="block"><span className="text-sm font-semibold text-slate-700">Current decision</span><select value={decision} onChange={(e) => setDecision(e.target.value as Decision)} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm">{decisions.map((item) => <option key={item}>{item}</option>)}</select></label>
      </div>
      <button onClick={submit} className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#07111f] px-5 py-3 text-sm font-semibold text-white"><Save size={16} /> Save structured conviction</button>
    </div>
  );
}
