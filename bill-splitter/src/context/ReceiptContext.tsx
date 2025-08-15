import React, { createContext, useContext, useMemo, useState } from 'react';
import type { Person, ReceiptData } from '../types';

export type ReceiptContextValue = {
  imageUri?: string;
  setImageUri: (uri?: string) => void;
  ocrText: string;
  setOcrText: (text: string) => void;
  receipt?: ReceiptData;
  setReceipt: (data?: ReceiptData) => void;
  people: Person[];
  addPerson: (person: Person) => void;
  updatePerson: (person: Person) => void;
  removePerson: (personId: string) => void;
};

const ReceiptContext = createContext<ReceiptContextValue | undefined>(undefined);

export function ReceiptProvider({ children }: { children: React.ReactNode }) {
  const [imageUri, setImageUri] = useState<string | undefined>(undefined);
  const [ocrText, setOcrText] = useState<string>('');
  const [receipt, setReceipt] = useState<ReceiptData | undefined>(undefined);
  const [people, setPeople] = useState<Person[]>([]);

  const value = useMemo<ReceiptContextValue>(() => ({
    imageUri,
    setImageUri,
    ocrText,
    setOcrText,
    receipt,
    setReceipt,
    people,
    addPerson: (person: Person) => setPeople((prev) => [...prev, person]),
    updatePerson: (person: Person) =>
      setPeople((prev) => prev.map((p) => (p.id === person.id ? person : p))),
    removePerson: (personId: string) =>
      setPeople((prev) => prev.filter((p) => p.id !== personId)),
  }), [imageUri, ocrText, receipt, people]);

  return (
    <ReceiptContext.Provider value={value}>{children}</ReceiptContext.Provider>
  );
}

export function useReceipt() {
  const ctx = useContext(ReceiptContext);
  if (!ctx) throw new Error('useReceipt must be used within ReceiptProvider');
  return ctx;
}