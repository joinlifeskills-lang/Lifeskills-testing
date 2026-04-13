"use client";

import { useState } from "react";
import { Pencil, ChevronDown } from "lucide-react";
import { memberProfile } from "@/lib/member/data";
import type { MemberProfile } from "@/lib/member/types";

interface FieldRowProps {
  label: string;
  value: string;
  fieldKey: string;
  editing: boolean;
  draft: Record<string, string>;
  onDraftChange: (key: string, value: string) => void;
}

function FieldRow({ label, value, fieldKey, editing, draft, onDraftChange }: FieldRowProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-3 border-b border-neutral-100 last:border-b-0">
      <span className="text-sm font-medium text-neutral-500 sm:w-32 shrink-0">
        {label}
      </span>
      {editing ? (
        <input
          type="text"
          value={draft[fieldKey] ?? value}
          onChange={(e) => onDraftChange(fieldKey, e.target.value)}
          className="flex-1 rounded-xl border border-neutral-200 px-4 py-2.5 text-neutral-900 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-electric-teal/30 focus:border-electric-teal transition-colors"
        />
      ) : (
        <span className="text-neutral-900 text-sm">{value}</span>
      )}
    </div>
  );
}

export default function PersonalInfo() {
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<Record<string, string>>({});

  const fields: { label: string; key: keyof MemberProfile; value: string }[] = [
    { label: "Name", key: "firstName", value: `${memberProfile.firstName} ${memberProfile.lastName}` },
    { label: "Email", key: "email", value: memberProfile.email },
    { label: "Phone", key: "phone", value: memberProfile.phone },
    { label: "Timezone", key: "timezone", value: memberProfile.timezone },
    { label: "Language", key: "language", value: memberProfile.language },
  ];

  const handleDraftChange = (key: string, value: string) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setEditing(false);
    setDraft({});
  };

  const handleCancel = () => {
    setEditing(false);
    setDraft({});
  };

  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 md:cursor-default"
      >
        <h3 className="font-display text-lg text-neutral-900">
          Personal Information
        </h3>
        <div className="flex items-center gap-2">
          {!editing && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(true);
                setEditing(true);
              }}
              className="flex items-center gap-1.5 rounded-full text-[0.82rem] font-semibold py-[7px] px-[16px] border border-[#2D4A3E] text-[#2D4A3E] hover:bg-[#2D4A3E] hover:text-white transition-colors"
            >
              <Pencil size={12} />
              Edit
            </button>
          )}
          <ChevronDown
            size={20}
            className={`text-neutral-400 transition-transform md:hidden ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {/* Content - always visible on md+, toggle on mobile */}
      <div className={`${isOpen ? "block" : "hidden"} md:block px-6 pb-6`}>
        <div>
          {fields.map((field) => (
            <FieldRow
              key={field.key}
              label={field.label}
              value={field.value}
              fieldKey={field.key}
              editing={editing}
              draft={draft}
              onDraftChange={handleDraftChange}
            />
          ))}
        </div>

        {editing && (
          <div className="flex items-center gap-3 mt-5">
            <button
              onClick={handleSave}
              className="rounded-full font-semibold text-[0.88rem] py-[10px] px-[26px] bg-deep-sage text-white hover:bg-deep-sage-hover transition-colors"
            >
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="rounded-full font-semibold text-[0.88rem] py-[10px] px-[26px] border border-deep-sage text-deep-sage hover:bg-deep-sage/5 transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
