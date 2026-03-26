import Image from "next/image"
import { Home, Briefcase, BookOpen, Shield, Truck, Clock } from "lucide-react"

export function LandingHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5">
              <span className="text-xs font-semibold text-primary">Talabalar uchun #1 platforma</span>
            </div>
            <h1 className="text-balance font-serif text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
              O{"'"}qish, yashash va ishlash - barchasi{" "}
              <span className="text-primary">bir joyda</span>
            </h1>
            <p className="mt-5 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
              TalabaHub - ijaraga uylar, ish e{"'"}lonlari va o{"'"}quv materiallarini oson topish uchun yaratilgan platforma.
            </p>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="/images/hero-students.jpg"
                alt="TalabaHub - talabalar guruhi"
                width={600}
                height={400}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-4 -left-4 rounded-xl bg-card p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Home className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">500+</p>
                  <p className="text-xs text-muted-foreground">Ijaraga uylar</p>
                </div>
              </div>
            </div>
            <div className="absolute -right-4 -top-4 rounded-xl bg-card p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <Briefcase className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">200+</p>
                  <p className="text-xs text-muted-foreground">Ish e{"'"}lonlari</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function LandingFeatures() {
  const features = [
    {
      icon: Home,
      title: "Ijaraga uylar",
      description: "Talabalar uchun arzon va qulay kvartiralar. Joylashuv, narx va xonalar soni bo'yicha qidiring.",
    },
    {
      icon: Briefcase,
      title: "Ish e'lonlari",
      description: "Part-time, freelance va to'liq vaqtli ishlar. O'qish bilan birga ishlash imkoniyati.",
    },
    {
      icon: BookOpen,
      title: "O'quv materiallar",
      description: "Konspektlar, darsliklar, video darslar. Bepul va pullik materiallar bir joyda.",
    },
    {
      icon: Shield,
      title: "Ishonchli e'lonlar",
      description: "Barcha e'lonlar tekshirilgan. Xavfsiz va ishonchli platforma.",
    },
    {
      icon: Truck,
      title: "Tez qidiruv",
      description: "Filtrlash va qidiruv tizimi. Kerakli narsani bir daqiqada toping.",
    },
    {
      icon: Clock,
      title: "Yangi e'lonlar",
      description: "Har kuni yangi e'lonlar qo'shiladi. Eng so'nggi imkoniyatlardan xabardor bo'ling.",
    },
  ]

  return (
    <section id="features" className="bg-card py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
            Nima uchun TalabaHub?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-pretty text-muted-foreground">
            Barcha kerakli xizmatlar bitta platformada jamlangan
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-border bg-background p-6 transition-all hover:border-primary/30 hover:shadow-md"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/15">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
