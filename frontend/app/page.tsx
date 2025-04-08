import Link from "next/link"
import { ArrowRight, Shield, ShieldAlert } from "lucide-react"

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
              Neem deel aan een interactieve quiz met een vriend en leer hoe je moet reageren op ransomware-aanvallen
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col items-center p-6 rounded-lg border border-border bg-card/50 text-center">
                <Shield className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Leer samen</h3>
                <p className="text-muted-foreground">
                  Speel met een vriend en leer hoe je ransomware-aanvallen kunt herkennen en erop kunt reageren.
                </p>
              </div>
              <div className="flex flex-col items-center p-6 rounded-lg border border-border bg-card/50 text-center">
                <ShieldAlert className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Test je kennis</h3>
                <p className="text-muted-foreground">
                  Beantwoord 5 multiple-choice vragen en ontdek hoe goed je voorbereid bent op ransomware-dreigingen.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/login">
                Inloggen <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/quiz">
                Direct starten <ArrowRight className="ml-2 h-4 w-4" />
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
