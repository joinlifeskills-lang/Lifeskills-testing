"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { memberSessions } from "@/lib/member/data";
import { disciplineTagColors, type Discipline } from "@/lib/teachers";
import {
  getAvailableSlots,
  hasAvailability,
  getUpcomingDates,
} from "@/lib/member/teacherAvailability";

const avatarColors: Record<string, string> = {
  MR: "#0BA89A",
  CV: "#E8603A",
  LP: "#6BAA3E",
  JO: "#F0A500",
  AS: "#2D4A3E",
  KM: "#0BA89A",
  PN: "#E8603A",
};

function parseSessionDateTime(date: string, time: string): Date {
  const [year, month, day] = date.split("-").map(Number);
  const [timePart, meridiem] = time.split(" ");
  let [hours, minutes] = timePart.split(":").map(Number);
  if (meridiem === "PM" && hours !== 12) hours += 12;
  if (meridiem === "AM" && hours === 12) hours = 0;
  return new Date(year, month - 1, day, hours, minutes);
}

function hoursUntilSession(date: string, time: string): number {
  const sessionTime = parseSessionDateTime(date, time);
  return (sessionTime.getTime() - Date.now()) / (1000 * 60 * 60);
}

function formatDateLabel(dateStr: string): { day: string; num: string; month: string } {
  const d = new Date(dateStr + "T00:00:00");
  return {
    day: d.toLocaleDateString("en-US", { weekday: "short" }),
    num: d.toLocaleDateString("en-US", { day: "numeric" }),
    month: d.toLocaleDateString("en-US", { month: "short" }),
  };
}

