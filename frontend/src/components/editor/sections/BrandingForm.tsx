import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useProposalDraft } from "@/hooks/useProposalDraft";

const PRESET_COLORS = ["#2563eb", "#7c3aed", "#0f766e", "#b91c1c", "#c2410c", "#0e7490"];

export function BrandingForm() {
  const { draft, dispatch } = useProposalDraft();

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="companyName">Company Name</Label>
        <Input
          id="companyName"
          value={draft.companyName ?? ""}
          onChange={(e) => dispatch({ type: "UPDATE_FIELD", field: "companyName", value: e.target.value })}
          placeholder="Your company name"
        />
      </div>
      <div>
        <Label>Primary Color</Label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            className="h-9 w-12 cursor-pointer rounded-md border border-ink-200"
            value={draft.primaryColor ?? "#2563eb"}
            onChange={(e) => dispatch({ type: "UPDATE_FIELD", field: "primaryColor", value: e.target.value })}
          />
          <div className="flex gap-1.5">
            {PRESET_COLORS.map((color) => (
              <button
                key={color}
                type="button"
                aria-label={`Use color ${color}`}
                className="h-7 w-7 rounded-full border border-ink-200"
                style={{ backgroundColor: color }}
                onClick={() => dispatch({ type: "UPDATE_FIELD", field: "primaryColor", value: color })}
              />
            ))}
          </div>
        </div>
      </div>
      <div>
        <Label htmlFor="companyContact">Company Contact Info</Label>
        <Textarea
          id="companyContact"
          rows={3}
          value={draft.companyContact ?? ""}
          onChange={(e) => dispatch({ type: "UPDATE_FIELD", field: "companyContact", value: e.target.value })}
          placeholder="Address, phone, email, website..."
        />
      </div>
    </div>
  );
}
