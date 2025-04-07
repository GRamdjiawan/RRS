"use client"

import { useState } from "react"
import { Calendar, ChevronDown, Filter, Search, Trophy, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data for leaderboard
const individualLeaderboard = [
  {
    id: 1,
    name: "Anna Smit",
    company: "CyberTech BV",
    score: 98,
    completedSimulations: 24,
    rank: 1,
    change: 0,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Pieter Jansen",
    company: "SecureNet",
    score: 95,
    completedSimulations: 22,
    rank: 2,
    change: 1,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Sophie de Vries",
    company: "DataGuard",
    score: 92,
    completedSimulations: 20,
    rank: 3,
    change: -1,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Thomas Bakker",
    company: "CyberTech BV",
    score: 90,
    completedSimulations: 19,
    rank: 4,
    change: 2,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Lisa van Dijk",
    company: "SecureNet",
    score: 88,
    completedSimulations: 21,
    rank: 5,
    change: 0,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 6,
    name: "Jan de Boer",
    company: "InfoSec",
    score: 87,
    completedSimulations: 18,
    rank: 6,
    change: 3,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 7,
    name: "Emma Visser",
    company: "DataGuard",
    score: 85,
    completedSimulations: 17,
    rank: 7,
    change: -2,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 8,
    name: "Lucas Meijer",
    company: "CyberTech BV",
    score: 84,
    completedSimulations: 16,
    rank: 8,
    change: 1,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 9,
    name: "Isa Vermeulen",
    company: "InfoSec",
    score: 82,
    completedSimulations: 15,
    rank: 9,
    change: -1,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 10,
    name: "Noah van der Berg",
    company: "SecureNet",
    score: 80,
    completedSimulations: 14,
    rank: 10,
    change: 0,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const teamLeaderboard = [
  {
    id: 1,
    name: "CyberTech BV",
    members: 12,
    avgScore: 92,
    completedSimulations: 156,
    rank: 1,
    change: 0,
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "SecureNet",
    members: 8,
    avgScore: 88,
    completedSimulations: 124,
    rank: 2,
    change: 1,
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "DataGuard",
    members: 10,
    avgScore: 85,
    completedSimulations: 140,
    rank: 3,
    change: -1,
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "InfoSec",
    members: 6,
    avgScore: 83,
    completedSimulations: 98,
    rank: 4,
    change: 0,
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "CyberShield",
    members: 9,
    avgScore: 81,
    completedSimulations: 112,
    rank: 5,
    change: 2,
    logo: "/placeholder.svg?height=40&width=40",
  },
]

export default function LeaderboardPage() {
  const [timeframe, setTimeframe] = useState("all-time")

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Leaderboard</h1>
        <p className="text-muted-foreground">Bekijk de beste prestaties in ransomware-response training</p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Zoek gebruikers of teams..." className="w-full pl-8" />
          </div>
          <Button variant="outline" className="flex gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
        <div className="flex gap-2">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <SelectValue placeholder="Periode" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Deze week</SelectItem>
              <SelectItem value="month">Deze maand</SelectItem>
              <SelectItem value="quarter">Dit kwartaal</SelectItem>
              <SelectItem value="year">Dit jaar</SelectItem>
              <SelectItem value="all-time">Alle tijden</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="individual" className="space-y-4">
        <TabsList>
          <TabsTrigger value="individual" className="flex gap-2">
            <Trophy className="h-4 w-4" />
            Individueel
          </TabsTrigger>
          <TabsTrigger value="team" className="flex gap-2">
            <Users className="h-4 w-4" />
            Teams
          </TabsTrigger>
        </TabsList>
        <TabsContent value="individual" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Individuele ranglijst</CardTitle>
              <CardDescription>De beste individuele prestaties in ransomware-response training</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-12 gap-2 border-b bg-muted/50 p-4 text-sm font-medium">
                  <div className="col-span-1 text-center">#</div>
                  <div className="col-span-5">Gebruiker</div>
                  <div className="col-span-2 text-center">Score</div>
                  <div className="col-span-2 text-center">Simulaties</div>
                  <div className="col-span-2 text-center">Acties</div>
                </div>
                <div className="divide-y">
                  {individualLeaderboard.map((user) => (
                    <div key={user.id} className="grid grid-cols-12 items-center gap-2 p-4">
                      <div className="col-span-1 flex items-center justify-center">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                            user.rank === 1
                              ? "bg-yellow-500/10 text-yellow-500"
                              : user.rank === 2
                                ? "bg-slate-300/10 text-slate-300"
                                : user.rank === 3
                                  ? "bg-amber-700/10 text-amber-700"
                                  : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {user.rank}
                        </div>
                      </div>
                      <div className="col-span-5 flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.company}</div>
                        </div>
                      </div>
                      <div className="col-span-2 text-center font-medium">{user.score}%</div>
                      <div className="col-span-2 text-center text-muted-foreground">{user.completedSimulations}</div>
                      <div className="col-span-2 flex justify-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              Details <ChevronDown className="ml-1 h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Bekijk profiel</DropdownMenuItem>
                            <DropdownMenuItem>Bekijk simulaties</DropdownMenuItem>
                            <DropdownMenuItem>Vergelijk scores</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Team ranglijst</CardTitle>
              <CardDescription>De beste teamprestaties in ransomware-response training</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-12 gap-2 border-b bg-muted/50 p-4 text-sm font-medium">
                  <div className="col-span-1 text-center">#</div>
                  <div className="col-span-5">Team</div>
                  <div className="col-span-2 text-center">Gem. score</div>
                  <div className="col-span-2 text-center">Simulaties</div>
                  <div className="col-span-2 text-center">Acties</div>
                </div>
                <div className="divide-y">
                  {teamLeaderboard.map((team) => (
                    <div key={team.id} className="grid grid-cols-12 items-center gap-2 p-4">
                      <div className="col-span-1 flex items-center justify-center">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                            team.rank === 1
                              ? "bg-yellow-500/10 text-yellow-500"
                              : team.rank === 2
                                ? "bg-slate-300/10 text-slate-300"
                                : team.rank === 3
                                  ? "bg-amber-700/10 text-amber-700"
                                  : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {team.rank}
                        </div>
                      </div>
                      <div className="col-span-5 flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={team.logo} alt={team.name} />
                          <AvatarFallback>
                            {team.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{team.name}</div>
                          <div className="text-sm text-muted-foreground">{team.members} leden</div>
                        </div>
                      </div>
                      <div className="col-span-2 text-center font-medium">{team.avgScore}%</div>
                      <div className="col-span-2 text-center text-muted-foreground">{team.completedSimulations}</div>
                      <div className="col-span-2 flex justify-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              Details <ChevronDown className="ml-1 h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Bekijk team</DropdownMenuItem>
                            <DropdownMenuItem>Bekijk leden</DropdownMenuItem>
                            <DropdownMenuItem>Bekijk simulaties</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

