import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Shield, Sword, Sparkles, Swords, Target, Zap, Heart } from "lucide-react"

export default function PvpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-purple-950 text-white">
      <Header />

      <main className="pt-24 pb-20">
        <PageHeader
          title="PvP Arena"
          description="Engage in strategic turn-based combat against rival players and prove your worth."
        >
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <Button
              variant="outline"
              className="border-purple-500/50 text-purple-300 hover:bg-purple-900/50 hover:text-white"
              asChild
            >
              <a href="/battle">PvE Battles</a>
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700">PvP Arena</Button>
            <Button
              variant="outline"
              className="border-purple-500/50 text-purple-300 hover:bg-purple-900/50 hover:text-white"
            >
              Tournament
            </Button>
          </div>
        </PageHeader>

        <div className="container mx-auto px-4 mt-12">
          {/* Battle Arena */}
          <div className="bg-gray-800/50 border border-purple-800/30 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-blue-900/10"></div>

            <div className="relative z-10 flex flex-col md:flex-row gap-6">
              {/* Player Character */}
              <div className="flex-1">
                <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Shield className="w-5 h-5 text-purple-400 mr-2" />
                      <div className="h-5 w-24 bg-gray-700/50 rounded"></div>
                    </div>
                    <div className="h-5 w-16 bg-gray-700/30 rounded"></div>
                  </div>
                  <div className="aspect-video bg-gray-800/30 rounded-lg mb-4 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-gray-700/50"></div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Heart className="w-4 h-4 text-red-400 mr-1" />
                        <span className="text-sm text-gray-300">Health</span>
                      </div>
                      <div className="h-4 w-32 bg-red-900/30 rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-red-500/70 rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Sparkles className="w-4 h-4 text-blue-400 mr-1" />
                        <span className="text-sm text-gray-300">Mana</span>
                      </div>
                      <div className="h-4 w-32 bg-blue-900/30 rounded-full overflow-hidden">
                        <div className="h-full w-1/2 bg-blue-500/70 rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Zap className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="text-sm text-gray-300">Energy</span>
                      </div>
                      <div className="h-4 w-32 bg-yellow-900/30 rounded-full overflow-hidden">
                        <div className="h-full w-5/6 bg-yellow-500/70 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-8 bg-gray-700/30 rounded"></div>
                    <div className="h-8 bg-gray-700/30 rounded"></div>
                  </div>
                </div>
              </div>

              {/* VS */}
              <div className="flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-red-900/30 border border-red-700/30 flex items-center justify-center">
                  <Swords className="w-8 h-8 text-red-400" />
                </div>
              </div>

              {/* Enemy Character */}
              <div className="flex-1">
                <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Sword className="w-5 h-5 text-red-400 mr-2" />
                      <div className="h-5 w-24 bg-gray-700/50 rounded"></div>
                    </div>
                    <div className="h-5 w-16 bg-gray-700/30 rounded"></div>
                  </div>
                  <div className="aspect-video bg-gray-800/30 rounded-lg mb-4 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-gray-700/50"></div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Heart className="w-4 h-4 text-red-400 mr-1" />
                        <span className="text-sm text-gray-300">Health</span>
                      </div>
                      <div className="h-4 w-32 bg-red-900/30 rounded-full overflow-hidden">
                        <div className="h-full w-2/3 bg-red-500/70 rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Sparkles className="w-4 h-4 text-blue-400 mr-1" />
                        <span className="text-sm text-gray-300">Mana</span>
                      </div>
                      <div className="h-4 w-32 bg-blue-900/30 rounded-full overflow-hidden">
                        <div className="h-full w-1/3 bg-blue-500/70 rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Target className="w-4 h-4 text-purple-400 mr-1" />
                        <span className="text-sm text-gray-300">Status</span>
                      </div>
                      <div className="h-4 w-32 bg-gray-700/30 rounded"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-8 bg-gray-700/30 rounded"></div>
                    <div className="h-8 bg-gray-700/30 rounded"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Battle Actions */}
            <div className="mt-6 bg-gray-900/50 rounded-lg p-4">
              <div className="flex items-center mb-4">
                <Sparkles className="w-5 h-5 text-purple-400 mr-2" />
                <h3 className="font-bold">Actions</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button className="bg-purple-600 hover:bg-purple-700 h-12">Attack</Button>
                <Button
                  variant="outline"
                  className="border-purple-500/50 text-purple-300 hover:bg-purple-900/50 hover:text-white h-12"
                >
                  Defend
                </Button>
                <Button
                  variant="outline"
                  className="border-purple-500/50 text-purple-300 hover:bg-purple-900/50 hover:text-white h-12"
                >
                  Special
                </Button>
                <Button
                  variant="outline"
                  className="border-purple-500/50 text-purple-300 hover:bg-purple-900/50 hover:text-white h-12"
                >
                  Item
                </Button>
              </div>
            </div>

            {/* Battle Log */}
            <div className="mt-6 bg-gray-900/50 rounded-lg p-4">
              <div className="flex items-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-purple-400 mr-2"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <h3 className="font-bold">Battle Log</h3>
              </div>
              <div className="h-32 bg-gray-800/50 rounded-lg p-3 overflow-y-auto space-y-2">
                <div className="h-4 w-full bg-gray-700/30 rounded"></div>
                <div className="h-4 w-5/6 bg-gray-700/30 rounded"></div>
                <div className="h-4 w-full bg-gray-700/30 rounded"></div>
                <div className="h-4 w-4/6 bg-gray-700/30 rounded"></div>
                <div className="h-4 w-full bg-gray-700/30 rounded"></div>
              </div>
            </div>
          </div>

          {/* Battle Selection */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Available PvP Matches</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-900/50 border border-purple-800/30 rounded-xl p-6 backdrop-blur-sm hover:border-purple-500/50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="h-6 w-32 bg-gray-700/50 rounded"></div>
                    <div className="px-2 py-1 rounded-full bg-gray-800 text-xs font-medium text-purple-300 border border-purple-500/30">
                      Level {i + 1}
                    </div>
                  </div>
                  <div className="h-4 w-full bg-gray-700/30 rounded mb-2"></div>
                  <div className="h-4 w-5/6 bg-gray-700/30 rounded mb-6"></div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        <Sword className="w-4 h-4 text-red-400 mr-1" />
                        <span className="text-sm">{i + 2}</span>
                      </div>
                      <div className="flex items-center">
                        <Shield className="w-4 h-4 text-blue-400 mr-1" />
                        <span className="text-sm">{i + 1}</span>
                      </div>
                    </div>
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white">Join Match</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
