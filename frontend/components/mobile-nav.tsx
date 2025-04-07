"use client"

import Link from "next/link"
import { Menu, ShieldAlert } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/sidebar-provider"

export function MobileNav() {
  const { toggle } = useSidebar()

  return (
    <div className="flex h-16 items-center border-b border-border px-4 md:hidden">
      <Button variant="ghost" size="icon" onClick={toggle}>
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle menu</span>
      </Button>
      <div className="flex flex-1 items-center justify-center">
        <Link href="/" className="flex items-center gap-2">
          <ShieldAlert className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">RansimPro</span>
        </Link>
      </div>
    </div>
  )
}

