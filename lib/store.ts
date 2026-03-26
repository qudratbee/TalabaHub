import type { User, Housing, Job, Material } from "./types"

const KEYS = {
  user: "talabahub_user",
  housing: "talabahub_housing",
  jobs: "talabahub_jobs",
  materials: "talabahub_materials",
}

// --- User ---
export function getUser(): User | null {
  if (typeof window === "undefined") return null
  const raw = localStorage.getItem(KEYS.user)
  return raw ? JSON.parse(raw) : null
}

export function setUser(user: User) {
  localStorage.setItem(KEYS.user, JSON.stringify(user))
}

export function clearUser() {
  localStorage.removeItem(KEYS.user)
}

// --- Generic CRUD ---
function getList<T>(key: string): T[] {
  if (typeof window === "undefined") return []
  const raw = localStorage.getItem(key)
  return raw ? JSON.parse(raw) : []
}

function setList<T>(key: string, items: T[]) {
  localStorage.setItem(key, JSON.stringify(items))
}

// --- Housing ---
export function getHousingList(): Housing[] {
  return getList<Housing>(KEYS.housing)
}

export function addHousing(item: Omit<Housing, "id" | "createdAt">) {
  const list = getHousingList()
  const newItem: Housing = {
    ...item,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  }
  setList(KEYS.housing, [newItem, ...list])
  return newItem
}

export function removeHousing(id: string) {
  setList(KEYS.housing, getHousingList().filter((h) => h.id !== id))
}

// --- Jobs ---
export function getJobsList(): Job[] {
  return getList<Job>(KEYS.jobs)
}

export function addJob(item: Omit<Job, "id" | "createdAt">) {
  const list = getJobsList()
  const newItem: Job = {
    ...item,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  }
  setList(KEYS.jobs, [newItem, ...list])
  return newItem
}

export function removeJob(id: string) {
  setList(KEYS.jobs, getJobsList().filter((j) => j.id !== id))
}

// --- Materials ---
export function getMaterialsList(): Material[] {
  return getList<Material>(KEYS.materials)
}

export function addMaterial(item: Omit<Material, "id" | "createdAt">) {
  const list = getMaterialsList()
  const newItem: Material = {
    ...item,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  }
  setList(KEYS.materials, [newItem, ...list])
  return newItem
}

export function removeMaterial(id: string) {
  setList(KEYS.materials, getMaterialsList().filter((m) => m.id !== id))
}

