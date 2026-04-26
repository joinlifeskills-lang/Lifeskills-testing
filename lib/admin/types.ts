import { Discipline, Badge } from "@/lib/teachers";

// ── Teacher (admin-extended) ──
export type ApplicationStatus = "pending" | "active" | "suspended" | "rejected";

export interface AdminTeacher {
  id: string;
  name: string;
  initials: string;
  slug: string;
  email: string;
  phone: string;
  socials?: { instagram?: string; facebook?: string; website?: string };
  tagline: string;
  disciplines: Discipline[];
  bgColor: string;
  price: number;
  nextAvailable: string;
  yearsExperience: number;
  languages: string[];
  badge: Badge;
  rating: number;
  sessions: number;
  status: ApplicationStatus;
  applicationDate: string;
  approvedDate?: string;
  suspendedDate?: string;
  rejectedDate?: string;
  rejectionReason?: string;
  documents: { name: string; url: string; verified: boolean }[];
  interviewDate?: string;
  interviewNotes?: string;
  revenue: number;
  completionRate: number;
}

// ── Member ──
export type MemberStatus = "active" | "inactive" | "banned";

export interface Member {
  id: string;
  name: string;
  initials: string;
  email: string;
  phone: string;
  joinDate: string;
  status: MemberStatus;
  totalSessions: number;
  totalSpent: number;
  lastActive: string;
  preferredDisciplines: Discipline[];
  favoriteTeachers: string[];
  notes?: string;
}

// ── Session ──
export type SessionStatus = "live" | "upcoming" | "completed" | "cancelled";

export interface Session {
  id: string;
  teacherName: string;
  teacherInitials: string;
  memberName: string;
  memberInitials: string;
  discipline: Discipline;
  date: string;
  time: string;
  duration: number; // minutes
  status: SessionStatus;
  price: number;
  rating?: number;
  cancellationReason?: string;
  cancelledBy?: "teacher" | "member";
}

// ── Review ──
export type ReviewStatus = "published" | "flagged" | "hidden" | "disputed";

export interface Review {
  id: string;
  memberName: string;
  memberInitials: string;
  teacherName: string;
  teacherInitials: string;
  discipline: Discipline;
  rating: number;
  comment: string;
  date: string;
  status: ReviewStatus;
  flagReason?: string;
  disputeReason?: string;
  helpful: number;
}

// ── Message ──
export interface Conversation {
  id: string;
  participantName: string;
  participantInitials: string;
  participantRole: "teacher" | "member";
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
  online: boolean;
}

export interface Message {
  id: string;
  conversationId: string;
  sender: "admin" | "participant";
  text: string;
  timestamp: string;
  read: boolean;
}

// ── Finance ──
export type TransactionType = "session_payment" | "payout" | "refund" | "platform_fee";
export type PayoutStatus = "completed" | "pending" | "processing" | "failed";
export type RefundStatus = "approved" | "pending" | "rejected";

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  date: string;
  description: string;
  teacherName?: string;
  memberName?: string;
  status: PayoutStatus | RefundStatus;
}

export type PayoutMethodType = "stripe" | "paypal" | "bank";

export interface PayoutRequest {
  id: string;
  teacherName: string;
  teacherInitials: string;
  teacherId: string;
  amount: number;
  requestDate: string;
  period: string;
  sessionsCount: number;
  status: PayoutStatus;
  type: "automatic" | "early";
  payoutMethod: PayoutMethodType;
  reason?: string;
}

export interface TeacherBalance {
  teacherId: string;
  teacherName: string;
  teacherInitials: string;
  completedSessions: number;
  grossAmount: number;
  platformFee: number;
  netAmount: number;
  period: string;
  payoutMethod: string;
}

export interface Refund {
  id: string;
  memberName: string;
  memberInitials: string;
  teacherName: string;
  sessionDate: string;
  amount: number;
  reason: string;
  requestDate: string;
  status: RefundStatus;
}

// ── Analytics ──
export interface TimeSeriesPoint {
  date: string;
  value: number;
  label?: string;
}

export interface FunnelStep {
  label: string;
  value: number;
  percentage: number;
}

export interface DisciplineMetric {
  discipline: Discipline;
  sessions: number;
  revenue: number;
  growth: number;
}

// ── Dashboard ──
export interface DashboardMetric {
  label: string;
  value: string;
  change: number; // percentage
  trend: "up" | "down";
  icon: string;
}

export interface PendingAction {
  id: string;
  type: "teacher_application" | "payout_request" | "review_flag" | "refund_request";
  title: string;
  description: string;
  time: string;
  priority: "high" | "medium" | "low";
}

export interface ActivityItem {
  id: string;
  type: "session" | "signup" | "review" | "payout" | "teacher";
  message: string;
  time: string;
}

// ── Settings ──
export interface PlatformSettings {
  platformName: string;
  platformFee: number; // percentage
  minSessionPrice: number;
  maxSessionPrice: number;
  sessionDurations: number[];
  supportEmail: string;
  autoApproveReviews: boolean;
  requireTeacherInterview: boolean;
  maintenanceMode: boolean;
}

// ── Navigation ──
export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: number;
  group: string;
}
