import { TeacherNavItem } from "./types";

export const sidebarNavItems: TeacherNavItem[] = [
  { label: "Home", href: "/teacher-dashboard", icon: "Home" },
  { label: "Sessions", href: "/teacher-dashboard/sessions", icon: "Video" },
  { label: "Clients", href: "/teacher-dashboard/clients", icon: "Users" },
  { label: "Earnings", href: "/teacher-dashboard/earnings", icon: "DollarSign" },
  { label: "Client Journey", href: "/teacher-dashboard/journey", icon: "TrendingUp" },
  { label: "Messages", href: "/teacher-dashboard/messages", icon: "MessageSquare" },
  { label: "Profile", href: "/teacher-dashboard/profile", icon: "User" },
  { label: "Settings", href: "/teacher-dashboard/settings", icon: "Settings" },
];

export const mobileNavItems: TeacherNavItem[] = [
  { label: "Home", href: "/teacher-dashboard", icon: "Home" },
  { label: "Sessions", href: "/teacher-dashboard/sessions", icon: "Video" },
  { label: "Clients", href: "/teacher-dashboard/clients", icon: "Users" },
  { label: "Messages", href: "/teacher-dashboard/messages", icon: "MessageSquare" },
];

export const mobileMoreItems: TeacherNavItem[] = [
  { label: "Earnings", href: "/teacher-dashboard/earnings", icon: "DollarSign" },
  { label: "Client Journey", href: "/teacher-dashboard/journey", icon: "TrendingUp" },
  { label: "Profile", href: "/teacher-dashboard/profile", icon: "User" },
  { label: "Settings", href: "/teacher-dashboard/settings", icon: "Settings" },
];
