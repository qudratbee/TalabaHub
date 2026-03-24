'use client'

import { useEffect } from 'react'

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .then(() => console.log('[v0] Service Worker registered'))
        .catch((err) => console.error('[v0] Service Worker registration failed:', err))
    }
  }, [])

  return null
}
