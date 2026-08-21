'use client'
import { useState, useEffect } from 'react'

const sample = [
  {id:'DEL-2001', customer:'Alice', address:'Remera', qty:500, driver:'Jean', slot:'2026-08-20 09:00-11:00', status:'Scheduled'},
  {id:'DEL-2002', customer:'Bob', address:'Kicukiro', qty:1000, driver:'Paul', slot:'2026-08-19 14:00-16:00', status:'Delivered'}
]

export default function DeliveriesAdmin(){
  const [dels,setDels] = useState(sample)

  useEffect(()=>{
    const stored = localStorage.getItem('demoDeliveries')
    if(stored) setDels(JSON.parse(stored))
  },[])

  return (
    <div className="bg-white rounded p-4 shadow-sm">
      <div className="text-sm text-slate-500 mb-3">Deliveries (demo)</div>
      <div className="space-y-3">
        {dels.map(d=> (
          <div key={d.id} className="border p-3 rounded">
            <div className="flex justify-between">
              <div><strong>{d.id}</strong> · {d.customer}</div>
              <div className="text-sm">{d.status}</div>
            </div>
            <div className="text-sm text-slate-600">{d.address} · {d.qty} L · {d.slot} · Driver: {d.driver}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 text-sm text-slate-500">Map placeholder: integrate map service in production.</div>
    </div>
  )
}
