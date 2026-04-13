"use client";

import { useEffect, useRef } from "react";
import Avatar from "@/components/admin/ui/Avatar";
import { Conversation, Message } from "@/lib/admin/types";
import { MessageSquare } from "lucide-react";

interface MessageThreadProps {
  conversation: Conversation | null;
  messages: Message[];
}

export default function MessageThread({
  conversation,
  messages,
}: MessageThreadProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

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
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "admin" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
