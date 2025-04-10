"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useCharacter } from "./character-context";

// Types for story elements
export type StoryChoice = {
  id: string;
  text: string;
  nextId: string;
  redirect?: string;
  requires?: {
    attribute?: keyof StoryAttributes;
    minValue?: number;
    item?: string;
  };
};

export type StoryNode = {
  id: string;
  text: string;
  choices: StoryChoice[];
  background?: string;
  musicTrack?: string;
  rewards?: {
    experience?: number;
    items?: string[];
    currency?: number;
  };
};

export type StoryHistoryEntry = {
  nodeId: string;
  choiceId: string | null;
  timestamp: Date;
};

export type StoryAttributes = {
  heroism: number;
  cunning: number;
  mysticism: number;
  diplomacy: number;
  corruption: number;
};

export type StoryContextType = {
  narrativeContent: StoryNode[];
  currentNarrative: StoryNode;
  storyHistory: StoryHistoryEntry[];
  displayedText: string;
  isTyping: boolean;
  typingSpeed: number;
  storyAttributes: StoryAttributes;
  
  // Methods
  setCurrentNarrativeById: (id: string) => void;
  handleChoice: (choice: StoryChoice) => void;
  skipTyping: () => void;
  setTypingSpeed: (speed: number) => void;
  resetStory: () => void;
  updateStoryAttribute: (attribute: keyof StoryAttributes, value: number) => void;
  getStoryProgress: () => number;
  addCustomStoryNode: (node: StoryNode) => void;
};

const initialStoryAttributes: StoryAttributes = {
  heroism: 0,
  cunning: 0,
  mysticism: 0,
  diplomacy: 0,
  corruption: 0,
};

// Initial narrative content - same as what was in narrative-section.tsx
const initialNarrativeContent: StoryNode[] = [
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
    rewards: {
      experience: 50,
    },
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
  {
    id: "negotiate",
    text: "You raise your hands in a peaceful gesture and attempt to communicate. The figures pause, their mechanical components whirring as they process your action. One steps forward, its voice a discordant blend of human speech and digital distortion: \"The Fractal Shards belong to the Convergence. Your presence is... unexpected.\"",
    choices: [
      { id: "question", text: "Ask about the Convergence", nextId: "question-convergence" },
      { id: "refuse", text: "Refuse to surrender the shard", nextId: "battle" },
    ],
    rewards: {
      experience: 25,
    },
  },
  {
    id: "study",
    text: "The newly revealed information speaks of the \"Convergence\" - an ancient faction that seeks to merge technology and magic into a singular power. The texts warn that they view the natural separation of these forces as a flaw to be corrected, regardless of the consequences to the existing world order.",
    choices: [
      { id: "continue-research", text: "Research more about the Convergence", nextId: "research" },
      { id: "touch-after-study", text: "Touch the crystal with new knowledge", nextId: "touch-informed" },
    ],
    rewards: {
      experience: 75,
    },
  }
];

const StoryContext = createContext<StoryContextType | undefined>(undefined);

