'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function AdminShell({children}:{children:React.ReactNode}){
  const [open,setOpen] = useState(false)
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="md:hidden" onClick={()=>setOpen(!open)}>☰</button>
            <Link href="/admin" className="font-semibold">AquaBank Admin</Link>
            <nav className="hidden md:flex gap-4 text-sm text-slate-600">
              <Link href="/admin/overview">Overview</Link>
              <Link href="/admin/orders">Orders</Link>
              <Link href="/admin/deliveries">Deliveries</Link>
              <Link href="/admin/tanks">Tanks</Link>
            </nav>
          </div>
          <div className="text-sm text-slate-600">Operations · Demo data</div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 grid md:grid-cols-6 gap-6">
        <aside className="md:col-span-1">
          <nav className="bg-white rounded-lg p-4 shadow-sm space-y-2">
            <Link href="/admin/overview" className="block">Overview</Link>
            <Link href="/admin/customers" className="block">Customers</Link>
            <Link href="/admin/orders" className="block">Orders</Link>
            <Link href="/admin/deliveries" className="block">Deliveries</Link>
            <Link href="/admin/tanks" className="block">Tanks</Link>
            <Link href="/admin/water-quality" className="block">Water Quality</Link>
            <Link href="/admin/kiosks" className="block">Kiosks</Link>
            <Link href="/admin/subscriptions" className="block">Subscriptions</Link>
            <Link href="/admin/businesses" className="block">Businesses</Link>
            <Link href="/admin/payments" className="block">Payments</Link>
            <Link href="/admin/analytics" className="block">Analytics</Link>
            <Link href="/admin/alerts" className="block">Alerts</Link>
            <Link href="/admin/settings" className="block">Settings</Link>
          </nav>
        </aside>

        <main className="md:col-span-5">{children}</main>
      </div>
    </div>
  )
}
