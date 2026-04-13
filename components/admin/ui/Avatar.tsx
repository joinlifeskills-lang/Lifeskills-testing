const bgColors = [
  "bg-electric-teal",
  "bg-deep-sage",
  "bg-vivid-coral",
  "bg-bright-amber",
  "bg-lime-sage",
];

interface AvatarProps {
  initials: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Avatar({ initials, size = "md", className = "" }: AvatarProps) {
  const colorIndex =
    initials.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % bgColors.length;
  const bg = bgColors[colorIndex];

  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-14 w-14 text-lg",
  };

  return (
    <div
      className={`flex items-center justify-center rounded-full font-bold text-white ${bg} ${sizeClasses[size]} ${className}`}
    >
      {initials}
    </div>
  );
}
