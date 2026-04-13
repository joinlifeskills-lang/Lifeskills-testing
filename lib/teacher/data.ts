import {
  TeacherProfile,
  TeacherSession,
  TeacherClient,
  TeacherConversation,
  TeacherMessage,
  SessionEarning,
  Payout,
  EarningsSummary,
  MonthlyEarning,
  TeacherReview,
  TeacherStats,
  PendingBooking,
  WeeklySchedule,
  BlockedDate,
  TeacherNotificationPrefs,
} from "./types";

// ── Profile ──
export const teacherProfile: TeacherProfile = {
  id: "t-1",
  firstName: "Maya",
  lastName: "Reyes",
  email: "maya.reyes@lifeskills.com",
  phone: "+1 555-0201",
  timezone: "America/Los_Angeles",
  avatarInitials: "MR",
  displayName: "Maya Reyes",
  headline: "Breathwork & Meditation Guide — Find calm in minutes",
  tagline: "I help you find calm in minutes through breathwork and nervous-system science.",
  bio: "Former anxiety sufferer turned breathwork guide. I blend pranayama with nervous-system science to help clients find calm in minutes. 8 years of experience working with individuals dealing with stress, anxiety, and burnout.",
  disciplines: ["Breathwork", "Meditation"],
  price: 65,
  yearsExperience: 8,
  nextAvailable: "Mon, Apr 14",
  languages: ["English", "Spanish"],
  rating: 4.9,
  totalReviews: 47,
  memberSince: "2024-06-15",
};

// ── Stats ──
export const teacherStats: TeacherStats = {
  sessionsThisWeek: 8,
  earningsThisMonth: 3420,
  avgRating: 4.9,
  activeClients: 14,
};

