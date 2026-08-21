'use client'

const STEPS = [
  'CAPTURE',
  'STORE',
  'FILTER',
  'DISINFECT',
  'TEST',
  'DISTRIBUTE'
]

export default function SolutionSteps(){
  return (
    <div className="grid md:grid-cols-6 gap-4">
      {STEPS.map((s, i)=> (
        <div key={s} className="bg-white/80 rounded-lg p-6 text-center shadow-sm hover:scale-105 transition">
          <div className="text-sm text-slate-500">{String(i+1).padStart(2,'0')}</div>
          <h4 className="mt-2 font-semibold text-aquanavy">{s}</h4>
          <p className="mt-2 text-sm text-slate-600">{getDescription(s)}</p>
        </div>
      ))}
    </div>
  )
}

function getDescription(step:string){
  switch(step){
    case 'CAPTURE': return 'Collect rainwater and permitted surplus water.'
    case 'STORE': return 'Secure, sealed tanks to hold seasonal surplus.'
    case 'FILTER': return 'Multi-stage filtration to remove particulates.'
    case 'DISINFECT': return 'Chlorination or UV treatment as required.'
    case 'TEST': return 'Lab and field tests for safety and compliance.'
    case 'DISTRIBUTE': return 'Kiosks, scheduled trucks and connections.'
    default: return ''
  }
}
