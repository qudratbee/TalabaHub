"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { addJob } from "@/lib/store"
import type { Job } from "@/lib/types"
import { Briefcase, Check } from "lucide-react"

export function AddJobForm({ onAdded }: { onAdded: () => void }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    company: "",
    salary: "",
    type: "part-time" as Job["type"],
    location: "",
    phone: "",
  })
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title || !form.company || !form.phone) return

    addJob({
      title: form.title,
      description: form.description,
      company: form.company,
      salary: form.salary,
      type: form.type,
      location: form.location,
      phone: form.phone,
      createdBy: "Siz",
    })

    setForm({ title: "", description: "", company: "", salary: "", type: "part-time", location: "", phone: "" })
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
    onAdded()
  }

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Briefcase className="h-5 w-5 text-primary" />
          Yangi ish e{"'"}loni
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="j-title">Lavozim nomi *</Label>
            <Input id="j-title" placeholder="Masalan: Part-time dasturchi" value={form.title} onChange={(e) => update("title", e.target.value)} required />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="j-desc">Tavsif</Label>
            <Textarea id="j-desc" placeholder="Ish haqida batafsil..." value={form.description} onChange={(e) => update("description", e.target.value)} rows={3} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="j-company">Kompaniya nomi *</Label>
              <Input id="j-company" placeholder="Masalan: TechStart" value={form.company} onChange={(e) => update("company", e.target.value)} required />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="j-salary">Maosh</Label>
              <Input id="j-salary" placeholder="3 000 000 so'm" value={form.salary} onChange={(e) => update("salary", e.target.value)} />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="flex flex-col gap-2">
              <Label>Ish turi</Label>
              <Select value={form.type} onValueChange={(v) => update("type", v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="part-time">Yarim kunlik</SelectItem>
                  <SelectItem value="full-time">To{"'"}liq vaqt</SelectItem>
                  <SelectItem value="freelance">Frilanser</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="j-location">Manzil</Label>
              <Input id="j-location" placeholder="Masofaviy / Toshkent" value={form.location} onChange={(e) => update("location", e.target.value)} />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="j-phone">Telefon *</Label>
              <Input id="j-phone" placeholder="+998 90 ..." value={form.phone} onChange={(e) => update("phone", e.target.value)} required />
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
