import { useEffect, useRef, useState } from "react";
import { Link, useBlocker } from "react-router-dom";
import { ArrowLeft, Download, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionSidebar } from "@/components/editor/SectionSidebar";
import { SectionEditPanel } from "@/components/editor/SectionEditPanel";
import { PreviewPanel } from "@/components/editor/PreviewPanel";
import { useProposalDraft } from "@/hooks/useProposalDraft";
import { useSaveProposal } from "@/hooks/useProposal";
import { isBasicInfoComplete } from "@/lib/validation";
import { isSectionComplete } from "@/sections/sectionRegistry";
import { cn } from "@/lib/utils";
import type { ProposalStatus, SectionKey } from "@/types/proposal";

const STATUS_OPTIONS: { value: ProposalStatus; label: string }[] = [
  { value: "DRAFT", label: "Draft" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "COMPLETED", label: "Completed" },
];

export function EditorLayout({ proposalId }: { proposalId: string }) {
  const { draft, dispatch } = useProposalDraft();
  const [activeKey, setActiveKey] = useState<string>("basicInfo");
  const savedSnapshotRef = useRef(JSON.stringify(draft));
  const [isDirty, setIsDirty] = useState(false);
  const saveMutation = useSaveProposal(proposalId);

  useEffect(() => {
    setIsDirty(JSON.stringify(draft) !== savedSnapshotRef.current);
  }, [draft]);

  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty]);

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) => isDirty && currentLocation.pathname !== nextLocation.pathname
  );

  useEffect(() => {
    if (blocker.state === "blocked") {
      const proceed = window.confirm("You have unsaved changes. Leave without saving?");
      if (proceed) blocker.proceed();
      else blocker.reset();
    }
  }, [blocker]);

  async function handleSave() {
    const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, ...body } = draft;
    const updated = await saveMutation.mutateAsync(body);
    dispatch({ type: "SET_DRAFT", proposal: updated });
    savedSnapshotRef.current = JSON.stringify(updated);
    setIsDirty(false);
  }

  async function handleExportPdf() {
    if (isDirty) await handleSave();
    window.print();
  }

  const incompleteSections = draft.sectionOrder
    .filter((key) => draft.sectionVisibility[key] !== false)
    .filter((key) => !isSectionComplete(key as SectionKey, draft));
  const incompleteCount = incompleteSections.length + (isBasicInfoComplete(draft) ? 0 : 1);

  const saveStatusLabel = saveMutation.isPending
    ? "Saving…"
    : saveMutation.isError
      ? "Save failed"
      : isDirty
        ? "Unsaved changes"
        : "Saved";

  return (
    <div className="flex h-screen flex-col">
      <header className="flex flex-wrap items-center gap-3 border-b border-ink-200 bg-white px-4 py-3">
        <Link to="/" className="flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-ink-900">
          <ArrowLeft className="h-4 w-4" /> Dashboard
        </Link>
        <div className="mx-2 h-5 w-px bg-ink-200" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-ink-900">{draft.title || "Untitled Proposal"}</p>
          <p className="text-xs text-ink-500">{draft.clientName}</p>
        </div>

        <select
          className="h-9 rounded-lg border border-ink-200 bg-white px-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          value={draft.status}
          onChange={(e) => dispatch({ type: "UPDATE_FIELD", field: "status", value: e.target.value })}
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <span
          className={cn(
            "text-xs font-medium",
            saveMutation.isError ? "text-red-600" : isDirty ? "text-amber-600" : "text-emerald-600"
          )}
        >
          {saveStatusLabel}
        </span>

        <Button variant="secondary" size="sm" onClick={handleSave} disabled={saveMutation.isPending}>
          <Save className="h-3.5 w-3.5" /> Save
        </Button>
        <Button size="sm" onClick={handleExportPdf}>
          <Download className="h-3.5 w-3.5" /> Export PDF
        </Button>
      </header>

      {incompleteCount > 0 && (
        <div className="border-b border-amber-200 bg-amber-50 px-4 py-1.5 text-xs text-amber-800">
          {incompleteCount} section{incompleteCount > 1 ? "s" : ""} still need content — check the dots in the
          sidebar.
        </div>
      )}

      <div className="flex flex-col lg:grid lg:min-h-0 lg:flex-1 lg:grid-cols-[240px_1fr_1fr]">
        <aside className="max-h-56 overflow-y-auto border-b border-ink-200 lg:max-h-none lg:h-full lg:border-b-0 lg:border-r">
          <SectionSidebar activeKey={activeKey} onSelect={setActiveKey} />
        </aside>
        <div className="overflow-y-auto border-b border-ink-200 bg-white lg:h-full lg:border-b-0 lg:border-r">
          <SectionEditPanel activeKey={activeKey} />
        </div>
        <div className="lg:h-full lg:overflow-y-auto">
          <PreviewPanel />
        </div>
      </div>
    </div>
  );
}
