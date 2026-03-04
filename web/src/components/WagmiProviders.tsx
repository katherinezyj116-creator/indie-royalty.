"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig, http } from "wagmi";
import { polygonAmoy } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";

const walletConnectProjectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_ID || "demo-indie-royalty";

type ConfigParams = Parameters<typeof createConfig>[0];

const connectorsValue = (
  typeof window === "undefined"
    ? []
    : [
        injected({ target: "metaMask" }),
        walletConnect({
          projectId: walletConnectProjectId,
          metadata: {
            name: "Indie Royalty",
            description: "Transparent splits on Polygon",
            url: "https://indie-royalty.vercel.app",
            icons: ["https://indie-royalty.vercel.app/icon.png"],
          },
          showQrModal: true,
        }),
      ]
) as ConfigParams["connectors"];

const wagmiConfig = createConfig({
  chains: [polygonAmoy],
  transports: {
    [polygonAmoy.id]: http(
      process.env.NEXT_PUBLIC_POLYGON_AMOY_RPC ||
        "https://rpc-amoy.polygon.technology"
    ),
  },
  connectors: connectorsValue,
  ssr: true,
});

const queryClient = new QueryClient();

export function WagmiProviders({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
