import { AlertTriangle, CheckCircle2, Info } from "lucide-react";
import type { Alert, Holding } from "@/types/domain";

export function AlertCard({ alert, holding }: { alert: Alert; holding?: Holding }) {
  const Icon = alert.severity === "success" ? CheckCircle2 : alert.severity === "warning" ? AlertTriangle : Info;
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex gap-3"><Icon className={alert.severity === "warning" ? "text-amber-600" : "text-emerald-600"} size={20} />
        <div><p className="font-semibold text-slate-950">{holding?.name ?? "Portfolio"}</p><p className="mt-1 text-sm text-slate-600">{alert.message}</p></div>
      </div>
    </div>
  );
}
