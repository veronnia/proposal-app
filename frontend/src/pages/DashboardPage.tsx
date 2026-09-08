import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchFilterBar } from "@/components/dashboard/SearchFilterBar";
import { ProposalCard } from "@/components/dashboard/ProposalCard";
import { useProposalsList } from "@/hooks/useProposals";

export function DashboardPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const { data: proposals, isLoading } = useProposalsList(search, status);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink-900">Proposals</h1>
          <p className="text-sm text-ink-500">Create, edit, and manage your client proposals.</p>
        </div>
        <Button asChild>
          <Link to="/proposals/new">
            <Plus className="h-4 w-4" /> New Proposal
          </Link>
        </Button>
      </div>

      <div className="mb-6">
        <SearchFilterBar search={search} onSearchChange={setSearch} status={status} onStatusChange={setStatus} />
      </div>

      {isLoading && <p className="text-sm text-ink-500">Loading proposals…</p>}

      {!isLoading && proposals && proposals.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-ink-300 py-16 text-center">
          <FileText className="h-10 w-10 text-ink-300" />
          <p className="text-sm text-ink-500">
            {search || status ? "No proposals match your filters." : "No proposals yet. Create your first one."}
          </p>
          {!search && !status && (
            <Button asChild>
              <Link to="/proposals/new">
                <Plus className="h-4 w-4" /> New Proposal
              </Link>
            </Button>
          )}
        </div>
      )}

      {!isLoading && proposals && proposals.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {proposals.map((proposal) => (
            <ProposalCard key={proposal.id} proposal={proposal} />
          ))}
        </div>
      )}
    </div>
  );
}
