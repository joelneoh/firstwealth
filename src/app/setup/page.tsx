"use client";

import Link from "next/link";
import { useState } from "react";
import { ThesisForm } from "@/components/ThesisForm";
import { useStore } from "@/lib/store";

export default function SetupPage() {
  const { data, upsertConviction } = useStore();
  const [selected, setSelected] = useState<string[]>(data.holdings.slice(0, 5).map((h) => h.id));
  const holdings = data.holdings.filter((holding) => selected.includes(holding.id));
  return <main className="shell py-12"><div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><h1 className="text-4xl font-semibold tracking-tight">Which holdings matter most to you?</h1><p className="mt-3 text-slate-600">Start with your most important holdings. You can add more later. Select up to 5.</p></div><Link href="/dashboard" className="rounded-full bg-[#07111f] px-5 py-3 text-sm font-semibold text-white">Go to dashboard</Link></div>
    <div className="card mb-8 rounded-3xl p-5"><div className="flex flex-wrap gap-2">{data.holdings.map((holding) => <button key={holding.id} onClick={() => setSelected((items) => items.includes(holding.id) ? items.filter((id) => id !== holding.id) : items.length < 5 ? [...items, holding.id] : items)} className={`rounded-full px-4 py-2 text-sm font-semibold ${selected.includes(holding.id) ? "bg-[#07111f] text-white" : "bg-white text-slate-600"}`}>{holding.name}</button>)}</div></div>
    <div className="space-y-6">{holdings.map((holding) => <ThesisForm key={holding.id} holding={holding} onSave={upsertConviction} />)}</div>
  </main>;
}
