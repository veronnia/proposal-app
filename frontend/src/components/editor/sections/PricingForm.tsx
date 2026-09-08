import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProposalDraft } from "@/hooks/useProposalDraft";
import { calculateTotals } from "@/lib/pricing";
import { cn, formatCurrency } from "@/lib/utils";
import type { DiscountType } from "@/types/proposal";

export function PricingForm() {
  const { draft, dispatch } = useProposalDraft();
  const totals = calculateTotals(draft.lineItems, draft.discountType, draft.discountValue, draft.taxRate);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <Label className="mb-0">Line Items</Label>
        <Button size="sm" variant="secondary" onClick={() => dispatch({ type: "ADD_LINE_ITEM" })}>
          <Plus className="h-3.5 w-3.5" /> Add item
        </Button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-ink-200">
        <table className="w-full min-w-[520px] text-sm">
          <thead className="bg-ink-50 text-left text-xs font-medium uppercase tracking-wide text-ink-500">
            <tr>
              <th className="px-3 py-2">Description</th>
              <th className="w-20 px-3 py-2">Qty</th>
              <th className="w-28 px-3 py-2">Unit Price</th>
              <th className="w-28 px-3 py-2 text-right">Subtotal</th>
              <th className="w-10 px-3 py-2" />
            </tr>
          </thead>
          <tbody>
            {draft.lineItems.length === 0 && (
              <tr>
                <td colSpan={5} className="px-3 py-6 text-center text-sm text-ink-500">
                  No line items yet. Add your first service or product.
                </td>
              </tr>
            )}
            {draft.lineItems.map((item) => (
              <tr key={item.id} className="border-t border-ink-200">
                <td className="px-3 py-2">
                  <Input
                    value={item.description}
                    placeholder="Service description"
                    onChange={(e) =>
                      dispatch({
                        type: "UPDATE_LINE_ITEM",
                        id: item.id,
                        patch: { description: e.target.value },
                      })
                    }
                  />
                </td>
                <td className="px-3 py-2">
                  <Input
                    type="number"
                    min={0}
                    value={item.quantity}
                    onChange={(e) =>
                      dispatch({
                        type: "UPDATE_LINE_ITEM",
                        id: item.id,
                        patch: { quantity: Number(e.target.value) || 0 },
                      })
                    }
                  />
                </td>
                <td className="px-3 py-2">
                  <Input
                    type="number"
                    min={0}
                    step="0.01"
                    value={item.unitPrice}
                    onChange={(e) =>
                      dispatch({
                        type: "UPDATE_LINE_ITEM",
                        id: item.id,
                        patch: { unitPrice: Number(e.target.value) || 0 },
                      })
                    }
                  />
                </td>
                <td className="px-3 py-2 text-right font-medium text-ink-900">
                  {formatCurrency(item.quantity * item.unitPrice)}
                </td>
                <td className="px-3 py-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => dispatch({ type: "REMOVE_LINE_ITEM", id: item.id })}
                    aria-label="Remove line item"
                  >
                    <Trash2 className="h-4 w-4 text-ink-500" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <Label>Discount type</Label>
          <select
            className={cn(
              "flex h-9 w-full rounded-lg border border-ink-200 bg-white px-3 text-sm shadow-sm",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            )}
            value={draft.discountType ?? ""}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "discountType",
                value: (e.target.value || null) as DiscountType,
              })
            }
          >
            <option value="">No discount</option>
            <option value="PERCENT">Percent (%)</option>
            <option value="FLAT">Flat amount ($)</option>
          </select>
        </div>
        <div>
          <Label>Discount value</Label>
          <Input
            type="number"
            min={0}
            step="0.01"
            disabled={!draft.discountType}
            value={draft.discountValue}
            onChange={(e) =>
              dispatch({ type: "UPDATE_FIELD", field: "discountValue", value: Number(e.target.value) || 0 })
            }
          />
        </div>
        <div>
          <Label>Tax rate (%)</Label>
          <Input
            type="number"
            min={0}
            step="0.01"
            value={draft.taxRate}
            onChange={(e) => dispatch({ type: "UPDATE_FIELD", field: "taxRate", value: Number(e.target.value) || 0 })}
          />
        </div>
      </div>

      <div className="ml-auto w-full max-w-xs space-y-1.5 rounded-lg bg-ink-50 p-4 text-sm">
        <div className="flex justify-between text-ink-700">
          <span>Subtotal</span>
          <span>{formatCurrency(totals.subtotal)}</span>
        </div>
        {draft.discountType && (
          <div className="flex justify-between text-ink-700">
            <span>Discount</span>
            <span>-{formatCurrency(totals.discountAmount)}</span>
          </div>
        )}
        {draft.taxRate > 0 && (
          <div className="flex justify-between text-ink-700">
            <span>Tax</span>
            <span>{formatCurrency(totals.taxAmount)}</span>
          </div>
        )}
        <div className="flex justify-between border-t border-ink-200 pt-1.5 text-base font-semibold text-ink-900">
          <span>Total</span>
          <span>{formatCurrency(totals.total)}</span>
        </div>
      </div>
    </div>
  );
}
