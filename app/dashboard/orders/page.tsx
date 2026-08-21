import RecentOrders from '../../../../components/RecentOrders'
import DashboardShell from '../../../../components/DashboardShell'

export default function OrdersPage(){
  return (
    <DashboardShell>
      <div>
        <h1 className="text-2xl font-bold mb-4">Orders</h1>
        <div className="card">
          <RecentOrders />
        </div>
      </div>
    </DashboardShell>
  )
}
