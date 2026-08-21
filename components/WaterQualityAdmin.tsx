'use client'
import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

const readings = [
  {date:'2026-08-01', pH:7.1, turbidity:0.6, chlorine:0.2},
  {date:'2026-08-05', pH:7.3, turbidity:0.5, chlorine:0.18},
  {date:'2026-08-10', pH:7.2, turbidity:0.7, chlorine:0.22},
  {date:'2026-08-15', pH:7.0, turbidity:1.5, chlorine:0.05} // abnormal turbidity
]

export default function WaterQualityAdmin(){
  const [data] = useState(readings)
  return (
    <div>
      <div className="bg-white rounded p-4 shadow-sm mb-4">
        <div className="text-sm text-slate-500">Latest tests (demo)</div>
        <div className="grid md:grid-cols-4 gap-4 mt-3">
          <div className="p-3 bg-slate-50 rounded"><div className="text-xs text-slate-500">pH</div><div className="font-semibold">7.2</div></div>
          <div className="p-3 bg-slate-50 rounded"><div className="text-xs text-slate-500">Turbidity (NTU)</div><div className="font-semibold">1.5*</div></div>
          <div className="p-3 bg-slate-50 rounded"><div className="text-xs text-slate-500">Chlorine (mg/L)</div><div className="font-semibold">0.05*</div></div>
          <div className="p-3 bg-slate-50 rounded"><div className="text-xs text-slate-500">Compliance</div><div className="font-semibold text-red-600">Issue</div></div>
        </div>
        <div className="text-xs text-slate-500 mt-2">* Demo values; highlighted where abnormal.</div>
      </div>

      <div className="card">
        <h3 className="font-semibold mb-3">Trends</h3>
        <div style={{width:'100%', height:240}}>
          <ResponsiveContainer>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="turbidity" stroke="#f59e0b" />
              <Line type="monotone" dataKey="pH" stroke="#06b6d4" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
