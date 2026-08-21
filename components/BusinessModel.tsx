'use client'

const MODELS = [
  {title:'Pay per litre', desc:'Flexible pricing for one-off purchases.'},
  {title:'Subscriptions', desc:'Monthly packages for households and SMEs.'},
  {title:'B2B contracts', desc:'Volume contracts for institutions and businesses.'},
  {title:'Delivery fees', desc:'Transparent fees based on route and volume.'}
]

export default function BusinessModel(){
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {MODELS.map(m=> (
        <div key={m.title} className="card">
          <h4 className="font-semibold">{m.title}</h4>
          <p className="mt-2 text-sm text-slate-600">{m.desc}</p>
        </div>
      ))}
    </div>
  )
}
