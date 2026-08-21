'use client'
import Link from 'next/link'

export default function Hero(){
  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <svg className="w-full h-full" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#06202a" />
              <stop offset="100%" stopColor="#0ea5a4" stopOpacity="0.06" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#g)" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-28 text-center">
        <div className="inline-flex items-center gap-3 bg-white/6 rounded-full py-2 px-4 mb-6">
          <span className="text-xl">🌍</span>
          <span className="text-sm">Kigali, Rwanda</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">Store Now, <span className="text-aquablue">Never Run Dry.</span></h1>
        <p className="mt-6 text-slate-200 max-w-2xl mx-auto">AquaBank Rwanda captures, stores, treats and distributes water to help Kigali communities stay resilient through seasonal water shortages.</p>

        <div className="mt-8 flex gap-4 justify-center flex-wrap">
          <Link href="/order" className="btn btn-primary">Get Water</Link>
          <Link href="/contact" className="btn btn-outline">Become a Partner</Link>
        </div>

        <div className="mt-12 flex justify-center">
          <div className="w-[420px] h-[220px] rounded-2xl bg-white/5 backdrop-blur-sm flex items-center justify-center shadow-lg">
            <svg width="220" height="120" viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs></defs>
              <path d="M0 80 C40 20, 180 20, 220 80 L220 120 L0 120 Z" fill="#06b6d4" opacity="0.18" />
              <circle cx="40" cy="35" r="18" fill="#06b6d4" opacity="0.14" />
              <rect x="90" y="30" width="80" height="60" rx="8" fill="#0ea5a4" opacity="0.12" />
            </svg>
          </div>
        </div>

        <div className="pointer-events-none mt-6">
          <div className="ripple" aria-hidden />
        </div>
      </div>
    </header>
  )
}
