export default function AdminPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card">Orders & Deliveries</div>
        <div className="card">Tanks & Monitoring</div>
        <div className="card">Analytics & Users</div>
      </div>
    </div>
  )
}
