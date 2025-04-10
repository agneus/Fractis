import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Sparkles,
  Shield,
  Sword,
  User,
  LayoutDashboard,
  Swords,
  Backpack,
  Wallet,
  Zap,
  Trophy,
  Scroll,
  ArrowRight,
  Heart,
  Droplet,
  MessageSquare,
  Plus,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-purple-950 text-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>

          {/* Animated runes */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="inline-block mb-6">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/50 border border-purple-700/50 text-purple-300 text-xs font-medium">
              <Sparkles className="w-3 h-3" />
              <span>ARCANE-TECH FANTASY RPG</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter">
            <span className="block">Welcome to</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-300 to-blue-400">
              FRACTIS
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-300 mb-8">
            Where ancient runes meet crystalline technology. Harness the power of the Fractal Shards and restore balance
            to a world torn between magic and machine.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 h-auto text-lg group" asChild>
              <Link href="/characters">
                <span>Begin Your Journey</span>
                <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              variant="outline"
              className="border-purple-500/50 text-purple-300 hover:bg-purple-900/50 hover:text-white px-8 py-6 h-auto text-lg"
            >
              <Wallet className="mr-2 h-5 w-5" />
              <span>Connect Wallet</span>
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="flex flex-col items-center p-4 rounded-lg bg-purple-900/20 border border-purple-800/30 backdrop-blur-sm">
              <Shield className="w-8 h-8 text-purple-400 mb-2" />
              <span className="text-sm font-medium">20+ Classes</span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-lg bg-purple-900/20 border border-purple-800/30 backdrop-blur-sm">
              <Sword className="w-8 h-8 text-purple-400 mb-2" />
              <span className="text-sm font-medium">100+ Weapons</span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-lg bg-purple-900/20 border border-purple-800/30 backdrop-blur-sm">
              <Sparkles className="w-8 h-8 text-purple-400 mb-2" />
              <span className="text-sm font-medium">50+ Spells</span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-lg bg-purple-900/20 border border-purple-800/30 backdrop-blur-sm">
              <Backpack className="w-8 h-8 text-purple-400 mb-2" />
              <span className="text-sm font-medium">200+ Items</span>
            </div>
          </div>
        </div>
      </section>

      {/* Character Selection Section Preview */}
      <section id="characters-preview" className="py-20 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Character Selection</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Choose your champion from a diverse roster of heroes, each with unique abilities and backstories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-lg bg-gray-800/50 border border-purple-800/30 overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-900/20">
              <div className="aspect-[3/4] bg-gradient-to-b from-purple-900/20 to-gray-900/20 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-gray-700/50 overflow-hidden">
                    <img
                      src="/placeholder.svg?height=200&width=200&text=Mage"
                      alt="Mage"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-400" />
                    <span className="text-sm font-medium">Mage</span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">Azrael Nightwhisper</h3>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm">Level 24</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-gray-800/50 border border-purple-800/30 overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-900/20">
              <div className="aspect-[3/4] bg-gradient-to-b from-purple-900/20 to-gray-900/20 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-gray-700/50 overflow-hidden">
                    <img
                      src="/placeholder.svg?height=200&width=200&text=Warrior"
                      alt="Warrior"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-4">
                  <div className="flex items-center gap-2">
                    <Sword className="w-5 h-5 text-red-400" />
                    <span className="text-sm font-medium">Warrior</span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">Thorne Ironheart</h3>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm">Level 18</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-gray-800/50 border-2 border-dashed border-purple-800/50 overflow-hidden flex items-center justify-center">
              <div className="text-center p-6">
                <div className="w-16 h-16 rounded-full bg-purple-900/30 flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="font-bold text-lg mb-2">Create New Character</h3>
                <p className="text-sm text-gray-400 mb-4">Choose from 5 unique classes</p>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white" asChild>
                  <Link href="/characters">Create Character</Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button
              variant="outline"
              className="border-purple-500/50 text-purple-300 hover:bg-purple-900/50 hover:text-white"
              asChild
            >
              <Link href="/characters">View All Characters</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Dashboard Section Preview */}
      <section id="dashboard-preview" className="py-20 bg-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Dashboard</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Track your progress, manage your inventory, and plan your next adventure.
            </p>
          </div>

          <div className="bg-gray-900/50 border border-purple-800/30 rounded-xl p-6 backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800/50 rounded-lg p-4">
                <div className="flex items-center mb-4">
                  <User className="w-5 h-5 text-purple-400 mr-2" />
                  <h3 className="font-bold">Player Stats</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Health</span>
                    <div className="h-2 w-32 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full w-4/5 bg-red-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Mana</span>
                    <div className="h-2 w-32 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full w-3/5 bg-blue-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Experience</span>
                    <div className="h-2 w-32 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full w-2/3 bg-yellow-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-4">
                <div className="flex items-center mb-4">
                  <Scroll className="w-5 h-5 text-purple-400 mr-2" />
                  <h3 className="font-bold">Active Quests</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full bg-purple-600 mt-0.5 flex-shrink-0"></div>
                    <div>
                      <div className="text-sm font-medium">The Fractured Beginning</div>
                      <div className="text-xs text-gray-400">2/3 completed</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full bg-gray-600 mt-0.5 flex-shrink-0"></div>
                    <div>
                      <div className="text-sm font-medium">Echoes of Technology</div>
                      <div className="text-xs text-gray-400">0/5 completed</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-4">
                <div className="flex items-center mb-4">
                  <Trophy className="w-5 h-5 text-purple-400 mr-2" />
                  <h3 className="font-bold">Recent Activity</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Sword className="w-4 h-4 text-red-400" />
                    <div className="text-sm">Victory against Shadow Sentinel</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    <div className="text-sm">Reached Level 24</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-gray-800/30 rounded-lg p-4">
              <div className="flex items-center mb-4">
                <LayoutDashboard className="w-5 h-5 text-purple-400 mr-2" />
                <h3 className="font-bold">Navigation</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button
                  variant="outline"
                  className="border-purple-500/50 text-purple-300 hover:bg-purple-900/50 hover:text-white h-12"
                  asChild
                >
                  <Link href="/battle">
                    <Swords className="mr-2 h-4 w-4" />
                    Battle
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="border-purple-500/50 text-purple-300 hover:bg-purple-900/50 hover:text-white h-12"
                >
                  <Backpack className="mr-2 h-4 w-4" />
                  Inventory
                </Button>
                <Button
                  variant="outline"
                  className="border-purple-500/50 text-purple-300 hover:bg-purple-900/50 hover:text-white h-12"
                >
                  <Scroll className="mr-2 h-4 w-4" />
                  Quests
                </Button>
                <Button
                  variant="outline"
                  className="border-purple-500/50 text-purple-300 hover:bg-purple-900/50 hover:text-white h-12"
                >
                  <Shield className="mr-2 h-4 w-4" />
                  Skills
                </Button>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Button
              variant="outline"
              className="border-purple-500/50 text-purple-300 hover:bg-purple-900/50 hover:text-white"
              asChild
            >
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Battle Preview Section */}
      <section id="battle-preview" className="py-20 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-600/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Battle Arena</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Engage in strategic turn-based combat against fearsome foes and rival players.
            </p>
          </div>

          <div className="bg-gray-800/50 border border-purple-800/30 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-blue-900/10"></div>

            <div className="relative z-10 flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Shield className="w-5 h-5 text-purple-400 mr-2" />
                      <h3 className="font-bold">Azrael Nightwhisper</h3>
                    </div>
                    <div className="px-2 py-1 rounded-full bg-gray-800 text-xs font-medium text-purple-300 border border-purple-500/30">
                      Lvl 24
                    </div>
                  </div>
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Heart className="w-4 h-4 text-red-400 mr-1" />
                        <span className="text-sm text-gray-300">420/500</span>
                      </div>
                      <div className="h-2 w-32 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full w-4/5 bg-gradient-to-r from-red-600 to-red-400 rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Droplet className="w-4 h-4 text-blue-400 mr-1" />
                        <span className="text-sm text-gray-300">180/200</span>
                      </div>
                      <div className="h-2 w-32 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full w-[90%] bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button className="bg-purple-600 hover:bg-purple-700 h-10">Attack</Button>
                    <Button
                      variant="outline"
                      className="border-purple-500/50 text-purple-300 hover:bg-purple-900/50 hover:text-white h-10"
                    >
                      Defend
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-red-900/30 border border-red-700/30 flex items-center justify-center">
                  <Swords className="w-8 h-8 text-red-400" />
                </div>
              </div>

              <div className="flex-1">
                <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Sword className="w-5 h-5 text-red-400 mr-2" />
                      <h3 className="font-bold">Shadow Sentinel</h3>
                    </div>
                    <div className="px-2 py-1 rounded-full bg-gray-800 text-xs font-medium text-red-300 border border-red-500/30">
                      Lvl 26
                    </div>
                  </div>
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Heart className="w-4 h-4 text-red-400 mr-1" />
                        <span className="text-sm text-gray-300">650/800</span>
                      </div>
                      <div className="h-2 w-32 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full w-[81%] bg-gradient-to-r from-red-600 to-red-400 rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Droplet className="w-4 h-4 text-blue-400 mr-1" />
                        <span className="text-sm text-gray-300">120/150</span>
                      </div>
                      <div className="h-2 w-32 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full w-4/5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-gray-900/50 rounded-lg p-4">
              <div className="flex items-center mb-4">
                <MessageSquare className="w-5 h-5 text-purple-400 mr-2" />
                <h3 className="font-bold">Combat Log</h3>
              </div>
              <div className="h-24 bg-gray-800/50 rounded-lg p-3 overflow-y-auto space-y-2">
                <div className="py-1 px-2 rounded text-sm bg-purple-900/20 border-l-2 border-purple-500">
                  <span className="text-xs text-gray-400 mr-2">12:45:32</span>
                  You prepare to strike with your weapon!
                </div>
                <div className="py-1 px-2 rounded text-sm bg-yellow-900/20 border-l-2 border-yellow-500 font-medium">
                  <span className="text-xs text-gray-400 mr-2">12:45:34</span>
                  You strike the Shadow Sentinel for 50 damage!
                </div>
                <div className="py-1 px-2 rounded text-sm bg-red-900/20 border-l-2 border-red-500">
                  <span className="text-xs text-gray-400 mr-2">12:45:38</span>
                  Shadow Sentinel strikes you for 30 damage!
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white" asChild>
              <Link href="/battle">Enter PvE Battle</Link>
            </Button>
            <Button
              variant="outline"
              className="border-purple-500/50 text-purple-300 hover:bg-purple-900/50 hover:text-white"
              asChild
            >
              <Link href="/pvp">Join PvP Arena</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-purple-950">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Begin Your Adventure?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Join thousands of players in the world of Fractis. Forge alliances, conquer dungeons, and become a legend.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 h-auto text-lg" asChild>
              <Link href="/characters">Create Character</Link>
            </Button>
            <Button
              variant="outline"
              className="border-purple-500/50 text-purple-300 hover:bg-purple-900/50 hover:text-white px-8 py-6 h-auto text-lg"
            >
              <Wallet className="mr-2 h-5 w-5" />
              <span>Connect Wallet</span>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
