import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useProposalDraft } from "@/hooks/useProposalDraft";
import { TEXT_SECTION_META } from "@/sections/sectionMeta";
import type { TextSectionKey } from "@/types/proposal";

export function TextSectionForm({ sectionKey }: { sectionKey: TextSectionKey }) {
  const { draft, dispatch } = useProposalDraft();
  const meta = TEXT_SECTION_META[sectionKey];
  const value = draft[sectionKey] ?? "";

  return (
    <div>
      <Label htmlFor={sectionKey}>{meta.label}</Label>
      <Textarea
        id={sectionKey}
        value={value}
        onChange={(e) => dispatch({ type: "UPDATE_FIELD", field: sectionKey, value: e.target.value })}
        placeholder={meta.placeholder}
        rows={12}
      />
    </div>
  );
}
