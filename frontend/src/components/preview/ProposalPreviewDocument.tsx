import { CoverPage } from "@/components/preview/CoverPage";
import { PreviewSection, TextPreviewBody } from "@/components/preview/PreviewSection";
import { TimelinePreview } from "@/components/preview/TimelinePreview";
import { PricingPreview } from "@/components/preview/PricingPreview";
import { isTextSectionKey } from "@/sections/sectionRegistry";
import { SECTION_LABELS } from "@/sections/sectionMeta";
import type { Proposal, SectionKey } from "@/types/proposal";

export function ProposalPreviewDocument({ draft }: { draft: Proposal }) {
  const accent = draft.primaryColor || "#2563eb";
  const visibleSections = draft.sectionOrder.filter((key) => draft.sectionVisibility[key] !== false);

  return (
    <div className="proposal-document mx-auto max-w-3xl bg-white">
      <CoverPage draft={draft} />

      <div className="space-y-8 p-10">
        {visibleSections.map((key) => {
          const sectionKey = key as SectionKey;
          const label = SECTION_LABELS[sectionKey] ?? key;

          if (key === "timeline") {
            return (
              <PreviewSection key={key} title={label} accent={accent}>
                <TimelinePreview items={draft.timelineJson ?? []} accent={accent} />
              </PreviewSection>
            );
          }

          if (key === "pricing") {
            return (
              <PreviewSection key={key} title={label} accent={accent}>
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

          if (isTextSectionKey(key)) {
            return (
              <PreviewSection key={key} title={label} accent={accent}>
                <TextPreviewBody content={draft[key]} />
              </PreviewSection>
            );
          }

          return null;
        })}

        <footer className="border-t border-ink-200 pt-6 text-center text-xs text-ink-500">
          {draft.companyName && <p className="font-medium text-ink-700">{draft.companyName}</p>}
          {draft.companyContact && <p className="whitespace-pre-wrap">{draft.companyContact}</p>}
        </footer>
      </div>
    </div>
  );
}
