'use client'
import { useState } from 'react'

export default function DashboardWater(){
  const [qty,setQty] = useState(500)
  const [delivery,setDelivery] = useState<'collection'|'delivery'>('delivery')
  const [step,setStep] = useState(1)

  const pricePerL = 0.15 // demo RWF per litre

  const subtotal = +(qty * pricePerL).toFixed(2)

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Buy Water</h1>

      {step===1 && (
        <div className="card">
          <label>Quantity (L)</label>
          <input className="input mt-2" type="number" value={qty} onChange={e=>setQty(Number(e.target.value))} />
          <div className="mt-3">
            <label className="mr-3"><input type="radio" checked={delivery==='delivery'} onChange={()=>setDelivery('delivery')} /> Delivery</label>
            <label><input type="radio" checked={delivery==='collection'} onChange={()=>setDelivery('collection')} /> Collection</label>
          </div>
          <div className="mt-4 text-right">
            <button className="btn btn-primary" onClick={()=>setStep(2)}>Continue</button>
          </div>
        </div>
      )}

      {step===2 && (
        <div className="card">
          <h3 className="font-semibold">Order summary</h3>
          <div className="mt-2">Quantity: {qty} L</div>
          <div>Mode: {delivery}</div>
          <div>Subtotal: {subtotal} RWF (demo)</div>
          <div className="mt-4 flex gap-3 justify-end">
            <button className="btn" onClick={()=>setStep(1)}>Back</button>
            <button className="btn btn-primary" onClick={()=>setStep(3)}>Pay (demo)</button>
          </div>
        </div>
      )}

      {step===3 && (
        <div className="card">
          <h3 className="font-semibold">Payment (demo)</h3>
          <p className="text-sm text-slate-600">This is a prototype payment flow. No real payment is processed.</p>
          <div className="mt-4">
            <label>Card number</label>
            <input className="input mt-2" />
            <div className="mt-3 flex gap-3">
              <input className="input" placeholder="MM/YY" />
              <input className="input" placeholder="CVC" />
            </div>
          </div>
          <div className="mt-4 flex gap-3 justify-end">
            <button className="btn" onClick={()=>setStep(2)}>Back</button>
            <button className="btn btn-primary" onClick={()=>{
              const orders = JSON.parse(localStorage.getItem('demoOrders')||'[]')
              const id = 'ORD-'+(1000+orders.length+1)
              orders.unshift({id, date: new Date().toISOString().split('T')[0], qty, amount: subtotal, status:'Scheduled'})
              localStorage.setItem('demoOrders', JSON.stringify(orders))
              localStorage.setItem('demoNextDelivery', JSON.stringify({address:'Your address', slot:'Tomorrow 09:00-11:00', driver:'TBD'}))
              setStep(4)
            }}>Confirm & Pay</button>
          </div>
        </div>
      )}

      {step===4 && (
        <div className="card">
          <h3 className="font-semibold">Success</h3>
          <p className="mt-2">Your order is confirmed (demo). Check Orders for details.</p>
        </div>
      )}
    </div>
  )
}