export function StoryProvider({ children }: { children: ReactNode }) {
  const { getSelectedCharacter, updateCharacter } = useCharacter();
  const [narrativeContent, setNarrativeContent] = useState<StoryNode[]>(initialNarrativeContent);
  const [currentNarrative, setCurrentNarrative] = useState<StoryNode>(narrativeContent[0]);
  const [storyHistory, setStoryHistory] = useState<StoryHistoryEntry[]>([]);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [typingSpeed, setTypingSpeed] = useState(30); // ms per character
  const [storyAttributes, setStoryAttributes] = useState<StoryAttributes>(initialStoryAttributes);
  
  // Set initial story entry
  useEffect(() => {
    if (storyHistory.length === 0) {
      setStoryHistory([{
        nodeId: currentNarrative.id,
        choiceId: null,
        timestamp: new Date()
      }]);
    }
  }, []);

  // Simulate typing effect
  useEffect(() => {
    setIsTyping(true);
    setDisplayedText("");

    let i = 0;
    const text = currentNarrative.text;

    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [currentNarrative, typingSpeed]);

  const setCurrentNarrativeById = (id: string) => {
    const narrative = narrativeContent.find((n) => n.id === id);
    if (narrative) {
      setCurrentNarrative(narrative);
      // Add to history
      setStoryHistory(prev => [...prev, {
        nodeId: narrative.id,
        choiceId: null,
        timestamp: new Date()
      }]);
    }
  };

  const handleChoice = (choice: StoryChoice) => {
    // Add the choice to history
    setStoryHistory(prev => [...prev, {
      nodeId: currentNarrative.id,
      choiceId: choice.id,
      timestamp: new Date()
    }]);
    
    // Process attributes changes based on choices
    if (choice.id.includes("negotiate") || choice.id.includes("question")) {
      updateStoryAttribute("diplomacy", 1);
    } else if (choice.id.includes("fight") || choice.id.includes("battle")) {
      updateStoryAttribute("heroism", 1);
    } else if (choice.id.includes("study") || choice.id.includes("research")) {
      updateStoryAttribute("mysticism", 1);
    } else if (choice.id.includes("retreat") || choice.id.includes("strategic")) {
      updateStoryAttribute("cunning", 1);
    }

    // Handle rewards if current narrative has any
    if (currentNarrative.rewards) {
      const character = getSelectedCharacter();
      if (character && currentNarrative.rewards.experience) {
        // Add experience to character
        const updatedStats = { ...character.stats };
        updatedStats.experience.current += currentNarrative.rewards.experience;
        
        // Level up if enough experience
        if (updatedStats.experience.current >= updatedStats.experience.next) {
          updateCharacter(character.id, {
            level: character.level + 1,
            // Stats will be recalculated by the updateCharacter function
          });
        } else {
          updateCharacter(character.id, {
            stats: updatedStats
          });
        }
      }
    }

    // Handle navigation or redirect
    if (choice.redirect) {
      // For redirection to other pages, the component using this context
      // should check for choice.redirect and handle it with the router
      return;
    }
    
    // Set next narrative
    const nextNarrative = narrativeContent.find((n) => n.id === choice.nextId);
    if (nextNarrative) {
      setCurrentNarrative(nextNarrative);
    }
  };

  const skipTyping = () => {
    setIsTyping(false);
    setDisplayedText(currentNarrative.text);
  };

  const resetStory = () => {
    setCurrentNarrative(narrativeContent[0]);
    setStoryHistory([{
      nodeId: narrativeContent[0].id,
      choiceId: null,
      timestamp: new Date()
    }]);
    setStoryAttributes(initialStoryAttributes);
  };

  const updateStoryAttribute = (attribute: keyof StoryAttributes, value: number) => {
    setStoryAttributes(prev => ({
      ...prev,
      [attribute]: Math.max(0, prev[attribute] + value)
    }));
  };

  const getStoryProgress = () => {
    // Simple progress calculation - unique nodes visited / total nodes
    const visitedNodeIds = new Set(storyHistory.map(entry => entry.nodeId));
    return visitedNodeIds.size / narrativeContent.length;
  };

  const addCustomStoryNode = (node: StoryNode) => {
    setNarrativeContent(prev => [...prev, node]);
  };

  return (
    <StoryContext.Provider
      value={{
        narrativeContent,
        currentNarrative,
        storyHistory,
        displayedText,
        isTyping,
        typingSpeed,
        storyAttributes,
        setCurrentNarrativeById,
        handleChoice,
        skipTyping,
        setTypingSpeed,
        resetStory,
        updateStoryAttribute,
        getStoryProgress,
        addCustomStoryNode,
      }}
    >
      {children}
    </StoryContext.Provider>
  );
}

export function useStory() {
  const context = useContext(StoryContext);
  if (context === undefined) {
    throw new Error("useStory must be used within a StoryProvider");
  }
  return context;
}
