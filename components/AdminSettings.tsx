'use client'
import { useState } from 'react'

export default function AdminSettings(){
  const [env,setEnv] = useState({pilotMode:true})
  return (
    <div className="card">
      <h3 className="font-semibold">Settings (demo)</h3>
      <div className="mt-3">
        <label className="flex items-center gap-3">
          <input type="checkbox" checked={env.pilotMode} onChange={()=>setEnv(s=>({pilotMode:!s.pilotMode}))} />
          <span className="text-sm">Enable pilot/demo mode</span>
        </label>
      </div>
    </div>
  )
}
