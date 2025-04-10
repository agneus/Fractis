import { ScrollText, CheckCircle2, Circle } from "lucide-react"

export function QuestLog() {
  // Placeholder quest data
  const quests = [
    {
      id: 1,
      title: "The Fractured Beginning",
      description: "Investigate the ancient crystal and discover its purpose.",
      progress: 2,
      total: 3,
      rewards: ["500 XP", "200 Gold", "Arcane Fragment"],
      isActive: true,
    },
    {
      id: 2,
      title: "Echoes of Technology",
      description: "Recover lost tech artifacts from the Rusted Wastes.",
      progress: 0,
      total: 5,
      rewards: ["750 XP", "Mechanical Component"],
      isActive: true,
    },
    {
      id: 3,
      title: "Balance of Power",
      description: "Help the Council establish a new outpost at the convergence point.",
      progress: 1,
      total: 4,
      rewards: ["1000 XP", "Rare Equipment", "Faction Reputation"],
      isActive: false,
    },
  ]

  return (
    <div className="bg-gray-900/70 border border-purple-800/30 rounded-xl overflow-hidden backdrop-blur-sm">
      <div className="p-4 border-b border-purple-800/30 flex items-center">
        <ScrollText className="w-5 h-5 text-purple-400 mr-2" />
        <h2 className="text-xl font-bold">Quest Log</h2>
      </div>

      <div className="divide-y divide-gray-800/70">
        {quests.map((quest) => (
          <div key={quest.id} className={`p-4 ${quest.isActive ? "" : "opacity-60"}`}>
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-white">{quest.title}</h3>
              <div className="text-xs bg-purple-900/40 px-2 py-0.5 rounded border border-purple-700/30">
                {quest.progress}/{quest.total}
              </div>
            </div>
            <p className="text-sm text-gray-300 mb-3">{quest.description}</p>

            <div className="space-y-1.5">
              {Array.from({ length: quest.total }).map((_, i) => (
                <div key={i} className="flex items-center text-sm">
                  {i < quest.progress ? (
                    <CheckCircle2 className="w-4 h-4 text-green-400 mr-2" />
                  ) : (
                    <Circle className="w-4 h-4 text-gray-500 mr-2" />
                  )}
                  <span className="text-gray-400">
                    {i === 0 && "Approach the crystal"}
                    {i === 1 && "Examine the runes"}
                    {i === 2 && "Activate the shard"}
                    {i === 3 && "Report to the Council"}
                    {i === 4 && "Collect artifact pieces"}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-3 pt-2 border-t border-gray-800/50">
              <div className="text-xs text-gray-400">Rewards:</div>
              <div className="flex flex-wrap gap-2 mt-1">
                {quest.rewards.map((reward, i) => (
                  <div key={i} className="text-xs px-2 py-1 bg-gray-800/70 rounded-full border border-gray-700/50">
                    {reward}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
