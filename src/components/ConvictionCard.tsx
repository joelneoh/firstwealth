import { ConvictionScore } from "./ConvictionScore";
import { ThesisStatusBadge } from "./ThesisStatusBadge";

export function ConvictionCard() {
  return (
    <div className="dark-card rounded-[2rem] p-6 text-white">
      <div className="flex items-start justify-between"><div><p className="text-sm text-white/55">Investment</p><h3 className="mt-1 text-2xl font-semibold">Nvidia</h3></div><ThesisStatusBadge status="Strengthening" /></div>
      <div className="mt-6"><ConvictionScore score={8.7} /></div>
      <div className="mt-6 grid gap-5 text-sm md:grid-cols-2"><div><p className="font-semibold text-[#d8c08b]">Original thesis</p><ul className="mt-2 space-y-1 text-white/75"><li>• AI infrastructure demand</li><li>• CUDA moat</li><li>• Founder-led execution</li></ul></div><div><p className="font-semibold text-[#d8c08b]">Sell criteria</p><ul className="mt-2 space-y-1 text-white/75"><li>• AI capex slowdown</li><li>• CUDA moat weakens</li></ul></div></div>
      <div className="mt-6 rounded-2xl bg-white/8 p-4"><p className="text-sm text-white/70">Suggested action</p><p className="text-lg font-semibold">Hold</p></div>
    </div>
  );
}
