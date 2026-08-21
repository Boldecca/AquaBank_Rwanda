'use client'
import { useState, useEffect } from 'react'
import { MockService, Order } from './MockService'

export default function RecentOrders(){
  const [orders,setOrders] = useState<Order[]>([])

  useEffect(()=>{
    setOrders(MockService.getOrders())
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
            <div className="font-semibold">{o.amount ?? '-'} RWF</div>
            <div className="text-xs text-slate-500">{o.status ?? '-'}</div>
          </div>
        </div>
      ))}
      {orders.length===0 && (<div className="text-center text-slate-500 py-6">No orders yet (demo)</div>)}
    </div>
  )
}
