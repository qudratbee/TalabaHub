"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getHousingList, getJobsList, getMaterialsList, removeHousing, removeJob, removeMaterial } from "@/lib/store"
import type { Housing, Job, Material } from "@/lib/types"
import { Home, Briefcase, BookOpen, Trash2, MapPin, Banknote } from "lucide-react"

export function MyListings({ refreshKey }: { refreshKey: number }) {
  const [housing, setHousing] = useState<Housing[]>([])
  const [jobs, setJobs] = useState<Job[]>([])
  const [materials, setMaterials] = useState<Material[]>([])

  useEffect(() => {
    Promise.all([getHousingList(), getJobsList(), getMaterialsList()]).then(
      ([h, j, m]) => {
        setHousing(h.filter((item) => item.createdBy === "Siz"))
        setJobs(j.filter((item) => item.createdBy === "Siz"))
        setMaterials(m.filter((item) => item.createdBy === "Siz"))
      }
    )
  }, [refreshKey])

  const handleRemoveHousing = async (id: string) => {
    await removeHousing(id)
    setHousing((prev) => prev.filter((h) => h.id !== id))
  }

  const handleRemoveJob = async (id: string) => {
    await removeJob(id)
    setJobs((prev) => prev.filter((j) => j.id !== id))
  }

  const handleRemoveMaterial = async (id: string) => {
    await removeMaterial(id)
    setMaterials((prev) => prev.filter((m) => m.id !== id))
  }

  const total = housing.length + jobs.length + materials.length

  if (total === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16 text-center">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <Home className="h-6 w-6 text-muted-foreground" />
        </div>
        <p className="text-lg font-medium text-muted-foreground">Sizda hali e{"'"}lonlar yo{"'"}q</p>
        <p className="mt-1 text-sm text-muted-foreground/70">
          Yuqoridagi formalar orqali yangi e{"'"}lon qo{"'"}shing
        </p>
      </div>
    )
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("uz-UZ").format(price) + " so'm"
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <h3 className="text-lg font-semibold text-foreground">Sizning e{"'"}lonlaringiz</h3>
        <Badge variant="secondary">{total} ta</Badge>
      </div>

      {housing.length > 0 && (
        <div className="flex flex-col gap-3">
          <h4 className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Home className="h-4 w-4" /> Uylar ({housing.length})
          </h4>
          {housing.map((item) => (
            <Card key={item.id}>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex-1">
                  <p className="font-medium text-foreground">{item.title}</p>
                  <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{item.location}</span>
                    <span className="flex items-center gap-1 font-medium text-primary"><Banknote className="h-3 w-3" />{formatPrice(item.price)}/oy</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => handleRemoveHousing(item.id)} className="text-destructive hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {jobs.length > 0 && (
        <div className="flex flex-col gap-3">
          <h4 className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Briefcase className="h-4 w-4" /> Ishlar ({jobs.length})
          </h4>
          {jobs.map((item) => (
            <Card key={item.id}>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex-1">
                  <p className="font-medium text-foreground">{item.title}</p>
                  <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{item.company}</span>
                    <span className="font-medium text-primary">{item.salary}</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => handleRemoveJob(item.id)} className="text-destructive hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {materials.length > 0 && (
        <div className="flex flex-col gap-3">
          <h4 className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <BookOpen className="h-4 w-4" /> Materiallar ({materials.length})
          </h4>
          {materials.map((item) => (
            <Card key={item.id}>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex-1">
                  <p className="font-medium text-foreground">{item.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{item.subject}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => handleRemoveMaterial(item.id)} className="text-destructive hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
