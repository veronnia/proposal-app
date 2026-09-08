import React, { createContext, useContext, useMemo, useReducer } from "react";
import type { LineItem, Proposal, TimelineItem } from "@/types/proposal";
import { createLocalId } from "@/lib/utils";

type DraftAction =
  | { type: "SET_DRAFT"; proposal: Proposal }
  | { type: "UPDATE_FIELD"; field: keyof Proposal; value: unknown }
  | { type: "TOGGLE_SECTION_VISIBILITY"; key: string }
  | { type: "MOVE_SECTION"; key: string; direction: "up" | "down" }
  | { type: "ADD_LINE_ITEM" }
  | { type: "UPDATE_LINE_ITEM"; id: string; patch: Partial<LineItem> }
  | { type: "REMOVE_LINE_ITEM"; id: string }
  | { type: "ADD_TIMELINE_ITEM" }
  | { type: "UPDATE_TIMELINE_ITEM"; id: string; patch: Partial<TimelineItem> }
  | { type: "REMOVE_TIMELINE_ITEM"; id: string };

function reducer(state: Proposal | null, action: DraftAction): Proposal | null {
  if (action.type === "SET_DRAFT") return action.proposal;
  if (!state) return state;

  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };

    case "TOGGLE_SECTION_VISIBILITY":
      return {
        ...state,
        sectionVisibility: {
          ...state.sectionVisibility,
          [action.key]: !state.sectionVisibility[action.key],
        },
      };

    case "MOVE_SECTION": {
      const order = [...state.sectionOrder];
      const index = order.indexOf(action.key);
      if (index === -1) return state;
      const swapWith = action.direction === "up" ? index - 1 : index + 1;
      if (swapWith < 0 || swapWith >= order.length) return state;
      [order[index], order[swapWith]] = [order[swapWith], order[index]];
      return { ...state, sectionOrder: order };
    }

    case "ADD_LINE_ITEM":
      return {
        ...state,
        lineItems: [
          ...state.lineItems,
          { id: createLocalId("li"), description: "", quantity: 1, unitPrice: 0 },
        ],
      };

    case "UPDATE_LINE_ITEM":
      return {
        ...state,
        lineItems: state.lineItems.map((item) =>
          item.id === action.id ? { ...item, ...action.patch } : item
        ),
      };

    case "REMOVE_LINE_ITEM":
      return { ...state, lineItems: state.lineItems.filter((item) => item.id !== action.id) };

    case "ADD_TIMELINE_ITEM":
      return {
        ...state,
        timelineJson: [
          ...(state.timelineJson ?? []),
          { id: createLocalId("tl"), label: "", startDate: null, endDate: null, description: "" },
        ],
      };

    case "UPDATE_TIMELINE_ITEM":
      return {
        ...state,
        timelineJson: (state.timelineJson ?? []).map((item) =>
          item.id === action.id ? { ...item, ...action.patch } : item
        ),
      };

    case "REMOVE_TIMELINE_ITEM":
      return {
        ...state,
        timelineJson: (state.timelineJson ?? []).filter((item) => item.id !== action.id),
      };

    default:
      return state;
  }
}

interface DraftContextValue {
  draft: Proposal;
  dispatch: React.Dispatch<DraftAction>;
}

const ProposalDraftContext = createContext<DraftContextValue | null>(null);

export function ProposalDraftProvider({
  proposal,
  children,
}: {
  proposal: Proposal;
  children: React.ReactNode;
}) {
  const [draft, dispatch] = useReducer(reducer, proposal);

  const value = useMemo(() => ({ draft: draft as Proposal, dispatch }), [draft]);

  return <ProposalDraftContext.Provider value={value}>{children}</ProposalDraftContext.Provider>;
}

export function useProposalDraft() {
  const ctx = useContext(ProposalDraftContext);
  if (!ctx) throw new Error("useProposalDraft must be used within ProposalDraftProvider");
  return ctx;
}
