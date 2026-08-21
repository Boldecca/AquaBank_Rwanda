'use client'
import { useState, useEffect } from 'react'

export default function WaterQuality(){
  const [q, setQ] = useState({when:'2026-08-12', status: 'Pass', turbidity: '0.5 NTU', pH: '7.2', chlorine: '0.2 mg/L'})

  useEffect(()=>{
    const stored = localStorage.getItem('demoQuality')
    if(stored) setQ(JSON.parse(stored))
  },[])

  return (
    <div>
      <div className="text-sm text-slate-500">Last test: {q.when} — <strong>{q.status}</strong></div>
      <div className="mt-3 grid grid-cols-3 gap-3">
        <div className="bg-slate-50 p-3 rounded">
          <div className="text-xs text-slate-500">Turbidity</div>
          <div className="font-semibold">{q.turbidity}</div>
        </div>
        <div className="bg-slate-50 p-3 rounded">
          <div className="text-xs text-slate-500">pH</div>
          <div className="font-semibold">{q.pH}</div>
        </div>
        <div className="bg-slate-50 p-3 rounded">
          <div className="text-xs text-slate-500">Chlorine</div>
          <div className="font-semibold">{q.chlorine}</div>
        </div>
      </div>
      <div className="mt-3 text-xs text-slate-500">Values are demo/sample data for the prototype.</div>
    </div>
  )
}
