export type BoundingBox = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type OcrLine = {
  text: string;
  bbox?: BoundingBox;
};

export type ChargeType =
  | 'CGST'
  | 'SGST'
  | 'IGST'
  | 'GST'
  | 'SERVICE_CHARGE'
  | 'PACKING'
  | 'DELIVERY'
  | 'ROUND_OFF'
  | 'OTHER';

export type ChargeLine = {
  id: string;
  type: ChargeType;
  label: string;
  amount: number;
};

export type ReceiptItem = {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  include: boolean;
  owners: string[];
};

export type ReceiptMeta = {
  merchant?: string;
  gstin?: string;
  date?: string;
};

export type ReceiptData = {
  items: ReceiptItem[];
  charges: ChargeLine[];
  subtotal?: number;
  total?: number;
  meta: ReceiptMeta;
};

export type Person = {
  id: string;
  name: string;
  vpa?: string;
};

export type PretaxByPerson = Record<string, number>;

export type Allocation = Record<string, number>;

export type AllocationResult = {
  pretaxByPerson: PretaxByPerson;
  taxAllocated: Allocation;
  serviceAllocated: Allocation;
  roundOffAllocated: Allocation;
  finalRawAmounts: Allocation;
  finalRoundedAmounts: Allocation;
};