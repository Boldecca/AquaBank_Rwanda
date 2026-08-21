// Mock payment engine for demo purposes only.
// Does not connect to any real payment gateway.
export type PaymentRecord = {
  id: string
  orderId: string
  amount: number
  method: string
  status: 'success' | 'pending' | 'failed'
  date: string
  details?: any
}

function uid(prefix = ''){
  return prefix + Math.random().toString(36).slice(2,9).toUpperCase()
}

import { MockService } from './MockService'

export async function processPayment(method: string, amount:number, details:any = {}) : Promise<PaymentRecord>{
  // simulated delay
  await new Promise(r=>setTimeout(r, 700))
  // simple deterministic outcome for demo: mobile money and card succeed, cash is pending
  let status: PaymentRecord['status'] = 'success'
  if(method === 'Cash') status = 'pending'
  if(details.forceFail) status = 'failed'

  const rec: PaymentRecord = {
    id: uid('PMT-'),
    orderId: uid('ORD-'),
    amount,
    method,
    status,
    date: new Date().toISOString(),
    details
  }

  try{
    MockService.addPayment(rec)
  }catch(e){
    console.warn('failed to persist demo payment', e)
  }

  return rec
}

export function getPayments(){
  try{
    return MockService.getPayments()
  }catch(e){
    return []
  }
}
