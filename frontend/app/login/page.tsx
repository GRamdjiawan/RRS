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

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login delay
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
          <CardTitle className="text-2xl">Inloggen</CardTitle>
          <CardDescription>Log in op uw RansimPro account</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mailadres</Label>
              <Input id="email" type="email" placeholder="naam@bedrijf.nl" required />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Wachtwoord</Label>
                <Link href="/forgot-password" className="text-xs text-primary hover:underline">
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
              <Link href="/register" className="text-primary hover:underline">
                Registreer
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

