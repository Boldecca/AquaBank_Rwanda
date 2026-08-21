'use client'
import AdminPayments from '../../../components/AdminPayments'

export default function Page(){
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-3">Payments (demo)</h2>
      <AdminPayments />
    </div>
  )
}
