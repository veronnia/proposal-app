import type { Proposal } from "@/types/proposal";

export interface BasicInfoErrors {
  title?: string;
  clientName?: string;
}

export function getBasicInfoErrors(draft: Proposal): BasicInfoErrors {
  const errors: BasicInfoErrors = {};
  if (!draft.title.trim()) errors.title = "Title is required";
  if (!draft.clientName.trim()) errors.clientName = "Client name is required";
  return errors;
}

export function isBasicInfoComplete(draft: Proposal): boolean {
  return Object.keys(getBasicInfoErrors(draft)).length === 0;
}