// ── Sessions ──
export const teacherSessions: TeacherSession[] = [
  // Today
  { id: "ts-1", clientName: "Sarah Chen", clientInitials: "SC", clientId: "cl-1", discipline: "Breathwork", date: "2026-04-09", time: "9:00 AM", endTime: "10:00 AM", duration: 60, status: "completed", price: 65, hasNotes: true, notes: "Focused on 4-7-8 breathing. Client reported improved sleep." },
  { id: "ts-2", clientName: "Jordan Lee", clientInitials: "JL", clientId: "cl-2", discipline: "Meditation", date: "2026-04-09", time: "11:00 AM", endTime: "12:00 PM", duration: 60, status: "confirmed", price: 65, hasNotes: false },
  { id: "ts-3", clientName: "Nina Patel", clientInitials: "NP", clientId: "cl-3", discipline: "Breathwork", date: "2026-04-09", time: "2:00 PM", endTime: "3:00 PM", duration: 60, status: "confirmed", price: 65, hasNotes: false },
  // Upcoming
  { id: "ts-4", clientName: "Tomas Rivera", clientInitials: "TR", clientId: "cl-4", discipline: "Breathwork", date: "2026-04-10", time: "10:00 AM", endTime: "11:00 AM", duration: 60, status: "confirmed", price: 65, hasNotes: false },
  { id: "ts-5", clientName: "Sarah Chen", clientInitials: "SC", clientId: "cl-1", discipline: "Breathwork", date: "2026-04-11", time: "10:00 AM", endTime: "11:00 AM", duration: 60, status: "confirmed", price: 65, hasNotes: false },
  { id: "ts-6", clientName: "Chloe Martin", clientInitials: "CM", clientId: "cl-5", discipline: "Meditation", date: "2026-04-11", time: "1:00 PM", endTime: "2:00 PM", duration: 60, status: "confirmed", price: 65, hasNotes: false },
  { id: "ts-7", clientName: "Ethan Brooks", clientInitials: "EB", clientId: "cl-6", discipline: "Breathwork", date: "2026-04-14", time: "9:00 AM", endTime: "10:00 AM", duration: 60, status: "pending", price: 65, hasNotes: false },
  { id: "ts-8", clientName: "Isabelle Dupont", clientInitials: "ID", clientId: "cl-7", discipline: "Meditation", date: "2026-04-14", time: "3:00 PM", endTime: "4:00 PM", duration: 60, status: "confirmed", price: 65, hasNotes: false },
  { id: "ts-9", clientName: "Kai Nakamura", clientInitials: "KN", clientId: "cl-8", discipline: "Breathwork", date: "2026-04-16", time: "11:00 AM", endTime: "12:00 PM", duration: 60, status: "confirmed", price: 65, hasNotes: false },
  { id: "ts-10", clientName: "Amara Osei", clientInitials: "AO", clientId: "cl-9", discipline: "Breathwork", date: "2026-04-17", time: "10:00 AM", endTime: "11:00 AM", duration: 60, status: "pending", price: 65, hasNotes: false },
  // Past
  { id: "ts-11", clientName: "Sarah Chen", clientInitials: "SC", clientId: "cl-1", discipline: "Breathwork", date: "2026-04-07", time: "10:00 AM", endTime: "11:00 AM", duration: 60, status: "completed", price: 65, hasNotes: true, notes: "Box breathing and 4-7-8 pattern. Great progress.", clientReview: { rating: 5, text: "Maya is incredible. I feel so much calmer after each session." } },
  { id: "ts-12", clientName: "Jordan Lee", clientInitials: "JL", clientId: "cl-2", discipline: "Breathwork", date: "2026-04-04", time: "11:00 AM", endTime: "12:00 PM", duration: 60, status: "completed", price: 65, hasNotes: true, notes: "Introduced alternate nostril breathing. Client was very receptive." },
  { id: "ts-13", clientName: "Nina Patel", clientInitials: "NP", clientId: "cl-3", discipline: "Meditation", date: "2026-04-02", time: "2:00 PM", endTime: "3:00 PM", duration: 60, status: "completed", price: 65, hasNotes: true, notes: "Guided visualization. Nina found it very calming.", clientReview: { rating: 5, text: "Such a soothing session. Maya really knows how to guide you." } },
  { id: "ts-14", clientName: "Chloe Martin", clientInitials: "CM", clientId: "cl-5", discipline: "Breathwork", date: "2026-03-31", time: "1:00 PM", endTime: "2:00 PM", duration: 60, status: "completed", price: 65, hasNotes: false },
  { id: "ts-15", clientName: "Tomas Rivera", clientInitials: "TR", clientId: "cl-4", discipline: "Breathwork", date: "2026-03-28", time: "10:00 AM", endTime: "11:00 AM", duration: 60, status: "completed", price: 65, hasNotes: true, notes: "Breathing for anxiety management. Good session." },
  { id: "ts-16", clientName: "Sarah Chen", clientInitials: "SC", clientId: "cl-1", discipline: "Meditation", date: "2026-03-24", time: "10:00 AM", endTime: "11:00 AM", duration: 60, status: "completed", price: 65, hasNotes: true, notes: "Tried guided visualization. She prefers breathwork but open to it.", clientReview: { rating: 4, text: "Interesting session trying meditation. Preferred our breathwork sessions but learned a lot." } },
  { id: "ts-17", clientName: "Ethan Brooks", clientInitials: "EB", clientId: "cl-6", discipline: "Breathwork", date: "2026-03-21", time: "9:00 AM", endTime: "10:00 AM", duration: 60, status: "completed", price: 65, hasNotes: true, notes: "First session. Introduced basic breathwork fundamentals.", clientReview: { rating: 5, text: "Amazing first session! Maya made me feel completely at ease." } },
  { id: "ts-18", clientName: "Isabelle Dupont", clientInitials: "ID", clientId: "cl-7", discipline: "Breathwork", date: "2026-03-18", time: "3:00 PM", endTime: "4:00 PM", duration: 60, status: "completed", price: 65, hasNotes: true, notes: "Wim Hof inspired breathing. Isabelle loved the intensity." },
  { id: "ts-19", clientName: "Jordan Lee", clientInitials: "JL", clientId: "cl-2", discipline: "Meditation", date: "2026-03-14", time: "11:00 AM", endTime: "12:00 PM", duration: 60, status: "completed", price: 65, hasNotes: true, notes: "Body scan meditation. Jordan was very focused." },
  { id: "ts-20", clientName: "Nina Patel", clientInitials: "NP", clientId: "cl-3", discipline: "Breathwork", date: "2026-03-10", time: "2:00 PM", endTime: "3:00 PM", duration: 60, status: "completed", price: 65, hasNotes: true, notes: "Pranayama basics. Nina has natural talent for breathwork." },
  // Cancelled
  { id: "ts-21", clientName: "David Park", clientInitials: "DP", clientId: "cl-10", discipline: "Breathwork", date: "2026-04-05", time: "4:00 PM", endTime: "5:00 PM", duration: 60, status: "cancelled", price: 65, hasNotes: false, cancelledBy: "client", cancellationReason: "Personal emergency" },
  { id: "ts-22", clientName: "Lucas Meyer", clientInitials: "LM", clientId: "cl-11", discipline: "Meditation", date: "2026-03-25", time: "9:00 AM", endTime: "10:00 AM", duration: 60, status: "cancelled", price: 65, hasNotes: false, cancelledBy: "teacher", cancellationReason: "Family commitment" },
];

