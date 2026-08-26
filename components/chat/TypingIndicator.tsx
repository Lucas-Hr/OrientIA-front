// components/chat/TypingIndicator.tsx
import { Compass } from "lucide-react";

export default function TypingIndicator() {
  return (
    <div className="flex items-end gap-2.5">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#078B45] text-white">
        <Compass className="w-4 h-4" />
      </div>
      <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm bg-white px-4 py-3.5 shadow-sm ring-1 ring-[#078B45]/10">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-[#078B45]/40 animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}
