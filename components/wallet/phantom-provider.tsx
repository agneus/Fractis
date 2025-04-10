"use client";

import { FC, ReactNode, useMemo } from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { clusterApiUrl } from "@solana/web3.js";

// Import wallet adapter CSS - we'll create this file next
import "@solana/wallet-adapter-react-ui/styles.css";

interface PhantomWalletProviderProps {
  children: ReactNode;
  network?: WalletAdapterNetwork;
}

export const PhantomWalletProvider: FC<PhantomWalletProviderProps> = ({ 
  children, 
  network = WalletAdapterNetwork.Devnet 
}) => {
  // Set up the Solana connection endpoint
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  
  // Set up the wallet adapters (just Phantom in this case)
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
