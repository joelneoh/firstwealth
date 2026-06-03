import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ConvictionCard } from "@/components/ConvictionCard";

const problem = ["Sell winners too early", "Hold broken businesses too long", "React to headlines", "Confuse price movement with thesis movement", "Forget why they invested"];
const steps = ["Upload a screenshot of your portfolio", "Record why you own each investment", "Define what would make you sell", "Get weekly conviction updates"];

export default function LandingPage() {
  return (
    <main>
      <section className="shell grid min-h-[calc(100vh-4rem)] items-center gap-12 py-16 lg:grid-cols-[1.05fr_.95fr]">
        <div>
          <p className="inline-flex rounded-full border border-[#d8c08b]/50 bg-white/70 px-4 py-2 text-sm font-semibold text-[#856634]">Never forget why you invested.</p>
          <h1 className="mt-7 max-w-4xl text-5xl font-semibold tracking-[-0.045em] text-slate-950 md:text-7xl">The greatest investing mistakes happen when investors forget why they invested in the first place.</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">First Wealth helps you remember why you invested, track whether your conviction is strengthening or weakening, and make better hold, add, and sell decisions.</p>
          <div className="mt-9 flex flex-wrap gap-3"><Link href="/upload" className="inline-flex items-center gap-2 rounded-full bg-[#07111f] px-6 py-3 font-semibold text-white shadow-2xl shadow-slate-900/15">Upload your portfolio <ArrowRight size={18} /></Link><a href="#how" className="rounded-full border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700">See how it works</a></div>
        </div>
        <ConvictionCard />
      </section>

      <section className="shell py-14">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="card rounded-[2rem] p-8"><h2 className="text-3xl font-semibold tracking-tight">Investing is easy. Holding is hard.</h2><ul className="mt-6 space-y-3 text-slate-600">{problem.map((item) => <li key={item} className="flex gap-3"><CheckCircle2 className="text-[#1f8a5b]" size={20} /> {item}</li>)}</ul></div>
          <div className="card rounded-[2rem] p-8"><h2 className="text-3xl font-semibold tracking-tight">Brokerages track positions. First Wealth tracks conviction.</h2><p className="mt-5 leading-7 text-slate-600">Portfolio apps track performance. Research platforms track companies. Copy trading tracks actions. First Wealth tracks the reasoning behind ownership, the assumptions that must stay true, and the sell criteria that protect you from hope.</p></div>
        </div>
      </section>

      <section id="how" className="shell py-16">
        <div className="text-center"><p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#b9965a]">How it works</p><h2 className="mt-3 text-4xl font-semibold tracking-tight">Weekly clarity in four steps</h2></div>
        <div className="mt-10 grid gap-4 md:grid-cols-4">{steps.map((step, index) => <div key={step} className="card rounded-3xl p-6"><span className="text-sm font-semibold text-[#b9965a]">Step {index + 1}</span><p className="mt-4 font-semibold text-slate-950">{step}</p></div>)}</div>
      </section>

      <section className="shell grid gap-6 py-16 lg:grid-cols-2">
        <div className="dark-card rounded-[2rem] p-8 text-white"><p className="text-[#d8c08b]">Core promise</p><h2 className="mt-3 text-5xl font-semibold tracking-tight">Never forget why you invested.</h2><p className="mt-5 text-white/70">Most investing platforms help people buy assets. First Wealth helps people build wealth by protecting the quality of their reasoning.</p></div>
        <div className="card rounded-[2rem] p-8"><h2 className="text-3xl font-semibold tracking-tight">Great investors hold winners longer and kill losers faster.</h2><div className="mt-6 grid gap-4"><div className="rounded-2xl bg-emerald-50 p-5"><p className="font-semibold text-emerald-800">Sold winner too early</p><p className="mt-2 text-slate-700">$10,000 to $15,000 vs $120,000 if held with conviction.</p></div><div className="rounded-2xl bg-amber-50 p-5"><p className="font-semibold text-amber-800">Held broken thesis with hope</p><p className="mt-2 text-slate-700">$10,000 to $1,200 vs $8,000 if sold when thesis broke.</p></div></div></div>
      </section>
    </main>
  );
}
