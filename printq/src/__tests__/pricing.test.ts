import { calculateCost, DEFAULT_PRICING } from '../lib/pricing';

describe('Pricing Calculator Engine', () => {
  const pricing = {
    ratePerPageBW: 2.0,
    ratePerPageColor: 5.0,
    duplexDiscount: 0.1, // 10%
  };

  test('calculates pure B&W document correctly', () => {
    const result = calculateCost(10, [], false, 1, pricing);
    expect(result.bwPages).toBe(10);
    expect(result.colorPages).toBe(0);
    expect(result.bwCost).toBe(20.0);
    expect(result.colorCost).toBe(0);
    expect(result.duplexDiscount).toBe(0);
    expect(result.total).toBe(20.0);
  });

  test('calculates document with color pages correctly', () => {
    // 10 pages total, pages 1, 3, 5 are color
    const result = calculateCost(10, [1, 3, 5], false, 1, pricing);
    expect(result.bwPages).toBe(7);
    expect(result.colorPages).toBe(3);
    expect(result.bwCost).toBe(14.0); // 7 * 2 = 14
    expect(result.colorCost).toBe(15.0); // 3 * 5 = 15
    expect(result.subtotal).toBe(29.0);
    expect(result.total).toBe(29.0);
  });

  test('applies duplex discount (10%) on multi-page document', () => {
    // 10 pages, all BW, duplex = true
    const result = calculateCost(10, [], true, 1, pricing);
    expect(result.subtotal).toBe(20.0);
    expect(result.duplexDiscount).toBe(2.0); // 10% of 20 = 2.0
    expect(result.total).toBe(18.0);
  });

  test('does NOT apply duplex discount on a single-page document', () => {
    // 1 page cannot be duplexed
    const result = calculateCost(1, [], true, 1, pricing);
    expect(result.subtotal).toBe(2.0);
    expect(result.duplexDiscount).toBe(0);
    expect(result.total).toBe(2.0);
  });

  test('multiplies correctly for multiple copies', () => {
    // 5 pages, 1 color (p2), duplex = true, 3 copies
    // Subtotal: 4 BW ($8) + 1 Color ($5) = $13
    // Duplex discount: 10% of 13 = $1.30
    // Total per copy: $11.70
    // 3 copies: 11.70 * 3 = $35.10
    const result = calculateCost(5, [2], true, 3, pricing);
    expect(result.subtotal).toBe(13.0);
    expect(result.duplexDiscount).toBe(1.3);
    expect(result.copies).toBe(3);
    expect(result.total).toBe(35.1);
  });

  test('handles edge case: 0 pages or negative pages gracefully', () => {
    const result = calculateCost(0, [], false, 1, pricing);
    expect(result.bwPages).toBe(0);
    expect(result.colorPages).toBe(0);
    expect(result.total).toBe(0);
  });

  test('filters out out-of-range color pages', () => {
    // 3 page document, but color page numbers array has page 99 and page 0
    const result = calculateCost(3, [0, 2, 99], false, 1, pricing);
    expect(result.colorPages).toBe(1); // only page 2 is valid
    expect(result.bwPages).toBe(2);
    expect(result.total).toBe(9.0); // 2*2 + 1*5 = 9
  });
});
