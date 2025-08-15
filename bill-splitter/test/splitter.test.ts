import { describe, expect, it } from 'vitest';
import { computeAllocations, largestRemainder, allocateProportionally } from '../src/services/splitter';
import { ReceiptData } from '../src/types';

describe('largestRemainder', () => {
  it('distributes leftover paise correctly', () => {
    const raw = { a: 10.335, b: 10.334, c: 10.331 };
    const rounded = largestRemainder(raw);
    const sumRounded = Object.values(rounded).reduce((s, v) => s + v, 0);
    const sumRaw = Object.values(raw).reduce((s, v) => s + v, 0);
    expect(sumRounded.toFixed(2)).toBe(sumRaw.toFixed(2));
  });
});

describe('allocateProportionally', () => {
  it('allocates by pretax proportions', () => {
    const pretax = { a: 100, b: 50 };
    const alloc = allocateProportionally(30, pretax);
    expect(alloc.a + alloc.b).toBeCloseTo(30, 2);
    expect(alloc.a).toBeCloseTo(20, 2);
    expect(alloc.b).toBeCloseTo(10, 2);
  });
});

describe('computeAllocations', () => {
  it('computes per-person totals including tax and fees', () => {
    const receipt: ReceiptData = {
      items: [
        { id: 'i1', name: 'DOSAI', quantity: 2, unitPrice: 120, totalPrice: 240, include: true, owners: ['a', 'b'] },
        { id: 'i2', name: 'IDLI', quantity: 1, unitPrice: 60, totalPrice: 60, include: true, owners: ['a'] },
      ],
      charges: [
        { id: 'c1', type: 'CGST', label: 'CGST 2.5%', amount: 7.5 },
        { id: 'c2', type: 'SGST', label: 'SGST 2.5%', amount: 7.5 },
        { id: 'c3', type: 'SERVICE_CHARGE', label: 'SERVICE CHARGE', amount: 10 },
        { id: 'c4', type: 'ROUND_OFF', label: 'ROUND OFF', amount: -0.04 },
      ],
      subtotal: 300,
      total: 325.0,
      meta: { merchant: 'Cafe XYZ', date: '15-08-2025' },
    };
    const result = computeAllocations(receipt, ['a', 'b']);
    const sumRounded = Object.values(result.finalRoundedAmounts).reduce((s, v) => s + v, 0);
    expect(sumRounded).toBeCloseTo(receipt.total || 325.0, 2);
  });
});