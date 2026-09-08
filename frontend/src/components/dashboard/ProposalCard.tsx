import { useState } from "react";
import { Link } from "react-router-dom";
import { Copy, Pencil, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { RenameDialog } from "@/components/dashboard/RenameDialog";
import { useDeleteProposal, useDuplicateProposal, useRenameProposal } from "@/hooks/useProposals";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { ProposalListItem } from "@/types/proposal";

export function ProposalCard({ proposal }: { proposal: ProposalListItem }) {
  const [renameOpen, setRenameOpen] = useState(false);
  const renameMutation = useRenameProposal();
  const duplicateMutation = useDuplicateProposal();
  const deleteMutation = useDeleteProposal();

  function handleDelete() {
    if (window.confirm(`Delete "${proposal.title}"? This cannot be undone.`)) {
      deleteMutation.mutate(proposal.id);
    }
  }

  return (
    <Card className="flex flex-col gap-3 p-5 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <Link to={`/proposals/${proposal.id}/edit`} className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold text-ink-900 hover:text-brand-600">{proposal.title}</h3>
          <p className="truncate text-sm text-ink-500">{proposal.clientName}</p>
        </Link>
        <StatusBadge status={proposal.status} />
      </div>

      <div className="flex items-baseline justify-between text-sm">
        <span className="text-ink-500">Updated {formatDate(proposal.updatedAt)}</span>
        <span className="font-semibold text-ink-900">{formatCurrency(proposal.total)}</span>
      </div>

      <div className="flex items-center gap-1 border-t border-ink-100 pt-3">
        <Button variant="ghost" size="sm" onClick={() => setRenameOpen(true)}>
          <Pencil className="h-3.5 w-3.5" /> Rename
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => duplicateMutation.mutate(proposal.id)}
          disabled={duplicateMutation.isPending}
        >
          <Copy className="h-3.5 w-3.5" /> Duplicate
        </Button>
        <Button variant="ghost" size="sm" className="ml-auto text-red-600 hover:bg-red-50" onClick={handleDelete}>
          <Trash2 className="h-3.5 w-3.5" /> Delete
        </Button>
      </div>

      <RenameDialog
        open={renameOpen}
        onOpenChange={setRenameOpen}
        initialTitle={proposal.title}
        isPending={renameMutation.isPending}
        onConfirm={(title) => renameMutation.mutate({ id: proposal.id, title })}
      />
    </Card>
  );
}
