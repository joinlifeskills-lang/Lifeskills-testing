"use client";

import { useEffect, useRef, useState } from "react";
import { MessageSquare, Play, Pause } from "lucide-react";
import { MemberConversation, MemberMessage } from "@/lib/member/types";

const avatarColors = ["#0BA89A", "#E8603A", "#6BAA3E", "#F0A500", "#2D4A3E", "#6B5BAA"];
function hashColor(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return avatarColors[Math.abs(h) % avatarColors.length];
}

function fmt(s: number) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

// ── Voice bubble ──────────────────────────────────────────────────────────────
function VoiceBubble({ msg, isMember }: { msg: MemberMessage; isMember: boolean }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  function toggle() {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setPlaying(true);
    }
  }

  // Use the stored audioUrl from msg.text if present (blob URL)
  useEffect(() => {
    if (msg.text.startsWith("blob:") || msg.text.startsWith("http")) {
      audioRef.current = new Audio(msg.text);
      audioRef.current.onended = () => setPlaying(false);
    }
    return () => { audioRef.current?.pause(); };
  }, [msg.text]);

  const bars = Array.from({ length: 28 });
  const duration = msg.audioDuration ?? 0;

  return (
    <div
      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-2xl max-w-[75%] ${
        isMember
          ? "bg-deep-sage text-white rounded-br-md"
          : "bg-neutral-100 text-neutral-900 rounded-bl-md"
      }`}
    >
      <button
        onClick={toggle}
        className={`shrink-0 h-8 w-8 rounded-full flex items-center justify-center transition-colors ${
          isMember ? "bg-white/20 hover:bg-white/30" : "bg-neutral-200 hover:bg-neutral-300"
        }`}
      >
        {playing ? (
          <Pause size={14} className={isMember ? "text-white" : "text-neutral-700"} />
        ) : (
          <Play size={14} className={isMember ? "text-white" : "text-neutral-700"} />
        )}
      </button>

      {/* Static waveform */}
      <div className="flex items-end gap-px h-6 w-20 shrink-0">
        {bars.map((_, i) => (
          <span
            key={i}
            className={`flex-1 rounded-full ${isMember ? "bg-white/60" : "bg-neutral-400"}`}
            style={{ height: `${25 + Math.abs(Math.sin(i * 0.75)) * 70}%` }}
          />
        ))}
      </div>

      <span className={`text-xs tabular-nums shrink-0 ${isMember ? "text-white/70" : "text-neutral-500"}`}>
        {fmt(duration)}
      </span>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
interface ChatThreadProps {
  conversation: MemberConversation | null;
  messages: MemberMessage[];
}

export default function ChatThread({ conversation, messages }: ChatThreadProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ── Empty state ── */
  if (!conversation) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-neutral-400 gap-3">
        <MessageSquare size={40} strokeWidth={1.5} />
        <p className="text-sm">Select a conversation to start messaging</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      {/* Header — centered avatar + name */}
      <div className="flex flex-col items-center gap-1.5 px-5 py-3.5 border-b border-neutral-100">
        <div
          className="h-11 w-11 rounded-full flex items-center justify-center text-white text-sm font-semibold"
          style={{ backgroundColor: hashColor(conversation.teacherName) }}
        >
          {conversation.teacherInitials}
        </div>
        <span className="font-display text-base text-neutral-900 leading-tight">
          {conversation.teacherName}
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-4 space-y-4">
        {messages.map((msg) => {
          if (msg.sender === "system") {
            return (
              <div key={msg.id} className="text-center">
                <p className="text-xs text-neutral-400 italic">{msg.text}</p>
                <p className="text-[0.65rem] text-neutral-400 mt-0.5">
                  {msg.timestamp}
                </p>
              </div>
            );
          }

          const isMember = msg.sender === "member";

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isMember ? "items-end" : "items-start"}`}
            >
              {msg.type === "voice" ? (
                <VoiceBubble msg={msg} isMember={isMember} />
              ) : (
                <div
                  className={`max-w-[75%] px-4 py-2.5 text-sm leading-relaxed ${
                    isMember
                      ? "bg-deep-sage text-white rounded-2xl rounded-br-md"
                      : "bg-neutral-100 text-neutral-900 rounded-2xl rounded-bl-md"
                  }`}
                >
                  {msg.text}
                </div>
              )}
              <span className="text-[0.65rem] text-neutral-400 mt-1 px-1">
                {msg.timestamp}
              </span>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
