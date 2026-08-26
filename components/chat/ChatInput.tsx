// components/chat/ChatInput.tsx
"use client";

import { useState, useRef } from "react";
import { Send } from "lucide-react";

interface Props {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled }: Props) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setValue(e.target.value);
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-end gap-2 border-t border-[#078B45]/10 bg-white px-4 py-3"
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        rows={1}
        placeholder="Posez votre question, ex. « Quelle filière pour devenir ingénieur ? »"
        className="max-h-[120px] flex-1 resize-none rounded-xl border border-[#078B45]/15 bg-[#F7F5F1] px-3.5 py-2.5 text-sm text-[#2E3350] outline-none placeholder:text-[#2E3350]/40 focus:border-[#078B45] focus:ring-2 focus:ring-[#078B45]/30"
      />
      <button
        type="submit"
        disabled={disabled || !value.trim()}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#078B45] text-[#D4A24C] transition disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Envoyer"
      >
        <Send className="text-white h-4 w-4" />
      </button>
    </form>
  );
}
