'use client'

const METHODS = [
  {title: 'Prepaid kiosk', desc: 'Buy credits and draw water from local kiosks.'},
  {title: 'Scheduled delivery', desc: 'Book tanker deliveries on a schedule.'},
  {title: 'Smart-metered connection', desc: 'Connected meters for real-time usage billing.'}
]

export default function HowGetWater(){
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {METHODS.map(m=> (
        <div key={m.title} className="card">
          <h4 className="font-semibold">{m.title}</h4>
          <p className="text-sm mt-2 text-slate-600">{m.desc}</p>
        </div>
      ))}
    </div>
  )
}
