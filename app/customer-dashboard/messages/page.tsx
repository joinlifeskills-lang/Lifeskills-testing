"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowLeft, MessageSquare, X, Search } from "lucide-react";
import MemberTopBar from "@/components/member/layout/MemberTopBar";
import ConversationList from "@/components/member/messages/ConversationList";
import ChatThread from "@/components/member/messages/ChatThread";
import ChatInput from "@/components/member/messages/ChatInput";
import { memberConversations, memberMessages, memberSessions } from "@/lib/member/data";

// Unique teachers the member has had sessions with (for new message picker)
const sessionTeachers = Array.from(
  new Map(
    memberSessions
      .filter((s) => s.status === "completed" || s.status === "confirmed")
      .map((s) => [s.teacherSlug, { name: s.teacherName, initials: s.teacherInitials, slug: s.teacherSlug }])
  ).values()
);

const avatarColors = ["#0BA89A", "#E8603A", "#6BAA3E", "#F0A500", "#2D4A3E", "#6B5BAA"];
function hashColor(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return avatarColors[Math.abs(h) % avatarColors.length];
}

// ── New Message Modal ─────────────────────────────────────────────────────────
function NewMessageModal({ onClose, onSelect }: { onClose: () => void; onSelect: (name: string) => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Auto-focus the search input when modal opens
    const t = setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(t);
  }, []);

  const results = sessionTeachers.filter((t) =>
    t.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 px-0 sm:px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full sm:max-w-sm rounded-t-2xl sm:rounded-2xl bg-white shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
          <h3 className="font-display text-lg text-neutral-900">New Message</h3>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-neutral-100 transition-colors text-neutral-400">
            <X size={18} />
          </button>
        </div>

        {/* Search */}
        <div className="px-4 py-3 border-b border-neutral-100">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search teachers..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-deep-sage/20 focus:border-deep-sage/40 transition-colors"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="max-h-64 overflow-y-auto">
          {results.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 gap-2 text-neutral-400">
              <Search size={22} strokeWidth={1.5} />
              <p className="text-sm">
                {query ? `No teachers matching "${query}"` : "No teachers to message yet."}
              </p>
            </div>
          ) : (
            results.map((teacher) => (
              <button
                key={teacher.slug}
                onClick={() => { onSelect(teacher.name); onClose(); }}
                className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-neutral-50 transition-colors text-left"
              >
                <div
                  className="h-10 w-10 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0"
                  style={{ backgroundColor: hashColor(teacher.name) }}
                >
                  {teacher.initials}
                </div>
                <div>
                  <p className="font-medium text-neutral-900">{teacher.name}</p>
                  <p className="text-xs text-neutral-400 mt-0.5">Tap to open conversation</p>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function MessagesPage() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mobileView, setMobileView] = useState<"list" | "chat">("list");
  const [showNewMessage, setShowNewMessage] = useState(false);

  const activeConversation = memberConversations.find((c) => c.id === activeId) ?? null;
  const messages = activeId ? memberMessages[activeId] ?? [] : [];

  function selectConversation(id: string) {
    setActiveId(id);
    setMobileView("chat");
  }

  function handleNewMessageSelect(teacherName: string) {
    // Find existing conversation with this teacher, or select first as fallback
    const existing = memberConversations.find((c) => c.teacherName === teacherName);
    if (existing) {
      setActiveId(existing.id);
      setMobileView("chat");
    }
    // In a real app: create a new conversation if none exists
  }

  function handleSend(text: string) {
    console.log("Send message:", text, "to conversation:", activeId);
  }

  function handleSendVoice(blob: Blob, duration: number) {
    const url = URL.createObjectURL(blob);
    console.log("Send voice message:", { url, duration, conversationId: activeId });
  }

  const hasConversations = memberConversations.length > 0;

  return (
    <div className="-mb-20 lg:-mb-0 flex flex-col h-[calc(100dvh-58px)] lg:h-screen">
      <MemberTopBar />

      {/* Desktop layout */}
      <div className="hidden lg:flex flex-1 min-h-0">
        <div className="w-80 shrink-0 border-r border-neutral-100 bg-white overflow-hidden">
          <ConversationList
            conversations={memberConversations}
            activeId={activeId}
            onSelect={selectConversation}
            onNewMessage={() => setShowNewMessage(true)}
          />
        </div>

        <div className="flex-1 bg-white flex flex-col min-h-0 overflow-hidden">
          {hasConversations ? (
            <>
              <ChatThread conversation={activeConversation} messages={messages} />
              <ChatInput onSend={handleSend} onSendVoice={handleSendVoice} disabled={!activeConversation} />
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-neutral-400 gap-3">
              <MessageSquare size={40} strokeWidth={1.5} />
              <p className="text-sm text-center max-w-xs">Start a conversation by booking a session with a teacher.</p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile layout — list view */}
      {mobileView === "list" && (
        <div className="lg:hidden flex-1 min-h-0 bg-white flex flex-col overflow-hidden">
          {hasConversations ? (
            <ConversationList
              conversations={memberConversations}
              activeId={activeId}
              onSelect={selectConversation}
              onNewMessage={() => setShowNewMessage(true)}
            />
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-neutral-400 gap-3 px-6">
              <MessageSquare size={40} strokeWidth={1.5} />
              <p className="text-sm text-center max-w-xs">Start a conversation by booking a session with a teacher.</p>
            </div>
          )}
        </div>
      )}

      {/* Mobile layout — chat view (fixed so only messages scroll) */}
      {mobileView === "chat" && (
        <div className="lg:hidden fixed inset-x-0 top-12 bottom-[58px] bg-white flex flex-col z-30">
          {/* Back bar */}
          <button
            onClick={() => setMobileView("list")}
            className="shrink-0 flex items-center gap-2 px-4 py-3 text-sm font-medium text-deep-sage border-b border-neutral-100 hover:bg-neutral-50 transition-colors"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          {/* ChatThread — flex-1, messages scroll inside */}
          <ChatThread conversation={activeConversation} messages={messages} />

          {/* Input — pinned to bottom */}
          <ChatInput onSend={handleSend} onSendVoice={handleSendVoice} disabled={!activeConversation} />
        </div>
      )}

      {showNewMessage && (
        <NewMessageModal
          onClose={() => setShowNewMessage(false)}
          onSelect={handleNewMessageSelect}
        />
      )}
    </div>
  );
}
