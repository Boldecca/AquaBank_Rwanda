'use client'
import { useState, useEffect } from 'react'
import { processPayment } from './PaymentEngine'
import { MockService } from './MockService'

type Step = 0 | 1 | 2 | 3 | 4 | 5

export default function Checkout(){
  const [step, setStep] = useState<Step>(0)
  const [qty, setQty] = useState<number>(500)
  const [method, setMethod] = useState<'Delivery'|'Kiosk'>('Delivery')
  const [addr, setAddr] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<'Mobile Money'|'Card'|'Cash'>('Mobile Money')
  const [paymentStatus, setPaymentStatus] = useState<any>(null)
  const [amount,setAmount] = useState<number>(0)
  const [orderId,setOrderId] = useState<string | null>(null)

  useEffect(()=>{
    // simple pricing: 0.15 RWF per L for demo
    setAmount(Math.round(qty * 0.15))
  },[qty])

  function next(){ setStep((s)=>Math.min(5, (s+1) as Step)) }
  function prev(){ setStep((s)=>Math.max(0, (s-1) as Step)) }

  async function pay(){
    const details = {customer:{name,phone,addr}, qty, method}
    const rec = await processPayment(paymentMethod, amount, details)
    setPaymentStatus(rec)
    setOrderId(rec.orderId)
    setStep(4) // payment confirmation
    // add demo order record via MockService
    try{
      const o = {id: rec.orderId, qty, date: new Date().toISOString().slice(0,10), location: addr || 'Kiosk', paymentMethod: paymentMethod, status: rec.status === 'success' ? 'Processing' : 'Pending'}
      MockService.addOrder(o)
    }catch(e){console.warn(e)}
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-3">Checkout (demo)</h2>
      <div className="bg-white rounded p-4 shadow-sm">
        <div className="mb-4">
          <div className="text-sm text-slate-500">Step {step+1} of 6</div>
        </div>

        {step===0 && (
          <div>
            <h3 className="font-semibold mb-2">Cart / Water selection</h3>
            <label className="text-sm">Quantity (L)</label>
            <input type="number" className="input" value={qty} onChange={e=>setQty(Number(e.target.value))} />
            <div className="mt-3">
              <label className="text-sm">Fulfilment</label>
              <div className="flex gap-2 mt-2">
                <button className={`btn ${method==='Delivery' ? 'btn-primary':''}`} onClick={()=>setMethod('Delivery')}>Delivery</button>
                <button className={`btn ${method==='Kiosk' ? 'btn-primary':''}`} onClick={()=>setMethod('Kiosk')}>Collect at Kiosk</button>
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-2"><button className="btn" onClick={next}>Continue</button></div>
          </div>
        )}

        {step===1 && (
          <div>
            <h3 className="font-semibold mb-2">Delivery or kiosk collection</h3>
            {method==='Delivery' ? (
              <div>
                <label className="text-sm">Delivery address</label>
                <input className="input" value={addr} onChange={e=>setAddr(e.target.value)} placeholder="Street, Neighborhood, Kigali" />
              </div>
            ) : (
              <div>
                <label className="text-sm">Choose kiosk</label>
                <select className="input" value={addr} onChange={e=>setAddr(e.target.value)}>
                  <option value="Remera Kiosk">Remera Kiosk</option>
                  <option value="Kicukiro Kiosk">Kicukiro Kiosk</option>
                </select>
              </div>
            )}
            <div className="mt-4 flex justify-between"><button className="btn" onClick={prev}>Back</button><button className="btn" onClick={next}>Continue</button></div>
          </div>
        )}

        {step===2 && (
          <div>
            <h3 className="font-semibold mb-2">Customer information</h3>
            <input className="input mb-2" placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} />
            <input className="input mb-2" placeholder="Phone (e.g. 2507...)" value={phone} onChange={e=>setPhone(e.target.value)} />
            <div className="mt-4 flex justify-between"><button className="btn" onClick={prev}>Back</button><button className="btn" onClick={next}>Continue</button></div>
          </div>
        )}

        {step===3 && (
          <div>
            <h3 className="font-semibold mb-2">Payment method</h3>
            <div className="space-y-2 mb-3">
              <label className="flex items-center gap-2"><input type="radio" name="pm" checked={paymentMethod==='Mobile Money'} onChange={()=>setPaymentMethod('Mobile Money')} /> Mobile Money (MTN / Airtel)</label>
              <label className="flex items-center gap-2"><input type="radio" name="pm" checked={paymentMethod==='Card'} onChange={()=>setPaymentMethod('Card')} /> Card (demo)</label>
              <label className="flex items-center gap-2"><input type="radio" name="pm" checked={paymentMethod==='Cash'} onChange={()=>setPaymentMethod('Cash')} /> Cash at kiosk</label>
            </div>
            <div className="mb-3 text-sm text-slate-500">Mobile Money and Card are demo-only — no live gateway connected.</div>
            <div className="mt-4 flex justify-between"><button className="btn" onClick={prev}>Back</button><button className="btn btn-primary" onClick={pay}>Pay {amount} RWF</button></div>
          </div>
        )}

        {step===4 && paymentStatus && (
          <div>
            <h3 className="font-semibold mb-2">Payment confirmation</h3>
            <div className="p-3 bg-slate-50 rounded mb-3">
              <div className="text-sm">Transaction ID: <strong>{paymentStatus.id}</strong></div>
              <div className="text-sm">Status: <strong>{paymentStatus.status}</strong></div>
            </div>
            <div className="mt-4 flex justify-end"><button className="btn btn-primary" onClick={()=>setStep(5)}>View order confirmation</button></div>
          </div>
        )}

        {step===5 && (
          <div>
            <h3 className="font-semibold mb-2">Order confirmation</h3>
            <div className="p-4 bg-slate-50 rounded">
              <div>Order number: <strong>{orderId}</strong></div>
              <div>Quantity: <strong>{qty} L</strong></div>
              <div>Amount: <strong>{amount} RWF</strong></div>
              <div>Method: <strong>{paymentMethod}</strong></div>
              <div>Fulfilment: <strong>{method}</strong></div>
              <div>Estimated delivery/collection: <strong>{method==='Delivery' ? 'Within 24 hours (demo)' : 'Ready at kiosk within 2 hours (demo)'}</strong></div>
            </div>
            <div className="mt-4 flex gap-2">
              <a href="/dashboard/orders" className="btn">View Order</a>
              <a href="/dashboard" className="btn btn-ghost">Return to Dashboard</a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
