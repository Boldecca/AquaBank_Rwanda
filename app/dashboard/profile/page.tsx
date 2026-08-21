import DashboardShell from '../../../../components/DashboardShell'
import { useState, useEffect } from 'react'

export default function ProfilePage(){
  const [profile,setProfile] = useState({name:'Demo User', email: ''})

  useEffect(()=>{
    const d = localStorage.getItem('demoUser')
    if(d) setProfile((p)=> ({...p, email: JSON.parse(d).email}))
  },[])

  return (
    <DashboardShell>
      <div>
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <div className="card">
          <div className="text-sm">Name</div>
          <div className="font-semibold">{profile.name}</div>
          <div className="text-sm mt-3">Email</div>
          <div className="font-semibold">{profile.email || 'demo@aquabank.rw'}</div>
        </div>
      </div>
    </DashboardShell>
  )
}
