import { z } from "zod";

export const lineItemSchema = z.object({
  id: z.string(),
  description: z.string(),
  quantity: z.number().nonnegative(),
  unitPrice: z.number().nonnegative(),
});

export const timelineItemSchema = z.object({
  id: z.string(),
  label: z.string(),
  startDate: z.string().nullable().optional(),
  endDate: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
});

export const proposalStatusSchema = z.enum(["DRAFT", "IN_PROGRESS", "COMPLETED"]);

export const discountTypeSchema = z.enum(["PERCENT", "FLAT"]).nullable();

export const createProposalSchema = z.object({
  title: z.string().min(1, "Title is required"),
  clientName: z.string().min(1, "Client name is required"),
});

export const updateProposalSchema = z.object({
  status: proposalStatusSchema,
  title: z.string().min(1, "Title is required"),
  clientName: z.string().min(1, "Client name is required"),
  clientContactName: z.string().nullable().optional(),
  clientEmail: z.string().nullable().optional(),
  clientPhone: z.string().nullable().optional(),
  projectName: z.string().nullable().optional(),
  proposalDate: z.string(),
  preparedBy: z.string().nullable().optional(),

  companyName: z.string().nullable().optional(),
  primaryColor: z.string().nullable().optional(),
  companyContact: z.string().nullable().optional(),

  executiveSummary: z.string().nullable().optional(),
  aboutUs: z.string().nullable().optional(),
  projectOverview: z.string().nullable().optional(),
  clientNeeds: z.string().nullable().optional(),
  goalsObjectives: z.string().nullable().optional(),
  proposedSolution: z.string().nullable().optional(),
  scopeOfWork: z.string().nullable().optional(),
  deliverables: z.string().nullable().optional(),
  methodology: z.string().nullable().optional(),
  timelineJson: z.array(timelineItemSchema).nullable().optional(),
  termsConditions: z.string().nullable().optional(),
  nextSteps: z.string().nullable().optional(),
  contactInfo: z.string().nullable().optional(),

  sectionOrder: z.array(z.string()),
  sectionVisibility: z.record(z.string(), z.boolean()),

  lineItems: z.array(lineItemSchema),
  discountType: discountTypeSchema,
  discountValue: z.number().nonnegative(),
  taxRate: z.number().nonnegative(),
});

export const patchProposalSchema = z
  .object({
    title: z.string().min(1).optional(),
    status: proposalStatusSchema.optional(),
  })
  .refine((data) => data.title !== undefined || data.status !== undefined, {
    message: "At least one of title or status must be provided",
  });
