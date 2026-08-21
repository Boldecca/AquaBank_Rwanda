'use client'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

const data = [
  {name:'Mon', litres: 40},
  {name:'Tue', litres: 55},
  {name:'Wed', litres: 30},
  {name:'Thu', litres: 70},
  {name:'Fri', litres: 60},
  {name:'Sat', litres: 45},
  {name:'Sun', litres: 50}
]

export default function UsageChart(){
  return (
    <div style={{width:'100%', height:200}}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="litres" stroke="#06b6d4" strokeWidth={3} dot />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
