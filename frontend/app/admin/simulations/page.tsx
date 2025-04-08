"use client"

import { useState } from "react"
import Link from "next/link"
import { Clock, Edit, Filter, MoreHorizontal, Plus, Search, ShieldAlert, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"

// Mock data for simulations
const mockSimulations = [
  {
    id: 1,
    title: "Ransomware Detectie",
    description: "Herken vroege tekenen van een ransomware-aanval",
    category: "Detectie",
    difficulty: "Beginner",
    questions: 5,
    timeLimit: 30,
    status: "Actief",
    createdAt: "2023-10-15",
    updatedAt: "2023-11-02",
  },
  {
    id: 2,
    title: "Incident Response",
    description: "Reageer op een actieve ransomware-aanval",
    category: "Response",
    difficulty: "Gemiddeld",
    questions: 8,
    timeLimit: 45,
    status: "Actief",
    createdAt: "2023-10-18",
    updatedAt: "2023-10-18",
  },
  {
    id: 3,
    title: "Data Recovery",
    description: "Herstel systemen na een ransomware-aanval",
    category: "Recovery",
    difficulty: "Gevorderd",
    questions: 10,
    timeLimit: 60,
    status: "Actief",
    createdAt: "2023-11-05",
    updatedAt: "2023-11-10",
  },
  {
    id: 4,
    title: "Phishing Detectie",
    description: "Herken geavanceerde phishing-aanvallen die tot ransomware leiden",
    category: "Preventie",
    difficulty: "Beginner",
    questions: 6,
    timeLimit: 30,
    status: "Concept",
    createdAt: "2023-11-12",
    updatedAt: "2023-11-12",
  },
  {
    id: 5,
    title: "Crisis Communicatie",
    description: "Communiceer effectief tijdens een ransomware-incident",
    category: "Response",
    difficulty: "Gemiddeld",
    questions: 7,
    timeLimit: 45,
    status: "Concept",
    createdAt: "2023-12-01",
    updatedAt: "2023-12-05",
  },
]

export default function SimulationsAdminPage() {
  const [simulations, setSimulations] = useState(mockSimulations)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSimulations, setSelectedSimulations] = useState<number[]>([])

  const filteredSimulations = simulations.filter(
    (simulation) =>
      simulation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      simulation.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      simulation.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSelectSimulation = (id: number) => {
    if (selectedSimulations.includes(id)) {
      setSelectedSimulations(selectedSimulations.filter((simId) => simId !== id))
    } else {
      setSelectedSimulations([...selectedSimulations, id])
    }
  }

  const handleSelectAllSimulations = () => {
    if (selectedSimulations.length === filteredSimulations.length) {
      setSelectedSimulations([])
    } else {
      setSelectedSimulations(filteredSimulations.map((s) => s.id))
    }
  }

  const handleDeleteSimulations = () => {
    const updatedSimulations = simulations.filter((s) => !selectedSimulations.includes(s.id))
    setSimulations(updatedSimulations)
    setSelectedSimulations([])
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Simulatiebeheer</h1>
          <p className="text-muted-foreground">Beheer simulaties voor de ransomware-response training</p>
        </div>
        <div className="flex gap-2">
          <Button className="gap-2" asChild>
            <Link href="/admin/simulations/new">
              <Plus className="h-4 w-4" />
              Nieuwe simulatie
            </Link>
          </Button>
          {selectedSimulations.length > 0 && (
            <Button variant="outline" className="gap-2" onClick={handleDeleteSimulations}>
              <Trash2 className="h-4 w-4" />
              {selectedSimulations.length} verwijderen
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Zoek simulaties..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Alle simulaties</TabsTrigger>
          <TabsTrigger value="active">Actief</TabsTrigger>
          <TabsTrigger value="draft">Concept</TabsTrigger>
          <TabsTrigger value="inactive">Inactief</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="rounded-md">
                <div className="grid grid-cols-12 gap-2 border-b bg-muted/50 p-4 text-sm font-medium">
                  <div className="col-span-1">
                    <Checkbox
                      checked={
                        selectedSimulations.length === filteredSimulations.length && filteredSimulations.length > 0
                      }
                      onCheckedChange={handleSelectAllSimulations}
                      aria-label="Selecteer alle simulaties"
                    />
                  </div>
                  <div className="col-span-4">Simulatie</div>
                  <div className="col-span-2">Categorie</div>
                  <div className="col-span-1">Niveau</div>
                  <div className="col-span-1">Vragen</div>
                  <div className="col-span-1">Tijd</div>
                  <div className="col-span-1">Status</div>
                  <div className="col-span-1 text-right">Acties</div>
                </div>
                <div className="divide-y">
                  {filteredSimulations.map((simulation) => (
                    <div key={simulation.id} className="grid grid-cols-12 items-center gap-2 p-4">
                      <div className="col-span-1">
                        <Checkbox
                          checked={selectedSimulations.includes(simulation.id)}
                          onCheckedChange={() => handleSelectSimulation(simulation.id)}
                          aria-label={`Selecteer simulatie ${simulation.id}`}
                        />
                      </div>
                      <div className="col-span-4">
                        <div className="font-medium">{simulation.title}</div>
                        <div className="text-sm text-muted-foreground line-clamp-1">{simulation.description}</div>
                      </div>
                      <div className="col-span-2">
                        <Badge variant="outline" className="font-normal">
                          {simulation.category}
                        </Badge>
                      </div>
                      <div className="col-span-1">
                        <Badge
                          variant="outline"
                          className={`font-normal ${
                            simulation.difficulty === "Beginner"
                              ? "bg-green-500/10 text-green-500"
                              : simulation.difficulty === "Gemiddeld"
                                ? "bg-amber-500/10 text-amber-500"
                                : "bg-red-500/10 text-red-500"
                          }`}
                        >
                          {simulation.difficulty}
                        </Badge>
                      </div>
                      <div className="col-span-1 text-center">{simulation.questions}</div>
                      <div className="col-span-1 flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{simulation.timeLimit} min</span>
                      </div>
                      <div className="col-span-1">
                        <Badge
                          variant="outline"
                          className={`font-normal ${
                            simulation.status === "Actief"
                              ? "bg-green-500/10 text-green-500"
                              : simulation.status === "Concept"
                                ? "bg-amber-500/10 text-amber-500"
                                : "bg-red-500/10 text-red-500"
                          }`}
                        >
                          {simulation.status}
                        </Badge>
                      </div>
                      <div className="col-span-1 flex justify-end">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Meer acties</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/simulations/${simulation.id}`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Bewerken
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/simulations/${simulation.id}/questions`}>
                                <ShieldAlert className="mr-2 h-4 w-4" />
                                Vragen beheren
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-500"
                              onClick={() => handleSelectSimulation(simulation.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Verwijderen
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t p-4">
              <div className="text-sm text-muted-foreground">
                Toont {filteredSimulations.length} van {simulations.length} simulaties
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>
                  Vorige
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Volgende
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="active">{/* Active simulations content would go here */}</TabsContent>
        <TabsContent value="draft">{/* Draft simulations content would go here */}</TabsContent>
        <TabsContent value="inactive">{/* Inactive simulations content would go here */}</TabsContent>
      </Tabs>
    </div>
  )
}