// ── Pending Bookings ──
export const pendingBookings: PendingBooking[] = [
  { id: "pb-1", clientName: "Ethan Brooks", clientInitials: "EB", discipline: "Breathwork", requestedDate: "2026-04-14", requestedTime: "9:00 AM", duration: 60 },
  { id: "pb-2", clientName: "Amara Osei", clientInitials: "AO", discipline: "Breathwork", requestedDate: "2026-04-17", requestedTime: "10:00 AM", duration: 60 },
];

// ── Clients ──
export const teacherClients: TeacherClient[] = [
  { id: "cl-1", name: "Sarah Chen", initials: "SC", memberSince: "2025-10-03", totalSessions: 8, lastSessionDate: "2026-04-07", disciplines: ["Breathwork", "Meditation"], notes: [
    { id: "n-1", date: "2026-04-07", text: "Great progress with 4-7-8 breathing. Sarah is sleeping better and reports less anxiety." },
    { id: "n-2", date: "2026-03-24", text: "Tried guided visualization today. She prefers breathwork but is open to exploring meditation." },
    { id: "n-3", date: "2026-03-07", text: "Introduced box breathing. Sarah picked it up quickly. Very motivated client." },
  ] },
  { id: "cl-2", name: "Jordan Lee", initials: "JL", memberSince: "2025-08-15", totalSessions: 6, lastSessionDate: "2026-04-04", disciplines: ["Breathwork", "Meditation"], notes: [
    { id: "n-4", date: "2026-04-04", text: "Jordan is very receptive to alternate nostril breathing. Shows great discipline in practice." },
    { id: "n-5", date: "2026-03-14", text: "Body scan meditation went well. Jordan finds it easier to focus with guidance." },
  ] },
  { id: "cl-3", name: "Nina Patel", initials: "NP", memberSince: "2025-09-22", totalSessions: 7, lastSessionDate: "2026-04-02", disciplines: ["Breathwork", "Meditation"], notes: [
    { id: "n-6", date: "2026-04-02", text: "Nina has a natural talent for breathwork. Moving to more advanced pranayama techniques." },
    { id: "n-7", date: "2026-03-10", text: "Started with pranayama basics. Excellent posture and focus." },
  ] },
  { id: "cl-4", name: "Tomas Rivera", initials: "TR", memberSince: "2026-01-10", totalSessions: 4, lastSessionDate: "2026-03-28", disciplines: ["Breathwork"], notes: [
    { id: "n-8", date: "2026-03-28", text: "Working on anxiety management through breathwork. Tomas is making steady progress." },
  ] },
  { id: "cl-5", name: "Chloe Martin", initials: "CM", memberSince: "2025-08-28", totalSessions: 5, lastSessionDate: "2026-03-31", disciplines: ["Breathwork", "Meditation"], notes: [
    { id: "n-9", date: "2026-03-31", text: "Chloe prefers shorter, intense sessions. Consider offering 45-min breathwork focused sessions." },
  ] },
  { id: "cl-6", name: "Ethan Brooks", initials: "EB", memberSince: "2025-11-08", totalSessions: 2, lastSessionDate: "2026-03-21", disciplines: ["Breathwork"], notes: [
    { id: "n-10", date: "2026-03-21", text: "First session. Ethan is new to breathwork but very enthusiastic. Start with fundamentals." },
  ] },
  { id: "cl-7", name: "Isabelle Dupont", initials: "ID", memberSince: "2026-01-25", totalSessions: 3, lastSessionDate: "2026-03-18", disciplines: ["Breathwork", "Meditation"], notes: [
    { id: "n-11", date: "2026-03-18", text: "Isabelle loves the intensity of Wim Hof breathing. Explore more advanced techniques next time." },
  ] },
  { id: "cl-8", name: "Kai Nakamura", initials: "KN", memberSince: "2026-02-28", totalSessions: 2, lastSessionDate: "2026-03-05", disciplines: ["Breathwork"], notes: [] },
  { id: "cl-9", name: "Amara Osei", initials: "AO", memberSince: "2025-10-30", totalSessions: 3, lastSessionDate: "2026-03-12", disciplines: ["Breathwork"], notes: [
    { id: "n-12", date: "2026-03-12", text: "Amara is dealing with work stress. Focused on calming breathwork techniques that she can use at her desk." },
  ] },
  { id: "cl-10", name: "David Park", initials: "DP", memberSince: "2026-03-01", totalSessions: 1, lastSessionDate: "2026-03-05", disciplines: ["Breathwork"], notes: [] },
  { id: "cl-11", name: "Lucas Meyer", initials: "LM", memberSince: "2026-03-15", totalSessions: 1, lastSessionDate: "2026-03-22", disciplines: ["Meditation"], notes: [] },
  { id: "cl-12", name: "Hassan Ali", initials: "HA", memberSince: "2025-09-05", totalSessions: 5, lastSessionDate: "2026-03-08", disciplines: ["Breathwork", "Meditation"], notes: [
    { id: "n-13", date: "2026-03-08", text: "Hassan is consistent and disciplined. Ready for advanced pranayama sequences." },
  ] },
  { id: "cl-13", name: "Olivia Grant", initials: "OG", memberSince: "2025-12-20", totalSessions: 3, lastSessionDate: "2026-02-28", disciplines: ["Meditation"], notes: [
    { id: "n-14", date: "2026-02-28", text: "Olivia prefers guided meditation. She mentioned she may take a break for a while." },
  ] },
  { id: "cl-14", name: "Sofia Rodriguez", initials: "SR", memberSince: "2025-08-02", totalSessions: 4, lastSessionDate: "2026-02-20", disciplines: ["Breathwork", "Meditation"], notes: [
    { id: "n-15", date: "2026-02-20", text: "Sofia is one of my most dedicated clients. Exploring combining breathwork with meditation." },
  ] },
];

