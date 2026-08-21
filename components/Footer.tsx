'use client'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-10 mt-12">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-6">
        <div>
          <h4 className="text-white font-semibold">AquaBank Rwanda</h4>
          <p className="text-sm mt-2">Store Now, Never Run Dry. Kigali-focused water resilience platform.</p>
        </div>

        <div>
          <h5 className="font-medium">Navigation</h5>
          <ul className="mt-2 text-sm space-y-1">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/how-it-works">How it works</Link></li>
            <li><Link href="/solutions">Solutions</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="font-medium">Solutions</h5>
          <ul className="mt-2 text-sm space-y-1">
            <li><Link href="/pricing">Pricing</Link></li>
            <li><Link href="/impact">Impact</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="font-medium">Contact</h5>
          <p className="text-sm mt-2">Kigali, Rwanda<br/>hello@aquabank.rw</p>
          <div className="mt-3 flex gap-3">
            <a aria-label="twitter" href="#">🐦</a>
            <a aria-label="facebook" href="#">📘</a>
            <a aria-label="linkedin" href="#">🔗</a>
          </div>
        </div>
      </div>
      <div className="mt-6 text-center text-sm text-slate-500">© {new Date().getFullYear()} AquaBank Rwanda · Kigali</div>
    </footer>
  )
}
