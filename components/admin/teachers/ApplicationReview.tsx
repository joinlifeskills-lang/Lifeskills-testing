"use client";

import { useState } from "react";
import AdminCard from "@/components/admin/ui/AdminCard";
import AdminButton from "@/components/admin/ui/AdminButton";
import AdminModal from "@/components/admin/ui/AdminModal";
import Avatar from "@/components/admin/ui/Avatar";
import StatusBadge from "@/components/admin/ui/StatusBadge";
import { AdminTeacher } from "@/lib/admin/types";
import { disciplineTagColors, Discipline } from "@/lib/teachers";
import { FileText, CheckCircle, XCircle, Globe, Clock, Award, AlertCircle, Eye, X, ExternalLink, Phone, Mail, LinkIcon } from "lucide-react";

function InstagramIcon({ size = 15, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ size = 15, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

type CertStatus = "approved" | "rejected" | "pending";

function isImageUrl(url: string) {
  return /\.(jpg|jpeg|png|webp|gif)(\?|$)/i.test(url);
}

function DocPreviewOverlay({ url, name, onClose }: { url: string; name: string; onClose: () => void }) {
  const isImage = isImageUrl(url);
  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-black/90">
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between px-5 py-4">
        <span className="text-sm font-semibold text-white">{name}</span>
        <div className="flex items-center gap-3">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full border border-white/30 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/10"
          >
            <ExternalLink size={13} /> Open in new tab
          </a>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-white hover:bg-white/10"
          >
            <X size={20} />
          </button>
        </div>
      </div>
      {/* Viewer */}
      <div className="flex flex-1 items-center justify-center overflow-hidden px-4 pb-4">
        {isImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={url} alt={name} className="max-h-full max-w-full rounded-lg object-contain" />
        ) : (
          <iframe
            src={url}
            title={name}
            className="h-full w-full rounded-lg bg-white"
          />
        )}
      </div>
    </div>
  );
}

interface ApplicationReviewProps {
  teacher: AdminTeacher;
  onApprove?: (id: string) => void;
  onReject?: (id: string, reason: string) => void;
}

