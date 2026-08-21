'use client'
import { useEffect, useState } from 'react'

export default function WaterBalance(){
  const [data,setData] = useState({credit: 1200, purchased: 1500, used: 300})

  useEffect(()=>{
    const stored = localStorage.getItem('demoBalance')
    if(stored) setData(JSON.parse(stored))
  },[])

  const remaining = data.purchased - data.used

  return (
    <div className="card">
      <h3 className="font-semibold">Water Balance</h3>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <div className="text-sm text-slate-500">Current credits (RWF)</div>
          <div className="text-lg font-bold">{data.credit}</div>
        </div>
        <div>
          <div className="text-sm text-slate-500">Litres purchased</div>
          <div className="text-lg font-bold">{data.purchased} L</div>
        </div>
        <div>
          <div className="text-sm text-slate-500">Litres used</div>
          <div className="text-lg font-bold">{data.used} L</div>
        </div>
        <div>
          <div className="text-sm text-slate-500">Estimated remaining</div>
          <div className="text-lg font-bold">{remaining} L</div>
        </div>
      </div>
    </div>
  )
}
