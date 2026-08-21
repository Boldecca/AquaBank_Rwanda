'use client'
import { useState, useEffect } from 'react'

const sample = [
  {id:'ORD-1001', customer:'Alice', qty:500, location:'Remera', payment:'Paid', delivery:'Delivered', date:'2026-08-01', status:'Delivered'},
  {id:'ORD-1002', customer:'Bob', qty:1000, location:'Kicukiro', payment:'Pending', delivery:'Scheduled', date:'2026-08-10', status:'Processing'},
  {id:'ORD-1003', customer:'Cecile', qty:300, location:'Gacuriro', payment:'Paid', delivery:'Delivered', date:'2026-08-14', status:'Cancelled'}
]

export default function OrdersTable(){
  const [orders,setOrders] = useState(sample)
  const [filter,setFilter] = useState('All')

  useEffect(()=>{
    const stored = localStorage.getItem('demoOrders')
    if(stored) setOrders(JSON.parse(stored))
  },[])

  const filtered = orders.filter(o=> filter==='All' ? true : o.status===filter)

  return (
    <div className="bg-white rounded p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm text-slate-500">Orders (demo)</div>
        <select value={filter} onChange={e=>setFilter(e.target.value)} className="input w-auto">
          <option>All</option>
          <option>Pending</option>
          <option>Processing</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>
      </div>
      <table className="w-full text-sm">
        <thead className="text-slate-500 text-left">
          <tr><th>Order</th><th>Customer</th><th>Qty</th><th>Location</th><th>Payment</th><th>Delivery</th><th>Date</th><th>Status</th></tr>
        </thead>
        <tbody>
          {filtered.map(o=> (
            <tr key={o.id} className="border-t">
              <td className="py-2">{o.id}</td>
              <td>{o.customer}</td>
              <td>{o.qty} L</td>
              <td>{o.location}</td>
              <td>{o.payment}</td>
              <td>{o.delivery}</td>
              <td>{o.date}</td>
              <td>{o.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
