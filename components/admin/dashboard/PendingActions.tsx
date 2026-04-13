import { pendingActions } from "@/lib/admin/dashboard";
import AdminCard from "@/components/admin/ui/AdminCard";
import { AlertCircle, Clock, ArrowRight } from "lucide-react";

const priorityStyles: Record<string, string> = {
  high: "bg-vivid-coral/10 text-vivid-coral",
  medium: "bg-bright-amber/10 text-bright-amber",
  low: "bg-neutral-100 text-neutral-500",
};

export default function PendingActions() {
  return (
    <AdminCard className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-neutral-900">Pending Actions</h3>
        <span className="rounded-full bg-vivid-coral px-2 py-0.5 text-[0.65rem] font-bold text-white">
          {pendingActions.length}
        </span>
      </div>
      <div className="space-y-3">
        {pendingActions.map((action) => (
          <div
            key={action.id}
            className="group flex cursor-pointer items-start gap-3 rounded-xl p-3 transition-colors hover:bg-neutral-50"
          >
            <div className={`mt-0.5 rounded-lg p-1.5 ${priorityStyles[action.priority]}`}>
              {action.priority === "high" ? <AlertCircle size={16} /> : <Clock size={16} />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-neutral-900">{action.title}</p>
              <p className="truncate text-xs text-neutral-500">{action.description}</p>
              <p className="mt-1 text-[0.65rem] text-neutral-400">{action.time}</p>
            </div>
            <ArrowRight size={16} className="mt-1 text-neutral-300 transition-colors group-hover:text-neutral-500" />
          </div>
        ))}
      </div>
    </AdminCard>
  );
}
