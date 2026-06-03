export function ConvictionScore({ score, compact = false }: { score: number; compact?: boolean }) {
  const pct = Math.max(0, Math.min(100, score * 10));
  return (
    <div className={compact ? "min-w-28" : "space-y-2"}>
      <div className="flex items-end gap-1">
        <span className={compact ? "text-lg font-semibold" : "text-4xl font-semibold tracking-tight"}>{score.toFixed(1)}</span>
        <span className="pb-1 text-sm text-slate-500">/10</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-gradient-to-r from-[#b9965a] to-emerald-500" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
