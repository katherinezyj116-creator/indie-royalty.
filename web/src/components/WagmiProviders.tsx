"use client";

import { ReactNode } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiConfig, createConfig } from "wagmi";
import { polygonAmoy } from "wagmi/chains";
import { http } from "wagmi";

const { connectors } = getDefaultWallets({
  appName: "Indie Royalty",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_ID || "demo-indie-royalty",
  chains: [polygonAmoy],
});

const wagmiConfig = createConfig({
  chains: [polygonAmoy],
  transports: {
    [polygonAmoy.id]: http(process.env.NEXT_PUBLIC_POLYGON_AMOY_RPC),
  },
  connectors,
  ssr: true,
});

const queryClient = new QueryClient();

export function WagmiProviders({ children }: { children: ReactNode }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider chains={[polygonAmoy]}>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiConfig>
  );
}
