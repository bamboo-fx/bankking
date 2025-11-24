// Supabase disabled - no authentication needed
// This file is kept for compatibility but returns a mock client
export function createClient() {
  // Return a mock object that won't break if accidentally called
  return {
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      signInWithOAuth: () => Promise.resolve({ error: { message: "Auth disabled" } }),
      signOut: () => Promise.resolve({ error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    },
  } as any;
}
