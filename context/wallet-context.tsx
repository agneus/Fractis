"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { PhantomProvider, usePhantomWallet } from "@/hooks/use-phantom-wallet";
import { useToast } from "@/hooks/use-toast";

interface WalletContextProps {
  provider: PhantomProvider | null;
  connected: boolean;
  publicKey: string | null;
  shortenedPublicKey: string | null;
  loading: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
  shortenAddress: (address: string, chars?: number) => string;
  user: UserDetails | null;
}

interface UserDetails {
  address: string;
  username?: string;
  profileImage?: string;
  balance?: number;
}

const defaultContext: WalletContextProps = {
  provider: null,
  connected: false,
  publicKey: null,
  shortenedPublicKey: null,
  loading: false,
  connectWallet: async () => {},
  disconnectWallet: async () => {},
  shortenAddress: () => "",
  user: null,
};

export const WalletContext = createContext<WalletContextProps>(defaultContext);

export const useWallet = () => useContext(WalletContext);

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const {
    provider,
    connected,
    publicKey,
    shortenedPublicKey,
    loading,
    connectWallet: connect,
    disconnectWallet: disconnect,
    shortenAddress,
  } = usePhantomWallet();
  
  const [user, setUser] = useState<UserDetails | null>(null);
  const { toast } = useToast();

  // Update user details when wallet connects
  useEffect(() => {
    if (connected && publicKey) {
      // Here you would typically fetch user details from your backend
      // For now, we'll just create a user object with the wallet address
      setUser({
        address: publicKey,
        // You could add additional user details in the future
      });
    } else {
      setUser(null);
    }
  }, [connected, publicKey]);

  const connectWallet = async () => {
    await connect();
  };

  const disconnectWallet = async () => {
    await disconnect();
    setUser(null);
  };

  return (
    <WalletContext.Provider
      value={{
        provider,
        connected,
        publicKey,
        shortenedPublicKey,
        loading,
        connectWallet,
        disconnectWallet,
        shortenAddress,
        user,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
