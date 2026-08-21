'use client'
import Link from 'next/link'

export default function QuickActions(){
  return (
    <div className="card">
      <h3 className="font-semibold">Quick Actions</h3>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <Link href="/dashboard/water" className="btn btn-primary">Buy Water</Link>
        <Link href="/dashboard/deliveries" className="btn">Request Delivery</Link>
        <Link href="/dashboard/subscription" className="btn">Subscribe</Link>
        <Link href="/dashboard/orders" className="btn btn-ghost">View Orders</Link>
      </div>
    </div>
  )
}
