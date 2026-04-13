"use client";

import { useState } from "react";
import AdminCard from "@/components/admin/ui/AdminCard";
import AdminButton from "@/components/admin/ui/AdminButton";
import AdminModal from "@/components/admin/ui/AdminModal";
import Avatar from "@/components/admin/ui/Avatar";
import StatusBadge from "@/components/admin/ui/StatusBadge";
import { AdminTeacher } from "@/lib/admin/types";
import { disciplineTagColors, Discipline } from "@/lib/teachers";
import { FileText, CheckCircle, XCircle, Globe, Clock, Award } from "lucide-react";

interface ApplicationReviewProps {
  teacher: AdminTeacher;
  onApprove?: (id: string) => void;
  onReject?: (id: string, reason: string) => void;
}

export default function ApplicationReview({ teacher, onApprove, onReject }: ApplicationReviewProps) {
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  const handleReject = () => {
    if (rejectionReason.trim() && onReject) {
      onReject(teacher.id, rejectionReason);
      setRejectModalOpen(false);
      setRejectionReason("");
    }
  };

  return (
    <>
      <AdminCard className="p-6">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Avatar initials={teacher.initials} size="lg" />
            <div>
              <h3 className="font-display text-xl text-neutral-900">{teacher.name}</h3>
              <p className="text-sm text-neutral-500">{teacher.email}</p>
              <div className="mt-1">
                <StatusBadge status={teacher.status} />
              </div>
            </div>
          </div>
          <p className="text-xs text-neutral-500">
            Applied{" "}
            {new Date(teacher.applicationDate).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>

        {/* Bio */}
        <div className="mb-6">
          <h4 className="mb-2 text-sm font-semibold text-neutral-900">Bio</h4>
          <p className="text-sm leading-relaxed text-neutral-700">{teacher.tagline}</p>
        </div>

        {/* Info grid */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-2 text-sm text-neutral-700">
            <Clock size={16} className="text-neutral-400" />
            <span>{teacher.yearsExperience} years experience</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-neutral-700">
            <Globe size={16} className="text-neutral-400" />
            <span>{teacher.languages.join(", ")}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-neutral-700">
            <Award size={16} className="text-neutral-400" />
            <span>${teacher.price}/session</span>
          </div>
        </div>

        {/* Disciplines */}
        <div className="mb-6">
          <h4 className="mb-2 text-sm font-semibold text-neutral-900">Disciplines</h4>
          <div className="flex flex-wrap gap-2">
            {teacher.disciplines.map((d) => {
              const colors = disciplineTagColors[d as Discipline];
              return (
                <span
                  key={d}
                  className="rounded-full px-3 py-1 text-xs font-semibold"
                  style={colors ? { backgroundColor: colors.bg, color: colors.text } : undefined}
                >
                  {d}
                </span>
              );
            })}
          </div>
        </div>

        {/* Documents */}
        <div className="mb-6">
          <h4 className="mb-2 text-sm font-semibold text-neutral-900">Documents</h4>
          <div className="space-y-2">
            {teacher.documents.map((doc) => (
              <div
                key={doc.name}
                className="flex items-center justify-between rounded-xl border border-neutral-100 px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <FileText size={16} className="text-neutral-400" />
                  <span className="text-sm text-neutral-700">{doc.name}</span>
                </div>
                {doc.verified ? (
                  <span className="flex items-center gap-1 text-xs font-medium text-electric-teal">
                    <CheckCircle size={14} />
                    Verified
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs font-medium text-bright-amber">
                    <XCircle size={14} />
                    Pending
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        {teacher.status === "pending" && (
          <div className="flex items-center gap-3 border-t border-neutral-100 pt-5">
            <AdminButton variant="approve" onClick={() => onApprove?.(teacher.id)}>
              Approve Teacher
            </AdminButton>
            <AdminButton variant="reject" onClick={() => setRejectModalOpen(true)}>
              Reject Application
            </AdminButton>
          </div>
        )}
      </AdminCard>

      {/* Rejection Modal */}
      <AdminModal
        open={rejectModalOpen}
        onClose={() => setRejectModalOpen(false)}
        title="Reject Application"
      >
        <p className="mb-3 text-sm text-neutral-700">
          Provide a reason for rejecting <span className="font-semibold">{teacher.name}</span>&apos;s application.
        </p>
        <textarea
          value={rejectionReason}
          onChange={(e) => setRejectionReason(e.target.value)}
          placeholder="Enter rejection reason..."
          rows={4}
          className="mb-4 w-full rounded-xl border border-neutral-200 p-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-deep-sage focus:outline-none focus:ring-1 focus:ring-deep-sage"
        />
        <div className="flex justify-end gap-3">
          <AdminButton variant="secondary" onClick={() => setRejectModalOpen(false)}>
            Cancel
          </AdminButton>
          <AdminButton
            variant="reject"
            onClick={handleReject}
            disabled={!rejectionReason.trim()}
          >
            Confirm Rejection
          </AdminButton>
        </div>
      </AdminModal>
    </>
  );
}
