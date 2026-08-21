export default function FAQPage(){
  const items = [
    {q:'How do I order water?', a:'Use the Get Water button to request a delivery or visit a kiosk.'},
    {q:'Are water quality checks performed?', a:'Yes — filtration, disinfection and routine testing are part of our process.'},
    {q:'Can businesses get a contract?', a:'Yes — contact us to discuss B2B contracts and pricing.'}
  ]

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-4">FAQ</h1>
      <div className="space-y-4">
        {items.map(it=> (
          <div key={it.q} className="card">
            <h4 className="font-semibold">{it.q}</h4>
            <p className="mt-2 text-slate-700">{it.a}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
