'use client'
const SERVE = [
  { title: 'Households', emoji: '🏠' },
  { title: 'Salons', emoji: '💇' },
  { title: 'Restaurants', emoji: '🍽️' },
  { title: 'Laundromats', emoji: '🧺' },
  { title: 'Schools', emoji: '🏫' },
  { title: 'Apartments', emoji: '🏢' },
  { title: 'Businesses', emoji: '🏭' }
]

export default function WhoWeServe(){
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
      {SERVE.map(s=> (
        <div key={s.title} className="card text-center">
          <div className="text-3xl">{s.emoji}</div>
          <h4 className="mt-3 font-semibold">{s.title}</h4>
        </div>
      ))}
    </div>
  )
}
