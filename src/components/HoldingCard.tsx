import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { actionClasses } from "@/lib/ui";
import type { Conviction, Holding, Review } from "@/types/domain";
import { ConvictionScore } from "./ConvictionScore";
import { ThesisStatusBadge } from "./ThesisStatusBadge";

export function HoldingCard({ holding, conviction, review }: { holding: Holding; conviction?: Conviction; review?: Review }) {
  return (
    <Link href={`/holding/${holding.id}`} className="card group block rounded-3xl p-5 transition hover:-translate-y-1 hover:shadow-2xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-lg font-semibold text-slate-950">{holding.name}</p>
          <p className="text-sm text-slate-500">{holding.ticker}</p>
        </div>
        <ArrowUpRight className="text-slate-400 transition group-hover:text-[#b9965a]" />
      </div>
      <div className="mt-6 flex items-end justify-between gap-4">
        <ConvictionScore score={conviction?.confidence_score ?? 0} compact />
        <div className="text-right">
          <ThesisStatusBadge status={holding.status} />
          <p className={`mt-2 rounded-full px-3 py-1 text-xs font-semibold ${actionClasses(conviction?.current_decision ?? "Review")}`}>Action: {conviction?.current_decision ?? "Review"}</p>
        </div>
      </div>
      <p className="mt-4 text-xs text-slate-500">Last reviewed {review ? new Date(review.created_at).toLocaleDateString() : "Not reviewed"}</p>
    </Link>
  );
}
