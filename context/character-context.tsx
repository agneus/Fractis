"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Character class types
export type CharacterClass = "warrior" | "mage" | "rogue" | "healer" | "sentinel";

// Character data type
export type Character = {
  id: string;
  name: string;
  class: CharacterClass;
  level: number;
  portrait: string;
  lastPlayed?: Date;
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
  addCharacter: (character: Omit<Character, "id" | "lastPlayed" | "level">) => void;
  updateCharacter: (id: string, character: Partial<Character>) => void;
  selectCharacter: (id: string) => void;
  getSelectedCharacter: () => Character | undefined;
  resetNewCharacter: () => void;
  getClassPortrait: (className: CharacterClass | null) => string;
};

const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

export function CharacterProvider({ children }: { children: ReactNode }) {
  const [characters, setCharacters] = useState<Character[]>([
    {
      id: "char-1",
      name: "Azrael Nightwhisper",
      class: "mage",
      level: 24,
      portrait: "/placeholder.svg?height=200&width=200",
      lastPlayed: new Date(Date.now() - 86400000), // 1 day ago
    },
    {
      id: "char-2",
      name: "Thorne Ironheart",
      class: "warrior",
      level: 18,
      portrait: "/placeholder.svg?height=200&width=200",
      lastPlayed: new Date(Date.now() - 604800000), // 1 week ago
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

  const addCharacter = (character: Omit<Character, "id" | "lastPlayed" | "level">) => {
    const newChar: Character = {
      id: `char-${Date.now()}`,
      name: character.name,
      class: character.class,
      level: 1,
      portrait: character.portrait || getClassPortrait(character.class),
      lastPlayed: new Date(),
    };

    setCharacters((prevCharacters) => [...prevCharacters, newChar]);
    setSelectedCharacterId(newChar.id);
    return newChar;
  };

  const updateCharacter = (id: string, characterData: Partial<Character>) => {
    setCharacters((prevCharacters) =>
      prevCharacters.map((char) =>
        char.id === id ? { ...char, ...characterData } : char
      )
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
