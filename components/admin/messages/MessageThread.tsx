"use client";

import { useEffect, useRef, useState } from "react";
import Avatar from "@/components/admin/ui/Avatar";
import { Conversation, Message } from "@/lib/admin/types";
import { MessageSquare, Trash2 } from "lucide-react";
import ConfirmDeleteModal from "@/components/ui/ConfirmDeleteModal";

interface MessageThreadProps {
  conversation: Conversation | null;
  messages: Message[];
}

export default function MessageThread({
  conversation,
  messages,
}: MessageThreadProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [deletedMsgIds, setDeletedMsgIds] = useState<Set<string>>(new Set());
  const [pendingDeleteMsgId, setPendingDeleteMsgId] = useState<string | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Reset deleted messages when conversation changes
  useEffect(() => {
    setDeletedMsgIds(new Set());
  }, [conversation?.id]);

  const handleDeleteMessage = (id: string) => {
    setPendingDeleteMsgId(id);
  };

  const confirmDeleteMessage = () => {
    if (!pendingDeleteMsgId) return;
    setDeletedMsgIds((prev) => {
      const next = new Set(prev);
      next.add(pendingDeleteMsgId);
      return next;
    });
    setPendingDeleteMsgId(null);
  };

  if (!conversation) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-400">
          <MessageSquare size={28} />
        </div>
        <h3 className="mb-1 text-lg font-semibold text-neutral-900">
          No conversation selected
        </h3>
        <p className="max-w-sm text-sm text-neutral-500">
          Choose a conversation from the list to start messaging.
        </p>
      </div>
    );
  }

  const visibleMessages = messages.filter((m) => !deletedMsgIds.has(m.id));

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-neutral-100 px-4 py-3 md:px-6">
        <div className="relative">
          <Avatar initials={conversation.participantInitials} size="md" />
          {conversation.online && (
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-electric-teal" />
          )}
        </div>
        <div>
          <h3 className="text-sm font-semibold text-neutral-900">
            {conversation.participantName}
          </h3>
          <div className="flex items-center gap-2">
            <span
              className={`rounded-full px-2 py-0.5 text-[0.65rem] font-semibold ${
                conversation.participantRole === "teacher"
                  ? "bg-electric-teal/10 text-electric-teal"
                  : "bg-bright-amber/10 text-bright-amber"
              }`}
            >
              {conversation.participantRole === "teacher" ? "Teacher" : "Member"}
            </span>
            <span className="text-xs text-neutral-400">
              {conversation.online ? "Online" : "Offline"}
            </span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="space-y-4">
          {visibleMessages.map((message) => (
            <div
              key={message.id}
              className={`group flex ${
                message.sender === "admin" ? "justify-end" : "justify-start"
              }`}
            >
              <div className="relative max-w-[75%]">
                <div
                  className={`rounded-2xl px-4 py-2.5 ${
                    message.sender === "admin"
                      ? "bg-deep-sage text-white"
                      : "bg-neutral-100 text-neutral-900"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p
                    className={`mt-1 text-[0.65rem] ${
                      message.sender === "admin"
                        ? "text-white/60"
                        : "text-neutral-400"
                    }`}
                  >
                    {message.timestamp}
                  </p>
                </div>

                {/* Delete button on hover */}
                <button
                  onClick={() => handleDeleteMessage(message.id)}
                  className={`absolute top-1/2 hidden -translate-y-1/2 rounded-md p-1 text-neutral-400 transition-colors hover:bg-red-100 hover:text-red-500 group-hover:block ${
                    message.sender === "admin" ? "-left-8" : "-right-8"
                  }`}
                  title="Delete message"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {pendingDeleteMsgId && (
        <ConfirmDeleteModal
          message="Are you sure you want to delete this message? This action cannot be undone."
          onConfirm={confirmDeleteMessage}
          onCancel={() => setPendingDeleteMsgId(null)}
        />
      )}
    </div>
  );
}
