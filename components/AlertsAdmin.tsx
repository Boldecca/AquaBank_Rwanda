'use client'
import { useState } from 'react'

const sample = [
  {type:'Low tank level', ts:'2026-08-20 09:00', details:'Kicukiro Tank below 10%'},
  {type:'Water-quality issue', ts:'2026-08-15 16:12', details:'High turbidity at Gacuriro'},
  {type:'Delayed delivery', ts:'2026-08-19 12:00', details:'DEL-2003 running late'}
]

export default function AlertsAdmin(){
  const [alerts] = useState(sample)
  return (
    <div className="bg-white rounded p-4 shadow-sm">
      <h4 className="font-semibold mb-3">Alerts (demo)</h4>
      <div className="space-y-2">
        {alerts.map((a,i)=> (
          <div key={i} className="border-l-4 border-red-400 pl-3">
            <div className="font-medium">{a.type}</div>
            <div className="text-sm text-slate-600">{a.details}</div>
            <div className="text-xs text-slate-400">{a.ts}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
