import { Session } from "./types";

export const sessions: Session[] = [
  // ── Live (3) ──
  { id: "s-1", teacherName: "Maya Reyes", teacherInitials: "MR", memberName: "Jordan Lee", memberInitials: "JL", discipline: "Breathwork", date: "2026-04-09", time: "10:00 AM", duration: 60, status: "live", price: 85 },
  { id: "s-2", teacherName: "Carlos Vega", teacherInitials: "CV", memberName: "Sarah Chen", memberInitials: "SC", discipline: "Yoga", date: "2026-04-09", time: "10:30 AM", duration: 90, status: "live", price: 120 },
  { id: "s-3", teacherName: "Lena Park", teacherInitials: "LP", memberName: "Nina Patel", memberInitials: "NP", discipline: "Meditation", date: "2026-04-09", time: "11:00 AM", duration: 45, status: "live", price: 70 },

  // ── Upcoming (6) ──
  { id: "s-4", teacherName: "David Cohen", teacherInitials: "DC", memberName: "Alex Kim", memberInitials: "AK", discipline: "Meditation", date: "2026-04-10", time: "9:00 AM", duration: 60, status: "upcoming", price: 90 },
  { id: "s-5", teacherName: "Anika Sharma", teacherInitials: "AS", memberName: "Yuki Tanaka", memberInitials: "YT", discipline: "Somatic", date: "2026-04-10", time: "11:00 AM", duration: 75, status: "upcoming", price: 110 },
  { id: "s-6", teacherName: "James Okafor", teacherInitials: "JO", memberName: "Emma Wilson", memberInitials: "EW", discipline: "Breathwork", date: "2026-04-11", time: "2:00 PM", duration: 60, status: "upcoming", price: 85 },
  { id: "s-7", teacherName: "Maya Reyes", teacherInitials: "MR", memberName: "Tomas Rivera", memberInitials: "TR", discipline: "Breathwork", date: "2026-04-11", time: "4:00 PM", duration: 45, status: "upcoming", price: 65 },
  { id: "s-8", teacherName: "Carlos Vega", teacherInitials: "CV", memberName: "Hassan Ali", memberInitials: "HA", discipline: "Yoga", date: "2026-04-12", time: "8:00 AM", duration: 90, status: "upcoming", price: 120 },
  { id: "s-9", teacherName: "Lena Park", teacherInitials: "LP", memberName: "Isabelle Dupont", memberInitials: "ID", discipline: "Meditation", date: "2026-04-12", time: "10:00 AM", duration: 60, status: "upcoming", price: 85 },

  // ── Completed (10) ──
  { id: "s-10", teacherName: "David Cohen", teacherInitials: "DC", memberName: "Jordan Lee", memberInitials: "JL", discipline: "Meditation", date: "2026-04-08", time: "9:00 AM", duration: 60, status: "completed", price: 90, rating: 5 },
  { id: "s-11", teacherName: "Maya Reyes", teacherInitials: "MR", memberName: "Nina Patel", memberInitials: "NP", discipline: "Breathwork", date: "2026-04-07", time: "10:00 AM", duration: 60, status: "completed", price: 85, rating: 4 },
  { id: "s-12", teacherName: "Anika Sharma", teacherInitials: "AS", memberName: "Sofia Rodriguez", memberInitials: "SR", discipline: "Somatic", date: "2026-04-07", time: "2:00 PM", duration: 75, status: "completed", price: 110, rating: 5 },
  { id: "s-13", teacherName: "Carlos Vega", teacherInitials: "CV", memberName: "Amara Osei", memberInitials: "AO", discipline: "Yoga", date: "2026-04-06", time: "8:00 AM", duration: 90, status: "completed", price: 120, rating: 4 },
  { id: "s-14", teacherName: "James Okafor", teacherInitials: "JO", memberName: "Chloe Martin", memberInitials: "CM", discipline: "Breathwork", date: "2026-04-05", time: "3:00 PM", duration: 60, status: "completed", price: 85, rating: 3 },
  { id: "s-15", teacherName: "Lena Park", teacherInitials: "LP", memberName: "Marcus Johnson", memberInitials: "MJ", discipline: "Meditation", date: "2026-04-04", time: "11:00 AM", duration: 45, status: "completed", price: 70, rating: 5 },
  { id: "s-16", teacherName: "David Cohen", teacherInitials: "DC", memberName: "Ethan Brooks", memberInitials: "EB", discipline: "Somatic", date: "2026-04-03", time: "1:00 PM", duration: 60, status: "completed", price: 95, rating: 4 },
  { id: "s-17", teacherName: "Anika Sharma", teacherInitials: "AS", memberName: "Alex Kim", memberInitials: "AK", discipline: "Somatic", date: "2026-03-31", time: "10:00 AM", duration: 75, status: "completed", price: 110, rating: 5 },
  { id: "s-18", teacherName: "Maya Reyes", teacherInitials: "MR", memberName: "Kai Nakamura", memberInitials: "KN", discipline: "Breathwork", date: "2026-03-28", time: "9:00 AM", duration: 60, status: "completed", price: 85, rating: 4 },
  { id: "s-19", teacherName: "Carlos Vega", teacherInitials: "CV", memberName: "David Park", memberInitials: "DP", discipline: "Yoga", date: "2026-03-25", time: "7:00 AM", duration: 90, status: "completed", price: 120, rating: 5 },

  // ── Cancelled (4) ──
  { id: "s-20", teacherName: "James Okafor", teacherInitials: "JO", memberName: "Lucas Meyer", memberInitials: "LM", discipline: "Breathwork", date: "2026-04-08", time: "4:00 PM", duration: 60, status: "cancelled", price: 85, cancellationReason: "Teacher had a scheduling conflict", cancelledBy: "teacher" },
  { id: "s-21", teacherName: "Lena Park", teacherInitials: "LP", memberName: "Olivia Grant", memberInitials: "OG", discipline: "Meditation", date: "2026-04-06", time: "10:00 AM", duration: 45, status: "cancelled", price: 70, cancellationReason: "Member felt unwell", cancelledBy: "member" },
  { id: "s-22", teacherName: "David Cohen", teacherInitials: "DC", memberName: "Ryan Hughes", memberInitials: "RH", discipline: "Somatic", date: "2026-04-02", time: "2:00 PM", duration: 60, status: "cancelled", price: 95, cancellationReason: "Member no-show after 15 minutes", cancelledBy: "teacher" },
  { id: "s-23", teacherName: "Anika Sharma", teacherInitials: "AS", memberName: "Tomas Rivera", memberInitials: "TR", discipline: "Somatic", date: "2026-03-30", time: "11:00 AM", duration: 75, status: "cancelled", price: 110, cancellationReason: "Personal emergency", cancelledBy: "member" },
];
