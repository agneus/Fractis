import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BattleScreen } from "@/components/battle/battle-screen"

export default function BattlePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-purple-950 text-white">
      <Header />
      <main className="pt-24 pb-20">
        <BattleScreen />
      </main>
      <Footer />
    </div>
  )
}
