import { CoverPage } from "@/components/preview/CoverPage";
import { PreviewSection, TextPreviewBody } from "@/components/preview/PreviewSection";
import { TimelinePreview } from "@/components/preview/TimelinePreview";
import { PricingPreview } from "@/components/preview/PricingPreview";
import { isTextSectionKey } from "@/sections/sectionRegistry";
import { SECTION_LABELS } from "@/sections/sectionMeta";
import { getReadableTextColor, tint } from "@/lib/utils";
import type { Proposal, SectionKey } from "@/types/proposal";

const MANIFESTO_KEYS = new Set(["executiveSummary"]);

export function ProposalPreviewDocument({ draft }: { draft: Proposal }) {
  const accent = draft.primaryColor || "#2563eb";
  const onAccentText = getReadableTextColor(accent);
  const visibleSections = draft.sectionOrder.filter((key) => draft.sectionVisibility[key] !== false);
  const hasClosing = Boolean(draft.companyName || draft.companyContact);

  return (
    <div className="proposal-document mx-auto max-w-3xl bg-white">
      <CoverPage draft={draft} />

      <div className="space-y-10 p-12">
        {visibleSections.map((key) => {
          const sectionKey = key as SectionKey;
          const label = SECTION_LABELS[sectionKey] ?? key;

          if (key === "timeline") {
            return (
              <PreviewSection key={key} title={label} accent={accent} constrainWidth={false}>
                <TimelinePreview items={draft.timelineJson ?? []} accent={accent} />
              </PreviewSection>
            );
          }

          if (key === "pricing") {
            return (
              <PreviewSection key={key} title={label} accent={accent} constrainWidth={false}>
                <PricingPreview
                  lineItems={draft.lineItems}
                  discountType={draft.discountType}
                  discountValue={draft.discountValue}
                  taxRate={draft.taxRate}
                  accent={accent}
                />
              </PreviewSection>
            );
          }

          if (key === "contactInfo") {
            return (
              <PreviewSection key={key} title={label} accent={accent} constrainWidth={false}>
                <div
                  className="max-w-[60ch] rounded-2xl border p-6 font-serif text-[1.05rem] leading-relaxed text-ink-700"
                  style={{ borderColor: tint(accent, 0.25), backgroundColor: tint(accent, 0.05) }}
                >
                  <TextPreviewBody content={draft.contactInfo} />
                </div>
              </PreviewSection>
            );
          }

          if (isTextSectionKey(key)) {
            return (
              <PreviewSection
                key={key}
                title={label}
                accent={accent}
                variant={MANIFESTO_KEYS.has(key) ? "manifesto" : "standard"}
              >
                <TextPreviewBody content={draft[key]} />
              </PreviewSection>
            );
          }

          return null;
        })}
      </div>

      {hasClosing && (
        <footer
          className="flex flex-col items-center gap-1 break-inside-avoid px-12 py-10 text-center"
          style={{ backgroundColor: accent, color: onAccentText }}
        >
          {draft.companyName && <p className="font-display text-sm font-semibold uppercase" style={{ letterSpacing: "0.1em" }}>{draft.companyName}</p>}
          {draft.companyContact && (
            <p className="whitespace-pre-wrap font-serif text-sm" style={{ opacity: 0.85 }}>
              {draft.companyContact}
            </p>
          )}
        </footer>
      )}
    </div>
  );
}
