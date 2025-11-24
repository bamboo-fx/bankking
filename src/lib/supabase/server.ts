// Supabase disabled - no authentication needed
// This file is kept for compatibility but returns a mock client
import { cookies } from "next/headers";

export async function createClient() {
  await cookies(); // Just to satisfy the async requirement
  
  // Return a mock object that won't break if accidentally called
  return {
    auth: {
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      exchangeCodeForSession: () => Promise.resolve({ error: { message: "Auth disabled" } }),
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          single: () => Promise.resolve({ data: null, error: null }),
        }),
      }),
    }),
  } as any;
}
