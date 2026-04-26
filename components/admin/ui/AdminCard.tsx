interface AdminCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function AdminCard({ children, className = "" }: AdminCardProps) {
  return (
    <div className={`min-w-0 overflow-hidden rounded-2xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)] ${className}`}>
      {children}
    </div>
  );
}
