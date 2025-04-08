"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, ShieldAlert } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("login")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login/register delay
    setTimeout(() => {
      setIsLoading(false)
      router.push("/quiz")
    }, 1000)
  }

  return (
    <div className="container flex items-center justify-center min-h-screen px-4 py-12">
      <Card className="mx-auto w-full max-w-md border-border">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center">
            <ShieldAlert className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl">Welkom</CardTitle>
          <CardDescription>Log in of registreer om door te gaan</CardDescription>
        </CardHeader>
        <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="login">Inloggen</TabsTrigger>
            <TabsTrigger value="register">Registreren</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mailadres</Label>
                  <Input id="email" type="email" placeholder="naam@voorbeeld.nl" required />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Wachtwoord</Label>
                    <Link href="#" className="text-xs text-primary hover:underline">
                      Wachtwoord vergeten?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" required />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className="sr-only">{showPassword ? "Verberg wachtwoord" : "Toon wachtwoord"}</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Bezig met inloggen..." : "Inloggen"}
                </Button>
                <div className="text-center text-sm">
                  Nog geen account?{" "}
                  <button
                    type="button"
                    className="text-primary hover:underline"
                    onClick={() => setActiveTab("register")}
                  >
                    Registreer
                  </button>
                </div>
              </CardFooter>
            </form>
          </TabsContent>
          <TabsContent value="register">
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Voornaam</Label>
                    <Input id="firstName" placeholder="Jan" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Achternaam</Label>
                    <Input id="lastName" placeholder="Jansen" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registerEmail">E-mailadres</Label>
                  <Input id="registerEmail" type="email" placeholder="naam@voorbeeld.nl" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registerPassword">Wachtwoord</Label>
                  <div className="relative">
                    <Input
                      id="registerPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className="sr-only">{showPassword ? "Verberg wachtwoord" : "Toon wachtwoord"}</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Bezig met registreren..." : "Registreren"}
                </Button>
                <div className="text-center text-sm">
                  Heb je al een account?{" "}
                  <button type="button" className="text-primary hover:underline" onClick={() => setActiveTab("login")}>
                    Inloggen
                  </button>
                </div>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}
