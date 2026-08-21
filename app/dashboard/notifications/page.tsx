"use client"
import { useEffect, useState } from 'react'
import DashboardShell from '../../../../components/DashboardShell'
import { MockService } from '../../../../components/MockService'

export default function NotificationsPage(){
  const [notes,setNotes] = useState<any[]>([])

  useEffect(()=>{
    setNotes(MockService.getNotifs())
  },[])

  return (
    <DashboardShell>
      <div>
        <h1 className="text-2xl font-bold mb-4">Notifications</h1>
        <div className="card">
          {notes.length === 0 ? (
            <div className="text-sm text-slate-600">No notifications (demo).</div>
          ) : (
            notes.map((n:any, i:number)=> (
              <div key={i} className="border-b border-slate-100 py-2">{n.text}</div>
            ))
          )}
        </div>
      </div>
    </DashboardShell>
  )
}
