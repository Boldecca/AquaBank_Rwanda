'use client'

const PHASES = [
  {title:'Pilot', desc:'Validate demand, pricing and safety.'},
  {title:'Prove', desc:'Measure KPIs and financial viability.'},
  {title:'Expand', desc:'Scale to new Kigali zones and partners.'}
]

export default function Roadmap(){
  return (
    <div className="flex flex-col md:flex-row gap-4">
      {PHASES.map(p=> (
        <div key={p.title} className="card flex-1 text-center">
          <div className="text-sm text-slate-500">{p.title}</div>
          <h4 className="mt-2 font-semibold">{p.title}</h4>
          <p className="mt-2 text-sm text-slate-600">{p.desc}</p>
        </div>
      ))}
    </div>
  )
}
