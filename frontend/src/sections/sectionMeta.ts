import type { SectionKey, TextSectionKey } from "@/types/proposal";

export const TEXT_SECTION_META: Record<TextSectionKey, { label: string; placeholder: string }> = {
  executiveSummary: {
    label: "Executive Summary",
    placeholder: "Summarize the opportunity and why your solution is the right fit...",
  },
  aboutUs: {
    label: "About Us",
    placeholder: "Introduce your company, experience, and what makes you the right partner...",
  },
  projectOverview: {
    label: "Project Overview",
    placeholder: "Describe the project at a high level...",
  },
  clientNeeds: {
    label: "Client Needs & Problems",
    placeholder: "What challenges or needs is the client facing?",
  },
  goalsObjectives: {
    label: "Goals & Objectives",
    placeholder: "What does success look like for this project?",
  },
  proposedSolution: {
    label: "Proposed Solution",
    placeholder: "Describe the solution you're proposing...",
  },
  scopeOfWork: {
    label: "Scope of Work",
    placeholder: "Detail what is included in this engagement...",
  },
  deliverables: {
    label: "Deliverables",
    placeholder: "List the concrete deliverables the client will receive...",
  },
  methodology: {
    label: "Methodology",
    placeholder: "Explain your approach and process...",
  },
  termsConditions: {
    label: "Terms & Conditions",
    placeholder: "Payment terms, cancellation policy, legal terms...",
  },
  nextSteps: {
    label: "Next Steps",
    placeholder: "What should the client do to move forward?",
  },
  contactInfo: {
    label: "Contact Information",
    placeholder: "How can the client reach you with questions?",
  },
};

export const SECTION_LABELS: Record<SectionKey, string> = {
  ...Object.fromEntries(
    Object.entries(TEXT_SECTION_META).map(([key, meta]) => [key, meta.label])
  ),
  timeline: "Timeline & Milestones",
  pricing: "Pricing",
} as Record<SectionKey, string>;
