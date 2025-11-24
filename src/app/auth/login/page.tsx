"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Login disabled - redirect to home
export default function LoginPage() {
  const router = useRouter();
  
  useEffect(() => {
    router.push("/");
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center">
      <p className="text-slate-600">Redirecting...</p>
    </div>
  );
}
