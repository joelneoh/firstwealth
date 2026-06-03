import type { Review } from "@/types/domain";

export function Timeline({ initial, reviews }: { initial: number; reviews: Review[] }) {
  const points = [{ label: "Initial", score: initial }, ...reviews.slice().reverse().map((review, i) => ({ label: `Week ${i + 1}`, score: review.updated_score }))];
  return (
    <div className="space-y-4">
      {points.map((point) => (
        <div key={point.label} className="flex items-center gap-4">
          <div className="w-20 text-sm font-medium text-slate-500">{point.label}</div>
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-[#b9965a]" style={{ width: `${point.score * 10}%` }} /></div>
          <div className="w-10 text-right text-sm font-semibold">{point.score.toFixed(1)}</div>
        </div>
      ))}
    </div>
  );
}
