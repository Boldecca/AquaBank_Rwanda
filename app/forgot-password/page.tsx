'use client'
import { useState } from 'react'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../lib/firebase'

export default function ForgotPasswordPage(){
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState<string | null>(null)

  const handleReset = async () => {
    try{
      await sendPasswordResetEmail(auth, email)
      setMessage('Password reset email sent (if account exists).')
    }catch(e){
      // demo fallback
      setMessage('Password reset is not configured in demo mode. Please contact support.')
    }
  }

  return (
    <div className="max-w-md mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-4">Forgot password</h1>
      <div className="card">
        {message && <div className="text-slate-700">{message}</div>}
        <label className="block mt-3">Email</label>
        <input className="input" value={email} onChange={e=>setEmail(e.target.value)} />
        <div className="mt-4">
          <button className="btn btn-primary" onClick={handleReset}>Send reset email</button>
        </div>
      </div>
    </div>
  )
}
