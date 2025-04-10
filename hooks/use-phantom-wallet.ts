"use client";

import { useEffect, useState } from "react";
import { useToast } from "./use-toast";

export type PhantomProvider = {
  connect: () => Promise<{ publicKey: { toString: () => string } }>;
  disconnect: () => Promise<void>;
  isConnected: boolean;
  publicKey: { toString: () => string } | null;
  on: (event: string, callback: (args: any) => void) => void;
  removeListener: (event: string, callback: (args: any) => void) => void;
};

export const usePhantomWallet = () => {
  const [provider, setProvider] = useState<PhantomProvider | null>(null);
  const [connected, setConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const getProvider = () => {
      if ("phantom" in window) {
        // @ts-ignore
        const phantomProvider = window.phantom?.solana;
        if (phantomProvider?.isPhantom) {
          return phantomProvider;
        }
      }
      return null;
    };

    const provider = getProvider();
    setProvider(provider);

    if (provider) {
      provider.on("connect", onConnect);
      provider.on("disconnect", onDisconnect);

      // Check if wallet is already connected
      if (provider.isConnected && provider.publicKey) {
        setConnected(true);
        setPublicKey(provider.publicKey.toString());
      }

      return () => {
        provider.removeListener("connect", onConnect);
        provider.removeListener("disconnect", onDisconnect);
      };
    }
  }, []);

  const onConnect = (publicKey: { toString: () => string }) => {
    setConnected(true);
    setPublicKey(publicKey.toString());
    toast({
      title: "Wallet connected",
      description: `Connected to ${shortenAddress(publicKey.toString())}`,
    });
  };

  const onDisconnect = () => {
    setConnected(false);
    setPublicKey(null);
    toast({
      title: "Wallet disconnected",
      description: "Your wallet has been disconnected",
    });
  };

  const connectWallet = async () => {
    if (!provider) {
      window.open("https://phantom.app/", "_blank");
      toast({
        title: "Phantom wallet not found",
        description: "Please install Phantom wallet extension",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await provider.connect();
      setConnected(true);
      setPublicKey(response.publicKey.toString());
    } catch (error) {
      console.error("Error connecting to wallet:", error);
      toast({
        title: "Connection failed",
        description: "Failed to connect to Phantom wallet",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = async () => {
    if (provider) {
      try {
        setLoading(true);
        await provider.disconnect();
        setConnected(false);
        setPublicKey(null);
      } catch (error) {
        console.error("Error disconnecting wallet:", error);
        toast({
          title: "Disconnect failed",
          description: "Failed to disconnect wallet",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const shortenAddress = (address: string, chars = 4): string => {
    return `${address.slice(0, chars)}...${address.slice(-chars)}`;
  };

  return {
    provider,
    connected,
    publicKey,
    shortenedPublicKey: publicKey ? shortenAddress(publicKey) : null,
    loading,
    connectWallet,
    disconnectWallet,
    shortenAddress,
  };
};
