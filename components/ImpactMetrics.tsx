'use client'

const METRICS = [
  {label: 'Water captured (L)', value: '50,000+'},
  {label: 'Water distributed (L)', value: '40,000+'},
  {label: 'Customers (pilot target)', value: '500'},
  {label: 'Businesses supported', value: '50+'}
]

export default function ImpactMetrics(){
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
      {METRICS.map(m=> (
        <div key={m.label} className="card text-center">
          <div className="text-2xl font-bold text-aquablue">{m.value}</div>
          <div className="text-sm text-slate-600 mt-2">{m.label}</div>
        </div>
      ))}
    </div>
  )
}
