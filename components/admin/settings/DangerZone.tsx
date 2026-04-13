"use client";

import { useState } from "react";
import AdminButton from "@/components/admin/ui/AdminButton";
import AdminModal from "@/components/admin/ui/AdminModal";
import { AlertTriangle } from "lucide-react";

export default function DangerZone() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [modalAction, setModalAction] = useState<"clearSessions" | "resetPlatform" | null>(null);

  const handleConfirm = () => {
    if (modalAction === "clearSessions") {
      console.log("Clear all sessions");
    } else if (modalAction === "resetPlatform") {
      console.log("Reset platform");
    }
    setModalAction(null);
  };

  const modalContent = {
    clearSessions: {
      title: "Clear All Sessions",
      description:
        "This will permanently delete all session data including history, ratings, and associated records. This action cannot be undone.",
    },
    resetPlatform: {
      title: "Reset Platform",
      description:
        "This will reset all platform data to factory defaults. All users, sessions, reviews, and financial records will be permanently deleted. This action cannot be undone.",
    },
  };

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
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-900">
                Clear All Sessions
              </p>
              <p className="text-xs text-neutral-500">
                Permanently delete all session data. This cannot be undone.
              </p>
            </div>
            <AdminButton
              variant="danger"
              size="sm"
              onClick={() => setModalAction("clearSessions")}
            >
              Clear Sessions
            </AdminButton>
          </div>

          {/* Reset Platform */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-900">
                Reset Platform
              </p>
              <p className="text-xs text-neutral-500">
                Reset everything to factory defaults. All data will be lost.
              </p>
            </div>
            <AdminButton
              variant="danger"
              size="sm"
              onClick={() => setModalAction("resetPlatform")}
            >
              Reset Platform
            </AdminButton>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {modalAction && (
        <AdminModal
          open={true}
          onClose={() => setModalAction(null)}
          title={modalContent[modalAction].title}
        >
          <p className="mb-6 text-sm text-neutral-500">
            {modalContent[modalAction].description}
          </p>
          <div className="flex items-center justify-end gap-3">
            <AdminButton variant="secondary" onClick={() => setModalAction(null)}>
              Cancel
            </AdminButton>
            <AdminButton variant="reject" onClick={handleConfirm}>
              Confirm
            </AdminButton>
          </div>
        </AdminModal>
      )}
    </>
  );
}
