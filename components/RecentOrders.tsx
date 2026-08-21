'use client'
import { useState, useEffect } from 'react'

const sample = [
  {id: 'ORD-1001', date: '2026-08-01', qty: 500, amount: 80, status: 'Delivered'},
  {id: 'ORD-1002', date: '2026-08-10', qty: 1000, amount: 150, status: 'Scheduled'},
  {id: 'ORD-1003', date: '2026-08-14', qty: 300, amount: 50, status: 'Delivered'}
]

export default function RecentOrders(){
  const [orders,setOrders] = useState(sample)

  useEffect(()=>{
    const stored = localStorage.getItem('demoOrders')
    if(stored) setOrders(JSON.parse(stored))
  },[])

  return (
    <div className="space-y-3">
      {orders.map(o=> (
        <div key={o.id} className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium">{o.id}</div>
            <div className="text-xs text-slate-500">{o.date} · {o.qty} L</div>
          </div>
          <div className="text-right">
            <div className="font-semibold">{o.amount} RWF</div>
            <div className="text-xs text-slate-500">{o.status}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
