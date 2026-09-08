import { Badge } from "@/components/ui/badge";
import type { ProposalStatus } from "@/types/proposal";

const STATUS_CONFIG: Record<ProposalStatus, { label: string; variant: "neutral" | "brand" | "success" }> = {
  DRAFT: { label: "Draft", variant: "neutral" },
  IN_PROGRESS: { label: "In Progress", variant: "brand" },
  COMPLETED: { label: "Completed", variant: "success" },
};

export function StatusBadge({ status }: { status: ProposalStatus }) {
  const config = STATUS_CONFIG[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
