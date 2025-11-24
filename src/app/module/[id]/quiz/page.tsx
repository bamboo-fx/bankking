"use client";

import { useState, use } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, RotateCw, ChevronLeft, ChevronRight, CheckCircle2, XCircle, Award, Brain } from "lucide-react";
import { questionBank, type QuizQuestion } from "@/lib/questionBank";
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

export default function QuizPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const moduleQuestions = questionBank[id];

  const startQuiz = () => {
    if (moduleQuestions?.quiz) {
      const shuffled = shuffleArray(moduleQuestions.quiz);
      const quizQuestions = shuffled.slice(0, 5);
      setQuestions(quizQuestions);
      setSelectedAnswers(new Array(quizQuestions.length).fill(null));
      setCurrentIndex(0);
      setShowResults(false);
      setIsStarted(true);
    }
  };

  const handleSelectAnswer = (answerIndex: number) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentIndex] = answerIndex;
    setSelectedAnswers(newSelectedAnswers);
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

  const handleSubmit = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    let correct = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        correct++;
      }
    });
    return correct;
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
                  <Brain className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </motion.div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                  <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent">
                    Quiz
                  </span>
                </h1>
              </div>
              <p className="text-base sm:text-lg text-slate-600 px-4">
                Test your knowledge with 5 random questions
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Card className="p-6 sm:p-8 lg:p-10 mb-6 sm:mb-8 border-2 border-blue-100 shadow-2xl bg-white/90 backdrop-blur-md hover:shadow-blue-200/50 transition-all">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-6 sm:mb-8 text-blue-600">How it works:</h2>
                <ul className="text-left space-y-4 sm:space-y-5 text-slate-700">
                  {["Answer 5 multiple choice questions", "Select the best answer for each question", "Navigate between questions before submitting", "Review your results with detailed explanations"].map((text, i) => (
                    <motion.li key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.1 }} className="flex items-start gap-3 sm:gap-4">
                      <Badge className="mt-0.5 text-sm sm:text-base bg-blue-600 hover:bg-blue-700 shrink-0">{i + 1}</Badge>
                      <span className="text-sm sm:text-base lg:text-lg">{text}</span>
                    </motion.li>
                  ))}
                </ul>
              </Card>
              <Button onClick={startQuiz} size="lg" className="gap-2 shadow-xl text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 transition-all hover:shadow-blue-300/50 hover:scale-105">
                <Brain className="w-5 h-5" />
                Start Quiz
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const percentage = (score / questions.length) * 100;
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 sm:mb-8">
            <Link href={`/module/${id}`}>
              <Button variant="outline" className="gap-2 hover:bg-blue-50 hover:border-blue-300 transition-all shadow-sm">
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back to Module</span>
                <span className="sm:hidden">Back</span>
              </Button>
            </Link>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" }}>
              <Card className="p-6 sm:p-8 lg:p-10 mb-8 sm:mb-10 text-center border-2 border-blue-100 shadow-2xl bg-gradient-to-br from-white to-blue-50/30 backdrop-blur-md hover:shadow-blue-200/50 transition-all">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }}>
                  <div className="w-20 h-20 mx-auto mb-4 sm:mb-6 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <Award className="w-10 h-10 text-white" />
                  </div>
                </motion.div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">Quiz Results</h1>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <div className="inline-flex items-center gap-3 sm:gap-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 sm:px-8 py-4 sm:py-5 rounded-2xl mb-6 shadow-xl hover:shadow-blue-300/50 transition-all">
                    <div>
                      <p className="text-3xl sm:text-4xl lg:text-5xl font-bold">{score} / {questions.length}</p>
                      <p className="text-sm sm:text-base opacity-90">{percentage.toFixed(0)}% Correct</p>
                    </div>
                  </div>
                </motion.div>
                <Button onClick={startQuiz} size="lg" className="gap-2 text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-xl hover:shadow-blue-300/50 transition-all hover:scale-105">
                  <RotateCw className="w-5 h-5" />
                  Take Another Quiz
                </Button>
              </Card>
            </motion.div>

            <div className="space-y-4 sm:space-y-6">
              {questions.map((question, index) => {
                const userAnswer = selectedAnswers[index];
                const isCorrect = userAnswer === question.correctAnswer;
                return (
                  <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + index * 0.1 }}>
                    <Card className={`border-2 ${isCorrect ? "border-green-300 bg-green-50/50" : "border-red-300 bg-red-50/50"} shadow-xl hover:shadow-2xl transition-all`}>
                      <CardContent className="p-5 sm:p-6 lg:p-8">
                        <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                          {isCorrect ? (
                            <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0 mt-1" />
                          ) : (
                            <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 flex-shrink-0 mt-1" />
                          )}
                          <div className="flex-1 min-w-0">
                            <Badge className={`mb-3 text-xs sm:text-sm ${isCorrect ? "bg-green-600" : "bg-red-600"}`}>
                              Question {index + 1}
                            </Badge>
                            <p className="text-base sm:text-lg lg:text-xl font-medium text-slate-900 mb-4 leading-relaxed">{question.question}</p>

                            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                              {question.options.map((option, optionIndex) => {
                                const isUserAnswer = userAnswer === optionIndex;
                                const isCorrectAnswer = optionIndex === question.correctAnswer;
                                return (
                                  <div key={optionIndex} className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all ${isCorrectAnswer ? "border-green-500 bg-green-100" : isUserAnswer ? "border-red-500 bg-red-100" : "border-slate-200 bg-white"}`}>
                                    <div className="flex items-center justify-between gap-3">
                                      <span className="font-bold text-slate-700 shrink-0">{String.fromCharCode(65 + optionIndex)}.</span>
                                      <span className="flex-1 text-sm sm:text-base text-slate-800">{option}</span>
                                      {isCorrectAnswer && <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 shrink-0" />}
                                      {isUserAnswer && !isCorrectAnswer && <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 shrink-0" />}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>

                            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg sm:rounded-xl p-4 sm:p-5">
                              <p className="text-sm sm:text-base font-semibold text-blue-900 mb-2">Explanation:</p>
                              <p className="text-sm sm:text-base text-blue-800 leading-relaxed">{question.explanation}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const currentAnswer = selectedAnswers[currentIndex];
  const allAnswered = selectedAnswers.every((answer) => answer !== null);
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    {/* <SubscriptionGuard> */}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
          <Link href={`/module/${id}`}>
            <Button variant="outline" className="gap-2 hover:bg-blue-50 hover:border-blue-300 transition-all shadow-sm">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </Button>
          </Link>
          <Button onClick={startQuiz} variant="secondary" className="gap-2 shadow-sm hover:shadow-md transition-all">
            <RotateCw className="w-4 h-4" />
            Restart Quiz
          </Button>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
              <Badge variant="secondary" className="text-sm sm:text-base px-3 py-1">Question {currentIndex + 1} of {questions.length}</Badge>
              <span className="text-sm sm:text-base text-slate-600 font-medium">Answered: {selectedAnswers.filter((a) => a !== null).length} / {questions.length}</span>
            </div>
            <Progress value={progress} className="h-3 sm:h-4" />
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div key={currentIndex} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <Card className="shadow-2xl border-2 border-blue-100 bg-white/90 backdrop-blur-md mb-6 hover:shadow-blue-200/50 transition-all">
                <CardContent className="p-6 sm:p-8 lg:p-10">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-900 mb-6 sm:mb-8 leading-relaxed">{currentQuestion.question}</h2>
                  <div className="space-y-3 sm:space-y-4">
                    {currentQuestion.options.map((option, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handleSelectAnswer(index)}
                        className={`w-full text-left p-4 sm:p-5 lg:p-6 rounded-xl lg:rounded-2xl border-2 transition-all ${currentAnswer === index ? "border-blue-500 bg-blue-50 shadow-lg" : "border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 shadow-sm hover:shadow-md"}`}
                      >
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${currentAnswer === index ? "border-blue-500 bg-blue-500" : "border-slate-300"}`}>
                            {currentAnswer === index && <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white rounded-full"></div>}
                          </div>
                          <span className="font-bold text-slate-700 shrink-0">{String.fromCharCode(65 + index)}.</span>
                          <span className="flex-1 text-sm sm:text-base lg:text-lg text-slate-800">{option}</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
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

            {currentIndex === questions.length - 1 ? (
              <Button onClick={handleSubmit} disabled={!allAnswered} size="lg" className={`gap-2 flex-1 sm:flex-initial transition-all shadow-md hover:shadow-lg ${!allAnswered ? "opacity-50" : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"}`}>
                <CheckCircle2 className="w-5 h-5" />
                Submit Quiz
              </Button>
            ) : (
              <Button onClick={handleNext} variant="default" size="lg" className="gap-2 flex-1 sm:flex-initial shadow-md hover:shadow-lg transition-all">
                <span className="hidden sm:inline">Next</span>
                <span className="sm:hidden">Next</span>
                <ChevronRight className="w-5 h-5" />
              </Button>
            )}
          </div>

          {!allAnswered && currentIndex === questions.length - 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 sm:mt-6 text-center">
              <p className="text-sm sm:text-base text-amber-700 font-medium bg-amber-50 border-2 border-amber-200 rounded-lg p-3 sm:p-4">
                Please answer all questions before submitting
              </p>
            </motion.div>
          )}
        </div>
      </div>
      </div>
    {/* </SubscriptionGuard> */}
  );
}
