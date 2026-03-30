import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { attachSessionCookie, createSession } from "@/lib/session";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const normalizedEmail = (email as string).trim().toLowerCase();

    const { data: existing, error: existingError } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", normalizedEmail)
      .maybeSingle();

    if (existingError && existingError.code !== "PGRST116") {
      throw existingError;
    }

    if (existing) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const { data: profile, error } = await supabase
      .from("profiles")
      .insert([
        {
          email: normalizedEmail,
          password_hash: passwordHash,
          display_name: name.trim(),
        },
      ])
      .select("id, email, display_name")
      .single();

    if (error || !profile) {
      throw error ?? new Error("Failed to create profile");
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
    console.error("/api/auth/signup error", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to sign up." },
      { status: 500 },
    );
  }
}
