"use client"
import DashboardShell from '../../../../components/DashboardShell'
import { useState } from 'react'
import { MockService } from '../../../../components/MockService'

const PLANS = [
  {id:'basic',name:'Household Basic', price:'Demo RWF 5,000/mo', desc:'Essential monthly package.'},
  {id:'plus',name:'Household Plus', price:'Demo RWF 9,000/mo', desc:'Higher allowance and discounts.'},
  {id:'family',name:'Household Family', price:'Demo RWF 15,000/mo', desc:'For larger households.'}
]

export default function SubscriptionPage(){
  const [active,setActive] = useState<string | null>(MockService.getSubscription())

  const subscribe = (id:string)=>{
    MockService.saveSubscription(id)
    setActive(id)
  }

  const cancel = ()=>{
    MockService.saveSubscription(null)
    setActive(null)
  }

  return (
    <DashboardShell>
      <div>
        <h1 className="text-2xl font-bold mb-4">Subscription</h1>
        <div className="grid md:grid-cols-3 gap-4">
          {PLANS.map(p=> (
            <div key={p.id} className="card">
              <div className="font-semibold">{p.name}</div>
              <div className="text-sm text-slate-600">{p.price}</div>
              <div className="mt-3 text-sm">{p.desc}</div>
              <div className="mt-4">
                {active===p.id ? (
                  <button className="btn" onClick={cancel}>Cancel</button>
                ) : (
                  <button className="btn btn-primary" onClick={()=>subscribe(p.id)}>Select (demo)</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  )
}
