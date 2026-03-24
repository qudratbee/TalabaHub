"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SearchFilter } from "./search-filter"
import { getMaterialsList } from "@/lib/store"
import type { Material } from "@/lib/types"
import { BookOpen, ExternalLink, FileText, Video, BookMarked } from "lucide-react"

const typeIcons: Record<Material["type"], typeof BookOpen> = {
  kitob: BookMarked,
  konspekt: FileText,
  video: Video,
  boshqa: BookOpen,
}

const typeLabels: Record<Material["type"], string> = {
  kitob: "Kitob",
  konspekt: "Konspekt",
  video: "Video",
  boshqa: "Boshqa",
}

const typeColors: Record<Material["type"], string> = {
  kitob: "bg-primary/10 text-primary",
  konspekt: "bg-accent/10 text-accent",
  video: "bg-chart-5/10 text-chart-5",
  boshqa: "bg-muted text-muted-foreground",
}

export function MaterialsList() {
  const [items, setItems] = useState<Material[]>([])
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    getMaterialsList().then((data) => {
      setItems(data)
      setIsLoading(false)
    })
  }, [])

  const filtered = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.subject.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === "all" || item.type === filter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="flex flex-col gap-6">
      <SearchFilter
        searchValue={search}
        onSearchChange={setSearch}
        filterValue={filter}
        onFilterChange={setFilter}
        filterPlaceholder="Material turi"
        searchPlaceholder="Material qidirish..."
        filterOptions={[
          { value: "kitob", label: "Kitob" },
          { value: "konspekt", label: "Konspekt" },
          { value: "video", label: "Video" },
          { value: "boshqa", label: "Boshqa" },
        ]}
      />

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <BookOpen className="mb-3 h-10 w-10 text-muted-foreground/50" />
          <p className="text-lg font-medium text-muted-foreground">Hech narsa topilmadi</p>
          <p className="text-sm text-muted-foreground/70">Qidiruv so{"'"}zini o{"'"}zgartirib ko{"'"}ring</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => {
            const Icon = typeIcons[item.type]
            return (
              <Card key={item.id} className="transition-all hover:shadow-md">
                <CardContent className="p-5">
                  <div className="mb-3 flex items-start justify-between">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${typeColors[item.type]}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${typeColors[item.type]}`}>
                      {typeLabels[item.type]}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-1 text-xs font-medium text-primary">{item.subject}</p>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {item.createdBy} tomonidan
                    </span>
                    {item.link && (
                      <Button variant="ghost" size="sm" asChild className="h-7 text-xs text-primary">
                        <a href={item.link} target="_blank" rel="noopener noreferrer">
                          Ochish <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
