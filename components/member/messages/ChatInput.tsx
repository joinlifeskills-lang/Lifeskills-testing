"use client";

import { useState, useRef, useEffect, type KeyboardEvent } from "react";
import { Send, Mic, X } from "lucide-react";

interface ChatInputProps {
  onSend: (text: string) => void;
  onSendVoice?: (blob: Blob, duration: number) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, onSendVoice, disabled = false }: ChatInputProps) {
  const [value, setValue] = useState("");
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const secondsRef = useRef(0);

  function handleSend() {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue("");
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
      mediaRecorderRef.current.onstop = null; // skip onSendVoice
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
    }
    setRecording(false);
    setSeconds(0);
    secondsRef.current = 0;
  }

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  function fmt(s: number) {
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  }

  if (recording) {
    return (
      <div className="shrink-0 flex items-center gap-2 px-4 py-3 border-t border-neutral-100 bg-white">
        {/* Cancel */}
        <button
          onClick={cancelRecording}
          className="p-2.5 rounded-full hover:bg-neutral-100 transition-colors text-neutral-400"
        >
          <X size={18} />
        </button>

        {/* Waveform + timer */}
        <div className="flex-1 flex items-center gap-2.5 px-3 py-2 rounded-xl border border-red-200 bg-red-50">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse shrink-0" />
          <span className="text-sm text-red-600 font-medium tabular-nums w-8 shrink-0">{fmt(seconds)}</span>
          <div className="flex-1 flex items-end gap-px h-6 overflow-hidden">
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

        {/* Send recording */}
        <button
          onClick={stopRecording}
          className="p-2.5 rounded-full bg-deep-sage text-white hover:opacity-90 transition-opacity"
        >
          <Send size={18} />
        </button>
      </div>
    );
  }

  return (
    <div className="shrink-0 flex items-center gap-2 px-4 py-3 border-t border-neutral-100 bg-white">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder={disabled ? "Select a conversation..." : "Type a message..."}
        className="flex-1 px-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-electric-teal/30 focus:border-electric-teal transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      />
      {value.trim() ? (
        <button
          onClick={handleSend}
          disabled={disabled}
          className="p-2.5 rounded-full bg-deep-sage text-white hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Send size={18} />
        </button>
      ) : (
        <button
          onClick={startRecording}
          disabled={disabled}
          title="Record voice message"
          className="p-2.5 rounded-full bg-deep-sage text-white hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Mic size={18} />
        </button>
      )}
    </div>
  );
}
