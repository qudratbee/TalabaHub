"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SearchFilter } from "./search-filter"
import { getJobsList } from "@/lib/store"
import type { Job } from "@/lib/types"
import { Briefcase, MapPin, Phone, Building2, Banknote } from "lucide-react"

const typeLabels: Record<Job["type"], string> = {
  "full-time": "To'liq vaqt",
  "part-time": "Yarim kunlik",
  freelance: "Frilanser",
}

const typeBadgeColors: Record<Job["type"], string> = {
  "full-time": "bg-primary/10 text-primary",
  "part-time": "bg-accent/10 text-accent",
  freelance: "bg-chart-3/10 text-chart-3",
}

export function JobsList() {
  const [items, setItems] = useState<Job[]>([])
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    setItems(getJobsList())
  }, [])

  const filtered = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.company.toLowerCase().includes(search.toLowerCase())
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
        filterPlaceholder="Ish turi"
        searchPlaceholder="Ish qidirish..."
        filterOptions={[
          { value: "full-time", label: "To'liq vaqt" },
          { value: "part-time", label: "Yarim kunlik" },
          { value: "freelance", label: "Frilanser" },
        ]}
      />

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Briefcase className="mb-3 h-10 w-10 text-muted-foreground/50" />
          <p className="text-lg font-medium text-muted-foreground">Hech narsa topilmadi</p>
          <p className="text-sm text-muted-foreground/70">Qidiruv so{"'"}zini o{"'"}zgartirib ko{"'"}ring</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((item) => (
            <Card key={item.id} className="transition-all hover:shadow-md">
              <CardContent className="p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${typeBadgeColors[item.type]}`}>
                        {typeLabels[item.type]}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Building2 className="h-3.5 w-3.5" />
                        {item.company}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" />
                        {item.location}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-medium text-primary">
                        <Banknote className="h-3.5 w-3.5" />
                        {item.salary}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 rounded-md bg-secondary px-2.5 py-1.5 text-xs text-secondary-foreground">
                    <Phone className="h-3 w-3" />
                    {item.phone}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
