"use client";

import { useState } from "react";
import { Search, SquarePen } from "lucide-react";
import { MemberConversation } from "@/lib/member/types";

const avatarColors = [
  "#0BA89A", "#E8603A", "#F0A500", "#6BAA3E", "#6B5BAA", "#2D4A3E",
];

function hashColor(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return avatarColors[Math.abs(h) % avatarColors.length];
}

interface ConversationListProps {
  conversations: MemberConversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onNewMessage: () => void;
}

export default function ConversationList({
  conversations,
  activeId,
  onSelect,
  onNewMessage,
}: ConversationListProps) {
  const [search, setSearch] = useState("");

  const filtered = conversations.filter(
    (c) =>
      c.teacherName.toLowerCase().includes(search.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <h2 className="font-display text-base text-neutral-900">Messages</h2>
        <button
          onClick={onNewMessage}
          className="p-2 rounded-full hover:bg-neutral-100 transition-colors text-neutral-500 hover:text-deep-sage"
          aria-label="New message"
        >
          <SquarePen size={18} />
        </button>
      </div>

      {/* Search */}
      <div className="px-4 pb-3">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search conversations..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-deep-sage/20 focus:border-deep-sage/40 transition-colors"
          />
        </div>
      </div>

      {/* Conversation rows */}
      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 && (
          <p className="text-sm text-neutral-400 text-center py-8">No conversations found.</p>
        )}
        {filtered.map((c) => {
          const isActive = c.id === activeId;
          return (
            <button
              key={c.id}
              onClick={() => onSelect(c.id)}
              className={`w-full flex items-start gap-3 px-4 py-3.5 text-left transition-colors ${
                isActive
                  ? "bg-deep-sage/5 border-l-2 border-deep-sage"
                  : "border-l-2 border-transparent hover:bg-neutral-50"
              }`}
            >
              <div className="h-10 w-10 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0" style={{ backgroundColor: hashColor(c.teacherName) }}>
                {c.teacherInitials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm text-neutral-900">{c.teacherName}</span>
                  <span className="text-[0.7rem] text-neutral-400 flex-shrink-0 ml-2">{c.lastMessageTime}</span>
                </div>
                <div className="flex items-center justify-between mt-0.5">
                  <p className="text-sm text-neutral-500 truncate pr-2">{c.lastMessage}</p>
                  {c.unread > 0 && (
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-deep-sage text-white text-xs font-semibold flex items-center justify-center">
                      {c.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
