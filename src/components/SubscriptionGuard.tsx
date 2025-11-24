"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

interface SubscriptionGuardProps {
  children: React.ReactNode;
}

export function SubscriptionGuard({ children }: SubscriptionGuardProps) {
  // Authentication and subscription checks disabled - allow all access
  return <>{children}</>;
  
  /* DISABLED - Original subscription guard code
  const router = useRouter();
  const { user, profile, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    return null;
  }

  // Check if user has active subscription
  const hasAccess = profile.subscription_status === "active";

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="max-w-md w-full"
        >
          <Card className="border-2 border-blue-200 shadow-2xl">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <Lock className="w-10 h-10 text-white" />
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  Subscription Required
                </span>
              </h2>

              <p className="text-slate-600 mb-6 leading-relaxed">
                To access this module and all practice features, you need an
                active subscription. Choose a plan that works for you!
              </p>

              <div className="space-y-3">
                <Button
                  onClick={() => router.push("/pricing")}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-lg"
                >
                  View Plans
                </Button>

                <Button
                  onClick={() => router.push("/")}
                  variant="outline"
                  className="w-full border-blue-200 text-blue-600 hover:bg-blue-50"
                >
                  Back to Home
                </Button>
              </div>

              {profile.subscription_status === "past_due" && (
                <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-amber-900">
                    <strong>Payment Issue:</strong> Your subscription is past
                    due. Please update your payment method in your{" "}
                    <button
                      onClick={() => router.push("/account")}
                      className="underline hover:text-amber-700"
                    >
                      account settings
                    </button>
                    .
                  </p>
                </div>
              )}

              {profile.subscription_status === "canceled" && (
                <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-lg">
                  <p className="text-sm text-slate-700">
                    Your subscription has been canceled. Subscribe again to
                    regain access to all features.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
  */
}
