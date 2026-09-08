import { formatDate } from "@/lib/utils";
import type { Proposal } from "@/types/proposal";

export function CoverPage({ draft }: { draft: Proposal }) {
  const accent = draft.primaryColor || "#2563eb";

  return (
    <section className="preview-page flex flex-col justify-between" style={{ minHeight: "11in" }}>
      <div>
        <div className="mb-16 h-2 w-24 rounded-full" style={{ backgroundColor: accent }} />
        {draft.companyName && (
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-ink-500">
            {draft.companyName}
          </p>
        )}
        <h1 className="mb-4 text-4xl font-bold leading-tight text-ink-900">{draft.title || "Untitled Proposal"}</h1>
        {draft.projectName && <p className="text-lg text-ink-500">{draft.projectName}</p>}
      </div>

      <div className="grid grid-cols-2 gap-6 border-t border-ink-200 pt-6 text-sm">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-ink-500">Prepared for</p>
          <p className="mt-1 font-medium text-ink-900">{draft.clientName}</p>
          {draft.clientContactName && <p className="text-ink-500">{draft.clientContactName}</p>}
          {draft.clientEmail && <p className="text-ink-500">{draft.clientEmail}</p>}
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-ink-500">Prepared by</p>
          <p className="mt-1 font-medium text-ink-900">{draft.preparedBy || draft.companyName || "—"}</p>
          <p className="text-ink-500">{formatDate(draft.proposalDate)}</p>
        </div>
      </div>
    </section>
  );
}
