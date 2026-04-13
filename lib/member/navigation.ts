import { MemberNavItem } from "./types";

export const sidebarNavItems: MemberNavItem[] = [
  { label: "Home", href: "/customer-dashboard", icon: "Home" },
  { label: "Sessions", href: "/customer-dashboard/sessions", icon: "Calendar" },
  { label: "My Journey", href: "/customer-dashboard/journey", icon: "TrendingUp" },
  { label: "Messages", href: "/customer-dashboard/messages", icon: "MessageSquare" },
  { label: "Explore Teachers", href: "/customer-dashboard/explore", icon: "Search" },
  { label: "Profile", href: "/customer-dashboard/profile", icon: "User" },
];

export const mobileNavItems: MemberNavItem[] = [
  { label: "Home", href: "/customer-dashboard", icon: "Home" },
  { label: "Sessions", href: "/customer-dashboard/sessions", icon: "Calendar" },
  { label: "My Journey", href: "/customer-dashboard/journey", icon: "TrendingUp" },
  { label: "Messages", href: "/customer-dashboard/messages", icon: "MessageSquare" },
  { label: "Profile", href: "/customer-dashboard/profile", icon: "User" },
];
