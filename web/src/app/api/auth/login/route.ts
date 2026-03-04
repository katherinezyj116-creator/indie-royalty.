import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({
    token: "mock-token-login",
    profile: {
      email: body.email,
      name: "Returning creator",
    },
  });
}