// ── Conversations ──
export const teacherConversations: TeacherConversation[] = [
  { id: "tc-1", clientName: "Sarah Chen", clientInitials: "SC", clientId: "cl-1", lastMessage: "Looking forward to our session on Friday!", lastMessageTime: "10:32 AM", unread: 0, online: true },
  { id: "tc-2", clientName: "Jordan Lee", clientInitials: "JL", clientId: "cl-2", lastMessage: "Will do, thanks Maya!", lastMessageTime: "Yesterday", unread: 0, online: false },
  { id: "tc-3", clientName: "Nina Patel", clientInitials: "NP", clientId: "cl-3", lastMessage: "That sounds great, see you Wednesday!", lastMessageTime: "Apr 6", unread: 1, online: true },
  { id: "tc-4", clientName: "Ethan Brooks", clientInitials: "EB", clientId: "cl-6", lastMessage: "Hi Maya, I'd like to book another session please", lastMessageTime: "Apr 8", unread: 1, online: false },
  { id: "tc-5", clientName: "Chloe Martin", clientInitials: "CM", clientId: "cl-5", lastMessage: "Thank you for the breathing exercise guide!", lastMessageTime: "Apr 1", unread: 0, online: false },
  { id: "tc-6", clientName: "Amara Osei", clientInitials: "AO", clientId: "cl-9", lastMessage: "The desk breathing exercises are helping a lot", lastMessageTime: "Mar 30", unread: 0, online: false },
];

