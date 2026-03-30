import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { getSupabaseClient } from "./supabaseClient";

const SESSION_COOKIE_NAME = "ir_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

export type SessionProfile = {
  id: string;
  email: string;
  display_name: string | null;
};

export async function createSession(profileId: string) {
  const supabase = getSupabaseClient();
  const token = `${randomUUID()}${randomUUID()}`;
  const expiresAt = new Date(Date.now() + SESSION_MAX_AGE_SECONDS * 1000);

  const { error } = await supabase.from("sessions").insert([
    {
      token,
      profile_id: profileId,
      expires_at: expiresAt.toISOString(),
    },
  ]);

  if (error) {
    throw error;
  }

  return { token, expiresAt };
}

export async function deleteSession(token: string) {
  if (!token) return;
  const supabase = getSupabaseClient();
  await supabase.from("sessions").delete().eq("token", token);
}

export function attachSessionCookie(response: NextResponse, token: string, expiresAt: Date) {
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: "",
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 0,
  });
}

export async function fetchProfileBySession(token: string) {
  if (!token) return null;

  const supabase = getSupabaseClient();
  const nowIso = new Date().toISOString();
  const { data: session, error: sessionError } = await supabase
    .from("sessions")
    .select("profile_id, expires_at")
    .eq("token", token)
    .gt("expires_at", nowIso)
    .maybeSingle();

  if (sessionError && sessionError.code !== "PGRST116") {
    throw sessionError;
  }

  if (!session) {
    return null;
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, email, display_name")
    .eq("id", session.profile_id)
    .single();

  if (profileError || !profile) {
    return null;
  }

  return {
    token,
    profile: {
      id: profile.id,
      email: profile.email,
      display_name: profile.display_name,
    },
  };
}

export function getSessionCookieName() {
  return SESSION_COOKIE_NAME;
}
