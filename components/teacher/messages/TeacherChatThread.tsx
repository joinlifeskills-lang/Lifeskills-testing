"use client";

import { useEffect, useRef } from "react";
import { MessageSquare } from "lucide-react";
import type { TeacherConversation, TeacherMessage } from "@/lib/teacher/types";

interface TeacherChatThreadProps {
  conversation: TeacherConversation | null;
  messages: TeacherMessage[];
}

export default function TeacherChatThread({
  conversation,
  messages,
}: TeacherChatThreadProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-neutral-100 px-5 py-3">
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
        {messages.map((msg) => {
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
              className={`flex ${isTeacher ? "justify-end" : "justify-start"}`}
            >
              <div className="max-w-[75%]">
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
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
