import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

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
