import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useProposalDraft } from "@/hooks/useProposalDraft";

export function TimelineForm() {
  const { draft, dispatch } = useProposalDraft();
  const items = draft.timelineJson ?? [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="mb-0">Timeline & Milestones</Label>
        <Button size="sm" variant="secondary" onClick={() => dispatch({ type: "ADD_TIMELINE_ITEM" })}>
          <Plus className="h-3.5 w-3.5" /> Add milestone
        </Button>
      </div>

      {items.length === 0 && (
        <p className="rounded-lg border border-dashed border-ink-300 p-4 text-sm text-ink-500">
          No milestones yet. Add one to outline your project timeline.
        </p>
      )}

      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={item.id} className="rounded-lg border border-ink-200 p-3">
            <div className="flex items-start gap-2">
              <div className="flex-1 space-y-2">
                <Input
                  placeholder={`Milestone ${index + 1} (e.g. Kickoff)`}
                  value={item.label}
                  onChange={(e) =>
                    dispatch({ type: "UPDATE_TIMELINE_ITEM", id: item.id, patch: { label: e.target.value } })
                  }
                />
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="date"
                    value={item.startDate ?? ""}
                    onChange={(e) =>
                      dispatch({
                        type: "UPDATE_TIMELINE_ITEM",
                        id: item.id,
                        patch: { startDate: e.target.value || null },
                      })
                    }
                  />
                  <Input
                    type="date"
                    value={item.endDate ?? ""}
                    onChange={(e) =>
                      dispatch({
                        type: "UPDATE_TIMELINE_ITEM",
                        id: item.id,
                        patch: { endDate: e.target.value || null },
                      })
                    }
                  />
                </div>
                <Textarea
                  rows={2}
                  placeholder="Details about this milestone..."
                  value={item.description ?? ""}
                  onChange={(e) =>
                    dispatch({
                      type: "UPDATE_TIMELINE_ITEM",
                      id: item.id,
                      patch: { description: e.target.value },
                    })
                  }
                />
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => dispatch({ type: "REMOVE_TIMELINE_ITEM", id: item.id })}
                aria-label="Remove milestone"
              >
                <Trash2 className="h-4 w-4 text-ink-500" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