function formatFullDate(dateStr: string): string {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

// ── Reschedule Modal ──────────────────────────────────────────────────────────
function RescheduleModal({
  teacherName,
  teacherSlug,
  hoursLeft,
  onClose,
}: {
  teacherName: string;
  teacherSlug: string;
  hoursLeft: number;
  onClose: () => void;
}) {
  const allDates = getUpcomingDates(21);
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const isLate = hoursLeft < 24;

  const WEEK = 6; // dates shown per page (Mon–Sat)
  const visibleDates = allDates.slice(weekOffset * WEEK, weekOffset * WEEK + WEEK);
  const canGoBack = weekOffset > 0;
  const canGoForward = (weekOffset + 1) * WEEK < allDates.length;

  const availableSlots = selectedDate
    ? getAvailableSlots(teacherSlug, selectedDate)
    : [];

  function handleDateSelect(date: string) {
    if (!hasAvailability(teacherSlug, date)) return;
    setSelectedDate(date);
    setSelectedSlot(null);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl p-6 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {submitted ? (
          /* ── Success ── */
          <div className="flex flex-col items-center text-center py-6 gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-deep-sage/10">
              <CheckCircle size={28} className="text-deep-sage" />
            </div>
            <h3 className="font-display text-xl text-neutral-900">
              {isLate ? "Request Sent" : "Session Rescheduled"}
            </h3>
            <p className="text-sm text-neutral-500">
              {isLate
                ? `Your reschedule request for ${formatFullDate(selectedDate!)} at ${selectedSlot} has been sent to ${teacherName}. You'll be notified once they confirm.`
                : `Your session with ${teacherName} has been moved to ${formatFullDate(selectedDate!)} at ${selectedSlot}.`}
            </p>
            <button
              onClick={onClose}
              className="mt-2 rounded-full py-[10px] px-[26px] text-[0.88rem] font-semibold bg-deep-sage text-white hover:bg-deep-sage-hover transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <h3 className="font-display text-xl text-neutral-900 mb-0.5">
              Reschedule Session
            </h3>
            <p className="text-sm text-neutral-500 mb-5">with {teacherName}</p>

            {isLate && (
              <div className="flex gap-2.5 p-3.5 rounded-xl bg-bright-amber/10 border border-bright-amber/20 mb-5">
                <AlertTriangle size={16} className="text-bright-amber shrink-0 mt-0.5" />
                <p className="text-sm text-neutral-700">
                  Less than 24 hours away — rescheduling requires{" "}
                  <span className="font-semibold">teacher approval</span>. Your
                  preferred slot will be sent as a request.
                </p>
              </div>
            )}

            {/* ── Date strip ── */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-neutral-700">
                  Select a date
                </p>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => { setWeekOffset((w) => w - 1); setSelectedDate(null); setSelectedSlot(null); }}
                    disabled={!canGoBack}
                    className="p-1.5 rounded-full hover:bg-neutral-100 disabled:opacity-30 transition-colors"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => { setWeekOffset((w) => w + 1); setSelectedDate(null); setSelectedSlot(null); }}
                    disabled={!canGoForward}
                    className="p-1.5 rounded-full hover:bg-neutral-100 disabled:opacity-30 transition-colors"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-6 gap-1.5">
                {visibleDates.map((date) => {
                  const { day, num, month } = formatDateLabel(date);
                  const available = hasAvailability(teacherSlug, date);
                  const isSelected = selectedDate === date;

                  return (
                    <button
                      key={date}
                      onClick={() => handleDateSelect(date)}
                      disabled={!available}
                      className={`flex flex-col items-center py-2.5 px-1 rounded-xl text-center transition-colors ${
                        isSelected
                          ? "bg-deep-sage text-white"
                          : available
                          ? "bg-neutral-50 hover:bg-deep-sage/10 text-neutral-800 border border-neutral-200"
                          : "bg-neutral-50 text-neutral-300 cursor-not-allowed border border-neutral-100"
                      }`}
                    >
                      <span className="text-[10px] font-medium uppercase tracking-wide opacity-70">
                        {day}
                      </span>
                      <span className="text-base font-bold mt-0.5">{num}</span>
                      <span className="text-[10px] opacity-60">{month}</span>
                      {available && !isSelected && (
                        <span className="mt-1 h-1 w-1 rounded-full bg-deep-sage/50" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── Time slots ── */}
            {selectedDate && (
              <div className="mb-6">
                <p className="text-sm font-medium text-neutral-700 mb-3">
                  Available times on {formatFullDate(selectedDate)}
                </p>
                {availableSlots.length === 0 ? (
                  <p className="text-sm text-neutral-400">No slots available on this day.</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {availableSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                          selectedSlot === slot
                            ? "bg-deep-sage text-white border-deep-sage"
                            : "bg-white text-neutral-700 border-neutral-200 hover:border-deep-sage hover:text-deep-sage"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── Actions ── */}
            <div className="flex gap-3">
              <button
                onClick={() => setSubmitted(true)}
                disabled={!selectedDate || !selectedSlot}
                className="flex-1 rounded-full py-[10px] text-[0.88rem] font-semibold text-white bg-deep-sage hover:bg-deep-sage-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isLate ? "Send Request" : "Confirm Reschedule"}
              </button>
              <button
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

// ── Cancel Modal ──────────────────────────────────────────────────────────────
function CancelModal({
  teacherName,
  hoursLeft,
  price,
  onClose,
}: {
  teacherName: string;
  hoursLeft: number;
  price: number;
  onClose: () => void;
}) {
  const [confirmed, setConfirmed] = useState(false);
  const isLate = hoursLeft <= 24;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl p-6 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {confirmed ? (
          <div className="flex flex-col items-center text-center py-6 gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-deep-sage/10">
              <CheckCircle size={28} className="text-deep-sage" />
            </div>
            <h3 className="font-display text-xl text-neutral-900">
              Session Cancelled
            </h3>
            <p className="text-sm text-neutral-500">
              {isLate
                ? "Your session has been cancelled. As per our policy, no refund will be issued since it was within 24 hours of the session."
                : `Your session with ${teacherName} has been cancelled. A full refund of $${price} will be processed within 3–5 business days.`}
            </p>
            <button
              onClick={onClose}
              className="mt-2 rounded-full py-[10px] px-[26px] text-[0.88rem] font-semibold bg-deep-sage text-white hover:bg-deep-sage-hover transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <h3 className="font-display text-xl text-neutral-900 mb-1">
              Cancel Session
            </h3>
            <p className="text-sm text-neutral-500 mb-5">with {teacherName}</p>

            {isLate ? (
              <div className="flex gap-2.5 p-3.5 rounded-xl bg-vivid-coral/10 border border-vivid-coral/20 mb-5">
                <AlertTriangle size={16} className="text-vivid-coral shrink-0 mt-0.5" />
                <p className="text-sm text-neutral-700">
                  This session is within <span className="font-semibold">24 hours</span>.
                  You can still cancel, but{" "}
                  <span className="font-semibold">no refund will be issued</span> per
                  our cancellation policy.
                </p>
              </div>
            ) : (
              <div className="flex gap-2.5 p-3.5 rounded-xl bg-deep-sage/10 border border-deep-sage/20 mb-5">
                <CheckCircle size={16} className="text-deep-sage shrink-0 mt-0.5" />
                <p className="text-sm text-neutral-700">
                  You're cancelling with more than 24 hours notice. A{" "}
                  <span className="font-semibold">full refund of ${price}</span> will
                  be processed within 3–5 business days.
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setConfirmed(true)}
                className="flex-1 rounded-full py-[10px] text-[0.88rem] font-semibold text-white bg-vivid-coral hover:bg-vivid-coral/90 transition-colors"
              >
                {isLate ? "Cancel Anyway" : "Confirm Cancellation"}
              </button>
              <button
                onClick={onClose}
                className="flex-1 rounded-full py-[10px] text-[0.88rem] font-semibold border border-neutral-200 text-neutral-600 hover:bg-neutral-50 transition-colors"
              >
                Keep Session
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── Session Actions (self-contained per layout instance) ─────────────────────
function SessionActions({
  onReschedule,
  onCancel,
}: {
  onReschedule: () => void;
  onCancel: () => void;
}) {
  const [moreOpen, setMoreOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center gap-3 mt-4">
      <Link
        href="#"
        className="bg-deep-sage text-white rounded-full py-[10px] px-[26px] text-[0.88rem] font-semibold hover:bg-deep-sage-hover transition-colors"
      >
        Join Session
      </Link>
      <div className="relative" ref={ref}>
        <button
          onClick={() => setMoreOpen((o) => !o)}
          className="flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-700 transition-colors"
        >
          More{" "}
          <ChevronDown
            size={14}
            className={`transition-transform ${moreOpen ? "rotate-180" : ""}`}
          />
        </button>
        {moreOpen && (
          <div className="absolute left-0 top-full mt-1.5 w-44 rounded-xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.12)] border border-neutral-100 z-10 overflow-hidden">
            <button
              onClick={() => { setMoreOpen(false); onReschedule(); }}
              className="w-full text-left px-4 py-3 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
            >
              Reschedule
            </button>
            <button
              onClick={() => { setMoreOpen(false); onCancel(); }}
              className="w-full text-left px-4 py-3 text-sm text-vivid-coral hover:bg-vivid-coral/5 transition-colors"
            >
              Cancel Session
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function UpcomingSessionCard() {
  const upcoming = memberSessions.find((s) => s.status === "confirmed");
  const [modal, setModal] = useState<"reschedule" | "cancel" | null>(null);

  if (!upcoming) {
    return (
      <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-6 text-center">
        <p className="text-neutral-500 text-sm">
          No upcoming sessions. Find a teacher to get started.
        </p>
        <Link
          href="/customer-dashboard/explore"
          className="inline-block mt-4 bg-deep-sage text-white rounded-full py-[10px] px-[26px] text-[0.88rem] font-semibold hover:bg-deep-sage-hover transition-colors"
        >
          Explore Teachers
        </Link>
      </div>
    );
  }

  const tagColor = disciplineTagColors[upcoming.discipline as Discipline];
  const formattedDate = new Date(upcoming.date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const hoursLeft = hoursUntilSession(upcoming.date, upcoming.time);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)]">

        {/* ── Mobile layout ─────────────────────────────────────────── */}
        <div className="md:hidden p-5">
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">
            Next Session
          </p>
          <div className="flex items-center gap-3 mb-3">
            <div
              className="h-11 w-11 rounded-full shrink-0 flex items-center justify-center text-white text-sm font-semibold"
              style={{ backgroundColor: avatarColors[upcoming.teacherInitials] || "#2D4A3E" }}
            >
              {upcoming.teacherInitials}
            </div>
            <div>
              <p className="font-semibold text-neutral-900">{upcoming.teacherName}</p>
              <span
                className="inline-block mt-0.5 px-2.5 py-0.5 rounded-full text-xs font-medium"
                style={{ backgroundColor: tagColor.bg, color: tagColor.text }}
              >
                {upcoming.discipline}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-700">
            <span className="flex items-center gap-1.5">
              <Calendar size={13} className="text-neutral-400" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} className="text-neutral-400" />
              {upcoming.time} &middot; {upcoming.duration} min
            </span>
          </div>
          <SessionActions
            onReschedule={() => setModal("reschedule")}
            onCancel={() => setModal("cancel")}
          />
        </div>

        {/* ── Desktop layout ────────────────────────────────────────── */}
        <div className="hidden md:flex items-stretch">
          <div
            className="w-56 shrink-0 flex items-center justify-center text-white text-4xl font-semibold rounded-l-2xl"
            style={{ backgroundColor: avatarColors[upcoming.teacherInitials] || "#2D4A3E" }}
          >
            {upcoming.teacherInitials}
          </div>
          <div className="flex-1 min-w-0 p-6">
            <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">
              Next Session
            </h3>
            <p className="font-semibold text-neutral-900 text-lg">
              {upcoming.teacherName}
            </p>
            <span
              className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium"
              style={{ backgroundColor: tagColor.bg, color: tagColor.text }}
            >
              {upcoming.discipline}
            </span>
            <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-neutral-700">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} className="text-neutral-400" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} className="text-neutral-400" />
                {upcoming.time} &middot; {upcoming.duration} min
              </span>
            </div>
            <SessionActions
              onReschedule={() => setModal("reschedule")}
              onCancel={() => setModal("cancel")}
            />
          </div>
        </div>
      </div>

      {modal === "reschedule" && (
        <RescheduleModal
          teacherName={upcoming.teacherName}
          teacherSlug={upcoming.teacherSlug}
          hoursLeft={hoursLeft}
          onClose={() => setModal(null)}
        />
      )}
      {modal === "cancel" && (
        <CancelModal
          teacherName={upcoming.teacherName}
          hoursLeft={hoursLeft}
          price={upcoming.price}
          onClose={() => setModal(null)}
        />
      )}
    </>
  );
}
