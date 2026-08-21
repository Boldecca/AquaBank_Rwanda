import DashboardShell from '../../../../components/DashboardShell'

export default function DeliveriesPage(){
  const next = JSON.parse(localStorage.getItem('demoNextDelivery')||'null')

  return (
    <DashboardShell>
      <div>
        <h1 className="text-2xl font-bold mb-4">Deliveries</h1>
        <div className="card">
          <h4 className="font-semibold">Request new delivery (demo)</h4>
          <p className="text-sm text-slate-600">Use the Buy Water flow to schedule deliveries or request ad-hoc ones here.</p>
        </div>

        <div className="mt-4 card">
          <h4 className="font-semibold">Upcoming</h4>
          {next ? (
            <div className="mt-2">
              <div>{next.address}</div>
              <div className="text-sm text-slate-600">{next.slot} · Driver: {next.driver}</div>
            </div>
          ) : <div className="text-sm text-slate-500">No upcoming deliveries</div>}
        </div>
      </div>
    </DashboardShell>
  )
}
