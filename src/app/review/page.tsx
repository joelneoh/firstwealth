"use client";

import { WeeklyReviewCard } from "@/components/WeeklyReviewCard";
import { useStore } from "@/lib/store";

export default function ReviewPage() {
  const { data, saveReview } = useStore();
  return <main className="shell py-12"><div className="mb-8"><h1 className="text-4xl font-semibold tracking-tight">Weekly Conviction Review</h1><p className="mt-3 max-w-2xl text-slate-600">Every week, reality changes. Check whether your conviction should change too.</p></div><div className="space-y-6">{data.holdings.map((holding) => <WeeklyReviewCard key={holding.id} holding={holding} conviction={data.convictions.find((conviction) => conviction.holding_id === holding.id)} onSave={saveReview} />)}</div></main>;
}
