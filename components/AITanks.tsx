'use client'
import { useEffect, useState } from 'react'
import { predictDepletion } from './AIEngine'
import { MockService } from './MockService'

export default function AITanks({avgDaily}:{avgDaily?:number}){
  const [tanks,setTanks] = useState<any[]>([])
  const [preds,setPreds] = useState<any[]>([])

  useEffect(()=>{
    const sample = MockService.getTanks()
    setTanks(sample)
  },[])

  useEffect(()=>{
    const res = predictDepletion(tanks, avgDaily || 3000)
    setPreds(res)
  },[tanks, avgDaily])

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold">Tank Depletion Predictions (demo)</h3>
        <div className="text-xs text-slate-500">Estimates only — based on demo averages</div>
      </div>
      <table className="w-full text-sm">
        <thead className="text-slate-500 text-left"><tr><th>Tank</th><th>Level</th><th>Avg/day</th><th>Days left</th><th>Est depletion</th></tr></thead>
        <tbody>
          {preds.map((p:any)=> (
            <tr key={p.id} className="border-t"><td className="py-2">{p.name}</td><td>{p.level.toLocaleString()} L ({p.pct}%)</td><td>{p.avgDailyConsumption} L</td><td>{p.daysLeft}</td><td>{p.estimatedDepletion}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
