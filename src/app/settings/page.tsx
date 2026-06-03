"use client";

import { useStore } from "@/lib/store";

export default function SettingsPage() {
  const { data, resetData } = useStore();
  return <main className="shell py-12"><div className="mb-8"><h1 className="text-4xl font-semibold tracking-tight">Settings</h1><p className="mt-3 text-slate-600">Manage your local demo workspace and AI mode.</p></div><section className="card max-w-2xl rounded-3xl p-6"><label className="block text-sm font-semibold text-slate-700">Name</label><input readOnly value={data.user.name} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 p-3" /><label className="mt-5 block text-sm font-semibold text-slate-700">Email</label><input readOnly value={data.user.email} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 p-3" /><div className="mt-6 rounded-2xl bg-slate-50 p-4"><p className="font-semibold">AI mode: Mock</p><p className="mt-1 text-sm text-slate-600">Set OPENAI_API_KEY later to replace mock extraction, thesis structuring, and weekly updates through the OpenAI-compatible abstraction.</p></div><button onClick={resetData} className="mt-6 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700">Reset local database</button></section></main>;
}
