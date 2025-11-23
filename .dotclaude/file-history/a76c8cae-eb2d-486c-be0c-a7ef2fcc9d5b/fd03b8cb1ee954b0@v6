"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Layers, Brain, MessageSquare } from "lucide-react";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SubscriptionGuard } from "@/components/SubscriptionGuard";

const modules: Record<string, { title: string; description: string; color: string }> = {
  accounting: {
    title: "Accounting",
    description: "Master fundamental accounting concepts and financial statements",
    color: "from-blue-500 to-blue-600",
  },
  valuation: {
    title: "Valuation",
    description: "Learn valuation methodologies and techniques",
    color: "from-purple-500 to-purple-600",
  },
  "ev-vs-equity": {
    title: "Enterprise Value vs Equity Value",
    description: "Understand the bridge between EV and equity value",
    color: "from-green-500 to-green-600",
  },
  dcf: {
    title: "DCF",
    description: "Master discounted cash flow analysis",
    color: "from-orange-500 to-orange-600",
  },
  ma: {
    title: "M&A",
    description: "Learn mergers and acquisitions concepts",
    color: "from-red-500 to-red-600",
  },
  lbo: {
    title: "LBO",
    description: "Understand leveraged buyout modeling",
    color: "from-indigo-500 to-indigo-600",
  },
};

const learningModes = [
  {
    id: "flashcards",
    title: "Flashcards",
    description: "Review key concepts with 10 random flashcards per round",
    icon: Layers,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200 hover:border-blue-400",
  },
  {
    id: "quiz",
    title: "Multiple Choice Quiz",
    description: "Test your knowledge with 5 random questions",
    icon: Brain,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200 hover:border-green-400",
  },
  {
    id: "open-ended",
    title: "Open-Ended Practice",
    description: "Practice answering questions and get AI feedback",
    icon: MessageSquare,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200 hover:border-purple-400",
  },
];

export default function ModulePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const module = modules[id];

  if (!module) {
    notFound();
  }

  return (
    <SubscriptionGuard>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6 sm:mb-8"
          >
            <Link href="/">
              <Button variant="outline" className="gap-2 hover:bg-blue-50 hover:border-blue-300 transition-all shadow-sm">
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back to Modules</span>
                <span className="sm:hidden">Back</span>
              </Button>
            </Link>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8 sm:mb-10"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-6"
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-3 relative inline-block">
                  <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent">
                    {module.title}
                  </span>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 rounded-full"
                  />
                </h1>
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto px-4"
              >
                {module.description}
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6"
            >
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-6 text-center">
                Choose Your Learning Mode
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                {learningModes.map((mode, index) => {
                  const Icon = mode.icon;
                  return (
                    <motion.div
                      key={mode.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                    >
                      <Link href={`/module/${id}/${mode.id}`}>
                        <Card className="group h-full border-2 border-blue-100 hover:border-blue-300 bg-white/90 backdrop-blur-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                          <CardContent className="p-6 flex flex-col items-center text-center h-full">
                            <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br ${mode.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300 mb-4`}>
                              <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                              {mode.title}
                            </h3>
                            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                              {mode.description}
                            </p>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </SubscriptionGuard>
  );
}
