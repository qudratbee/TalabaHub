
import './globals.css'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import ServiceWorkerRegister from '@/components/service-worker-register'
import Head from 'next/head'

const _inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const _playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz">
      <Head>
        <meta name="google-site-verification" content="r8DE_k7ea03quP_grhRp1YmBWIb3AllsdvlNddCM4E4" />
        <title>TalabaHub - Talabalar Uchun Platforma</title>
        <meta name="description" content="Ijaraga uylar, ish e'lonlari va o'quv materiallari - barchasi bir joyda. Talabalar uchun eng qulay platforma." />
        <link rel="icon" href="/icon-light-32x32.png" media="(prefers-color-scheme: light)" />
        <link rel="icon" href="/icon-dark-32x32.png" media="(prefers-color-scheme: dark)" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
      </Head>
      <body className={`${_inter.variable} ${_playfair.variable} font-sans antialiased`}>
        {children}
        <ServiceWorkerRegister />
        <Analytics />
      </body>
    </html>
  )
}