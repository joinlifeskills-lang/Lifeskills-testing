const statusStyles: Record<string, string> = {
  active: "bg-electric-teal/10 text-electric-teal",
  pending: "bg-bright-amber/10 text-bright-amber",
  suspended: "bg-vivid-coral/10 text-vivid-coral",
  rejected: "bg-neutral-300/30 text-neutral-500",
  banned: "bg-vivid-coral/10 text-vivid-coral",
  inactive: "bg-neutral-300/30 text-neutral-500",
  live: "bg-vivid-coral/10 text-vivid-coral",
  upcoming: "bg-electric-teal/10 text-electric-teal",
  completed: "bg-lime-sage/10 text-lime-sage",
  cancelled: "bg-neutral-300/30 text-neutral-500",
  published: "bg-electric-teal/10 text-electric-teal",
  flagged: "bg-bright-amber/10 text-bright-amber",
  hidden: "bg-neutral-300/30 text-neutral-500",
  disputed: "bg-vivid-coral/10 text-vivid-coral",
  approved: "bg-electric-teal/10 text-electric-teal",
  processing: "bg-bright-amber/10 text-bright-amber",
  failed: "bg-vivid-coral/10 text-vivid-coral",
};

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export default function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const style = statusStyles[status] || "bg-neutral-100 text-neutral-500";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${style} ${className}`}
    >
      {status === "live" && (
        <span className="mr-1.5 h-1.5 w-1.5 animate-pulse rounded-full bg-vivid-coral" />
      )}
      {status}
    </span>
  );
}
