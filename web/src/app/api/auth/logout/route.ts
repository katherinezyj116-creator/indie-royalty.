import { NextRequest, NextResponse } from "next/server";
import { clearSessionCookie, deleteSession, getSessionCookieName } from "@/lib/session";

export async function POST(request: NextRequest) {
  const token = request.cookies.get(getSessionCookieName())?.value ?? null;
  if (token) {
    await deleteSession(token);
  }
  const response = NextResponse.json({ ok: true });
  clearSessionCookie(response);
  return response;
}
