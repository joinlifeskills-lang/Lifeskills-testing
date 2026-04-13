import { Discipline } from "@/lib/teachers";

// ── Teacher Profile ──
export interface TeacherProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  timezone: string;
  avatarInitials: string;
  displayName: string;
  headline: string;
  tagline: string;
  bio: string;
  disciplines: Discipline[];
  price: number;
  yearsExperience: number;
  nextAvailable: string;
  languages: string[];
  introVideoUrl?: string;
  rating: number;
  totalReviews: number;
  memberSince: string;
}

// ── Session ──
export type TeacherSessionStatus = "confirmed" | "pending" | "in_progress" | "completed" | "cancelled";

export interface TeacherSession {
  id: string;
  clientName: string;
  clientInitials: string;
  clientId: string;
  discipline: Discipline;
  date: string;
  time: string;
  endTime: string;
  duration: number;
  status: TeacherSessionStatus;
  price: number;
  hasNotes: boolean;
  notes?: string;
  clientReview?: { rating: number; text: string };
  cancelledBy?: "teacher" | "client";
  cancellationReason?: string;
}

// ── Client ──
export interface TeacherClient {
  id: string;
  name: string;
  initials: string;
  memberSince: string;
  totalSessions: number;
  lastSessionDate: string;
  disciplines: Discipline[];
  notes: ClientNote[];
}

export interface ClientNote {
  id: string;
  date: string;
  text: string;
}

// ── Earnings ──
export type EarningStatus = "paid" | "pending" | "processing";
export type PayoutStatus = "completed" | "processing" | "approved" | "denied";

export interface SessionEarning {
  id: string;
  date: string;
  clientName: string;
  discipline: Discipline;
  duration: number;
  amount: number;
  status: EarningStatus;
}

export interface Payout {
  id: string;
  date: string;
  amount: number;
  method: "bank" | "stripe";
  status: PayoutStatus;
  type: "automatic" | "early";
}

export interface EarningsSummary {
  thisMonth: number;
  lastMonth: number;
  allTime: number;
  nextPayoutDate: string;
  pendingPayout: number;
}

export interface MonthlyEarning {
  month: string;
  amount: number;
}

// ── Messages ──
export interface TeacherConversation {
  id: string;
  clientName: string;
  clientInitials: string;
  clientId: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
  online: boolean;
}

export interface TeacherMessage {
  id: string;
  conversationId: string;
  sender: "teacher" | "client" | "system";
  text: string;
  timestamp: string;
  read: boolean;
}

// ── Client Journey ──
export interface ClientMilestone {
  title: string;
  achieved: boolean;
  date?: string;
}

// ── Reviews ──
export interface TeacherReview {
  id: string;
  clientName: string;
  clientInitials: string;
  rating: number;
  text: string;
  date: string;
  reply?: string;
  discipline: Discipline;
}

// ── Availability ──
export interface TimeSlot {
  start: string;
  end: string;
}

export type WeeklySchedule = Record<string, TimeSlot[]>;

export interface BlockedDate {
  date: string;
  reason: string;
}

// ── Settings ──
export interface TeacherNotificationPrefs {
  newBookingEmail: boolean;
  sessionReminder: boolean;
  newMessage: boolean;
  newReview: boolean;
  marketingEmails: boolean;
}

// ── Navigation ──
export interface TeacherNavItem {
  label: string;
  href: string;
  icon: string;
}

// ── Stats ──
export interface TeacherStats {
  sessionsThisWeek: number;
  earningsThisMonth: number;
  avgRating: number;
  activeClients: number;
}

// ── Pending Action ──
export interface PendingBooking {
  id: string;
  clientName: string;
  clientInitials: string;
  discipline: Discipline;
  requestedDate: string;
  requestedTime: string;
  duration: number;
}
