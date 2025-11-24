import { NextResponse } from "next/server";

// Auth callback disabled - redirect to home
export async function GET(request: Request) {
  const { origin } = new URL(request.url);
  return NextResponse.redirect(`${origin}/`);
}
