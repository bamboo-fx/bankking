"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Chrome, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/";

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?redirectTo=${redirectTo}`,
      },
    });

    if (error) {
      console.error("Error signing in:", error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-2 border-blue-100 shadow-2xl bg-white/90 backdrop-blur-md">
          <CardContent className="p-8 sm:p-10">
            {/* Logo/Title */}
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
                <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent">
                  Welcome Back
                </span>
              </h1>
              <p className="text-slate-600 text-sm sm:text-base">
                Sign in to continue your interview prep
              </p>
            </div>

            {/* Google Sign In Button */}
            <Button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              size="lg"
              className="w-full bg-white hover:bg-gray-50 text-slate-900 border-2 border-slate-200 hover:border-slate-300 shadow-md transition-all"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Chrome className="w-5 h-5 mr-2" />
                  Continue with Google
                </>
              )}
            </Button>

            {/* Terms */}
            <p className="text-xs text-slate-500 text-center mt-6">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
          >
            ← Back to home
          </a>
        </div>
      </motion.div>
    </div>
  );
}
