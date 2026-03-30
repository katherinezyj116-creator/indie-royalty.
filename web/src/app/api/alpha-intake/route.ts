import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { clearSessionCookie, fetchProfileBySession, getSessionCookieName } from "@/lib/session";

export async function POST(request: NextRequest) {
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

    const body = await request.json();
    const { name, email, role, revenue_range, current_process, language } =
      body ?? {};

    if (!name || !email || !role || !revenue_range) {
      return NextResponse.json(
        { error: "Name, email, role, and revenue range are required." },
        { status: 400 },
      );
    }

    const { error } = await supabase.from("alpha_intake").insert([
      {
        name,
        email,
        role,
        revenue_range,
        current_process,
        language: language ?? "en",
        profile_id: session.profile.id,
      },
    ]);

    if (error) {
      throw error;
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("/api/alpha-intake error", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unexpected error while saving alpha intake.",
      },
      { status: 500 },
    );
  }
}
