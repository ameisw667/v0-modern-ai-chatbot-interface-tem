import React from "react";
import { Star } from "lucide-react";
import { cls, timeAgo } from "./utils";

export default function ConversationRow({ data, active, onSelect, onTogglePin, showMeta }) {
  const count = Array.isArray(data.messages) ? data.messages.length : data.messageCount;
  return (
    <div className="group relative">
      <button
        onClick={onSelect}
        className={cls(
          "-mx-1 flex w-[calc(100%+8px)] items-center gap-2 rounded-lg px-2 py-2 text-left transition-colors",
          active
            ? "bg-white/40 text-zinc-900 dark:bg-white/10 dark:text-zinc-100 shadow-sm backdrop-blur-sm"
            : "hover:bg-white/20 dark:hover:bg-white/5"
        )}
        title={data.title}
      >
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="truncate text-sm font-medium tracking-tight">{data.title}</span>
            <span className="shrink-0 text-[11px] text-zinc-500 dark:text-zinc-400 opacity-70">
              {timeAgo(data.updatedAt)}
            </span>
          </div>
          {showMeta && (
            <div className="mt-0.5 text-[11px] text-zinc-500 dark:text-zinc-400 opacity-70">
              {count} messages
            </div>
          )}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onTogglePin();
          }}
          title={data.pinned ? "Unpin" : "Pin"}
          className="rounded-md p-1 text-zinc-500 opacity-0 transition group-hover:opacity-100 hover:bg-black/5 dark:text-zinc-300 dark:hover:bg-white/10"
          aria-label={data.pinned ? "Unpin conversation" : "Pin conversation"}
        >
          {data.pinned ? (
            <Star className="h-4 w-4 fill-zinc-800 text-zinc-800 dark:fill-zinc-200 dark:text-zinc-200" />
          ) : (
            <Star className="h-4 w-4" />
          )}
        </button>
      </button>

      <div className="pointer-events-none absolute left-[calc(100%+6px)] top-1 hidden w-64 rounded-xl border border-white/20 bg-white/80 p-3 text-xs text-zinc-700 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-black/80 dark:text-zinc-200 z-50 md:group-hover:block">
        <div className="line-clamp-6 whitespace-pre-wrap">{data.preview}</div>
      </div>
    </div>
  );
}
