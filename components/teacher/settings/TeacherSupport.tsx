import { HelpCircle, Mail, FileQuestion, AlertTriangle, ChevronRight } from "lucide-react";

const LINKS = [
  { label: "Help Center", icon: HelpCircle },
  { label: "Contact Support", icon: Mail },
  { label: "FAQs", icon: FileQuestion },
  { label: "Report a Problem", icon: AlertTriangle },
] as const;

export default function TeacherSupport() {
  return (
    <div className="rounded-2xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
      <h3 className="px-6 pt-5 font-display text-lg text-neutral-900">Support</h3>
      <div className="p-2">
        {LINKS.map(({ label, icon: Icon }) => (
          <button
            key={label}
            className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-left transition-colors hover:bg-neutral-50"
          >
            <div className="flex items-center gap-3">
              <Icon size={18} className="text-neutral-500" />
              <span className="text-sm font-medium text-neutral-900">{label}</span>
            </div>
            <ChevronRight size={16} className="text-neutral-400" />
          </button>
        ))}
      </div>
    </div>
  );
}
