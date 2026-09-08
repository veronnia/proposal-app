import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProposal, updateProposal } from "@/lib/api";
import type { Proposal } from "@/types/proposal";

export function useProposal(id: string) {
  return useQuery({
    queryKey: ["proposal", id],
    queryFn: () => fetchProposal(id),
    enabled: Boolean(id),
  });
}

export function useSaveProposal(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Proposal, "id" | "createdAt" | "updatedAt">) => updateProposal(id, data),
    onSuccess: (updated) => {
      queryClient.setQueryData(["proposal", id], updated);
      queryClient.invalidateQueries({ queryKey: ["proposals"] });
    },
  });
}
