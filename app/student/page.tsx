"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HousingList } from "@/components/student/housing-list"
import { JobsList } from "@/components/student/jobs-list"
import { MaterialsList } from "@/components/student/materials-list"
import { getUser, seedDemoData } from "@/lib/store"
import { Home, Briefcase, BookOpen } from "lucide-react"

export default function StudentPage() {
  const router = useRouter()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    seedDemoData()
    const user = getUser()
    if (!user) {
      router.replace("/?login=true")
      return
    }
    setReady(true)
  }, [router])

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
          <div className="mb-8">
            <h1 className="font-serif text-3xl font-bold text-foreground">Talaba paneli</h1>
            <p className="mt-1 text-muted-foreground">
              Ijaraga uylar, ish e{"'"}lonlari va o{"'"}quv materiallarini qidiring
            </p>
          </div>

          <Tabs defaultValue="housing" className="w-full">
            <TabsList className="mb-6 w-full justify-start bg-secondary">
              <TabsTrigger value="housing" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Ijaraga uylar</span>
                <span className="sm:hidden">Uylar</span>
              </TabsTrigger>
              <TabsTrigger value="jobs" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                <span className="hidden sm:inline">Ish e{"'"}lonlari</span>
                <span className="sm:hidden">Ishlar</span>
              </TabsTrigger>
              <TabsTrigger value="materials" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">O{"'"}quv materiallar</span>
                <span className="sm:hidden">Materiallar</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="housing">
              <HousingList />
            </TabsContent>
            <TabsContent value="jobs">
              <JobsList />
            </TabsContent>
            <TabsContent value="materials">
              <MaterialsList />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
