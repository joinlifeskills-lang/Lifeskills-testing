"use client";

import { useEffect, useRef, useState } from "react";
import { MessageSquare, Trash2 } from "lucide-react";
import type { TeacherConversation, TeacherMessage } from "@/lib/teacher/types";
import ConfirmDeleteModal from "@/components/ui/ConfirmDeleteModal";

interface TeacherChatThreadProps {
  conversation: TeacherConversation | null;
  messages: TeacherMessage[];
}

export default function TeacherChatThread({
  conversation,
  messages,
}: TeacherChatThreadProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [deletedMsgIds, setDeletedMsgIds] = useState<Set<string>>(new Set());
  const [pendingDeleteMsgId, setPendingDeleteMsgId] = useState<string | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
      <div className="flex h-full flex-col items-center justify-center text-center px-8">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 mb-4">
          <MessageSquare size={28} className="text-neutral-300" />
        </div>
        <p className="text-neutral-500 text-sm">
          Select a conversation to start messaging.
        </p>
      </div>
    );
  }

  const visibleMessages = messages.filter((msg) => !deletedMsgIds.has(msg.id));

  return (
    <div className="flex h-full flex-col">
      {/* Header — hidden on mobile since the page back bar already shows the name */}
      <div className="hidden items-center gap-3 border-b border-neutral-100 px-5 py-3 lg:flex">
        <p className="font-medium text-neutral-900 text-sm">
          {conversation.clientName}
        </p>
        {conversation.online && (
          <span className="flex items-center gap-1 text-xs text-lime-sage">
            <span className="h-2 w-2 rounded-full bg-lime-sage" />
            Online
          </span>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {visibleMessages.map((msg) => {
          if (msg.sender === "system") {
            return (
              <div key={msg.id} className="text-center">
                <p className="text-xs italic text-neutral-400">{msg.text}</p>
                <p className="text-[10px] text-neutral-300 mt-0.5">
                  {msg.timestamp}
                </p>
              </div>
            );
          }

          const isTeacher = msg.sender === "teacher";

          return (
            <div
              key={msg.id}
              className={`group flex ${isTeacher ? "justify-end" : "justify-start"}`}
            >
              <div className="relative max-w-[75%]">
                <div
                  className={`px-4 py-2.5 text-sm ${
                    isTeacher
                      ? "bg-deep-sage text-white rounded-2xl rounded-br-md"
                      : "bg-neutral-100 text-neutral-900 rounded-2xl rounded-bl-md"
                  }`}
                >
                  {msg.text}
                </div>
                <p
                  className={`mt-1 text-[10px] text-neutral-400 ${
                    isTeacher ? "text-right" : "text-left"
                  }`}
                >
                  {msg.timestamp}
                </p>

                {/* Delete icon on hover */}
                <button
                  onClick={() => handleDeleteMessage(msg.id)}
                  className={`absolute top-1/2 -translate-y-1/2 rounded-md p-1 text-neutral-300 opacity-0 transition-opacity hover:bg-red-50 hover:text-red-500 group-hover:opacity-100 ${
                    isTeacher ? "-left-8" : "-right-8"
                  }`}
                  title="Delete message"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
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
