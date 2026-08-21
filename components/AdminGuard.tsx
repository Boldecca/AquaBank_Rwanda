"use client"
import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { MockService } from './MockService'

export default function AdminGuard({children}:{children:ReactNode}){
  const router = useRouter()

  useEffect(()=>{
    const u = MockService.getUser()
    const ok = u && (u.isAdmin || u.email === 'admin@aquabank.rw')
    if(!ok) router.replace('/login')
  },[router])

  return <>{children}</>
}
