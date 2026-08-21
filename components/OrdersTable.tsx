"use client"
import { useState, useEffect } from 'react'
import { MockService, Order } from './MockService'

const sample: Order[] = []

export default function OrdersTable(){
  const [orders,setOrders] = useState<Order[]>(sample)
  const [filter,setFilter] = useState('All')

  useEffect(()=>{
    setOrders(MockService.getOrders())
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
