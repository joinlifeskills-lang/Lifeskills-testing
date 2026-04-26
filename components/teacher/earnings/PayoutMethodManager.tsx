"use client";

import { useState } from "react";
import { CreditCard, Trash2, Star, Plus, Building2 } from "lucide-react";
import type { PayoutMethod, PayoutMethodType, TeacherPayoutSettings } from "@/lib/teacher/types";

interface PayoutMethodManagerProps {
  settings: TeacherPayoutSettings;
  onUpdate: (settings: TeacherPayoutSettings) => void;
}

const METHOD_ICONS: Record<PayoutMethodType, React.ReactNode> = {
  stripe: <CreditCard size={18} className="text-[#635BFF]" />,
  paypal: <span className="text-sm font-bold text-[#003087]">P</span>,
  bank: <Building2 size={18} className="text-neutral-600" />,
};

function getMethodLabel(method: PayoutMethod): string {
  switch (method.type) {
    case "stripe":
      return `Stripe · ****${method.last4}`;
    case "paypal":
      return `PayPal · ${method.email}`;
    case "bank":
      return `Bank · ${method.accountHolder} ****${method.accountLast4}`;
  }
}

function getMethodStatus(method: PayoutMethod): string {
  if (method.type === "stripe") return method.connected ? "Connected" : "Disconnected";
  return "Verified";
}

