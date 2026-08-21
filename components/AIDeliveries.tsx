'use client'
import { useEffect, useState } from 'react'
import { optimizeDeliveries } from './AIEngine'

export default function AIDeliveries(){
  const [deliveries,setDeliveries] = useState<any[]>([])
  const [vehicleCapacity,setVehicleCapacity] = useState<number>(2000)
  const [plan,setPlan] = useState<any>(null)

  useEffect(()=>{
    const stored = localStorage.getItem('demoDeliveries')
    const sample = stored ? JSON.parse(stored) : [
      {id:'DEL-2001', qty:500, address:'Remera', status:'Scheduled'},
      {id:'DEL-2002', qty:1000, address:'Kicukiro', status:'Delivered'},
      {id:'DEL-2003', qty:800, address:'Gacuriro', status:'Scheduled'},
      {id:'DEL-2004', qty:1200, address:'Kigali Central', status:'Scheduled'}
    ]
    setDeliveries(sample)
  },[])

  useEffect(()=>{
    setPlan(optimizeDeliveries(deliveries.filter(d=>d.status!=='Delivered'), vehicleCapacity))
  },[deliveries, vehicleCapacity])

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold">Delivery Optimization (demo)</h3>
        <div className="text-xs text-slate-500">Prototype routing suggestions — no real GPS routing</div>
      </div>
      <div className="mb-3">
        <label className="text-sm">Vehicle capacity (L)</label>
        <input className="input" type="number" value={vehicleCapacity} onChange={e=>setVehicleCapacity(Number(e.target.value))} />
      </div>
      <div className="mb-3 text-sm text-slate-500">Pending deliveries:</div>
      <ul className="mb-3">
        {deliveries.filter(d=>d.status!=='Delivered').map(d=> <li key={d.id} className="py-1">{d.id} — {d.address} — {d.qty} L</li>)}
      </ul>
      {plan && (
        <div>
          <div className="text-sm mb-2">Suggested order (demo): {plan.suggestedOrder.join(' → ')}</div>
          <div className="text-sm text-slate-500">Estimated route distance (pseudo): {plan.estDistance} km</div>
        </div>
      )}
    </div>
  )
}
