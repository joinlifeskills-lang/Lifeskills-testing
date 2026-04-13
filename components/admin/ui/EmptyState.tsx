import { Inbox } from "lucide-react";
import AdminButton from "./AdminButton";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-400">
        {icon || <Inbox size={28} />}
      </div>
      <h3 className="mb-1 text-lg font-semibold text-neutral-900">{title}</h3>
      <p className="mb-6 max-w-sm text-sm text-neutral-500">{description}</p>
      {actionLabel && onAction && (
        <AdminButton variant="primary" onClick={onAction}>
          {actionLabel}
        </AdminButton>
      )}
    </div>
  );
}
