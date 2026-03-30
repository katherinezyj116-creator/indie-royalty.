import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { clearSessionCookie, fetchProfileBySession, getSessionCookieName } from "@/lib/session";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  try {
    const token = request.cookies.get(getSessionCookieName())?.value ?? null;
    const session = token ? await fetchProfileBySession(token) : null;

    if (!session) {
      const response = NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      if (token) {
        clearSessionCookie(response);
      }
      return response;
    }

    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("projects")
      .select(
        "id, name, overview, language, requester_address, total_percent, created_at, collaborators ( name, role, email, payout_preference, percent )",
      )
      .eq("id", id)
      .eq("owner_profile_id", session.profile.id)
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (!data) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ project: data });
  } catch (error) {
    console.error("/api/projects/[id] error", error);
    return NextResponse.json({ error: "Unable to load project" }, { status: 500 });
  }
}
