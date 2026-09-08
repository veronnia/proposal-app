import type { Proposal, SectionKey, TextSectionKey } from "@/types/proposal";
import { TEXT_SECTION_KEYS } from "@/types/proposal";

export function isTextSectionKey(key: string): key is TextSectionKey {
  return (TEXT_SECTION_KEYS as readonly string[]).includes(key);
}

export function isSectionComplete(key: SectionKey, draft: Proposal): boolean {
  if (isTextSectionKey(key)) {
    return Boolean(draft[key] && String(draft[key]).trim().length > 0);
  }
  if (key === "timeline") {
    return (draft.timelineJson ?? []).some((item) => item.label.trim().length > 0);
  }
  if (key === "pricing") {
    return draft.lineItems.some((item) => item.description.trim().length > 0 && item.quantity > 0);
  }
  return false;
}
