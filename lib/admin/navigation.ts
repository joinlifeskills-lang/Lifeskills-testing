export interface NavItemConfig {
  label: string;
  href: string;
  icon: string;
  badge?: number;
}

export interface NavGroup {
  title: string;
  items: NavItemConfig[];
}

export const adminNavGroups: NavGroup[] = [
  {
    title: "Overview",
    items: [
      { label: "Dashboard", href: "/admin-dashboard", icon: "LayoutDashboard" },
    ],
  },
  {
    title: "People",
    items: [
      { label: "Teachers", href: "/admin-dashboard/teachers", icon: "GraduationCap", badge: 3 },
      { label: "Members", href: "/admin-dashboard/members", icon: "Users" },
    ],
  },
  {
    title: "Platform",
    items: [
      { label: "Sessions", href: "/admin-dashboard/sessions", icon: "Video" },
      { label: "Reviews", href: "/admin-dashboard/reviews", icon: "Star" },
      { label: "Analytics", href: "/admin-dashboard/analytics", icon: "BarChart3" },
    ],
  },
  {
    title: "Money",
    items: [
      { label: "Finances", href: "/admin-dashboard/finances", icon: "DollarSign", badge: 5 },
    ],
  },
  {
    title: "Communication",
    items: [
      { label: "Messages", href: "/admin-dashboard/messages", icon: "MessageSquare" },
    ],
  },
  {
    title: "System",
    items: [
      { label: "Settings", href: "/admin-dashboard/settings", icon: "Settings" },
    ],
  },
];

export const mobileNavItems: NavItemConfig[] = [
  { label: "Dashboard", href: "/admin-dashboard", icon: "LayoutDashboard" },
  { label: "Teachers", href: "/admin-dashboard/teachers", icon: "GraduationCap" },
  { label: "Finances", href: "/admin-dashboard/finances", icon: "DollarSign" },
  { label: "Messages", href: "/admin-dashboard/messages", icon: "MessageSquare" },
];

export const mobileMoreItems: NavItemConfig[] = [
  { label: "Members", href: "/admin-dashboard/members", icon: "Users" },
  { label: "Sessions", href: "/admin-dashboard/sessions", icon: "Video" },
  { label: "Reviews", href: "/admin-dashboard/reviews", icon: "Star" },
  { label: "Analytics", href: "/admin-dashboard/analytics", icon: "BarChart3" },
  { label: "Settings", href: "/admin-dashboard/settings", icon: "Settings" },
];
