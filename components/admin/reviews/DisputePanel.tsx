"use client";

import { AlertTriangle, Star } from "lucide-react";
import AdminCard from "@/components/admin/ui/AdminCard";
import AdminButton from "@/components/admin/ui/AdminButton";
import Avatar from "@/components/admin/ui/Avatar";
import { Review } from "@/lib/admin/types";

interface DisputePanelProps {
  review: Review;
  onSideWithTeacher?: (id: string) => void;
  onSideWithMember?: (id: string) => void;
  onClose?: () => void;
}

export default function DisputePanel({
  review,
  onSideWithTeacher,
  onSideWithMember,
  onClose,
}: DisputePanelProps) {
  return (
    <AdminCard className="p-6">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle size={20} className="text-vivid-coral" />
          <h3 className="font-display text-lg font-bold text-neutral-900">
            Review Dispute
          </h3>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-sm text-neutral-500 hover:text-neutral-700"
          >
            Close
          </button>
        )}
      </div>

      {/* Original review */}
      <div className="mb-5 rounded-xl border border-neutral-100 p-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Original Review
        </p>
        <div className="mb-2 flex items-center gap-2.5">
          <Avatar initials={review.memberInitials} size="sm" />
          <div>
            <p className="text-sm font-medium text-neutral-900">{review.memberName}</p>
            <p className="text-xs text-neutral-500">{review.discipline}</p>
          </div>
        </div>
        <div className="mb-2 flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={14}
              className={
                star <= review.rating
                  ? "fill-bright-amber text-bright-amber"
                  : "text-neutral-200"
              }
            />
          ))}
        </div>
        <p className="text-sm leading-relaxed text-neutral-700">{review.comment}</p>
      </div>

      {/* Teacher's dispute reason */}
      <div className="mb-5 rounded-xl border border-vivid-coral/20 bg-vivid-coral/5 p-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-vivid-coral">
          Teacher&apos;s Response
        </p>
        <div className="mb-2 flex items-center gap-2.5">
          <Avatar initials={review.teacherInitials} size="sm" />
          <p className="text-sm font-medium text-neutral-900">{review.teacherName}</p>
        </div>
        <p className="text-sm leading-relaxed text-neutral-700">
          {review.disputeReason}
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <AdminButton
          variant="approve"
          onClick={() => onSideWithTeacher?.(review.id)}
        >
          Side with Teacher
        </AdminButton>
        <AdminButton
          variant="reject"
          onClick={() => onSideWithMember?.(review.id)}
        >
          Side with Member
        </AdminButton>
        <AdminButton variant="secondary" onClick={onClose}>
          Decide Later
        </AdminButton>
      </div>
    </AdminCard>
  );
}
