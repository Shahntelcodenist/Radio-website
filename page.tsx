'use client';

import { useMemo, useState } from 'react';
import { PlusIcon, TrashIcon, PrinterIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { STATION } from '@/lib/config';

interface LineItem {
  id: string;
  description: string;
  qty: number;
  rate: number;
}

function invoiceNumber() {
  const now = new Date();
  return `TGT-INV-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}-${Math.floor(
    1000 + Math.random() * 9000
  )}`;
}

export default function InvoicePage() {
  const [number] = useState(invoiceNumber);
  const [date] = useState(() => new Date().toISOString().slice(0, 10));
  const [customer, setCustomer] = useState({ name: '', company: '', email: '', address: '' });
  const [items, setItems] = useState<LineItem[]>([
    { id: crypto.randomUUID(), description: '30-second radio spot × 20 airings', qty: 1, rate: 15000 }
  ]);
  const [taxPct, setTaxPct] = useState(16);
  const [discountPct, setDiscountPct] = useState(0);

  const subtotal = useMemo(() => items.reduce((sum, it) => sum + it.qty * it.rate, 0), [items]);
  const discount = subtotal * (discountPct / 100);
  const taxable = subtotal - discount;
  const tax = taxable * (taxPct / 100);
  const total = taxable + tax;

  const addItem = () =>
    setItems((prev) => [...prev, { id: crypto.randomUUID(), description: '', qty: 1, rate: 0 }]);
  const removeItem = (id: string) => setItems((prev) => prev.filter((it) => it.id !== id));
  const updateItem = (id: string, patch: Partial<LineItem>) =>
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...patch } : it)));

  const emailInvoice = () => {
    const body = encodeURIComponent(
      `Invoice ${number}\nDate: ${date}\nTotal due: KES ${total.toLocaleString()}\n\nSee attached / printed copy for the full breakdown.`
    );
    window.location.href = `mailto:${customer.email || ''}?subject=${encodeURIComponent(
      `${STATION.name} Invoice ${number}`
    )}&body=${body}`;
  };

  return (
    <div className="max-w-4xl mx-auto px-5 md:px-8 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 print:hidden">
        <h1 className="font-display font-bold text-3xl text-navy-700">Invoice Generator</h1>
        <div className="flex gap-3">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 rounded-full border border-navy-200 px-4 py-2 text-sm font-semibold text-navy-700 hover:border-signal hover:text-signal transition-colors"
          >
            <PrinterIcon className="h-4 w-4" /> Print / Save as PDF
          </button>
          <button
            onClick={emailInvoice}
            className="flex items-center gap-2 rounded-full bg-signal px-4 py-2 text-sm font-semibold text-white hover:bg-signal-600 transition-colors"
          >
            <EnvelopeIcon className="h-4 w-4" /> Email Invoice
          </button>
        </div>
      </div>

      <div id="invoice-sheet" className="rounded-2xl border border-navy-100 p-8 md:p-10 shadow-panel print:shadow-none print:border-none">
        <div className="flex flex-wrap justify-between gap-6 pb-8 border-b border-navy-100">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-navy-700 text-white font-display font-bold text-sm">
                TR
              </span>
              <div className="leading-none">
                <p className="font-display font-bold text-navy-700 text-[15px]">{STATION.name}</p>
                <p className="font-mono text-[11px] tracking-widest text-signal">{STATION.frequency}</p>
              </div>
            </div>
            <p className="text-xs text-navy-400 leading-relaxed">
              {STATION.address}
              <br />
              {STATION.email} · {STATION.phone}
            </p>
          </div>
          <div className="text-right">
            <h2 className="font-display font-bold text-2xl text-navy-700">INVOICE</h2>
            <p className="font-mono text-sm text-signal mt-1">{number}</p>
            <p className="text-xs text-navy-400 mt-1">Date: {date}</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 py-8 border-b border-navy-100 print:hidden">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-wider text-navy-400 font-semibold">Bill To</p>
            <input
              placeholder="Customer / company name"
              value={customer.company}
              onChange={(e) => setCustomer({ ...customer, company: e.target.value })}
              className="w-full rounded-lg border border-navy-200 px-3 py-2 text-sm outline-none focus-visible:ring-2 ring-signal"
            />
            <input
              placeholder="Contact name"
              value={customer.name}
              onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
              className="w-full rounded-lg border border-navy-200 px-3 py-2 text-sm outline-none focus-visible:ring-2 ring-signal"
            />
            <input
              placeholder="Email address"
              value={customer.email}
              onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
              className="w-full rounded-lg border border-navy-200 px-3 py-2 text-sm outline-none focus-visible:ring-2 ring-signal"
            />
            <input
              placeholder="Billing address"
              value={customer.address}
              onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
              className="w-full rounded-lg border border-navy-200 px-3 py-2 text-sm outline-none focus-visible:ring-2 ring-signal"
            />
          </div>
        </div>

        {/* Print-only static bill-to block */}
        <div className="hidden print:block py-6 border-b border-navy-100">
          <p className="text-xs uppercase tracking-wider text-navy-400 font-semibold mb-1">Bill To</p>
          <p className="text-sm text-navy-700 font-medium">{customer.company || '—'}</p>
          <p className="text-xs text-navy-500">{customer.name}</p>
          <p className="text-xs text-navy-500">{customer.email}</p>
          <p className="text-xs text-navy-500">{customer.address}</p>
        </div>

        <div className="py-8">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-navy-400 border-b border-navy-100">
                <th className="pb-3 font-semibold">Service</th>
                <th className="pb-3 font-semibold w-16">Qty</th>
                <th className="pb-3 font-semibold w-28">Rate (KES)</th>
                <th className="pb-3 font-semibold w-28 text-right">Amount</th>
                <th className="pb-3 w-8 print:hidden" />
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-navy-50">
                  <td className="py-3 pr-3">
                    <input
                      value={item.description}
                      onChange={(e) => updateItem(item.id, { description: e.target.value })}
                      className="w-full outline-none print:pointer-events-none bg-transparent"
                    />
                  </td>
                  <td className="py-3 pr-3">
                    <input
                      type="number"
                      min={1}
                      value={item.qty}
                      onChange={(e) => updateItem(item.id, { qty: Number(e.target.value) })}
                      className="w-16 outline-none bg-transparent"
                    />
                  </td>
                  <td className="py-3 pr-3">
                    <input
                      type="number"
                      min={0}
                      value={item.rate}
                      onChange={(e) => updateItem(item.id, { rate: Number(e.target.value) })}
                      className="w-24 outline-none bg-transparent"
                    />
                  </td>
                  <td className="py-3 text-right font-medium text-navy-700">
                    {(item.qty * item.rate).toLocaleString()}
                  </td>
                  <td className="py-3 print:hidden">
                    <button onClick={() => removeItem(item.id)} aria-label="Remove line item">
                      <TrashIcon className="h-4 w-4 text-navy-300 hover:text-signal" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            onClick={addItem}
            className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-signal print:hidden"
          >
            <PlusIcon className="h-4 w-4" /> Add line item
          </button>

          <div className="mt-8 flex justify-end">
            <div className="w-full sm:w-72 space-y-2.5 text-sm">
              <div className="flex justify-between text-navy-500">
                <span>Subtotal</span>
                <span>KES {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-navy-500">
                <span className="flex items-center gap-2">
                  Discount
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={discountPct}
                    onChange={(e) => setDiscountPct(Number(e.target.value))}
                    className="w-12 border-b border-navy-200 outline-none text-center print:hidden"
                  />
                  %
                </span>
                <span>− KES {discount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-navy-500">
                <span className="flex items-center gap-2">
                  Tax (VAT)
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={taxPct}
                    onChange={(e) => setTaxPct(Number(e.target.value))}
                    className="w-12 border-b border-navy-200 outline-none text-center print:hidden"
                  />
                  %
                </span>
                <span>KES {tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold text-navy-700 text-base pt-2.5 border-t border-navy-100">
                <span>Total Due</span>
                <span>KES {total.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-navy-400 pt-6 border-t border-navy-100">
          Payment due within 14 days. Thank you for advertising with {STATION.name}.
        </p>
      </div>
    </div>
  );
}
