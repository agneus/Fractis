"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

// Placeholder narrative content
const narrativeContent = [
  {
    id: "intro",
    text: "The ancient crystal hums with arcane energy as you approach. Its fractured surface reflects your face in a thousand tiny mirrors, each showing a slightly different version of yourself. The Fractal Shard responds to your presence, its glow intensifying.",
    choices: [
      { id: "examine", text: "Examine the crystal more closely", nextId: "examine" },
      { id: "touch", text: "Touch the crystal", nextId: "touch" },
    ],
  },
  {
    id: "examine",
    text: "You lean in, studying the intricate patterns etched into the crystal's surface. Ancient runes pulse with blue light, forming sequences you recognize from the Codex of Arcana. This Fractal Shard appears to be a key component in stabilizing the rift between the technological and magical realms.",
    choices: [
      { id: "touch-after-examine", text: "Touch the crystal", nextId: "touch" },
      { id: "record", text: "Record the rune patterns", nextId: "record" },
    ],
  },
  {
    id: "touch",
    text: "As your fingers make contact with the crystal's surface, a surge of energy courses through your body. Visions flood your mind: a great city divided, machines infused with magic, a looming darkness. Suddenly, the ground trembles. The crystal's glow turns crimson, and a warning echoes in your mind: \"Defender, prepare yourself. They come.\"",
    choices: [
      { id: "prepare", text: "Ready your weapons", nextId: "battle" },
      { id: "retreat", text: "Step back from the crystal", nextId: "retreat" },
    ],
  },
  {
    id: "record",
    text: "You carefully document the rune patterns in your codex. As you sketch the final symbol, the patterns begin to shift and rearrange themselves. The crystal responds to your scholarly attention, revealing deeper layers of information. Your codex glows faintly, now imbued with new arcane knowledge.",
    choices: [
      { id: "study", text: "Study the new information", nextId: "study" },
      { id: "touch-after-record", text: "Touch the crystal", nextId: "touch" },
    ],
  },
  {
    id: "retreat",
    text: "You step back from the crystal, but it's too late. The energy has already established a connection with you. The ground continues to shake as dark figures materialize around you, their forms flickering between flesh and machine. They raise their weapons, eyes fixed on both you and the Fractal Shard.",
    choices: [
      { id: "fight", text: "Stand and fight", nextId: "battle" },
      { id: "negotiate", text: "Attempt to communicate", nextId: "negotiate" },
    ],
  },
  {
    id: "battle",
    text: "The air crackles with tension as shadowy figures emerge from rifts in reality. Their forms shift between organic and mechanical, weapons humming with corrupted energy. The Fractal Shard pulses urgently behind you. This will be your first test as a defender of the balance.",
    choices: [
      { id: "battle-start", text: "Enter Battle", nextId: "battle-redirect", redirect: "/battle" },
      { id: "strategic-retreat", text: "Look for tactical advantage", nextId: "strategic-retreat" },
    ],
  },
]

export function NarrativeSection() {
  const [currentNarrative, setCurrentNarrative] = useState(narrativeContent[0])
  const [isTyping, setIsTyping] = useState(true)
  const [displayedText, setDisplayedText] = useState("")
  const [typingSpeed] = useState(30) // ms per character

  // Simulate typing effect
  useEffect(() => {
    setIsTyping(true)
    setDisplayedText("")

    let i = 0
    const text = currentNarrative.text

    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i))
        i++
      } else {
        clearInterval(typingInterval)
        setIsTyping(false)
      }
    }, typingSpeed)

    return () => clearInterval(typingInterval)
  }, [currentNarrative, typingSpeed])

  // Handle choice selection
  const handleChoice = (choice) => {
    const nextNarrative = narrativeContent.find((n) => n.id === choice.nextId)
    if (nextNarrative) {
      setCurrentNarrative(nextNarrative)
    }
  }

  return (
    <div className="bg-gray-900/70 border border-purple-800/30 rounded-xl overflow-hidden backdrop-blur-sm">
      <div className="p-4 border-b border-purple-800/30 flex items-center">
        <Sparkles className="w-5 h-5 text-purple-400 mr-2" />
        <h2 className="text-xl font-bold">The Fractured Realms</h2>
      </div>

      <div className="p-6 min-h-[300px] flex flex-col">
        {/* Narrative text with typing effect */}
        <div className="prose prose-invert prose-sm max-w-none mb-6">
          <p className="leading-relaxed">{displayedText}</p>
          <span
            className={cn("inline-block w-2 h-4 bg-purple-400 ml-1", isTyping ? "animate-pulse" : "opacity-0")}
          ></span>
        </div>

        {/* Choice buttons */}
        <div className="mt-auto space-y-3">
          {!isTyping &&
            currentNarrative.choices.map((choice) =>
              choice.redirect ? (
                <Button
                  key={choice.id}
                  className="w-full justify-start bg-purple-800/50 hover:bg-purple-700/70 border border-purple-500/30 text-white text-left"
                  asChild
                >
                  <Link href={choice.redirect}>
                    <span className="flex-1">{choice.text}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-2"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </Link>
                </Button>
              ) : (
                <Button
                  key={choice.id}
                  className="w-full justify-start bg-gray-800/50 hover:bg-gray-700/70 border border-gray-600/30 text-white text-left"
                  onClick={() => handleChoice(choice)}
                >
                  {choice.text}
                </Button>
              ),
            )}
        </div>
      </div>
    </div>
  )
}
