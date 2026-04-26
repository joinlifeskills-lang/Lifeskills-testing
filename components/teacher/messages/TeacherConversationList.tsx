"use client";

import { useState } from "react";
import { Search, Archive, Trash2, ArchiveRestore } from "lucide-react";
import type { TeacherConversation } from "@/lib/teacher/types";
import ConfirmDeleteModal from "@/components/ui/ConfirmDeleteModal";

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
  const [tab, setTab] = useState<"inbox" | "archived">("inbox");
  const [archivedIds, setArchivedIds] = useState<Set<string>>(new Set());
  const [deletedIds, setDeletedIds] = useState<Set<string>>(new Set());
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  // Which conversation row is expanded to show actions
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

  const filtered = conversations
    .filter((c) => !deletedIds.has(c.id))
    .filter((c) => c.clientName.toLowerCase().includes(search.toLowerCase()))
    .filter((c) => (tab === "inbox" ? !archivedIds.has(c.id) : archivedIds.has(c.id)));

  return (
    <div className="flex h-full flex-col">
      <div className="p-4">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-300" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-neutral-100 bg-neutral-100/50 py-2 pl-9 pr-4 text-sm text-neutral-900 outline-none transition-colors focus:border-electric-teal focus:bg-white"
          />
        </div>

        <div className="mt-3 flex rounded-lg border border-neutral-100 bg-neutral-50 p-0.5">
          <button
            onClick={() => setTab("inbox")}
            className={`flex-1 rounded-md py-1.5 text-xs font-medium transition-colors ${
              tab === "inbox" ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500 hover:text-neutral-700"
            }`}
          >
            Inbox
          </button>
          <button
            onClick={() => setTab("archived")}
            className={`flex-1 rounded-md py-1.5 text-xs font-medium transition-colors ${
              tab === "archived" ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500 hover:text-neutral-700"
            }`}
          >
            Archived
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        {filtered.length === 0 ? (
          <div className="px-4 py-12 text-center">
            <p className="text-sm text-neutral-500">
              {tab === "inbox"
                ? "No messages yet. Conversations start when clients book sessions with you."
                : "No archived conversations."}
            </p>
          </div>
        ) : (
          filtered.map((conv) => (
            <div key={conv.id}>
              <button
                onClick={() => { setExpandedId(null); onSelect(conv.id); }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-warm-sand/30 ${
                  activeId === conv.id
                    ? "bg-deep-sage/5 border-l-2 border-electric-teal"
                    : "border-l-2 border-transparent"
                }`}
              >
                <div className="relative shrink-0">
                  <div className={`${avatarColor(conv.clientName)} flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white`}>
                    {conv.clientInitials}
                  </div>
                  {conv.online && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-lime-sage" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="truncate text-sm font-medium text-neutral-900">{conv.clientName}</p>
                    <span className="ml-2 shrink-0 text-[11px] text-neutral-400">{conv.lastMessageTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="truncate text-xs text-neutral-500">{conv.lastMessage}</p>
                    {conv.unread > 0 && (
                      <span className="ml-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-energy-gradient text-[10px] font-bold text-white">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                </div>

                {/* Ellipsis text button */}
                <span
                  onClick={(e) => toggleActions(e, conv.id)}
                  className="shrink-0 px-1 py-2 text-neutral-400 hover:text-neutral-600 text-lg leading-none select-none"
                >
                  ⋮
                </span>
              </button>

              {/* Action row — slides open below the conversation */}
              {expandedId === conv.id && (
                <div className="flex items-center justify-evenly border-b border-neutral-100 bg-neutral-50 px-4 py-2">
                  {tab === "inbox" ? (
                    <button
                      onClick={(e) => archiveConv(e, conv.id)}
                      className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-neutral-600 hover:bg-neutral-200 transition-colors"
                    >
                      <Archive size={13} /> Archive
                    </button>
                  ) : (
                    <button
                      onClick={(e) => unarchiveConv(e, conv.id)}
                      className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-neutral-600 hover:bg-neutral-200 transition-colors"
                    >
                      <ArchiveRestore size={13} /> Unarchive
                    </button>
                  )}
                  <button
                    onClick={(e) => requestDelete(e, conv.id)}
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
