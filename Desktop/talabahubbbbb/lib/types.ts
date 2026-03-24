export type Role = "student" | "provider"

export type User = {
  name: string
  role: Role
}

export type Housing = {
  id: string
  title: string
  description: string
  price: number
  location: string
  rooms: number
  phone: string
  image: string
  createdBy: string
  createdAt: string
}

export type Job = {
  id: string
  title: string
  description: string
  company: string
  salary: string
  type: "full-time" | "part-time" | "freelance"
  location: string
  phone: string
  createdBy: string
  createdAt: string
}

export type Material = {
  id: string
  title: string
  description: string
  subject: string
  type: "kitob" | "konspekt" | "video" | "boshqa"
  link?: string
  createdBy: string
  createdAt: string
}
