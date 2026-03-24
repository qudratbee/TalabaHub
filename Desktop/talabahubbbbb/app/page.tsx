"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { LandingHero, LandingFeatures } from "@/components/landing-sections"
import { RoleSelectDialog } from "@/components/role-select-dialog"
import { Button } from "@/components/ui/button"
import { getUser, seedDemoData } from "@/lib/store"
import { ArrowRight } from "lucide-react"

function HomeContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    seedDemoData()
  }, [])

  useEffect(() => {
    const user = getUser()
    // If user is already logged in and directly visits home page, redirect them
    if (user && !searchParams.get("logout")) {
      router.replace(user.role === "student" ? "/student" : "/provider")
    }
  }, [router, searchParams])

  useEffect(() => {
    const user = getUser()
    if (searchParams.get("login") === "true") {
      if (user) {
        router.replace(user.role === "student" ? "/student" : "/provider")
      } else {
        setDialogOpen(true)
      }
    }
  }, [searchParams, router])

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <LandingHero />

        <section className="bg-background py-12">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 text-center lg:px-8">
            <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
              Hoziroq boshlang!
            </h2>
            <p className="max-w-md text-muted-foreground">
              Talaba bo{"'"}lsangiz yoki e{"'"}lon bermoqchi bo{"'"}lsangiz - platformaga kiring
            </p>
            <Button size="lg" onClick={() => setDialogOpen(true)} className="mt-2">
              Platformaga kirish
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>

        <LandingFeatures />

        <section id="about" className="bg-background py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
                  TalabaHub haqida
                </h2>
                <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                  TalabaHub - O{"'"}zbekiston talabalari uchun yaratilgan yagona platforma.
                  Biz talabalarning eng katta muammolarini hal qilishga harakat qilamiz:
                  arzon uy topish, o{"'"}qish bilan birga ishlash va sifatli o{"'"}quv materiallarini topish.
                </p>
                <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                  Uy egalari, ish beruvchilar va o{"'"}qituvchilar ham platformamizda bepul e{"'"}lon berishlari mumkin.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "5,000+", label: "Talabalar" },
                  { value: "500+", label: "E'lonlar" },
                  { value: "50+", label: "Universitetlar" },
                  { value: "24/7", label: "Faol platforma" },
                ].map((stat) => (
                  <div key={stat.label} className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-6">
                    <span className="text-2xl font-bold text-primary">{stat.value}</span>
                    <span className="mt-1 text-sm text-muted-foreground">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <RoleSelectDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  )
}

export default function HomePage() {
  return (
    <Suspense>
      <HomeContent />
    </Suspense>
  )
}
