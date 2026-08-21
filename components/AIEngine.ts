// Simple mock AI engine for demo purposes only
type Tank = {id:string,name:string,capacity:number,level:number,location?:string}
type Order = {id:string, qty:number, date:string, location?:string}
type Delivery = {id:string, qty:number, address:string, status?:string}

export function analyzeDemand(orders: Order[] = []){
  // produce a simple forecast for next 14 days using moving average + weekday effect
  const daily = new Array(14).fill(0).map((_,i)=>{
    const base = orders.reduce((s,o)=>s+o.qty,0) / Math.max(1, Math.max(1, orders.length))
    const dow = (new Date().getDay() + i) % 7
    const dowFactor = (dow===0||dow===6) ? 0.9 : 1.0
    // seasonal multiplier: simple month-based (dry months higher demand)
    const month = new Date().getMonth()
    const season = (month>=5 && month<=9) ? 1.1 : 0.9
    const growth = 1.02 ** (i/7)
    const value = Math.round(base * dowFactor * season * growth)
    return {date: new Date(Date.now() + i*24*3600*1000).toISOString().slice(0,10), demand:value}
  })
  const expected = daily.reduce((s,d)=>s+d.demand,0) / daily.length
  const recommendedStorage = Math.round(expected * 3) // 3-day buffer heuristic
  return {daily, expected: Math.round(expected), trend: daily.map(d=>d.demand), recommendedStorage}
}

export function predictDepletion(tanks:Tank[] = [], avgDailyConsumption:number = 1000){
  // For each tank, estimate days to depletion
  return tanks.map(t=>{
    const pct = Math.max(0, t.level / Math.max(1, t.capacity))
    const daysLeft = avgDailyConsumption>0 ? Math.max(0, Math.round(t.level / avgDailyConsumption)) : Infinity
    const estDate = new Date(Date.now() + daysLeft * 24*3600*1000)
    return {id:t.id, name:t.name, level:t.level, capacity:t.capacity, pct: Math.round(pct*100), avgDailyConsumption, daysLeft, estimatedDepletion: estDate.toISOString().slice(0,10)}
  })
}

function pseudoDistance(a:string,b:string){
  // generate deterministic pseudo-distance between two strings
  const h = (s:string)=>(s||'').split('').reduce((s,c)=>s + c.charCodeAt(0),0)
  return Math.abs(h(a)%30 - h(b)%30) + 1
}

export function optimizeDeliveries(deliveries:Delivery[] = [], vehicleCapacity:number = 2000){
  // Simple greedy packing and ordering based on address string hash (demo only)
  const pending = deliveries.filter(d=> d.status !== 'Delivered')
  const route = pending.slice().sort((a,b)=>b.qty-a.qty)
  let vehicleLoad = 0
  const suggestedOrder: string[] = []
  let estDistance = 0
  let lastAddr = route.length ? route[0].address : ''
  for(const d of route){
    if(vehicleLoad + d.qty > vehicleCapacity){
      // assume return and reset
      vehicleLoad = 0
      lastAddr = d.address
    }
    suggestedOrder.push(d.id)
    estDistance += pseudoDistance(lastAddr, d.address)
    lastAddr = d.address
    vehicleLoad += d.qty
  }
  return {suggestedOrder, estDistance: Math.round(estDistance*1.5), vehicleCapacity}
}

export function generateInsights({customers = [], tanks = [], deliveries = [], orders = []} : any){
  const insights:string[] = []
  const totalOrders = orders.reduce((s:any,o:any)=>s+ (o.qty||0),0)
  if(orders.length && totalOrders / Math.max(1, orders.length) > 2000) insights.push('Average order size is high — consider larger tank allocations for busy areas (demo).')
  const lowTanks = tanks.filter((t:any)=> (t.level / Math.max(1,t.capacity)) < 0.2)
  if(lowTanks.length) insights.push(`${lowTanks.length} tank(s) below 20% capacity — check refill scheduling (demo).`)
  if(deliveries.length && deliveries.filter((d:any)=> d.status==='Scheduled').length > 10) insights.push('Multiple scheduled deliveries may create routing bottlenecks — consider batching (demo).')
  if(customers.length && customers.length > 300) insights.push('Customer base growing — consider scaling storage and routes (demo).')
  if(!insights.length) insights.push('No significant issues detected in demo data — continue monitoring (demo).')
  return insights
}

export function chatResponse(question:string, {customers=[],tanks=[],orders=[],deliveries=[]}: any){
  const q = question.toLowerCase()
  if(q.includes('how much water') || q.includes('available')){
    const total = tanks.reduce((s:any,t:any)=>s + (t.level||0),0)
    return `Demo: approximately ${total.toLocaleString()} L available across tanks.`
  }
  if(q.includes('which tanks') && q.includes('attention')){
    const low = tanks.filter((t:any)=>(t.level / Math.max(1,t.capacity)) < 0.2).map((t:any)=>t.name)
    return low.length ? `Demo: tanks needing attention: ${low.join(', ')}.` : 'Demo: no tanks require immediate attention.'
  }
  if(q.includes('usage this week')){
    const weekAgo = Date.now() - 7*24*3600*1000
    const w = orders.filter((o:any)=> new Date(o.date).getTime() >= weekAgo).reduce((s:any,o:any)=>s + (o.qty||0),0)
    return `Demo: ${w} L used in the last 7 days.`
  }
  if(q.includes('upcoming deliveries')){
    const ups = deliveries.filter((d:any)=> d.status && d.status.toLowerCase().includes('sched')).map((d:any)=>d.id)
    return ups.length ? `Demo: upcoming deliveries: ${ups.join(', ')}.` : 'Demo: no upcoming deliveries in demo data.'
  }
  if(q.includes('highest-demand')){
    // mock by customer locations
    return 'Demo: highest-demand area appears to be Kicukiro (based on demo orders).'
  }
  return 'Demo assistant: Sorry, I can only answer prototype questions using demo data. Try: "How much water is available?"'
}
