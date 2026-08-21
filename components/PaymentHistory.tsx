'use client'
import { useEffect, useState } from 'react'
import { getPayments } from './PaymentEngine'

export default function PaymentHistory(){
  const [payments, setPayments] = useState<any[]>([])
  useEffect(()=>{
    setPayments(getPayments())
  },[])

  return (
    <div className="bg-white rounded p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">Payment History</h3>
        <div className="text-xs text-slate-500">Demo transactions only</div>
      </div>
      <table className="w-full text-sm">
        <thead className="text-slate-500 text-left"><tr><th>Txn ID</th><th>Date</th><th>Amount</th><th>Method</th><th>Status</th><th>Order</th></tr></thead>
        <tbody>
          {payments.map((p:any)=> (
            <tr key={p.id} className="border-t"><td className="py-2">{p.id}</td><td>{new Date(p.date).toLocaleString()}</td><td>{p.amount} RWF</td><td>{p.method}</td><td>{p.status}</td><td>{p.orderId}</td></tr>
          ))}
          {payments.length===0 && (<tr><td colSpan={6} className="py-4 text-center text-slate-500">No demo payments yet</td></tr>)}
        </tbody>
      </table>
    </div>
  )
}
