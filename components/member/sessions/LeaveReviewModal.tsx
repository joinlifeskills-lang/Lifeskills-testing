"use client";

import { useState } from "react";
import { Star, X } from "lucide-react";

interface LeaveReviewModalProps {
  teacherName: string;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => void;
}

export default function LeaveReviewModal({
  teacherName,
  onClose,
  onSubmit,
}: LeaveReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit() {
    if (rating === 0) return;
    setSubmitted(true);
    setTimeout(() => {
      onSubmit(rating, comment);
    }, 1200);
  }

  const labels = ["", "Poor", "Fair", "Good", "Great", "Excellent"];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl p-6 relative">

        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {submitted ? (
          /* ── Success state ── */
          <div className="flex flex-col items-center text-center py-6 gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-electric-teal/10">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0BA89A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="font-display text-xl text-neutral-900">Thank you!</h3>
            <p className="text-sm text-neutral-500">
              Your review for <span className="font-medium text-neutral-700">{teacherName}</span> has been submitted.
            </p>
          </div>
        ) : (
          /* ── Form ── */
          <>
            <h3 className="font-display text-xl text-neutral-900 mb-1">
              How was your session?
            </h3>
            <p className="text-sm text-neutral-500 mb-6">
              Share your experience with <span className="font-medium text-neutral-700">{teacherName}</span>
            </p>

            {/* Star rating */}
            <div className="flex flex-col items-center gap-2 mb-6">
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHovered(star)}
                    onMouseLeave={() => setHovered(0)}
                    className="transition-transform hover:scale-110"
                    aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                  >
                    <Star
                      size={36}
                      className={
                        star <= (hovered || rating)
                          ? "fill-bright-amber text-bright-amber"
                          : "text-neutral-200 fill-neutral-200"
                      }
                    />
                  </button>
                ))}
              </div>
              <span className="font-sans text-sm text-neutral-500 h-5">
                {labels[hovered || rating]}
              </span>
            </div>

            {/* Comment */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                Write a review <span className="text-neutral-400 font-normal">(optional)</span>
              </label>
              <textarea
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="What did you enjoy? How did the session help you?"
                className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm text-neutral-800 placeholder:text-neutral-400 outline-none focus:border-electric-teal focus:ring-1 focus:ring-electric-teal/30 transition-colors resize-none"
                maxLength={500}
              />
              <p className="mt-1 text-right text-xs text-neutral-400">{comment.length}/500</p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={rating === 0}
                className="flex-1 rounded-full py-[10px] text-[0.88rem] font-semibold text-white bg-deep-sage hover:bg-deep-sage-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Submit Review
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-full py-[10px] text-[0.88rem] font-semibold border border-neutral-200 text-neutral-600 hover:bg-neutral-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