// --- Seed demo data ---
export function seedDemoData() {
  if (getHousingList().length === 0) {
    const demoHousing: Omit<Housing, "id" | "createdAt">[] = [
      {
        title: "Chilonzor, 2-xonali kvartira",
        description: "Metro yaqinida, yangi ta'mirlangan, hammasi bor. Talabalar uchun juda qulay joylashgan.",
        price: 2500000,
        location: "Chilonzor, Toshkent",
        rooms: 2,
        phone: "+998 90 123 45 67",
        image: "/images/housing-1.jpg",
        createdBy: "Ahror",
      },
      {
        title: "Yunusobod, studio kvartira",
        description: "Zamonaviy studio, 1-qavatda, alohida kirish. Internet va kommunal xizmatlar narxga kiradi.",
        price: 1800000,
        location: "Yunusobod, Toshkent",
        rooms: 1,
        phone: "+998 91 234 56 78",
        image: "/images/housing-2.jpg",
        createdBy: "Sardor",
      },
      {
        title: "TTU yaqinida xona",
        description: "Toshkent texnika universiteti yaqinida, 1 kishilik xona. Tinch va qulay muhit.",
        price: 1200000,
        location: "Olmazor, Toshkent",
        rooms: 1,
        phone: "+998 93 345 67 89",
        image: "/images/housing-3.jpg",
        createdBy: "Dilshod",
      },
      {
        title: "Sergeli, 3-xonali uy",
        description: "Keng hovli, 3 ta xona, oshxona. 3-4 talaba uchun ideal variant. Avtobus bekati yaqin.",
        price: 3200000,
        location: "Sergeli, Toshkent",
        rooms: 3,
        phone: "+998 94 456 78 90",
        image: "/images/housing-4.jpg",
        createdBy: "Bekzod",
      },
      {
        title: "TDYU yonida 1-xonali",
        description: "Toshkent davlat yuridik universiteti yonida. Mebelliangan, konditsioner bor.",
        price: 2000000,
        location: "Yakkasaroy, Toshkent",
        rooms: 1,
        phone: "+998 95 567 89 01",
        image: "/images/housing-5.jpg",
        createdBy: "Nodir",
      },
    ]
    demoHousing.forEach((h) => addHousing(h))
  }

  if (getJobsList().length === 0) {
    const demoJobs: Omit<Job, "id" | "createdAt">[] = [
      {
        title: "Part-time Frontend dasturchi",
        description: "React/Next.js bilimingiz bormi? Startap jamoamizga qo'shiling! Masofaviy ish, talabalar uchun qulay grafik.",
        company: "TechStart UZ",
        salary: "3 000 000 - 5 000 000 so'm",
        type: "part-time",
        location: "Masofaviy",
        phone: "+998 90 111 22 33",
        createdBy: "TechStart",
      },
      {
        title: "Ofitsiant (kechki smena)",
        description: "Kechki 18:00 dan 23:00 gacha. Tajriba talab qilinmaydi, o'rgatamiz. Oshxona + maosh.",
        company: "Milliy Taomlar",
        salary: "2 000 000 so'm + choy pul",
        type: "part-time",
        location: "Mirzo Ulug'bek, Toshkent",
        phone: "+998 91 222 33 44",
        createdBy: "Milliy Taomlar",
      },
      {
        title: "Ingliz tili repetitori",
        description: "IELTS 6.5+ bo'lsa, o'quvchilarga dars berishingiz mumkin. Hafta 3-4 kun, soatiga 50 000 so'm.",
        company: "EduCenter",
        salary: "50 000 so'm/soat",
        type: "freelance",
        location: "Chilonzor, Toshkent",
        phone: "+998 93 333 44 55",
        createdBy: "EduCenter",
      },
      {
        title: "SMM mutaxassis",
        description: "Instagram va Telegram kanallarni boshqarish. Kreativ kontent yaratish. Portfolio talab qilinadi.",
        company: "Digital Agency",
        salary: "4 000 000 so'm",
        type: "full-time",
        location: "Masofaviy",
        phone: "+998 94 444 55 66",
        createdBy: "Digital Agency",
      },
      {
        title: "Kuryer (ertalabki smena)",
        description: "Ertalab 7:00 dan 13:00 gacha. Velosiped yoki moped bo'lsa afzal. Kunlik to'lov.",
        company: "Express Delivery",
        salary: "80 000 - 120 000 so'm/kun",
        type: "part-time",
        location: "Toshkent shahri",
        phone: "+998 95 555 66 77",
        createdBy: "Express Delivery",
      },
    ]
    demoJobs.forEach((j) => addJob(j))
  }

  if (getMaterialsList().length === 0) {
    const demoMaterials: Omit<Material, "id" | "createdAt">[] = [
      {
        title: "Oliy matematika - to'liq konspekt",
        description: "1-2 kurs uchun oliy matematika bo'yicha barcha mavzular. Misollar va yechimlar bilan.",
        subject: "Matematika",
        type: "konspekt",
        link: "https://example.com/math",
        createdBy: "Jasur",
      },
      {
        title: "Fizika asoslari - darslik",
        description: "Mexanika, termodinamika, elektr - barcha bo'limlar. PDF formatda, 450 bet.",
        subject: "Fizika",
        type: "kitob",
        link: "https://example.com/physics",
        createdBy: "Otabek",
      },
      {
        title: "IELTS Speaking video darslar",
        description: "50 ta video dars, har biri 15-20 daqiqa. Band 7.0+ uchun strategiyalar.",
        subject: "Ingliz tili",
        type: "video",
        link: "https://example.com/ielts",
        createdBy: "Malika",
      },
      {
        title: "Dasturlash asoslari - Python",
        description: "Noldan Python o'rganish uchun. 30 ta dars + 100 ta mashq. Bepul.",
        subject: "Informatika",
        type: "video",
        link: "https://example.com/python",
        createdBy: "Sherzod",
      },
      {
        title: "Iqtisodiyot nazariyasi konspekt",
        description: "Mikro va makroiqtisodiyot. Grafik va jadvallar bilan tushuntirilgan.",
        subject: "Iqtisodiyot",
        type: "konspekt",
        createdBy: "Gulnora",
      },
    ]
    demoMaterials.forEach((m) => addMaterial(m))
  }
}
