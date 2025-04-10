"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useStory, StoryChoice } from "@/context/story-context"
import { useCharacter } from "@/context/character-context"

export function NarrativeSection() {
  const router = useRouter()
  const { 
    currentNarrative, 
    displayedText, 
    isTyping, 
    handleChoice,
    skipTyping,
    storyAttributes
  } = useStory()
  
  const { getSelectedCharacter } = useCharacter()
  const selectedCharacter = getSelectedCharacter()

  // Process choice selection with redirect handling
  const processChoice = (choice: StoryChoice) => {
    if (choice.redirect) {
      // Handle redirection to other pages
      handleChoice(choice)
      router.push(choice.redirect)
    } else {
      // Normal choice processing
      handleChoice(choice)
    }
  }

  return (
    <div className="bg-gray-900/70 border border-purple-800/30 rounded-xl overflow-hidden backdrop-blur-sm">
      <div className="p-4 border-b border-purple-800/30 flex items-center justify-between">
        <div className="flex items-center">
          <Sparkles className="w-5 h-5 text-purple-400 mr-2" />
          <h2 className="text-xl font-bold">The Fractured Realms</h2>
        </div>
        {/* Display some story attributes as badges */}
        <div className="flex space-x-2 text-xs">
          {storyAttributes.heroism > 0 && (
            <span className="px-2 py-1 bg-red-900/50 text-red-200 rounded-md">
              Heroism {storyAttributes.heroism}
            </span>
          )}
          {storyAttributes.mysticism > 0 && (
            <span className="px-2 py-1 bg-blue-900/50 text-blue-200 rounded-md">
              Mysticism {storyAttributes.mysticism}
            </span>
          )}
          {storyAttributes.diplomacy > 0 && (
            <span className="px-2 py-1 bg-green-900/50 text-green-200 rounded-md">
              Diplomacy {storyAttributes.diplomacy}
            </span>
          )}
        </div>
      </div>

      <div className="p-6 min-h-[300px] flex flex-col">
        {/* Narrative text with typing effect */}
        <div className="prose prose-invert prose-sm max-w-none mb-6">
          <p className="leading-relaxed">{displayedText}</p>
          <span
            className={cn("inline-block w-2 h-4 bg-purple-400 ml-1", isTyping ? "animate-pulse" : "opacity-0")}
          ></span>
          {isTyping && (
            <Button 
              variant="link" 
              size="sm" 
              onClick={skipTyping}
              className="text-purple-400 hover:text-purple-300 -ml-1 mt-2"
            >
              Skip
            </Button>
          )}
        </div>
        
        {/* Experience reward indicator if present */}
        {!isTyping && currentNarrative.rewards?.experience && selectedCharacter && (
          <div className="mb-4 text-xs text-amber-300 flex items-center">
            <Sparkles className="w-3 h-3 mr-2" />
            +{currentNarrative.rewards.experience} experience gained
          </div>
        )}

        {/* Choice buttons */}
        <div className="mt-auto space-y-3">
          {!isTyping &&
            currentNarrative.choices.map((choice) => {
              // Check if choice has requirements and if they're met
              const hasRequirements = choice.requires && 
                (choice.requires.attribute || choice.requires.minValue || choice.requires.item);
              
              // If character is needed for requirements but not selected, disable
              const requirementsNotMet = hasRequirements && (!selectedCharacter || 
                (choice.requires?.attribute && choice.requires.minValue && 
                 selectedCharacter.stats.attributes[
                   mapStoryAttributeToCharacter(choice.requires.attribute)
                 ] < choice.requires.minValue));
              
              return choice.redirect ? (
                <Button
                  key={choice.id}
                  className={cn(
                    "w-full justify-start bg-purple-800/50 hover:bg-purple-700/70 border border-purple-500/30 text-white text-left",
                    requirementsNotMet && "opacity-50 cursor-not-allowed"
                  )}
                  onClick={() => !requirementsNotMet && processChoice(choice)}
                  disabled={requirementsNotMet || false}
                >
                  <span className="flex-1">{choice.text}</span>
                  {requirementsNotMet && choice.requires?.attribute && choice.requires.minValue && (
                    <span className="text-xs text-red-300 mr-2">
                      Requires {choice.requires.attribute} {choice.requires.minValue}+
                    </span>
                  )}
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
                </Button>
              ) : (
                <Button
                  key={choice.id}
                  className="w-full justify-start bg-gray-800/50 hover:bg-gray-700/70 border border-gray-600/30 text-white text-left"
                  onClick={() => handleChoice(choice)}
                >
                  {choice.text}
                </Button>
              )
            })}
        </div>
      </div>
    </div>
  )
}

// Helper function to map story attributes to character attributes
function mapStoryAttributeToCharacter(storyAttr: keyof StoryAttributes): keyof typeof characterAttributeMap {
  return characterAttributeMap[storyAttr] || 'strength';
}

// Map between story attributes and character attributes
const characterAttributeMap = {
  heroism: 'strength',
  cunning: 'agility',
  mysticism: 'arcane',
  diplomacy: 'intelligence',
  corruption: 'defense'
} as const;
