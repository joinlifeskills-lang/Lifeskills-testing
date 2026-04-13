import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
};

export default function SectionTitle({
  children,
  tone = "light",
  align = "center",
  className = "",
}: Props) {
  const color = tone === "dark" ? "text-white" : "text-neutral-900";
  const alignment = align === "center" ? "text-center" : "text-left";
  return (
    <h2
      className={`font-sans font-bold text-[1.75rem] md:text-[2rem] leading-[1.25] ${color} ${alignment} ${className}`.trim()}
    >
      {children}
    </h2>
  );
}
