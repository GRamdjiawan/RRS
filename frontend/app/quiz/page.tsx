"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AlertCircle, CheckCircle2, HelpCircle, ShieldAlert, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useAuth } from "@/components/auth-provider"
import { UserNav } from "@/components/user-nav"

// Mock data for quiz questions
// COMMENT: In a real application, you would fetch these questions from an API
// Example API call:
// useEffect(() => {
//   const fetchQuestions = async () => {
//     try {
//       const response = await fetch('/api/quiz/questions');
//       const data = await response.json();
//       if (data.success) {
//         setQuizQuestions(data.questions);
//         setIsLoading(false);
//       }
//     } catch (error) {
//       console.error('Error fetching questions:', error);
//     }
//   };
//   fetchQuestions();
// }, []);

const quizQuestions = [
  {
    id: 1,
    question: "Welk van de volgende is GEEN vroeg teken van een ransomware-aanval?",
    options: [
      "Ongebruikelijke netwerkactiviteit buiten kantooruren",
      "Meerdere mislukte inlogpogingen op verschillende accounts",
      "Regelmatige software-updates van bekende leveranciers",
      "Onverwachte wijzigingen in bestandsextensies",
    ],
    correctAnswer: 2,
    explanation:
      "Regelmatige software-updates van bekende leveranciers zijn juist een teken van goede beveiliging en geen indicatie van een ransomware-aanval. De andere opties zijn allemaal mogelijke vroege tekenen van een aanval.",
  },
  {
    id: 2,
    question: "Wat moet u doen als u verdachte e-mailbijlagen ontvangt?",
    options: [
      "Open de bijlage in een beveiligde omgeving om de inhoud te controleren",
      "Stuur de e-mail door naar collega's om te vragen of zij het herkennen",
      "Meld het direct aan uw IT-beveiligingsteam zonder de bijlage te openen",
      "Antwoord de afzender om te vragen wat de bijlage bevat",
    ],
    correctAnswer: 2,
    explanation:
      "U moet verdachte e-mails direct melden aan uw IT-beveiligingsteam zonder de bijlage te openen. Het openen, doorsturen of beantwoorden kan het risico op infectie vergroten.",
  },
  {
    id: 3,
    question: "Welke actie kan het risico op een ransomware-aanval verminderen?",
    options: [
      "Alle medewerkers beheerderrechten geven voor efficiëntie",
      "Regelmatig back-ups maken en deze offline bewaren",
      "Alle externe apparaten automatisch toestaan op het netwerk",
      "Wachtwoorden delen binnen teams voor noodgevallen",
    ],
    correctAnswer: 1,
    explanation:
      "Regelmatig back-ups maken en deze offline bewaren is een cruciale beschermingsmaatregel tegen ransomware. De andere opties verhogen juist het risico op een succesvolle aanval.",
  },
  {
    id: 4,
    question: "Wat is een typisch gedrag van ransomware zodra het een systeem heeft geïnfecteerd?",
    options: [
      "Het vertraagt het systeem om detectie te voorkomen",
      "Het begint onmiddellijk met het versleutelen van bestanden",
      "Het stuurt automatisch een e-mail naar de beheerder",
      "Het installeert eerst updates om kwetsbaarheden te dichten",
    ],
    correctAnswer: 1,
    explanation:
      "Ransomware begint typisch onmiddellijk met het versleutelen van bestanden zodra het een systeem heeft geïnfecteerd. Dit is het primaire doel van de malware om later losgeld te kunnen eisen.",
  },
  {
    id: 5,
    question: "Welke netwerkactiviteit kan wijzen op een actieve ransomware-infectie?",
    options: [
      "Regelmatige verbindingen met bekende cloudopslagdiensten",
      "Hoge CPU-belasting tijdens geplande back-ups",
      "Ongebruikelijke uitgaande verbindingen naar onbekende IP-adressen",
      "Periodieke software-updates van werkstations",
    ],
    correctAnswer: 2,
    explanation:
      "Ongebruikelijke uitgaande verbindingen naar onbekende IP-adressen kunnen wijzen op command-and-control communicatie van ransomware. De andere opties zijn normale netwerkactiviteiten.",
  },
]

