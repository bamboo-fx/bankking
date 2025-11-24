"use client";

import { useState, use } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, RotateCw, ChevronLeft, ChevronRight, Send, Loader2, CheckCircle, Lightbulb } from "lucide-react";
import { questionBank, type OpenEndedQuestion } from "@/lib/questionBank";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

interface QuestionState {
  userAnswer: string;
  feedback: string | null;
  isLoading: boolean;
}

export default function OpenEndedPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [questions, setQuestions] = useState<OpenEndedQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questionStates, setQuestionStates] = useState<QuestionState[]>([]);
  const [isStarted, setIsStarted] = useState(false);

  const moduleQuestions = questionBank[id];

  const startSession = () => {
    if (moduleQuestions?.openEnded) {
      const shuffled = shuffleArray(moduleQuestions.openEnded);
      const sessionQuestions = shuffled.slice(0, 5);
      setQuestions(sessionQuestions);
      setQuestionStates(sessionQuestions.map(() => ({ userAnswer: "", feedback: null, isLoading: false })));
      setCurrentIndex(0);
      setIsStarted(true);
    }
  };

  const handleAnswerChange = (value: string) => {
    const newStates = [...questionStates];
    newStates[currentIndex].userAnswer = value;
    setQuestionStates(newStates);
  };

  const handleGetFeedback = async () => {
    const currentQuestion = questions[currentIndex];
    const currentState = questionStates[currentIndex];

    if (!currentState.userAnswer.trim()) {
      alert("Please write an answer before requesting feedback");
      return;
    }

    const newStates = [...questionStates];
    newStates[currentIndex].isLoading = true;
    setQuestionStates(newStates);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: currentQuestion.question,
          userAnswer: currentState.userAnswer,
          sampleAnswer: currentQuestion.sampleAnswer,
          keyPoints: currentQuestion.keyPoints,
        }),
      });

      const data = await response.json();
      const updatedStates = [...questionStates];
      updatedStates[currentIndex].feedback = data.feedback;
      updatedStates[currentIndex].isLoading = false;
      setQuestionStates(updatedStates);
    } catch (error) {
      console.error("Error getting feedback:", error);
      const updatedStates = [...questionStates];
      updatedStates[currentIndex].feedback = "Error getting feedback. Please try again.";
      updatedStates[currentIndex].isLoading = false;
      setQuestionStates(updatedStates);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
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
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-6 sm:mb-8">
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
                  <Lightbulb className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </motion.div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                  <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent">
                    Open-Ended Practice
                  </span>
                </h1>
              </div>
              <p className="text-base sm:text-lg text-slate-600 px-4">
                Practice answering questions and get AI-powered feedback
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Card className="p-6 sm:p-8 lg:p-10 mb-6 sm:mb-8 border-2 border-blue-100 shadow-2xl bg-white/90 backdrop-blur-md hover:shadow-blue-200/50 transition-all">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-6 sm:mb-8 text-blue-600">How it works:</h2>
                <ul className="text-left space-y-4 sm:space-y-5 text-slate-700">
                  {["You'll get 5 random open-ended questions", "Type your answer in your own words", "Click 'Get Feedback' to receive AI analysis", "Review sample answers and key points", "Navigate between questions to practice at your pace"].map((text, i) => (
                    <motion.li key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.1 }} className="flex items-start gap-3 sm:gap-4">
                      <Badge className="mt-0.5 text-sm sm:text-base bg-blue-600 hover:bg-blue-700 shrink-0">{i + 1}</Badge>
                      <span className="text-sm sm:text-base lg:text-lg">{text}</span>
                    </motion.li>
                  ))}
                </ul>
              </Card>
              <Button onClick={startSession} size="lg" className="gap-2 shadow-xl text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 transition-all hover:shadow-blue-300/50 hover:scale-105">
                <Lightbulb className="w-5 h-5" />
                Start Practice
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const currentState = questionStates[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
          <Link href={`/module/${id}`}>
            <Button variant="outline" className="gap-2 hover:bg-blue-50 hover:border-blue-300 transition-all shadow-sm">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </Button>
          </Link>
          <Button onClick={startSession} variant="secondary" className="gap-2 shadow-sm hover:shadow-md transition-all">
            <RotateCw className="w-4 h-4" />
            New Session
          </Button>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
              <Badge variant="secondary" className="text-sm sm:text-base px-3 py-1">Question {currentIndex + 1} of {questions.length}</Badge>
              <span className="text-sm sm:text-base text-slate-600 font-medium">Answered: {questionStates.filter((s) => s.userAnswer.trim()).length} / {questions.length}</span>
            </div>
            <Progress value={progress} className="h-3 sm:h-4" />
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div key={currentIndex} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <Card className="shadow-2xl border-2 border-blue-100 bg-white/90 backdrop-blur-md mb-6 sm:mb-8 hover:shadow-blue-200/50 transition-all">
                <CardContent className="p-6 sm:p-8 lg:p-10">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-900 mb-6 sm:mb-8 leading-relaxed">{currentQuestion.question}</h2>

                  <div className="mb-6 sm:mb-8">
                    <label className="block text-sm sm:text-base font-semibold text-slate-700 mb-3 sm:mb-4">Your Answer:</label>
                    <textarea
                      value={currentState.userAnswer}
                      onChange={(e) => handleAnswerChange(e.target.value)}
                      placeholder="Type your answer here... Be as detailed as possible."
                      className="w-full h-40 sm:h-48 lg:h-56 p-4 sm:p-5 lg:p-6 border-2 border-slate-300 rounded-xl lg:rounded-2xl focus:border-blue-500 focus:outline-none resize-none focus:ring-2 focus:ring-blue-200 transition-all text-sm sm:text-base lg:text-lg placeholder:text-slate-400"
                      disabled={currentState.isLoading}
                    />
                  </div>

                  <Button
                    onClick={handleGetFeedback}
                    disabled={currentState.isLoading || !currentState.userAnswer.trim()}
                    size="lg"
                    className="w-full gap-2 text-base sm:text-lg py-5 sm:py-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 disabled:opacity-50 shadow-md hover:shadow-lg transition-all"
                  >
                    {currentState.isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Getting Feedback...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Get AI Feedback
                      </>
                    )}
                  </Button>

                  <AnimatePresence>
                    {currentState.feedback && (
                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
                          <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white shadow-lg hover:shadow-xl transition-all">
                            <CardContent className="p-5 sm:p-6 lg:p-8">
                              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 shrink-0" />
                                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-blue-900">AI Feedback:</h3>
                              </div>
                              <p className="text-sm sm:text-base lg:text-lg text-blue-800 whitespace-pre-wrap leading-relaxed">{currentState.feedback}</p>
                            </CardContent>
                          </Card>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
                          <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-white shadow-lg hover:shadow-xl transition-all">
                            <CardContent className="p-5 sm:p-6 lg:p-8">
                              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-green-900 mb-4 sm:mb-5">Sample Answer:</h3>
                              <p className="text-sm sm:text-base lg:text-lg text-green-800 mb-5 sm:mb-6 leading-relaxed">{currentQuestion.sampleAnswer}</p>
                              <div className="border-t-2 border-green-200 pt-4 sm:pt-5">
                                <h4 className="text-base sm:text-lg lg:text-xl font-semibold text-green-900 mb-3 sm:mb-4">Key Points to Cover:</h4>
                                <ul className="space-y-2 sm:space-y-3">
                                  {currentQuestion.keyPoints.map((point, index) => (
                                    <motion.li key={index} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + index * 0.05 }} className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base lg:text-lg text-green-800">
                                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0 mt-0.5 sm:mt-1" />
                                      <span>{point}</span>
                                    </motion.li>
                                  ))}
                                </ul>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4">
            <Button onClick={handlePrevious} disabled={currentIndex === 0} variant="outline" size="lg" className="gap-2 flex-1 sm:flex-initial hover:bg-blue-50 hover:border-blue-300 transition-all disabled:opacity-50">
              <ChevronLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Previous</span>
              <span className="sm:hidden">Prev</span>
            </Button>

            <Button onClick={handleNext} disabled={currentIndex === questions.length - 1} variant="outline" size="lg" className="gap-2 flex-1 sm:flex-initial hover:bg-blue-50 hover:border-blue-300 transition-all disabled:opacity-50">
              <span className="hidden sm:inline">Next</span>
              <span className="sm:hidden">Next</span>
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {currentIndex === questions.length - 1 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 sm:mt-8">
              <Card className="p-6 sm:p-8 lg:p-10 text-center border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white shadow-2xl hover:shadow-blue-200/50 transition-all">
                <div className="w-16 h-16 mx-auto mb-4 sm:mb-6 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <p className="text-blue-800 font-semibold text-lg sm:text-xl lg:text-2xl mb-6 sm:mb-8 px-4">You've reached the last question!</p>
                <Button onClick={startSession} className="gap-2 text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-xl hover:shadow-blue-300/50 transition-all hover:scale-105">
                  <RotateCw className="w-5 h-5" />
                  Start New Session
                </Button>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
      </div>
  );
}
