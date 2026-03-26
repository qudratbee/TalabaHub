"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { addHousing } from "@/lib/store"
import { Home, Check } from "lucide-react"

export function AddHousingForm({ onAdded }: { onAdded: () => void }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    rooms: "",
    phone: "",
  })
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title || !form.price || !form.location || !form.phone) return

    addHousing({
      title: form.title,
      description: form.description,
      price: Number(form.price),
      location: form.location,
      rooms: Number(form.rooms) || 1,
      phone: form.phone,
      image: "/images/housing-" + (Math.floor(Math.random() * 5) + 1) + ".jpg",
      createdBy: "Siz",
    })

    setForm({ title: "", description: "", price: "", location: "", rooms: "", phone: "" })
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
    onAdded()
  }

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Home className="h-5 w-5 text-primary" />
          Yangi uy e{"'"}loni
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="h-title">Sarlavha *</Label>
            <Input id="h-title" placeholder="Masalan: Chilonzor, 2-xonali kvartira" value={form.title} onChange={(e) => update("title", e.target.value)} required />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="h-desc">Tavsif</Label>
            <Textarea id="h-desc" placeholder="Uy haqida batafsil ma'lumot..." value={form.description} onChange={(e) => update("description", e.target.value)} rows={3} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="h-price">Oylik narx (so{"'"}m) *</Label>
              <Input id="h-price" type="number" placeholder="2000000" value={form.price} onChange={(e) => update("price", e.target.value)} required />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="h-rooms">Xonalar soni</Label>
              <Input id="h-rooms" type="number" placeholder="2" value={form.rooms} onChange={(e) => update("rooms", e.target.value)} />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="h-location">Manzil *</Label>
              <Input id="h-location" placeholder="Chilonzor, Toshkent" value={form.location} onChange={(e) => update("location", e.target.value)} required />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="h-phone">Telefon *</Label>
              <Input id="h-phone" placeholder="+998 90 123 45 67" value={form.phone} onChange={(e) => update("phone", e.target.value)} required />
            </div>
          </div>
          <Button type="submit" className="mt-2 w-full sm:w-auto">
            {success ? <><Check className="mr-1 h-4 w-4" /> Qo{"'"}shildi!</> : "E'lon berish"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
