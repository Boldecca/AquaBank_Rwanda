'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <nav className="bg-aquanavy text-white">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 text-lg font-semibold">
          <div className="rounded-full bg-white/10 p-2">💧</div>
          <span>AquaBank <span className="text-sm text-slate-200">Rwanda</span></span>
        </Link>
        <div className="hidden md:flex items-center gap-4">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/order" className="hover:underline">Order</Link>
          <Link href="/dashboard" className="hover:underline">Dashboard</Link>
          <Link href="/monitoring" className="hover:underline">Monitoring</Link>
        </div>
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)} aria-label="menu">☰</button>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-aquanavy/95 px-6 py-4">
          <Link href="/order" className="block py-2">Order</Link>
          <Link href="/dashboard" className="block py-2">Dashboard</Link>
          <Link href="/monitoring" className="block py-2">Monitoring</Link>
        </div>
      )}
    </nav>
  )
}
