"use client"

import { useState } from "react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { addHousing } from "@/lib/store"
import { Home, Check, Upload, X } from "lucide-react"

export function AddHousingForm({ onAdded }: { onAdded: () => void }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    rooms: "",
    phone: "",
  })
  const [imagePreview, setImagePreview] = useState<string>("")
  const [success, setSuccess] = useState(false)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.size <= 1024 * 1024) { // Max 1MB
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else if (file?.size) {
      alert("Rasm hajmi 1MB dan katta bo'lmasligi kerak")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title || !form.price || !form.location || !form.phone) return

    const imageUrl = imagePreview || "/images/housing-" + (Math.floor(Math.random() * 5) + 1) + ".jpg"

    await addHousing({
      title: form.title,
      description: form.description,
      price: Number(form.price),
      location: form.location,
      rooms: Number(form.rooms) || 1,
      phone: form.phone,
      image: imageUrl,
      createdBy: "Siz",
    })

    setForm({ title: "", description: "", price: "", location: "", rooms: "", phone: "" })
    setImagePreview("")
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
            <Label>Rasm qo{"'"}shing</Label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="image-input"
              />
              {imagePreview ? (
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setImagePreview("")}
                    className="absolute right-2 top-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="image-input"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-primary rounded-lg cursor-pointer hover:bg-primary/5"
                >
                  <Upload className="h-6 w-6 text-primary mb-2" />
                  <span className="text-sm text-primary">Rasmni yuklash</span>
                </label>
              )}
            </div>
          </div>

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
