"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Home, Medal, ShieldAlert, CheckCircle2, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/components/auth-provider"
import { UserNav } from "@/components/user-nav"
import { Separator } from "@/components/ui/separator"

type QuizAnswer = {
  correct: boolean
  selectedAnswer: number
}

type QuizQuestion = {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

type QuizResults = {
  score: number
  totalQuestions: number
  answers: QuizAnswer[]
  questions: QuizQuestion[]
  completedAt: string
}

export default function ResultsPage() {
  const { user } = useAuth()
  const [results, setResults] = useState<QuizResults | null>(null)

  useEffect(() => {
    // Get results from localStorage
    const storedResults = localStorage.getItem("quizResults")
    if (storedResults) {
      setResults(JSON.parse(storedResults))
    }

    // COMMENT: In a real application, you would fetch the results from an API
    // Example API call:
    // const fetchResults = async () => {
    //   try {
    //     const response = await fetch(`/api/quiz/results?userId=${user?.id}`);
    //     const data = await response.json();
    //     if (data.success) {
    //       setResults(data.results);
    //     }
    //   } catch (error) {
    //     console.error('Error fetching results:', error);
    //   }
    // };
    // if (user) {
    //   fetchResults();
    // }
  }, [user])

  if (!results) {
    return (
      <div className="container mx-auto px-4 py-8 flex flex-col min-h-screen">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Resultaten</h1>
          </div>
          <UserNav />
        </header>
        <main className="flex-1 flex items-center justify-center">
          <Card className="border-border w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle>Geen resultaten gevonden</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground">
              Je hebt nog geen quiz voltooid of de resultaten zijn niet beschikbaar.
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button asChild>
                <Link href="/quiz">Start de quiz</Link>
              </Button>
            </CardFooter>
          </Card>
        </main>
      </div>
    )
  }

  const percentage = (results.score / results.totalQuestions) * 100
  const passThreshold = 70
  const isPassed = percentage >= passThreshold
  const completedDate = new Date(results.completedAt).toLocaleString("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col min-h-screen">
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Quiz Resultaten</h1>
        </div>
        <UserNav />
      </header>

      <main className="flex-1 flex flex-col max-w-3xl mx-auto w-full">
        <Card className="border-border mb-8">
          <div className={`h-2 w-full ${isPassed ? "bg-green-500" : "bg-red-500"}`} />
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl">{isPassed ? "Gefeliciteerd!" : "Bijna!"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 py-6">
            <div className="flex justify-center">
              <div
                className={`flex items-center justify-center h-24 w-24 rounded-full ${
                  isPassed ? "bg-green-500/20" : "bg-amber-500/20"
                }`}
              >
                <Medal className={`h-12 w-12 ${isPassed ? "text-green-500" : "text-amber-500"}`} />
              </div>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold">{results.score}</div>
              <div className="text-muted-foreground">van de {results.totalQuestions} vragen correct</div>
              <div className="text-xs text-muted-foreground mt-2">Voltooid op {completedDate}</div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Score</span>
                <span>{Math.round(percentage)}%</span>
              </div>
              <Progress value={percentage} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0%</span>
                <span className={`${isPassed ? "text-green-500" : "text-red-500"}`}>
                  {passThreshold}% (Slagingsdrempel)
                </span>
                <span>100%</span>
              </div>
            </div>

            <div className="text-center text-muted-foreground">
              {isPassed
                ? "Je hebt een goede kennis van ransomware-response. Blijf je kennis up-to-date houden!"
                : "Je hebt een basis kennis van ransomware-response. Blijf oefenen om je kennis te verbeteren."}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" className="gap-2" asChild>
              <Link href="/">
                <Home className="h-4 w-4" />
                Terug naar home
              </Link>
            </Button>
            <Button className="gap-2" asChild>
              <Link href="/quiz">
                <ShieldAlert className="h-4 w-4" />
                Opnieuw proberen
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-primary" />
              Antwoorden en uitleg
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {results.questions.map((question, index) => {
              const answer = results.answers[index]
              const userSelectedOption = question.options[answer.selectedAnswer]
              const correctOption = question.options[question.correctAnswer]

              return (
                <div key={question.id} className="border border-border rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    {answer.correct ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                    )}
                    <div className="space-y-2 w-full">
                      <h3 className="font-medium">
                        Vraag {index + 1}: {question.question}
                      </h3>

                      <div className="space-y-1 text-sm">
                        <p>
                          <span className="text-muted-foreground">Jouw antwoord: </span>
                          <span className={answer.correct ? "text-green-500" : "text-red-500"}>
                            {userSelectedOption}
                          </span>
                        </p>

                        {!answer.correct && (
                          <p>
                            <span className="text-muted-foreground">Juiste antwoord: </span>
                            <span className="text-green-500">{correctOption}</span>
                          </p>
                        )}
                      </div>

                      {!answer.correct && (
                        <div className="mt-2 text-sm text-muted-foreground bg-muted/30 p-2 rounded">
                          <p>{question.explanation}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}

            <Separator className="my-4" />

            <div className="space-y-4">
              <h3 className="font-medium">Belangrijke leerpunten:</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>
                  Let op vroege waarschuwingssignalen zoals ongebruikelijke netwerkactiviteit en verdachte e-mails
                </li>
                <li>Maak regelmatig back-ups en bewaar deze offline om snel te kunnen herstellen na een aanval</li>
                <li>
                  Meld verdachte activiteiten direct aan uw IT-beveiligingsteam zonder verdachte bijlagen te openen
                </li>
                <li>Wees alert op ongebruikelijke uitgaande verbindingen naar onbekende IP-adressen</li>
                <li>Zorg voor goede beveiligingspraktijken zoals regelmatige updates en beperkte toegangsrechten</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
