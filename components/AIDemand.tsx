'use client'
import { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { analyzeDemand } from './AIEngine'

export default function AIDemand({ordersProp}:{ordersProp?: any[]}){
  const [orders, setOrders] = useState<any[]>(ordersProp || [])
  const [forecast, setForecast] = useState<any>(null)

  useEffect(()=>{
    try{
      const stored = localStorage.getItem('demoOrders')
      if(stored) setOrders(JSON.parse(stored))
    }catch(e){}
  },[])

  useEffect(()=>{
    const res = analyzeDemand(orders)
    setForecast(res)
  },[orders])

  return (
    <div>
      <div className="card">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">Water Demand Forecast (demo)</h3>
          <div className="text-xs text-slate-500">Prototype forecast — not a production model</div>
        </div>
        {forecast && (
          <div>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="p-3 bg-slate-50 rounded"><div className="text-xs text-slate-500">Expected daily demand</div><div className="text-xl font-semibold">{forecast.expected} L</div></div>
              <div className="p-3 bg-slate-50 rounded"><div className="text-xs text-slate-500">Recommended storage</div><div className="text-xl font-semibold">{forecast.recommendedStorage} L</div></div>
              <div className="p-3 bg-slate-50 rounded"><div className="text-xs text-slate-500">Horizon</div><div className="text-xl font-semibold">14 days</div></div>
            </div>
            <div style={{width:'100%', height:240}}>
              <ResponsiveContainer>
                <LineChart data={forecast.daily}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line dataKey="demand" stroke="#06b6d4" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
