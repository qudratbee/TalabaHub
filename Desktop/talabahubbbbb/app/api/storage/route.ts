import { NextRequest, NextResponse } from 'next/server'

// Set route timeout
export const maxDuration = 5

// In-memory cache for fast access
let memoryCache: {
  housing: any[]
  jobs: any[]
  materials: any[]
  lastUpdate: number
} = {
  housing: [],
  jobs: [],
  materials: [],
  lastUpdate: 0,
}

// Initialize with demo data once
let demoDataInitialized = false

function initializeDemoData() {
  if (demoDataInitialized) return
  demoDataInitialized = true

  memoryCache.housing = [
    {
      id: "demo-1",
      title: "Chilonzor, 2-xonali kvartira",
      description: "Yangi tamirlangan, barcha qulayliklar bilan",
      price: 2500000,
      location: "Chilonzor, Toshkent",
      rooms: 2,
      phone: "+998 90 123 45 67",
      image: "/images/housing-1.jpg",
      createdBy: "Ali",
      createdAt: new Date().toISOString(),
    },
    {
      id: "demo-2",
      title: "Yunusabad, 3-xonali uy",
      description: "Xususiy uy, o'z hozirligi bor",
      price: 3500000,
      location: "Yunusabad, Toshkent",
      rooms: 3,
      phone: "+998 91 234 56 78",
      image: "/images/housing-2.jpg",
      createdBy: "Fatima",
      createdAt: new Date().toISOString(),
    },
  ]

  memoryCache.jobs = [
    {
      id: "demo-1",
      title: "Matematika repetitori",
      description: "Oliy sinf o'quvchilari uchun",
      company: "Shaxsiy dars",
      salary: "150000-200000 so'm/soat",
      type: "part-time",
      location: "Toshkent",
      phone: "+998 90 111 22 33",
      createdBy: "Otabek",
      createdAt: new Date().toISOString(),
    },
    {
      id: "demo-2",
      title: "Ingliz tili dars",
      description: "Barchasi uchun qabul qiladi",
      company: "Online",
      salary: "100000-150000 so'm/soat",
      type: "part-time",
      location: "Online",
      phone: "+998 91 222 33 44",
      createdBy: "Nodira",
      createdAt: new Date().toISOString(),
    },
  ]

  memoryCache.materials = [
    {
      id: "demo-1",
      title: "Fizika konspekti",
      description: "11-sinf uchun to'liq konspekt",
      subject: "Fizika",
      type: "konspekt",
      link: "https://example.com/fizika",
      createdBy: "Sherzod",
      createdAt: new Date().toISOString(),
    },
    {
      id: "demo-2",
      title: "Kimyo mashqlari",
      description: "Har bir mavzu bo'yicha 50+ masala",
      subject: "Kimyo",
      type: "konspekt",
      link: "https://example.com/kimyo",
      createdBy: "Gulya",
      createdAt: new Date().toISOString(),
    },
  ]

  memoryCache.lastUpdate = Date.now()
}

export async function GET(request: NextRequest) {
  initializeDemoData()

  const searchParams = request.nextUrl.searchParams
  const type = searchParams.get('type')

  if (type && (type === 'housing' || type === 'jobs' || type === 'materials')) {
    return NextResponse.json(memoryCache[type])
  }

  return NextResponse.json({
    housing: memoryCache.housing,
    jobs: memoryCache.jobs,
    materials: memoryCache.materials,
  })
}

export async function POST(request: NextRequest) {
  initializeDemoData()

  try {
    const body = await request.json()
    const { type, action, item, id } = body

    if (!type || !['housing', 'jobs', 'materials'].includes(type)) {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
    }

    const typeKey = type as keyof typeof memoryCache

    if (action === 'add') {
      const newItem = {
        ...item,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      }
      memoryCache[typeKey].unshift(newItem)
      memoryCache.lastUpdate = Date.now()
      return NextResponse.json(newItem)
    }

    if (action === 'remove') {
      memoryCache[typeKey] = memoryCache[typeKey].filter((item: any) => item.id !== id)
      memoryCache.lastUpdate = Date.now()
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('[v0] API Error:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