export const teacherMessages: Record<string, TeacherMessage[]> = {
  "tc-1": [
    { id: "tm-1-1", conversationId: "tc-1", sender: "system", text: "Session scheduled: Breathwork on Apr 11 at 10:00 AM", timestamp: "Apr 8, 9:00 AM", read: true },
    { id: "tm-1-2", conversationId: "tc-1", sender: "client", text: "Hi Maya! Just booked our next session. I've been practicing the breathing pattern you taught me.", timestamp: "Apr 8, 9:15 AM", read: true },
    { id: "tm-1-3", conversationId: "tc-1", sender: "teacher", text: "That's wonderful, Sarah! How's the 4-7-8 pattern feeling?", timestamp: "Apr 8, 10:02 AM", read: true },
    { id: "tm-1-4", conversationId: "tc-1", sender: "client", text: "Really good! I've been doing it before bed and falling asleep so much faster.", timestamp: "Apr 8, 10:15 AM", read: true },
    { id: "tm-1-5", conversationId: "tc-1", sender: "teacher", text: "Looking forward to our session on Friday!", timestamp: "Apr 9, 10:32 AM", read: true },
  ],
  "tc-2": [
    { id: "tm-2-1", conversationId: "tc-2", sender: "system", text: "Session completed: Breathwork on Apr 4", timestamp: "Apr 4, 12:05 PM", read: true },
    { id: "tm-2-2", conversationId: "tc-2", sender: "teacher", text: "Great session today, Jordan! Remember to practice the alternate nostril breathing before bed.", timestamp: "Apr 4, 12:30 PM", read: true },
    { id: "tm-2-3", conversationId: "tc-2", sender: "client", text: "Will do, thanks Maya!", timestamp: "Apr 4, 1:00 PM", read: true },
  ],
  "tc-3": [
    { id: "tm-3-1", conversationId: "tc-3", sender: "system", text: "Session completed: Meditation on Apr 2", timestamp: "Apr 2, 3:05 PM", read: true },
    { id: "tm-3-2", conversationId: "tc-3", sender: "teacher", text: "Nina, you did beautifully today. Your focus during the visualization was impressive.", timestamp: "Apr 2, 3:30 PM", read: true },
    { id: "tm-3-3", conversationId: "tc-3", sender: "client", text: "Thank you! I felt so peaceful. When can we do our next session?", timestamp: "Apr 2, 4:00 PM", read: true },
    { id: "tm-3-4", conversationId: "tc-3", sender: "teacher", text: "I have openings next Wednesday at 2 PM. Would that work?", timestamp: "Apr 3, 9:00 AM", read: true },
    { id: "tm-3-5", conversationId: "tc-3", sender: "client", text: "That sounds great, see you Wednesday!", timestamp: "Apr 6, 10:00 AM", read: false },
  ],
  "tc-4": [
    { id: "tm-4-1", conversationId: "tc-4", sender: "system", text: "Session completed: Breathwork on Mar 21", timestamp: "Mar 21, 10:05 AM", read: true },
    { id: "tm-4-2", conversationId: "tc-4", sender: "teacher", text: "Welcome to your breathwork journey, Ethan! You did great for your first session.", timestamp: "Mar 21, 10:30 AM", read: true },
    { id: "tm-4-3", conversationId: "tc-4", sender: "client", text: "Thanks Maya! I already feel a difference. Can't wait for the next one.", timestamp: "Mar 21, 11:00 AM", read: true },
    { id: "tm-4-4", conversationId: "tc-4", sender: "client", text: "Hi Maya, I'd like to book another session please", timestamp: "Apr 8, 4:00 PM", read: false },
  ],
  "tc-5": [
    { id: "tm-5-1", conversationId: "tc-5", sender: "teacher", text: "Hi Chloe! Here's a PDF guide with the breathing exercises we practiced. Try the first three daily.", timestamp: "Mar 31, 2:30 PM", read: true },
    { id: "tm-5-2", conversationId: "tc-5", sender: "client", text: "Thank you for the breathing exercise guide!", timestamp: "Apr 1, 9:00 AM", read: true },
  ],
  "tc-6": [
    { id: "tm-6-1", conversationId: "tc-6", sender: "teacher", text: "Hi Amara! How are the desk breathing exercises working out?", timestamp: "Mar 28, 3:00 PM", read: true },
    { id: "tm-6-2", conversationId: "tc-6", sender: "client", text: "The desk breathing exercises are helping a lot", timestamp: "Mar 30, 10:00 AM", read: true },
  ],
};

