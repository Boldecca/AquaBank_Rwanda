'use client'
import { useState } from 'react'

const sample = [
  {id:'K-01', name:'Remera Kiosk', location:'Remera', status:'Online', pricePerL:'0.15 RWF'},
  {id:'K-02', name:'Kicukiro Kiosk', location:'Kicukiro', status:'Offline', pricePerL:'0.15 RWF'}
]

export default function KiosksAdmin(){
  const [kiosks] = useState(sample)
  return (
    <div className="bg-white rounded p-4 shadow-sm">
      <h4 className="font-semibold mb-3">Kiosks (demo)</h4>
      <div className="space-y-2">
        {kiosks.map(k=> (
          <div key={k.id} className="flex justify-between items-center border p-2 rounded">
            <div>
              <div className="font-medium">{k.name}</div>
              <div className="text-xs text-slate-500">{k.location}</div>
            </div>
            <div className="text-sm">{k.status}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
