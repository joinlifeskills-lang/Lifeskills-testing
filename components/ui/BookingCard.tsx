"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const TIME_SLOTS = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

const btnBase =
  "inline-flex items-center justify-center whitespace-nowrap rounded-full font-sans font-semibold text-[0.88rem] tracking-[0.01em] px-[26px] py-[10px] transition-all duration-200 ease-out no-underline cursor-pointer w-full text-center";

export default function BookingCard({
  price,
  slug,
}: {
  price: number;
  nextAvailable: string;
  slug: string;
  teacherName: string;
  teacherInitials: string;
  gradient: string;
}) {
  const router = useRouter();
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showNotice, setShowNotice] = useState(false);
  const [showMobileSheet, setShowMobileSheet] = useState(false);

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
  const monthName = new Date(viewYear, viewMonth).toLocaleString("en-US", { month: "long", year: "numeric" });

  const isCurrentMonth = viewMonth === today.getMonth() && viewYear === today.getFullYear();

  function prevMonth() {
    if (isCurrentMonth) return;
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
    else setViewMonth(viewMonth - 1);
    setSelectedDay(null); setSelectedTime(null);
  }

  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
    else setViewMonth(viewMonth + 1);
    setSelectedDay(null); setSelectedTime(null);
  }

  function handleBook() {
    if (!selectedDay || !selectedTime) {
      setShowNotice(true);
      setTimeout(() => setShowNotice(false), 3000);
      return;
    }
    const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}`;
    router.push(`/book/${slug}?date=${dateStr}&time=${encodeURIComponent(selectedTime)}`);
  }

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const calendarAndSlots = (
    <>
      {/* Calendar */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-3">
          <button
            type="button"
            onClick={prevMonth}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${isCurrentMonth ? "text-neutral-300 cursor-not-allowed" : "text-neutral-600 hover:bg-neutral-100"}`}
            disabled={isCurrentMonth}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <span className="font-sans text-[0.88rem] font-semibold text-deep-sage">{monthName}</span>
          <button
            type="button"
            onClick={nextMonth}
            className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-600 hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>

        <div className="grid grid-cols-7 gap-0 mb-1">
          {DAYS.map((d) => (
            <div key={d} className="text-center font-sans text-[0.68rem] font-semibold text-neutral-400 py-1">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-0">
          {cells.map((day, i) => {
            if (day === null) return <div key={`empty-${i}`} />;
            const isPast = isCurrentMonth && day < today.getDate();
            const isSelected = day === selectedDay;
            return (
              <button
                key={day}
                type="button"
                disabled={isPast}
                onClick={() => { setSelectedDay(day); setShowNotice(false); }}
                className={`w-full aspect-square flex items-center justify-center font-sans text-[0.78rem] rounded-full transition-all cursor-pointer ${
                  isPast ? "text-neutral-300 cursor-not-allowed"
                    : isSelected ? "text-white font-semibold"
                    : "text-neutral-700 hover:bg-neutral-100"
                }`}
                style={isSelected ? { background: "linear-gradient(135deg, #E8603A, #F0A500)" } : undefined}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time slots */}
      {selectedDay && (
        <div className="mb-6">
          <div className="font-sans text-[0.78rem] font-semibold text-neutral-500 mb-2">Select a time</div>
          <div className="flex flex-wrap gap-2">
            {TIME_SLOTS.map((t) => {
              const isActive = t === selectedTime;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => { setSelectedTime(t); setShowNotice(false); }}
                  className={`rounded-full px-3.5 py-1.5 font-sans text-[0.78rem] font-semibold transition-all cursor-pointer ${
                    isActive ? "text-white" : "text-neutral-600 border border-neutral-200 hover:border-deep-sage"
                  }`}
                  style={isActive ? { background: "linear-gradient(135deg, #E8603A, #F0A500)", border: "none" } : undefined}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );

  return (
    <>
      {/* ── Desktop booking card ── */}
      <div className="hidden md:block sticky top-24">
        <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-6">
          <div className="font-sans font-bold text-deep-sage text-[1.5rem] mb-6">
            ${price} <span className="font-normal text-[0.9rem] text-neutral-500">/ session</span>
          </div>

          {calendarAndSlots}

          {showNotice && (
            <div className="mb-3 rounded-lg bg-[#FDF7EE] border border-[#F0A500]/30 px-4 py-2.5 font-sans text-[0.8rem] text-[#A07E30]">
              Please select a date and time to continue.
            </div>
          )}

          <div className="flex flex-col gap-3">
            <button type="button" onClick={handleBook} className={`${btnBase} bg-white text-deep-sage border-[1.5px] border-deep-sage hover:bg-neutral-100`}>
              Book a Free Intro Call
            </button>
            <button type="button" onClick={handleBook} className={`${btnBase} bg-deep-sage text-white border-0 hover:bg-deep-sage-hover`}>
              Book a Session
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile sticky bottom bar ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-black/5 px-5 py-3 flex items-center justify-between">
        <div className="font-sans font-bold text-deep-sage text-[1.1rem]">
          ${price} <span className="font-normal text-[0.82rem] text-neutral-500">/ session</span>
        </div>
        <button
          type="button"
          onClick={() => setShowMobileSheet(true)}
          className="inline-flex items-center justify-center rounded-full font-sans font-semibold text-[0.88rem] px-[26px] py-[10px] bg-deep-sage text-white hover:bg-deep-sage-hover transition-all cursor-pointer"
        >
          Book a Session
        </button>
      </div>

      {/* ── Mobile bottom sheet ── */}
      {showMobileSheet && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
            onClick={() => setShowMobileSheet(false)}
          />

          {/* Sheet */}
          <div className="relative bg-white rounded-t-[28px] px-5 pt-4 pb-8 max-h-[90dvh] overflow-y-auto">
            {/* Handle */}
            <div className="w-10 h-1 rounded-full bg-neutral-200 mx-auto mb-5" />

            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="font-sans font-bold text-deep-sage text-[1.25rem]">
                ${price} <span className="font-normal text-[0.85rem] text-neutral-500">/ session</span>
              </div>
              <button
                type="button"
                onClick={() => setShowMobileSheet(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 cursor-pointer"
                aria-label="Close"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M1 1l10 10M11 1L1 11" />
                </svg>
              </button>
            </div>

            <p className="font-sans text-[0.82rem] font-semibold text-neutral-400 uppercase tracking-wide mb-4">
              Pick a date
            </p>

            {calendarAndSlots}

            {showNotice && (
              <div className="mb-4 rounded-lg bg-[#FDF7EE] border border-[#F0A500]/30 px-4 py-2.5 font-sans text-[0.8rem] text-[#A07E30]">
                Please select a date and time to continue.
              </div>
            )}

            <div className="flex flex-col gap-3 mt-2">
              <button type="button" onClick={handleBook} className={`${btnBase} bg-white text-deep-sage border-[1.5px] border-deep-sage hover:bg-neutral-100`}>
                Book a Free Intro Call
              </button>
              <button type="button" onClick={handleBook} className={`${btnBase} bg-deep-sage text-white border-0 hover:bg-deep-sage-hover`}>
                Book a Session
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
