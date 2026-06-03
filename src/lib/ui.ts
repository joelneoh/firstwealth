import clsx from "clsx";
import type { Decision, ThesisStatus } from "@/types/domain";

export function cn(...classes: Array<string | false | null | undefined>) { return clsx(classes); }

export function statusClasses(status: ThesisStatus) {
  return {
    Strengthening: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    Stable: "bg-blue-50 text-blue-700 ring-blue-200",
    Weakening: "bg-amber-50 text-amber-700 ring-amber-200",
    Broken: "bg-red-50 text-red-700 ring-red-200",
    Review: "bg-purple-50 text-purple-700 ring-purple-200",
    "Not reviewed": "bg-slate-100 text-slate-600 ring-slate-200",
  }[status];
}

export function actionClasses(action: Decision) {
  return {
    Hold: "text-emerald-700 bg-emerald-50",
    Add: "text-blue-700 bg-blue-50",
    Sell: "text-red-700 bg-red-50",
    Unsure: "text-amber-700 bg-amber-50",
    Review: "text-purple-700 bg-purple-50",
  }[action];
}
