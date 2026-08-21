'use client'
import { useState, useEffect } from 'react'

const sample = [
  {id:'T-01', name:'Remera Tank A', location:'Remera', capacity:200000, level:150000, temp:22.3, updated:'2026-08-20 09:12', status:'Normal'},
  {id:'T-02', name:'Kicukiro Tank', location:'Kicukiro', capacity:150000, level:20000, temp:24.1, updated:'2026-08-20 08:50', status:'Low'},
  {id:'T-03', name:'Gacuriro Reservoir', location:'Gacuriro', capacity:250000, level:2000, temp:23.0, updated:'2026-08-19 18:00', status:'Critical'}
]

export default function TanksTable(){
  const [tanks,setTanks] = useState(sample)

  useEffect(()=>{
    const stored = localStorage.getItem('demoTanks')
    if(stored) setTanks(JSON.parse(stored))
  },[])

  return (
    <div className="bg-white rounded p-4 shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-slate-500">
            <th>Name</th><th>Location</th><th>Capacity</th><th>Level</th><th>% Full</th><th>Temp</th><th>Last update</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tanks.map(t=>{
            const pct = Math.round((t.level / t.capacity) * 100)
            return (
              <tr key={t.id} className="border-t">
                <td className="py-3">{t.name}</td>
                <td>{t.location}</td>
                <td>{t.capacity.toLocaleString()} L</td>
                <td>{t.level.toLocaleString()} L</td>
                <td>
                  <div className="w-24 bg-slate-100 rounded h-3 overflow-hidden">
                    <div style={{width:`${pct}%`}} className={`h-3 ${pct<20? 'bg-red-500': pct<50? 'bg-yellow-400':'bg-teal-500'}`}></div>
                  </div>
                </td>
                <td>{t.temp} °C</td>
                <td>{t.updated}</td>
                <td>{t.status}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
