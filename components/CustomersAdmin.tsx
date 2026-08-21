 'use client'
import { useState, useEffect } from 'react'
import { MockService } from './MockService'

export default function CustomersAdmin(){
  const [customers,setCustomers] = useState<any[]>([])
  const [q,setQ] = useState('')

  useEffect(()=>{
    setCustomers(MockService.getCustomers())
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
