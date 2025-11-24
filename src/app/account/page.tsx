"use client";

// Authentication and Stripe disabled - showing simple message instead
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AccountPage() {
  const router = useRouter();

  // Account page simplified - no auth/subscription required
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
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Account Features Disabled
              </span>
            </h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Authentication and subscription features are currently disabled. 
              You can still access all learning modules without an account.
            </p>
            <Button
              onClick={() => router.push("/")}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
            >
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );

  /* DISABLED - Original account page with authentication
  import { useEffect, useState } from "react";
  import { useRouter, useSearchParams } from "next/navigation";
  import { motion } from "framer-motion";
  import {
    User,
    Mail,
    CreditCard,
    CheckCircle,
    XCircle,
    AlertCircle,
    LogOut,
    Loader2,
    ExternalLink,
  } from "lucide-react";
  import { Button } from "@/components/ui/button";
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
  import { Badge } from "@/components/ui/badge";
  import { useAuth } from "@/contexts/AuthContext";

  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, profile, loading, signOut } = useAuth();
  const [isManagingSubscription, setIsManagingSubscription] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCanceled, setShowCanceled] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (searchParams.get("success") === "true") {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    }
    if (searchParams.get("canceled") === "true") {
      setShowCanceled(true);
      setTimeout(() => setShowCanceled(false), 5000);
    }
  }, [searchParams]);

  const handleManageSubscription = async () => {
    try {
      setIsManagingSubscription(true);

      const response = await fetch("/api/stripe/portal", {
        method: "GET",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to open subscription portal");
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Error opening subscription portal:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
      setIsManagingSubscription(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          <p className="text-slate-600">Loading your account...</p>
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    return null;
  }

  const getSubscriptionBadge = () => {
    const status = profile.subscription_status;

    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-500 text-white">
            <CheckCircle className="w-3 h-3 mr-1" />
            Active
          </Badge>
        );
      case "canceled":
        return (
          <Badge className="bg-red-500 text-white">
            <XCircle className="w-3 h-3 mr-1" />
            Canceled
          </Badge>
        );
      case "past_due":
        return (
          <Badge className="bg-amber-500 text-white">
            <AlertCircle className="w-3 h-3 mr-1" />
            Past Due
          </Badge>
        );
      default:
        return (
          <Badge className="bg-slate-400 text-white">
            <AlertCircle className="w-3 h-3 mr-1" />
            Free
          </Badge>
        );
    }
  };

  const getTierDisplay = () => {
    if (!profile.subscription_tier) return "No active subscription";
    return profile.subscription_tier === "yearly"
      ? "Yearly Plan ($100/year)"
      : "Monthly Plan ($10/month)";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Success/Cancel Messages */}
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <h4 className="font-semibold text-green-900">
                  Subscription Successful!
                </h4>
                <p className="text-sm text-green-700">
                  Your payment was processed successfully. Welcome aboard!
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {showCanceled && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-amber-50 border-2 border-amber-200 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              <div>
                <h4 className="font-semibold text-amber-900">
                  Checkout Canceled
                </h4>
                <p className="text-sm text-amber-700">
                  No worries! You can subscribe anytime.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent">
              My Account
            </span>
          </h1>
          <p className="text-slate-600">
            Manage your profile and subscription
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Profile Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-2 border-blue-100 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <User className="w-5 h-5 text-blue-600" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                    {profile.full_name
                      ? profile.full_name.charAt(0).toUpperCase()
                      : profile.email.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">
                      {profile.full_name || "No name set"}
                    </p>
                    <p className="text-sm text-slate-600 flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {profile.email}
                    </p>
                  </div>
                </div>

                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Subscription Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-2 border-blue-100 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  Subscription
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Status</span>
                    {getSubscriptionBadge()}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Plan</span>
                    <span className="font-semibold text-slate-900">
                      {getTierDisplay()}
                    </span>
                  </div>

                  {profile.subscription_status === "active" &&
                    profile.subscription_tier && (
                      <div className="pt-2 border-t border-slate-200">
                        <p className="text-xs text-slate-500">
                          You have full access to all modules and features
                        </p>
                      </div>
                    )}

                  {profile.subscription_status === "free" && (
                    <div className="pt-2 border-t border-slate-200">
                      <p className="text-xs text-slate-500 mb-3">
                        Upgrade to access all features
                      </p>
                      <Button
                        onClick={() => router.push("/pricing")}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
                      >
                        View Plans
                      </Button>
                    </div>
                  )}
                </div>

                {profile.subscription_status === "active" && (
                  <Button
                    onClick={handleManageSubscription}
                    disabled={isManagingSubscription}
                    variant="outline"
                    className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300"
                  >
                    {isManagingSubscription ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Opening portal...
                      </>
                    ) : (
                      <>
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Manage Subscription
                      </>
                    )}
                  </Button>
                )}

                {profile.subscription_status === "past_due" && (
                  <div className="pt-2 border-t border-amber-200 bg-amber-50 p-3 rounded-lg">
                    <p className="text-sm text-amber-900 font-semibold mb-2">
                      Payment Issue
                    </p>
                    <p className="text-xs text-amber-700 mb-3">
                      There was a problem with your payment. Please update your
                      payment method to continue.
                    </p>
                    <Button
                      onClick={handleManageSubscription}
                      disabled={isManagingSubscription}
                      className="w-full bg-amber-600 hover:bg-amber-700"
                    >
                      Update Payment Method
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center"
        >
          <Button
            onClick={() => router.push("/")}
            variant="ghost"
            className="text-slate-600 hover:text-blue-600"
          >
            Back to Home
          </Button>
        </motion.div>
      </div>
    </div>
  );
  */
}
