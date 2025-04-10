"use client"

import { useState } from "react"
import { Progress } from "@/components/ui/progress"
import { Shield, Sword, Zap, Brain, Heart, Droplet } from "lucide-react"
import { cn } from "@/lib/utils"

export function PlayerStatsPanel() {
  const [isExpanded, setIsExpanded] = useState(false)

  // Placeholder player data
  const player = {
    name: "Azrael Nightwhisper",
    level: 24,
    class: "Arcane Sentinel",
    portrait: "/placeholder.svg?height=200&width=200",
    health: {
      current: 420,
      max: 500,
      percent: 84,
    },
    mana: {
      current: 180,
      max: 200,
      percent: 90,
    },
    experience: {
      current: 8750,
      next: 10000,
      percent: 87.5,
    },
    attributes: {
      strength: 42,
      intelligence: 68,
      agility: 35,
      defense: 50,
      arcane: 75,
    },
  }

  return (
    <div className="bg-gray-900/70 border border-purple-800/30 rounded-xl overflow-hidden backdrop-blur-sm transition-all duration-300">
      {/* Header with portrait and basic info */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-gray-900/0"></div>
        <div className="relative p-4 flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-purple-500/50 bg-gray-800">
              <img
                src={player.portrait || "/placeholder.svg"}
                alt={player.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-purple-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border border-purple-300">
              {player.level}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold truncate">{player.name}</h3>
            <p className="text-sm text-purple-300">{player.class}</p>
          </div>
        </div>
      </div>

      {/* Vital stats (HP/MP/XP) */}
      <div className="px-4 pb-2 space-y-2">
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-red-400 flex-shrink-0" />
          <div className="flex-1">
            <div className="flex justify-between text-xs mb-1">
              <span>Health</span>
              <span>
                {player.health.current}/{player.health.max}
              </span>
            </div>
            <Progress
              value={player.health.percent}
              className="h-2 bg-gray-800"
              indicatorClassName="bg-gradient-to-r from-red-600 to-red-400"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Droplet className="w-4 h-4 text-blue-400 flex-shrink-0" />
          <div className="flex-1">
            <div className="flex justify-between text-xs mb-1">
              <span>Mana</span>
              <span>
                {player.mana.current}/{player.mana.max}
              </span>
            </div>
            <Progress
              value={player.mana.percent}
              className="h-2 bg-gray-800"
              indicatorClassName="bg-gradient-to-r from-blue-600 to-blue-400"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-yellow-400 flex-shrink-0" />
          <div className="flex-1">
            <div className="flex justify-between text-xs mb-1">
              <span>Experience</span>
              <span>{Math.floor(player.experience.percent)}%</span>
            </div>
            <Progress
              value={player.experience.percent}
              className="h-2 bg-gray-800"
              indicatorClassName="bg-gradient-to-r from-yellow-600 to-yellow-400"
            />
          </div>
        </div>
      </div>

      {/* Expandable attributes section */}
      <div className={cn("overflow-hidden transition-all duration-300", isExpanded ? "max-h-60" : "max-h-0")}>
        <div className="px-4 pb-4 pt-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <Sword className="w-4 h-4 text-orange-400" />
              <div>
                <div className="text-xs text-gray-400">Strength</div>
                <div className="font-medium">{player.attributes.strength}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-blue-400" />
              <div>
                <div className="text-xs text-gray-400">Intelligence</div>
                <div className="font-medium">{player.attributes.intelligence}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <div>
                <div className="text-xs text-gray-400">Agility</div>
                <div className="font-medium">{player.attributes.agility}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-gray-400" />
              <div>
                <div className="text-xs text-gray-400">Defense</div>
                <div className="font-medium">{player.attributes.defense}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toggle button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full py-1.5 text-xs text-purple-300 hover:text-white bg-gray-800/50 hover:bg-gray-800 transition-colors flex items-center justify-center"
      >
        {isExpanded ? "Hide Details" : "Show Details"}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`ml-1 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
    </div>
  )
}
