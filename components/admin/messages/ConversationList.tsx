"use client";

import { useState } from "react";
import SearchInput from "@/components/admin/ui/SearchInput";
import Avatar from "@/components/admin/ui/Avatar";
import { Conversation } from "@/lib/admin/types";

interface ConversationListProps {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
}

export default function ConversationList({
  conversations,
  activeId,
  onSelect,
}: ConversationListProps) {
  const [search, setSearch] = useState("");

  const filtered = conversations.filter((c) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      c.participantName.toLowerCase().includes(q) ||
      c.lastMessage.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-neutral-100 p-4">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search conversations..."
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <p className="p-4 text-center text-sm text-neutral-500">
            No conversations found.
          </p>
        ) : (
          filtered.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => onSelect(conversation.id)}
              className={`flex w-full items-start gap-3 border-b border-neutral-50 px-4 py-3 text-left transition-colors hover:bg-neutral-50 ${
                activeId === conversation.id
                  ? "bg-deep-sage/5 border-l-2 border-l-deep-sage"
                  : ""
              }`}
            >
              {/* Avatar with online indicator */}
              <div className="relative flex-shrink-0">
                <Avatar initials={conversation.participantInitials} size="md" />
                {conversation.online && (
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-electric-teal" />
                )}
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-semibold text-neutral-900">
                      {conversation.participantName}
                    </span>
                    <span
                      className={`flex-shrink-0 rounded-full px-2 py-0.5 text-[0.65rem] font-semibold ${
                        conversation.participantRole === "teacher"
                          ? "bg-electric-teal/10 text-electric-teal"
                          : "bg-bright-amber/10 text-bright-amber"
                      }`}
                    >
                      {conversation.participantRole === "teacher"
                        ? "Teacher"
                        : "Member"}
                    </span>
                  </div>
                  <span className="flex-shrink-0 text-xs text-neutral-400">
                    {conversation.lastMessageTime}
                  </span>
                </div>

                <div className="mt-0.5 flex items-center justify-between gap-2">
                  <p className="truncate text-xs text-neutral-500">
                    {conversation.lastMessage}
                  </p>
                  {conversation.unread > 0 && (
                    <span className="flex h-5 min-w-[20px] flex-shrink-0 items-center justify-center rounded-full bg-vivid-coral px-1.5 text-[0.65rem] font-bold text-white">
                      {conversation.unread}
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
