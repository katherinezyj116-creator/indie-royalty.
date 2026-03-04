import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({
    token: "mock-token-abc",
    profile: {
      email: body.email,
      name: body.name || "Indie Creator",
    },
  });
}
