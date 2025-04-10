"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, User, LayoutDashboard, Swords, Wallet, X, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="border-b border-purple-800/30 backdrop-blur-sm fixed w-full z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-purple-500 rounded-lg rotate-45 transform-gpu"></div>
            <div className="absolute inset-1 bg-purple-900 rounded-md rotate-45 transform-gpu flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-purple-300" />
            </div>
          </div>
          <span className="font-bold text-xl tracking-wider">FRACTIS</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/characters"
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center gap-1"
          >
            <User className="w-4 h-4" />
            <span>Characters</span>
          </Link>
          <Link
            href="/dashboard"
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center gap-1"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/pvp"
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center gap-1"
          >
            <Swords className="w-4 h-4" />
            <span>PvP</span>
          </Link>
        </nav>

        <Button
          variant="outline"
          size="sm"
          className="hidden md:flex items-center gap-2 bg-purple-950/50 border-purple-500/50 hover:bg-purple-900/70 text-purple-300 hover:text-white"
        >
          <Wallet className="w-4 h-4" />
          <span>Connect Wallet</span>
        </Button>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-gray-900 border-purple-800/30 text-white p-0">
            <div className="flex flex-col h-full">
              <div className="p-4 border-b border-purple-800/30">
                <div className="flex items-center justify-between">
                  <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                    <div className="relative w-8 h-8">
                      <div className="absolute inset-0 bg-purple-500 rounded-lg rotate-45 transform-gpu"></div>
                      <div className="absolute inset-1 bg-purple-900 rounded-md rotate-45 transform-gpu flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-purple-300" />
                      </div>
                    </div>
                    <span className="font-bold text-xl tracking-wider">FRACTIS</span>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                    <X className="h-6 w-6" />
                  </Button>
                </div>
              </div>
              <div className="flex-1 overflow-auto py-4">
                <nav className="flex flex-col gap-2 px-4">
                  <Link
                    href="/characters"
                    className="flex items-center gap-3 px-3 py-4 rounded-md hover:bg-purple-900/20 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <User className="w-5 h-5 text-purple-400" />
                    <span className="font-medium">Characters</span>
                  </Link>
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-3 px-3 py-4 rounded-md hover:bg-purple-900/20 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <LayoutDashboard className="w-5 h-5 text-purple-400" />
                    <span className="font-medium">Dashboard</span>
                  </Link>
                  <Link
                    href="/pvp"
                    className="flex items-center gap-3 px-3 py-4 rounded-md hover:bg-purple-900/20 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <Swords className="w-5 h-5 text-purple-400" />
                    <span className="font-medium">PvP</span>
                  </Link>
                </nav>
              </div>
              <div className="p-4 border-t border-purple-800/30">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  <Wallet className="mr-2 h-5 w-5" />
                  <span>Connect Wallet</span>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