// ── Earnings ──
export const earningsSummary: EarningsSummary = {
  thisMonth: 3420,
  lastMonth: 3055,
  allTime: 28340,
  nextPayoutDate: "2026-04-15",
  pendingPayout: 1625,
};

export const weeklyEarnings: MonthlyEarning[] = [
  { month: "Mon", amount: 110.50 },
  { month: "Tue", amount: 55.25 },
  { month: "Wed", amount: 165.75 },
  { month: "Thu", amount: 110.50 },
  { month: "Fri", amount: 110.50 },
  { month: "Sat", amount: 55.25 },
  { month: "Sun", amount: 0 },
];

export const monthlyEarnings: MonthlyEarning[] = [
  { month: "Nov", amount: 2210 },
  { month: "Dec", amount: 2470 },
  { month: "Jan", amount: 2860 },
  { month: "Feb", amount: 2730 },
  { month: "Mar", amount: 3055 },
  { month: "Apr", amount: 3420 },
];

export const yearlyEarnings: MonthlyEarning[] = [
  { month: "2022", amount: 14200 },
  { month: "2023", amount: 18420 },
  { month: "2024", amount: 22150 },
  { month: "2025", amount: 31460 },
  { month: "2026", amount: 28340 },
];

export const sessionEarnings: SessionEarning[] = [
  { id: "se-1", date: "2026-04-09", clientName: "Sarah Chen", discipline: "Breathwork", duration: 60, amount: 55.25, status: "pending" },
  { id: "se-2", date: "2026-04-07", clientName: "Sarah Chen", discipline: "Breathwork", duration: 60, amount: 55.25, status: "pending" },
  { id: "se-3", date: "2026-04-04", clientName: "Jordan Lee", discipline: "Breathwork", duration: 60, amount: 55.25, status: "pending" },
  { id: "se-4", date: "2026-04-02", clientName: "Nina Patel", discipline: "Meditation", duration: 60, amount: 55.25, status: "pending" },
  { id: "se-5", date: "2026-03-31", clientName: "Chloe Martin", discipline: "Breathwork", duration: 60, amount: 55.25, status: "processing" },
  { id: "se-6", date: "2026-03-28", clientName: "Tomas Rivera", discipline: "Breathwork", duration: 60, amount: 55.25, status: "processing" },
  { id: "se-7", date: "2026-03-24", clientName: "Sarah Chen", discipline: "Meditation", duration: 60, amount: 55.25, status: "paid" },
  { id: "se-8", date: "2026-03-21", clientName: "Ethan Brooks", discipline: "Breathwork", duration: 60, amount: 55.25, status: "paid" },
  { id: "se-9", date: "2026-03-18", clientName: "Isabelle Dupont", discipline: "Breathwork", duration: 60, amount: 55.25, status: "paid" },
  { id: "se-10", date: "2026-03-14", clientName: "Jordan Lee", discipline: "Meditation", duration: 60, amount: 55.25, status: "paid" },
  { id: "se-11", date: "2026-03-10", clientName: "Nina Patel", discipline: "Breathwork", duration: 60, amount: 55.25, status: "paid" },
  { id: "se-12", date: "2026-03-07", clientName: "Sarah Chen", discipline: "Breathwork", duration: 60, amount: 55.25, status: "paid" },
];

export const payoutHistory: Payout[] = [
  { id: "po-1", date: "2026-04-01", amount: 1547.00, method: "stripe", status: "completed", type: "automatic" },
  { id: "po-2", date: "2026-03-15", amount: 1508.00, method: "stripe", status: "completed", type: "automatic" },
  { id: "po-3", date: "2026-03-01", amount: 1382.50, method: "stripe", status: "completed", type: "automatic" },
  { id: "po-4", date: "2026-02-15", amount: 1365.00, method: "stripe", status: "completed", type: "automatic" },
  { id: "po-5", date: "2026-02-01", amount: 1243.00, method: "bank", status: "completed", type: "automatic" },
];

