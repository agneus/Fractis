"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Shield, Sword, Sparkles, Heart, Plus, User, CheckCircle2, ArrowRight, Footprints, Flame } from "lucide-react"
import { useRouter } from "next/navigation"
import { useCharacter, Character, CharacterClass } from "@/context/character-context"

export default function CharactersPage() {
  const router = useRouter()
  const [isCreating, setIsCreating] = useState(false)
  const { 
    characters, 
    selectedCharacterId, 
    setSelectedCharacterId,
    newCharacter, 
    setNewCharacter, 
    addCharacter,
    updateCharacter,
    selectCharacter,
    resetNewCharacter,
    getClassPortrait
  } = useCharacter()

  // Character class options
  const characterClasses = [
    {
      id: "warrior",
      name: "Warrior",
      icon: <Sword className="h-5 w-5" />,
      color: "text-red-400",
      description: "Masters of melee combat who rely on strength and heavy armor.",
    },
    {
      id: "mage",
      name: "Mage",
      icon: <Sparkles className="h-5 w-5" />,
      color: "text-blue-400",
      description: "Wielders of arcane energy who cast powerful spells from a distance.",
    },
    {
      id: "rogue",
      name: "Rogue",
      icon: <Footprints className="h-5 w-5" />,
      color: "text-green-400",
      description: "Agile fighters who excel at stealth, precision, and critical strikes.",
    },
    {
      id: "healer",
      name: "Healer",
      icon: <Heart className="h-5 w-5" />,
      color: "text-pink-400",
      description: "Supportive characters who can restore health and provide buffs.",
    },
    {
      id: "sentinel",
      name: "Sentinel",
      icon: <Shield className="h-5 w-5" />,
      color: "text-purple-400",
      description: "Defensive specialists who protect allies and control the battlefield.",
    },
  ]

  // Get class icon based on class name
  const getClassIcon = (className: CharacterClass) => {
    const classInfo = characterClasses.find((c) => c.id === className)
    return classInfo ? classInfo.icon : <User className="h-5 w-5" />
  }

  // Get class color based on class name
  const getClassColor = (className: CharacterClass) => {
    const classInfo = characterClasses.find((c) => c.id === className)
    return classInfo ? classInfo.color : "text-gray-400"
  }

  // Handle character creation
  const handleCreateCharacter = () => {
    if (!newCharacter.name || !newCharacter.class) return

    addCharacter({
      name: newCharacter.name,
      class: newCharacter.class,
      portrait: getClassPortrait(newCharacter.class),
    })
    
    setIsCreating(false)
    resetNewCharacter()
  }

  // Handle character selection and play
  const handlePlayCharacter = () => {
    if (selectedCharacterId) {
      // Select character will update the last played time
      selectCharacter(selectedCharacterId)

      // Redirect to dashboard
      router.push("/dashboard")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-purple-950 text-white">
      <Header />

      <main className="pt-24 pb-20">
        <PageHeader
          title="Character Selection"
          description="Choose your champion from a diverse roster of heroes, each with unique abilities and backstories."
        />

        <div className="container mx-auto px-4 mt-8">
          {/* Character Selection */}
          <div className="bg-gray-900/70 border border-purple-800/30 rounded-xl overflow-hidden backdrop-blur-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Your Characters</h2>
              <Button onClick={() => setIsCreating(true)} className="bg-purple-600 hover:bg-purple-700 text-white">
                <Plus className="mr-2 h-4 w-4" />
                Create New Character
              </Button>
            </div>

            {characters.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex h-20 w-20 rounded-full bg-gray-800/50 items-center justify-center mb-4">
                  <User className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">No Characters Found</h3>
                <p className="text-gray-400 mb-6">Create your first character to begin your journey</p>
                <Button onClick={() => setIsCreating(true)} className="bg-purple-600 hover:bg-purple-700 text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Character
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {characters.map((character) => (
                  <div
                    key={character.id}
                    className={`
                      relative rounded-lg border overflow-hidden transition-all duration-200
                      ${
                        selectedCharacterId === character.id
                          ? "border-purple-500 shadow-lg shadow-purple-500/20"
                          : "border-gray-800 hover:border-purple-800"
                      }
                    `}
                    onClick={() => setSelectedCharacterId(character.id)}
                  >
                    <div className="absolute top-3 right-3 z-10">
                      {selectedCharacterId === character.id && (
                        <div className="bg-purple-600 rounded-full p-1">
                          <CheckCircle2 className="h-5 w-5" />
                        </div>
                      )}
                    </div>

                    <div className="aspect-[3/4] bg-gradient-to-b from-gray-800/50 to-gray-900/80 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full bg-gray-800 overflow-hidden">
                          <img
                            src={character.portrait || "/placeholder.svg"}
                            alt={character.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-4">
                        <div className="flex items-center gap-2">
                          <div className={`${getClassColor(character.class)}`}>{getClassIcon(character.class)}</div>
                          <span className="text-sm font-medium">
                            {character.class.charAt(0).toUpperCase() + character.class.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-1">{character.name}</h3>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Flame className="h-4 w-4 text-orange-400" />
                          <span className="text-sm">Level {character.level}</span>
                        </div>
                        {character.lastPlayed && (
                          <span className="text-xs text-gray-400">
                            Last played: {character.lastPlayed.toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Play button */}
            {selectedCharacterId && (
              <div className="mt-8 flex justify-center">
                <Button
                  onClick={handlePlayCharacter}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 h-auto text-lg group"
                >
                  <span>Play Selected Character</span>
                  <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Character Creation Sheet */}
      <Sheet open={isCreating} onOpenChange={setIsCreating}>
        <SheetContent className="sm:max-w-md bg-gray-900 border-purple-800/30 text-white overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-white">Create New Character</SheetTitle>
            <SheetDescription className="text-gray-400">
              Choose a class and name for your new character
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-6 pb-10">
            {/* Character Portrait Preview */}
            <div className="flex justify-center">
              <div className="w-32 h-32 rounded-full bg-gray-800 overflow-hidden border-2 border-purple-500/50">
                <img
                  src={getClassPortrait(newCharacter.class) || "/placeholder.svg"}
                  alt="Character Portrait"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Class Selection */}
            <div className="space-y-3">
              <Label className="text-white">Character Class</Label>
              <RadioGroup
                value={newCharacter.class || ""}
                onValueChange={(value) => setNewCharacter({ ...newCharacter, class: value as CharacterClass })}
              >
                <div className="grid grid-cols-1 gap-3">
                  {characterClasses.map((charClass) => (
                    <div key={charClass.id} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={charClass.id}
                        id={charClass.id}
                        className="border-purple-500 text-purple-500"
                      />
                      <Label htmlFor={charClass.id} className="flex items-center cursor-pointer w-full">
                        <div className={`mr-2 ${charClass.color}`}>{charClass.icon}</div>
                        <div>
                          <div className="font-medium">{charClass.name}</div>
                          <div className="text-xs text-gray-400">{charClass.description}</div>
                        </div>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {/* Character Name */}
            <div className="space-y-3">
              <Label htmlFor="character-name" className="text-white">
                Character Name
              </Label>
              <Input
                id="character-name"
                value={newCharacter.name}
                onChange={(e) => setNewCharacter({ ...newCharacter, name: e.target.value })}
                placeholder="Enter character name"
                className="bg-gray-800 border-gray-700 text-white focus:border-purple-500"
              />
            </div>

            {/* Create Button */}
            <div className="pt-4">
              <Button
                onClick={handleCreateCharacter}
                disabled={!newCharacter.name || !newCharacter.class}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white disabled:bg-gray-700 disabled:text-gray-400"
              >
                Create Character
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <Footer />
    </div>
  )
}