export default function PayoutMethodManager({ settings, onUpdate }: PayoutMethodManagerProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [addType, setAddType] = useState<PayoutMethodType | null>(null);

  // Form states
  const [paypalEmail, setPaypalEmail] = useState("");
  const [bankHolder, setBankHolder] = useState("");
  const [bankRouting, setBankRouting] = useState("");
  const [bankAccount, setBankAccount] = useState("");

  const handleRemove = (index: number) => {
    const method = settings.methods[index];
    const newMethods = settings.methods.filter((_, i) => i !== index);
    const newDefault = method.type === settings.defaultMethod && newMethods.length > 0
      ? newMethods[0].type
      : settings.defaultMethod;
    onUpdate({ methods: newMethods, defaultMethod: newDefault });
  };

  const handleSetDefault = (type: PayoutMethodType) => {
    onUpdate({ ...settings, defaultMethod: type });
  };

  const handleAdd = () => {
    if (addType === "stripe") {
      const newMethod: PayoutMethod = { type: "stripe", accountId: "acct_sim_" + Date.now(), last4: "0000", connected: true };
      onUpdate({
        methods: [...settings.methods, newMethod],
        defaultMethod: settings.methods.length === 0 ? "stripe" : settings.defaultMethod,
      });
    } else if (addType === "paypal" && paypalEmail) {
      const newMethod: PayoutMethod = { type: "paypal", email: paypalEmail };
      onUpdate({
        methods: [...settings.methods, newMethod],
        defaultMethod: settings.methods.length === 0 ? "paypal" : settings.defaultMethod,
      });
    } else if (addType === "bank" && bankHolder && bankRouting && bankAccount) {
      const newMethod: PayoutMethod = {
        type: "bank",
        accountHolder: bankHolder,
        routingNumber: bankRouting,
        accountLast4: bankAccount.slice(-4),
      };
      onUpdate({
        methods: [...settings.methods, newMethod],
        defaultMethod: settings.methods.length === 0 ? "bank" : settings.defaultMethod,
      });
    }
    resetForm();
  };

  const resetForm = () => {
    setShowAddForm(false);
    setAddType(null);
    setPaypalEmail("");
    setBankHolder("");
    setBankRouting("");
    setBankAccount("");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-neutral-900">Payment Methods</h4>
        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center gap-1.5 rounded-full border border-deep-sage px-3 py-1.5 text-xs font-semibold text-deep-sage hover:bg-deep-sage hover:text-white transition-colors"
          >
            <Plus size={14} />
            Add Method
          </button>
        )}
      </div>

      {/* Existing methods */}
      <div className="space-y-2">
        {settings.methods.map((method, i) => (
          <div
            key={`${method.type}-${i}`}
            className="flex items-center justify-between rounded-xl border border-neutral-100 px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-50">
                {METHOD_ICONS[method.type]}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-neutral-900">{getMethodLabel(method)}</span>
                  {method.type === settings.defaultMethod && (
                    <span className="rounded-full bg-[#0BA89A]/10 px-2 py-0.5 text-[10px] font-semibold text-[#0BA89A]">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-xs text-neutral-500">{getMethodStatus(method)}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {method.type !== settings.defaultMethod && (
                <button
                  onClick={() => handleSetDefault(method.type)}
                  className="rounded-full p-2 text-neutral-400 hover:bg-neutral-50 hover:text-[#0BA89A] transition-colors"
                  title="Set as default"
                >
                  <Star size={14} />
                </button>
              )}
              <button
                onClick={() => handleRemove(i)}
                className="rounded-full p-2 text-neutral-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                title="Remove"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add form */}
      {showAddForm && (
        <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 space-y-3">
          {!addType ? (
            <>
              <p className="text-sm font-medium text-neutral-700">Choose payment method:</p>
              <div className="flex flex-wrap gap-2">
                {(["stripe", "paypal", "bank"] as PayoutMethodType[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setAddType(t)}
                    className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:border-deep-sage hover:text-deep-sage transition-colors"
                  >
                    {METHOD_ICONS[t]}
                    {t === "stripe" ? "Stripe" : t === "paypal" ? "PayPal" : "Bank Account"}
                  </button>
                ))}
              </div>
              <button onClick={resetForm} className="text-xs text-neutral-500 hover:text-neutral-700">
                Cancel
              </button>
            </>
          ) : addType === "stripe" ? (
            <>
              <p className="text-sm text-neutral-700">Connect your Stripe account to receive payouts.</p>
              <div className="flex gap-2">
                <button
                  onClick={handleAdd}
                  className="rounded-full bg-[#635BFF] px-4 py-2 text-sm font-semibold text-white hover:bg-[#5147e5] transition-colors"
                >
                  Connect Stripe
                </button>
                <button onClick={resetForm} className="text-sm text-neutral-500 hover:text-neutral-700">
                  Cancel
                </button>
              </div>
            </>
          ) : addType === "paypal" ? (
            <>
              <label className="block text-sm font-medium text-neutral-700">PayPal Email</label>
              <input
                type="email"
                value={paypalEmail}
                onChange={(e) => setPaypalEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-deep-sage focus:ring-1 focus:ring-deep-sage"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleAdd}
                  disabled={!paypalEmail}
                  className="rounded-full bg-deep-sage px-4 py-2 text-sm font-semibold text-white hover:bg-deep-sage-hover disabled:opacity-50 transition-colors"
                >
                  Add PayPal
                </button>
                <button onClick={resetForm} className="text-sm text-neutral-500 hover:text-neutral-700">
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-neutral-700">Account Holder Name</label>
                <input
                  type="text"
                  value={bankHolder}
                  onChange={(e) => setBankHolder(e.target.value)}
                  placeholder="Full name"
                  className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-deep-sage focus:ring-1 focus:ring-deep-sage"
                />
                <label className="block text-sm font-medium text-neutral-700">Routing Number</label>
                <input
                  type="text"
                  value={bankRouting}
                  onChange={(e) => setBankRouting(e.target.value)}
                  placeholder="9 digits"
                  className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-deep-sage focus:ring-1 focus:ring-deep-sage"
                />
                <label className="block text-sm font-medium text-neutral-700">Account Number</label>
                <input
                  type="text"
                  value={bankAccount}
                  onChange={(e) => setBankAccount(e.target.value)}
                  placeholder="Account number"
                  className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-deep-sage focus:ring-1 focus:ring-deep-sage"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleAdd}
                  disabled={!bankHolder || !bankRouting || !bankAccount}
                  className="rounded-full bg-deep-sage px-4 py-2 text-sm font-semibold text-white hover:bg-deep-sage-hover disabled:opacity-50 transition-colors"
                >
                  Add Bank Account
                </button>
                <button onClick={resetForm} className="text-sm text-neutral-500 hover:text-neutral-700">
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {settings.methods.length === 0 && !showAddForm && (
        <p className="text-sm text-neutral-500">No payment methods configured. Add one to receive payouts.</p>
      )}
    </div>
  );
}
