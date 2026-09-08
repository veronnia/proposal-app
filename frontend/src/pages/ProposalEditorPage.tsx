import { useParams } from "react-router-dom";
import { useProposal } from "@/hooks/useProposal";
import { ProposalDraftProvider } from "@/hooks/useProposalDraft";
import { EditorLayout } from "@/components/editor/EditorLayout";

export function ProposalEditorPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useProposal(id ?? "");

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center text-sm text-ink-500">Loading proposal…</div>;
  }

  if (isError || !data || !id) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-2 text-sm text-ink-500">
        <p>Proposal not found.</p>
      </div>
    );
  }

  return (
    <ProposalDraftProvider key={id} proposal={data}>
      <EditorLayout proposalId={id} />
    </ProposalDraftProvider>
  );
}
