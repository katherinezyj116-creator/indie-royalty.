"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type CollaboratorSummary = {
  name: string | null;
  role: string | null;
  percent: number | null;
};

export type ProjectSummary = {
  id: string;
  name: string;
  overview: string | null;
  total_percent: number | null;
  created_at: string;
  collaborators?: CollaboratorSummary[] | null;
};

export function ProjectList({ initialProjects }: { initialProjects?: ProjectSummary[] }) {
  const [projects, setProjects] = useState<ProjectSummary[]>(initialProjects ?? []);
  const [loading, setLoading] = useState(!initialProjects);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      if (initialProjects) {
        setProjects(initialProjects);
        setLoading(false);
        return;
      }
      try {
        const response = await fetch("/api/projects", {
          method: "GET",
          signal: controller.signal,
        });
        if (!response.ok) {
          const payload = await response.json().catch(() => null);
          throw new Error(payload?.error ?? "Failed to load projects");
        }
        const payload = await response.json();
        setProjects(payload.projects ?? []);
      } catch (err) {
        if (!(err instanceof DOMException && err.name === "AbortError")) {
          setError(err instanceof Error ? err.message : "Failed to load projects");
        }
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [initialProjects]);

  if (loading) {
    return <p className="text-sm text-slate-400">Loading drafts…</p>;
  }

  if (error) {
    return <p className="text-sm text-rose-300">{error}</p>;
  }

  if (projects.length === 0) {
    return <p className="text-sm text-slate-400">No drafts yet. Start your first split below.</p>;
  }

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <div
          key={project.id}
          className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base font-semibold text-white">{project.name}</p>
              {project.overview && (
                <p className="text-xs text-slate-400">{project.overview}</p>
              )}
            </div>
            <p className="text-xs text-slate-400">
              {new Date(project.created_at).toLocaleDateString()} · {project.total_percent ?? 0}%
            </p>
          </div>
          {project.collaborators && project.collaborators.length > 0 && (
            <ul className="mt-3 space-y-1 text-xs text-slate-300">
              {project.collaborators.map((collab, index) => (
                <li key={`${project.id}-${index}`} className="flex items-center justify-between">
                  <span>
                    {collab.name ?? "Unnamed"} · {collab.role ?? "Contributor"}
                  </span>
                  <span className="text-slate-400">{collab.percent ?? 0}%</span>
                </li>
              ))}
            </ul>
          )}
          <Link
            href={`/dashboard/projects/${project.id}`}
            className="mt-4 inline-flex rounded-full border border-white/30 px-4 py-2 text-xs font-semibold text-white"
          >
            Open review
          </Link>
        </div>
      ))}
    </div>
  );
}
