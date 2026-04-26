"use client";

import { useState, useEffect } from "react";
import AdminButton from "@/components/admin/ui/AdminButton";
import AdminModal from "@/components/admin/ui/AdminModal";
import { AlertTriangle, Mail, Clock, ShieldAlert, Check, X } from "lucide-react";

type DangerAction = "clearSessions" | "resetPlatform";

interface ScheduledDeletion {
  action: DangerAction;
  scheduledAt: string; // ISO date
  executesAt: string; // ISO date — 30 days after scheduledAt
  emailConfirmed: boolean;
}

const ACTION_CONFIG = {
  clearSessions: {
    title: "Clear All Sessions",
    description:
      "This will permanently delete all session data including history, ratings, and associated records. This action cannot be undone.",
    confirmPhrase: "DELETE ALL SESSIONS",
  },
  resetPlatform: {
    title: "Reset Platform",
    description:
      "This will reset all platform data to factory defaults. All users, sessions, reviews, and financial records will be permanently deleted. This action cannot be undone.",
    confirmPhrase: "RESET ENTIRE PLATFORM",
  },
};

/* ── Step indicator ── */
function StepIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  return (
    <div className="flex items-center gap-2 mb-6">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className={`flex h-7 w-7 items-center justify-center rounded-full text-[0.65rem] font-bold transition-colors ${
              i < currentStep
                ? "bg-electric-teal text-white"
                : i === currentStep
                ? "bg-vivid-coral text-white"
                : "bg-neutral-100 text-neutral-400"
            }`}
          >
            {i < currentStep ? <Check size={12} /> : i + 1}
          </div>
          {i < totalSteps - 1 && (
            <div className={`h-px w-8 ${i < currentStep ? "bg-electric-teal" : "bg-neutral-200"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Countdown display ── */
function CountdownCard({
  deletion,
  onCancel,
}: {
  deletion: ScheduledDeletion;
  onCancel: () => void;
}) {
  const config = ACTION_CONFIG[deletion.action];
  const execDate = new Date(deletion.executesAt);
  const now = new Date();
  const daysRemaining = Math.max(0, Math.ceil((execDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));

  return (
    <div className="rounded-xl border-2 border-vivid-coral/40 bg-vivid-coral/5 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-vivid-coral" />
          <div>
            <p className="text-sm font-semibold text-vivid-coral">{config.title} Scheduled</p>
            <p className="text-xs text-neutral-600 mt-0.5">
              {deletion.emailConfirmed
                ? `Executes on ${execDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} (${daysRemaining} days remaining)`
                : "Pending email confirmation -- check your inbox"}
            </p>
          </div>
        </div>
        <button
          onClick={onCancel}
          className="rounded-full border border-neutral-200 px-3 py-1.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors"
        >
          Cancel
        </button>
      </div>
      {!deletion.emailConfirmed && (
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-bright-amber/10 px-3 py-2">
          <Mail size={14} className="text-bright-amber" />
          <p className="text-xs text-neutral-700">
            A confirmation email has been sent to the admin email. You must confirm before the 30-day countdown begins.
          </p>
        </div>
      )}
    </div>
  );
}

export default function DangerZone() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [modalAction, setModalAction] = useState<DangerAction | null>(null);
  const [step, setStep] = useState(0); // 0: type phrase, 1: email confirm, 2: final confirm
  const [typedPhrase, setTypedPhrase] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [emailCode, setEmailCode] = useState("");
  const [scheduledDeletions, setScheduledDeletions] = useState<ScheduledDeletion[]>([]);

  // Reset modal state when closed
  const resetModal = () => {
    setModalAction(null);
    setStep(0);
    setTypedPhrase("");
    setEmailSent(false);
    setEmailCode("");
  };

  const currentConfig = modalAction ? ACTION_CONFIG[modalAction] : null;
  const phraseMatch = currentConfig ? typedPhrase === currentConfig.confirmPhrase : false;

  const handleNextStep = () => {
    if (step === 0 && phraseMatch) {
      setStep(1);
      // Simulate sending email
      setTimeout(() => setEmailSent(true), 800);
    } else if (step === 1 && emailCode === "CONFIRM") {
      setStep(2);
    }
  };

  const handleFinalConfirm = () => {
    if (!modalAction) return;
    const now = new Date();
    const executesAt = new Date(now);
    executesAt.setDate(executesAt.getDate() + 30);

    const newDeletion: ScheduledDeletion = {
      action: modalAction,
      scheduledAt: now.toISOString(),
      executesAt: executesAt.toISOString(),
      emailConfirmed: true,
    };

    setScheduledDeletions((prev) => [...prev.filter((d) => d.action !== modalAction), newDeletion]);
    console.log(`Scheduled ${modalAction} for ${executesAt.toISOString()}`);
    resetModal();
  };

  const cancelDeletion = (action: DangerAction) => {
    setScheduledDeletions((prev) => prev.filter((d) => d.action !== action));
    console.log(`Cancelled scheduled ${action}`);
  };

  const isScheduled = (action: DangerAction) => scheduledDeletions.some((d) => d.action === action);

  return (
    <>
      <div className="rounded-2xl border-2 border-vivid-coral/30 bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
        <div className="mb-4 flex items-center gap-2">
          <AlertTriangle size={20} className="text-vivid-coral" />
          <h2 className="text-lg font-semibold text-vivid-coral">Danger Zone</h2>
        </div>

        <div className="space-y-5">
          {/* Maintenance Mode */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-900">
                Enable Maintenance Mode
              </p>
              <p className="text-xs text-neutral-500">
                Takes the platform offline for all users. Only admins can access the
                site.
              </p>
            </div>
            <button
              onClick={() => setMaintenanceMode(!maintenanceMode)}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                maintenanceMode ? "bg-vivid-coral" : "bg-neutral-200"
              }`}
            >
              <span
                className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                  maintenanceMode ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Clear All Sessions */}
          <div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-900">
                  Clear All Sessions
                </p>
                <p className="text-xs text-neutral-500">
                  Permanently delete all session data. Requires multi-step confirmation and 30-day waiting period.
                </p>
              </div>
              {isScheduled("clearSessions") ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-vivid-coral/10 px-3 py-1.5 text-xs font-semibold text-vivid-coral">
                  <Clock size={12} />
                  Scheduled
                </span>
              ) : (
                <AdminButton
                  variant="danger"
                  size="sm"
                  onClick={() => setModalAction("clearSessions")}
                >
                  Clear Sessions
                </AdminButton>
              )}
            </div>
            {scheduledDeletions
              .filter((d) => d.action === "clearSessions")
              .map((d) => (
                <div key={d.action} className="mt-3">
                  <CountdownCard deletion={d} onCancel={() => cancelDeletion("clearSessions")} />
                </div>
              ))}
          </div>

          {/* Reset Platform */}
          <div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-900">
                  Reset Platform
                </p>
                <p className="text-xs text-neutral-500">
                  Reset everything to factory defaults. All data will be lost. Requires multi-step confirmation and 30-day waiting period.
                </p>
              </div>
              {isScheduled("resetPlatform") ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-vivid-coral/10 px-3 py-1.5 text-xs font-semibold text-vivid-coral">
                  <Clock size={12} />
                  Scheduled
                </span>
              ) : (
                <AdminButton
                  variant="danger"
                  size="sm"
                  onClick={() => setModalAction("resetPlatform")}
                >
                  Reset Platform
                </AdminButton>
              )}
            </div>
            {scheduledDeletions
              .filter((d) => d.action === "resetPlatform")
              .map((d) => (
                <div key={d.action} className="mt-3">
                  <CountdownCard deletion={d} onCancel={() => cancelDeletion("resetPlatform")} />
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Multi-Step Confirmation Modal */}
      {modalAction && currentConfig && (
        <AdminModal
          open={true}
          onClose={resetModal}
          title={currentConfig.title}
        >
          <StepIndicator currentStep={step} totalSteps={3} />

          {/* Step 1: Type confirmation phrase */}
          {step === 0 && (
            <div>
              <div className="mb-4 rounded-xl bg-vivid-coral/5 border border-vivid-coral/20 p-4">
                <div className="flex items-start gap-2">
                  <ShieldAlert size={16} className="text-vivid-coral mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-neutral-700">{currentConfig.description}</p>
                </div>
              </div>

              <p className="mb-2 text-sm text-neutral-700">
                Type <span className="font-mono font-bold text-vivid-coral">{currentConfig.confirmPhrase}</span> to proceed:
              </p>
              <input
                type="text"
                value={typedPhrase}
                onChange={(e) => setTypedPhrase(e.target.value)}
                placeholder={currentConfig.confirmPhrase}
                className={`mb-4 w-full rounded-xl border px-4 py-3 font-mono text-sm transition-colors focus:outline-none focus:ring-1 ${
                  typedPhrase.length > 0 && !phraseMatch
                    ? "border-vivid-coral/50 focus:border-vivid-coral focus:ring-vivid-coral"
                    : phraseMatch
                    ? "border-electric-teal focus:border-electric-teal focus:ring-electric-teal"
                    : "border-neutral-200 focus:border-deep-sage focus:ring-deep-sage"
                }`}
                autoFocus
              />
              {typedPhrase.length > 0 && !phraseMatch && (
                <p className="mb-3 flex items-center gap-1.5 text-xs text-vivid-coral">
                  <X size={12} /> Phrase does not match
                </p>
              )}
              {phraseMatch && (
                <p className="mb-3 flex items-center gap-1.5 text-xs text-electric-teal">
                  <Check size={12} /> Phrase confirmed
                </p>
              )}
              <div className="flex items-center justify-end gap-3">
                <AdminButton variant="secondary" onClick={resetModal}>
                  Cancel
                </AdminButton>
                <AdminButton
                  variant="reject"
                  onClick={handleNextStep}
                  disabled={!phraseMatch}
                >
                  Next Step
                </AdminButton>
              </div>
            </div>
          )}

          {/* Step 2: Email verification */}
          {step === 1 && (
            <div>
              <div className="mb-4 rounded-xl bg-bright-amber/10 border border-bright-amber/20 p-4">
                <div className="flex items-start gap-3">
                  <Mail size={18} className="text-bright-amber mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-neutral-900">Email Verification Required</p>
                    <p className="text-xs text-neutral-600 mt-1">
                      {emailSent
                        ? "A verification code has been sent to the admin email address. Enter the code below to continue."
                        : "Sending verification email..."}
                    </p>
                  </div>
                </div>
              </div>

              {emailSent && (
                <>
                  <p className="mb-2 text-sm text-neutral-700">
                    Enter verification code (type <span className="font-mono font-bold text-deep-sage">CONFIRM</span> to simulate):
                  </p>
                  <input
                    type="text"
                    value={emailCode}
                    onChange={(e) => setEmailCode(e.target.value.toUpperCase())}
                    placeholder="Enter code from email"
                    className="mb-4 w-full rounded-xl border border-neutral-200 px-4 py-3 font-mono text-sm text-neutral-900 focus:border-deep-sage focus:outline-none focus:ring-1 focus:ring-deep-sage"
                    autoFocus
                  />
                </>
              )}

              <div className="flex items-center justify-end gap-3">
                <AdminButton variant="secondary" onClick={resetModal}>
                  Cancel
                </AdminButton>
                <AdminButton
                  variant="reject"
                  onClick={handleNextStep}
                  disabled={emailCode !== "CONFIRM"}
                >
                  Verify & Continue
                </AdminButton>
              </div>
            </div>
          )}

          {/* Step 3: Final confirmation with 30-day notice */}
          {step === 2 && (
            <div>
              <div className="mb-4 rounded-xl bg-vivid-coral/5 border-2 border-vivid-coral/30 p-5">
                <div className="flex items-start gap-3">
                  <Clock size={20} className="text-vivid-coral mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-vivid-coral">30-Day Waiting Period</p>
                    <p className="text-xs text-neutral-700 mt-1.5 leading-relaxed">
                      After confirming, this action will be <strong>scheduled to execute in 30 days</strong> on{" "}
                      <strong>
                        {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </strong>
                      . You can cancel at any time during the waiting period.
                    </p>
                    <p className="text-xs text-neutral-700 mt-2 leading-relaxed">
                      A reminder email will be sent 7 days and 1 day before execution. If not cancelled, the action will proceed automatically.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-4 space-y-2">
                <div className="flex items-center gap-2 text-xs text-neutral-600">
                  <Check size={14} className="text-electric-teal" />
                  Confirmation phrase verified
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-600">
                  <Check size={14} className="text-electric-teal" />
                  Email verification completed
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-600">
                  <Clock size={14} className="text-bright-amber" />
                  30-day waiting period will begin
                </div>
              </div>

              <div className="flex items-center justify-end gap-3">
                <AdminButton variant="secondary" onClick={resetModal}>
                  Cancel
                </AdminButton>
                <AdminButton variant="reject" onClick={handleFinalConfirm}>
                  Schedule {currentConfig.title}
                </AdminButton>
              </div>
            </div>
          )}
        </AdminModal>
      )}
    </>
  );
}
