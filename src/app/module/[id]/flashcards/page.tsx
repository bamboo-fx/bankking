"use client";

import { useState, use } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, RotateCw, ChevronLeft, ChevronRight, Layers, CheckCircle } from "lucide-react";
import { questionBank, type FlashcardQuestion } from "@/lib/questionBank";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
// import { SubscriptionGuard } from "@/components/SubscriptionGuard";

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default function FlashcardsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [questions, setQuestions] = useState<FlashcardQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const moduleQuestions = questionBank[id];

  const startRound = () => {
    if (moduleQuestions?.flashcards) {
      const shuffled = shuffleArray(moduleQuestions.flashcards);
      setQuestions(shuffled.slice(0, 10));
      setCurrentIndex(0);
      setIsFlipped(false);
      setIsStarted(true);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  if (!moduleQuestions) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center px-4">
        <Card className="p-8 max-w-md text-center shadow-xl border-2 border-blue-100">
          <p className="text-xl text-slate-700">Module not found</p>
          <Link href="/" className="inline-block mt-4">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Go Home
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  if (!isStarted) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6 sm:mb-8"
            >
              <Link href={`/module/${id}`}>
                <Button variant="outline" className="gap-2 hover:bg-blue-50 hover:border-blue-300 transition-all shadow-sm">
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Back to Module</span>
                  <span className="sm:hidden">Back</span>
                </Button>
              </Link>
            </motion.div>

            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-8 sm:mb-10"
              >
                <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4">
                  <motion.div
                    initial={{ rotate: -10, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg"
                  >
                    <Layers className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </motion.div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                    <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent">
                      Flashcards
                    </span>
                  </h1>
                </div>
                <p className="text-base sm:text-lg text-slate-600 px-4">
                  Review key concepts with 10 random flashcards
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="p-6 sm:p-8 lg:p-10 mb-6 sm:mb-8 border-2 border-blue-100 shadow-2xl bg-white/90 backdrop-blur-md hover:shadow-blue-200/50 transition-all">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-6 sm:mb-8 text-blue-600">How it works:</h2>
                  <ul className="text-left space-y-4 sm:space-y-5 text-slate-700">
                    {[
                      "You'll see 10 random flashcards from this module",
                      "Click the card to flip and see the answer",
                      "Use the navigation buttons to move between cards",
                      "Start a new round anytime to get different questions"
                    ].map((text, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="flex items-start gap-3 sm:gap-4"
                      >
                        <Badge className="mt-0.5 text-sm sm:text-base bg-blue-600 hover:bg-blue-700 shrink-0">{i + 1}</Badge>
                        <span className="text-sm sm:text-base lg:text-lg">{text}</span>
                      </motion.li>
                    ))}
                  </ul>
                </Card>

                <Button
                  onClick={startRound}
                  size="lg"
                  className="gap-2 shadow-xl text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 transition-all hover:shadow-blue-300/50 hover:scale-105"
                >
                  <Layers className="w-5 h-5" />
                  Start Flashcards
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4"
        >
          <Link href={`/module/${id}`}>
            <Button variant="outline" className="gap-2 hover:bg-blue-50 hover:border-blue-300 transition-all shadow-sm">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </Button>
          </Link>
          <Button onClick={startRound} variant="secondary" className="gap-2 shadow-sm hover:shadow-md transition-all">
            <RotateCw className="w-4 h-4" />
            New Round
          </Button>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 sm:mb-8"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-2">
              <Badge variant="secondary" className="text-sm sm:text-base px-3 py-1">
                Card {currentIndex + 1} of {questions.length}
              </Badge>
              <span className="text-sm sm:text-base text-slate-600 font-medium">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <Progress value={progress} className="h-3 sm:h-4" />
          </motion.div>

          <div className="mb-6 sm:mb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentIndex}-${isFlipped}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                onClick={handleFlip}
                className="cursor-pointer"
              >
                <Card className="border-2 border-blue-100 hover:border-blue-300 transition-all shadow-2xl bg-gradient-to-br from-white to-blue-50/30 backdrop-blur-md overflow-hidden hover:shadow-blue-300/50 hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent"></div>
                  <div className="relative z-10 p-8 sm:p-12 lg:p-16 min-h-[350px] sm:min-h-[400px] lg:min-h-[450px] flex flex-col items-center justify-center text-center">
                    {!isFlipped ? (
                      <>
                        <Badge className="mb-4 sm:mb-6 bg-blue-600 text-xs sm:text-sm px-3 py-1">QUESTION</Badge>
                        <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-slate-900 font-medium leading-relaxed px-4">
                          {currentQuestion.question}
                        </p>
                        <div className="mt-8 sm:mt-12 flex items-center gap-2 text-blue-600 font-medium animate-pulse">
                          <RotateCw className="w-4 h-4" />
                          <span className="text-xs sm:text-sm">Click to reveal answer</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <Badge className="mb-4 sm:mb-6 bg-green-600 text-xs sm:text-sm px-3 py-1">ANSWER</Badge>
                        <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-slate-900 leading-relaxed px-4">
                          {currentQuestion.answer}
                        </p>
                        <div className="mt-8 sm:mt-12 flex items-center gap-2 text-slate-500 font-medium">
                          <RotateCw className="w-4 h-4" />
                          <span className="text-xs sm:text-sm">Click to see question</span>
                        </div>
                      </>
                    )}
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4">
            <Button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              variant="outline"
              size="lg"
              className="gap-2 flex-1 sm:flex-initial hover:bg-blue-50 hover:border-blue-300 transition-all disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Previous</span>
              <span className="sm:hidden">Prev</span>
            </Button>

            <Button
              onClick={handleFlip}
              variant="secondary"
              size="lg"
              className="gap-2 flex-1 sm:flex-initial shadow-md hover:shadow-lg transition-all"
            >
              <RotateCw className="w-5 h-5" />
              <span className="hidden sm:inline">{isFlipped ? "Show Question" : "Show Answer"}</span>
              <span className="sm:hidden">Flip</span>
            </Button>

            <Button
              onClick={handleNext}
              disabled={currentIndex === questions.length - 1}
              variant="outline"
              size="lg"
              className="gap-2 flex-1 sm:flex-initial hover:bg-blue-50 hover:border-blue-300 transition-all disabled:opacity-50"
            >
              <span className="hidden sm:inline">Next</span>
              <span className="sm:hidden">Next</span>
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {currentIndex === questions.length - 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 sm:mt-8"
            >
              <Card className="p-6 sm:p-8 lg:p-10 text-center border-2 border-green-200 bg-gradient-to-br from-green-50 to-white shadow-2xl hover:shadow-green-200/50 transition-all">
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <p className="text-green-800 font-semibold text-lg sm:text-xl lg:text-2xl mb-6 px-4">
                  You've completed all flashcards in this round!
                </p>
                <Button
                  onClick={startRound}
                  className="gap-2 text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 shadow-xl hover:shadow-green-300/50 transition-all hover:scale-105"
                >
                  <RotateCw className="w-5 h-5" />
                  Start New Round
                </Button>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
      </div>
  );
}
