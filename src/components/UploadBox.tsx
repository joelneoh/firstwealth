"use client";

import { ImagePlus, Loader2, Wand2 } from "lucide-react";

export function UploadBox({ onExtract, loading }: { onExtract: () => void; loading: boolean }) {
  return (
    <div className="card rounded-[2rem] border-dashed p-8 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-950 text-[#d8c08b]"><ImagePlus size={28} /></div>
      <h2 className="mt-6 text-2xl font-semibold tracking-tight">Upload a portfolio screenshot</h2>
      <p className="mx-auto mt-3 max-w-xl text-slate-600">Works with Robinhood, IBKR, Tiger, Moomoo, Yahoo Finance, Excel screenshots, and generic broker views. This demo uses realistic mock OCR when no external API is configured.</p>
      <label className="mt-8 inline-flex cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:border-[#b9965a]">
        Choose image
        <input type="file" accept="image/*" className="sr-only" onChange={onExtract} />
      </label>
      <button onClick={onExtract} disabled={loading} className="ml-3 mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[#07111f] px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-slate-900/10 disabled:opacity-60">
        {loading ? <Loader2 className="animate-spin" size={16} /> : <Wand2 size={16} />} Extract holdings
      </button>
    </div>
  );
}
