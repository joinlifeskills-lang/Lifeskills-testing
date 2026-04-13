"use client";

import { useState, useRef, useEffect } from "react";
import { CreditCard, ChevronDown, Plus, MoreHorizontal, Trash2, Star, X, Check } from "lucide-react";
import { paymentMethods as initialMethods, billingHistory } from "@/lib/member/data";
import type { PaymentMethod } from "@/lib/member/types";

const cardTypeLabels: Record<string, string> = {
  visa: "Visa",
  mastercard: "Mastercard",
  amex: "Amex",
};

const statusColors: Record<string, string> = {
  paid: "bg-electric-teal/10 text-electric-teal",
  refunded: "bg-vivid-coral/10 text-vivid-coral",
  pending: "bg-bright-amber/10 text-bright-amber",
};

const inputBase =
  "w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:ring-2 focus:ring-deep-sage/30 focus:border-deep-sage/50 transition-shadow";

function detectType(num: string): PaymentMethod["type"] {
  const d = num.replace(/\D/g, "")[0];
  if (d === "3") return "amex";
  if (d === "5") return "mastercard";
  return "visa";
}

function formatCardNumber(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2);
  return digits;
}

// ── Card action menu ──────────────────────────────────────────────────────────
function CardMenu({
  card,
  totalCards,
  onSetDefault,
  onDelete,
}: {
  card: PaymentMethod;
  totalCards: number;
  onSetDefault: () => void;
  onDelete: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={(e) => { e.stopPropagation(); setOpen((v) => !v); }}
        className="p-1.5 rounded-full hover:bg-neutral-100 transition-colors text-neutral-400"
      >
        <MoreHorizontal size={16} />
      </button>
      {open && (
        <div className="absolute right-0 top-8 z-20 w-44 bg-white rounded-xl shadow-lg border border-neutral-100 py-1 overflow-hidden">
          {totalCards > 1 && !card.isDefault && (
            <button
              onClick={() => { onSetDefault(); setOpen(false); }}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
            >
              <Star size={15} className="text-neutral-400" />
              Set as default
            </button>
          )}
          {totalCards > 1 && (
            <button
              onClick={() => { onDelete(); setOpen(false); }}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <Trash2 size={15} />
              Remove card
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ── Add card form ─────────────────────────────────────────────────────────────
function AddCardForm({ onAdd, onCancel }: { onAdd: (card: PaymentMethod) => void; onCancel: () => void }) {
  const [number, setNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [setDefault, setSetDefault] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit() {
    const digits = number.replace(/\D/g, "");
    if (digits.length < 13) { setError("Please enter a valid card number."); return; }
    const parts = expiry.split("/");
    if (parts.length !== 2 || parts[0].length !== 2 || parts[1].length !== 2) {
      setError("Please enter a valid expiry (MM/YY)."); return;
    }
    if (cvv.length < 3) { setError("Please enter a valid CVV."); return; }
    if (!name.trim()) { setError("Please enter the name on your card."); return; }
    setError("");
    onAdd({
      id: `pm-${Date.now()}`,
      type: detectType(number),
      last4: digits.slice(-4),
      expiry: `${parts[0]}/${parts[1]}`,
      isDefault: setDefault,
    });
  }

  return (
    <div className="mt-4 p-4 rounded-xl border border-neutral-200 bg-neutral-50 space-y-3">
      <p className="text-sm font-medium text-neutral-800">New card details</p>

      <div>
        <label className="block text-xs font-medium text-neutral-600 mb-1">Card number</label>
        <input
          type="text"
          inputMode="numeric"
          value={number}
          onChange={(e) => setNumber(formatCardNumber(e.target.value))}
          placeholder="1234 5678 9012 3456"
          maxLength={19}
          className={inputBase}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-neutral-600 mb-1">Expiry</label>
          <input
            type="text"
            inputMode="numeric"
            value={expiry}
            onChange={(e) => setExpiry(formatExpiry(e.target.value))}
            placeholder="MM/YY"
            maxLength={5}
            className={inputBase}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-neutral-600 mb-1">CVV</label>
          <input
            type="text"
            inputMode="numeric"
            value={cvv}
            onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
            placeholder="123"
            maxLength={4}
            className={inputBase}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-neutral-600 mb-1">Name on card</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Sarah Chen"
          className={inputBase}
        />
      </div>

      <label className="flex items-center gap-2.5 cursor-pointer select-none">
        <span
          onClick={() => setSetDefault((v) => !v)}
          className={`h-4 w-4 rounded border-2 flex items-center justify-center transition-colors ${setDefault ? "bg-deep-sage border-deep-sage" : "border-neutral-300"}`}
        >
          {setDefault && <Check size={9} className="text-white" strokeWidth={3} />}
        </span>
        <span className="text-sm text-neutral-600">Set as default payment method</span>
      </label>

      {error && <p className="text-xs text-red-500">{error}</p>}

      <div className="flex gap-2 pt-1">
        <button
          onClick={handleSubmit}
          className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-deep-sage text-white hover:opacity-90 transition-opacity"
        >
          Add card
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2.5 rounded-xl text-sm border border-neutral-200 text-neutral-600 hover:bg-neutral-100 transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}

// ── Delete confirm inline ─────────────────────────────────────────────────────
function DeleteConfirm({ card, onConfirm, onCancel }: { card: PaymentMethod; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="flex items-center justify-between gap-3 p-3 rounded-xl border border-red-200 bg-red-50">
      <p className="text-sm text-red-700">
        Remove {cardTypeLabels[card.type]} ••••{card.last4}?
      </p>
      <div className="flex gap-2 shrink-0">
        <button onClick={onCancel} className="px-3 py-1.5 rounded-lg text-xs border border-neutral-200 text-neutral-600 bg-white hover:bg-neutral-50 transition-colors">
          Cancel
        </button>
        <button onClick={onConfirm} className="px-3 py-1.5 rounded-lg text-xs bg-red-600 text-white hover:bg-red-700 transition-colors font-medium">
          Remove
        </button>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function PaymentSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBilling, setShowBilling] = useState(false);
  const [addingCard, setAddingCard] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [cards, setCards] = useState<PaymentMethod[]>(initialMethods);

  function handleAdd(card: PaymentMethod) {
    setCards((prev) => {
      const updated = card.isDefault ? prev.map((c) => ({ ...c, isDefault: false })) : prev;
      return [...updated, card];
    });
    setAddingCard(false);
  }

  function handleSetDefault(id: string) {
    setCards((prev) => prev.map((c) => ({ ...c, isDefault: c.id === id })));
  }

  function handleDelete(id: string) {
    setCards((prev) => {
      const remaining = prev.filter((c) => c.id !== id);
      // if we deleted the default, promote first remaining
      const hadDefault = prev.find((c) => c.id === id)?.isDefault;
      if (hadDefault && remaining.length > 0) remaining[0] = { ...remaining[0], isDefault: true };
      return remaining;
    });
    setDeletingId(null);
  }

  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 md:cursor-default"
      >
        <h3 className="font-display text-lg text-neutral-900">Payment &amp; Billing</h3>
        <ChevronDown
          size={20}
          className={`text-neutral-400 transition-transform md:hidden ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Content */}
      <div className={`${isOpen ? "block" : "hidden"} md:block px-6 pb-6`}>
        {/* Saved cards */}
        <div className="space-y-2">
          {cards.map((card) =>
            deletingId === card.id ? (
              <DeleteConfirm
                key={card.id}
                card={card}
                onConfirm={() => handleDelete(card.id)}
                onCancel={() => setDeletingId(null)}
              />
            ) : (
              <div
                key={card.id}
                className="flex items-center gap-3 p-3 rounded-xl border border-neutral-100 hover:border-neutral-200 transition-colors"
              >
                <div className="h-10 w-10 rounded-lg bg-neutral-50 flex items-center justify-center shrink-0">
                  <CreditCard size={20} className="text-neutral-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-neutral-900">
                    {cardTypeLabels[card.type]} •••• {card.last4}
                  </p>
                  <p className="text-xs text-neutral-400">Expires {card.expiry}</p>
                </div>
                {card.isDefault && (
                  <span className="text-xs font-semibold text-deep-sage bg-deep-sage/10 px-2.5 py-1 rounded-full">
                    Default
                  </span>
                )}
                {cards.length > 1 && (
                  <CardMenu
                    card={card}
                    totalCards={cards.length}
                    onSetDefault={() => handleSetDefault(card.id)}
                    onDelete={() => setDeletingId(card.id)}
                  />
                )}
              </div>
            )
          )}
        </div>

        {/* Add card */}
        {addingCard ? (
          <AddCardForm onAdd={handleAdd} onCancel={() => setAddingCard(false)} />
        ) : (
          <button
            onClick={() => setAddingCard(true)}
            className="mt-4 flex items-center gap-2 rounded-full font-semibold text-[0.88rem] py-[10px] px-[26px] border border-deep-sage text-deep-sage hover:bg-deep-sage/5 transition-colors"
          >
            <Plus size={16} />
            Add payment method
          </button>
        )}

        {/* Billing history */}
        <div className="mt-6 border-t border-neutral-100 pt-4">
          <button
            onClick={() => setShowBilling(!showBilling)}
            className="flex items-center gap-2 text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors"
          >
            <span>View Billing History</span>
            <ChevronDown size={16} className={`transition-transform ${showBilling ? "rotate-180" : ""}`} />
          </button>

          {showBilling && (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-neutral-400 border-b border-neutral-100">
                    <th className="pb-2 pr-4 font-medium">Date</th>
                    <th className="pb-2 pr-4 font-medium">Teacher</th>
                    <th className="pb-2 pr-4 font-medium hidden sm:table-cell">Discipline</th>
                    <th className="pb-2 pr-4 font-medium text-right">Amount</th>
                    <th className="pb-2 font-medium text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {billingHistory.map((record) => {
                    const formatted = new Date(record.date).toLocaleDateString("en-US", { month: "short", day: "numeric" });
                    return (
                      <tr key={record.id} className="border-b border-neutral-50 last:border-b-0">
                        <td className="py-2.5 pr-4 text-neutral-700">{formatted}</td>
                        <td className="py-2.5 pr-4 text-neutral-900">{record.teacherName}</td>
                        <td className="py-2.5 pr-4 text-neutral-500 hidden sm:table-cell">{record.discipline}</td>
                        <td className="py-2.5 pr-4 text-neutral-900 text-right">${record.amount}</td>
                        <td className="py-2.5 text-right">
                          <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusColors[record.status]}`}>
                            {record.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
