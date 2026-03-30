"use client";

import Link from "next/link";
import { PageShell } from "../../components/PageShell";
import { useAuthStore } from "../../lib/stores/auth";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ProjectList } from "../../components/ProjectList";

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
  const hydrate = useAuthStore((state) => state.hydrate);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { isConnected, address } = useAccount();
  const { connect, connectors, status } = useConnect();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    (async () => {
      await hydrate();
      setLoading(false);
    })();
  }, [hydrate]);

  useEffect(() => {
    if (!loading && !profile) {
      router.push("/login");
    }
  }, [loading, profile, router]);

  const shortAddress = useMemo(
    () => (address ? `${address.slice(0, 6)}…${address.slice(-4)}` : ""),
    [address]
  );

  if (loading) {
    return (
      <PageShell title="Loading..." subtitle="正在验证你的会话">
        <p className="text-sm text-slate-300">Checking your session…</p>
      </PageShell>
    );
  }

  if (!profile) {
    return (
      <PageShell title="Please log in" subtitle="登录后继续管理 splits 和粉丝权益。">
        <p className="text-sm text-slate-300">Your session expired.</p>
        <Link
          href="/login"
          className="mt-4 inline-flex rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-slate-900"
        >
          Go to login
        </Link>
      </PageShell>
    );
  }

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
      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Drafts</p>
          <h3 className="mt-2 text-xl font-semibold text-white">Recent split projects</h3>
          <ProjectList />
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-slate-200">
          <p className="text-xs uppercase tracking-[0.35em] text-emerald-200">Step builder</p>
          <h3 className="mt-2 text-xl font-semibold text-white">Create or update splits</h3>
          <p className="mt-2 text-slate-300">Use the interactive form (Step 1 & 2) on the main page. You can open it in a new tab—your login session is already active.</p>
          <Link
            href="/#alpha"
            className="mt-4 inline-flex rounded-full bg-white/90 px-5 py-2 text-sm font-semibold text-slate-900"
          >
            Open split workflow
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
