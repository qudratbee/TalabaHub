"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GraduationCap, Building2, ArrowRight } from "lucide-react"
import { setUser } from "@/lib/store"
import type { Role } from "@/lib/types"

export function RoleSelectDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [name, setName] = useState("")
  const [step, setStep] = useState<"role" | "name">("role")

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role)
    setStep("name")
  }

  const handleSubmit = () => {
    if (!selectedRole || !name.trim()) return
    setUser({ name: name.trim(), role: selectedRole })
    onOpenChange(false)
    if (selectedRole === "student") {
      router.push("/student")
    } else {
      router.push("/provider")
    }
  }

  const handleBack = () => {
    setStep("role")
    setSelectedRole(null)
    setName("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {step === "role" ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-center text-xl">TalabaHub{"'"}ga xush kelibsiz!</DialogTitle>
              <DialogDescription className="text-center">
                Davom etish uchun o{"'"}zingizga mos variantni tanlang
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <button
                onClick={() => handleRoleSelect("student")}
                className="group flex flex-col items-center gap-3 rounded-xl border-2 border-border bg-card p-6 transition-all hover:border-primary hover:shadow-lg"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <GraduationCap className="h-7 w-7 text-primary" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-foreground">Men talabaman</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Uy, ish va materiallarni qidiraman
                  </p>
                </div>
              </button>

              <button
                onClick={() => handleRoleSelect("provider")}
                className="group flex flex-col items-center gap-3 rounded-xl border-2 border-border bg-card p-6 transition-all hover:border-primary hover:shadow-lg"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 transition-colors group-hover:bg-accent/20">
                  <Building2 className="h-7 w-7 text-accent" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-foreground">E{"'"}lon bermoqchiman</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Uy, ish yoki material joylash
                  </p>
                </div>
              </button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-center text-xl">
                {selectedRole === "student" ? "Talaba sifatida kirish" : "E'lon beruvchi sifatida kirish"}
              </DialogTitle>
              <DialogDescription className="text-center">
                Ismingizni kiriting
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Ismingiz</Label>
                <Input
                  id="name"
                  placeholder="Masalan: Aziz"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  autoFocus
                />
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={handleBack} className="flex-1">
                  Orqaga
                </Button>
                <Button onClick={handleSubmit} disabled={!name.trim()} className="flex-1">
                  Davom etish
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
