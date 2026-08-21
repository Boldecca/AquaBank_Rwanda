'use client'
import Link from 'next/link'
import { useState } from 'react'
import type { ReactNode } from 'react'

export default function AdminShell({children}:{children:ReactNode}){
  const [open,setOpen] = useState(false)
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <header className="site-header">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="md:hidden p-2 rounded" aria-label="Toggle menu" onClick={()=>setOpen(!open)}>☰</button>
            <Link href="/admin" className="brand">AquaBank Admin</Link>
            <nav className="hidden md:flex gap-4 text-sm text-slate-200" aria-label="Admin quick links">
              <Link href="/admin/overview">Overview</Link>
              <Link href="/admin/orders">Orders</Link>
              <Link href="/admin/deliveries">Deliveries</Link>
              <Link href="/admin/tanks">Tanks</Link>
            </nav>
          </div>
          <div className="text-sm text-slate-100">Operations · Demo data</div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 grid md:grid-cols-6 gap-6">
        <aside className="md:col-span-1">
          <nav className="sidebar">
            <Link href="/admin/overview" className="">Overview</Link>
            <Link href="/admin/customers" className="">Customers</Link>
            <Link href="/admin/orders" className="">Orders</Link>
            <Link href="/admin/deliveries" className="">Deliveries</Link>
            <Link href="/admin/tanks" className="">Tanks</Link>
            <Link href="/admin/water-quality" className="">Water Quality</Link>
            <Link href="/admin/kiosks" className="">Kiosks</Link>
            <Link href="/admin/subscriptions" className="">Subscriptions</Link>
            <Link href="/admin/businesses" className="">Businesses</Link>
            <Link href="/admin/payments" className="">Payments</Link>
            <Link href="/admin/analytics" className="">Analytics</Link>
            <Link href="/admin/alerts" className="">Alerts</Link>
            <Link href="/admin/settings" className="">Settings</Link>
          </nav>
        </aside>

        <main className="md:col-span-5">{children}</main>
      </div>
    </div>
  )
}
