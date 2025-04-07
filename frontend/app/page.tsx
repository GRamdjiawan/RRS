import Link from "next/link"
import { ArrowRight, Shield, ShieldAlert, ShieldCheck, Trophy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="container mx-auto space-y-12 py-6">
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-16">
        <div className="flex max-w-[980px] flex-col items-start gap-4">
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
            Bereid uw team voor op <span className="text-primary">ransomware-aanvallen</span>
          </h1>
          <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
            Train uw IT-professionals, security-specialisten en teamleiders met realistische simulaties om effectief te
            reageren op ransomware-bedreigingen.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/simulations">
                Start training <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/leaderboard">
                Bekijk leaderboard <Trophy className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Waarom onze simulator?</h2>
          <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground">
            Verbeter de cyberweerbaarheid van uw organisatie met onze geavanceerde trainingsoplossing
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="border-border bg-background/50 backdrop-blur-sm transition-all hover:bg-background/80">
            <CardHeader className="space-y-1">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <ShieldAlert className="h-5 w-5 text-primary" />
              </div>
              <CardTitle>Realistische scenario's</CardTitle>
              <CardDescription>Gebaseerd op echte ransomware-aanvallen en best practices</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Onze simulaties zijn ontwikkeld door cybersecurity-experts en bootsen realistische bedreigingssituaties
                na.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-background/50 backdrop-blur-sm transition-all hover:bg-background/80">
            <CardHeader className="space-y-1">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <CardTitle>Directe feedback</CardTitle>
              <CardDescription>Leer van fouten met gedetailleerde uitleg en verbeterpunten</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Ontvang onmiddellijk feedback op uw beslissingen en leer hoe u beter kunt reageren in toekomstige
                situaties.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-background/50 backdrop-blur-sm transition-all hover:bg-background/80">
            <CardHeader className="space-y-1">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <ShieldCheck className="h-5 w-5 text-primary" />
              </div>
              <CardTitle>Voortgangsmeting</CardTitle>
              <CardDescription>Volg de ontwikkeling van uw team en identificeer verbeterpunten</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Uitgebreide statistieken en rapportages helpen u de vaardigheden van uw team te monitoren en te
                verbeteren.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center pt-8">
          <Button size="lg" variant="outline" asChild>
            <Link href="/dashboard">
              Ga naar dashboard <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="rounded-lg border border-border bg-card p-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold">Klaar om uw team te trainen?</h2>
          <p className="mt-4 text-muted-foreground">
            Start vandaag nog met het verbeteren van de ransomware-respons van uw organisatie
          </p>
          <Button size="lg" className="mt-6" asChild>
            <Link href="/register">Maak een account aan</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

