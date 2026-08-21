'use client'
import { useEffect, useState } from 'react'
import { getPayments } from './PaymentEngine'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

export default function AdminPayments(){
  const [payments, setPayments] = useState<any[]>([])
  useEffect(()=>{
    setPayments(getPayments())
  },[])

  const total = payments.reduce((s,p)=>s + (p.amount||0),0)
  const success = payments.filter(p=>p.status==='success').length
  const pending = payments.filter(p=>p.status==='pending').length
  const failed = payments.filter(p=>p.status==='failed').length

  const chartData = payments.slice(0,8).map(p=> ({name: new Date(p.date).toLocaleDateString(), amount: p.amount}))

  return (
    <div>
      <div className="grid md:grid-cols-4 gap-4 mb-4">
        <div className="p-3 bg-white rounded shadow-sm"><div className="text-sm text-slate-500">Total payments</div><div className="font-semibold">{payments.length}</div></div>
        <div className="p-3 bg-white rounded shadow-sm"><div className="text-sm text-slate-500">Successful</div><div className="font-semibold">{success}</div></div>
        <div className="p-3 bg-white rounded shadow-sm"><div className="text-sm text-slate-500">Pending</div><div className="font-semibold">{pending}</div></div>
        <div className="p-3 bg-white rounded shadow-sm"><div className="text-sm text-slate-500">Failed</div><div className="font-semibold">{failed}</div></div>
      </div>

      <div className="card mb-4">
        <h4 className="font-semibold mb-3">Revenue (demo)</h4>
        <div style={{width:'100%', height:200}}>
          <ResponsiveContainer>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area dataKey="amount" stroke="#06b6d4" fill="#06b6d4" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded p-4 shadow-sm">
        <div className="text-sm text-slate-500 mb-2">Payments (demo)</div>
        <table className="w-full text-sm">
          <thead className="text-slate-500 text-left"><tr><th>Txn</th><th>Date</th><th>Amount</th><th>Method</th><th>Status</th><th>Order</th></tr></thead>
          <tbody>
            {payments.map(p=> (
              <tr key={p.id} className="border-t"><td className="py-2">{p.id}</td><td>{new Date(p.date).toLocaleString()}</td><td>{p.amount} RWF</td><td>{p.method}</td><td>{p.status}</td><td>{p.orderId}</td></tr>
            ))}
            {payments.length===0 && (<tr><td colSpan={6} className="py-4 text-center text-slate-500">No demo payments yet</td></tr>)}
          </tbody>
        </table>
      </div>
    </div>
  )
}
