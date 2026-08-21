'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function DashboardShell({children}:{children:React.ReactNode}){
  const [open,setOpen] = useState(false)
  const [user,setUser] = useState<{email?:string}|null>(null)

  useEffect(()=>{
    const d = localStorage.getItem('demoUser')
    if(d) setUser(JSON.parse(d))
  },[])

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="md:hidden" onClick={()=>setOpen(!open)}>☰</button>
            <Link href="/dashboard" className="font-semibold">Dashboard</Link>
          </div>
          <div className="text-sm text-slate-600">{user?.email ?? 'Demo user'}</div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 grid md:grid-cols-4 gap-6">
        <aside className={`md:col-span-1 ${open? 'block': 'block'}`}>
          <nav className="bg-white rounded-lg p-4 shadow-sm space-y-2">
            <Link href="/dashboard" className="block">Overview</Link>
            <Link href="/dashboard/water" className="block">Water</Link>
            <Link href="/dashboard/orders" className="block">Orders</Link>
            <Link href="/dashboard/deliveries" className="block">Deliveries</Link>
            <Link href="/dashboard/subscription" className="block">Subscription</Link>
            <Link href="/dashboard/payments" className="block">Payments</Link>
            <Link href="/dashboard/profile" className="block">Profile</Link>
            <Link href="/dashboard/notifications" className="block">Notifications</Link>
          </nav>
        </aside>

        <div className="md:col-span-3">
          {children}
        </div>
      </div>
    </div>
  )
}
