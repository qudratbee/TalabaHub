import { GraduationCap } from "lucide-react"
import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <GraduationCap className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">TalabaHub</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Talabalar uchun eng qulay platforma. Ijaraga uylar, ish e{"'"}lonlari va o{"'"}quv materiallari - barchasi bir joyda.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Sahifalar</h4>
            <ul className="flex flex-col gap-2">
              <li><Link href="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Bosh sahifa</Link></li>
              <li><Link href="/student" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Talaba paneli</Link></li>
              <li><Link href="/provider" className="text-sm text-muted-foreground transition-colors hover:text-foreground">E{"'"}lon berish</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Aloqa</h4>
            <ul className="flex flex-col gap-2">
              <li className="text-sm text-muted-foreground">ilhamovqudratjon783@gmail.com</li>
              <li className="text-sm text-muted-foreground">+998 94 904 14 15</li>
              <li className="text-sm text-muted-foreground">Namangan, O{"'"}zbekiston</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            2026 TalabaHub. Barcha huquqlar himoyalangan.
          </p>
        </div>
      </div>
    </footer>
  )
}
