"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AlertCircle, CheckCircle2, HelpCircle, ShieldAlert, User, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"

// Mock data for quiz questions
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

type PlayerState = {
  name: string
  currentQuestion: number
  selectedAnswers: number[]
  showFeedback: boolean
  score: number
}

export default function QuizPage() {
  const router = useRouter()
  const [setupComplete, setSetupComplete] = useState(false)
  const [player1, setPlayer1] = useState<PlayerState>({
    name: "",
    currentQuestion: 0,
    selectedAnswers: Array(quizQuestions.length).fill(-1),
    showFeedback: false,
    score: 0,
  })
  const [player2, setPlayer2] = useState<PlayerState>({
    name: "",
    currentQuestion: 0,
    selectedAnswers: Array(quizQuestions.length).fill(-1),
    showFeedback: false,
    score: 0,
  })
  const [activePlayer, setActivePlayer] = useState<1 | 2>(1)
  const [quizComplete, setQuizComplete] = useState(false)

  useEffect(() => {
    // Check if both players have completed all questions
    if (
      player1.currentQuestion >= quizQuestions.length &&
      player2.currentQuestion >= quizQuestions.length &&
      !quizComplete
    ) {
      setQuizComplete(true)
      // Navigate to results page after a short delay
      setTimeout(() => {
        router.push(
          `/results?p1=${encodeURIComponent(player1.name)}&p1s=${player1.score}&p2=${encodeURIComponent(
            player2.name,
          )}&p2s=${player2.score}`,
        )
      }, 1500)
    }
  }, [
    player1.currentQuestion,
    player2.currentQuestion,
    quizComplete,
    router,
    player1.name,
    player1.score,
    player2.name,
    player2.score,
  ])

  const handleSetupSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSetupComplete(true)
  }

  const handleAnswerSelect = (answerIndex: number) => {
    const currentPlayer = activePlayer === 1 ? player1 : player2
    const setCurrentPlayer = activePlayer === 1 ? setPlayer1 : setPlayer2

    const newAnswers = [...currentPlayer.selectedAnswers]
    newAnswers[currentPlayer.currentQuestion] = answerIndex
    setCurrentPlayer({
      ...currentPlayer,
      selectedAnswers: newAnswers,
    })
  }

  const handleSubmitAnswer = () => {
    const currentPlayer = activePlayer === 1 ? player1 : player2
    const setCurrentPlayer = activePlayer === 1 ? setPlayer1 : setPlayer2
    const currentQuestionIndex = currentPlayer.currentQuestion
    const currentQuestion = quizQuestions[currentQuestionIndex]
    const selectedAnswer = currentPlayer.selectedAnswers[currentQuestionIndex]
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer

    // Update score if answer is correct
    if (isCorrect) {
      setCurrentPlayer({
        ...currentPlayer,
        score: currentPlayer.score + 1,
        showFeedback: true,
      })
    } else {
      setCurrentPlayer({
        ...currentPlayer,
        showFeedback: true,
      })
    }
  }

  const handleNextQuestion = () => {
    const currentPlayer = activePlayer === 1 ? player1 : player2
    const setCurrentPlayer = activePlayer === 1 ? setPlayer1 : setPlayer2
    const nextQuestionIndex = currentPlayer.currentQuestion + 1

    setCurrentPlayer({
      ...currentPlayer,
      currentQuestion: nextQuestionIndex,
      showFeedback: false,
    })

    // Switch to the other player if not at the end
    if (nextQuestionIndex < quizQuestions.length) {
      setActivePlayer(activePlayer === 1 ? 2 : 1)
    }
  }

  if (!setupComplete) {
    return (
      <div className="container flex items-center justify-center min-h-screen px-4 py-12">
        <Card className="mx-auto w-full max-w-md border-border">
          <CardHeader className="space-y-1 text-center">
            <ShieldAlert className="h-10 w-10 text-primary mx-auto" />
            <CardTitle className="text-2xl">Spelers instellen</CardTitle>
          </CardHeader>
          <form onSubmit={handleSetupSubmit}>
            <CardContent className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="player1">Speler 1 naam</Label>
                <Input
                  id="player1"
                  placeholder="Voer naam in"
                  value={player1.name}
                  onChange={(e) => setPlayer1({ ...player1, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="player2">Speler 2 naam</Label>
                <Input
                  id="player2"
                  placeholder="Voer naam in"
                  value={player2.name}
                  onChange={(e) => setPlayer2({ ...player2, name: e.target.value })}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                Start Quiz
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    )
  }

  const currentPlayer = activePlayer === 1 ? player1 : player2
  const currentQuestionIndex = currentPlayer.currentQuestion

  // If quiz is complete, show loading message
  if (quizComplete || currentQuestionIndex >= quizQuestions.length) {
    return (
      <div className="container flex items-center justify-center min-h-screen px-4 py-12">
        <Card className="mx-auto w-full max-w-md border-border text-center p-8">
          <ShieldAlert className="h-16 w-16 text-primary mx-auto animate-pulse mb-4" />
          <h2 className="text-2xl font-bold mb-4">Quiz voltooid!</h2>
          <p className="text-muted-foreground mb-4">Bezig met het berekenen van de resultaten...</p>
          <Progress value={100} className="h-2 w-full max-w-xs mx-auto" />
        </Card>
      </div>
    )
  }

  const currentQuestion = quizQuestions[currentQuestionIndex]
  const isAnswerSelected = currentPlayer.selectedAnswers[currentQuestionIndex] !== -1
  const isCorrect = currentPlayer.selectedAnswers[currentQuestionIndex] === currentQuestion.correctAnswer
  const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col min-h-screen">
      <header className="mb-8 text-center">
        <h1 className="text-2xl font-bold flex items-center justify-center gap-2">
          <ShieldAlert className="h-6 w-6 text-primary" />
          Ransomware Response Quiz
        </h1>
      </header>

      <main className="flex-1 flex flex-col max-w-3xl mx-auto w-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            <span className="font-medium">Aan de beurt: {activePlayer === 1 ? player1.name : player2.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Vraag {currentQuestionIndex + 1} van {quizQuestions.length}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">{player1.name}</span>
              <span className="text-sm">
                {player1.score} / {quizQuestions.length}
              </span>
            </div>
            <Progress value={(player1.score / quizQuestions.length) * 100} className="h-2" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">{player2.name}</span>
              <span className="text-sm">
                {player2.score} / {quizQuestions.length}
              </span>
            </div>
            <Progress value={(player2.score / quizQuestions.length) * 100} className="h-2" />
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
                <div>{currentQuestion.question}</div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={currentPlayer.selectedAnswers[currentQuestionIndex].toString()}
              onValueChange={(value) => handleAnswerSelect(Number.parseInt(value))}
              className="space-y-3"
              disabled={currentPlayer.showFeedback}
            >
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <RadioGroupItem
                    value={index.toString()}
                    id={`option-${index}`}
                    className={
                      currentPlayer.showFeedback
                        ? index === currentQuestion.correctAnswer
                          ? "border-green-500 text-green-500"
                          : currentPlayer.selectedAnswers[currentQuestionIndex] === index
                            ? "border-red-500 text-red-500"
                            : ""
                        : ""
                    }
                  />
                  <Label
                    htmlFor={`option-${index}`}
                    className={
                      currentPlayer.showFeedback
                        ? index === currentQuestion.correctAnswer
                          ? "text-green-500"
                          : currentPlayer.selectedAnswers[currentQuestionIndex] === index
                            ? "text-red-500"
                            : ""
                        : ""
                    }
                  >
                    {option}
                    {currentPlayer.showFeedback && index === currentQuestion.correctAnswer && (
                      <CheckCircle2 className="ml-2 inline h-4 w-4 text-green-500" />
                    )}
                    {currentPlayer.showFeedback &&
                      currentPlayer.selectedAnswers[currentQuestionIndex] === index &&
                      index !== currentQuestion.correctAnswer && (
                        <XCircle className="ml-2 inline h-4 w-4 text-red-500" />
                      )}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {currentPlayer.showFeedback && (
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
                    <AlertDescription className="mt-1 text-sm">{currentQuestion.explanation}</AlertDescription>
                  </div>
                </div>
              </Alert>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              {activePlayer === 1 ? player1.name : player2.name} is aan de beurt
            </div>
            <div>
              {!currentPlayer.showFeedback ? (
                <Button onClick={handleSubmitAnswer} disabled={!isAnswerSelected}>
                  Controleer antwoord
                </Button>
              ) : (
                <Button onClick={handleNextQuestion}>
                  {activePlayer === 1 ? `${player2.name} is aan de beurt` : `${player1.name} is aan de beurt`}
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-4 w-4" />
                {player1.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm">Score</span>
                <span className="text-sm font-medium">
                  {player1.score} / {quizQuestions.length}
                </span>
              </div>
              <Progress value={(player1.score / quizQuestions.length) * 100} className="h-2" />
              <div className="mt-2 text-xs text-muted-foreground">
                Vraag {Math.min(player1.currentQuestion + 1, quizQuestions.length)} van {quizQuestions.length}
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-4 w-4" />
                {player2.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm">Score</span>
                <span className="text-sm font-medium">
                  {player2.score} / {quizQuestions.length}
                </span>
              </div>
              <Progress value={(player2.score / quizQuestions.length) * 100} className="h-2" />
              <div className="mt-2 text-xs text-muted-foreground">
                Vraag {Math.min(player2.currentQuestion + 1, quizQuestions.length)} van {quizQuestions.length}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
