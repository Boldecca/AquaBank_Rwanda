'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="site-header">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="brand" aria-label="AquaBank Rwanda home">
          <div className="logo" aria-hidden>💧</div>
          <div className="title"><span className="block">AquaBank</span><small className="text-sm text-slate-200">Rwanda</small></div>
        </Link>

        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          <Link href="/" className="text-slate-100 hover:text-white">Home</Link>
          <Link href="/order" className="text-slate-100 hover:text-white">Order</Link>
          <Link href="/dashboard" className="text-slate-100 hover:text-white">Dashboard</Link>
          <Link href="/monitoring" className="text-slate-100 hover:text-white">Monitoring</Link>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <Link href="/login" className="btn btn-secondary">Sign in</Link>
          </div>
          <button className="md:hidden p-2 rounded focus:ring" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="md:hidden bg-white/5 backdrop-blur-sm px-6 py-4">
          <Link href="/order" className="block py-2">Order</Link>
          <Link href="/dashboard" className="block py-2">Dashboard</Link>
          <Link href="/monitoring" className="block py-2">Monitoring</Link>
        </div>
      )}
    </header>
  )
}
