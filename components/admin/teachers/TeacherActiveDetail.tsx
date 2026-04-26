"use client";

import { useState } from "react";
import AdminCard from "@/components/admin/ui/AdminCard";
import AdminButton from "@/components/admin/ui/AdminButton";
import AdminModal from "@/components/admin/ui/AdminModal";
import Avatar from "@/components/admin/ui/Avatar";
import StatusBadge from "@/components/admin/ui/StatusBadge";
import { AdminTeacher } from "@/lib/admin/types";
import { disciplineTagColors, disciplineGradient, Discipline } from "@/lib/teachers";
import {
  Phone,
  Mail,
  Globe,
  Clock,
  Award,
  Send,
  ShieldOff,
  ShieldCheck,
  Eye,
  X,
  Star,
  MessageCircle,
} from "lucide-react";

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

/* ═══════════════════════════════════════
   Customer-Facing Profile Preview
   Mirrors the public /find-a-teacher/[slug] page
   ═══════════════════════════════════════ */
function ProfilePreview({ teacher, onClose }: { teacher: AdminTeacher; onClose: () => void }) {
  const gradient = disciplineGradient[teacher.disciplines[0]];
  const helpTags = ["Stress", "Anxiety", "Burnout", "Sleep", "Focus", "Emotional Regulation", "Self-discovery"];
  const expectations = [
    "A grounding 60-minute session tailored to where you are today",
    "Practical tools you can use between sessions",
    "A safe, judgement-free space to explore what's holding you back",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4 pt-12 pb-12">
      <div className="relative w-full max-w-4xl rounded-2xl bg-warm-sand shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-neutral-600 shadow-sm backdrop-blur-sm hover:bg-white hover:text-neutral-900 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Admin banner */}
        <div className="rounded-t-2xl bg-deep-sage px-5 py-3">
          <div className="flex items-center gap-2">
            <Eye size={14} className="text-white/70" />
            <span className="text-xs font-semibold text-white/90">Profile Preview</span>
            <span className="text-xs text-white/60">-- This is how customers see this teacher&apos;s profile</span>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left column */}
            <div className="flex-1 min-w-0">
              {/* Photo placeholder */}
              <div
                className="relative w-full rounded-2xl flex items-center justify-center mb-6"
                style={{ background: gradient, height: 320 }}
              >
                <span className="font-sans font-bold text-white/80 text-[3.5rem]">
                  {teacher.initials}
                </span>
              </div>

              {/* Name */}
              <h1 className="font-display text-[1.8rem] md:text-[2.2rem] text-deep-sage leading-tight mb-3">
                {teacher.name}
              </h1>

              {/* Discipline tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                {teacher.disciplines.map((d) => {
                  const colors = disciplineTagColors[d as Discipline];
                  return (
                    <span
                      key={d}
                      className="inline-block rounded-full px-3 py-1 font-sans text-[0.78rem] font-semibold"
                      style={colors ? { backgroundColor: colors.bg, color: colors.text } : undefined}
                    >
                      {d}
                    </span>
                  );
                })}
              </div>

              {/* Available badge */}
              <div className="flex items-center gap-1.5 mb-5 font-sans text-[0.85rem] text-neutral-600">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
                Available {teacher.nextAvailable}
              </div>

              {/* Bio */}
              <p className="font-sans text-[0.95rem] text-neutral-600 leading-[1.7] mb-8">
                {teacher.tagline}
              </p>

              {/* What to expect */}
              <div className="mb-8">
                <h2 className="font-display text-[1.3rem] text-deep-sage mb-3">
                  What to expect
                </h2>
                <ul className="flex flex-col gap-2.5">
                  {expectations.map((item) => (
                    <li key={item} className="flex items-start gap-3 font-sans text-[0.88rem] text-neutral-600 leading-[1.6]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 mt-0.5">
                        <circle cx="12" cy="12" r="10" stroke="#0BA89A" strokeWidth="2" />
                        <path d="M8 12l3 3 5-5" stroke="#0BA89A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* I can help you with */}
              <div className="mb-8">
                <h2 className="font-display text-[1.3rem] text-deep-sage mb-3">
                  I can help you with
                </h2>
                <div className="flex flex-wrap gap-2">
                  {helpTags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block rounded-full px-4 py-1.5 font-sans text-[0.82rem] font-medium bg-white/60 text-deep-sage"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* My approach */}
              <div>
                <h2 className="font-display text-[1.3rem] text-deep-sage mb-3">
                  My approach
                </h2>
                <p className="font-display italic text-neutral-600 text-[1rem] leading-[1.6]">
                  &ldquo;I meet you exactly where you are -- no forcing, no fixing, just presence and gentle guidance toward the calm that already lives inside you.&rdquo;
                </p>
              </div>
            </div>

            {/* Right column — booking card preview (non-functional) */}
            <div className="w-full md:w-[300px] flex-shrink-0">
              <div className="sticky top-4 rounded-2xl bg-white p-5 shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full"
                    style={{ background: gradient }}
                  >
                    <span className="font-sans text-sm font-bold text-white">{teacher.initials}</span>
                  </div>
                  <div>
                    <p className="font-sans text-sm font-semibold text-neutral-900">{teacher.name}</p>
                    <div className="flex items-center gap-1">
                      <Star size={12} className="text-bright-amber" fill="#F0A500" />
                      <span className="font-sans text-xs text-neutral-600">
                        {teacher.rating > 0 ? teacher.rating.toFixed(1) : "New"} ({teacher.sessions} sessions)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mb-4 rounded-xl bg-warm-sand/50 p-3 text-center">
                  <span className="font-display text-2xl text-deep-sage">${teacher.price}</span>
                  <span className="font-sans text-xs text-neutral-500"> / session</span>
                </div>
                <div className="rounded-full bg-electric-teal py-3 text-center font-sans text-sm font-semibold text-white opacity-60 cursor-not-allowed">
                  Book a Session
                </div>
                <p className="mt-2 text-center font-sans text-[0.65rem] text-neutral-400">
                  Preview only -- booking disabled
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   Main Detail Panel for Active Teachers
   ═══════════════════════════════════════ */
interface TeacherActiveDetailProps {
  teacher: AdminTeacher;
  onSuspend: (id: string, reason: string) => void;
  onUnsuspend?: (id: string) => void;
  onMessage: (id: string, message: string) => void;
}

export default function TeacherActiveDetail({
  teacher,
  onSuspend,
  onUnsuspend,
  onMessage,
}: TeacherActiveDetailProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [suspendModalOpen, setSuspendModalOpen] = useState(false);
  const [suspendReason, setSuspendReason] = useState("");
  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const [messageText, setMessageText] = useState("");

  const handleSuspend = () => {
    if (suspendReason.trim()) {
      onSuspend(teacher.id, suspendReason);
      setSuspendModalOpen(false);
      setSuspendReason("");
    }
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      onMessage(teacher.id, messageText);
      setMessageModalOpen(false);
      setMessageText("");
    }
  };

  return (
    <>
      {showPreview && <ProfilePreview teacher={teacher} onClose={() => setShowPreview(false)} />}

      <AdminCard className="p-6">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            <Avatar initials={teacher.initials} size="lg" />
            <div className="min-w-0">
              <h3 className="truncate font-display text-xl text-neutral-900">{teacher.name}</h3>
              <p className="truncate text-sm text-neutral-500">{teacher.email}</p>
              <div className="mt-1 flex items-center gap-2">
                <StatusBadge status={teacher.status} />
                {teacher.rating > 0 && (
                  <span className="flex items-center gap-1 text-xs text-neutral-500">
                    <Star size={12} className="text-bright-amber" fill="#F0A500" />
                    {teacher.rating.toFixed(1)}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <AdminButton variant="secondary" size="sm" onClick={() => setShowPreview(true)}>
              <Eye size={14} />
              Preview Profile
            </AdminButton>
            <AdminButton variant="secondary" size="sm" onClick={() => setMessageModalOpen(true)}>
              <MessageCircle size={14} />
              Message
            </AdminButton>
            {teacher.status === "active" ? (
              <AdminButton variant="danger" size="sm" onClick={() => setSuspendModalOpen(true)}>
                <ShieldOff size={14} />
                Suspend
              </AdminButton>
            ) : teacher.status === "suspended" && onUnsuspend ? (
              <AdminButton variant="approve" size="sm" onClick={() => onUnsuspend(teacher.id)}>
                <ShieldCheck size={14} />
                Unsuspend
              </AdminButton>
            ) : null}
          </div>
        </div>

        {/* Contact Info */}
        <div className="mb-6">
          <h4 className="mb-2 text-sm font-semibold text-neutral-900">Contact Information</h4>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href={`mailto:${teacher.email}`} className="flex items-center gap-2 text-sm text-neutral-700 hover:text-electric-teal transition-colors">
              <Mail size={15} className="text-neutral-400" />
              {teacher.email}
            </a>
            <a href={`tel:${teacher.phone}`} className="flex items-center gap-2 text-sm text-neutral-700 hover:text-electric-teal transition-colors">
              <Phone size={15} className="text-neutral-400" />
              {teacher.phone}
            </a>
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
                <Globe size={15} className="text-neutral-400" />
                {teacher.socials.website}
              </span>
            )}
          </div>
        </div>

        {/* Bio */}
        <div className="mb-6">
          <h4 className="mb-2 text-sm font-semibold text-neutral-900">Bio</h4>
          <p className="text-sm leading-relaxed text-neutral-700">{teacher.tagline}</p>
        </div>

        {/* Stats grid */}
        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-xl bg-warm-sand/40 p-3 text-center">
            <p className="font-display text-xl text-deep-sage">{teacher.sessions.toLocaleString()}</p>
            <p className="text-[0.65rem] text-neutral-500">Sessions</p>
          </div>
          <div className="rounded-xl bg-warm-sand/40 p-3 text-center">
            <p className="font-display text-xl text-deep-sage">${teacher.revenue.toLocaleString()}</p>
            <p className="text-[0.65rem] text-neutral-500">Revenue</p>
          </div>
          <div className="rounded-xl bg-warm-sand/40 p-3 text-center">
            <p className="font-display text-xl text-deep-sage">{teacher.completionRate}%</p>
            <p className="text-[0.65rem] text-neutral-500">Completion</p>
          </div>
          <div className="rounded-xl bg-warm-sand/40 p-3 text-center">
            <p className="font-display text-xl text-deep-sage">{teacher.yearsExperience}yr</p>
            <p className="text-[0.65rem] text-neutral-500">Experience</p>
          </div>
        </div>

        {/* Info row */}
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

        {/* Suspension info */}
        {teacher.status === "suspended" && teacher.suspendedDate && (
          <div className="rounded-xl border border-vivid-coral/20 bg-vivid-coral/5 p-4">
            <p className="text-sm font-medium text-vivid-coral">
              Suspended on {new Date(teacher.suspendedDate).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            {teacher.interviewNotes && (
              <p className="mt-1 text-xs text-neutral-600">{teacher.interviewNotes}</p>
            )}
          </div>
        )}
      </AdminCard>

      {/* Suspend Modal */}
      <AdminModal
        open={suspendModalOpen}
        onClose={() => setSuspendModalOpen(false)}
        title="Suspend Teacher"
      >
        <p className="mb-3 text-sm text-neutral-700">
          Provide a reason for suspending <span className="font-semibold">{teacher.name}</span>.
          They will be notified via email.
        </p>
        <textarea
          value={suspendReason}
          onChange={(e) => setSuspendReason(e.target.value)}
          placeholder="e.g. Repeated late cancellations, policy violations..."
          rows={4}
          className="mb-4 w-full rounded-xl border border-neutral-200 p-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-deep-sage focus:outline-none focus:ring-1 focus:ring-deep-sage"
        />
        <div className="flex justify-end gap-3">
          <AdminButton variant="secondary" onClick={() => setSuspendModalOpen(false)}>
            Cancel
          </AdminButton>
          <AdminButton
            variant="reject"
            onClick={handleSuspend}
            disabled={!suspendReason.trim()}
          >
            <ShieldOff size={14} />
            Suspend Teacher
          </AdminButton>
        </div>
      </AdminModal>

      {/* Message Modal */}
      <AdminModal
        open={messageModalOpen}
        onClose={() => setMessageModalOpen(false)}
        title={`Message ${teacher.name}`}
      >
        <p className="mb-3 text-sm text-neutral-500">
          Send a direct message to this teacher. They will receive it via email and in-app notification.
        </p>
        <textarea
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Type your message..."
          rows={5}
          className="mb-4 w-full rounded-xl border border-neutral-200 p-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-deep-sage focus:outline-none focus:ring-1 focus:ring-deep-sage"
        />
        <div className="flex justify-end gap-3">
          <AdminButton variant="secondary" onClick={() => setMessageModalOpen(false)}>
            Cancel
          </AdminButton>
          <AdminButton
            variant="primary"
            onClick={handleSendMessage}
            disabled={!messageText.trim()}
          >
            <Send size={14} />
            Send Message
          </AdminButton>
        </div>
      </AdminModal>
    </>
  );
}
