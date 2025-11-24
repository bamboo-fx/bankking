"use client";

// Authentication disabled - provide a simple stub for compatibility
import { createContext, useContext } from "react";

interface AuthContextType {
  user: null;
  profile: null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const defaultValue: AuthContextType = {
  user: null,
  profile: null,
  loading: false,
  signOut: async () => {},
  refreshProfile: async () => {},
};

const AuthContext = createContext<AuthContextType>(defaultValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <AuthContext.Provider value={defaultValue}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
