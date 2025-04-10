import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PlayerStatsPanel } from "@/components/dashboard/player-stats-panel"
import { NarrativeSection } from "@/components/dashboard/narrative-section"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { QuestLog } from "@/components/dashboard/quest-log"
import { RecentActivity } from "@/components/dashboard/recent-activity"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-purple-950 text-white">
      <Header />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column - Player Stats & Navigation */}
            <div className="lg:col-span-3 space-y-6">
              <PlayerStatsPanel />
              <DashboardNav />
            </div>

            {/* Middle Column - Narrative Section */}
            <div className="lg:col-span-6 space-y-6">
              <NarrativeSection />
              <QuestLog />
            </div>

            {/* Right Column - Activity & Notifications */}
            <div className="lg:col-span-3 space-y-6">
              <RecentActivity />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
