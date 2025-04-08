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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate registration delay
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="container flex h-[calc(100vh-4rem)] items-center justify-center md:h-[calc(100vh-4rem)]">
      <Card className="mx-auto w-full max-w-md border-border">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center">
            <ShieldAlert className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl">Account aanmaken</CardTitle>
          <CardDescription>Maak een nieuw RansimPro account aan</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
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
              <Label htmlFor="email">E-mailadres</Label>
              <Input id="email" type="email" placeholder="naam@bedrijf.nl" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Bedrijf</Label>
              <Input id="company" placeholder="Bedrijfsnaam" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Functie</Label>
              <Select>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Selecteer uw functie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="it-professional">IT Professional</SelectItem>
                  <SelectItem value="security-specialist">Security Specialist</SelectItem>
                  <SelectItem value="team-leader">Teamleider</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="other">Anders</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Wachtwoord</Label>
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
              {isLoading ? "Account aanmaken..." : "Registreren"}
            </Button>
            <div className="text-center text-sm">
              Heeft u al een account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Inloggen
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
