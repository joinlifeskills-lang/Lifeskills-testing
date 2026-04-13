"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Calendar, Clock, Star, ChevronDown, X, AlertTriangle, CheckCircle } from "lucide-react";
import { MemberSession } from "@/lib/member/types";
import { disciplineTagColors, type Discipline } from "@/lib/teachers";
import LeaveReviewModal from "./LeaveReviewModal";
import {
  getAvailableSlots,
  hasAvailability,
  getUpcomingDates,
} from "@/lib/member/teacherAvailability";

const avatarColors = [
  "#0BA89A", "#E8603A", "#6BAA3E", "#F0A500",
  "#2D4A3E", "#6B5BAA", "#D4940A",
];

function getAvatarColor(initials: string): string {
  let hash = 0;
  for (let i = 0; i < initials.length; i++)
    hash = initials.charCodeAt(i) + ((hash << 5) - hash);
  return avatarColors[Math.abs(hash) % avatarColors.length];
}

function formatSessionDate(date: string, time: string): string {
  const d = new Date(date + "T00:00:00");
  return `${d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })} at ${time}`;
}

function hoursUntil(date: string, time: string): number {
  const [year, month, day] = date.split("-").map(Number);
  const [timePart, mer] = time.split(" ");
  let [h, m] = timePart.split(":").map(Number);
  if (mer === "PM" && h !== 12) h += 12;
  if (mer === "AM" && h === 12) h = 0;
  return (new Date(year, month - 1, day, h, m).getTime() - Date.now()) / 3_600_000;
}

function formatDateLabel(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return {
    day: d.toLocaleDateString("en-US", { weekday: "short" }),
    num: d.toLocaleDateString("en-US", { day: "numeric" }),
    month: d.toLocaleDateString("en-US", { month: "short" }),
  };
}

function formatFullDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric",
  });
}

