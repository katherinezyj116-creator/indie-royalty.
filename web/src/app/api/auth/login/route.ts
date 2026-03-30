import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { attachSessionCookie, createSession, deleteSession, getSessionCookieName } from "@/lib/session";

export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseClient();
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
    }

    const normalizedEmail = (email as string).trim().toLowerCase();

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("id, email, display_name, password_hash")
      .eq("email", normalizedEmail)
      .maybeSingle();

    if (error && error.code !== "PGRST116") {
      throw error;
    }

    if (!profile) {
      return NextResponse.json({ error: "Account not found" }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, profile.password_hash);

    if (!valid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // clear existing session for this browser if present
    const existingToken = request.cookies.get(getSessionCookieName())?.value ?? null;
    if (existingToken) {
      await deleteSession(existingToken);
    }

    const session = await createSession(profile.id);
    const response = NextResponse.json({
      profile: {
        id: profile.id,
        email: profile.email,
        name: profile.display_name,
      },
    });
    attachSessionCookie(response, session.token, session.expiresAt);
    return response;
  } catch (error) {
    console.error("/api/auth/login error", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to log in." },
      { status: 500 },
    );
  }
}
