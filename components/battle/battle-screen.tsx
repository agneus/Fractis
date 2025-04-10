"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import {
  Sword,
  Shield,
  Sparkles,
  FlaskRoundIcon as Flask,
  Heart,
  Droplet,
  Clock,
  AlertTriangle,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

// Types for our battle components
type StatusEffect = {
  id: string
  name: string
  icon: React.ReactNode
  duration: number
  type: "buff" | "debuff"
}

type Character = {
  id: string
  name: string
  level: number
  portrait: string
  hp: { current: number; max: number }
  mp: { current: number; max: number }
  statusEffects: StatusEffect[]
}

type LogEntry = {
  id: string
  text: string
  type: "normal" | "player" | "enemy" | "system" | "critical"
  timestamp: Date
}

export function BattleScreen() {
  // State for battle data
  const [currentTurn, setCurrentTurn] = useState<"player" | "enemy">("player")
  const [turnCount, setTurnCount] = useState(1)
  const [isActionPhase, setIsActionPhase] = useState(true)
  const [selectedAction, setSelectedAction] = useState<string | null>(null)
  const [battleLog, setBattleLog] = useState<LogEntry[]>([
    {
      id: "log-1",
      text: "Battle started! The Shadow Sentinel emerges from the darkness.",
      type: "system",
      timestamp: new Date(),
    },
    {
      id: "log-2",
      text: "Your turn! Choose your action wisely.",
      type: "system",
      timestamp: new Date(),
    },
  ])

  // Sample character data
  const [player, setPlayer] = useState<Character>({
    id: "player-1",
    name: "Azrael Nightwhisper",
    level: 24,
    portrait: "/placeholder.svg?height=200&width=200",
    hp: { current: 420, max: 500 },
    mp: { current: 180, max: 200 },
    statusEffects: [
      {
        id: "effect-1",
        name: "Arcane Shield",
        icon: <Shield className="h-4 w-4 text-blue-400" />,
        duration: 3,
        type: "buff",
      },
    ],
  })

  const [enemy, setEnemy] = useState<Character>({
    id: "enemy-1",
    name: "Shadow Sentinel",
    level: 26,
    portrait: "/placeholder.svg?height=200&width=200",
    hp: { current: 650, max: 800 },
    mp: { current: 120, max: 150 },
    statusEffects: [
      {
        id: "effect-2",
        name: "Vulnerable",
        icon: <AlertTriangle className="h-4 w-4 text-red-400" />,
        duration: 2,
        type: "debuff",
      },
    ],
  })

  // Add a new state for tracking battle completion
  const [battleComplete, setBattleComplete] = useState(false)

  // Ref for auto-scrolling the combat log
  const logContainerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll combat log when new entries are added
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight
    }
  }, [battleLog])

  // Handle action selection
  const handleActionSelect = (action: string) => {
    setSelectedAction(action)
    setIsActionPhase(false)

    // Add log entry for the selected action
    const newLogEntry: LogEntry = {
      id: `log-${battleLog.length + 1}`,
      text: getActionText(action),
      type: "player",
      timestamp: new Date(),
    }

    setBattleLog((prev) => [...prev, newLogEntry])

    // Simulate action effect after a short delay
    setTimeout(() => {
      executePlayerAction(action)
    }, 1000)
  }

  // Get descriptive text for the selected action
  const getActionText = (action: string): string => {
    switch (action) {
      case "attack":
        return "You prepare to strike with your weapon!"
      case "defend":
        return "You take a defensive stance, preparing to block incoming attacks."
      case "skill":
        return "You channel arcane energy, preparing to cast a powerful spell."
      case "item":
        return "You reach into your pouch for a useful item."
      default:
        return "You consider your options..."
    }
  }

  // Execute player action and handle effects
  const executePlayerAction = (action: string) => {
    let damageDealt = 0
    const newEnemyHp = { ...enemy.hp }
    const newPlayerMp = { ...player.mp }
    let resultText = ""

    switch (action) {
      case "attack":
        damageDealt = Math.floor(Math.random() * 50) + 50
        newEnemyHp.current = Math.max(0, enemy.hp.current - damageDealt)
        resultText = `You strike the ${enemy.name} for ${damageDealt} damage!`
        break

      case "defend":
        // Add a defensive buff
        const newStatusEffects = [...player.statusEffects]
        if (!newStatusEffects.some((effect) => effect.name === "Defended")) {
          newStatusEffects.push({
            id: `effect-${Date.now()}`,
            name: "Defended",
            icon: <Shield className="h-4 w-4 text-green-400" />,
            duration: 2,
            type: "buff",
          })
        }
        setPlayer((prev) => ({ ...prev, statusEffects: newStatusEffects }))
        resultText = "You brace yourself, reducing incoming damage for 2 turns."
        break

      case "skill":
        // Cast a spell that costs MP
        const mpCost = 30
        if (player.mp.current >= mpCost) {
          damageDealt = Math.floor(Math.random() * 80) + 70
          newEnemyHp.current = Math.max(0, enemy.hp.current - damageDealt)
          newPlayerMp.current = player.mp.current - mpCost
          resultText = `You cast Arcane Blast, dealing ${damageDealt} damage to the ${enemy.name}!`
        } else {
          resultText = "You don't have enough mana to cast a spell!"
        }
        break

      case "item":
        // Use a healing potion
        const healAmount = Math.floor(Math.random() * 50) + 50
        const newPlayerHp = { ...player.hp }
        newPlayerHp.current = Math.min(player.hp.max, player.hp.current + healAmount)
        setPlayer((prev) => ({ ...prev, hp: newPlayerHp }))
        resultText = `You use a Healing Crystal, restoring ${healAmount} HP!`
        break
    }

    // Update enemy HP if damage was dealt
    if (damageDealt > 0) {
      setEnemy((prev) => ({ ...prev, hp: newEnemyHp }))
    }

    // Update player MP if a skill was used
    if (action === "skill" && player.mp.current >= 30) {
      setPlayer((prev) => ({ ...prev, mp: newPlayerMp }))
    }

    // Add result to combat log
    const resultLogEntry: LogEntry = {
      id: `log-${battleLog.length + 2}`,
      text: resultText,
      type: action === "attack" || action === "skill" ? "critical" : "normal",
      timestamp: new Date(),
    }

    setBattleLog((prev) => [...prev, resultLogEntry])

    // Check if enemy is defeated
    if (newEnemyHp.current <= 0) {
      handleEnemyDefeated()
      return
    }

    // Enemy turn after a delay
    setTimeout(() => {
      startEnemyTurn()
    }, 1500)
  }

  // Handle enemy turn
  const startEnemyTurn = () => {
    setCurrentTurn("enemy")

    // Add enemy turn notification to log
    const enemyTurnLog: LogEntry = {
      id: `log-${battleLog.length + 3}`,
      text: `${enemy.name}'s turn!`,
      type: "system",
      timestamp: new Date(),
    }

    setBattleLog((prev) => [...prev, enemyTurnLog])

    // Simulate enemy action after a delay
    setTimeout(() => {
      executeEnemyAction()
    }, 1500)
  }

  // Execute enemy action
  const executeEnemyAction = () => {
    // Randomly choose between attack and special ability
    const actionType = Math.random() > 0.7 ? "special" : "attack"
    let damageDealt = 0
    const newPlayerHp = { ...player.hp }
    let resultText = ""

    if (actionType === "attack") {
      damageDealt = Math.floor(Math.random() * 40) + 30

      // Check if player has defense buff
      if (player.statusEffects.some((effect) => effect.name === "Defended")) {
        damageDealt = Math.floor(damageDealt * 0.5)
        resultText = `${enemy.name} attacks! Your defense reduces the damage to ${damageDealt}!`
      } else {
        resultText = `${enemy.name} strikes you for ${damageDealt} damage!`
      }
    } else {
      damageDealt = Math.floor(Math.random() * 60) + 50

      // Check if player has defense buff
      if (player.statusEffects.some((effect) => effect.name === "Defended")) {
        damageDealt = Math.floor(damageDealt * 0.5)
        resultText = `${enemy.name} uses Shadow Strike! Your defense reduces the damage to ${damageDealt}!`
      } else {
        resultText = `${enemy.name} uses Shadow Strike, dealing ${damageDealt} damage!`
      }
    }

    // Update player HP
    newPlayerHp.current = Math.max(0, player.hp.current - damageDealt)
    setPlayer((prev) => ({ ...prev, hp: newPlayerHp }))

    // Add result to combat log
    const resultLogEntry: LogEntry = {
      id: `log-${battleLog.length + 4}`,
      text: resultText,
      type: "enemy",
      timestamp: new Date(),
    }

    setBattleLog((prev) => [...prev, resultLogEntry])

    // Check if player is defeated
    if (newPlayerHp.current <= 0) {
      handlePlayerDefeated()
      return
    }

    // Update status effect durations
    updateStatusEffects()

    // Start next turn after a delay
    setTimeout(() => {
      startNextTurn()
    }, 1500)
  }

  // Update status effects at the end of a turn
  const updateStatusEffects = () => {
    // Update player status effects
    const updatedPlayerEffects = player.statusEffects
      .map((effect) => ({ ...effect, duration: effect.duration - 1 }))
      .filter((effect) => effect.duration > 0)

    // Update enemy status effects
    const updatedEnemyEffects = enemy.statusEffects
      .map((effect) => ({ ...effect, duration: effect.duration - 1 }))
      .filter((effect) => effect.duration > 0)

    setPlayer((prev) => ({ ...prev, statusEffects: updatedPlayerEffects }))
    setEnemy((prev) => ({ ...prev, statusEffects: updatedEnemyEffects }))

    // Log expired effects
    const expiredPlayerEffects = player.statusEffects.filter((effect) => effect.duration === 1)
    const expiredEnemyEffects = enemy.statusEffects.filter((effect) => effect.duration === 1)

    expiredPlayerEffects.forEach((effect) => {
      const logEntry: LogEntry = {
        id: `log-${battleLog.length + 5}-${effect.id}`,
        text: `Your ${effect.name} effect has worn off.`,
        type: "system",
        timestamp: new Date(),
      }
      setBattleLog((prev) => [...prev, logEntry])
    })

    expiredEnemyEffects.forEach((effect) => {
      const logEntry: LogEntry = {
        id: `log-${battleLog.length + 6}-${effect.id}`,
        text: `The ${enemy.name}'s ${effect.name} effect has worn off.`,
        type: "system",
        timestamp: new Date(),
      }
      setBattleLog((prev) => [...prev, logEntry])
    })
  }

  // Start the next turn
  const startNextTurn = () => {
    setTurnCount((prev) => prev + 1)
    setCurrentTurn("player")
    setIsActionPhase(true)
    setSelectedAction(null)

    // Add new turn notification to log
    const newTurnLog: LogEntry = {
      id: `log-${battleLog.length + 7}`,
      text: `Turn ${turnCount + 1} - Your turn!`,
      type: "system",
      timestamp: new Date(),
    }

    setBattleLog((prev) => [...prev, newTurnLog])
  }

  // Handle player defeated
  const handlePlayerDefeated = () => {
    const defeatLog: LogEntry = {
      id: `log-${battleLog.length + 8}`,
      text: "You have been defeated! The darkness claims another victim...",
      type: "system",
      timestamp: new Date(),
    }

    setBattleLog((prev) => [...prev, defeatLog])

    // Set battle as complete
    setBattleComplete(true)
  }

  // Handle enemy defeated
  const handleEnemyDefeated = () => {
    const victoryLog: LogEntry = {
      id: `log-${battleLog.length + 9}`,
      text: `Victory! You have defeated the ${enemy.name}!`,
      type: "system",
      timestamp: new Date(),
    }

    const rewardsLog: LogEntry = {
      id: `log-${battleLog.length + 10}`,
      text: "You gained 250 XP and 120 Gold!",
      type: "system",
      timestamp: new Date(),
    }

    setBattleLog((prev) => [...prev, victoryLog, rewardsLog])

    // Set battle as complete
    setBattleComplete(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-purple-950 text-white">
      {/* Battle container */}
      <div className="container mx-auto px-4 py-8">
        {/* Turn indicator */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-purple-900/20 rounded-lg"></div>
          <div className="relative flex items-center justify-center py-3 px-6 bg-gray-900/70 border border-purple-800/30 rounded-lg backdrop-blur-sm">
            <Clock className="w-5 h-5 text-purple-400 mr-2" />
            <h2 className="text-xl font-bold">
              Turn {turnCount} - {currentTurn === "player" ? "Your Turn" : `${enemy.name}'s Turn`}
            </h2>

            {/* Turn indicator animation */}
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-600 to-blue-500"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: currentTurn === "player" ? 20 : 3 }}
            />
          </div>
        </div>

        {/* Main battle area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Player character card */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <CharacterCard character={player} isPlayer={true} isActive={currentTurn === "player"} />

            {/* Action buttons - only shown during player's action phase */}
            {currentTurn === "player" && isActionPhase && (
              <div className="mt-4 grid grid-cols-2 gap-3">
                <ActionButton
                  icon={<Sword className="w-5 h-5" />}
                  label="Attack"
                  onClick={() => handleActionSelect("attack")}
                />
                <ActionButton
                  icon={<Shield className="w-5 h-5" />}
                  label="Defend"
                  onClick={() => handleActionSelect("defend")}
                />
                <ActionButton
                  icon={<Sparkles className="w-5 h-5" />}
                  label="Skill"
                  onClick={() => handleActionSelect("skill")}
                />
                <ActionButton
                  icon={<Flask className="w-5 h-5" />}
                  label="Item"
                  onClick={() => handleActionSelect("item")}
                />
              </div>
            )}
          </div>

          {/* Combat log */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="bg-gray-900/70 border border-purple-800/30 rounded-xl overflow-hidden backdrop-blur-sm h-[500px] flex flex-col">
              <div className="p-4 border-b border-purple-800/30 flex items-center">
                <Sparkles className="w-5 h-5 text-purple-400 mr-2" />
                <h2 className="text-xl font-bold">Combat Log</h2>
              </div>

              {/* Scrollable log content */}
              <div
                ref={logContainerRef}
                className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-purple-800 scrollbar-track-gray-900"
              >
                {battleLog.map((entry) => (
                  <LogEntry key={entry.id} entry={entry} />
                ))}
              </div>
            </div>

            {/* Battle scene visualization */}
            <div className="mt-4 relative h-32 bg-gray-900/50 border border-purple-800/30 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-transparent to-blue-900/10"></div>

              {/* Player position */}
              <div className="absolute bottom-4 left-8">
                <div className="w-16 h-16 bg-purple-900/50 rounded-full border-2 border-purple-500/50 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-purple-400" />
                </div>
              </div>

              {/* Enemy position */}
              <div className="absolute bottom-4 right-8">
                <div className="w-16 h-16 bg-gray-900/50 rounded-full border-2 border-red-500/50 flex items-center justify-center">
                  <Sword className="w-8 h-8 text-red-400" />
                </div>
              </div>

              {/* Attack animation */}
              {selectedAction === "attack" && (
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-red-500"
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 100, opacity: [0, 1, 0] }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                >
                  <ArrowRight className="w-full h-full" />
                </motion.div>
              )}

              {/* Skill animation */}
              {selectedAction === "skill" && (
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-purple-500"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 2, opacity: [0, 1, 0] }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                >
                  <Sparkles className="w-full h-full" />
                </motion.div>
              )}
            </div>
          </div>

          {/* Enemy character card */}
          <div className="lg:col-span-3 order-3">
            <CharacterCard character={enemy} isPlayer={false} isActive={currentTurn === "enemy"} />
          </div>
        </div>

        {/* Return to Dashboard button - only shown when battle is complete */}
        {battleComplete && (
          <div className="mt-6 text-center">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg" asChild>
              <Link href="/dashboard">Return to Dashboard</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

// Character card component
function CharacterCard({
  character,
  isPlayer,
  isActive,
}: {
  character: Character
  isPlayer: boolean
  isActive: boolean
}) {
  const hpPercent = (character.hp.current / character.hp.max) * 100
  const mpPercent = (character.mp.current / character.mp.max) * 100

  return (
    <div
      className={cn(
        "bg-gray-900/70 border rounded-xl overflow-hidden backdrop-blur-sm transition-all duration-300",
        isActive ? "border-purple-500/50 shadow-lg shadow-purple-500/20" : "border-purple-800/30",
        isPlayer
          ? "bg-gradient-to-br from-purple-900/30 to-gray-900/70"
          : "bg-gradient-to-br from-gray-900/70 to-red-900/30",
      )}
    >
      {/* Character header */}
      <div className="p-4 border-b border-purple-800/30 flex justify-between items-center">
        <div className="flex items-center">
          {isPlayer ? (
            <Shield className="w-5 h-5 text-purple-400 mr-2" />
          ) : (
            <Sword className="w-5 h-5 text-red-400 mr-2" />
          )}
          <h3 className="font-bold text-lg">{character.name}</h3>
        </div>
        <div className="px-2 py-1 rounded-full bg-gray-800 text-xs font-medium text-purple-300 border border-purple-500/30">
          Lvl {character.level}
        </div>
      </div>

      {/* Character portrait */}
      <div className="relative aspect-square bg-gradient-to-b from-gray-800/50 to-gray-900/50 flex items-center justify-center">
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-purple-500/50 bg-gray-800">
          <img
            src={character.portrait || "/placeholder.svg"}
            alt={character.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Active indicator */}
        {isActive && (
          <motion.div
            className="absolute inset-0 border-2 border-purple-500 rounded-none"
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
        )}

        {/* Status effects */}
        {character.statusEffects.length > 0 && (
          <div className="absolute top-2 right-2 flex flex-col gap-2">
            {character.statusEffects.map((effect) => (
              <div
                key={effect.id}
                className={cn(
                  "w-8 h-8 rounded-md flex items-center justify-center",
                  effect.type === "buff" ? "bg-green-900/70" : "bg-red-900/70",
                )}
                title={`${effect.name} (${effect.duration} turns)`}
              >
                {effect.icon}
                <span className="absolute -bottom-1 -right-1 bg-gray-900 text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {effect.duration}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Character stats */}
      <div className="p-4 space-y-3">
        {/* HP Bar */}
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Heart className="w-4 h-4 text-red-400 mr-1" />
              <span className="text-sm font-medium">HP</span>
            </div>
            <span className="text-sm">
              {character.hp.current}/{character.hp.max}
            </span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-500",
                hpPercent > 50
                  ? "bg-gradient-to-r from-green-600 to-green-400"
                  : hpPercent > 25
                    ? "bg-gradient-to-r from-yellow-600 to-yellow-400"
                    : "bg-gradient-to-r from-red-700 to-red-500",
              )}
              style={{ width: `${hpPercent}%` }}
            />
          </div>
        </div>

        {/* MP Bar */}
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Droplet className="w-4 h-4 text-blue-400 mr-1" />
              <span className="text-sm font-medium">MP</span>
            </div>
            <span className="text-sm">
              {character.mp.current}/{character.mp.max}
            </span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-500"
              style={{ width: `${mpPercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// Action button component
function ActionButton({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  onClick: () => void
}) {
  return (
    <Button
      className="h-14 bg-gray-800/70 hover:bg-purple-900/70 border border-purple-800/30 hover:border-purple-500/50 text-white flex flex-col items-center justify-center gap-1 p-1"
      onClick={onClick}
    >
      {icon}
      <span className="text-xs">{label}</span>
    </Button>
  )
}

// Log entry component
function LogEntry({ entry }: { entry: LogEntry }) {
  return (
    <div
      className={cn(
        "py-1 px-2 rounded text-sm",
        entry.type === "player"
          ? "bg-purple-900/20 border-l-2 border-purple-500"
          : entry.type === "enemy"
            ? "bg-red-900/20 border-l-2 border-red-500"
            : entry.type === "critical"
              ? "bg-yellow-900/20 border-l-2 border-yellow-500 font-medium"
              : entry.type === "system"
                ? "bg-blue-900/20 border-l-2 border-blue-500 italic"
                : "bg-gray-800/20",
      )}
    >
      <span className="text-xs text-gray-400 mr-2">
        {entry.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
      </span>
      {entry.text}
    </div>
  )
}