// ── Reschedule Modal ──────────────────────────────────────────────────────────
function RescheduleModal({ teacherName, teacherSlug, hoursLeft, onClose }: {
  teacherName: string; teacherSlug: string; hoursLeft: number; onClose: () => void;
}) {
  const allDates = getUpcomingDates(21);
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const isLate = hoursLeft < 24;
  const WEEK = 6;
  const visibleDates = allDates.slice(weekOffset * WEEK, weekOffset * WEEK + WEEK);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl p-6 relative">
        <button type="button" onClick={onClose} className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 transition-colors"><X size={18} /></button>
        {submitted ? (
          <div className="flex flex-col items-center text-center py-6 gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-deep-sage/10">
              <CheckCircle size={28} className="text-deep-sage" />
            </div>
            <h3 className="font-display text-xl text-neutral-900">{isLate ? "Request Sent" : "Session Rescheduled"}</h3>
            <p className="text-sm text-neutral-500">
              {isLate
                ? `Your request for ${formatFullDate(selectedDate!)} at ${selectedSlot} has been sent to ${teacherName}.`
                : `Your session with ${teacherName} has been moved to ${formatFullDate(selectedDate!)} at ${selectedSlot}.`}
            </p>
            <button onClick={onClose} className="mt-2 rounded-full py-[10px] px-[26px] text-[0.88rem] font-semibold bg-deep-sage text-white hover:bg-deep-sage-hover transition-colors">Done</button>
          </div>
        ) : (
          <>
            <h3 className="font-display text-xl text-neutral-900 mb-0.5">Reschedule Session</h3>
            <p className="text-sm text-neutral-500 mb-5">with {teacherName}</p>
            {isLate && (
              <div className="flex gap-2.5 p-3.5 rounded-xl bg-bright-amber/10 border border-bright-amber/20 mb-5">
                <AlertTriangle size={16} className="text-bright-amber shrink-0 mt-0.5" />
                <p className="text-sm text-neutral-700">Less than 24 hours away — rescheduling requires <span className="font-semibold">teacher approval</span>.</p>
              </div>
            )}
            {/* Date strip */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-neutral-700">Select a date</p>
                <div className="flex gap-1">
                  <button onClick={() => { setWeekOffset(w => w - 1); setSelectedDate(null); setSelectedSlot(null); }} disabled={weekOffset === 0} className="p-1.5 rounded-full hover:bg-neutral-100 disabled:opacity-30 transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                  </button>
                  <button onClick={() => { setWeekOffset(w => w + 1); setSelectedDate(null); setSelectedSlot(null); }} disabled={(weekOffset + 1) * WEEK >= allDates.length} className="p-1.5 rounded-full hover:bg-neutral-100 disabled:opacity-30 transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-6 gap-1.5">
                {visibleDates.map((date) => {
                  const { day, num, month } = formatDateLabel(date);
                  const available = hasAvailability(teacherSlug, date);
                  const isSelected = selectedDate === date;
                  return (
                    <button key={date} onClick={() => { if (available) { setSelectedDate(date); setSelectedSlot(null); } }} disabled={!available}
                      className={`flex flex-col items-center py-2.5 px-1 rounded-xl text-center transition-colors ${isSelected ? "bg-deep-sage text-white" : available ? "bg-neutral-50 hover:bg-deep-sage/10 text-neutral-800 border border-neutral-200" : "bg-neutral-50 text-neutral-300 cursor-not-allowed border border-neutral-100"}`}>
                      <span className="text-[10px] font-medium uppercase tracking-wide opacity-70">{day}</span>
                      <span className="text-base font-bold mt-0.5">{num}</span>
                      <span className="text-[10px] opacity-60">{month}</span>
                      {available && !isSelected && <span className="mt-1 h-1 w-1 rounded-full bg-deep-sage/50" />}
                    </button>
                  );
                })}
              </div>
            </div>
            {/* Time slots */}
            {selectedDate && (
              <div className="mb-6">
                <p className="text-sm font-medium text-neutral-700 mb-3">Available times on {formatFullDate(selectedDate)}</p>
                <div className="flex flex-wrap gap-2">
                  {getAvailableSlots(teacherSlug, selectedDate).map((slot) => (
                    <button key={slot} onClick={() => setSelectedSlot(slot)}
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${selectedSlot === slot ? "bg-deep-sage text-white border-deep-sage" : "bg-white text-neutral-700 border-neutral-200 hover:border-deep-sage hover:text-deep-sage"}`}>
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="flex gap-3">
              <button onClick={() => setSubmitted(true)} disabled={!selectedDate || !selectedSlot}
                className="flex-1 rounded-full py-[10px] text-[0.88rem] font-semibold text-white bg-deep-sage hover:bg-deep-sage-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                {isLate ? "Send Request" : "Confirm Reschedule"}
              </button>
              <button onClick={onClose} className="flex-1 rounded-full py-[10px] text-[0.88rem] font-semibold border border-neutral-200 text-neutral-600 hover:bg-neutral-50 transition-colors">Cancel</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── Cancel Modal ──────────────────────────────────────────────────────────────
function CancelModal({ teacherName, hoursLeft, price, onClose }: {
  teacherName: string; hoursLeft: number; price: number; onClose: () => void;
}) {
  const [confirmed, setConfirmed] = useState(false);
  const isLate = hoursLeft <= 24;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl p-6 relative">
        <button type="button" onClick={onClose} className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 transition-colors"><X size={18} /></button>
        {confirmed ? (
          <div className="flex flex-col items-center text-center py-6 gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-deep-sage/10">
              <CheckCircle size={28} className="text-deep-sage" />
            </div>
            <h3 className="font-display text-xl text-neutral-900">Session Cancelled</h3>
            <p className="text-sm text-neutral-500">
              {isLate ? "Your session has been cancelled. No refund will be issued per our 24-hour policy." : `Cancelled successfully. A full refund of $${price} will be processed in 3–5 business days.`}
            </p>
            <button onClick={onClose} className="mt-2 rounded-full py-[10px] px-[26px] text-[0.88rem] font-semibold bg-deep-sage text-white hover:bg-deep-sage-hover transition-colors">Done</button>
          </div>
        ) : (
          <>
            <h3 className="font-display text-xl text-neutral-900 mb-1">Cancel Session</h3>
            <p className="text-sm text-neutral-500 mb-5">with {teacherName}</p>
            {isLate ? (
              <div className="flex gap-2.5 p-3.5 rounded-xl bg-vivid-coral/10 border border-vivid-coral/20 mb-5">
                <AlertTriangle size={16} className="text-vivid-coral shrink-0 mt-0.5" />
                <p className="text-sm text-neutral-700">Within <span className="font-semibold">24 hours</span> — you can cancel but <span className="font-semibold">no refund</span> will be issued.</p>
              </div>
            ) : (
              <div className="flex gap-2.5 p-3.5 rounded-xl bg-deep-sage/10 border border-deep-sage/20 mb-5">
                <CheckCircle size={16} className="text-deep-sage shrink-0 mt-0.5" />
                <p className="text-sm text-neutral-700">Cancelling with more than 24 hours notice. <span className="font-semibold">Full refund of ${price}</span> will be processed in 3–5 business days.</p>
              </div>
            )}
            <div className="flex gap-3">
              <button onClick={() => setConfirmed(true)} className="flex-1 rounded-full py-[10px] text-[0.88rem] font-semibold text-white bg-vivid-coral hover:bg-vivid-coral/90 transition-colors">
                {isLate ? "Cancel Anyway" : "Confirm Cancellation"}
              </button>
              <button onClick={onClose} className="flex-1 rounded-full py-[10px] text-[0.88rem] font-semibold border border-neutral-200 text-neutral-600 hover:bg-neutral-50 transition-colors">Keep Session</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── More Actions (self-contained per instance) ────────────────────────────────
function MoreActions({ onReschedule, onCancel }: { onReschedule: () => void; onCancel: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(o => !o)} className="flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-700 transition-colors">
        More <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute left-0 top-full mt-1.5 w-44 rounded-xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.12)] border border-neutral-100 z-10 overflow-hidden">
          <button onClick={() => { setOpen(false); onReschedule(); }} className="w-full text-left px-4 py-3 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors">Reschedule</button>
          <button onClick={() => { setOpen(false); onCancel(); }} className="w-full text-left px-4 py-3 text-sm text-vivid-coral hover:bg-vivid-coral/5 transition-colors">Cancel Session</button>
        </div>
      )}
    </div>
  );
}

// ── Session Card ──────────────────────────────────────────────────────────────
interface SessionCardProps { session: MemberSession; }

export default function SessionCard({ session }: SessionCardProps) {
  const tagColor = disciplineTagColors[session.discipline as Discipline];
  const isCancelled = session.status === "cancelled";
  const [showModal, setShowModal] = useState(false);
  const [reviewed, setReviewed] = useState(session.reviewed);
  const [submittedRating, setSubmittedRating] = useState(session.rating ?? 0);
  const [actionModal, setActionModal] = useState<"reschedule" | "cancel" | null>(null);

  const avatarColor = getAvatarColor(session.teacherInitials);
  const hoursLeft = hoursUntil(session.date, session.time);
  const dateStr = formatSessionDate(session.date, session.time);

  const statusBadge = (
    <>
      {session.status === "confirmed" && <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-deep-sage/10 text-deep-sage">Confirmed</span>}
      {session.status === "completed" && <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-lime-sage/10 text-lime-sage">Completed</span>}
      {session.status === "cancelled" && <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-neutral-300/30 text-neutral-500">Cancelled</span>}
    </>
  );

  const disciplineTag = (
    <span className="inline-block mt-0.5 px-2.5 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: tagColor.bg, color: tagColor.text }}>
      {session.discipline}
    </span>
  );

  const dateLine = (
    <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-700">
      <span className="flex items-center gap-1.5"><Calendar size={13} className="text-neutral-400" />{dateStr}</span>
      <span className="flex items-center gap-1.5"><Clock size={13} className="text-neutral-400" />{session.duration} min</span>
    </div>
  );

  const ratingStars = session.status === "completed" && reviewed && submittedRating > 0 && (
    <div className="flex items-center gap-0.5 mt-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={13} className={i < submittedRating ? "text-bright-amber fill-bright-amber" : "text-neutral-300"} />
      ))}
    </div>
  );

  const cancelledInfo = session.status === "cancelled" && (
    <p className="mt-2 text-sm text-neutral-500">
      Cancelled by {session.cancelledBy}{session.cancellationReason && <span> &mdash; {session.cancellationReason}</span>}
    </p>
  );

  const confirmedActions = session.status === "confirmed" && (
    <div className="flex flex-wrap items-center gap-3 mt-4">
      <Link href="#" className="bg-deep-sage text-white rounded-full py-[10px] px-[26px] text-[0.88rem] font-semibold hover:bg-deep-sage-hover transition-colors">Join Session</Link>
      <MoreActions onReschedule={() => setActionModal("reschedule")} onCancel={() => setActionModal("cancel")} />
    </div>
  );

  const completedActions = session.status === "completed" && (
    <div className="flex flex-wrap items-center gap-3 mt-4">
      <Link href={`/find-a-teacher/${session.teacherSlug}`} className="border border-deep-sage text-deep-sage bg-transparent hover:bg-deep-sage hover:text-white rounded-full py-[10px] px-[26px] text-[0.88rem] font-semibold transition-colors">Rebook</Link>
      {!reviewed && (
        <button type="button" onClick={() => setShowModal(true)} className="text-sm text-deep-sage hover:text-deep-sage-hover transition-colors font-medium">Leave Review</button>
      )}
    </div>
  );

  return (
    <>
      <div className={`bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] ${isCancelled ? "opacity-60" : ""}`}>

        {/* ── Mobile layout ── */}
        <div className="md:hidden p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-11 w-11 rounded-full shrink-0 flex items-center justify-center text-white text-sm font-semibold" style={{ backgroundColor: avatarColor }}>
              {session.teacherInitials}
            </div>
            <div>
              <p className="font-semibold text-neutral-900">{session.teacherName}</p>
              {disciplineTag}
            </div>
          </div>
          {dateLine}
          <div className="mt-3">{statusBadge}</div>
          {cancelledInfo}
          {ratingStars}
          {confirmedActions}
          {completedActions}
        </div>

        {/* ── Desktop layout ── */}
        <div className="hidden md:flex items-stretch">
          <div className="w-40 lg:w-48 shrink-0 flex items-center justify-center text-white text-2xl font-semibold rounded-l-2xl" style={{ backgroundColor: avatarColor }}>
            {session.teacherInitials}
          </div>
          <div className="flex-1 min-w-0 p-6">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <p className="font-semibold text-neutral-900 text-lg">{session.teacherName}</p>
              {disciplineTag}
            </div>
            {dateLine}
            <div className="mt-3">{statusBadge}</div>
            {cancelledInfo}
            {ratingStars}
            {confirmedActions}
            {completedActions}
          </div>
        </div>
      </div>

      {showModal && (
        <LeaveReviewModal
          teacherName={session.teacherName}
          onClose={() => setShowModal(false)}
          onSubmit={(rating) => { setSubmittedRating(rating); setReviewed(true); setShowModal(false); }}
        />
      )}
      {actionModal === "reschedule" && (
        <RescheduleModal teacherName={session.teacherName} teacherSlug={session.teacherSlug} hoursLeft={hoursLeft} onClose={() => setActionModal(null)} />
      )}
      {actionModal === "cancel" && (
        <CancelModal teacherName={session.teacherName} hoursLeft={hoursLeft} price={session.price} onClose={() => setActionModal(null)} />
      )}
    </>
  );
}
