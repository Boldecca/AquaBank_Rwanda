"use client"
import { useEffect, useState } from 'react'
import DashboardShell from '../../../../components/DashboardShell'
import { MockService } from '../../../../components/MockService'

export default function PaymentsPage(){
  const [payments, setPayments] = useState<any[]>([])

  useEffect(()=>{
    setPayments(MockService.getPayments())
  },[])

  return (
    <DashboardShell>
      <div>
        <h1 className="text-2xl font-bold mb-4">Payments</h1>
        <div className="card">
          {payments.length === 0 ? (
            <div className="text-sm text-slate-600">No payments yet (demo).</div>
          ) : (
            payments.map((p:any)=> (
              <div key={p.id} className="flex items-center justify-between">
                <div>{p.date}</div>
                <div>{p.amount} RWF</div>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardShell>
  )
}
