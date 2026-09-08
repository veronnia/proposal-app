import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProposalDraft } from "@/hooks/useProposalDraft";
import { getBasicInfoErrors } from "@/lib/validation";
import { formatDateInput } from "@/lib/utils";
import type { Proposal } from "@/types/proposal";

export function BasicInfoForm() {
  const { draft, dispatch } = useProposalDraft();
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const errors = getBasicInfoErrors(draft);

  const setField = (field: keyof Proposal, value: string) =>
    dispatch({ type: "UPDATE_FIELD", field, value: value || null });

  const markTouched = (field: string) => setTouched((prev) => ({ ...prev, [field]: true }));

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="title">Proposal Title *</Label>
          <Input
            id="title"
            value={draft.title}
            onChange={(e) => dispatch({ type: "UPDATE_FIELD", field: "title", value: e.target.value })}
            onBlur={() => markTouched("title")}
            placeholder="e.g. Website Redesign Proposal"
          />
          {touched.title && errors.title && <p className="mt-1 text-xs text-red-600">{errors.title}</p>}
        </div>
        <div>
          <Label htmlFor="clientName">Client / Company Name *</Label>
          <Input
            id="clientName"
            value={draft.clientName}
            onChange={(e) => dispatch({ type: "UPDATE_FIELD", field: "clientName", value: e.target.value })}
            onBlur={() => markTouched("clientName")}
            placeholder="e.g. Acme Corp"
          />
          {touched.clientName && errors.clientName && (
            <p className="mt-1 text-xs text-red-600">{errors.clientName}</p>
          )}
        </div>
        <div>
          <Label htmlFor="clientContactName">Client Contact Name</Label>
          <Input
            id="clientContactName"
            value={draft.clientContactName ?? ""}
            onChange={(e) => setField("clientContactName", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="clientEmail">Client Email</Label>
          <Input
            id="clientEmail"
            type="email"
            value={draft.clientEmail ?? ""}
            onChange={(e) => setField("clientEmail", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="clientPhone">Client Phone</Label>
          <Input
            id="clientPhone"
            value={draft.clientPhone ?? ""}
            onChange={(e) => setField("clientPhone", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="projectName">Project Name</Label>
          <Input
            id="projectName"
            value={draft.projectName ?? ""}
            onChange={(e) => setField("projectName", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="proposalDate">Proposal Date</Label>
          <Input
            id="proposalDate"
            type="date"
            value={formatDateInput(draft.proposalDate)}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "proposalDate",
                value: e.target.value ? new Date(e.target.value).toISOString() : draft.proposalDate,
              })
            }
          />
        </div>
        <div>
          <Label htmlFor="preparedBy">Prepared By</Label>
          <Input
            id="preparedBy"
            value={draft.preparedBy ?? ""}
            onChange={(e) => setField("preparedBy", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
