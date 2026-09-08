export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export type DiscountType = "PERCENT" | "FLAT" | null;

export interface PricingTotals {
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  total: number;
}

export function calculateTotals(
  lineItems: LineItem[],
  discountType: DiscountType,
  discountValue: number,
  taxRate: number
): PricingTotals {
  const subtotal = lineItems.reduce((sum, li) => sum + li.quantity * li.unitPrice, 0);

  const discountAmount =
    discountType === "PERCENT"
      ? subtotal * (discountValue / 100)
      : discountType === "FLAT"
        ? Math.min(discountValue, subtotal)
        : 0;

  const taxableBase = subtotal - discountAmount;
  const taxAmount = taxableBase * (taxRate / 100);
  const total = taxableBase + taxAmount;

  return { subtotal, discountAmount, taxAmount, total };
}
