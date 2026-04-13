"use client";

import { useState } from "react";
import { Star, Send } from "lucide-react";
import { teacherReviews, teacherProfile } from "@/lib/teacher/data";
import type { TeacherReview } from "@/lib/teacher/types";

const DISCIPLINE_COLORS: Record<string, string> = {
  Breathwork: "#0BA89A",
  Meditation: "#6BAA3E",
  Yoga: "#D4940A",
  Somatic: "#E8603A",
};

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={
            i < rating
              ? "fill-bright-amber text-bright-amber"
              : "text-neutral-300"
          }
        />
      ))}
    </div>
  );
}

export default function ReviewsDisplay() {
  const [reviews, setReviews] = useState<TeacherReview[]>(
    [...teacherReviews].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  );
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  // Rating breakdown
  const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));
  const maxCount = Math.max(...ratingCounts.map((r) => r.count), 1);

  function submitReply(reviewId: string) {
    if (!replyText.trim()) return;
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, reply: replyText.trim() } : r))
    );
    setReplyingTo(null);
    setReplyText("");
  }

  return (
    <div className="space-y-6">
      {/* ── Summary ── */}
      <div className="rounded-2xl bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          {/* Large rating */}
          <div className="flex flex-col items-center gap-1">
            <span className="font-display text-5xl text-neutral-900">
              {teacherProfile.rating}
            </span>
            <Stars rating={Math.round(teacherProfile.rating)} size={18} />
            <span className="mt-1 text-sm text-neutral-500">
              {teacherProfile.totalReviews} reviews
            </span>
          </div>

          {/* Breakdown bars */}
          <div className="flex-1 space-y-2">
            {ratingCounts.map(({ star, count }) => (
              <div key={star} className="flex items-center gap-3">
                <span className="w-12 text-right text-sm text-neutral-700">
                  {star} star{star !== 1 && "s"}
                </span>
                <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-neutral-100">
                  <div
                    className="h-full rounded-full bg-bright-amber transition-all"
                    style={{ width: `${(count / maxCount) * 100}%` }}
                  />
                </div>
                <span className="w-6 text-sm text-neutral-500">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Review List ── */}
      <div className="rounded-2xl bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
        <h3 className="mb-4 font-display text-lg text-neutral-900">All Reviews</h3>
        <div className="divide-y divide-neutral-100">
          {reviews.map((review) => (
            <div key={review.id} className="py-5 first:pt-0 last:pb-0">
              {/* Header */}
              <div className="mb-2 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-electric-teal/15 text-xs font-bold text-electric-teal">
                    {review.clientInitials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">
                      {review.clientName}
                    </p>
                    <div className="flex items-center gap-2">
                      <Stars rating={review.rating} />
                      <span className="text-xs text-neutral-400">
                        {new Date(review.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
                <span
                  className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold text-white"
                  style={{
                    backgroundColor:
                      DISCIPLINE_COLORS[review.discipline] ?? "#2D4A3E",
                  }}
                >
                  {review.discipline}
                </span>
              </div>

              {/* Review text */}
              <p className="text-sm leading-relaxed text-neutral-700">
                {review.text}
              </p>

              {/* Reply */}
              {review.reply && (
                <div className="mt-3 ml-6 rounded-xl border border-neutral-100 bg-neutral-50 px-4 py-3">
                  <p className="mb-1 text-xs font-semibold text-neutral-500">
                    Your reply
                  </p>
                  <p className="text-sm text-neutral-700">{review.reply}</p>
                </div>
              )}

              {/* Reply button / form */}
              {!review.reply && replyingTo !== review.id && (
                <button
                  onClick={() => {
                    setReplyingTo(review.id);
                    setReplyText("");
                  }}
                  className="mt-2 text-sm font-semibold text-electric-teal"
                >
                  Reply
                </button>
              )}

              {replyingTo === review.id && (
                <div className="mt-3 space-y-2">
                  <textarea
                    rows={2}
                    className="w-full resize-none rounded-xl border border-neutral-200 px-4 py-2.5 text-sm text-neutral-900 outline-none focus:border-electric-teal"
                    placeholder="Write a reply..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => submitReply(review.id)}
                      className="flex items-center gap-1.5 rounded-full bg-energy-gradient px-4 py-2 text-xs font-semibold text-white"
                    >
                      <Send size={12} /> Send
                    </button>
                    <button
                      onClick={() => setReplyingTo(null)}
                      className="rounded-full border border-neutral-300 px-4 py-2 text-xs font-semibold text-neutral-500"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
