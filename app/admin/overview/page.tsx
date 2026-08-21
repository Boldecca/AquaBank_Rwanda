'use client'
import AdminStats from '../../../components/AdminStats'
import AdminAnalytics from '../../../components/AdminAnalytics'
import TanksTable from '../../../components/TanksTable'
import AlertsAdmin from '../../../components/AlertsAdmin'
import OrdersTable from '../../../components/OrdersTable'
import WaterQualityAdmin from '../../../components/WaterQualityAdmin'

export default function Page(){
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-3">Admin Overview (demo)</h2>
      <AdminStats />

      <div className="grid md:grid-cols-3 gap-4 mt-4">
        <div className="md:col-span-2">
          <AdminAnalytics />
          <div className="mt-4"><OrdersTable /></div>
        </div>
        <div className="space-y-4">
          <AlertsAdmin />
          <WaterQualityAdmin />
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Tanks</h3>
        <TanksTable />
      </div>
    </div>
  )
}
