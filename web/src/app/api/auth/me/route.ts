import { NextRequest, NextResponse } from "next/server";
import { clearSessionCookie, fetchProfileBySession, getSessionCookieName } from "@/lib/session";

export async function GET(request: NextRequest) {
  const token = request.cookies.get(getSessionCookieName())?.value ?? null;
  if (!token) {
    return NextResponse.json({ profile: null }, { status: 401 });
  }

  const session = await fetchProfileBySession(token);

  if (!session) {
    const response = NextResponse.json({ profile: null }, { status: 401 });
    clearSessionCookie(response);
    return response;
  }

  return NextResponse.json({
    profile: {
      id: session.profile.id,
      email: session.profile.email,
      name: session.profile.display_name,
    },
  });
}
