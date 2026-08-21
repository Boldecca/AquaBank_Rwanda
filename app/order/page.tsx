export default function OrderPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-4">Order Water</h1>
      <div className="card">
        <p>This prototype includes a realistic ordering workflow with mock integrations.</p>
        <div className="mt-4">
          <label className="block mb-2">Delivery address</label>
          <input className="input" placeholder="Enter delivery address" />
        </div>
        <div className="mt-4">
          <label className="block mb-2">Volume (litres)</label>
          <input className="input" placeholder="e.g. 500" />
        </div>
        <div className="mt-4 flex gap-3">
          <button className="btn btn-primary">Request Quote</button>
          <button className="btn btn-ghost">Schedule Delivery</button>
        </div>
      </div>
    </div>
  )
}
