import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works — Lifeskills",
  description:
    "One-on-one. Live. Real skills that work when life gets hard. Learn how Lifeskills connects you with a certified teacher.",
};

export default function HowItWorksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
