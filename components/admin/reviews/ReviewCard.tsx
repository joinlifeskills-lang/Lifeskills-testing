"use client";

import { Star, Flag, AlertTriangle, ThumbsUp } from "lucide-react";
import AdminCard from "@/components/admin/ui/AdminCard";
import AdminButton from "@/components/admin/ui/AdminButton";
import Avatar from "@/components/admin/ui/Avatar";
import StatusBadge from "@/components/admin/ui/StatusBadge";
import { Review } from "@/lib/admin/types";

interface ReviewCardProps {
  review: Review;
  onPublish?: (id: string) => void;
  onHide?: (id: string) => void;
  onDismiss?: (id: string) => void;
  onDispute?: (review: Review) => void;
}

export default function ReviewCard({
  review,
  onPublish,
  onHide,
  onDismiss,
  onDispute,
}: ReviewCardProps) {
  return (
    <AdminCard className="p-5">
      {/* Header: member info + status */}
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Avatar initials={review.memberInitials} size="md" />
          <div>
            <p className="font-medium text-neutral-900">{review.memberName}</p>
            <p className="text-xs text-neutral-500">{formatDate(review.date)}</p>
          </div>
        </div>
        <StatusBadge status={review.status} />
      </div>

      {/* Rating stars */}
      <div className="mb-2 flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={
              star <= review.rating
                ? "fill-bright-amber text-bright-amber"
                : "text-neutral-200"
            }
          />
        ))}
        <span className="ml-2 text-sm font-semibold text-neutral-700">
          {review.rating}.0
        </span>
      </div>

      {/* Comment */}
      <p className="mb-3 text-sm leading-relaxed text-neutral-700">
        {review.comment}
      </p>

      {/* Teacher + Discipline */}
      <div className="mb-3 flex items-center gap-2 text-xs text-neutral-500">
        <Avatar initials={review.teacherInitials} size="sm" />
        <span className="font-medium text-neutral-700">{review.teacherName}</span>
        <span>&middot;</span>
        <span>{review.discipline}</span>
      </div>

      {/* Helpful count */}
      <div className="mb-3 flex items-center gap-1 text-xs text-neutral-500">
        <ThumbsUp size={12} />
        <span>{review.helpful} found helpful</span>
      </div>

      {/* Flag / Dispute reason */}
      {review.status === "flagged" && review.flagReason && (
        <div className="mb-3 flex items-start gap-2 rounded-lg bg-bright-amber/5 p-3">
          <Flag size={14} className="mt-0.5 shrink-0 text-bright-amber" />
          <p className="text-xs text-neutral-700">
            <span className="font-semibold">Flag reason: </span>
            {review.flagReason}
          </p>
        </div>
      )}

      {review.status === "disputed" && review.disputeReason && (
        <div className="mb-3 flex items-start gap-2 rounded-lg bg-vivid-coral/5 p-3">
          <AlertTriangle size={14} className="mt-0.5 shrink-0 text-vivid-coral" />
          <p className="text-xs text-neutral-700">
            <span className="font-semibold">Dispute reason: </span>
            {review.disputeReason}
          </p>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-wrap gap-2 border-t border-neutral-100 pt-3">
        {(review.status === "flagged" || review.status === "hidden") && (
          <>
            <AdminButton size="sm" variant="approve" onClick={() => onPublish?.(review.id)}>
              Publish
            </AdminButton>
            {review.status !== "hidden" && (
              <AdminButton size="sm" variant="reject" onClick={() => onHide?.(review.id)}>
                Hide
              </AdminButton>
            )}
            <AdminButton size="sm" variant="secondary" onClick={() => onDismiss?.(review.id)}>
              Dismiss Flag
            </AdminButton>
          </>
        )}
        {review.status === "disputed" && (
          <AdminButton size="sm" variant="secondary" onClick={() => onDispute?.(review)}>
            Review Dispute
          </AdminButton>
        )}
        {review.status === "published" && (
          <AdminButton size="sm" variant="secondary" onClick={() => onHide?.(review.id)}>
            Hide
          </AdminButton>
        )}
      </div>
    </AdminCard>
  );
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
