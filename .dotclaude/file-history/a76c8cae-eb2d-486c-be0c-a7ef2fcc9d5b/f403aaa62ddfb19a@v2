import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const redirectTo = searchParams.get("redirectTo") || "/";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Successfully authenticated - redirect to intended destination
      return NextResponse.redirect(`${origin}${redirectTo}`);
    }
  }

  // If there's an error or no code, redirect to login
  return NextResponse.redirect(`${origin}/auth/login`);
}
