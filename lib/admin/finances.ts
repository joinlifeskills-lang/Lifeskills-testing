import type { Transaction, PayoutRequest, Refund } from "@/lib/admin/types";

export const financialOverview = {
  totalRevenue: 311670,
  platformFees: 46750,
  teacherPayouts: 234920,
  pendingPayouts: 18640,
  refunds: 11360,
};

export const transactions: Transaction[] = [
  { id: "txn-001", type: "session_payment", amount: 85, date: "2026-04-09", description: "Yoga session - 60 min", teacherName: "Anika Patel", memberName: "James Wilson", status: "completed" },
  { id: "txn-002", type: "platform_fee", amount: 12.75, date: "2026-04-09", description: "Platform fee (15%)", teacherName: "Anika Patel", status: "completed" },
  { id: "txn-003", type: "session_payment", amount: 65, date: "2026-04-08", description: "Meditation session - 45 min", teacherName: "Marcus Chen", memberName: "Sarah Davis", status: "completed" },
  { id: "txn-004", type: "payout", amount: 1240, date: "2026-04-08", description: "Weekly payout - Mar 31 to Apr 6", teacherName: "Elena Rodriguez", status: "completed" },
  { id: "txn-005", type: "refund", amount: 75, date: "2026-04-08", description: "Cancelled session refund", teacherName: "Tom Brennan", memberName: "Lisa Park", status: "approved" },
  { id: "txn-006", type: "session_payment", amount: 95, date: "2026-04-07", description: "Breathwork session - 60 min", teacherName: "Nora Okafor", memberName: "David Kim", status: "completed" },
  { id: "txn-007", type: "platform_fee", amount: 14.25, date: "2026-04-07", description: "Platform fee (15%)", teacherName: "Nora Okafor", status: "completed" },
  { id: "txn-008", type: "session_payment", amount: 110, date: "2026-04-07", description: "Somatic - 90 min", teacherName: "River Kai", memberName: "Emma Thompson", status: "completed" },
  { id: "txn-009", type: "payout", amount: 980, date: "2026-04-06", description: "Weekly payout - Mar 31 to Apr 6", teacherName: "Marcus Chen", status: "processing" },
  { id: "txn-010", type: "refund", amount: 65, date: "2026-04-06", description: "Member dissatisfied - partial refund", teacherName: "Tom Brennan", memberName: "Alex Rivera", status: "pending" },
  { id: "txn-011", type: "session_payment", amount: 70, date: "2026-04-05", description: "Somatic session - 45 min", teacherName: "Maya Stevens", memberName: "Carlos Ruiz", status: "completed" },
  { id: "txn-012", type: "platform_fee", amount: 10.50, date: "2026-04-05", description: "Platform fee (15%)", teacherName: "Maya Stevens", status: "completed" },
  { id: "txn-013", type: "session_payment", amount: 85, date: "2026-04-04", description: "Yoga session - 60 min", teacherName: "Anika Patel", memberName: "Michelle Lee", status: "completed" },
  { id: "txn-014", type: "payout", amount: 1560, date: "2026-04-04", description: "Weekly payout - Mar 24 to Mar 30", teacherName: "Anika Patel", status: "completed" },
  { id: "txn-015", type: "refund", amount: 95, date: "2026-04-03", description: "Teacher no-show refund", teacherName: "River Kai", memberName: "Priya Sharma", status: "approved" },
  { id: "txn-016", type: "session_payment", amount: 75, date: "2026-04-03", description: "Meditation session - 60 min", teacherName: "Marcus Chen", memberName: "Jordan Blake", status: "completed" },
];

export const payoutRequests: PayoutRequest[] = [
  { id: "po-001", teacherName: "Anika Patel", teacherInitials: "AP", amount: 1840, requestDate: "2026-04-08", period: "Mar 31 - Apr 6", sessionsCount: 22, status: "pending" },
  { id: "po-002", teacherName: "Marcus Chen", teacherInitials: "MC", amount: 1120, requestDate: "2026-04-08", period: "Mar 31 - Apr 6", sessionsCount: 16, status: "pending" },
  { id: "po-003", teacherName: "Elena Rodriguez", teacherInitials: "ER", amount: 1240, requestDate: "2026-04-07", period: "Mar 31 - Apr 6", sessionsCount: 18, status: "completed" },
  { id: "po-004", teacherName: "Nora Okafor", teacherInitials: "NO", amount: 960, requestDate: "2026-04-07", period: "Mar 31 - Apr 6", sessionsCount: 12, status: "pending" },
  { id: "po-005", teacherName: "River Kai", teacherInitials: "RK", amount: 2150, requestDate: "2026-04-06", period: "Mar 31 - Apr 6", sessionsCount: 24, status: "processing" },
  { id: "po-006", teacherName: "Maya Stevens", teacherInitials: "MS", amount: 780, requestDate: "2026-04-06", period: "Mar 31 - Apr 6", sessionsCount: 10, status: "pending" },
  { id: "po-007", teacherName: "Tom Brennan", teacherInitials: "TB", amount: 1560, requestDate: "2026-04-05", period: "Mar 24 - Mar 30", sessionsCount: 20, status: "completed" },
  { id: "po-008", teacherName: "Liam Nakamura", teacherInitials: "LN", amount: 640, requestDate: "2026-04-05", period: "Mar 31 - Apr 6", sessionsCount: 8, status: "pending" },
  { id: "po-009", teacherName: "Sofia Andersson", teacherInitials: "SA", amount: 1380, requestDate: "2026-04-04", period: "Mar 24 - Mar 30", sessionsCount: 17, status: "completed" },
  { id: "po-010", teacherName: "Anika Patel", teacherInitials: "AP", amount: 1560, requestDate: "2026-04-03", period: "Mar 24 - Mar 30", sessionsCount: 19, status: "completed" },
];

export const refunds: Refund[] = [
  { id: "ref-001", memberName: "Lisa Park", memberInitials: "LP", teacherName: "Tom Brennan", sessionDate: "2026-04-07", amount: 75, reason: "Session cancelled by teacher", requestDate: "2026-04-08", status: "approved" },
  { id: "ref-002", memberName: "Alex Rivera", memberInitials: "AR", teacherName: "Tom Brennan", sessionDate: "2026-04-05", amount: 65, reason: "Member dissatisfied with session quality", requestDate: "2026-04-06", status: "pending" },
  { id: "ref-003", memberName: "Priya Sharma", memberInitials: "PS", teacherName: "River Kai", sessionDate: "2026-04-02", amount: 95, reason: "Teacher no-show", requestDate: "2026-04-03", status: "approved" },
  { id: "ref-004", memberName: "Jordan Blake", memberInitials: "JB", teacherName: "Marcus Chen", sessionDate: "2026-04-04", amount: 75, reason: "Technical issues during session", requestDate: "2026-04-05", status: "pending" },
  { id: "ref-005", memberName: "Emma Thompson", memberInitials: "ET", teacherName: "Maya Stevens", sessionDate: "2026-04-01", amount: 70, reason: "Double charged for session", requestDate: "2026-04-02", status: "approved" },
  { id: "ref-006", memberName: "Carlos Ruiz", memberInitials: "CR", teacherName: "Elena Rodriguez", sessionDate: "2026-03-30", amount: 85, reason: "Session significantly shorter than booked", requestDate: "2026-04-01", status: "rejected" },
  { id: "ref-007", memberName: "Michelle Lee", memberInitials: "ML", teacherName: "Nora Okafor", sessionDate: "2026-04-06", amount: 90, reason: "Scheduling error - wrong time slot", requestDate: "2026-04-07", status: "pending" },
];
