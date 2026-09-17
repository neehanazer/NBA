import { CostBreakdown, PricingConfig } from '@/types';

export const DEFAULT_PRICING: PricingConfig = {
  id: 'default',
  ratePerPageBW: 2.0,
  ratePerPageColor: 5.0,
  duplexDiscount: 0.1, // 10% discount
  currency: 'INR',
  currencySymbol: '₹',
  isActive: true,
  updatedAt: new Date(),
};

/**
 * Calculates itemized printing cost based on page count, color page detection, duplex option, and copies.
 */
export function calculateCost(
  pageCount: number,
  colorPageNumbers: number[] = [],
  duplex: boolean = false,
  copies: number = 1,
  pricing: Partial<PricingConfig> = {}
): CostBreakdown {
  const safePageCount = Math.max(0, Math.floor(pageCount || 0));
  const safeCopies = Math.max(1, Math.floor(copies || 1));
  
  const rateBW = pricing.ratePerPageBW ?? DEFAULT_PRICING.ratePerPageBW;
  const rateColor = pricing.ratePerPageColor ?? DEFAULT_PRICING.ratePerPageColor;
  const duplexDiscountRate = pricing.duplexDiscount ?? DEFAULT_PRICING.duplexDiscount;

  // Filter valid color pages within 1..safePageCount
  const validColorPages = new Set(
    (colorPageNumbers || []).filter((p) => p >= 1 && p <= safePageCount)
  );

  const colorPages = validColorPages.size;
  const bwPages = Math.max(0, safePageCount - colorPages);

  const colorCost = Number((colorPages * rateColor).toFixed(2));
  const bwCost = Number((bwPages * rateBW).toFixed(2));
  const subtotal = Number((colorCost + bwCost).toFixed(2));

  // Duplex discount only applies if there are at least 2 pages
  const applyDuplex = duplex && safePageCount > 1;
  const duplexDiscount = applyDuplex
    ? Number((subtotal * duplexDiscountRate).toFixed(2))
    : 0;

  const totalPerCopy = Math.max(0, subtotal - duplexDiscount);
  const total = Number((totalPerCopy * safeCopies).toFixed(2));

  return {
    colorPages,
    bwPages,
    colorCost,
    bwCost,
    subtotal,
    duplexDiscount,
    copies: safeCopies,
    total,
  };
}
