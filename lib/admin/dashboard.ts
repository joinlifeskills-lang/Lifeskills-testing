import { DashboardMetric, PendingAction, ActivityItem } from "./types";

export const dashboardMetrics: DashboardMetric[] = [
  { label: "Total Revenue", value: "$48,250", change: 12.5, trend: "up", icon: "DollarSign" },
  { label: "Active Members", value: "1,284", change: 8.3, trend: "up", icon: "Users" },
  { label: "Sessions This Month", value: "342", change: 5.1, trend: "up", icon: "Video" },
  { label: "Active Teachers", value: "24", change: 2, trend: "up", icon: "GraduationCap" },
];

export const pendingActions: PendingAction[] = [
  {
    id: "pa-1",
    type: "teacher_application",
    title: "New Teacher Application",
    description: "Sofia Tanaka applied to teach Meditation",
    time: "2 hours ago",
    priority: "high",
  },
  {
    id: "pa-2",
    type: "payout_request",
    title: "Payout Request — $1,240",
    description: "James Okafor requested a payout for March",
    time: "5 hours ago",
    priority: "high",
  },
  {
    id: "pa-3",
    type: "review_flag",
    title: "Flagged Review",
    description: "Review on Lena Park's session flagged for language",
    time: "1 day ago",
    priority: "medium",
  },
  {
    id: "pa-4",
    type: "refund_request",
    title: "Refund Request — $85",
    description: "Member Alex Kim requests refund for cancelled session",
    time: "1 day ago",
    priority: "medium",
  },
  {
    id: "pa-5",
    type: "teacher_application",
    title: "New Teacher Application",
    description: "Eli Brandt applied to teach Breathwork & Yoga",
    time: "2 days ago",
    priority: "low",
  },
];

export const activityFeed: ActivityItem[] = [
  { id: "a-1", type: "session", message: "Maya Reyes completed a Breathwork session with Jordan Lee", time: "15 min ago" },
  { id: "a-2", type: "signup", message: "New member Sarah Chen signed up", time: "32 min ago" },
  { id: "a-3", type: "review", message: "5-star review posted for David Cohen", time: "1 hour ago" },
  { id: "a-4", type: "payout", message: "Payout of $960 sent to Anika Sharma", time: "2 hours ago" },
  { id: "a-5", type: "session", message: "Carlos Vega started a live Yoga session", time: "3 hours ago" },
  { id: "a-6", type: "teacher", message: "Nora Eriksen updated her availability", time: "4 hours ago" },
  { id: "a-7", type: "signup", message: "New member Tomas Rivera signed up", time: "5 hours ago" },
  { id: "a-8", type: "review", message: "4-star review posted for Kwame Mensah", time: "6 hours ago" },
  { id: "a-9", type: "session", message: "Priya Nair completed a Meditation session", time: "7 hours ago" },
  { id: "a-10", type: "payout", message: "Payout of $1,120 sent to Marco Rossi", time: "8 hours ago" },
];

export const revenueChartData = [
  { date: "Oct", value: 28400 },
  { date: "Nov", value: 31200 },
  { date: "Dec", value: 35800 },
  { date: "Jan", value: 33100 },
  { date: "Feb", value: 41600 },
  { date: "Mar", value: 48250 },
];

export const quickStats = {
  avgSessionRating: 4.8,
  completionRate: 94,
  avgResponseTime: "2.4h",
  topDiscipline: "Breathwork" as const,
};
