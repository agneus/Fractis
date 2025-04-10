import { Trophy, Sword, Coins, ArrowUp } from "lucide-react"

export function RecentActivity() {
  // Placeholder activity data
  const activities = [
    {
      id: 1,
      type: "battle",
      title: "Victory against Shadow Sentinel",
      time: "10 minutes ago",
      icon: Sword,
      iconColor: "text-red-400",
      details: "+250 XP, +120 Gold",
    },
    {
      id: 2,
      type: "level",
      title: "Reached Level 24",
      time: "2 hours ago",
      icon: ArrowUp,
      iconColor: "text-green-400",
      details: "New skill point available",
    },
    {
      id: 3,
      type: "achievement",
      title: "Achievement Unlocked",
      time: "Yesterday",
      icon: Trophy,
      iconColor: "text-yellow-400",
      details: "Arcane Collector: Found 10 Fractal Shards",
    },
    {
      id: 4,
      type: "transaction",
      title: "Item Sold at Marketplace",
      time: "2 days ago",
      icon: Coins,
      iconColor: "text-amber-400",
      details: "Crystalline Gauntlets for 1,500 Gold",
    },
    {
      id: 5,
      type: "battle",
      title: "Defeated Arcane Construct",
      time: "3 days ago",
      icon: Sword,
      iconColor: "text-red-400",
      details: "+180 XP, +85 Gold, Mechanical Component",
    },
  ]

  return (
    <div className="bg-gray-900/70 border border-purple-800/30 rounded-xl overflow-hidden backdrop-blur-sm">
      <div className="p-4 border-b border-purple-800/30">
        <h2 className="font-bold">Recent Activity</h2>
      </div>

      <div className="divide-y divide-gray-800/70">
        {activities.map((activity) => (
          <div key={activity.id} className="p-4">
            <div className="flex">
              <div className="mr-3 mt-0.5">
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                  <activity.icon className={`w-4 h-4 ${activity.iconColor}`} />
                </div>
              </div>
              <div>
                <h3 className="font-medium text-sm text-white">{activity.title}</h3>
                <p className="text-xs text-gray-400 mt-0.5">{activity.details}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full py-2 text-sm text-purple-300 hover:text-white bg-gray-800/50 hover:bg-gray-800 transition-colors">
        View All Activity
      </button>
    </div>
  )
}
