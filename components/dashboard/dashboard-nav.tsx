import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Swords, Backpack, BookOpen, Map, Users, Settings, Wallet } from "lucide-react"

export function DashboardNav() {
  const navItems = [
    { icon: Swords, label: "Battle", href: "/battle" },
    { icon: Backpack, label: "Inventory", href: "/inventory" },
    { icon: BookOpen, label: "Codex", href: "/codex" },
    { icon: Map, label: "World Map", href: "/map" },
    { icon: Users, label: "Alliance", href: "/alliance" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ]

  return (
    <div className="bg-gray-900/70 border border-purple-800/30 rounded-xl overflow-hidden backdrop-blur-sm">
      <div className="p-4 border-b border-purple-800/30">
        <h2 className="font-bold">Navigation</h2>
      </div>

      <div className="p-2">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-md text-gray-200 hover:bg-purple-900/20 hover:text-white transition-colors"
            >
              <item.icon className="w-5 h-5 text-purple-400" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-purple-800/30">
        <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white gap-2">
          <Wallet className="w-4 h-4" />
          <span>Connect Wallet</span>
        </Button>
      </div>
    </div>
  )
}
