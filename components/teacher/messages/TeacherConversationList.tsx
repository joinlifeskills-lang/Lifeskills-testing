"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import type { TeacherConversation } from "@/lib/teacher/types";

const AVATAR_COLORS = [
  "bg-electric-teal",
  "bg-lime-sage",
  "bg-bright-amber",
  "bg-vivid-coral",
  "bg-deep-sage",
];

function avatarColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

interface TeacherConversationListProps {
  conversations: TeacherConversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
}

export default function TeacherConversationList({
  conversations,
  activeId,
  onSelect,
}: TeacherConversationListProps) {
  const [search, setSearch] = useState("");

  const filtered = conversations.filter((c) =>
    c.clientName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-full flex-col">
      <div className="p-4">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-300"
          />
          <input
            type="text"
            placeholder="Search conversations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-neutral-100 bg-neutral-100/50 py-2 pl-9 pr-4 text-sm text-neutral-900 outline-none transition-colors focus:border-electric-teal focus:bg-white"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="px-4 py-12 text-center">
            <p className="text-sm text-neutral-500">
              No messages yet. Conversations start when clients book sessions
              with you.
            </p>
          </div>
        ) : (
          filtered.map((conv) => (
            <button
              key={conv.id}
              onClick={() => onSelect(conv.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-warm-sand/30 ${
                activeId === conv.id
                  ? "bg-deep-sage/5 border-l-2 border-electric-teal"
                  : "border-l-2 border-transparent"
              }`}
            >
              <div className="relative shrink-0">
                <div
                  className={`${avatarColor(conv.clientName)} flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white`}
                >
                  {conv.clientInitials}
                </div>
                {conv.online && (
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-lime-sage" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="truncate text-sm font-medium text-neutral-900">
                    {conv.clientName}
                  </p>
                  <span className="ml-2 shrink-0 text-[11px] text-neutral-400">
                    {conv.lastMessageTime}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="truncate text-xs text-neutral-500">
                    {conv.lastMessage}
                  </p>
                  {conv.unread > 0 && (
                    <span className="ml-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-energy-gradient text-[10px] font-bold text-white">
                      {conv.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