export default function QuizPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(quizQuestions.length).fill(-1))
  const [showFeedback, setShowFeedback] = useState(false)
  const [score, setScore] = useState(0)
  const [quizComplete, setQuizComplete] = useState(false)
  const [userAnswers, setUserAnswers] = useState<{ correct: boolean; selectedAnswer: number }[]>([])

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const handleSubmitAnswer = () => {
    const currentQuestionData = quizQuestions[currentQuestion]
    const selectedAnswer = selectedAnswers[currentQuestion]
    const isCorrect = selectedAnswer === currentQuestionData.correctAnswer

    // Update score if answer is correct
    if (isCorrect) {
      setScore(score + 1)
    }

    // Store the user's answer and whether it was correct
    const newUserAnswers = [...userAnswers]
    newUserAnswers[currentQuestion] = {
      correct: isCorrect,
      selectedAnswer: selectedAnswer,
    }
    setUserAnswers(newUserAnswers)

    setShowFeedback(true)

    // COMMENT: In a real application, you might want to send this answer to the API
    // Example API call:
    // fetch('/api/quiz/submit-answer', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     userId: user?.id,
    //     questionId: currentQuestionData.id,
    //     selectedAnswer,
    //     isCorrect
    //   })
    // }).catch(error => console.error('Error submitting answer:', error));
  }

  const handleNextQuestion = () => {
    setShowFeedback(false)

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Quiz completed
      setQuizComplete(true)

      // Store results and navigate to results page
      const results = {
        score,
        totalQuestions: quizQuestions.length,
        answers: userAnswers,
        questions: quizQuestions,
        completedAt: new Date().toISOString(),
      }

      // COMMENT: In a real application, you would send the complete quiz results to an API
      // Example API call:
      // fetch('/api/quiz/submit-results', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     userId: user?.id,
      //     score,
      //     totalQuestions: quizQuestions.length,
      //     answers: userAnswers,
      //     completedAt: new Date().toISOString()
      //   })
      // })
      //   .then(response => response.json())
      //   .then(data => {
      //     if (data.success) {
      //       localStorage.setItem("quizResults", JSON.stringify(results));
      //       router.push("/results");
      //     }
      //   })
      //   .catch(error => console.error('Error submitting results:', error));

      localStorage.setItem("quizResults", JSON.stringify(results))
      router.push("/results")
    }
  }

  const question = quizQuestions[currentQuestion]
  const isAnswerSelected = selectedAnswers[currentQuestion] !== -1
  const isCorrect = selectedAnswers[currentQuestion] === question.correctAnswer
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100

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
            Score: <span className="font-medium">{score}</span> / {currentQuestion + (showFeedback ? 1 : 0)}
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
              onValueChange={(value) => handleAnswerSelect(Number.parseInt(value))}
              className="space-y-3"
              disabled={showFeedback}
            >
              {question.options.map((option, index) => (
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
                    {showFeedback && index === question.correctAnswer && (
                      <CheckCircle2 className="ml-2 inline h-4 w-4 text-green-500" />
                    )}
                    {showFeedback && selectedAnswers[currentQuestion] === index && index !== question.correctAnswer && (
                      <XCircle className="ml-2 inline h-4 w-4 text-red-500" />
                    )}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {showFeedback && (
              <Alert
                className={`mt-6 ${
                  isCorrect ? "border-green-500/50 bg-green-500/10" : "border-red-500/50 bg-red-500/10"
                }`}
              >
                <div className="flex gap-2">
                  {isCorrect ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  )}
                  <div>
                    <AlertTitle className={isCorrect ? "text-green-500" : "text-red-500"}>
                      {isCorrect ? "Correct!" : "Incorrect"}
                    </AlertTitle>
                    <AlertDescription className="mt-1 text-sm">{question.explanation}</AlertDescription>
                  </div>
                </div>
              </Alert>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">Ingelogd als {user?.name}</div>
            <div>
              {!showFeedback ? (
                <Button onClick={handleSubmitAnswer} disabled={!isAnswerSelected}>
                  Controleer antwoord
                </Button>
              ) : (
                <Button onClick={handleNextQuestion}>
                  {currentQuestion < quizQuestions.length - 1 ? "Volgende vraag" : "Bekijk resultaten"}
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
