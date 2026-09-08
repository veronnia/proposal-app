import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchProposals,
  createProposal,
  deleteProposal,
  duplicateProposal,
  patchProposal,
} from "@/lib/api";

export const proposalsListKey = (search: string, status: string) => ["proposals", { search, status }];

export function useProposalsList(search: string, status: string) {
  return useQuery({
    queryKey: proposalsListKey(search, status),
    queryFn: () => fetchProposals({ search, status }),
  });
}

export function useCreateProposal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProposal,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["proposals"] }),
  });
}

export function useDeleteProposal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProposal,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["proposals"] }),
  });
}

export function useDuplicateProposal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: duplicateProposal,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["proposals"] }),
  });
}

export function useRenameProposal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, title }: { id: string; title: string }) => patchProposal(id, { title }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["proposals"] }),
  });
}

export function useChangeProposalStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: "DRAFT" | "IN_PROGRESS" | "COMPLETED" }) =>
      patchProposal(id, { status }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["proposals"] }),
  });
}
