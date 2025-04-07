"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AlertCircle, ArrowLeft, CheckCircle2, Clock, HelpCircle, Info, ShieldAlert, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Mock data for a simulation
const simulationData = {
  id: "1",
  title: "Ransomware Detectie",
  description: "Herken vroege tekenen van een ransomware-aanval",
  totalQuestions: 5,
  timeLimit: 30,
  questions: [
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
  ],
}

export default function SimulationPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(simulationData.questions.length).fill(-1))
  const [showFeedback, setShowFeedback] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(simulationData.timeLimit * 60)

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const handleNextQuestion = () => {
    setShowFeedback(false)
    if (currentQuestion < simulationData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Simulation completed, navigate to results
      router.push(`/simulations/${params.id}/results`)
    }
  }

  const handleSubmitAnswer = () => {
    setShowFeedback(true)
  }

  const question = simulationData.questions[currentQuestion]
  const isAnswerSelected = selectedAnswers[currentQuestion] !== -1
  const isCorrect = selectedAnswers[currentQuestion] === question.correctAnswer
  const progress = ((currentQuestion + 1) / simulationData.questions.length) * 100

  return (
    <div className="container mx-auto max-w-4xl space-y-8 py-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/simulations">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Terug</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{simulationData.title}</h1>
          <p className="text-muted-foreground">{simulationData.description}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Vraag {currentQuestion + 1} van {simulationData.questions.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, "0")} resterend
          </span>
        </div>
      </div>

      <Progress value={progress} className="h-2" />

      <Card className="border-border">
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
              className={`mt-6 ${isCorrect ? "border-green-500/50 bg-green-500/10" : "border-red-500/50 bg-red-500/10"}`}
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
          <Button
            variant="outline"
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0 || showFeedback}
          >
            Vorige
          </Button>
          <div>
            {!showFeedback ? (
              <Button onClick={handleSubmitAnswer} disabled={!isAnswerSelected}>
                Controleer antwoord
              </Button>
            ) : (
              <Button onClick={handleNextQuestion}>
                {currentQuestion < simulationData.questions.length - 1 ? "Volgende vraag" : "Bekijk resultaten"}
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>

      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <Info className="h-4 w-4" />
        <span>Tip: Neem de tijd om elke vraag zorgvuldig te lezen voordat u antwoordt.</span>
      </div>
    </div>
  )
}