export default function ApplicationReview({ teacher, onApprove, onReject }: ApplicationReviewProps) {
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  // Per-certification state: initialized from teacher.documents
  const [certStatuses, setCertStatuses] = useState<Record<string, CertStatus>>(() => {
    const init: Record<string, CertStatus> = {};
    teacher.documents.forEach((doc) => {
      init[doc.name] = doc.verified ? "approved" : "pending";
    });
    return init;
  });
  const [certRejectTarget, setCertRejectTarget] = useState<string | null>(null);
  const [certRejectReason, setCertRejectReason] = useState("");
  const [previewDoc, setPreviewDoc] = useState<{ name: string; url: string } | null>(null);

  function handleCertApprove(docName: string) {
    setCertStatuses((prev) => ({ ...prev, [docName]: "approved" }));
  }

  function handleCertRejectConfirm() {
    if (certRejectTarget) {
      setCertStatuses((prev) => ({ ...prev, [certRejectTarget]: "rejected" }));
      setCertRejectTarget(null);
      setCertRejectReason("");
    }
  }

  const handleReject = () => {
    if (rejectionReason.trim() && onReject) {
      onReject(teacher.id, rejectionReason);
      setRejectModalOpen(false);
      setRejectionReason("");
    }
  };

  return (
    <>
      {previewDoc && (
        <DocPreviewOverlay
          url={previewDoc.url}
          name={previewDoc.name}
          onClose={() => setPreviewDoc(null)}
        />
      )}
      <AdminCard className="p-6">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            <Avatar initials={teacher.initials} size="lg" />
            <div className="min-w-0">
              <h3 className="truncate font-display text-xl text-neutral-900">{teacher.name}</h3>
              <p className="truncate text-sm text-neutral-500">{teacher.email}</p>
              <div className="mt-1">
                <StatusBadge status={teacher.status} />
              </div>
            </div>
          </div>
          <p className="shrink-0 text-xs text-neutral-500">
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

        {/* Contact Info */}
        <div className="mb-6">
          <h4 className="mb-2 text-sm font-semibold text-neutral-900">Contact Information</h4>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <span className="flex items-center gap-2 text-sm text-neutral-700">
              <Mail size={15} className="text-neutral-400" />
              {teacher.email}
            </span>
            <span className="flex items-center gap-2 text-sm text-neutral-700">
              <Phone size={15} className="text-neutral-400" />
              {teacher.phone}
            </span>
            {teacher.socials?.instagram && (
              <span className="flex items-center gap-2 text-sm text-neutral-700">
                <InstagramIcon size={15} className="text-neutral-400" />
                {teacher.socials.instagram}
              </span>
            )}
            {teacher.socials?.facebook && (
              <span className="flex items-center gap-2 text-sm text-neutral-700">
                <FacebookIcon size={15} className="text-neutral-400" />
                {teacher.socials.facebook}
              </span>
            )}
            {teacher.socials?.website && (
              <span className="flex items-center gap-2 text-sm text-neutral-700">
                <LinkIcon size={15} className="text-neutral-400" />
                {teacher.socials.website}
              </span>
            )}
          </div>
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

        {/* Certifications / Documents */}
        <div className="mb-6">
          <h4 className="mb-2 text-sm font-semibold text-neutral-900">Certifications &amp; Documents</h4>
          <div className="space-y-2">
            {teacher.documents.map((doc) => {
              const status = certStatuses[doc.name] ?? "pending";
              return (
                <div
                  key={doc.name}
                  className="rounded-xl border border-neutral-100 px-4 py-3"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    {/* Doc name */}
                    <div className="flex min-w-0 items-center gap-3">
                      <FileText size={16} className="shrink-0 text-neutral-400" />
                      <span className="text-sm text-neutral-700">{doc.name}</span>
                    </div>
                    {/* Actions */}
                    <div className="flex shrink-0 items-center gap-3 w-full sm:w-auto">
                      {status === "approved" && (
                        <span className="flex items-center gap-1 text-xs font-medium text-electric-teal">
                          <CheckCircle size={14} />
                          Approved
                        </span>
                      )}
                      {status === "rejected" && (
                        <span className="flex items-center gap-1 text-xs font-medium text-red-500">
                          <XCircle size={14} />
                          Rejected
                        </span>
                      )}
                      {status === "pending" && (
                        <>
                          <button
                            onClick={() => handleCertApprove(doc.name)}
                            className="flex-1 sm:flex-none rounded-full bg-electric-teal/10 px-3 py-1 text-xs font-semibold text-electric-teal transition-colors hover:bg-electric-teal/20 text-center"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => setCertRejectTarget(doc.name)}
                            className="flex-1 sm:flex-none rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-500 transition-colors hover:bg-red-100 text-center"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => setPreviewDoc({ name: doc.name, url: doc.url })}
                        className="ml-auto sm:ml-0 flex items-center gap-1.5 rounded-full border border-neutral-200 px-3 py-1 text-xs font-semibold text-neutral-600 transition-colors hover:border-neutral-400 hover:text-neutral-900"
                      >
                        <Eye size={12} /> View
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
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

      {/* Application Rejection Modal */}
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

      {/* Per-Certification Rejection Modal */}
      <AdminModal
        open={!!certRejectTarget}
        onClose={() => { setCertRejectTarget(null); setCertRejectReason(""); }}
        title="Reject Certification"
      >
        <p className="mb-3 text-sm text-neutral-700">
          Provide a reason for rejecting{" "}
          <span className="font-semibold">{certRejectTarget}</span>.
        </p>
        <textarea
          value={certRejectReason}
          onChange={(e) => setCertRejectReason(e.target.value)}
          placeholder="e.g. Could not verify issuing institution..."
          rows={3}
          className="mb-4 w-full rounded-xl border border-neutral-200 p-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-deep-sage focus:outline-none focus:ring-1 focus:ring-deep-sage"
        />
        <div className="flex justify-end gap-3">
          <AdminButton variant="secondary" onClick={() => { setCertRejectTarget(null); setCertRejectReason(""); }}>
            Cancel
          </AdminButton>
          <AdminButton variant="reject" onClick={handleCertRejectConfirm}>
            Reject Certification
          </AdminButton>
        </div>
      </AdminModal>
    </>
  );
}
