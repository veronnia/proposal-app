import { formatDate } from "@/lib/utils";
import type { TimelineItem } from "@/types/proposal";

export function TimelinePreview({ items, accent }: { items: TimelineItem[]; accent: string }) {
  if (items.length === 0) {
    return <p className="font-sans text-sm italic text-ink-400">No milestones yet.</p>;
  }

  return (
    <ol className="relative">
      {items.map((item, index) => (
        <li key={item.id} className="relative flex gap-5 pb-8 last:pb-0">
          {index < items.length - 1 && (
            <span
              aria-hidden
              className="absolute left-[15px] top-8 w-px"
              style={{ bottom: "-8px", backgroundColor: `${accent}33` }}
            />
          )}
          <span
            className="font-display relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
            style={{ backgroundColor: accent }}
          >
            {index + 1}
          </span>
          <div className="pt-0.5">
            <p className="font-display text-base font-semibold text-ink-900">
              {item.label || `Milestone ${index + 1}`}
            </p>
            {(item.startDate || item.endDate) && (
              <p className="font-sans text-xs font-medium uppercase text-ink-500" style={{ letterSpacing: "0.08em" }}>
                {formatDate(item.startDate)}
                {item.endDate ? ` – ${formatDate(item.endDate)}` : ""}
              </p>
            )}
            {item.description && (
              <p className="mt-1 max-w-[60ch] font-serif text-ink-700">{item.description}</p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
