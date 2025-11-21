import { cls } from "./utils"

export default function Message({ role, children }) {
  const isUser = role === "user"
  return (
    <div className={cls("flex gap-3", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <div className="mt-0.5 grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 text-[10px] font-bold text-white shadow-md dark:from-white dark:to-zinc-200 dark:text-zinc-900">
          AI
        </div>
      )}
      <div
        className={cls(
          "max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-md backdrop-blur-md",
          isUser
            ? "bg-zinc-900/90 text-white dark:bg-white/90 dark:text-zinc-900 border border-transparent"
            : "bg-white/60 text-zinc-900 dark:bg-black/40 dark:text-zinc-100 border border-white/20 dark:border-white/10",
        )}
      >
        {children}
      </div>
      {isUser && (
        <div className="mt-0.5 grid h-7 w-7 place-items-center rounded-full bg-zinc-900 text-[10px] font-bold text-white dark:bg-white dark:text-zinc-900 shadow-md">
          JD
        </div>
      )}
    </div>
  )
}
