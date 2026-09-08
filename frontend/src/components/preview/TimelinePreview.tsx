import { formatDate } from "@/lib/utils";
import type { TimelineItem } from "@/types/proposal";

export function TimelinePreview({ items, accent }: { items: TimelineItem[]; accent: string }) {
  if (items.length === 0) {
    return <p className="italic text-ink-400">No milestones yet.</p>;
  }

  return (
    <ol className="space-y-4">
      {items.map((item, index) => (
        <li key={item.id} className="flex gap-3">
          <div className="flex flex-col items-center">
            <span
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
              style={{ backgroundColor: accent }}
            >
              {index + 1}
            </span>
            {index < items.length - 1 && <span className="mt-1 w-px flex-1 bg-ink-200" />}
          </div>
          <div className="pb-4">
            <p className="font-semibold text-ink-900">{item.label || `Milestone ${index + 1}`}</p>
            {(item.startDate || item.endDate) && (
              <p className="text-xs uppercase tracking-wide text-ink-500">
                {formatDate(item.startDate)}
                {item.endDate ? ` – ${formatDate(item.endDate)}` : ""}
              </p>
            )}
            {item.description && <p className="mt-1 text-ink-700">{item.description}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}
