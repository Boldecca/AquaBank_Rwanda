'use client'
import { useState } from 'react'

const sample = [
  {id:'B-100', name:'Sunset Restaurant', type:'Restaurant', contract:'Active', vol:5000, revenue:200000, schedule:'Mon/Wed/Fri'},
  {id:'B-101', name:'Sparkle Laundromat', type:'Laundromat', contract:'Pilot', vol:8000, revenue:320000, schedule:'Daily'},
]

export default function BusinessesAdmin(){
  const [items] = useState(sample)
  return (
    <div className="bg-white rounded p-4 shadow-sm">
      <table className="w-full text-sm">
        <thead className="text-slate-500 text-left"><tr><th>Business</th><th>Type</th><th>Contract</th><th>Monthly vol</th><th>Monthly rev</th><th>Schedule</th></tr></thead>
        <tbody>
          {items.map(b=> (
            <tr key={b.id} className="border-t"><td className="py-2">{b.name}</td><td>{b.type}</td><td>{b.contract}</td><td>{b.vol} L</td><td>{b.revenue} RWF</td><td>{b.schedule}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
