import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { WalletProvider } from "@/context/wallet-context"
import { CharacterProvider } from "@/context/character-context"
import { StoryProvider } from "@/context/story-context"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Fractis - Arcane-Tech Fantasy RPG",
  description:
    "Where ancient runes meet crystalline technology. Harness the power of the Fractal Shards and restore balance to a world torn between magic and machine.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletProvider>
          <CharacterProvider>
            <StoryProvider>
              {children}
              <Toaster />
            </StoryProvider>
          </CharacterProvider>
        </WalletProvider>
      </body>
    </html>
  )
}


import './globals.css'