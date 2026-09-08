import type { ReactNode } from "react";
import { BasicInfoForm } from "@/components/editor/sections/BasicInfoForm";
import { BrandingForm } from "@/components/editor/sections/BrandingForm";
import { TextSectionForm } from "@/components/editor/sections/TextSectionForm";
import { TimelineForm } from "@/components/editor/sections/TimelineForm";
import { PricingForm } from "@/components/editor/sections/PricingForm";
import { isTextSectionKey } from "@/sections/sectionRegistry";
import { SECTION_LABELS } from "@/sections/sectionMeta";
import type { SectionKey } from "@/types/proposal";

export function SectionEditPanel({ activeKey }: { activeKey: string }) {
  if (activeKey === "basicInfo") {
    return <PanelShell title="Basic Info"><BasicInfoForm /></PanelShell>;
  }
  if (activeKey === "branding") {
    return <PanelShell title="Branding"><BrandingForm /></PanelShell>;
  }
  if (activeKey === "timeline") {
    return <PanelShell title={SECTION_LABELS.timeline}><TimelineForm /></PanelShell>;
  }
  if (activeKey === "pricing") {
    return <PanelShell title={SECTION_LABELS.pricing}><PricingForm /></PanelShell>;
  }
  if (isTextSectionKey(activeKey)) {
    return (
      <PanelShell title={SECTION_LABELS[activeKey as SectionKey]}>
        <TextSectionForm sectionKey={activeKey} />
      </PanelShell>
    );
  }
  return null;
}

function PanelShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mx-auto max-w-2xl p-6">
      <h2 className="mb-4 text-lg font-semibold text-ink-900">{title}</h2>
      {children}
    </div>
  );
}
