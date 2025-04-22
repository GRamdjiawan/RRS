import Link from "next/link"
import { Clock, Filter, Search, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function SimulationsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Simulaties</h1>
        <p className="text-muted-foreground">Ontdek en start ransomware-response trainingen</p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Zoek simulaties..." className="w-full pl-8" />
        </div>
        <Button variant="outline" className="flex gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Alle simulaties</TabsTrigger>
          <TabsTrigger value="beginner">Beginner</TabsTrigger>
          <TabsTrigger value="intermediate">Gemiddeld</TabsTrigger>
          <TabsTrigger value="advanced">Gevorderd</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="transition-all hover:border-primary/50 hover:shadow-md">
              <CardHeader className="space-y-1">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="bg-green-500/10 text-green-500">
                    Beginner
                  </Badge>
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm">4.8</span>
                  </div>
                </div>
                <CardTitle>Ransomware Detectie</CardTitle>
                <CardDescription>Herken vroege tekenen van een ransomware-aanval</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>30 minuten</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="secondary">Detectie</Badge>
                  <Badge variant="secondary">Preventie</Badge>
                  <Badge variant="secondary">Awareness</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/simulations/1">Start simulatie</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="transition-all hover:border-primary/50 hover:shadow-md">
              <CardHeader className="space-y-1">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="bg-amber-500/10 text-amber-500">
                    Gemiddeld
                  </Badge>
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm">4.6</span>
                  </div>
                </div>
                <CardTitle>Incident Response</CardTitle>
                <CardDescription>Reageer op een actieve ransomware-aanval</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>45 minuten</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="secondary">Response</Badge>
                  <Badge variant="secondary">Containment</Badge>
                  <Badge variant="secondary">Communicatie</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/simulations/2">Start simulatie</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="transition-all hover:border-primary/50 hover:shadow-md">
              <CardHeader className="space-y-1">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="bg-red-500/10 text-red-500">
                    Gevorderd
                  </Badge>
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm">4.9</span>
                  </div>
                </div>
                <CardTitle>Data Recovery</CardTitle>
                <CardDescription>Herstel systemen na een ransomware-aanval</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>60 minuten</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="secondary">Recovery</Badge>
                  <Badge variant="secondary">Backup</Badge>
                  <Badge variant="secondary">Forensics</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/simulations/3">Start simulatie</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="transition-all hover:border-primary/50 hover:shadow-md">
              <CardHeader className="space-y-1">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="bg-green-500/10 text-green-500">
                    Beginner
                  </Badge>
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm">4.7</span>
                  </div>
                </div>
                <CardTitle>Phishing Detectie</CardTitle>
                <CardDescription>Herken geavanceerde phishing-aanvallen die tot ransomware leiden</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>30 minuten</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="secondary">Phishing</Badge>
                  <Badge variant="secondary">Email</Badge>
                  <Badge variant="secondary">Awareness</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/simulations/4">Start simulatie</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="transition-all hover:border-primary/50 hover:shadow-md">
              <CardHeader className="space-y-1">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="bg-amber-500/10 text-amber-500">
                    Gemiddeld
                  </Badge>
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm">4.5</span>
                  </div>
                </div>
                <CardTitle>Crisis Communicatie</CardTitle>
                <CardDescription>Communiceer effectief tijdens een ransomware-incident</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>45 minuten</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="secondary">Communicatie</Badge>
                  <Badge variant="secondary">PR</Badge>
                  <Badge variant="secondary">Stakeholders</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/simulations/5">Start simulatie</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="transition-all hover:border-primary/50 hover:shadow-md">
              <CardHeader className="space-y-1">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="bg-red-500/10 text-red-500">
                    Gevorderd
                  </Badge>
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm">4.8</span>
                  </div>
                </div>
                <CardTitle>Forensisch Onderzoek</CardTitle>
                <CardDescription>Analyseer een ransomware-aanval voor toekomstige preventie</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>60 minuten</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="secondary">Forensics</Badge>
                  <Badge variant="secondary">Analyse</Badge>
                  <Badge variant="secondary">Preventie</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/simulations/6">Start simulatie</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="beginner">{/* Beginner content would go here */}</TabsContent>
        <TabsContent value="intermediate">{/* Intermediate content would go here */}</TabsContent>
        <TabsContent value="advanced">{/* Advanced content would go here */}</TabsContent>
      </Tabs>
    </div>
  )
}
