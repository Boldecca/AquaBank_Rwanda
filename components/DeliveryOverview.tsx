"use client"
import { useState, useEffect } from 'react'
import { MockService } from './MockService'

export default function DeliveryOverview(){
  const [nextDelivery, setNextDelivery] = useState<{address:string;slot:string;driver:string}|null>({address:'Kigali, Remera', slot:'2026-08-20 09:00-11:00', driver:'Not assigned'})

  useEffect(()=>{
    const d = MockService.getNextDelivery()
    if(d) setNextDelivery(d)
  },[])

  if(!nextDelivery) return null

  return (
    <div className="card">
      <h4 className="font-semibold">Upcoming delivery</h4>
      <div className="mt-2 text-sm text-slate-600">{nextDelivery.address}</div>
      <div className="mt-1 text-sm">Time slot: <strong>{nextDelivery.slot}</strong></div>
      <div className="mt-1 text-sm">Driver: <strong>{nextDelivery.driver}</strong></div>
    </div>
  )
}
