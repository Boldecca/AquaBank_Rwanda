'use client'
import { useEffect, useState } from 'react'

export default function AdminStats(){
  const [stats, setStats] = useState({
    captured: 500000,
    stored: 320000,
    distributed: 180000,
    customers: 1200,
    subscriptions: 300,
    pendingDeliveries: 12,
    revenue: 12500000,
    tankCapacity: 800000,
    qualityStatus: 'Nominal'
  })

  useEffect(()=>{
    // demo: could fetch from API
  },[])

  const items = [
    {label:'Total captured (L)', value: stats.captured},
    {label:'Total stored (L)', value: stats.stored},
    {label:'Total distributed (L)', value: stats.distributed},
    {label:'Active customers', value: stats.customers},
    {label:'Active subscriptions', value: stats.subscriptions},
    {label:'Pending deliveries', value: stats.pendingDeliveries},
    {label:'Revenue (demo RWF)', value: stats.revenue},
    {label:'Tank capacity (L)', value: stats.tankCapacity},
    {label:'Water quality status', value: stats.qualityStatus}
  ]

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {items.map(i=> (
        <div key={i.label} className="bg-white p-4 rounded shadow-sm">
          <div className="text-sm text-slate-500">{i.label}</div>
          <div className="text-xl font-semibold mt-2">{i.value}</div>
        </div>
      ))}
    </div>
  )
}
