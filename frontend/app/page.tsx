import Link from "next/link"
import { ArrowRight, ShieldAlert } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12 flex flex-col min-h-screen">
      <header className="flex items-center justify-center mb-12">
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold">Ransomware Response Simulator</h1>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto">
        <Card className="w-full border-border bg-card/50 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl sm:text-4xl font-bold">Test je ransomware kennis</CardTitle>
            <CardDescription className="text-lg mt-2">
              Leer hoe je moet reageren op ransomware-aanvallen met onze interactieve quiz
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-6 rounded-lg border border-border bg-card/50 text-center">
              <ShieldAlert className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Wat is ransomware?</h3>
              <p className="text-muted-foreground">
                Ransomware is een type malware dat toegang tot een computer of bestanden blokkeert en losgeld eist om de
                toegang te herstellen. Leer hoe je deze aanvallen kunt herkennen, voorkomen en erop kunt reageren.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/login">
                Inloggen of registreren <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </main>

      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Ransomware Response Simulator. Alle rechten voorbehouden.</p>
      </footer>
    </div>
  )
}
