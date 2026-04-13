"use client";

import { useState } from "react";
import { LogOut, X, ChevronRight } from "lucide-react";

const REASONS = [
  "I found what I was looking for",
  "Sessions aren't the right fit for me",
  "It's too expensive",
  "I'm not using it enough",
  "I have privacy concerns",
  "Other",
];

function get30DaysFromNow() {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default function DangerZone() {
  const [step, setStep] = useState(0); // 0=closed, 1–3=steps, 4=scheduled
  const [reason, setReason] = useState("");
  const [feedback, setFeedback] = useState("");
  const [confirmInput, setConfirmInput] = useState("");

  function reset() {
    setStep(0);
    setReason("");
    setFeedback("");
    setConfirmInput("");
  }

  const deletionDate = get30DaysFromNow();

  return (
    <>
      <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-6">
        {/* Log out */}
        <button className="flex items-center gap-2 rounded-full font-semibold text-[0.88rem] py-[10px] px-[26px] border border-deep-sage text-deep-sage hover:bg-deep-sage/5 transition-colors">
          <LogOut size={16} />
          Log Out
        </button>

        {/* Subtle delete link — easy to miss, intentionally */}
        <p className="mt-6 text-[0.7rem] text-neutral-300 leading-relaxed">
          Looking to leave?{" "}
          <button
            onClick={() => setStep(1)}
            className="underline underline-offset-2 hover:text-neutral-400 transition-colors"
          >
            Request account deletion
          </button>
        </p>
      </div>

      {/* Multi-step modal */}
      {step > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={step < 4 ? reset : undefined} />

          <div className="relative bg-white rounded-2xl shadow-[0_4px_32px_rgba(0,0,0,0.18)] max-w-md w-full p-6 sm:p-8">
            {step < 4 && (
              <button
                onClick={reset}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-100 transition-colors"
              >
                <X size={17} className="text-neutral-400" />
              </button>
            )}

            {/* Step indicator */}
            {step < 4 && (
              <div className="flex items-center gap-1.5 mb-5">
                {[1, 2, 3].map((s) => (
                  <span
                    key={s}
                    className={`h-1 rounded-full transition-all ${s <= step ? "bg-neutral-700 w-6" : "bg-neutral-200 w-3"}`}
                  />
                ))}
              </div>
            )}

            {/* ── Step 1: Reason ── */}
            {step === 1 && (
              <>
                <h4 className="font-display text-xl text-neutral-900 mb-1">Before you go…</h4>
                <p className="text-sm text-neutral-500 mb-5">
                  We'd love to understand what's not working. Your answer helps us get better.
                </p>
                <div className="space-y-2">
                  {REASONS.map((r) => (
                    <button
                      key={r}
                      onClick={() => setReason(r)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm text-left transition-colors ${
                        reason === r
                          ? "border-neutral-700 bg-neutral-50 text-neutral-900 font-medium"
                          : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                      }`}
                    >
                      {r}
                      {reason === r && <ChevronRight size={15} className="text-neutral-400 shrink-0" />}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setStep(2)}
                  disabled={!reason}
                  className="mt-5 w-full py-2.5 rounded-xl text-sm font-semibold bg-neutral-900 text-white hover:bg-neutral-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </>
            )}

            {/* ── Step 2: Anything we can do? ── */}
            {step === 2 && (
              <>
                <h4 className="font-display text-xl text-neutral-900 mb-1">One more thing</h4>
                <p className="text-sm text-neutral-500 mb-5">
                  Is there anything we could have done differently — or anything that would change your mind?
                  <span className="block mt-1 text-neutral-400">(Optional — but genuinely appreciated)</span>
                </p>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={4}
                  placeholder="Share your thoughts here…"
                  className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:ring-2 focus:ring-neutral-300 transition-shadow resize-none"
                />
                <div className="flex gap-2 mt-5">
                  <button
                    onClick={() => setStep(1)}
                    className="px-5 py-2.5 rounded-xl text-sm border border-neutral-200 text-neutral-600 hover:bg-neutral-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-neutral-900 text-white hover:bg-neutral-800 transition-colors"
                  >
                    Continue
                  </button>
                </div>
              </>
            )}

            {/* ── Step 3: Final confirmation ── */}
            {step === 3 && (
              <>
                <h4 className="font-display text-xl text-neutral-900 mb-1">Final step</h4>
                <p className="text-sm text-neutral-500 mb-4">
                  Your account won't be deleted immediately. It will be{" "}
                  <span className="font-medium text-neutral-700">scheduled for permanent deletion on {deletionDate}</span>.
                  You can cancel this at any time before then by logging back in.
                </p>
                <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 mb-5 space-y-1.5">
                  <p className="text-xs font-medium text-neutral-600">What gets deleted:</p>
                  {["Your profile and personal data", "All session history and reviews", "Saved payment methods", "Messages and conversations"].map((item) => (
                    <p key={item} className="text-xs text-neutral-500 flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-neutral-400 shrink-0" />
                      {item}
                    </p>
                  ))}
                </div>
                <label className="block text-xs font-medium text-neutral-600 mb-2">
                  Type <span className="font-mono font-bold text-neutral-800">DELETE</span> to confirm
                </label>
                <input
                  type="text"
                  value={confirmInput}
                  onChange={(e) => setConfirmInput(e.target.value)}
                  placeholder="DELETE"
                  className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-300 outline-none focus:ring-2 focus:ring-red-300/50 focus:border-red-300 transition-shadow font-mono"
                />
                <div className="flex gap-2 mt-5">
                  <button
                    onClick={() => setStep(2)}
                    className="px-5 py-2.5 rounded-xl text-sm border border-neutral-200 text-neutral-600 hover:bg-neutral-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(4)}
                    disabled={confirmInput !== "DELETE"}
                    className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Schedule deletion
                  </button>
                </div>
              </>
            )}

            {/* ── Step 4: Scheduled ── */}
            {step === 4 && (
              <div className="text-center py-2">
                <div className="h-12 w-12 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl">🕐</span>
                </div>
                <h4 className="font-display text-xl text-neutral-900 mb-2">Deletion scheduled</h4>
                <p className="text-sm text-neutral-500 leading-relaxed mb-1">
                  Your account is scheduled to be permanently deleted on
                </p>
                <p className="text-sm font-semibold text-neutral-800 mb-4">{deletionDate}</p>
                <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                  If you change your mind, simply log in before that date and visit your profile to cancel the deletion.
                </p>
                <button
                  onClick={reset}
                  className="w-full py-2.5 rounded-xl text-sm font-semibold border border-neutral-200 text-neutral-700 hover:bg-neutral-50 transition-colors"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
