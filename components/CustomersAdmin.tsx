'use client'
import { useState, useEffect } from 'react'

const sample = [
  {id:'C-001', name:'Alice', type:'Household', location:'Remera', usage:1200, subscription:'Basic', status:'Active', lastOrder:'2026-08-01'},
  {id:'C-002', name:'Bob', type:'Restaurant', location:'Kicukiro', usage:5000, subscription:'Business', status:'Active', lastOrder:'2026-08-10'},
  {id:'C-003', name:'Cecile', type:'School', location:'Gacuriro', usage:8000, subscription:'Contract', status:'Inactive', lastOrder:'2026-06-20'}
]

export default function CustomersAdmin(){
  const [customers,setCustomers] = useState(sample)
  const [q,setQ] = useState('')

  useEffect(()=>{
    const stored = localStorage.getItem('demoCustomers')
    if(stored) setCustomers(JSON.parse(stored))
  },[])

  const filtered = customers.filter(c=> c.name.toLowerCase().includes(q.toLowerCase()) || c.location.toLowerCase().includes(q.toLowerCase()))

  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        <input className="input" placeholder="Search name or location" value={q} onChange={e=>setQ(e.target.value)} />
      </div>
      <div className="bg-white rounded p-4 shadow-sm">
        <table className="w-full text-sm">
          <thead className="text-slate-500 text-left"><tr><th>Name</th><th>Type</th><th>Location</th><th>Usage</th><th>Subscription</th><th>Status</th><th>Last order</th></tr></thead>
          <tbody>
            {filtered.map(c=> (
              <tr key={c.id} className="border-t"><td className="py-2">{c.name}</td><td>{c.type}</td><td>{c.location}</td><td>{c.usage} L</td><td>{c.subscription}</td><td>{c.status}</td><td>{c.lastOrder}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
