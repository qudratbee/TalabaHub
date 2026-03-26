"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AddHousingForm } from "@/components/provider/add-housing-form"
import { AddJobForm } from "@/components/provider/add-job-form"
import { AddMaterialForm } from "@/components/provider/add-material-form"
import { MyListings } from "@/components/provider/my-listings"
import { getUser, seedDemoData } from "@/lib/store"
import { Home, Briefcase, BookOpen, LayoutList } from "lucide-react"

export default function ProviderPage() {
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    seedDemoData()
    const user = getUser()
    if (!user) {
      router.replace("/?login=true")
      return
    }
    setReady(true)
  }, [router])

  const handleAdded = useCallback(() => {
    setRefreshKey((k) => k + 1)
  }, [])

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
            <h1 className="font-serif text-3xl font-bold text-foreground">E{"'"}lon beruvchi paneli</h1>
            <p className="mt-1 text-muted-foreground">
              Uy, ish yoki material e{"'"}lonlarini qo{"'"}shing va boshqaring
            </p>
          </div>

          <Tabs defaultValue="housing" className="w-full">
            <TabsList className="mb-6 w-full justify-start bg-secondary">
              <TabsTrigger value="housing" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Uy qo{"'"}shish</span>
                <span className="sm:hidden">Uy</span>
              </TabsTrigger>
              <TabsTrigger value="jobs" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                <span className="hidden sm:inline">Ish qo{"'"}shish</span>
                <span className="sm:hidden">Ish</span>
              </TabsTrigger>
              <TabsTrigger value="materials" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Material qo{"'"}shish</span>
                <span className="sm:hidden">Material</span>
              </TabsTrigger>
              <TabsTrigger value="my-listings" className="flex items-center gap-2">
                <LayoutList className="h-4 w-4" />
                <span className="hidden sm:inline">Mening e{"'"}lonlarim</span>
                <span className="sm:hidden">E{"'"}lonlar</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="housing">
              <AddHousingForm onAdded={handleAdded} />
            </TabsContent>
            <TabsContent value="jobs">
              <AddJobForm onAdded={handleAdded} />
            </TabsContent>
            <TabsContent value="materials">
              <AddMaterialForm onAdded={handleAdded} />
            </TabsContent>
            <TabsContent value="my-listings">
              <MyListings refreshKey={refreshKey} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
