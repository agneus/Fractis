"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Character class types
export type CharacterClass = "warrior" | "mage" | "rogue" | "healer" | "sentinel";

// Character stats and attributes
export type CharacterStats = {
  health: {
    current: number;
    max: number;
  };
  mana: {
    current: number;
    max: number;
  };
  experience: {
    current: number;
    next: number;
  };
  attributes: {
    strength: number;
    intelligence: number;
    agility: number;
    defense: number;
    arcane: number;
  };
};

// Character data type
export type Character = {
  id: string;
  name: string;
  class: CharacterClass;
  level: number;
  portrait: string;
  lastPlayed?: Date;
  stats: CharacterStats;
};

export type CharacterContextType = {
  characters: Character[];
  selectedCharacterId: string | null;
  newCharacter: {
    name: string;
    class: CharacterClass | null;
  };
  setCharacters: (characters: Character[]) => void;
  setSelectedCharacterId: (id: string | null) => void;
  setNewCharacter: (character: { name: string; class: CharacterClass | null }) => void;
  addCharacter: (character: Omit<Character, "id" | "lastPlayed" | "level" | "stats">) => void;
  updateCharacter: (id: string, character: Partial<Character>) => void;
  selectCharacter: (id: string) => void;
  getSelectedCharacter: () => Character | undefined;
  resetNewCharacter: () => void;
  getClassPortrait: (className: CharacterClass | null) => string;
  calculateStats: (character: Pick<Character, "class" | "level">) => CharacterStats;
};

const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

export function CharacterProvider({ children }: { children: ReactNode }) {
  // Helper function to calculate stats based on class and level
  const calculateStats = (character: Pick<Character, "class" | "level">): CharacterStats => {
    const { class: charClass, level } = character;
    
    // Base health and mana
    const healthMax = Math.floor(level * 20 + 100);
    const manaMax = Math.floor(level * 8 + 40);
    
    // Base attributes with class bonuses
    const strength = charClass === "warrior" ? level * 2 + 20 : level + 10;
    const intelligence = charClass === "mage" ? level * 2 + 20 : level + 10;
    const agility = charClass === "rogue" ? level * 2 + 20 : level + 10;
    const defense = charClass === "sentinel" ? level * 2 + 20 : level + 10;
    const arcane = charClass === "mage" ? level * 2 + 20 : level + 10;
    
    return {
      health: {
        current: healthMax, // Full health by default
        max: healthMax,
      },
      mana: {
        current: manaMax, // Full mana by default
        max: manaMax,
      },
      experience: {
        current: Math.floor(level * 500 - 250),
        next: level * 500,
      },
      attributes: {
        strength,
        intelligence,
        agility,
        defense,
        arcane,
      },
    };
  };

  const [characters, setCharacters] = useState<Character[]>([
    {
      id: "char-1",
      name: "Azrael Nightwhisper",
      class: "mage",
      level: 24,
      portrait: "/placeholder.svg?height=200&width=200",
      lastPlayed: new Date(Date.now() - 86400000), // 1 day ago
      stats: calculateStats({ class: "mage", level: 24 }),
    },
    {
      id: "char-2",
      name: "Thorne Ironheart",
      class: "warrior",
      level: 18,
      portrait: "/placeholder.svg?height=200&width=200",
      lastPlayed: new Date(Date.now() - 604800000), // 1 week ago
      stats: calculateStats({ class: "warrior", level: 18 }),
    },
  ]);
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null);
  const [newCharacter, setNewCharacter] = useState<{
    name: string;
    class: CharacterClass | null;
  }>({
    name: "",
    class: null,
  });

  // Get class portrait based on class name
  const getClassPortrait = (className: CharacterClass | null) => {
    if (!className) return "/placeholder.svg?height=300&width=300";

    switch (className) {
      case "warrior":
        return "/placeholder.svg?height=300&width=300&text=Warrior";
      case "mage":
        return "/placeholder.svg?height=300&width=300&text=Mage";
      case "rogue":
        return "/placeholder.svg?height=300&width=300&text=Rogue";
      case "healer":
        return "/placeholder.svg?height=300&width=300&text=Healer";
      case "sentinel":
        return "/placeholder.svg?height=300&width=300&text=Sentinel";
      default:
        return "/placeholder.svg?height=300&width=300";
    }
  };

  const addCharacter = (character: Omit<Character, "id" | "lastPlayed" | "level" | "stats">) => {
    const level = 1;
    const newChar: Character = {
      id: `char-${Date.now()}`,
      name: character.name,
      class: character.class,
      level,
      portrait: character.portrait || getClassPortrait(character.class),
      lastPlayed: new Date(),
      stats: calculateStats({ class: character.class, level }),
    };

    setCharacters((prevCharacters) => [...prevCharacters, newChar]);
    setSelectedCharacterId(newChar.id);
    return newChar;
  };

  const updateCharacter = (id: string, characterData: Partial<Character>) => {
    setCharacters((prevCharacters) =>
      prevCharacters.map((char) => {
        if (char.id === id) {
          const updatedChar = { ...char, ...characterData };
          
          // Recalculate stats if level or class changed
          if (characterData.level || characterData.class) {
            updatedChar.stats = calculateStats({
              class: updatedChar.class,
              level: updatedChar.level,
            });
          }
          
          return updatedChar;
        }
        return char;
      })
    );
  };

  const selectCharacter = (id: string) => {
    setSelectedCharacterId(id);
    // Update last played time
    updateCharacter(id, { lastPlayed: new Date() });
  };

  const getSelectedCharacter = () => {
    return characters.find((char) => char.id === selectedCharacterId);
  };

  const resetNewCharacter = () => {
    setNewCharacter({ name: "", class: null });
  };

  return (
    <CharacterContext.Provider
      value={{
        characters,
        selectedCharacterId,
        newCharacter,
        setCharacters,
        setSelectedCharacterId,
        setNewCharacter,
        addCharacter,
        updateCharacter,
        selectCharacter,
        getSelectedCharacter,
        resetNewCharacter,
        getClassPortrait,
        calculateStats,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
}

export function useCharacter() {
  const context = useContext(CharacterContext);
  if (context === undefined) {
    throw new Error("useCharacter must be used within a CharacterProvider");
  }
  return context;
}
