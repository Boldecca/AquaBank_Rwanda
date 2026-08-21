import DashboardShell from '../../components/DashboardShell'
import WaterBalance from '../../components/WaterBalance'
import QuickActions from '../../components/QuickActions'
import RecentOrders from '../../components/RecentOrders'
import DeliveryOverview from '../../components/DeliveryOverview'
import WaterQuality from '../../components/WaterQuality'
import UsageChart from '../../components/UsageChart'

export default function DashboardPage(){
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <WaterBalance />
            <div className="mt-4 card">
              <h3 className="font-semibold mb-3">Usage</h3>
              <UsageChart />
            </div>
          </div>
          <div>
            <QuickActions />
            <div className="mt-4">
              <DeliveryOverview />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="font-semibold mb-3">Recent Orders</h3>
            <RecentOrders />
          </div>
          <div className="card">
            <h3 className="font-semibold mb-3">Water Quality (sample)</h3>
            <WaterQuality />
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
