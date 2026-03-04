"use client";

import { PageShell } from "../../components/PageShell";
import { useAuthStore } from "../../lib/stores/auth";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useMemo } from "react";

const cards = [
  {
    title: "Receipt NFTs",
    body: "所有凭证都在 Polygon Amoy，同步协作者和粉丝的透明记录。",
  },
  {
    title: "Fan perks",
    body: "针对超级粉丝推出限量权益，实时追踪兑换状态。",
  },
  {
    title: "Split tree",
    body: "直观查看每个作品的分账树，随时导出快照。",
  },
];

export default function DashboardPage() {
  const profile = useAuthStore((state) => state.profile);
  const { isConnected, address } = useAccount();
  const { connect, connectors, status } = useConnect();
  const { disconnect } = useDisconnect();

  const shortAddress = useMemo(
    () => (address ? `${address.slice(0, 6)}…${address.slice(-4)}` : ""),
    [address]
  );

  return (
    <PageShell
      title="Control center"
      subtitle="一处浏览钱包、Splits、粉丝权益，下一步再接入真实数据。"
    >
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-slate-200">
        <p>Welcome back, {profile?.name ?? "guest"}</p>
        <p className="text-xs text-slate-400">{profile?.email ?? "No session"}</p>
        <button
          type="button"
          onClick={() =>
            isConnected ? disconnect() : connectors[0] && connect({ connector: connectors[0] })
          }
          className="mt-4 rounded-full bg-emerald-400 px-4 py-2 text-xs font-semibold text-slate-900"
        >
          {isConnected
            ? `Disconnect ${shortAddress}`
            : status === "pending"
            ? "Connecting..."
            : "Connect wallet"}
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-emerald-200">Module</p>
            <h3 className="mt-2 text-xl font-semibold text-white">{card.title}</h3>
            <p className="mt-2 text-sm text-slate-300">{card.body}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
