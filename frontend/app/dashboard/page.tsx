import Link from "next/link"
import { ArrowRight, BarChart3, Clock, ShieldAlert, ShieldCheck, Trophy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welkom terug, Jan! Bekijk uw voortgang en beschikbare simulaties.</p>
        </div>
        <Button asChild>
          <Link href="/simulations">
            Start nieuwe simulatie
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Voltooide simulaties</CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 sinds vorige week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gemiddelde score</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">+5% sinds vorige maand</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leaderboard positie</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#8</div>
            <p className="text-xs text-muted-foreground">+3 posities gestegen</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trainingstijd</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5.2 uur</div>
            <p className="text-xs text-muted-foreground">+1.5 uur sinds vorige maand</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recent" className="space-y-4">
        <TabsList>
          <TabsTrigger value="recent">Recente activiteit</TabsTrigger>
          <TabsTrigger value="recommended">Aanbevolen</TabsTrigger>
          <TabsTrigger value="progress">Voortgang</TabsTrigger>
        </TabsList>
        <TabsContent value="recent" className="space-y-4">
          <h2 className="text-xl font-semibold">Recente simulaties</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/10">
                    <ShieldAlert className="h-4 w-4 text-red-500" />
                  </div>
                  <span className="text-sm text-muted-foreground">2 dagen geleden</span>
                </div>
                <CardTitle>Ransomware Detectie</CardTitle>
                <CardDescription>Herken vroege tekenen van een ransomware-aanval</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm">
                  <span>Score: 85%</span>
                  <span className="font-medium text-green-500">Geslaagd</span>
                </div>
                <Progress value={85} className="mt-2" />
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/simulations/1/results">Bekijk resultaten</Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/10">
                    <ShieldAlert className="h-4 w-4 text-amber-500" />
                  </div>
                  <span className="text-sm text-muted-foreground">5 dagen geleden</span>
                </div>
                <CardTitle>Incident Response</CardTitle>
                <CardDescription>Reageer op een actieve ransomware-aanval</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm">
                  <span>Score: 72%</span>
                  <span className="font-medium text-green-500">Geslaagd</span>
                </div>
                <Progress value={72} className="mt-2" />
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/simulations/2/results">Bekijk resultaten</Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/10">
                    <ShieldAlert className="h-4 w-4 text-red-500" />
                  </div>
                  <span className="text-sm text-muted-foreground">1 week geleden</span>
                </div>
                <CardTitle>Data Recovery</CardTitle>
                <CardDescription>Herstel systemen na een ransomware-aanval</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm">
                  <span>Score: 65%</span>
                  <span className="font-medium text-amber-500">Voldoende</span>
                </div>
                <Progress value={65} className="mt-2" />
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/simulations/3/results">Bekijk resultaten</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="recommended" className="space-y-4">
          <h2 className="text-xl font-semibold">Aanbevolen voor u</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="space-y-1">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <ShieldAlert className="h-4 w-4 text-primary" />
                </div>
                <CardTitle>Phishing Detectie</CardTitle>
                <CardDescription>Herken geavanceerde phishing-aanvallen die tot ransomware leiden</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm">
                  <span>Moeilijkheidsgraad: Gemiddeld</span>
                  <span>30 min</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button size="sm" className="w-full" asChild>
                  <Link href="/simulations/4">Start simulatie</Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="space-y-1">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <ShieldAlert className="h-4 w-4 text-primary" />
                </div>
                <CardTitle>Crisis Communicatie</CardTitle>
                <CardDescription>Communiceer effectief tijdens een ransomware-incident</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm">
                  <span>Moeilijkheidsgraad: Gevorderd</span>
                  <span>45 min</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button size="sm" className="w-full" asChild>
                  <Link href="/simulations/5">Start simulatie</Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="space-y-1">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <ShieldAlert className="h-4 w-4 text-primary" />
                </div>
                <CardTitle>Forensisch Onderzoek</CardTitle>
                <CardDescription>Analyseer een ransomware-aanval voor toekomstige preventie</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm">
                  <span>Moeilijkheidsgraad: Expert</span>
                  <span>60 min</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button size="sm" className="w-full" asChild>
                  <Link href="/simulations/6">Start simulatie</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="progress" className="space-y-4">
          <h2 className="text-xl font-semibold">Uw voortgang</h2>
          <Card>
            <CardHeader>
              <CardTitle>Vaardigheden overzicht</CardTitle>
              <CardDescription>Uw prestaties per vaardigheidsgebied</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Detectie & Preventie</span>
                  <span>85%</span>
                </div>
                <Progress value={85} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Incident Response</span>
                  <span>72%</span>
                </div>
                <Progress value={72} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Data Recovery</span>
                  <span>65%</span>
                </div>
                <Progress value={65} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Crisis Communicatie</span>
                  <span>58%</span>
                </div>
                <Progress value={58} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Forensisch Onderzoek</span>
                  <span>42%</span>
                </div>
                <Progress value={42} />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/profile/skills">Bekijk gedetailleerd rapport</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

