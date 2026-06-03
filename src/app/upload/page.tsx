"use client";

import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { UploadBox } from "@/components/UploadBox";
import { extractHoldingsFromImage } from "@/lib/mock-ai";
import { useStore } from "@/lib/store";
import type { ExtractedHolding } from "@/types/domain";

export default function UploadPage() {
  const router = useRouter();
  const { importHoldings } = useStore();
  const [loading, setLoading] = useState(false);
  const [holdings, setHoldings] = useState<ExtractedHolding[]>([]);

  async function extract() { setLoading(true); setHoldings(await extractHoldingsFromImage()); setLoading(false); }
  function update(index: number, patch: Partial<ExtractedHolding>) { setHoldings((items) => items.map((item, i) => i === index ? { ...item, ...patch } : item)); }
  function continueSetup() { importHoldings(holdings.filter((item) => item.name || item.ticker)); router.push("/setup"); }

  return <main className="shell py-12"><div className="mb-8 max-w-3xl"><h1 className="text-4xl font-semibold tracking-tight">Upload Portfolio</h1><p className="mt-3 text-slate-600">Start with the assets you already own. First Wealth turns positions into conviction records.</p></div><UploadBox onExtract={extract} loading={loading} />
    {holdings.length > 0 && <section className="mt-8 card rounded-[2rem] p-6"><div className="flex items-center justify-between"><div><h2 className="text-2xl font-semibold">Extracted holdings</h2><p className="mt-1 text-sm text-slate-500">Edit, remove, or add manually. Only name or ticker is required.</p></div><button onClick={() => setHoldings([...holdings, { name: "", ticker: "" }])} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold"><Plus size={16} className="mr-2 inline" /> Add</button></div>
      <div className="mt-6 space-y-3">{holdings.map((item, index) => <div key={index} className="grid gap-3 rounded-2xl bg-slate-50 p-3 md:grid-cols-[1.2fr_.8fr_.8fr_.8fr_.8fr_auto]"><input value={item.name} onChange={(e) => update(index, { name: e.target.value })} placeholder="Name" className="rounded-xl border border-slate-200 p-3 text-sm" /><input value={item.ticker} onChange={(e) => update(index, { ticker: e.target.value })} placeholder="Ticker" className="rounded-xl border border-slate-200 p-3 text-sm" /><input value={item.quantity ?? ""} onChange={(e) => update(index, { quantity: Number(e.target.value) || undefined })} placeholder="Quantity" className="rounded-xl border border-slate-200 p-3 text-sm" /><input value={item.current_value ?? ""} onChange={(e) => update(index, { current_value: Number(e.target.value) || undefined })} placeholder="Value" className="rounded-xl border border-slate-200 p-3 text-sm" /><input value={item.allocation ?? ""} onChange={(e) => update(index, { allocation: Number(e.target.value) || undefined })} placeholder="Allocation %" className="rounded-xl border border-slate-200 p-3 text-sm" /><button onClick={() => setHoldings(holdings.filter((_, i) => i !== index))} className="rounded-xl bg-white px-3 text-slate-500"><Trash2 size={16} /></button></div>)}</div>
      <button onClick={continueSetup} className="mt-6 rounded-full bg-[#07111f] px-6 py-3 font-semibold text-white">Continue to conviction setup</button>
    </section>}
  </main>;
}
