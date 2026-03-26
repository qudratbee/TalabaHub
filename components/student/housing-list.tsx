"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SearchFilter } from "./search-filter"
import { getHousingList } from "@/lib/store"
import type { Housing } from "@/lib/types"
import { Home, MapPin, Phone, DoorOpen } from "lucide-react"

export function HousingList() {
  const [items, setItems] = useState<Housing[]>([])
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    setItems(getHousingList())
  }, [])

  const filtered = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase())
    const matchesFilter =
      filter === "all" || item.rooms.toString() === filter
    return matchesSearch && matchesFilter
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("uz-UZ").format(price) + " so'm"
  }

  return (
    <div className="flex flex-col gap-6">
      <SearchFilter
        searchValue={search}
        onSearchChange={setSearch}
        filterValue={filter}
        onFilterChange={setFilter}
        filterPlaceholder="Xonalar soni"
        searchPlaceholder="Uy qidirish..."
        filterOptions={[
          { value: "1", label: "1 xonali" },
          { value: "2", label: "2 xonali" },
          { value: "3", label: "3+ xonali" },
        ]}
      />

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Home className="mb-3 h-10 w-10 text-muted-foreground/50" />
          <p className="text-lg font-medium text-muted-foreground">Hech narsa topilmadi</p>
          <p className="text-sm text-muted-foreground/70">Qidiruv so{"'"}zini o{"'"}zgartirib ko{"'"}ring</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <Card key={item.id} className="group overflow-hidden transition-all hover:shadow-lg">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute right-3 top-3">
                  <Badge className="bg-primary text-primary-foreground shadow-md">
                    {formatPrice(item.price)}/oy
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    {item.location}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <DoorOpen className="h-3.5 w-3.5" />
                    {item.rooms} xona
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1 rounded-md bg-secondary px-2.5 py-1.5 text-xs text-secondary-foreground">
                  <Phone className="h-3 w-3" />
                  {item.phone}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
