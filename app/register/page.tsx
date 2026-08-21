'use client'
import { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../lib/firebase'
import { useRouter } from 'next/navigation'

export default function RegisterPage(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSignup = async () => {
    setError(null)
    try{
      await createUserWithEmailAndPassword(auth, email, password)
      router.push('/dashboard')
    }catch(e){
      // fallback to demo mode
      localStorage.setItem('demoUser', JSON.stringify({email}))
      router.push('/dashboard')
    }
  }

  return (
    <div className="max-w-md mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-4">Create an account</h1>
      <div className="card">
        {error && <div className="text-red-500">{error}</div>}
        <label className="block mt-3">Email</label>
        <input className="input" value={email} onChange={e=>setEmail(e.target.value)} />
        <label className="block mt-3">Password</label>
        <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <div className="mt-4 flex gap-3">
          <button className="btn btn-primary" onClick={handleSignup}>Create account</button>
        </div>
      </div>
    </div>
  )
}
