"use client";

import { useState } from "react";
import AdminTopBar from "@/components/admin/layout/AdminTopBar";
import ConversationList from "@/components/admin/messages/ConversationList";
import MessageThread from "@/components/admin/messages/MessageThread";
import MessageInput from "@/components/admin/messages/MessageInput";
import { conversations, messages } from "@/lib/admin/messages";
import { ArrowLeft } from "lucide-react";

export default function MessagesPage() {
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

  const activeConversation =
    conversations.find((c) => c.id === activeConversationId) ?? null;

  const activeMessages = activeConversationId
    ? messages[activeConversationId] ?? []
    : [];

  const handleSend = (text: string) => {
    console.log("Send message:", text, "to:", activeConversationId);
  };

  return (
    <>
      <AdminTopBar title="Messages" />

      <div className="flex h-[calc(100vh-65px)] overflow-hidden">
        {/* Conversation List - desktop always visible, mobile only when no active conversation */}
        <div
          className={`w-full flex-shrink-0 border-r border-neutral-100 bg-white md:w-80 md:block ${
            activeConversationId ? "hidden" : "block"
          }`}
        >
          <ConversationList
            conversations={conversations}
            activeId={activeConversationId}
            onSelect={setActiveConversationId}
          />
        </div>

        {/* Message Thread + Input - desktop always visible, mobile only when conversation selected */}
        <div
          className={`flex min-w-0 flex-1 flex-col bg-white ${
            activeConversationId ? "flex" : "hidden md:flex"
          }`}
        >
          {/* Mobile back button */}
          {activeConversationId && (
            <div className="border-b border-neutral-100 px-4 py-2 md:hidden">
              <button
                onClick={() => setActiveConversationId(null)}
                className="flex items-center gap-1 text-sm font-medium text-deep-sage"
              >
                <ArrowLeft size={16} />
                Back
              </button>
            </div>
          )}

          <div className="flex flex-1 flex-col overflow-hidden">
            <div className="flex-1 overflow-hidden">
              <MessageThread
                conversation={activeConversation}
                messages={activeMessages}
              />
            </div>
            <MessageInput
              onSend={handleSend}
              disabled={!activeConversationId}
            />
          </div>
        </div>
      </div>
    </>
  );
}
