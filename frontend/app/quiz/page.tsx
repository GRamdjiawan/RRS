"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  ShieldAlert,
  XCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useAuth } from "@/components/auth-provider"
import { UserNav } from "@/components/user-nav"

export default function QuizPage() {
  const router = useRouter()
  const { user } = useAuth()

  const [quizQuestions, setQuizQuestions] = useState<any[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showFeedback, setShowFeedback] = useState(false)
  const [score, setScore] = useState(0)
  const [quizComplete, setQuizComplete] = useState(false)
  const [userAnswers, setUserAnswers] = useState<
    { correct: boolean; selectedAnswer: number }[]
  >([])

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://localhost:3030/api/quiz/questions")
        const data = await response.json()
        setQuizQuestions(data.questions || [])
        setSelectedAnswers(Array(data.questions.length).fill(-1))
      } catch (error) {
        console.error("Error fetching quiz questions:", error)
      }
    }

    fetchQuestions()
  }, [])

  if (quizQuestions.length === 0) return <p>Loading quiz...</p>

  const question = quizQuestions[currentQuestion]
  const isAnswerSelected = selectedAnswers[currentQuestion] !== -1
  const isCorrect = selectedAnswers[currentQuestion] === question.correctAnswer
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const handleSubmitAnswer = () => {
    const selectedAnswer = selectedAnswers[currentQuestion]
    const isCorrect = selectedAnswer === question.correctAnswer

    if (isCorrect) setScore((prev) => prev + 1)

    const newUserAnswers = [...userAnswers]
    newUserAnswers[currentQuestion] = { correct: isCorrect, selectedAnswer }
    setUserAnswers(newUserAnswers)

    setShowFeedback(true)
  }

  const handleNextQuestion = () => {
    setShowFeedback(false)

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setQuizComplete(true)

      const results = {
        score,
        totalQuestions: quizQuestions.length,
        answers: userAnswers,
        questions: quizQuestions,
        completedAt: new Date().toISOString(),
      }

      localStorage.setItem("quizResults", JSON.stringify(results))
      router.push("/results")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col min-h-screen">
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Ransomware Response Quiz</h1>
        </div>
        <UserNav />
      </header>

      <main className="flex-1 flex flex-col max-w-3xl mx-auto w-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Vraag {currentQuestion + 1} van {quizQuestions.length}
            </span>
          </div>
          <div className="text-sm">
            Score: <span className="font-medium">{score}</span> /{" "}
            {currentQuestion + (showFeedback ? 1 : 0)}
          </div>
        </div>

        <Progress value={progress} className="h-2 mb-6" />

        <Card className="border-border w-full">
          <CardHeader>
            <CardTitle className="text-xl">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <ShieldAlert className="h-4 w-4 text-primary" />
                </div>
                <div>{question.question}</div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={selectedAnswers[currentQuestion].toString()}
              onValueChange={(value) => handleAnswerSelect(parseInt(value))}
              className="space-y-3"
              disabled={showFeedback}
            >
              {question.options.map((option: string, index: number) => (
                <div key={index} className="flex items-start space-x-2">
                  <RadioGroupItem
                    value={index.toString()}
                    id={`option-${index}`}
                    className={
                      showFeedback
                        ? index === question.correctAnswer
                          ? "border-green-500 text-green-500"
                          : selectedAnswers[currentQuestion] === index
                          ? "border-red-500 text-red-500"
                          : ""
                        : ""
                    }
                  />
                  <Label
                    htmlFor={`option-${index}`}
                    className={
                      showFeedback
                        ? index === question.correctAnswer
                          ? "text-green-500"
                          : selectedAnswers[currentQuestion] === index
                          ? "text-red-500"
                          : ""
                        : ""
                    }
                  >
                    {option}
                    {showFeedback &&
                      index === question.correctAnswer && (
                        <CheckCircle2 className="ml-2 inline h-4 w-4 text-green-500" />
                      )}
                    {showFeedback &&
                      selectedAnswers[currentQuestion] === index &&
                      index !== question.correctAnswer && (
                        <XCircle className="ml-2 inline h-4 w-4 text-red-500" />
                      )}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {showFeedback && (
              <Alert
                className={`mt-6 ${
                  isCorrect
                    ? "border-green-500/50 bg-green-500/10"
                    : "border-red-500/50 bg-red-500/10"
                }`}
              >
                <div className="flex gap-2">
                  {isCorrect ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  )}
                  <div>
                    <AlertTitle
                      className={isCorrect ? "text-green-500" : "text-red-500"}
                    >
                      {isCorrect ? "Correct!" : "Incorrect"}
                    </AlertTitle>
                    <AlertDescription className="mt-1 text-sm">
                      {question.explanation}
                    </AlertDescription>
                  </div>
                </div>
              </Alert>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              Ingelogd als {user?.name}
            </div>
            <div>
              {!showFeedback ? (
                <Button onClick={handleSubmitAnswer} disabled={!isAnswerSelected}>
                  Controleer antwoord
                </Button>
              ) : (
                <Button onClick={handleNextQuestion}>
                  {currentQuestion < quizQuestions.length - 1
                    ? "Volgende vraag"
                    : "Bekijk resultaten"}
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
