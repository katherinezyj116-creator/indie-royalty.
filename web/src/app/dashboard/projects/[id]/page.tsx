"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PageShell } from "../../../../components/PageShell";
import { useAuthStore } from "../../../../lib/stores/auth";

type CollaboratorDetail = {
  name: string | null;
  role: string | null;
  email: string | null;
  payout_preference: string | null;
  percent: number | null;
};

type ProjectDetail = {
  id: string;
  name: string;
  overview: string | null;
  language: string | null;
  requester_address: string | null;
  total_percent: number | null;
  created_at: string;
  collaborators?: CollaboratorDetail[] | null;
};

export default function ProjectReviewPage({ params }: { params: { id: string } }) {
  const hydrate = useAuthStore((state) => state.hydrate);
  const profile = useAuthStore((state) => state.profile);
  const router = useRouter();
  const [authLoading, setAuthLoading] = useState(true);
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      await hydrate();
      setAuthLoading(false);
    })();
  }, [hydrate]);

  useEffect(() => {
    if (authLoading) return;
    if (!profile) {
      router.push("/login");
      return;
    }

    const controller = new AbortController();
    async function loadProject() {
      try {
        const response = await fetch(`/api/projects/${params.id}`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          const payload = await response.json().catch(() => null);
          throw new Error(payload?.error ?? "Failed to load project");
        }
        const payload = await response.json();
        setProject(payload.project);
      } catch (err) {
        if (!(err instanceof DOMException && err.name === "AbortError")) {
          setError(err instanceof Error ? err.message : "Failed to load project");
        }
      } finally {
        setLoading(false);
      }
    }

    loadProject();
    return () => controller.abort();
  }, [authLoading, profile, params.id, router]);

  if (authLoading || loading) {
    return (
      <PageShell title="Loading..." subtitle="Loading Step 3 preview">
        <p className="text-sm text-slate-500">Preparing your project…</p>
      </PageShell>
    );
  }

  if (error || !project) {
    return (
      <PageShell title="Unavailable" subtitle="We could not load this project.">
        <p className="text-sm text-rose-400">{error ?? "Project not found."}</p>
        <Link
          href="/dashboard"
          className="mt-4 inline-flex rounded-full bg-gradient-to-r from-[#ff63d3] to-[#ffa07a] px-5 py-2 text-sm font-semibold text-white"
        >
          Back to dashboard
        </Link>
      </PageShell>
    );
  }

  return (
    <PageShell title={`Review · ${project.name}`} subtitle="Step 3 · Review & Publish">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-900">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Project overview</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-900">{project.name}</h2>
        {project.overview && <p className="mt-2 text-slate-600">{project.overview}</p>}
        <div className="mt-4 grid gap-4 text-xs text-slate-500 md:grid-cols-3">
          <div>
            <p className="uppercase tracking-[0.3em]">Language</p>
            <p className="text-slate-900">{project.language ?? "en"}</p>
          </div>
          <div>
            <p className="uppercase tracking-[0.3em]">Requester</p>
            <p className="text-slate-900">{project.requester_address ?? "—"}</p>
          </div>
          <div>
            <p className="uppercase tracking-[0.3em]">Total percent</p>
            <p className="text-slate-900">{project.total_percent ?? 0}%</p>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-pink-500">Collaborators</p>
            <h3 className="mt-2 text-xl font-semibold text-slate-900">Split tree preview</h3>
            <p className="text-sm text-slate-500">Created {new Date(project.created_at).toLocaleString()}</p>
          </div>
          <Link
            href="/fans"
            className="rounded-full border border-pink-200 px-4 py-2 text-xs font-semibold text-pink-600"
          >
            Fan snapshot
          </Link>
        </div>
        <table className="mt-4 w-full text-left text-sm text-slate-700">
          <thead>
            <tr className="text-xs uppercase tracking-[0.3em] text-slate-400">
              <th className="py-2">Name</th>
              <th className="py-2">Role</th>
              <th className="py-2">Email</th>
              <th className="py-2">Payout</th>
              <th className="py-2 text-right">%</th>
            </tr>
          </thead>
          <tbody>
            {(project.collaborators ?? []).map((collab, index) => (
              <tr key={`${project.id}-${index}`} className="border-t border-slate-100">
                <td className="py-2">{collab.name ?? "Unnamed"}</td>
                <td className="py-2 text-slate-500">{collab.role ?? "Contributor"}</td>
                <td className="py-2 text-slate-500">{collab.email ?? "—"}</td>
                <td className="py-2 text-slate-500">{collab.payout_preference ?? "—"}</td>
                <td className="py-2 text-right">{collab.percent ?? 0}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          disabled
          className="rounded-full bg-gradient-to-r from-emerald-300 to-emerald-400/80 px-5 py-2 text-sm font-semibold text-emerald-900/80 disabled:cursor-not-allowed"
        >
          Push on-chain (soon)
        </button>
        <button
          type="button"
          disabled
          className="rounded-full bg-gradient-to-r from-sky-300 to-sky-400/80 px-5 py-2 text-sm font-semibold text-sky-900/80 disabled:cursor-not-allowed"
        >
          Sync to Raidar (soon)
        </button>
        <Link
          href="/dashboard"
          className="inline-flex rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-900"
        >
          Back to dashboard
        </Link>
      </div>
    </PageShell>
  );
}
