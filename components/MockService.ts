// Centralized mock data service for demo persistence
export type Order = { id: string; date: string; qty:number; amount?:number; status?:string; location?:string }
export type Tank = { id:string; name:string; capacity:number; level:number, location?:string }
export type Delivery = { id:string; qty:number; address:string; status?:string }

function read<T>(key:string, fallback:T){
  try{ const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) as T : fallback }catch(e){ return fallback }
}
function write<T>(key:string, value:T){ try{ localStorage.setItem(key, JSON.stringify(value)) }catch(e){} }

export const MockService = {
  getOrders(): Order[]{
    return read<Order[]>('demoOrders', [])
  },
  saveOrders(orders: Order[]){ write('demoOrders', orders) },
  addOrder(order: Order){ const o = MockService.getOrders(); o.unshift(order); MockService.saveOrders(o) },

  getTanks(): Tank[]{
    const sample: Tank[] = [
      {id:'T-01', name:'Remera Tank A', capacity:200000, level:150000, location:'Remera'},
      {id:'T-02', name:'Kicukiro Tank', capacity:150000, level:20000, location:'Kicukiro'},
      {id:'T-03', name:'Gacuriro Reservoir', capacity:250000, level:2000, location:'Gacuriro'}
    ]
    return read<Tank[]>('demoTanks', sample)
  },
  saveTanks(tanks:Tank[]){ write('demoTanks', tanks) },

  getDeliveries(): Delivery[]{
    const sample: Delivery[] = [
      {id:'DEL-2001', qty:500, address:'Remera', status:'Scheduled'},
      {id:'DEL-2002', qty:1000, address:'Kicukiro', status:'Delivered'}
    ]
    return read<Delivery[]>('demoDeliveries', sample)
  },
  saveDeliveries(dels:Delivery[]){ write('demoDeliveries', dels) },

  getNextDelivery(){
    return read('demoNextDelivery', null)
  },
  saveNextDelivery(v:any){ write('demoNextDelivery', v) },

  getPayments(){
    return read('demoPayments', [])
  },
  savePayments(payments:any[]){ write('demoPayments', payments) },
  addPayment(p:any){ const all = MockService.getPayments(); all.unshift(p); MockService.savePayments(all) },

  getNotifs(){
    return read('demoNotifs', [])
  },

  getUser(){
    return read('demoUser', null)
  },
  saveUser(u:any){ write('demoUser', u) },

  getSubscription(){
    return read('demoSub', null)
  },

  saveSubscription(val:any){ write('demoSub', val) },

  getBalance(){
    return read('demoBalance', { litres: 0 })
  },

  getQuality(){
    return read('demoQuality', [])
  },

  getCustomers(){ return read('demoCustomers', []) },
  saveCustomers(v:any){ write('demoCustomers', v) }
}
