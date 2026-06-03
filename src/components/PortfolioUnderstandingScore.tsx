export function PortfolioUnderstandingScore({ score, lines }: { score: number; lines: string[] }) {
  return (
    <section className="card rounded-3xl p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#b9965a]">Portfolio Understanding Score</p>
      <div className="mt-4 flex items-end gap-2"><span className="text-5xl font-semibold tracking-tight">{score}</span><span className="pb-2 text-slate-500">/100</span></div>
      <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full gold-gradient" style={{ width: `${score}%` }} /></div>
      <ul className="mt-5 space-y-2 text-sm text-slate-600">{lines.map((line) => <li key={line}>• {line}</li>)}</ul>
    </section>
  );
}
