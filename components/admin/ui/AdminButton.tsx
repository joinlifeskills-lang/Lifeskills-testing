interface AdminButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "approve" | "reject" | "danger" | "secondary";
  size?: "sm" | "md";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const variantStyles: Record<string, string> = {
  primary: "bg-deep-sage text-white hover:bg-deep-sage-hover",
  approve: "bg-electric-teal text-white hover:bg-electric-teal/90",
  reject: "bg-vivid-coral text-white hover:bg-vivid-coral/90",
  danger: "bg-vivid-coral/10 text-vivid-coral hover:bg-vivid-coral/20",
  secondary: "border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50",
};

export default function AdminButton({
  children,
  variant = "primary",
  size = "md",
  onClick,
  className = "",
  disabled = false,
}: AdminButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-sans font-semibold transition-all duration-200 ${
        size === "sm" ? "px-4 py-1.5 text-xs" : "px-[26px] py-[10px] text-[0.88rem]"
      } ${variantStyles[variant]} ${disabled ? "cursor-not-allowed opacity-50" : ""} ${className}`}
    >
      {children}
    </button>
  );
}
