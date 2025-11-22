"use client"
import { MoreHorizontal, Menu, ChevronDown, Sparkles, Check } from "lucide-react"
import { useState } from "react"
import GhostIconButton from "./GhostIconButton"

export default function Header({ createNewChat, sidebarCollapsed, setSidebarOpen }) {
  const [selectedBot, setSelectedBot] = useState("Gemini 3 Pro Preview")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // Definition der Gruppen und Modelle
  const modelGroups = [
    {
      id: "openai",
      label: "OpenAI",
      items: [
        { name: "GPT-5.1", icon: "/openai-logo.svg" },
        { name: "GPT-5", icon: "/openai-logo.svg" },
        { name: "o3", icon: "/openai-logo.svg" },
       
      ]
    },

    {
      id: "google",
      label: "Google",
      items: [
        { name: "Gemini 3 Pro Preview", icon: "/google-logo.svg" },
        { name: "Gemini 2.5 Pro", icon: "/google-logo.svg" },
        { name: "Gemini 2.5 Flash", icon: "/google-logo.svg" },
        { name: "Gemini 2.5 Flash-Lite", icon: "/google-logo.svg" },
      ]
    },

        {
      id: "anthropic",
      label: "Anthropic",
      items: [
        { name: "laude 4.5 Sonnet", icon: "/antrophic-logo.svg" }, 
        { name: "Claude 4.1 Opus", icon: "/antrophic-logo.svg" }, 
        { name: "Claude 4.5 Haiku", icon: "/antrophic-logo.svg" }, 
      ]
    },
    {
      id: "others",
      label: "Weitere Modelle",
      items: [
        { name: "Grok 4", icon: "/xai-logo.svg" },
        { name: "Grok 4.1 Fast", icon: "/xai-logo.svg" },
        { name: "Grok 4 Fast", icon: "/xai-logo.svg" },
        { name: "DeepSeek R1", icon: "/deepseek-logo.svg" },
        { name: "DeepSeek V3.2", icon: "/deepseek-logo.svg" },
        { name: "Kimi K2 Thinking", icon: "/moonshot-ai-logo.svg" },
        { name: "Kimi K2 0905", icon: "/moonshot-ai-logo.svg" },
      ]
    }
  ]

  // Hilfsfunktion, um das aktuelle Icon für den Header-Button zu finden
  const getCurrentIcon = () => {
    for (const group of modelGroups) {
      const found = group.items.find(i => i.name === selectedBot)
      if (found) return found.icon
    }
    return "/openai-logo.svg" // Fallback
  }

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
          className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/40 px-3 py-2 text-sm font-semibold tracking-tight hover:bg-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-white/10 dark:bg-black/20 dark:hover:bg-black/40 backdrop-blur-sm shadow-sm transition-all"
        >
          {/* Aktuelles Icon anzeigen */}
          <img 
            src={getCurrentIcon()} 
            alt="Bot Icon" 
            className="h-4 w-4 object-contain" 
          />
          {selectedBot}
          <ChevronDown className={`h-4 w-4 opacity-50 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
        </button>

        {isDropdownOpen && (
          <>
            {/* Unsichtbarer Hintergrund zum Schließen beim Klicken außerhalb */}
            <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
            
            {/* Das Dropdown Menü */}
            <div className="absolute top-full left-0 mt-2 w-72 rounded-xl border border-zinc-200 bg-white/95 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900/95 backdrop-blur-xl z-50 overflow-hidden ring-1 ring-black/5">
              
              {/* Smart Select Bereich (wie im Screenshot oben) */}
              <div className="p-2 border-b border-zinc-100 dark:border-zinc-800/50">
                <button className="flex w-full items-center gap-3 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-3 text-left hover:from-blue-500/20 hover:to-purple-500/20 transition-colors group">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-sm">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Smart Select</div>
                    <div className="text-[10px] text-zinc-500 dark:text-zinc-400">Wählt automatisch das beste Modell</div>
                  </div>
                </button>
              </div>

              {/* Scrollbarer Bereich für die Listen */}
              <div className="max-h-[60vh] overflow-y-auto py-1">
                {modelGroups.map((group, index) => (
                  <div key={group.id}>
                    {/* Trennlinie (außer beim ersten Element) */}
                    {index > 0 && <div className="my-1 mx-3 border-t border-zinc-100 dark:border-zinc-800" />}
                    
                    {/* Gruppen-Überschrift */}
                    <div className="px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                      {group.label}
                    </div>

                    {/* Die einzelnen Bots */}
                    {group.items.map((bot) => (
                      <button
                        key={bot.name}
                        onClick={() => {
                          setSelectedBot(bot.name)
                          setIsDropdownOpen(false)
                        }}
                        className="relative flex w-full items-center gap-3 px-3 py-2 text-sm text-left hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                      >
                        <img 
                          src={bot.icon} 
                          alt={bot.name} 
                          className="h-5 w-5 object-contain opacity-80" 
                        />
                        <span className={selectedBot === bot.name ? "font-medium text-zinc-900 dark:text-zinc-100" : "text-zinc-600 dark:text-zinc-400"}>
                          {bot.name}
                        </span>
                        
                        {/* Häkchen wenn ausgewählt */}
                        {selectedBot === bot.name && (
                          <Check className="ml-auto h-4 w-4 text-blue-500" />
                        )}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </>
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