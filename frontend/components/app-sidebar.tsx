"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Home, LogOut, Settings, Shield, ShieldAlert, Trophy, Users } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/sidebar-provider"

export function AppSidebar() {
  const pathname = usePathname()
  const { isOpen } = useSidebar()

  const routes = [
    {
      label: "Home",
      icon: Home,
      href: "/",
      active: pathname === "/",
    },
    {
      label: "Dashboard",
      icon: BarChart3,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "Simulaties",
      icon: Shield,
      href: "/simulations",
      active: pathname === "/simulations",
    },
    {
      label: "Leaderboard",
      icon: Trophy,
      href: "/leaderboard",
      active: pathname === "/leaderboard",
    },
    {
      label: "Team",
      icon: Users,
      href: "/team",
      active: pathname === "/team",
    },
    {
      label: "Instellingen",
      icon: Settings,
      href: "/settings",
      active: pathname === "/settings",
    },
  ]

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-background transition-transform duration-300 md:relative md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <div className="flex h-16 items-center border-b border-border px-6">
        <Link href="/" className="flex items-center gap-2">
          <ShieldAlert className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">RansimPro</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid gap-1 px-2">
          {routes.map((route) => (
            <Button
              key={route.href}
              variant={route.active ? "secondary" : "ghost"}
              className={cn("justify-start gap-2 px-4", route.active && "bg-secondary/50")}
              asChild
            >
              <Link href={route.href}>
                <route.icon className="h-5 w-5" />
                {route.label}
              </Link>
            </Button>
          ))}
        </nav>
      </div>
      <div className="border-t border-border p-4">
        <Button variant="outline" className="w-full justify-start gap-2">
          <LogOut className="h-5 w-5" />
          Uitloggen
        </Button>
      </div>
    </div>
  )
}

