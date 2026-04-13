"use client";

import { useState } from "react";
import { LogOut, AlertTriangle } from "lucide-react";

type ModalAction = "deactivate" | "delete" | null;

function ConfirmModal({
  action,
  onClose,
  onConfirm,
}: {
  action: ModalAction;
  onClose: () => void;
  onConfirm: () => void;
}) {
  if (!action) return null;

  const isDelete = action === "delete";
  const title = isDelete ? "Delete Account" : "Deactivate Profile";
  const message = isDelete
    ? "This action cannot be undone. All your data, sessions, and reviews will be permanently deleted."
    : "Your profile will be hidden from search results. You can reactivate at any time.";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-vivid-coral/10">
          <AlertTriangle size={20} className="text-vivid-coral" />
        </div>
        <h4 className="mb-1 font-display text-lg text-neutral-900">{title}</h4>
        <p className="mb-6 text-sm text-neutral-500">{message}</p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-full border border-deep-sage px-[26px] py-[10px] text-[0.88rem] font-semibold text-deep-sage transition-colors hover:bg-deep-sage/5"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-full bg-vivid-coral px-[26px] py-[10px] text-[0.88rem] font-semibold text-white transition-opacity hover:opacity-90"
          >
            {isDelete ? "Delete" : "Deactivate"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TeacherDangerZone() {
  const [modal, setModal] = useState<ModalAction>(null);

  return (
    <>
      <div className="rounded-2xl border border-vivid-coral/20 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
        <h3 className="px-6 pt-5 font-display text-lg text-neutral-900">Danger Zone</h3>
        <div className="space-y-4 px-6 pb-6 pt-4">
          {/* Deactivate */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-900">Deactivate Profile</p>
              <p className="text-xs text-neutral-500">
                Hides your profile from search. You can reactivate anytime.
              </p>
            </div>
            <button
              onClick={() => setModal("deactivate")}
              className="rounded-full bg-vivid-coral/10 px-[26px] py-[10px] text-[0.88rem] font-semibold text-vivid-coral transition-colors hover:bg-vivid-coral/20"
            >
              Deactivate
            </button>
          </div>

          {/* Delete */}
          <div className="flex flex-col gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-900">Delete Account</p>
              <p className="text-xs text-vivid-coral">This action cannot be undone.</p>
            </div>
            <button
              onClick={() => setModal("delete")}
              className="rounded-full bg-vivid-coral px-[26px] py-[10px] text-[0.88rem] font-semibold text-white transition-opacity hover:opacity-90"
            >
              Delete Account
            </button>
          </div>

          {/* Log Out */}
          <div className="border-t border-neutral-100 pt-4">
            <button className="flex items-center gap-2 rounded-full border border-deep-sage px-[26px] py-[10px] text-[0.88rem] font-semibold text-deep-sage transition-colors hover:bg-deep-sage/5">
              <LogOut size={16} />
              Log Out
            </button>
          </div>
        </div>
      </div>

      <ConfirmModal
        action={modal}
        onClose={() => setModal(null)}
        onConfirm={() => setModal(null)}
      />
    </>
  );
}
