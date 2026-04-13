import { Discipline } from "@/lib/teachers";

// ── Member Profile ──
export interface MemberProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  timezone: string;
  language: string;
  avatarInitials: string;
  memberSince: string;
  preferredDisciplines: Discipline[];
  preferredSessionLength: number;
}

// ── Session ──
export type MemberSessionStatus = "confirmed" | "completed" | "cancelled";

export interface MemberSession {
  id: string;
  teacherName: string;
  teacherInitials: string;
  teacherSlug: string;
  discipline: Discipline;
  date: string;
  time: string;
  duration: number;
  status: MemberSessionStatus;
  price: number;
  rating?: number;
  reviewed: boolean;
  cancelledBy?: "member" | "teacher";
  cancellationReason?: string;
  notes?: string;
}

// ── Message / Conversation ──
export interface MemberConversation {
  id: string;
  teacherName: string;
  teacherInitials: string;
  teacherSlug: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
  online: boolean;
}

export interface MemberMessage {
  id: string;
  conversationId: string;
  sender: "member" | "teacher" | "system";
  text: string;
  timestamp: string;
  read: boolean;
  type?: "text" | "voice";
  audioDuration?: number; // seconds
}

// ── Journey / Progress ──
export interface DisciplineBreakdown {
  discipline: Discipline;
  sessions: number;
  hours: number;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  teacherName: string;
  discipline: Discipline;
  note: string;
}

export interface ActivityDay {
  date: string;
  sessions: number;
}

// ── Stats ──
export interface MemberStats {
  totalSessions: number;
  currentStreak: number;
  totalHours: number;
  nextSessionIn: string;
}

// ── Activity Feed ──
export interface ActivityItem {
  id: string;
  type: "session" | "review" | "milestone" | "booking";
  message: string;
  date: string;
}

// ── Payment ──
export interface PaymentMethod {
  id: string;
  type: "visa" | "mastercard" | "amex";
  last4: string;
  expiry: string;
  isDefault: boolean;
}

export interface BillingRecord {
  id: string;
  date: string;
  teacherName: string;
  discipline: Discipline;
  amount: number;
  status: "paid" | "refunded" | "pending";
}

// ── Notification Preferences ──
export interface NotificationPrefs {
  emailReminders: boolean;
  smsReminders: boolean;
  marketingEmails: boolean;
}

// ── Navigation ──
export interface MemberNavItem {
  label: string;
  href: string;
  icon: string;
}
