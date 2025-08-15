import { ReceiptData, ReceiptItem, ChargeLine, ChargeType } from '../types';

function normalize(text: string): string {
  return text
    .toUpperCase()
    .replace(/[\u20B9\$]/g, '₹')
    .replace(/[\s\t]+/g, ' ')
    .replace(/[OS]/g, (ch) => (ch === 'O' ? '0' : ch))
    .replace(/B/g, '8')
    .trim();
}

function parseAmount(token: string): number | undefined {
  const m = token.match(/₹?\s*(-?\d+(?:\.\d{1,2})?)/);
  return m ? parseFloat(m[1]) : undefined;
}

const TOTAL_REGEX = /(TOTAL|GRAND\s*TOTAL)\s*[:\-]?\s*(₹?\s*\d+(?:\.\d{1,2})?)/;
const SUBTOTAL_REGEX = /(SUB\s*TOTAL|SUBTOTAL|AMOUNT)\s*[:\-]?\s*(₹?\s*\d+(?:\.\d{1,2})?)/;
const TAX_REGEX = /(CGST|SGST|IGST|GST)\s*@?\s*\d+(?:\.\d+)?%?\s*(₹?\s*\d+(?:\.\d{1,2})?)/;
const FEE_REGEX = /(SERVICE\s*CHARGE|PACKING|DELIVERY)\s*(₹?\s*\d+(?:\.\d{1,2})?)/;
const ROUND_REGEX = /(ROUND[\s\-]*OFF)\s*(₹?\s*[-+]?\d+(?:\.\d{1,2})?)/;
const GSTIN_REGEX = /GSTIN\s*[:\-]?\s*([0-9A-Z]{15})/;
const DATE_REGEX = /(\d{1,2}[\-\/]\d{1,2}[\-\/]\d{2,4})/;

export function parseReceiptText(rawText: string): ReceiptData {
  const text = normalize(rawText);
  const lines = text.split(/\n|\r/).map((l) => l.trim()).filter(Boolean);

  const items: ReceiptItem[] = [];
  const charges: ChargeLine[] = [];
  let subtotal: number | undefined;
  let total: number | undefined;
  let merchant: string | undefined;
  let gstin: string | undefined;
  let date: string | undefined;

  // Merchant: first 1-3 non-empty lines
  merchant = lines.slice(0, 3).join(' ').split(' GSTIN')[0]?.slice(0, 60).trim();

  for (const line of lines) {
    const mG = line.match(GSTIN_REGEX);
    if (mG) gstin = mG[1];
    const mD = line.match(DATE_REGEX);
    if (mD) date = mD[1];

    const mT = line.match(TOTAL_REGEX);
    if (mT) total = parseAmount(mT[2]);
    const mST = line.match(SUBTOTAL_REGEX);
    if (mST) subtotal = parseAmount(mST[2]);

    const mTax = line.match(TAX_REGEX);
    if (mTax) {
      const label = mTax[1] as ChargeType;
      const amount = parseAmount(mTax[2]) || 0;
      charges.push({ id: `${label}-${charges.length}`, type: label, label, amount });
      continue;
    }
    const mFee = line.match(FEE_REGEX);
    if (mFee) {
      const label = mFee[1];
      const amount = parseAmount(mFee[2]) || 0;
      const type: ChargeType = label.includes('SERVICE')
        ? 'SERVICE_CHARGE'
        : label.includes('PACKING')
        ? 'PACKING'
        : label.includes('DELIVERY')
        ? 'DELIVERY'
        : 'OTHER';
      charges.push({ id: `${type}-${charges.length}`, type, label, amount });
      continue;
    }
    const mRound = line.match(ROUND_REGEX);
    if (mRound) {
      const amount = parseAmount(mRound[2]) || 0;
      charges.push({ id: `ROUND-${charges.length}`, type: 'ROUND_OFF', label: 'ROUND OFF', amount });
      continue;
    }

    if (/(TOTAL|SUBTOTAL|GSTIN|ROUND|CGST|SGST|IGST|GST|SERVICE|PACKING|DELIVERY)/.test(line)) {
      continue;
    }

    // Item line regex: [qty] name price
    const mItem = line.match(/^\s*(\d+)X?\s+(.+?)\s+₹?\s*(\d+(?:\.\d{1,2})?)\s*$/);
    if (mItem) {
      const qty = parseInt(mItem[1], 10) || 1;
      const name = mItem[2].trim();
      const price = parseFloat(mItem[3]);
      const unit = qty > 0 ? price / qty : price;
      items.push({
        id: `item-${items.length}`,
        name,
        quantity: qty,
        unitPrice: parseFloat(unit.toFixed(2)),
        totalPrice: parseFloat(price.toFixed(2)),
        include: true,
        owners: [],
      });
      continue;
    }
  }

  // If subtotal not detected, compute from items
  if (items.length > 0 && subtotal === undefined) {
    subtotal = parseFloat(items.reduce((s, it) => s + it.totalPrice, 0).toFixed(2));
  }

  // Sanity check: if total not detected, approximate
  if (total === undefined) {
    const nonRoundCharges = charges.filter((c) => c.type !== 'ROUND_OFF');
    const sumCharges = nonRoundCharges.reduce((s, c) => s + c.amount, 0);
    total = parseFloat(((subtotal || 0) + sumCharges).toFixed(2));
  }

  return {
    items,
    charges,
    subtotal,
    total,
    meta: { merchant, gstin, date },
  };
}