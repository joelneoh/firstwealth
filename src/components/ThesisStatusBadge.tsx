import { statusClasses } from "@/lib/ui";
import type { ThesisStatus } from "@/types/domain";

export function ThesisStatusBadge({ status }: { status: ThesisStatus }) {
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ${statusClasses(status)}`}>{status}</span>;
}
