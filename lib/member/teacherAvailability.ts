import { teacherSessions } from "@/lib/teacher/data";

// Working hours offered by all teachers (9 AM – 5 PM, hourly)
const WORK_SLOTS = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

/**
 * Returns available time slots for a teacher on a given date (YYYY-MM-DD).
 * For Maya Reyes we derive availability from real session data.
 * For other teachers we generate a plausible sparse schedule.
 */
export function getAvailableSlots(
  teacherSlug: string,
  dateStr: string
): string[] {
  if (teacherSlug === "maya-reyes") {
    // Slots already booked by other clients on this date
    const booked = teacherSessions
      .filter(
        (s) =>
          s.date === dateStr &&
          (s.status === "confirmed" || s.status === "pending")
      )
      .map((s) => s.time);

    return WORK_SLOTS.filter((slot) => !booked.includes(slot));
  }

  // For other teachers: deterministically generate a sparse schedule
  // using the date string as a seed so it's stable across renders
  const seed = dateStr
    .replace(/-/g, "")
    .split("")
    .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);

  return WORK_SLOTS.filter((_, i) => (seed + i * 3) % 5 !== 0);
}

/**
 * Returns true if a teacher has any availability on the given date.
 */
export function hasAvailability(teacherSlug: string, dateStr: string): boolean {
  return getAvailableSlots(teacherSlug, dateStr).length > 0;
}

/**
 * Generates the next `days` calendar dates from tomorrow as YYYY-MM-DD strings.
 * Excludes Sundays (teachers have Sundays off).
 */
export function getUpcomingDates(days = 21): string[] {
  const dates: string[] = [];
  const cursor = new Date();
  cursor.setDate(cursor.getDate() + 1); // start tomorrow
  cursor.setHours(0, 0, 0, 0);

  while (dates.length < days) {
    if (cursor.getDay() !== 0) {
      // skip Sundays
      dates.push(cursor.toISOString().split("T")[0]);
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return dates;
}
