import { calculateTotals } from "@/lib/pricing";
import { formatCurrency } from "@/lib/utils";
import type { DiscountType, LineItem } from "@/types/proposal";

export function PricingPreview({
  lineItems,
  discountType,
  discountValue,
  taxRate,
  accent,
}: {
  lineItems: LineItem[];
  discountType: DiscountType;
  discountValue: number;
  taxRate: number;
  accent: string;
}) {
  const totals = calculateTotals(lineItems, discountType, discountValue, taxRate);

  if (lineItems.length === 0) {
    return <p className="italic text-ink-400">No pricing added yet.</p>;
  }

  return (
    <div>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-left text-xs font-medium uppercase tracking-wide text-ink-500" style={{ borderColor: accent }}>
            <th className="py-2">Description</th>
            <th className="py-2 text-right">Qty</th>
            <th className="py-2 text-right">Unit Price</th>
            <th className="py-2 text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {lineItems.map((item) => (
            <tr key={item.id} className="border-b border-ink-100">
              <td className="py-2 text-ink-900">{item.description || "—"}</td>
              <td className="py-2 text-right">{item.quantity}</td>
              <td className="py-2 text-right">{formatCurrency(item.unitPrice)}</td>
              <td className="py-2 text-right font-medium text-ink-900">
                {formatCurrency(item.quantity * item.unitPrice)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="ml-auto mt-3 w-full max-w-xs space-y-1">
        <div className="flex justify-between text-ink-700">
          <span>Subtotal</span>
          <span>{formatCurrency(totals.subtotal)}</span>
        </div>
        {discountType && (
          <div className="flex justify-between text-ink-700">
            <span>Discount</span>
            <span>-{formatCurrency(totals.discountAmount)}</span>
          </div>
        )}
        {taxRate > 0 && (
          <div className="flex justify-between text-ink-700">
            <span>Tax</span>
            <span>{formatCurrency(totals.taxAmount)}</span>
          </div>
        )}
        <div className="flex justify-between border-t border-ink-200 pt-1 text-base font-semibold text-ink-900">
          <span>Total</span>
          <span>{formatCurrency(totals.total)}</span>
        </div>
      </div>
    </div>
  );
}
