"use client";

interface Tab {
  label: string;
  value: string;
  count?: number;
}

interface AdminTabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (value: string) => void;
}

export default function AdminTabs({ tabs, activeTab, onChange }: AdminTabsProps) {
  return (
    <div className="flex gap-1 overflow-x-auto rounded-xl bg-neutral-100 p-1">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === tab.value
              ? "bg-white text-neutral-900 shadow-sm"
              : "text-neutral-500 hover:text-neutral-700"
          }`}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span
              className={`rounded-full px-1.5 py-0.5 text-[0.65rem] font-bold ${
                activeTab === tab.value
                  ? "bg-deep-sage text-white"
                  : "bg-neutral-300/50 text-neutral-500"
              }`}
            >
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
