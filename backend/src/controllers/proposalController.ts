import { Request, Response } from "express";
import { prisma } from "../prismaClient";
import { calculateTotals, LineItem } from "../lib/pricing";
import {
  createProposalSchema,
  updateProposalSchema,
  patchProposalSchema,
} from "../validation/proposalSchema";

export const DEFAULT_SECTION_ORDER = [
  "executiveSummary",
  "aboutUs",
  "projectOverview",
  "clientNeeds",
  "goalsObjectives",
  "proposedSolution",
  "scopeOfWork",
  "deliverables",
  "methodology",
  "timeline",
  "pricing",
  "termsConditions",
  "nextSteps",
  "contactInfo",
];

function defaultSectionVisibility() {
  return Object.fromEntries(DEFAULT_SECTION_ORDER.map((key) => [key, true]));
}

// Converts a Prisma row (JSON-encoded string columns) into the API's parsed-object shape.
function toApiShape(proposal: any) {
  return {
    ...proposal,
    timelineJson: proposal.timelineJson ? JSON.parse(proposal.timelineJson) : null,
    sectionOrder: JSON.parse(proposal.sectionOrder),
    sectionVisibility: JSON.parse(proposal.sectionVisibility),
    lineItems: JSON.parse(proposal.lineItems),
  };
}

function toSlimShape(proposal: any) {
  return {
    id: proposal.id,
    title: proposal.title,
    clientName: proposal.clientName,
    status: proposal.status,
    total: proposal.total,
    updatedAt: proposal.updatedAt,
  };
}

export async function listProposals(req: Request, res: Response) {
  const { search, status } = req.query;

  const where: any = {};
  if (typeof status === "string" && status.length > 0) {
    where.status = status;
  }
  if (typeof search === "string" && search.length > 0) {
    where.OR = [
      { title: { contains: search } },
      { clientName: { contains: search } },
    ];
  }

  const proposals = await prisma.proposal.findMany({
    where,
    orderBy: { updatedAt: "desc" },
  });

  res.json(proposals.map(toSlimShape));
}

export async function createProposal(req: Request, res: Response) {
  const parsed = createProposalSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const { title, clientName } = parsed.data;

  const proposal = await prisma.proposal.create({
    data: {
      title,
      clientName,
      sectionOrder: JSON.stringify(DEFAULT_SECTION_ORDER),
      sectionVisibility: JSON.stringify(defaultSectionVisibility()),
      lineItems: JSON.stringify([]),
    },
  });

  res.status(201).json(toApiShape(proposal));
}

export async function getProposal(req: Request, res: Response) {
  const proposal = await prisma.proposal.findUnique({ where: { id: req.params.id } });
  if (!proposal) {
    return res.status(404).json({ error: "Proposal not found" });
  }
  res.json(toApiShape(proposal));
}

export async function updateProposal(req: Request, res: Response) {
  const existing = await prisma.proposal.findUnique({ where: { id: req.params.id } });
  if (!existing) {
    return res.status(404).json({ error: "Proposal not found" });
  }

  const parsed = updateProposalSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const data = parsed.data;
  const totals = calculateTotals(
    data.lineItems as LineItem[],
    data.discountType,
    data.discountValue,
    data.taxRate
  );

  const proposal = await prisma.proposal.update({
    where: { id: req.params.id },
    data: {
      status: data.status,
      title: data.title,
      clientName: data.clientName,
      clientContactName: data.clientContactName,
      clientEmail: data.clientEmail,
      clientPhone: data.clientPhone,
      projectName: data.projectName,
      proposalDate: new Date(data.proposalDate),
      preparedBy: data.preparedBy,

      companyName: data.companyName,
      primaryColor: data.primaryColor,
      companyContact: data.companyContact,

      executiveSummary: data.executiveSummary,
      aboutUs: data.aboutUs,
      projectOverview: data.projectOverview,
      clientNeeds: data.clientNeeds,
      goalsObjectives: data.goalsObjectives,
      proposedSolution: data.proposedSolution,
      scopeOfWork: data.scopeOfWork,
      deliverables: data.deliverables,
      methodology: data.methodology,
      timelineJson: data.timelineJson ? JSON.stringify(data.timelineJson) : null,
      termsConditions: data.termsConditions,
      nextSteps: data.nextSteps,
      contactInfo: data.contactInfo,

      sectionOrder: JSON.stringify(data.sectionOrder),
      sectionVisibility: JSON.stringify(data.sectionVisibility),

      lineItems: JSON.stringify(data.lineItems),
      discountType: data.discountType,
      discountValue: data.discountValue,
      taxRate: data.taxRate,
      subtotal: totals.subtotal,
      discountAmount: totals.discountAmount,
      taxAmount: totals.taxAmount,
      total: totals.total,
    },
  });

  res.json(toApiShape(proposal));
}

export async function patchProposal(req: Request, res: Response) {
  const parsed = patchProposalSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const existing = await prisma.proposal.findUnique({ where: { id: req.params.id } });
  if (!existing) {
    return res.status(404).json({ error: "Proposal not found" });
  }

  const proposal = await prisma.proposal.update({
    where: { id: req.params.id },
    data: parsed.data,
  });

  res.json(toSlimShape(proposal));
}

export async function deleteProposal(req: Request, res: Response) {
  const existing = await prisma.proposal.findUnique({ where: { id: req.params.id } });
  if (!existing) {
    return res.status(404).json({ error: "Proposal not found" });
  }

  await prisma.proposal.delete({ where: { id: req.params.id } });
  res.status(204).send();
}

export async function duplicateProposal(req: Request, res: Response) {
  const original = await prisma.proposal.findUnique({ where: { id: req.params.id } });
  if (!original) {
    return res.status(404).json({ error: "Proposal not found" });
  }

  const { id, createdAt, updatedAt, ...rest } = original;

  const copy = await prisma.proposal.create({
    data: {
      ...rest,
      title: `${original.title} (Copy)`,
      status: "DRAFT",
    },
  });

  res.status(201).json(toApiShape(copy));
}
