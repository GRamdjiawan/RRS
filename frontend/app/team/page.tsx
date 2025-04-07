"use client"

import { useState } from "react"
import { BarChart3, Download, Filter, Mail, Search, ShieldAlert, UserPlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for team members
const teamMembers = [
  {
    id: 1,
    name: "Anna Smit",
    role: "Security Specialist",
    email: "anna.smit@cybertech.nl",
    status: "active",
    progress: 85,
    lastActive: "Vandaag",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Pieter Jansen",
    role: "IT Professional",
    email: "pieter.jansen@cybertech.nl",
    status: "active",
    progress: 72,
    lastActive: "Gisteren",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Sophie de Vries",
    role: "Teamleider",
    email: "sophie.devries@cybertech.nl",
    status: "active",
    progress: 90,
    lastActive: "Vandaag",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Thomas Bakker",
    role: "IT Professional",
    email: "thomas.bakker@cybertech.nl",
    status: "inactive",
    progress: 45,
    lastActive: "2 weken geleden",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Lisa van Dijk",
    role: "Security Specialist",
    email: "lisa.vandijk@cybertech.nl",
    status: "active",
    progress: 68,
    lastActive: "3 dagen geleden",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 6,
    name: "Jan de Boer",
    role: "IT Professional",
    email: "jan.deboer@cybertech.nl",
    status: "active",
    progress: 78,
    lastActive: "Vandaag",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 7,
    name: "Emma Visser",
    role: "Security Specialist",
    email: "emma.visser@cybertech.nl",
    status: "pending",
    progress: 0,
    lastActive: "Nog niet actief",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function TeamPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false)

  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team</h1>
          <p className="text-muted-foreground">Beheer uw team en bekijk de voortgang van teamleden</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <UserPlus className="h-4 w-4" />
                Lid uitnodigen
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nieuw teamlid uitnodigen</DialogTitle>
                <DialogDescription>
                  Stuur een uitnodiging naar een nieuw teamlid om deel te nemen aan de ransomware-response training.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Naam
                  </Label>
                  <Input id="name" placeholder="Volledige naam" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    E-mail
                  </Label>
                  <Input id="email" type="email" placeholder="email@bedrijf.nl" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">
                    Functie
                  </Label>
                  <Select>
                    <SelectTrigger id="role" className="col-span-3">
                      <SelectValue placeholder="Selecteer een functie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="it-professional">IT Professional</SelectItem>
                      <SelectItem value="security-specialist">Security Specialist</SelectItem>
                      <SelectItem value="team-leader">Teamleider</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="message" className="text-right">
                    Bericht
                  </Label>
                  <Input id="message" placeholder="Optioneel persoonlijk bericht" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setInviteDialogOpen(false)}>
                  Annuleren
                </Button>
                <Button type="submit" onClick={() => setInviteDialogOpen(false)}>
                  Uitnodiging versturen
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Rapport exporteren
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Teamleden</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamMembers.length}</div>
            <p className="text-xs text-muted-foreground">
              {teamMembers.filter((m) => m.status === "active").length} actief,{" "}
              {teamMembers.filter((m) => m.status === "pending").length} in afwachting
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gemiddelde voortgang</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                teamMembers.filter((m) => m.status !== "pending").reduce((acc, member) => acc + member.progress, 0) /
                  teamMembers.filter((m) => m.status !== "pending").length,
              )}
              %
            </div>
            <p className="text-xs text-muted-foreground">+5% sinds vorige maand</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Voltooide simulaties</CardTitle>
            <ShieldAlert className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68</div>
            <p className="text-xs text-muted-foreground">+12 sinds vorige maand</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gemiddelde score</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">76%</div>
            <p className="text-xs text-muted-foreground">+3% sinds vorige maand</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Zoek teamleden..."
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
          <TabsTrigger value="all">Alle leden</TabsTrigger>
          <TabsTrigger value="active">Actief</TabsTrigger>
          <TabsTrigger value="inactive">Inactief</TabsTrigger>
          <TabsTrigger value="pending">In afwachting</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="rounded-md">
                <div className="grid grid-cols-12 gap-2 border-b bg-muted/50 p-4 text-sm font-medium">
                  <div className="col-span-4">Naam</div>
                  <div className="col-span-2">Functie</div>
                  <div className="col-span-3">Voortgang</div>
                  <div className="col-span-2">Laatste activiteit</div>
                  <div className="col-span-1 text-right">Acties</div>
                </div>
                <div className="divide-y">
                  {filteredMembers.map((member) => (
                    <div key={member.id} className="grid grid-cols-12 items-center gap-2 p-4">
                      <div className="col-span-4 flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-muted-foreground">{member.email}</div>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <Badge variant="outline" className="font-normal">
                          {member.role}
                        </Badge>
                      </div>
                      <div className="col-span-3">
                        {member.status === "pending" ? (
                          <Badge variant="outline" className="bg-amber-500/10 text-amber-500">
                            In afwachting
                          </Badge>
                        ) : (
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span>{member.progress}%</span>
                            </div>
                            <Progress value={member.progress} className="h-1.5" />
                          </div>
                        )}
                      </div>
                      <div className="col-span-2 text-sm text-muted-foreground">{member.lastActive}</div>
                      <div className="col-span-1 flex justify-end">
                        <Button variant="ghost" size="icon">
                          <Mail className="h-4 w-4" />
                          <span className="sr-only">E-mail versturen</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t p-4">
              <div className="text-sm text-muted-foreground">
                Toont {filteredMembers.length} van {teamMembers.length} teamleden
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
        <TabsContent value="active">{/* Active members content would go here */}</TabsContent>
        <TabsContent value="inactive">{/* Inactive members content would go here */}</TabsContent>
        <TabsContent value="pending">{/* Pending members content would go here */}</TabsContent>
      </Tabs>
    </div>
  )
}

