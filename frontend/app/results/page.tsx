"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Home, Medal, ShieldAlert, Trophy, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function ResultsPage() {
  const searchParams = useSearchParams()

  const player1Name = searchParams.get("p1") || "Speler 1"
  const player1Score = Number.parseInt(searchParams.get("p1s") || "0")
  const player2Name = searchParams.get("p2") || "Speler 2"
  const player2Score = Number.parseInt(searchParams.get("p2s") || "0")

  const totalQuestions = 5
  const player1Percentage = (player1Score / totalQuestions) * 100
  const player2Percentage = (player2Score / totalQuestions) * 100

  const winner = player1Score > player2Score ? player1Name : player2Score > player1Score ? player2Name : "Gelijkspel"

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col min-h-screen">
      <header className="mb-8 text-center">
        <h1 className="text-2xl font-bold flex items-center justify-center gap-2">
          <Trophy className="h-6 w-6 text-primary" />
          Quiz Resultaten
        </h1>
      </header>

      <main className="flex-1 flex flex-col max-w-3xl mx-auto w-full">
        <Card className="border-border mb-8">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl">{winner === "Gelijkspel" ? "Gelijkspel!" : `${winner} wint!`}</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center py-6">
            {winner === "Gelijkspel" ? (
              <div className="flex items-center justify-center h-24 w-24 rounded-full bg-primary/20">
                <Medal className="h-12 w-12 text-primary" />
              </div>
            ) : (
              <div className="flex items-center justify-center h-24 w-24 rounded-full bg-yellow-500/20">
                <Trophy className="h-12 w-12 text-yellow-500" />
              </div>
            )}
          </CardContent>
          <CardFooter className="text-center text-muted-foreground">
            {winner === "Gelijkspel"
              ? "Beide spelers hebben dezelfde score behaald!"
              : `${winner} heeft de meeste vragen correct beantwoord!`}
          </CardFooter>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className={`border-border ${player1Score > player2Score ? "border-primary/50 shadow-md" : ""}`}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                {player1Name}
                {player1Score > player2Score && <Trophy className="h-4 w-4 text-yellow-500 ml-auto" />}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <span className="text-4xl font-bold">{player1Score}</span>
                <span className="text-xl text-muted-foreground">/{totalQuestions}</span>
              </div>
              <Progress value={player1Percentage} className="h-2" />
              <div className="text-center text-sm text-muted-foreground">{player1Percentage}% correct</div>
            </CardContent>
          </Card>

          <Card className={`border-border ${player2Score > player1Score ? "border-primary/50 shadow-md" : ""}`}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                {player2Name}
                {player2Score > player1Score && <Trophy className="h-4 w-4 text-yellow-500 ml-auto" />}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <span className="text-4xl font-bold">{player2Score}</span>
                <span className="text-xl text-muted-foreground">/{totalQuestions}</span>
              </div>
              <Progress value={player2Percentage} className="h-2" />
              <div className="text-center text-sm text-muted-foreground">{player2Percentage}% correct</div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-primary" />
              Wat heb je geleerd?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Ransomware-aanvallen zijn een groeiende bedreiging voor organisaties van alle groottes. Hier zijn enkele
              belangrijke punten om te onthouden:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Let op vroege waarschuwingssignalen zoals ongebruikelijke netwerkactiviteit en verdachte e-mails</li>
              <li>Maak regelmatig back-ups en bewaar deze offline om snel te kunnen herstellen na een aanval</li>
              <li>Meld verdachte activiteiten direct aan uw IT-beveiligingsteam</li>
              <li>Wees alert op ongebruikelijke uitgaande verbindingen naar onbekende IP-adressen</li>
              <li>Zorg voor goede beveiligingspraktijken zoals regelmatige updates en beperkte toegangsrechten</li>
            </ul>
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
                Speel opnieuw
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
