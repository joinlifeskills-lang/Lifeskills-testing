import AdminCard from "@/components/admin/ui/AdminCard";
import AdminButton from "@/components/admin/ui/AdminButton";
import { Mail, Clock, DollarSign, Star } from "lucide-react";

const templates = [
  {
    name: "Welcome Email",
    description: "Sent to new members after registration.",
    icon: Mail,
  },
  {
    name: "Session Reminder",
    description: "Sent 24 hours before a scheduled session.",
    icon: Clock,
  },
  {
    name: "Payout Confirmation",
    description: "Sent to teachers when a payout is processed.",
    icon: DollarSign,
  },
  {
    name: "Review Notification",
    description: "Sent to teachers when they receive a new review.",
    icon: Star,
  },
];

export default function NotificationTemplates() {
  return (
    <AdminCard className="p-6">
      <h2 className="mb-4 text-lg font-semibold text-neutral-900">
        Notification Templates
      </h2>
      <div className="divide-y divide-neutral-100">
        {templates.map((template) => {
          const Icon = template.icon;
          return (
            <div
              key={template.name}
              className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-100 text-neutral-500">
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-900">
                    {template.name}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {template.description}
                  </p>
                </div>
              </div>
              <AdminButton
                variant="secondary"
                size="sm"
                onClick={() => console.log("Edit template:", template.name)}
              >
                Edit
              </AdminButton>
            </div>
          );
        })}
      </div>
    </AdminCard>
  );
}
