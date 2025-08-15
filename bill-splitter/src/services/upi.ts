export type UpiParams = {
  vpa: string;
  name: string;
  amount: number;
  note: string;
};

export function buildUpiDeepLink({ vpa, name, amount, note }: UpiParams): string {
  const params = new URLSearchParams({
    pa: vpa,
    pn: name,
    am: amount.toFixed(2),
    cu: 'INR',
    tn: note.slice(0, 70),
  });
  return `upi://pay?${params.toString()}`;
}