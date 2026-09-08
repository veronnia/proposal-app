export type ProposalStatus = "DRAFT" | "IN_PROGRESS" | "COMPLETED";

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface TimelineItem {
  id: string;
  label: string;
  startDate?: string | null;
  endDate?: string | null;
  description?: string | null;
}

export type DiscountType = "PERCENT" | "FLAT" | null;

export const TEXT_SECTION_KEYS = [
  "executiveSummary",
  "aboutUs",
  "projectOverview",
  "clientNeeds",
  "goalsObjectives",
  "proposedSolution",
  "scopeOfWork",
  "deliverables",
  "methodology",
  "termsConditions",
  "nextSteps",
  "contactInfo",
] as const;

export type TextSectionKey = (typeof TEXT_SECTION_KEYS)[number];
export type SectionKey = TextSectionKey | "timeline" | "pricing";

export interface Proposal {
  id: string;
  status: ProposalStatus;

  title: string;
  clientName: string;
  clientContactName?: string | null;
  clientEmail?: string | null;
  clientPhone?: string | null;
  projectName?: string | null;
  proposalDate: string;
  preparedBy?: string | null;

  companyName?: string | null;
  primaryColor?: string | null;
  companyContact?: string | null;

  executiveSummary?: string | null;
  aboutUs?: string | null;
  projectOverview?: string | null;
  clientNeeds?: string | null;
  goalsObjectives?: string | null;
  proposedSolution?: string | null;
  scopeOfWork?: string | null;
  deliverables?: string | null;
  methodology?: string | null;
  timelineJson?: TimelineItem[] | null;
  termsConditions?: string | null;
  nextSteps?: string | null;
  contactInfo?: string | null;

  sectionOrder: string[];
  sectionVisibility: Record<string, boolean>;

  lineItems: LineItem[];
  discountType: DiscountType;
  discountValue: number;
  taxRate: number;
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  total: number;

  createdAt: string;
  updatedAt: string;
}

export interface ProposalListItem {
  id: string;
  title: string;
  clientName: string;
  status: ProposalStatus;
  total: number;
  updatedAt: string;
}
