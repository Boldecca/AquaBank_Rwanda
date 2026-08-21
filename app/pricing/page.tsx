export default function PricingPage(){
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-4">Pricing</h1>
      <p className="text-slate-700">Pricing is illustrative in this prototype. Final pricing will be set during pilot and regulatory review.</p>
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <div className="card">
          <h4 className="font-semibold">Pay-as-you-go</h4>
          <p className="mt-2 text-sm">Pay per litre at kiosks or deliveries.</p>
        </div>
        <div className="card">
          <h4 className="font-semibold">Household Plan</h4>
          <p className="mt-2 text-sm">Monthly package for predictable supply.</p>
        </div>
        <div className="card">
          <h4 className="font-semibold">Business Plan</h4>
          <p className="mt-2 text-sm">Volume-based contracts for institutions.</p>
        </div>
      </div>
    </div>
  )
}
