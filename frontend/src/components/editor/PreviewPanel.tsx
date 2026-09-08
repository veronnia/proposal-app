import { ProposalPreviewDocument } from "@/components/preview/ProposalPreviewDocument";
import { useProposalDraft } from "@/hooks/useProposalDraft";

export function PreviewPanel() {
  const { draft } = useProposalDraft();

  return (
    <div id="print-area" className="bg-ink-100 p-6">
      <ProposalPreviewDocument draft={draft} />
    </div>
  );
}
