"use client";

import { useState, useRef, useEffect, type KeyboardEvent } from "react";
import { Send, Mic, X } from "lucide-react";

interface TeacherChatInputProps {
  onSend: (text: string) => void;
  onSendVoice?: (blob: Blob, duration: number) => void;
  disabled?: boolean;
}

export default function TeacherChatInput({
  onSend,
  onSendVoice,
  disabled = false,
}: TeacherChatInputProps) {
  const [text, setText] = useState("");
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const secondsRef = useRef(0);

  function handleSend() {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText("");
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      chunksRef.current = [];
      secondsRef.current = 0;

      mr.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        stream.getTracks().forEach((t) => t.stop());
        onSendVoice?.(blob, secondsRef.current);
        setSeconds(0);
        secondsRef.current = 0;
      };

      mr.start();
      mediaRecorderRef.current = mr;
      setRecording(true);
      setSeconds(0);
      timerRef.current = setInterval(() => {
        secondsRef.current += 1;
        setSeconds(secondsRef.current);
      }, 1000);
    } catch {
      // mic permission denied — silently ignore
    }
  }

  function stopRecording() {
    if (timerRef.current) clearInterval(timerRef.current);
    mediaRecorderRef.current?.stop();
    mediaRecorderRef.current = null;
    setRecording(false);
  }

  function cancelRecording() {
    if (timerRef.current) clearInterval(timerRef.current);
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.onstop = null;
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
    }
    setRecording(false);
    setSeconds(0);
    secondsRef.current = 0;
  }

  useEffect(
    () => () => {
      if (timerRef.current) clearInterval(timerRef.current);
    },
    []
  );

  function fmt(s: number) {
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  }

  if (recording) {
    return (
      <div className="flex items-center gap-2 border-t border-neutral-100 px-4 py-3">
        <button
          onClick={cancelRecording}
          className="rounded-full p-2.5 text-neutral-400 transition-colors hover:bg-neutral-100"
        >
          <X size={18} />
        </button>

        <div className="flex flex-1 items-center gap-2.5 rounded-full border border-red-200 bg-red-50 px-4 py-2">
          <span className="h-2.5 w-2.5 shrink-0 animate-pulse rounded-full bg-red-500" />
          <span className="w-8 shrink-0 font-medium tabular-nums text-sm text-red-600">
            {fmt(seconds)}
          </span>
          <div className="flex h-6 flex-1 items-end gap-px overflow-hidden">
            {Array.from({ length: 32 }).map((_, i) => (
              <span
                key={i}
                className="flex-1 rounded-full bg-red-400"
                style={{
                  height: `${28 + Math.abs(Math.sin(i * 0.9 + seconds * 2.1)) * 72}%`,
                  opacity: 0.5 + Math.abs(Math.sin(i * 0.5)) * 0.5,
                }}
              />
            ))}
          </div>
        </div>

        <button
          onClick={stopRecording}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-energy-gradient text-white transition-opacity hover:opacity-90"
        >
          <Send size={18} />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 border-t border-neutral-100 px-4 py-3">
      <input
        type="text"
        placeholder={disabled ? "Select a conversation" : "Type a message..."}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className="flex-1 rounded-full border border-neutral-100 bg-neutral-100/50 px-4 py-2.5 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-electric-teal focus:bg-white disabled:cursor-not-allowed disabled:opacity-50"
      />
      {text.trim() ? (
        <button
          onClick={handleSend}
          disabled={disabled || !text.trim()}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-energy-gradient text-white transition-opacity disabled:opacity-40"
        >
          <Send size={18} />
        </button>
      ) : (
        <button
          onClick={startRecording}
          disabled={disabled}
          title="Record voice message"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-energy-gradient text-white transition-opacity disabled:opacity-40"
        >
          <Mic size={18} />
        </button>
      )}
    </div>
  );
}
