"use client"
import { Asterisk, MoreHorizontal, Menu, ChevronDown } from "lucide-react"
import { useState } from "react"
import GhostIconButton from "./GhostIconButton"

export default function Header({ createNewChat, sidebarCollapsed, setSidebarOpen }) {
  const [selectedBot, setSelectedBot] = useState("Gemini 2.5 Flash")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const chatbots = [
    { name: "GPT-5.1", icon: <img src="/openai-logo.svg" alt="OpenAI" className="h-4 w-4 object-contain" /> },
    { name: "Claude Sonnet 4", icon: <img src="/antrophic-logo.svg" alt="Claude" className="h-4 w-4 object-contain" /> },
    { name: "Gemini 2.5 Flash", icon: <img src="/google-logo.svg" alt="Gemini" className="h-4 w-4 object-contain" /> },
    { name: "Grok 4 ", icon: <img src="/xai-logo.svg" alt="Grok" className="h-4 w-4 object-contain" /> },
    { name: "DeepSeek ", icon: <img src="/deepseek-logo.svg" alt="Deepseek" className="h-4 w-4 object-contain" /> },
    { name: "Moonshot AI ", icon: <img src="/moonshot-ai-logo.svg" alt="MoonshotAI" className="h-4 w-4 object-contain" /> },
  ]

  return (
    <div className="sticky top-0 z-30 flex items-center gap-2 px-4 py-3 glass-header">
      {sidebarCollapsed && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden inline-flex items-center justify-center rounded-lg p-2 hover:bg-white/20 dark:hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
      )}

      <div className="hidden md:flex relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/40 px-3 py-2 text-sm font-semibold tracking-tight hover:bg-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-white/10 dark:bg-black/20 dark:hover:bg-black/40 backdrop-blur-sm shadow-sm"
        >
          {typeof chatbots.find((bot) => bot.name === selectedBot)?.icon === "string" ? (
            <span className="text-sm">{chatbots.find((bot) => bot.name === selectedBot)?.icon}</span>
          ) : (
            chatbots.find((bot) => bot.name === selectedBot)?.icon
          )}
          {selectedBot}
          <ChevronDown className="h-4 w-4 opacity-50" />
        </button>

        {isDropdownOpen && (
          <div className="absolute top-full left-0 mt-1 w-48 rounded-lg border border-white/20 bg-white/80 shadow-xl dark:border-white/10 dark:bg-black/80 backdrop-blur-xl z-50 overflow-hidden">
            {chatbots.map((bot) => (
              <button
                key={bot.name}
                onClick={() => {
                  setSelectedBot(bot.name)
                  setIsDropdownOpen(false)
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-black/5 dark:hover:bg-white/10"
              >
                {typeof bot.icon === "string" ? <span className="text-sm">{bot.icon}</span> : bot.icon}
                {bot.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="ml-auto flex items-center gap-2">
        <GhostIconButton label="More">
          <MoreHorizontal className="h-4 w-4" />
        </GhostIconButton>
      </div>
    </div>
  )
}
