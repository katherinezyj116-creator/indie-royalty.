"use client";

import Link from "next/link";
import { PageShell } from "../../components/PageShell";
import { useAuthStore } from "../../lib/stores/auth";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ProjectList, type ProjectSummary } from "../../components/ProjectList";
import { WalletSplitForm, AlphaAssistForm } from "../../components/StepForms";

export default function DashboardPage() {
  const profile = useAuthStore((state) => state.profile);
  const hydrate = useAuthStore((state) => state.hydrate);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { isConnected, address } = useAccount();
  const { connect, connectors, status } = useConnect();
  const { disconnect } = useDisconnect();
  const [projects, setProjects] = useState<ProjectSummary[]>([]);
  const [alphaEntries, setAlphaEntries] = useState(0);
  const [summaryLoading, setSummaryLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await hydrate();
      setLoading(false);
    })();
  }, [hydrate]);

  const loadSummary = useCallback(async (signal?: AbortSignal) => {
    try {
      setSummaryLoading(true);
      const [projectsResponse, alphaResponse] = await Promise.all([
        fetch("/api/projects", { signal }),
        fetch("/api/alpha-intake", { signal }),
      ]);

      if (!projectsResponse.ok) {
        throw new Error("Failed to load projects");
      }
      const projectsPayload = await projectsResponse.json();
      setProjects(projectsPayload.projects ?? []);

      if (!alphaResponse.ok) {
        throw new Error("Failed to load alpha intake");
      }
      const alphaPayload = await alphaResponse.json();
      setAlphaEntries(Array.isArray(alphaPayload.entries) ? alphaPayload.entries.length : 0);
    } catch (error) {
      console.error("dashboard summary error", error);
    } finally {
      setSummaryLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!loading && !profile) {
      router.push("/login");
    }
  }, [loading, profile, router]);

  useEffect(() => {
    if (!profile) return;
    const controller = new AbortController();
    loadSummary(controller.signal);
    return () => controller.abort();
  }, [profile, loadSummary]);

  const shortAddress = useMemo(
    () => (address ? `${address.slice(0, 6)}…${address.slice(-4)}` : ""),
    [address],
  );

  const step1Done = projects.length > 0;
  const step2Done = alphaEntries > 0;
  const step3Done = projects.length > 0;

  const renderStatus = (done: boolean) => (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        summaryLoading
          ? "bg-slate-100 text-slate-500"
          : done
          ? "bg-emerald-100 text-emerald-700"
          : "bg-slate-100 text-slate-600"
      }`}
    >
      {summaryLoading ? "Checking…" : done ? "Done" : "Pending"}
    </span>
  );

  if (loading) {
    return (
      <PageShell title="Loading..." subtitle="Verifying your session">
        <p className="text-sm text-slate-600">Checking your session…</p>
      </PageShell>
    );
  }

  if (!profile) {
    return (
      <PageShell title="Please log in" subtitle="Sign in to keep managing splits and fan perks.">
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
      subtitle="Steps 1–3 live here so you can save drafts and prep launches in one place."
    >
      <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-700">
        <p className="text-base text-slate-900">Welcome back, {profile?.name ?? "guest"}</p>
        <p className="text-xs text-slate-500">{profile?.email ?? "No session"}</p>
        <button
          type="button"
          onClick={() =>
            isConnected ? disconnect() : connectors[0] && connect({ connector: connectors[0] })
          }
          className="mt-4 rounded-full bg-gradient-to-r from-[#ff63d3] to-[#ffa07a] px-4 py-2 text-xs font-semibold text-white"
        >
          {isConnected
            ? `Disconnect ${shortAddress}`
            : status === "pending"
            ? "Connecting..."
            : "Connect wallet"}
        </button>
      </div>

      <div className="space-y-10">
        <section id="step-1" className="space-y-4 rounded-[32px] border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-pink-500">Step 1</p>
              <h3 className="mt-1 text-xl font-semibold text-slate-900">Wallet split</h3>
            </div>
            {renderStatus(step1Done)}
          </div>
          <WalletSplitForm onSuccess={() => loadSummary()} />
        </section>

        <section id="step-2" className="space-y-4 rounded-[32px] border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-pink-500">Step 2</p>
              <h3 className="mt-1 text-xl font-semibold text-slate-900">Alpha assist</h3>
            </div>
            {renderStatus(step2Done)}
          </div>
          <AlphaAssistForm onSuccess={() => loadSummary()} />
        </section>

        <section id="step-3" className="rounded-[32px] border border-slate-200 bg-white p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-pink-500">Step 3</p>
              <h3 className="mt-1 text-2xl font-semibold text-slate-900">Review & Publish</h3>
              <p className="text-sm text-slate-600">
                Review your Supabase data, prep on-chain or Raidar sync, and keep every recent draft in view.
              </p>
            </div>
            <div className="flex items-center gap-3">
              {renderStatus(step3Done)}
              <Link
                href="/"
                className="rounded-full border border-pink-200 px-4 py-2 text-xs font-semibold text-pink-600"
              >
                Back to landing
              </Link>
            </div>
          </div>
          <div className="mt-6">
            <ProjectList initialProjects={projects} />
          </div>
        </section>
      </div>
    </PageShell>
  );
}
