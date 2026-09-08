-- CreateTable
CREATE TABLE "Proposal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "title" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "clientContactName" TEXT,
    "clientEmail" TEXT,
    "clientPhone" TEXT,
    "projectName" TEXT,
    "proposalDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "preparedBy" TEXT,
    "companyName" TEXT,
    "primaryColor" TEXT DEFAULT '#2563eb',
    "companyContact" TEXT,
    "executiveSummary" TEXT,
    "aboutUs" TEXT,
    "projectOverview" TEXT,
    "clientNeeds" TEXT,
    "goalsObjectives" TEXT,
    "proposedSolution" TEXT,
    "scopeOfWork" TEXT,
    "deliverables" TEXT,
    "methodology" TEXT,
    "timelineJson" TEXT,
    "termsConditions" TEXT,
    "nextSteps" TEXT,
    "contactInfo" TEXT,
    "sectionOrder" TEXT NOT NULL,
    "sectionVisibility" TEXT NOT NULL,
    "lineItems" TEXT NOT NULL,
    "discountType" TEXT,
    "discountValue" REAL NOT NULL DEFAULT 0,
    "taxRate" REAL NOT NULL DEFAULT 0,
    "subtotal" REAL NOT NULL DEFAULT 0,
    "discountAmount" REAL NOT NULL DEFAULT 0,
    "taxAmount" REAL NOT NULL DEFAULT 0,
    "total" REAL NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE INDEX "Proposal_status_idx" ON "Proposal"("status");

-- CreateIndex
CREATE INDEX "Proposal_updatedAt_idx" ON "Proposal"("updatedAt");
