"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

export default function PricingPage() {
  const router = useRouter();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleSubscribe = async (planId: string, priceId: string) => {
    // Stripe payments disabled
    alert("Payments are currently disabled. This is a demo version.");
    setLoadingPlan(null);
    
    /* DISABLED - Original Stripe checkout code
    try {
      setLoadingPlan(planId);

      const response = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceId }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          // User not authenticated, redirect to login
          router.push("/auth/login");
          return;
        }
        throw new Error(data.error || "Failed to create checkout session");
      }

      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
      setLoadingPlan(null);
    }
    */
  };

  const pricingPlans = [
    {
      id: "monthly",
      name: "Monthly",
      price: 10,
      originalPrice: 20,
      interval: "month",
      description: "Perfect for getting started",
      popular: false,
      priceId: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID || "",
      features: [
        "Access to all 6 finance modules",
        "Interactive flashcards",
        "Multiple choice quizzes",
        "Open-ended practice with AI feedback",
        "Unlimited practice sessions",
        "Track your progress",
        "Mobile-friendly",
        "Cancel anytime",
      ],
    },
    {
      id: "yearly",
      name: "Yearly",
      price: 100,
      originalPrice: 240,
      interval: "year",
      description: "Best value - Save $140",
      popular: true,
      priceId: process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID || "",
      features: [
        "Everything in Monthly, plus:",
        "Save $140 per year (58% off)",
        "Priority email support",
        "Early access to new modules",
        "Exclusive study materials",
        "Custom progress reports",
        "Interview tips newsletter",
        "Dedicated account manager",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-3">
            <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent">
              Simple, transparent pricing
            </span>
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-2xl mx-auto">
            Choose the perfect plan for your interview prep needs. Start your journey to landing your dream role.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <Card
                className={`relative h-full border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
                  plan.popular
                    ? "border-blue-400 shadow-xl bg-white"
                    : "border-blue-100 bg-white/90 backdrop-blur-sm hover:border-blue-300"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-3 py-1 text-xs shadow-lg">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardContent className="p-6 sm:p-8">
                  {/* Plan Name */}
                  <div className="text-center mb-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
                      {plan.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600">
                      {plan.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <span className="text-lg sm:text-xl text-slate-400 line-through">
                        ${plan.originalPrice}
                      </span>
                      <Badge className="bg-red-600 text-white px-2 py-0.5 text-xs">
                        {plan.id === "monthly" ? "50% OFF" : "58% OFF"}
                      </Badge>
                    </div>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                        ${plan.price}
                      </span>
                      <span className="text-base sm:text-lg text-slate-600">
                        /{plan.interval}
                      </span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button
                    size="lg"
                    onClick={() => handleSubscribe(plan.id, plan.priceId)}
                    disabled={loadingPlan !== null}
                    className="w-full mb-6 text-sm sm:text-base py-4 transition-all bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loadingPlan === plan.id ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Get Started"
                    )}
                  </Button>

                  {/* Features */}
                  <div className="space-y-2">
                    {plan.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + idx * 0.03 }}
                        className="flex items-start gap-2"
                      >
                        <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-blue-600" />
                        </div>
                        <span className="text-xs sm:text-sm text-slate-700">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <Check className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-semibold text-slate-900 text-sm mb-0.5">Secure Payment</h4>
              <p className="text-xs text-slate-600">Encrypted & safe</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                <Check className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-semibold text-slate-900 text-sm mb-0.5">Cancel Anytime</h4>
              <p className="text-xs text-slate-600">No commitments</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                <Check className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-semibold text-slate-900 text-sm mb-0.5">Money Back</h4>
              <p className="text-xs text-slate-600">30-day guarantee</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

