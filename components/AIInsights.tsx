'use client'
import { useEffect, useState } from 'react'
import { generateInsights, chatResponse } from './AIEngine'
import { MockService } from './MockService'

export default function AIInsights(){
  const [insights, setInsights] = useState<string[]>([])
  const [customers,setCustomers] = useState<any[]>([])
  const [tanks,setTanks] = useState<any[]>([])
  const [orders,setOrders] = useState<any[]>([])
  const [deliveries,setDeliveries] = useState<any[]>([])

  useEffect(()=>{
    try{
      setCustomers(MockService.getCustomers())
      setTanks(MockService.getTanks())
      setOrders(MockService.getOrders())
      setDeliveries(MockService.getDeliveries())
    }catch(e){}
  },[])

  function run(){
    const res = generateInsights({customers,tanks,deliveries,orders})
    setInsights(res)
  }

  return (
    <div>
      <div className="card mb-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">AI Business Insights (demo)</h3>
          <div className="text-xs text-slate-500">Prototype insights generated from demo data</div>
        </div>
        <div className="mb-3">
          <button className="btn" onClick={run}>Generate insights</button>
        </div>
        <div className="space-y-2">
          {insights.map((s,i)=> <div key={i} className="p-2 border rounded bg-slate-50">{s}</div>)}
        </div>
      </div>

      <div className="card">
        <h4 className="font-semibold mb-2">AI Assistant (chat) — demo</h4>
        <p className="text-xs text-slate-500 mb-2">Ask the demo assistant about demo data (no external AI connected).</p>
        <AIChatInline customers={customers} tanks={tanks} orders={orders} deliveries={deliveries} />
      </div>
    </div>
  )
}

function AIChatInline({customers,tanks,orders,deliveries}:{customers:any[],tanks:any[],orders:any[],deliveries:any[]}){
  const [q,setQ] = useState('')
  const [resp,setResp] = useState('')

  function ask(){
    const r = chatResponse(q, {customers,tanks,orders,deliveries})
    setResp(r)
  }

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <input className="input" value={q} onChange={e=>setQ(e.target.value)} placeholder="Ask something like: How much water is available?" />
        <button className="btn" onClick={ask}>Ask</button>
      </div>
      <div className="p-3 bg-slate-50 rounded text-sm">{resp}</div>
    </div>
  )
}
