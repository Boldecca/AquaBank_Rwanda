'use client'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line } from 'recharts'

const revenue = [
  {month:'Jan', rev:2000000}, {month:'Feb', rev:2500000}, {month:'Mar', rev:3000000}, {month:'Apr', rev:2800000}, {month:'May', rev:3200000}
]

const captured = [
  {month:'Jan', L:40000},{month:'Feb', L:45000},{month:'Mar', L:52000},{month:'Apr', L:50000},{month:'May', L:58000}
]

export default function AdminAnalytics(){
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="card">
        <h4 className="font-semibold mb-3">Revenue (demo)</h4>
        <div style={{width:'100%', height:200}}>
          <ResponsiveContainer>
            <AreaChart data={revenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="rev" stroke="#06b6d4" fill="#06b6d4" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <h4 className="font-semibold mb-3">Water captured (demo)</h4>
        <div style={{width:'100%', height:200}}>
          <ResponsiveContainer>
            <LineChart data={captured}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="L" stroke="#0ea5a4" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
