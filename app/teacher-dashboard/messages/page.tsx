"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import TeacherTopBar from "@/components/teacher/layout/TeacherTopBar";
import TeacherConversationList from "@/components/teacher/messages/TeacherConversationList";
import TeacherChatThread from "@/components/teacher/messages/TeacherChatThread";
import TeacherChatInput from "@/components/teacher/messages/TeacherChatInput";
import {
  teacherConversations,
  teacherMessages,
} from "@/lib/teacher/data";

export default function MessagesPage() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mobileView, setMobileView] = useState<"list" | "chat">("list");

  const activeConversation =
    teacherConversations.find((c) => c.id === activeId) ?? null;
  const activeMessages = activeId ? teacherMessages[activeId] ?? [] : [];

  function handleSelect(id: string) {
    setActiveId(id);
    setMobileView("chat");
  }

  function handleBack() {
    setMobileView("list");
  }

  function handleSend(text: string) {
    // In a real app this would send via API
    console.log("Send message:", text);
  }

  return (
    <>
      <TeacherTopBar />

      {/* Desktop layout */}
      <div className="hidden lg:flex h-[calc(100vh-65px)]">
        <div className="w-80 shrink-0 border-r border-neutral-100 bg-white">
          <TeacherConversationList
            conversations={teacherConversations}
            activeId={activeId}
            onSelect={handleSelect}
          />
        </div>
        <div className="flex flex-1 flex-col">
          <div className="flex-1 overflow-hidden">
            <TeacherChatThread
              conversation={activeConversation}
              messages={activeMessages}
            />
          </div>
          <TeacherChatInput
            onSend={handleSend}
            disabled={!activeConversation}
          />
        </div>
      </div>

      {/* Mobile layout */}
      <div className="lg:hidden h-[calc(100vh-57px)]">
        {mobileView === "list" ? (
          <div className="h-full bg-white">
            <TeacherConversationList
              conversations={teacherConversations}
              activeId={activeId}
              onSelect={handleSelect}
            />
          </div>
        ) : (
          <div className="flex h-full flex-col bg-white">
            <div className="flex items-center gap-2 border-b border-neutral-100 px-4 py-3">
              <button
                onClick={handleBack}
                className="rounded-full p-1.5 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
              >
                <ArrowLeft size={18} />
              </button>
              <p className="font-medium text-neutral-900 text-sm">
                {activeConversation?.clientName}
              </p>
              {activeConversation?.online && (
                <span className="flex items-center gap-1 text-xs text-lime-sage">
                  <span className="h-2 w-2 rounded-full bg-lime-sage" />
                  Online
                </span>
              )}
            </div>
            <div className="flex-1 overflow-hidden">
              <TeacherChatThread
                conversation={activeConversation}
                messages={activeMessages}
              />
            </div>
            <TeacherChatInput
              onSend={handleSend}
              disabled={!activeConversation}
            />
          </div>
        )}
      </div>
    </>
  );
}
