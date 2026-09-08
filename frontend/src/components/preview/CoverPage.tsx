import { formatDate, getReadableTextColor, tint } from "@/lib/utils";
import type { Proposal } from "@/types/proposal";

export function CoverPage({ draft }: { draft: Proposal }) {
  const accent = draft.primaryColor || "#2563eb";
  const ink = getReadableTextColor(accent);
  const isDark = ink === "#ffffff";
  const softInk = isDark ? "rgba(255,255,255,0.72)" : "rgba(11,15,25,0.65)";
  const hairline = isDark ? "rgba(255,255,255,0.24)" : "rgba(11,15,25,0.18)";
  const overlayTint = isDark ? "#ffffff" : "#0b0f19";
  const monogram = (draft.companyName || draft.title || "P").trim().charAt(0).toUpperCase();

  return (
    <section
      className="preview-page relative flex flex-col justify-between overflow-hidden"
      style={{ minHeight: "11in", backgroundColor: accent, color: ink }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full"
        style={{ backgroundColor: tint(overlayTint, 0.07) }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-48 -left-40 h-[30rem] w-[30rem] rounded-full"
        style={{ backgroundColor: tint(overlayTint, 0.06) }}
      />
      <p
        aria-hidden
        className="font-display pointer-events-none absolute -bottom-16 left-8 select-none text-[26rem] font-semibold leading-none"
        style={{ color: tint(overlayTint, 0.08) }}
      >
        {monogram}
      </p>

      <div className="relative px-14 pt-16">
        {draft.companyName && (
          <p
            className="mb-24 font-display text-sm font-semibold uppercase"
            style={{ letterSpacing: "0.12em", color: softInk }}
          >
            {draft.companyName}
          </p>
        )}
        <h1 className="font-display max-w-2xl text-6xl font-semibold leading-[1.04] tracking-tight">
          {draft.title || "Untitled Proposal"}
        </h1>
        {draft.projectName && (
          <p className="mt-5 max-w-xl font-serif text-xl italic" style={{ color: softInk }}>
            {draft.projectName}
          </p>
        )}
      </div>

      <div
        className="relative grid grid-cols-2 gap-10 px-14 py-10"
        style={{ borderTop: `1px solid ${hairline}`, backgroundColor: tint(accent === "#000000" ? "#111111" : "#000000", 0.08) }}
      >
        <div>
          <p className="font-display text-xs font-semibold uppercase" style={{ letterSpacing: "0.14em", color: softInk }}>
            Prepared for
          </p>
          <p className="mt-2 text-lg font-medium">{draft.clientName}</p>
          {draft.clientContactName && <p style={{ color: softInk }}>{draft.clientContactName}</p>}
          {draft.clientEmail && <p style={{ color: softInk }}>{draft.clientEmail}</p>}
        </div>
        <div>
          <p className="font-display text-xs font-semibold uppercase" style={{ letterSpacing: "0.14em", color: softInk }}>
            Prepared by
          </p>
          <p className="mt-2 text-lg font-medium">{draft.preparedBy || draft.companyName || "—"}</p>
          <p style={{ color: softInk }}>{formatDate(draft.proposalDate)}</p>
        </div>
      </div>
    </section>
  );
}
