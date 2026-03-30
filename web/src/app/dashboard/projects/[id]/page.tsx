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
      <PageShell title="Loading..." subtitle="正在加载 Step 3 预览">
        <p className="text-sm text-slate-300">Preparing your project…</p>
      </PageShell>
    );
  }

  if (error || !project) {
    return (
      <PageShell title="Unavailable" subtitle="无法加载该项目">
        <p className="text-sm text-rose-300">{error ?? "Project not found."}</p>
        <Link
          href="/dashboard"
          className="mt-4 inline-flex rounded-full bg-white/80 px-5 py-2 text-sm font-semibold text-slate-900"
        >
          Back to dashboard
        </Link>
      </PageShell>
    );
  }

  return (
    <PageShell title={`Review · ${project.name}`} subtitle="Step 3 · Review & Publish">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-slate-200">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Project overview</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">{project.name}</h2>
        {project.overview && <p className="mt-2 text-slate-300">{project.overview}</p>}
        <div className="mt-4 grid gap-4 text-xs text-slate-400 md:grid-cols-3">
          <div>
            <p className="uppercase tracking-[0.3em]">Language</p>
            <p className="text-white">{project.language ?? "en"}</p>
          </div>
          <div>
            <p className="uppercase tracking-[0.3em]">Requester</p>
            <p className="text-white">{project.requester_address ?? "—"}</p>
          </div>
          <div>
            <p className="uppercase tracking-[0.3em]">Total percent</p>
            <p className="text-white">{project.total_percent ?? 0}%</p>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Collaborators</p>
            <h3 className="mt-2 text-xl font-semibold text-white">Split tree preview</h3>
          </div>
          <p className="text-xs text-slate-400">
            Created {new Date(project.created_at).toLocaleString()}
          </p>
        </div>
        <table className="mt-4 w-full text-left text-sm text-slate-200">
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
              <tr key={`${project.id}-${index}`} className="border-t border-white/10">
                <td className="py-2">{collab.name ?? "Unnamed"}</td>
                <td className="py-2">{collab.role ?? "Contributor"}</td>
                <td className="py-2 text-slate-400">{collab.email ?? "—"}</td>
                <td className="py-2 text-slate-400">{collab.payout_preference ?? "—"}</td>
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
          className="rounded-full bg-emerald-500/40 px-5 py-2 text-sm font-semibold text-white/80"
        >
          Push on-chain (coming soon)
        </button>
        <button
          type="button"
          disabled
          className="rounded-full bg-blue-500/40 px-5 py-2 text-sm font-semibold text-white/80"
        >
          Sync to Raidar (coming soon)
        </button>
        <Link
          href="/dashboard"
          className="inline-flex rounded-full border border-white/30 px-5 py-2 text-sm font-semibold text-white"
        >
          Back to dashboard
        </Link>
      </div>
    </PageShell>
  );
}
