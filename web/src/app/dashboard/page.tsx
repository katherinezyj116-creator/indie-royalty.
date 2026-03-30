"use client";

import Link from "next/link";
import { PageShell } from "../../components/PageShell";
import { useAuthStore } from "../../lib/stores/auth";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ProjectList } from "../../components/ProjectList";
import { WalletSplitForm, AlphaAssistForm } from "../../components/StepForms";

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
    [address],
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
      title="Indie Royalty workspace"
      subtitle="Step 1–3 在这里串联，随时保存草稿并准备上线。"
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

      <div className="space-y-10">
        <section id="step-1">
          <WalletSplitForm />
        </section>

        <section id="step-2">
          <AlphaAssistForm />
        </section>

        <section id="step-3" className="rounded-[32px] border border-white/10 bg-white/5 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-white/60">Step 3</p>
              <h3 className="mt-1 text-2xl font-semibold text-white">Review & Publish</h3>
              <p className="text-sm text-slate-200">
                审核 Supabase 数据、准备链上或 Raidar 同步。这里会列出你最近的草稿。
              </p>
            </div>
            <Link
              href="/"
              className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white"
            >
              返回 Landing
            </Link>
          </div>
          <div className="mt-6">
            <ProjectList />
          </div>
        </section>
      </div>
    </PageShell>
  );
}
