"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { GraduationCap, Menu, X, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { getUser, clearUser } from "@/lib/store"
import type { User } from "@/lib/types"

export function SiteHeader() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    setUser(getUser())
  }, [pathname])

  const handleLogout = () => {
    clearUser()
    setUser(null)
    window.location.href = "/"
  }

  const isLanding = pathname === "/"
  const roleName = user?.role === "student" ? "Talaba" : user?.role === "provider" ? "E'lon beruvchi" : null

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            TalabaHub
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {isLanding ? (
            <>
              <Link href="#features" className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                Afzalliklar
              </Link>
              <Link href="#about" className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                Biz haqimizda
              </Link>
            </>
          ) : (
            <>
              {user?.role === "student" && (
                <Link href="/student" className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                  Dashboard
                </Link>
              )}
              {user?.role === "provider" && (
                <Link href="/provider" className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                  Dashboard
                </Link>
              )}
            </>
          )}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-secondary-foreground">{user.name}</span>
                <span className="text-xs text-muted-foreground">({roleName})</span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground">
                <LogOut className="mr-1 h-4 w-4" />
                Chiqish
              </Button>
            </div>
          ) : (
            <Link href="/?login=true">
              <Button>Kirish</Button>
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="rounded-md p-2 text-foreground md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-card px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-2">
            {isLanding ? (
              <>
                <Link href="#features" className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground" onClick={() => setMobileOpen(false)}>Afzalliklar</Link>
                <Link href="#about" className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground" onClick={() => setMobileOpen(false)}>Biz haqimizda</Link>
              </>
            ) : (
              <>
                {user?.role === "student" && <Link href="/student" className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground" onClick={() => setMobileOpen(false)}>Dashboard</Link>}
                {user?.role === "provider" && <Link href="/provider" className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground" onClick={() => setMobileOpen(false)}>Dashboard</Link>}
              </>
            )}
            {user ? (
              <div className="mt-2 flex items-center justify-between border-t border-border pt-3">
                <span className="text-sm font-medium text-foreground">{user.name} ({roleName})</span>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground">
                  <LogOut className="mr-1 h-4 w-4" /> Chiqish
                </Button>
              </div>
            ) : (
              <Link href="/?login=true" onClick={() => setMobileOpen(false)}>
                <Button className="mt-2 w-full">Kirish</Button>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
