import type { User, Housing, Job, Material } from "./types"

const KEYS = {
  user: "talabahub_user",
  housing: "talabahub_housing",
  jobs: "talabahub_jobs",
  materials: "talabahub_materials",
}

// Request caching to avoid too many API calls
const cache: { [key: string]: { data: any; time: number } } = {}
const CACHE_DURATION = 15000 // 15 seconds

// --- User (local only) ---
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

// Check if cache is still valid
function isCacheValid(key: string): boolean {
  if (!cache[key]) return false
  return Date.now() - cache[key].time < CACHE_DURATION
}

// --- Housing ---
export async function getHousingList(): Promise<Housing[]> {
  // Return cached data if valid
  if (isCacheValid("housing")) {
    return cache["housing"].data
  }

  try {
    const response = await fetch("/api/storage?type=housing", { 
      cache: 'no-store',
      signal: AbortSignal.timeout(5000)
    })
    const data = await response.json()
    
    // Store in memory cache
    cache["housing"] = { data, time: Date.now() }
    
    // Save to localStorage as backup
    if (typeof window !== "undefined") {
      localStorage.setItem(KEYS.housing, JSON.stringify(data))
    }
    return data
  } catch (error) {
    console.error("[v0] Failed to fetch housing:", error)
    // Fallback to localStorage
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem(KEYS.housing)
      return cached ? JSON.parse(cached) : []
    }
    return []
  }
}

export async function addHousing(item: Omit<Housing, "id" | "createdAt">): Promise<Housing> {
  try {
    const response = await fetch("/api/storage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "housing", action: "add", item }),
      signal: AbortSignal.timeout(5000)
    })
    const newItem = await response.json()
    delete cache["housing"] // Invalidate cache
    const list = await getHousingList()
    if (typeof window !== "undefined") {
      localStorage.setItem(KEYS.housing, JSON.stringify(list))
    }
    return newItem
  } catch (error) {
    console.error("[v0] Failed to add housing:", error)
    throw error
  }
}

export async function removeHousing(id: string): Promise<void> {
  try {
    await fetch("/api/storage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "housing", action: "remove", id }),
      signal: AbortSignal.timeout(5000)
    })
    delete cache["housing"] // Invalidate cache
    const list = await getHousingList()
    if (typeof window !== "undefined") {
      localStorage.setItem(KEYS.housing, JSON.stringify(list))
    }
  } catch (error) {
    console.error("[v0] Failed to remove housing:", error)
    throw error
  }
}

// --- Jobs ---
export async function getJobsList(): Promise<Job[]> {
  if (isCacheValid("jobs")) {
    return cache["jobs"].data
  }

  try {
    const response = await fetch("/api/storage?type=jobs", { 
      cache: 'no-store',
      signal: AbortSignal.timeout(5000)
    })
    const data = await response.json()
    cache["jobs"] = { data, time: Date.now() }
    
    if (typeof window !== "undefined") {
      localStorage.setItem(KEYS.jobs, JSON.stringify(data))
    }
    return data
  } catch (error) {
    console.error("[v0] Failed to fetch jobs:", error)
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem(KEYS.jobs)
      return cached ? JSON.parse(cached) : []
    }
    return []
  }
}

export async function addJob(item: Omit<Job, "id" | "createdAt">): Promise<Job> {
  try {
    const response = await fetch("/api/storage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "jobs", action: "add", item }),
      signal: AbortSignal.timeout(5000)
    })
    const newItem = await response.json()
    delete cache["jobs"] // Invalidate cache
    const list = await getJobsList()
    if (typeof window !== "undefined") {
      localStorage.setItem(KEYS.jobs, JSON.stringify(list))
    }
    return newItem
  } catch (error) {
    console.error("[v0] Failed to add job:", error)
    throw error
  }
}

export async function removeJob(id: string): Promise<void> {
  try {
    await fetch("/api/storage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "jobs", action: "remove", id }),
      signal: AbortSignal.timeout(5000)
    })
    delete cache["jobs"] // Invalidate cache
    const list = await getJobsList()
    if (typeof window !== "undefined") {
      localStorage.setItem(KEYS.jobs, JSON.stringify(list))
    }
  } catch (error) {
    console.error("[v0] Failed to remove job:", error)
    throw error
  }
}

// --- Materials ---
export async function getMaterialsList(): Promise<Material[]> {
  if (isCacheValid("materials")) {
    return cache["materials"].data
  }

  try {
    const response = await fetch("/api/storage?type=materials", { 
      cache: 'no-store',
      signal: AbortSignal.timeout(5000)
    })
    const data = await response.json()
    cache["materials"] = { data, time: Date.now() }
    
    if (typeof window !== "undefined") {
      localStorage.setItem(KEYS.materials, JSON.stringify(data))
    }
    return data
  } catch (error) {
    console.error("[v0] Failed to fetch materials:", error)
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem(KEYS.materials)
      return cached ? JSON.parse(cached) : []
    }
    return []
  }
}

export async function addMaterial(item: Omit<Material, "id" | "createdAt">): Promise<Material> {
  try {
    const response = await fetch("/api/storage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "materials", action: "add", item }),
      signal: AbortSignal.timeout(5000)
    })
    const newItem = await response.json()
    delete cache["materials"] // Invalidate cache
    const list = await getMaterialsList()
    if (typeof window !== "undefined") {
      localStorage.setItem(KEYS.materials, JSON.stringify(list))
    }
    return newItem
  } catch (error) {
    console.error("[v0] Failed to add material:", error)
    throw error
  }
}

export async function removeMaterial(id: string): Promise<void> {
  try {
    await fetch("/api/storage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "materials", action: "remove", id }),
      signal: AbortSignal.timeout(5000)
    })
    delete cache["materials"] // Invalidate cache
    const list = await getMaterialsList()
    if (typeof window !== "undefined") {
      localStorage.setItem(KEYS.materials, JSON.stringify(list))
    }
  } catch (error) {
    console.error("[v0] Failed to remove material:", error)
    throw error
  }
}

// Initialize demo data on app start
export async function seedDemoData() {
  try {
    await fetch("/api/storage?seed=true")
  } catch (error) {
    console.error("[v0] Failed to seed demo data:", error)
  }
}
