'use client'

const TECH = [
  'Smart meters',
  'Tank monitoring',
  'Mobile payments',
  'Delivery scheduling',
  'Water-quality monitoring',
  'AI analytics'
]

export default function TechGrid(){
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
      {TECH.map(t=> (
        <div key={t} className="card text-center">
          <h4 className="font-semibold">{t}</h4>
        </div>
      ))}
    </div>
  )
}
