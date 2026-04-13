"use client";

import { useState } from "react";
import { Send } from "lucide-react";

interface MessageInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export default function MessageInput({
  onSend,
  disabled = false,
}: MessageInputProps) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (!value.trim() || disabled) return;
    onSend(value.trim());
    setValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-neutral-100 p-4">
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={disabled ? "Select a conversation..." : "Type a message..."}
          disabled={disabled}
          className="flex-1 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-deep-sage focus:outline-none focus:ring-1 focus:ring-deep-sage disabled:cursor-not-allowed disabled:opacity-50"
        />
        <button
          onClick={handleSend}
          disabled={disabled || !value.trim()}
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-deep-sage text-white transition-all hover:bg-deep-sage-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
