"use client";

import { Button } from "@/components/ui/button";
import { useWallet } from "@/context/wallet-context";
import { Wallet, LogOut } from "lucide-react";

interface WalletButtonProps {
  variant?: "default" | "outline" | "destructive" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  isMobile?: boolean;
}

export function WalletButton({ 
  variant = "outline", 
  size = "sm", 
  className = "",
  isMobile = false 
}: WalletButtonProps) {
  const { 
    connected, 
    shortenedPublicKey, 
    loading, 
    connectWallet, 
    disconnectWallet,
    user
  } = useWallet();

  const handleClick = () => {
    if (connected) {
      disconnectWallet();
    } else {
      connectWallet();
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleClick}
      disabled={loading}
    >
      {connected ? (
        <>
          {shortenedPublicKey}
          <LogOut className="w-4 h-4 ml-1" />
        </>
      ) : (
        <>
          <Wallet className={isMobile ? "mr-2 h-5 w-5" : "w-4 h-4"} />
          <span>{isMobile ? "Connect Wallet" : "Connect Wallet"}</span>
        </>
      )}
    </Button>
  );
}
