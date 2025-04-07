import Link from "next/link"
import { ArrowLeft, ArrowRight, CheckCircle2, Download, ShieldAlert, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

// Mock results data
const resultsData = {
  id: "1",
  title: "Ransomware Detectie",
  score: 80,
  correctAnswers: 4,
  totalQuestions: 5,
  timeSpent: "12:45",
  feedback:
    "Goed gedaan! U heeft de meeste vroege tekenen van ransomware correct geïdentificeerd. Blijf alert op ongebruikelijke netwerkactiviteit en verdachte e-mails.",
  questionResults: [
    {
      id: 1,
      question: "Welk van de volgende is GEEN vroeg teken van een ransomware-aanval?",
      userAnswer: "Regelmatige software-updates van bekende leveranciers",
      correctAnswer: "Regelmatige software-updates van bekende leveranciers",
      isCorrect: true,
      explanation:
        "Regelmatige software-updates van bekende leveranciers zijn juist een teken van goede beveiliging en geen indicatie van een ransomware-aanval. De andere opties zijn allemaal mogelijke vroege tekenen van een aanval.",
    },
    {
      id: 2,
      question: "Wat moet u doen als u verdachte e-mailbijlagen ontvangt?",
      userAnswer: "Meld het direct aan uw IT-beveiligingsteam zonder de bijlage te openen",
      correctAnswer: "Meld het direct aan uw IT-beveiligingsteam zonder de bijlage te openen",
      isCorrect: true,
      explanation:
        "U moet verdachte e-mails direct melden aan uw IT-beveiligingsteam zonder de bijlage te openen. Het openen, doorsturen of beantwoorden kan het risico op infectie vergroten.",
    },
    {
      id: 3,
      question: "Welke actie kan het risico op een ransomware-aanval verminderen?",
      userAnswer: "Regelmatig back-ups maken en deze offline bewaren",
      correctAnswer: "Regelmatig back-ups maken en deze offline bewaren",
      isCorrect: true,
      explanation:
        "Regelmatig back-ups maken en deze offline bewaren is een cruciale beschermingsmaatregel tegen ransomware. De andere opties verhogen juist het risico op een succesvolle aanval.",
    },
    {
      id: 4,
      question: "Wat is een typisch gedrag van ransomware zodra het een systeem heeft geïnfecteerd?",
      userAnswer: "Het begint onmiddellijk met het versleutelen van bestanden",
      correctAnswer: "Het begint onmiddellijk met het versleutelen van bestanden",
      isCorrect: true,
      explanation:
        "Ransomware begint typisch onmiddellijk met het versleutelen van bestanden zodra het een systeem heeft geïnfecteerd. Dit is het primaire doel van de malware om later losgeld te kunnen eisen.",
    },
    {
      id: 5,
      question: "Welke netwerkactiviteit kan wijzen op een actieve ransomware-infectie?",
      userAnswer: "Regelmatige verbindingen met bekende cloudopslagdiensten",
      correctAnswer: "Ongebruikelijke uitgaande verbindingen naar onbekende IP-adressen",
      isCorrect: false,
      explanation:
        "Ongebruikelijke uitgaande verbindingen naar onbekende IP-adressen kunnen wijzen op command-and-control communicatie van ransomware. De andere opties zijn normale netwerkactiviteiten.",
    },
  ],
  recommendations: [
    "Bestudeer de verschillende soorten verdachte netwerkactiviteiten die kunnen wijzen op een ransomware-aanval",
    "Volg de training 'Incident Response' om te leren hoe u moet reageren op een actieve aanval",
    "Bekijk de documentatie over het herkennen van verdachte e-mails en phishing-pogingen",
  ],
}

export default function ResultsPage({ params }: { params: { id: string } }) {
  const passThreshold = 70
  const isPassed = resultsData.score >= passThreshold

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
          <h1 className="text-2xl font-bold">Resultaten: {resultsData.title}</h1>
          <p className="text-muted-foreground">Bekijk uw score en feedback</p>
        </div>
      </div>

      <Card className="border-border overflow-hidden">
        <div className={`h-2 w-full ${isPassed ? "bg-green-500" : "bg-red-500"}`} />
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">Uw score: {resultsData.score}%</CardTitle>
            <div
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                isPassed ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
              }`}
            >
              {isPassed ? "Geslaagd" : "Niet geslaagd"}
            </div>
          </div>
          <CardDescription>
            {resultsData.correctAnswers} van de {resultsData.totalQuestions} vragen correct beantwoord
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Score</span>
              <span>{resultsData.score}%</span>
            </div>
            <Progress value={resultsData.score} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span className={`${isPassed ? "text-green-500" : "text-red-500"}`}>
                {passThreshold}% (Slagingsdrempel)
              </span>
              <span>100%</span>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card/50 p-4">
            <h3 className="mb-2 font-medium">Feedback</h3>
            <p className="text-sm text-muted-foreground">{resultsData.feedback}</p>
          </div>

          <div>
            <h3 className="mb-4 font-medium">Antwoorden</h3>
            <div className="space-y-4">
              {resultsData.questionResults.map((result) => (
                <div key={result.id} className="rounded-lg border border-border p-4">
                  <div className="flex items-start gap-2">
                    {result.isCorrect ? (
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                    ) : (
                      <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                    )}
                    <div className="space-y-2">
                      <p className="font-medium">{result.question}</p>
                      <div className="space-y-1 text-sm">
                        <p>
                          <span className="text-muted-foreground">Uw antwoord: </span>
                          <span className={result.isCorrect ? "text-green-500" : "text-red-500"}>
                            {result.userAnswer}
                          </span>
                        </p>
                        {!result.isCorrect && (
                          <p>
                            <span className="text-muted-foreground">Juiste antwoord: </span>
                            <span className="text-green-500">{result.correctAnswer}</span>
                          </p>
                        )}
                        <p className="mt-2 text-muted-foreground">{result.explanation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-medium">Aanbevelingen</h3>
            <ul className="space-y-2">
              {resultsData.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" className="gap-2" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4" />
              Terug naar dashboard
            </Link>
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Download certificaat
            </Button>
            <Button className="gap-2" asChild>
              <Link href="/simulations">
                Meer simulaties
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