// ── Reviews ──
export const teacherReviews: TeacherReview[] = [
  { id: "r-1", clientName: "Sarah C.", clientInitials: "SC", rating: 5, text: "Maya is incredible. I feel so much calmer after each session. The 4-7-8 breathing technique has completely transformed my sleep.", date: "2026-04-07", discipline: "Breathwork" },
  { id: "r-2", clientName: "Nina P.", clientInitials: "NP", rating: 5, text: "Such a soothing session. Maya really knows how to guide you through visualization. I felt so peaceful afterward.", date: "2026-04-02", discipline: "Meditation" },
  { id: "r-3", clientName: "Ethan B.", clientInitials: "EB", rating: 5, text: "Amazing first session! Maya made me feel completely at ease and explained everything clearly. Can't wait for the next one.", date: "2026-03-21", discipline: "Breathwork" },
  { id: "r-4", clientName: "Sarah C.", clientInitials: "SC", rating: 4, text: "Interesting session trying meditation. I preferred our breathwork sessions but learned a lot about visualization techniques.", date: "2026-03-24", discipline: "Meditation" },
  { id: "r-5", clientName: "Jordan L.", clientInitials: "JL", rating: 5, text: "Maya's breathwork sessions are the highlight of my week. Her knowledge of nervous system science adds such depth.", date: "2026-03-14", discipline: "Breathwork" },
  { id: "r-6", clientName: "Hassan A.", clientInitials: "HA", rating: 5, text: "I've been working with Maya for months and the progress is incredible. She tailors each session perfectly.", date: "2026-03-08", discipline: "Breathwork", reply: "Thank you Hassan! It's been wonderful watching your progress. Your dedication to daily practice really shows." },
  { id: "r-7", clientName: "Sofia R.", clientInitials: "SR", rating: 5, text: "Maya combines breathwork and meditation so beautifully. Each session feels like a mini retreat.", date: "2026-02-20", discipline: "Meditation" },
  { id: "r-8", clientName: "Chloe M.", clientInitials: "CM", rating: 4, text: "Great session but I wish they could be a bit longer sometimes. The content is excellent though.", date: "2026-02-10", discipline: "Breathwork" },
  { id: "r-9", clientName: "Amara O.", clientInitials: "AO", rating: 5, text: "The desk breathing exercises Maya taught me have been a game changer for my work stress.", date: "2026-01-28", discipline: "Breathwork" },
  { id: "r-10", clientName: "Tomas R.", clientInitials: "TR", rating: 5, text: "Maya helped me manage my anxiety with simple breathing techniques. Life changing.", date: "2026-01-15", discipline: "Breathwork" },
];

// ── Availability ──
export const weeklySchedule: WeeklySchedule = {
  Monday: [{ start: "9:00 AM", end: "12:00 PM" }, { start: "2:00 PM", end: "5:00 PM" }],
  Tuesday: [{ start: "10:00 AM", end: "1:00 PM" }],
  Wednesday: [{ start: "9:00 AM", end: "12:00 PM" }, { start: "2:00 PM", end: "4:00 PM" }],
  Thursday: [{ start: "10:00 AM", end: "1:00 PM" }, { start: "3:00 PM", end: "5:00 PM" }],
  Friday: [{ start: "9:00 AM", end: "12:00 PM" }],
  Saturday: [],
  Sunday: [],
};

export const blockedDates: BlockedDate[] = [
  { date: "2026-04-25", reason: "Personal day" },
  { date: "2026-05-01", reason: "Holiday" },
  { date: "2026-05-02", reason: "Holiday" },
];

// ── Notification Prefs ──
export const teacherNotificationPrefs: TeacherNotificationPrefs = {
  newBookingEmail: true,
  sessionReminder: true,
  newMessage: true,
  newReview: true,
  marketingEmails: false,
};
