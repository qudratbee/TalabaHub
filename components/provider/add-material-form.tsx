"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { addMaterial } from "@/lib/store"
import type { Material } from "@/lib/types"
import { BookOpen, Check } from "lucide-react"

export function AddMaterialForm({ onAdded }: { onAdded: () => void }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    subject: "",
    type: "konspekt" as Material["type"],
    link: "",
  })
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title || !form.subject) return

    addMaterial({
      title: form.title,
      description: form.description,
      subject: form.subject,
      type: form.type,
      link: form.link || undefined,
      createdBy: "Siz",
    })

    setForm({ title: "", description: "", subject: "", type: "konspekt", link: "" })
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
    onAdded()
  }

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <BookOpen className="h-5 w-5 text-primary" />
          Yangi material
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="m-title">Sarlavha *</Label>
            <Input id="m-title" placeholder="Masalan: Oliy matematika konspekt" value={form.title} onChange={(e) => update("title", e.target.value)} required />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="m-desc">Tavsif</Label>
            <Textarea id="m-desc" placeholder="Material haqida..." value={form.description} onChange={(e) => update("description", e.target.value)} rows={3} />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="flex flex-col gap-2">
              <Label htmlFor="m-subject">Fan nomi *</Label>
              <Input id="m-subject" placeholder="Matematika" value={form.subject} onChange={(e) => update("subject", e.target.value)} required />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Material turi</Label>
              <Select value={form.type} onValueChange={(v) => update("type", v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="konspekt">Konspekt</SelectItem>
                  <SelectItem value="kitob">Kitob</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="boshqa">Boshqa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="m-link">Havola (ixtiyoriy)</Label>
              <Input id="m-link" placeholder="https://..." value={form.link} onChange={(e) => update("link", e.target.value)} />
            </div>
          </div>
          <Button type="submit" className="mt-2 w-full sm:w-auto">
            {success ? <><Check className="mr-1 h-4 w-4" /> Qo{"'"}shildi!</> : "Material qo'shish"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
