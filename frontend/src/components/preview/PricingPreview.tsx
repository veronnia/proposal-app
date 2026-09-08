import { calculateTotals } from "@/lib/pricing";
import { formatCurrency, getReadableTextColor, tint } from "@/lib/utils";
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
  const onAccentText = getReadableTextColor(accent);

  if (lineItems.length === 0) {
    return <p className="font-sans text-sm italic text-ink-400">No pricing added yet.</p>;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-ink-200" style={{ borderColor: tint(accent, 0.25) }}>
      <table className="w-full text-sm">
        <thead>
          <tr className="font-display text-left text-xs font-semibold uppercase text-ink-500" style={{ letterSpacing: "0.08em", backgroundColor: tint(accent, 0.06) }}>
            <th className="px-5 py-3">Description</th>
            <th className="px-5 py-3 text-right">Qty</th>
            <th className="px-5 py-3 text-right">Unit Price</th>
            <th className="px-5 py-3 text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {lineItems.map((item) => (
            <tr key={item.id} className="border-t" style={{ borderColor: tint(accent, 0.12) }}>
              <td className="px-5 py-3 font-serif text-ink-900">{item.description || "—"}</td>
              <td className="px-5 py-3 text-right font-sans text-ink-600">{item.quantity}</td>
              <td className="px-5 py-3 text-right font-sans text-ink-600">{formatCurrency(item.unitPrice)}</td>
              <td className="px-5 py-3 text-right font-sans font-medium text-ink-900">
                {formatCurrency(item.quantity * item.unitPrice)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="space-y-1.5 border-t px-5 py-4 font-sans text-sm" style={{ borderColor: tint(accent, 0.2), backgroundColor: tint(accent, 0.04) }}>
        <div className="flex justify-between text-ink-600">
          <span>Subtotal</span>
          <span>{formatCurrency(totals.subtotal)}</span>
        </div>
        {discountType && (
          <div className="flex justify-between text-ink-600">
            <span>Discount</span>
            <span>-{formatCurrency(totals.discountAmount)}</span>
          </div>
        )}
        {taxRate > 0 && (
          <div className="flex justify-between text-ink-600">
            <span>Tax</span>
            <span>{formatCurrency(totals.taxAmount)}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between px-5 py-4" style={{ backgroundColor: accent, color: onAccentText }}>
        <span className="font-display text-sm font-semibold uppercase" style={{ letterSpacing: "0.08em" }}>
          Total Investment
        </span>
        <span className="font-display text-2xl font-semibold">{formatCurrency(totals.total)}</span>
      </div>
    </div>
  );
}
