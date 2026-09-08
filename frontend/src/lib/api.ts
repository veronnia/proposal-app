import type { Proposal, ProposalListItem, ProposalStatus } from "@/types/proposal";

const BASE = "/api/proposals";

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ? JSON.stringify(body.error) : `Request failed: ${res.status}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export function fetchProposals(params: { search?: string; status?: string }) {
  const query = new URLSearchParams();
  if (params.search) query.set("search", params.search);
  if (params.status) query.set("status", params.status);
  const qs = query.toString();
  return request<ProposalListItem[]>(`${BASE}${qs ? `?${qs}` : ""}`);
}

export function fetchProposal(id: string) {
  return request<Proposal>(`${BASE}/${id}`);
}

export function createProposal(data: { title: string; clientName: string }) {
  return request<Proposal>(BASE, { method: "POST", body: JSON.stringify(data) });
}

export function updateProposal(id: string, data: Omit<Proposal, "id" | "createdAt" | "updatedAt">) {
  return request<Proposal>(`${BASE}/${id}`, { method: "PUT", body: JSON.stringify(data) });
}

export function patchProposal(id: string, data: { title?: string; status?: ProposalStatus }) {
  return request<ProposalListItem>(`${BASE}/${id}`, { method: "PATCH", body: JSON.stringify(data) });
}

export function deleteProposal(id: string) {
  return request<void>(`${BASE}/${id}`, { method: "DELETE" });
}

export function duplicateProposal(id: string) {
  return request<Proposal>(`${BASE}/${id}/duplicate`, { method: "POST" });
}
