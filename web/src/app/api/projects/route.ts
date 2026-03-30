import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { clearSessionCookie, fetchProfileBySession, getSessionCookieName } from "@/lib/session";

async function resolveSession(request: NextRequest) {
  const token = request.cookies.get(getSessionCookieName())?.value ?? null;
  if (!token) {
    return { token: null, session: null } as const;
  }
  const session = await fetchProfileBySession(token);
  return { token, session } as const;
}

function unauthorizedResponse(token: string | null) {
  const response = NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (token) {
    clearSessionCookie(response);
  }
  return response;
}

type IncomingCollaborator = {
  name?: string;
  role?: string;
  email?: string;
  payout?: string;
  percent?: number;
};

type ProjectRequestBody = {
  projectName?: string;
  overview?: string;
  collaborators?: IncomingCollaborator[];
  requester?: string;
  language?: string;
};

export async function POST(request: NextRequest) {
  try {
    const { token, session } = await resolveSession(request);
    if (!session) {
      return unauthorizedResponse(token);
    }

    const body: ProjectRequestBody = await request.json();
    const { projectName, overview, requester, language } = body ?? {};
    const collaborators: IncomingCollaborator[] = Array.isArray(body?.collaborators)
      ? body.collaborators
      : [];

    if (!projectName || !requester) {
      return NextResponse.json(
        { error: "Project name and wallet address are required." },
        { status: 400 },
      );
    }

    const totalPercent = collaborators.reduce((sum, collaborator) => {
      const value = Number(collaborator?.percent ?? 0);
      return sum + (Number.isNaN(value) ? 0 : value);
    }, 0);

    const { data: projectRecord, error: projectError } = await supabase
      .from("projects")
      .insert([
        {
          name: projectName,
          overview,
          language: language ?? "en",
          requester_address: requester,
          total_percent: totalPercent,
          owner_profile_id: session.profile.id,
        },
      ])
      .select("id")
      .single();

    if (projectError || !projectRecord) {
      throw projectError ?? new Error("Failed to insert project");
    }

    if (collaborators.length > 0) {
      const collaboratorPayload = collaborators.map((collaborator) => ({
        project_id: projectRecord.id,
        name: collaborator?.name ?? "",
        role: collaborator?.role ?? "",
        email: collaborator?.email ?? "",
        payout_preference: collaborator?.payout ?? "",
        percent: Number(collaborator?.percent ?? 0) || 0,
      }));

      const { error: collaboratorError } = await supabase
        .from("collaborators")
        .insert(collaboratorPayload);

      if (collaboratorError) {
        throw collaboratorError;
      }
    }

    return NextResponse.json({ projectId: projectRecord.id }, { status: 201 });
  } catch (error) {
    console.error("/api/projects error", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unexpected error while saving project.",
      },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { token, session } = await resolveSession(request);
    if (!session) {
      return unauthorizedResponse(token);
    }

    const { data, error } = await supabase
      .from("projects")
      .select(
        "id, name, overview, total_percent, created_at, collaborators ( name, role, percent )",
      )
      .eq("owner_profile_id", session.profile.id)
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json({ projects: data ?? [] });
  } catch (error) {
    console.error("/api/projects GET error", error);
    return NextResponse.json({ error: "Unable to load projects" }, { status: 500 });
  }
}
