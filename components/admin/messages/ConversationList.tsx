"use client";

import { useState } from "react";
import SearchInput from "@/components/admin/ui/SearchInput";
import Avatar from "@/components/admin/ui/Avatar";
import { Conversation } from "@/lib/admin/types";
import { Archive, ArchiveRestore, Trash2 } from "lucide-react";
import ConfirmDeleteModal from "@/components/ui/ConfirmDeleteModal";

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
  const [activeTab, setActiveTab] = useState<"inbox" | "archived">("inbox");
  const [archivedIds, setArchivedIds] = useState<Set<string>>(new Set());
  const [deletedIds, setDeletedIds] = useState<Set<string>>(new Set());
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  function toggleActions(e: React.MouseEvent, id: string) {
    e.stopPropagation();
    setExpandedId((prev) => (prev === id ? null : id));
  }

  function archiveConv(e: React.MouseEvent, id: string) {
    e.stopPropagation();
    setArchivedIds((prev) => new Set(prev).add(id));
    setExpandedId(null);
  }

  function unarchiveConv(e: React.MouseEvent, id: string) {
    e.stopPropagation();
    const next = new Set(archivedIds);
    next.delete(id);
    setArchivedIds(next);
    setExpandedId(null);
  }

  function requestDelete(e: React.MouseEvent, id: string) {
    e.stopPropagation();
    setPendingDeleteId(id);
    setExpandedId(null);
  }

  function confirmDelete() {
    if (!pendingDeleteId) return;
    setDeletedIds((prev) => new Set(prev).add(pendingDeleteId));
    setPendingDeleteId(null);
  }

  const filtered = conversations.filter((c) => {
    if (deletedIds.has(c.id)) return false;
    const isArchived = archivedIds.has(c.id);
    if (activeTab === "inbox" && isArchived) return false;
    if (activeTab === "archived" && !isArchived) return false;
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return c.participantName.toLowerCase().includes(q) || c.lastMessage.toLowerCase().includes(q);
  });

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-neutral-100 p-4">
        <SearchInput value={search} onChange={setSearch} placeholder="Search conversations..." />

        <div className="mt-3 flex gap-1 rounded-lg bg-neutral-100 p-1">
          <button
            onClick={() => setActiveTab("inbox")}
            className={`flex-1 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
              activeTab === "inbox" ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500 hover:text-neutral-700"
            }`}
          >
            Inbox
          </button>
          <button
            onClick={() => setActiveTab("archived")}
            className={`flex-1 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
              activeTab === "archived" ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500 hover:text-neutral-700"
            }`}
          >
            Archived
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        {filtered.length === 0 ? (
          <p className="p-4 text-center text-sm text-neutral-500">
            {activeTab === "archived" ? "No archived conversations." : "No conversations found."}
          </p>
        ) : (
          filtered.map((conversation) => (
            <div key={conversation.id}>
              <button
                onClick={() => { setExpandedId(null); onSelect(conversation.id); }}
                className={`flex w-full items-start gap-3 border-b border-neutral-50 px-4 py-3 text-left transition-colors hover:bg-neutral-50 ${
                  activeId === conversation.id ? "bg-deep-sage/5 border-l-2 border-l-deep-sage" : ""
                }`}
              >
                <div className="relative flex-shrink-0">
                  <Avatar initials={conversation.participantInitials} size="md" />
                  {conversation.online && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-electric-teal" />
                  )}
                </div>

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
                        {conversation.participantRole === "teacher" ? "Teacher" : "Member"}
                      </span>
                    </div>
                    <span className="flex-shrink-0 text-xs text-neutral-400">
                      {conversation.lastMessageTime}
                    </span>
                  </div>

                  <div className="mt-0.5 flex items-center justify-between gap-2">
                    <p className="truncate text-xs text-neutral-500">{conversation.lastMessage}</p>
                    {conversation.unread > 0 && (
                      <span className="flex h-5 min-w-[20px] flex-shrink-0 items-center justify-center rounded-full bg-vivid-coral px-1.5 text-[0.65rem] font-bold text-white">
                        {conversation.unread}
                      </span>
                    )}
                  </div>
                </div>

                <span
                  onClick={(e) => toggleActions(e, conversation.id)}
                  className="shrink-0 px-1 py-2 text-neutral-400 hover:text-neutral-600 text-lg leading-none select-none"
                >
                  ⋮
                </span>
              </button>

              {expandedId === conversation.id && (
                <div className="flex items-center justify-evenly border-b border-neutral-100 bg-neutral-50 px-4 py-2">
                  {activeTab === "inbox" ? (
                    <button
                      onClick={(e) => archiveConv(e, conversation.id)}
                      className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-neutral-600 hover:bg-neutral-200 transition-colors"
                    >
                      <Archive size={13} /> Archive
                    </button>
                  ) : (
                    <button
                      onClick={(e) => unarchiveConv(e, conversation.id)}
                      className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-neutral-600 hover:bg-neutral-200 transition-colors"
                    >
                      <ArchiveRestore size={13} /> Unarchive
                    </button>
                  )}
                  <button
                    onClick={(e) => requestDelete(e, conversation.id)}
                    className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={13} /> Delete
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {pendingDeleteId && (
        <ConfirmDeleteModal
          message="Are you sure you want to delete this conversation? This action cannot be undone."
          onConfirm={confirmDelete}
          onCancel={() => setPendingDeleteId(null)}
        />
      )}
    </div>
  );
}
