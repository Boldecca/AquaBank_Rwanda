'use client'
import Link from 'next/link'

export default function Page(){
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-3">AI Intelligence (demo)</h2>
      <p className="text-sm text-slate-500 mb-4">Prototype AI tools using demo data. Not connected to live AI services.</p>
      <div className="grid md:grid-cols-3 gap-3">
        <Link href="/admin/ai/demand" className="card p-4 hover:shadow">Water Demand Forecasting</Link>
        <Link href="/admin/ai/tanks" className="card p-4 hover:shadow">Tank Depletion Prediction</Link>
        <Link href="/admin/ai/deliveries" className="card p-4 hover:shadow">Delivery Optimization</Link>
        <Link href="/admin/ai/insights" className="card p-4 hover:shadow">AI Business Insights & Chat</Link>
      </div>
    </div>
  )
}
