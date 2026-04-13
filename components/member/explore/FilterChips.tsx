"use client";

const filters = [
  "All",
  "Breathwork",
  "Meditation",
  "Yoga",
  "Somatic",
  "Available this week",
  "Top rated",
  "New teachers",
] as const;

interface FilterChipsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function FilterChips({
  activeFilter,
  onFilterChange,
}: FilterChipsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
      {filters.map((filter) => {
        const isActive = activeFilter === filter;
        return (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-[0.88rem] font-semibold transition-colors ${
              isActive
                ? "bg-deep-sage text-white"
                : "bg-white border border-neutral-200 text-neutral-700 hover:border-deep-sage"
            }`}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
}
