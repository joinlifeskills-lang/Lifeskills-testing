"use client";

interface ConfirmDeleteModalProps {
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDeleteModal({
  message = "Are you sure you want to delete this? This action cannot be undone.",
  onConfirm,
  onCancel,
}: ConfirmDeleteModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
        <h3 className="mb-2 font-display text-lg text-neutral-900">
          Delete
        </h3>
        <p className="mb-6 text-sm text-neutral-500">{message}</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-full border border-neutral-200 px-4 py-2.5 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-full bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
