/* ============================================================
   AQUABANK RWANDA — APP.JS
   All platform logic: auth, modals, orders, payments,
   tracking, kiosks, credits, subscriptions, chatbot, admin
   ============================================================ */

// ── STATE ──────────────────────────────────────────────────
const AB = {
  user: JSON.parse(localStorage.getItem('ab_user') || 'null'),
  credits: parseInt(localStorage.getItem('ab_credits') || '0'),
  orders: JSON.parse(localStorage.getItem('ab_orders') || '[]'),
  subscription: JSON.parse(localStorage.getItem('ab_sub') || 'null'),
  notifications: [
    { icon: '💧', text: 'Your last order was delivered successfully.', time: '2 hours ago', read: false },
    { icon: '📅', text: 'Your subscription renewal is due in 3 days.', time: '1 day ago', read: false },
    { icon: '✅', text: 'Water quality check completed. All clear.', time: '2 days ago', read: true }
  ],
  currentOrder: { qty: null, delivery: null, address: '', date: '', time: '', phone: '', notes: '' },
  selectedPayment: null,
  selectedCredit: null,
  selectedSubPlan: null,
  lastOrderRef: null
};

function save() {
  localStorage.setItem('ab_user', JSON.stringify(AB.user));
  localStorage.setItem('ab_credits', AB.credits);
  localStorage.setItem('ab_orders', JSON.stringify(AB.orders));
  localStorage.setItem('ab_sub', JSON.stringify(AB.subscription));
}

// ── MODAL SYSTEM ───────────────────────────────────────────
function openModal(id) {
  document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
  const el = document.getElementById(id);
  if (el) {
    el.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  // Close dropdowns
  document.getElementById('userDropdown').classList.remove('open');
  document.getElementById('notifDropdown').classList.remove('open');
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('active');
  document.body.style.overflow = '';
}

// Close on overlay click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal(overlay.id);
  });
});

// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.active').forEach(m => closeModal(m.id));
    const userDropdown = document.getElementById('userDropdown');
    const notifDropdown = document.getElementById('notifDropdown');
    if (userDropdown) userDropdown.classList.remove('open');
    if (notifDropdown) notifDropdown.classList.remove('open');
  }
});

// ── NAVBAR ─────────────────────────────────────────────────
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });
}

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
}

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    const currentHamburger = document.getElementById('hamburger');
    const currentNavLinks = document.getElementById('navLinks');
    if (currentHamburger) currentHamburger.classList.remove('open');
    if (currentNavLinks) currentNavLinks.classList.remove('open');
  });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    }
  });
});

// ── AUTH UI ────────────────────────────────────────────────
function updateNavAuth() {
  const guest = document.getElementById('guestBtns');
  const userWrap = document.getElementById('userMenuWrap');
  const notifBtn = document.getElementById('notifBtn');
  const userAvatar = document.getElementById('userAvatar');
  const ddName = document.getElementById('ddName');
  const ddEmail = document.getElementById('ddEmail');

  if (!guest || !userWrap || !notifBtn) return;

  if (AB.user) {
    guest.style.display = 'none';
    userWrap.style.display = 'block';
    notifBtn.style.display = 'flex';
    const initials = AB.user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
    if (userAvatar) userAvatar.textContent = initials;
    if (ddName) ddName.textContent = AB.user.name;
    if (ddEmail) ddEmail.textContent = AB.user.email || AB.user.phone;
    updateNotifBadge();
  } else {
    guest.style.display = 'flex';
    userWrap.style.display = 'none';
    notifBtn.style.display = 'none';
  }
}

function toggleUserMenu() {
  document.getElementById('userDropdown').classList.toggle('open');
  document.getElementById('notifDropdown').classList.remove('open');
}

function toggleNotif() {
  document.getElementById('notifDropdown').classList.toggle('open');
  document.getElementById('userDropdown').classList.remove('open');
  renderNotifs();
}

document.addEventListener('click', e => {
  if (!e.target.closest('.user-menu') && !e.target.closest('#notifBtn')) {
    document.getElementById('userDropdown').classList.remove('open');
    document.getElementById('notifDropdown').classList.remove('open');
  }
});

function updateNotifBadge() {
  const unread = AB.notifications.filter(n => !n.read).length;
  const badge = document.getElementById('notifCount');
  badge.textContent = unread;
  badge.style.display = unread > 0 ? 'flex' : 'none';
}

function renderNotifs() {
  const list = document.getElementById('notifList');
  if (!AB.notifications.length) {
    list.innerHTML = '<div class="notif-empty">No notifications</div>';
    return;
  }
  list.innerHTML = AB.notifications.map((n, i) => `
    <div class="notif-item ${n.read ? '' : 'unread'}" onclick="markRead(${i})">
      <span class="notif-icon">${n.icon}</span>
      <div><div class="notif-text">${n.text}</div><div class="notif-time">${n.time}</div></div>
    </div>`).join('');
}

function markRead(i) { AB.notifications[i].read = true; updateNotifBadge(); renderNotifs(); }
function clearNotifs() { AB.notifications.forEach(n => n.read = true); updateNotifBadge(); renderNotifs(); }

// ── AUTH FORMS ─────────────────────────────────────────────
function switchAuthTab(tab) {
  ['login','register','forgot'].forEach(t => {
    document.getElementById('panel' + t.charAt(0).toUpperCase() + t.slice(1)).classList.toggle('active', t === tab);
    const btn = document.getElementById('tab' + t.charAt(0).toUpperCase() + t.slice(1));
    if (btn) btn.classList.toggle('active', t === tab);
  });
}

function openAuthTab(tab) {
  openModal('authModal');
  switchAuthTab(tab);
}

function showForgot() { switchAuthTab('forgot'); }

const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const id = document.getElementById('loginId').value.trim();
    const pwd = document.getElementById('loginPwd').value.trim();
    if (!id || !pwd) return;
    AB.user = { name: 'Demo Customer', email: id, phone: '+250 780 000 000', type: 'Household', location: 'Kimironko' };
    save(); updateNavAuth(); closeModal('authModal');
    addNotif('👋', 'Welcome back to AquaBank Rwanda!', 'Just now');
  });
}

const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('regName').value.trim();
    const phone = document.getElementById('regPhone').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const pwd = document.getElementById('regPwd').value.trim();
    const location = document.getElementById('regLocation').value.trim();
    const type = document.getElementById('regType').value;
    if (!name || !phone || !email || !pwd || !location || !type) {
      alert('Please fill in all required fields.'); return;
    }
    AB.user = { name, phone, email, location, type };
    save(); updateNavAuth(); closeModal('authModal');
    addNotif('🎉', 'Welcome to AquaBank Rwanda, ' + name + '!', 'Just now');
  });
}

function demoLogin() {
  AB.user = { name: 'Demo Customer', email: 'demo@aquabank.rw', phone: '+250 780 000 000', type: 'Household', location: 'Kimironko' };
  AB.credits = 500;
  AB.orders = [
    { ref: 'AB-2024-001', date: '20 Aug 2024', qty: 500, type: 'Home Delivery', status: 'Delivered' },
    { ref: 'AB-2024-002', date: '18 Aug 2024', qty: 1000, type: 'Business Delivery', status: 'In Transit' },
    { ref: 'AB-2024-003', date: '15 Aug 2024', qty: 250, type: 'Kiosk Pickup', status: 'Delivered' }
  ];
  save(); updateNavAuth(); closeModal('authModal');
  addNotif('🎉', 'Demo account loaded. Explore all features!', 'Just now');
}

function submitForgot() {
  const id = document.getElementById('forgotId').value.trim();
  if (!id) return;
  alert('If an account exists for ' + id + ', a reset link has been sent. (Demo only)');
  switchAuthTab('login');
}

function logout() {
  AB.user = null; save(); updateNavAuth();
  document.getElementById('userDropdown').classList.remove('open');
}

function addNotif(icon, text, time) {
  AB.notifications.unshift({ icon, text, time, read: false });
  updateNotifBadge();
}

// ── ORDER WIZARD ───────────────────────────────────────────
let wizardStep = 1;

function openDashboard() {
  document.getElementById('userDropdown').classList.remove('open');
  openModal('dashModal');
  updateDashboard();
}

function selectQty(el, val) {
  document.querySelectorAll('.qty-tile').forEach(t => t.classList.remove('selected'));
  el.classList.add('selected');
  AB.currentOrder.qty = val;
  document.getElementById('customQtyWrap').style.display = val === 'custom' ? 'block' : 'none';
}

function selectDelivery(el, val) {
  document.querySelectorAll('.delivery-tile').forEach(t => t.classList.remove('selected'));
  el.classList.add('selected');
  AB.currentOrder.delivery = val;
}

function wizardNext(step) {
  if (step === 1) {
    let qty = AB.currentOrder.qty;
    if (!qty) { alert('Please select a water quantity.'); return; }
    if (qty === 'custom') {
      qty = parseInt(document.getElementById('customLitres').value);
      if (!qty || qty < 50) { alert('Please enter a valid quantity (minimum 50 litres).'); return; }
      AB.currentOrder.qty = qty;
    }
  }
  if (step === 2 && !AB.currentOrder.delivery) { alert('Please select a delivery type.'); return; }
  if (step === 3) {
    const addr = document.getElementById('orderAddress').value.trim();
    const date = document.getElementById('orderDate').value;
    const phone = document.getElementById('orderPhone').value.trim();
    if (!addr || !date || !phone) { alert('Please fill in all required fields.'); return; }
    AB.currentOrder.address = addr;
    AB.currentOrder.date = date;
    AB.currentOrder.time = document.getElementById('orderTime').value;
    AB.currentOrder.phone = phone;
    AB.currentOrder.notes = document.getElementById('orderNotes').value;
    buildOrderSummary();
  }
  goToWizardStep(step + 1);
}

function wizardBack(step) { goToWizardStep(step - 1); }

function goToWizardStep(n) {
  wizardStep = n;
  for (let i = 1; i <= 4; i++) {
    document.getElementById('wp' + i).classList.toggle('active', i === n);
    const ws = document.getElementById('ws' + i);
    ws.classList.remove('active', 'done');
    if (i < n) ws.classList.add('done');
    else if (i === n) ws.classList.add('active');
    if (i < 4) {
      const wl = document.getElementById('wl' + i);
      wl.classList.toggle('done', i < n);
    }
  }
}

function buildOrderSummary() {
  const o = AB.currentOrder;
  document.getElementById('orderSummary').innerHTML = `
    <div class="os-row"><span>Water Quantity</span><span>${typeof o.qty === 'number' ? o.qty.toLocaleString() + ' Litres' : o.qty}</span></div>
    <div class="os-row"><span>Delivery Type</span><span>${o.delivery}</span></div>
    <div class="os-row"><span>Address</span><span>${o.address}</span></div>
    <div class="os-row"><span>Date &amp; Time</span><span>${o.date} &mdash; ${o.time}</span></div>
    <div class="os-row"><span>Phone</span><span>${o.phone}</span></div>
    <div class="os-row"><span>Estimated Cost</span><span style="color:var(--blue);">Price to be confirmed</span></div>`;
}

function proceedToPayment() {
  closeModal('orderModal');
  document.getElementById('paymentForm').style.display = 'block';
  document.getElementById('paySuccess').style.display = 'none';
  document.getElementById('momoBox').style.display = 'none';
  AB.selectedPayment = null;
  document.querySelectorAll('.pay-tile').forEach(t => t.classList.remove('selected'));
  openModal('paymentModal');
}

// Reset wizard when order modal opens
document.getElementById('orderModal').addEventListener('click', () => {});
function resetOrderWizard() {
  AB.currentOrder = { qty: null, delivery: null, address: '', date: '', time: '', phone: '', notes: '' };
  document.querySelectorAll('.qty-tile').forEach(t => t.classList.remove('selected'));
  document.querySelectorAll('.delivery-tile').forEach(t => t.classList.remove('selected'));
  document.getElementById('customQtyWrap').style.display = 'none';
  ['orderAddress','orderDate','orderPhone','orderNotes'].forEach(id => { const el = document.getElementById(id); if(el) el.value = ''; });
  goToWizardStep(1);
}

// Set min date for order
const od = document.getElementById('orderDate');
if (od) { const t = new Date(); t.setDate(t.getDate()+1); od.min = t.toISOString().split('T')[0]; }

// ── PAYMENT ────────────────────────────────────────────────
function selectPayment(el, val) {
  el.closest('.pay-methods, .modal-body').querySelectorAll('.pay-tile').forEach(t => t.classList.remove('selected'));
  el.classList.add('selected');
  AB.selectedPayment = val;
  const momoBox = document.getElementById('momoBox');
  if (momoBox) momoBox.style.display = val === 'momo' ? 'block' : 'none';
}

function processPayment() {
  if (!AB.selectedPayment) { alert('Please select a payment method.'); return; }
  if (AB.selectedPayment === 'momo') {
    const ph = document.getElementById('momoPhone').value.trim();
    if (!ph) { alert('Please enter your Mobile Money phone number.'); return; }
  }
  const ref = 'AB-' + new Date().getFullYear() + '-' + String(Math.floor(Math.random()*9000)+1000);
  AB.lastOrderRef = ref;
  const o = AB.currentOrder;
  AB.orders.unshift({
    ref, date: new Date().toLocaleDateString('en-GB', {day:'numeric',month:'short',year:'numeric'}),
    qty: o.qty, type: o.delivery, status: 'Confirmed'
  });
  save();
  document.getElementById('orderRef').textContent = ref;
  document.getElementById('paymentForm').style.display = 'none';
  document.getElementById('paySuccess').style.display = 'block';
  addNotif('✅', 'Order ' + ref + ' confirmed! Payment received.', 'Just now');
  resetOrderWizard();
}

function openTrackFromOrder() {
  closeModal('paymentModal');
  trackDemo(AB.lastOrderRef);
  openModal('trackModal');
}

// ── DELIVERY TRACKING ──────────────────────────────────────
const TRACK_STEPS = [
  { label: 'Order Placed', desc: 'Your order has been received.' },
  { label: 'Payment Confirmed', desc: 'Payment verified successfully.' },
  { label: 'Water Prepared', desc: 'Your water is being prepared and tested.' },
  { label: 'Driver Dispatched', desc: 'A driver has been assigned to your order.' },
  { label: 'Out for Delivery', desc: 'Your water is on the way!' },
  { label: 'Delivered', desc: 'Water delivered successfully.' }
];

function trackOrder() {
  const val = document.getElementById('trackInput').value.trim();
  if (!val) { alert('Please enter an order number or phone number.'); return; }
  const order = AB.orders.find(o => o.ref === val || o.phone === val);
  if (order) { showTrackResult(order.ref, order.qty + ' Litres', order.type, 'Kimironko, Kigali', 3); }
  else { trackDemo(val); }
}

function trackDemo(ref) {
  document.getElementById('trackSearch').style.display = 'none';
  document.getElementById('trackResult').style.display = 'block';
  document.getElementById('trackOrderNum').textContent = 'Order #' + (ref || 'AB-2024-001');
  document.getElementById('trackTitle').textContent = '500 Litres — Home Delivery';
  document.getElementById('trackAddr').textContent = '📍 Kimironko, Kigali';
  document.getElementById('trackETA').textContent = '⏰ ETA: Demo — approx. 2 hours';
  renderTrackTimeline(4);
}

function showTrackResult(ref, title, type, addr, currentStep) {
  document.getElementById('trackSearch').style.display = 'none';
  document.getElementById('trackResult').style.display = 'block';
  document.getElementById('trackOrderNum').textContent = 'Order #' + ref;
  document.getElementById('trackTitle').textContent = title + ' — ' + type;
  document.getElementById('trackAddr').textContent = '📍 ' + addr;
  document.getElementById('trackETA').textContent = '⏰ ETA: Estimated 2 hours';
  renderTrackTimeline(currentStep);
}

function renderTrackTimeline(currentStep) {
  const tl = document.getElementById('trackTimeline');
  tl.innerHTML = TRACK_STEPS.map((s, i) => {
    const done = i < currentStep;
    const current = i === currentStep;
    const isLast = i === TRACK_STEPS.length - 1;
    return `<div class="track-step">
      <div class="track-col">
        <div class="track-dot ${done ? 'done' : current ? 'current' : ''}">${done ? '✓' : i + 1}</div>
        ${!isLast ? `<div class="track-line ${done ? 'done' : ''}"></div>` : ''}
      </div>
      <div class="track-info ${done ? 'done' : current ? 'current' : ''}">
        <h4>${s.label}</h4><p>${s.desc}</p>
      </div>
    </div>`;
  }).join('');
}

function resetTrack() {
  document.getElementById('trackResult').style.display = 'none';
  document.getElementById('trackSearch').style.display = 'block';
  document.getElementById('trackInput').value = '';
}

// ── KIOSK FINDER ───────────────────────────────────────────
const KIOSKS = [
  { name: 'AquaBank Kiosk — Kimironko', area: 'Kimironko, Gasabo', hours: 'Mon–Sat 6am–8pm', open: true },
  { name: 'AquaBank Kiosk — Remera', area: 'Remera, Gasabo', hours: 'Mon–Sat 6am–8pm', open: true },
  { name: 'AquaBank Kiosk — Nyabugogo', area: 'Nyabugogo, Nyarugenge', hours: 'Mon–Sun 5am–9pm', open: true },
  { name: 'AquaBank Kiosk — Gikondo', area: 'Gikondo, Kicukiro', hours: 'Mon–Sat 7am–7pm', open: false },
  { name: 'AquaBank Kiosk — Kacyiru', area: 'Kacyiru, Gasabo', hours: 'Mon–Fri 7am–6pm', open: true }
];

function renderKiosks(list) {
  document.getElementById('kioskList').innerHTML = list.map(k => `
    <div class="kiosk-tile">
      <span class="kt-icon">🚰</span>
      <div class="kt-info">
        <div class="kt-name">${k.name}</div>
        <div class="kt-meta">📍 ${k.area} &nbsp;·&nbsp; 🕐 ${k.hours}</div>
      </div>
      <div class="kt-right">
        <span class="${k.open ? 'open-badge' : 'closed-badge'}">${k.open ? 'Open' : 'Closed'}</span>
        <button class="btn btn-outline-blue btn-sm" onclick="alert('Directions feature coming soon. Location: ${k.area}')">Directions</button>
      </div>
    </div>`).join('');
}

function searchKiosks() {
  const q = document.getElementById('kioskSearch').value.toLowerCase();
  const filtered = q ? KIOSKS.filter(k => k.name.toLowerCase().includes(q) || k.area.toLowerCase().includes(q)) : KIOSKS;
  renderKiosks(filtered.length ? filtered : KIOSKS);
}

// ── WATER CREDITS ──────────────────────────────────────────
function selectCredit(el, val) {
  document.querySelectorAll('.credit-tile').forEach(t => t.classList.remove('selected'));
  el.classList.add('selected');
  AB.selectedCredit = val;
  document.getElementById('customCreditWrap').style.display = val === 'custom' ? 'block' : 'none';
}

function purchaseCredits() {
  if (!AB.selectedCredit) { alert('Please select a credit package.'); return; }
  let amt = AB.selectedCredit;
  if (amt === 'custom') {
    amt = parseInt(document.getElementById('customCreditLitres').value);
    if (!amt || amt < 50) { alert('Please enter a valid amount (minimum 50 litres).'); return; }
  }
  AB.credits += amt;
  save();
  document.getElementById('newBalanceDisplay').textContent = 'New Balance: ' + AB.credits.toLocaleString() + ' Litres';
  document.getElementById('creditsView').style.display = 'none';
  document.getElementById('creditsSuccess').style.display = 'block';
  document.getElementById('creditsDisplay').textContent = AB.credits.toLocaleString();
  addNotif('💧', amt.toLocaleString() + ' litres of water credits added to your account.', 'Just now');
}

// ── SUBSCRIPTIONS ──────────────────────────────────────────
function selectSubPlan(el, name) {
  document.querySelectorAll('.sub-tile').forEach(t => t.classList.remove('selected'));
  el.classList.add('selected');
  AB.selectedSubPlan = name;
}

function activateSub() {
  if (!AB.selectedSubPlan) { alert('Please select a subscription plan.'); return; }
  const loc = document.getElementById('subLocation').value.trim();
  if (!loc) { alert('Please enter your delivery location.'); return; }
  const freq = document.getElementById('subFreq').value;
  const next = new Date(); next.setDate(next.getDate() + 7);
  AB.subscription = { plan: AB.selectedSubPlan, freq, location: loc, status: 'Active', nextDelivery: next.toLocaleDateString('en-GB', {day:'numeric',month:'short',year:'numeric'}), remaining: AB.selectedSubPlan === 'Basic' ? 500 : AB.selectedSubPlan === 'Standard' ? 1000 : 3000 };
  save();
  document.getElementById('subPlanName').textContent = AB.subscription.plan;
  document.getElementById('subNextDelivery').textContent = AB.subscription.nextDelivery;
  document.getElementById('subRemaining').textContent = AB.subscription.remaining.toLocaleString() + ' L';
  document.getElementById('activeSubStatus').style.display = 'block';
  document.getElementById('subActivateBtn').textContent = 'Update Subscription';
  addNotif('📅', AB.subscription.plan + ' subscription activated! Next delivery: ' + AB.subscription.nextDelivery, 'Just now');
}

function pauseSub() {
  if (AB.subscription) { AB.subscription.status = 'Paused'; save(); alert('Subscription paused. You can reactivate at any time.'); }
}

function cancelSub() {
  if (confirm('Are you sure you want to cancel your subscription?')) {
    AB.subscription = null; save();
    document.getElementById('activeSubStatus').style.display = 'none';
    document.getElementById('subActivateBtn').textContent = 'Activate Subscription';
    AB.selectedSubPlan = null;
    document.querySelectorAll('.sub-tile').forEach(t => t.classList.remove('selected'));
  }
}

// ── DASHBOARD ──────────────────────────────────────────────
function showDashPanel(id) {
  document.querySelectorAll('.dash-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.dash-nav a').forEach(a => a.classList.remove('active'));
  document.getElementById('dp-' + id).classList.add('active');
  event.currentTarget.classList.add('active');
}

function updateDashboard() {
  if (!AB.user) return;
  const initials = AB.user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  document.getElementById('dashAvatar').textContent = initials;
  document.getElementById('dashName').textContent = AB.user.name;
  document.getElementById('dashType').textContent = AB.user.type || 'Customer';
  document.getElementById('dashWelcomeName').textContent = AB.user.name.split(' ')[0];
  document.getElementById('dashBalance').textContent = AB.credits.toLocaleString();
  document.getElementById('dashCreditsVal').textContent = AB.credits.toLocaleString();
  document.getElementById('profileName').value = AB.user.name || '';
  document.getElementById('profilePhone').value = AB.user.phone || '';
  document.getElementById('profileEmail').value = AB.user.email || '';
  document.getElementById('profileLocation').value = AB.user.location || '';

  const tbody = document.getElementById('dashOrdersBody');
  const allBody = document.getElementById('allOrdersBody');
  if (!AB.orders.length) {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;color:var(--gray-400);padding:20px;">No orders yet. <span style="color:var(--blue);cursor:pointer;font-weight:600;" onclick="closeModal(\'dashModal\');openModal(\'orderModal\')">Order water now</span></td></tr>';
    allBody.innerHTML = tbody.innerHTML;
  } else {
    const statusClass = s => s === 'Delivered' ? 'badge-green' : s === 'In Transit' || s === 'Confirmed' ? 'badge-blue' : s === 'Pending' ? 'badge-orange' : 'badge-gray';
    tbody.innerHTML = AB.orders.slice(0, 5).map(o => `<tr><td><strong>${o.ref}</strong></td><td>${o.date}</td><td>${typeof o.qty === 'number' ? o.qty.toLocaleString() + ' L' : o.qty}</td><td><span class="badge ${statusClass(o.status)}">${o.status}</span></td></tr>`).join('');
    allBody.innerHTML = AB.orders.map(o => `<tr><td><strong>${o.ref}</strong></td><td>${o.date}</td><td>${typeof o.qty === 'number' ? o.qty.toLocaleString() + ' L' : o.qty}</td><td>${o.type || '—'}</td><td><span class="badge ${statusClass(o.status)}">${o.status}</span></td><td><button class="action-link" onclick="trackDemo('${o.ref}');closeModal('dashModal');openModal('trackModal')">Track</button></td></tr>`).join('');
  }

  if (AB.subscription) {
    document.getElementById('dashSubContent').innerHTML = `<div class="sub-status-box"><div class="ss-row"><span>Plan</span><span>${AB.subscription.plan}</span></div><div class="ss-row"><span>Status</span><span style="color:var(--green);font-weight:700;">${AB.subscription.status}</span></div><div class="ss-row"><span>Next Delivery</span><span>${AB.subscription.nextDelivery}</span></div></div>`;
  }
}

function saveProfile() {
  if (!AB.user) return;
  AB.user.name = document.getElementById('profileName').value;
  AB.user.phone = document.getElementById('profilePhone').value;
  AB.user.email = document.getElementById('profileEmail').value;
  AB.user.location = document.getElementById('profileLocation').value;
  save(); updateNavAuth();
  document.getElementById('profileSuccess').style.display = 'block';
  setTimeout(() => { document.getElementById('profileSuccess').style.display = 'none'; }, 3000);
}

// ── CHATBOT ────────────────────────────────────────────────
const BOT_RESPONSES = {
  'order water': 'To order water, click the <strong>Order Water</strong> button on the homepage or in your dashboard. You can choose your quantity, delivery type and preferred date.',
  'how do i order': 'Click <strong>Order Water</strong> anywhere on the site. Select your quantity, choose home delivery or kiosk pickup, enter your details and confirm payment.',
  'delivery': 'We offer home delivery, business delivery and kiosk pickup. You can track your delivery in real time using your order number.',
  'track': 'To track your delivery, click <strong>Check Delivery</strong> on the homepage or go to <strong>Track Delivery</strong> in your account menu. Enter your order number.',
  'kiosk': 'Click <strong>Find a Kiosk</strong> to see all AquaBank kiosks near you. Kiosks accept Mobile Money and cash.',
  'credits': 'Water credits are prepaid litres stored in your account. Go to <strong>Water Credits</strong> to top up using Mobile Money or cash at a kiosk.',
  'payment': 'We accept Mobile Money (MTN MoMo / Airtel Money), Cash on Delivery and prepaid Water Credits.',
  'quality': 'All AquaBank water is filtered, disinfected and tested for pH, turbidity and chlorine before distribution. Click <strong>Water Quality</strong> to see our quality certificate.',
  'subscription': 'Our subscription plans (Basic 500L, Standard 1,000L, Business 3,000L) give you regular water deliveries. Go to <strong>Subscription</strong> to activate a plan.',
  'price': 'Pricing is confirmed at the time of order. We do not publish fixed prices yet as they depend on quantity and location. Contact us for a quote.',
  'contact': 'You can reach us at info@aquabank.rw or call +250 780 000 000. You can also use the <strong>Help & Support</strong> section.',
  'hello': 'Hello! I\'m the AquaBank Assistant. How can I help you today? You can ask me about ordering water, deliveries, kiosks, payments or water quality.',
  'hi': 'Hi there! How can I help you with your water needs today?',
  'default': 'I\'m not sure about that. Try asking about: ordering water, delivery tracking, finding a kiosk, water credits, subscriptions, payment methods or water quality. Or <span style="color:var(--blue);cursor:pointer;font-weight:600;" onclick="openModal(\'supportModal\')">contact our support team</span>.'
};

const CHAT_CHIPS_LIST = ['How do I order?', 'Track my delivery', 'Find a kiosk', 'Water credits', 'Payment methods', 'Water quality'];

function toggleChat() {
  const win = document.getElementById('chatWindow');
  win.classList.toggle('open');
  if (win.classList.contains('open') && !document.getElementById('chatMsgs').children.length) {
    appendBotMsg('Hello! I\'m the <strong>AquaBank Assistant</strong>. How can I help you today?');
    renderChatChips();
  }
}

function appendBotMsg(text) {
  const msgs = document.getElementById('chatMsgs');
  msgs.innerHTML += `<div class="chat-msg bot">${text}</div>`;
  msgs.scrollTop = msgs.scrollHeight;
}

function appendUserMsg(text) {
  const msgs = document.getElementById('chatMsgs');
  msgs.innerHTML += `<div class="chat-msg user">${text}</div>`;
  msgs.scrollTop = msgs.scrollHeight;
}

function renderChatChips() {
  document.getElementById('chatChips').innerHTML = CHAT_CHIPS_LIST.map(c => `<span class="chat-chip" onclick="handleChip('${c}')">${c}</span>`).join('');
}

function handleChip(text) {
  appendUserMsg(text);
  document.getElementById('chatChips').innerHTML = '';
  setTimeout(() => { getBotResponse(text.toLowerCase()); }, 400);
}

function sendChat() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;
  appendUserMsg(text);
  input.value = '';
  document.getElementById('chatChips').innerHTML = '';
  setTimeout(() => { getBotResponse(text.toLowerCase()); }, 400);
}

function getBotResponse(text) {
  let response = BOT_RESPONSES.default;
  for (const [key, val] of Object.entries(BOT_RESPONSES)) {
    if (text.includes(key)) { response = val; break; }
  }
  appendBotMsg(response);
  setTimeout(renderChatChips, 600);
}

// ── FORMS ──────────────────────────────────────────────────
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('cName').value.trim();
    const email = document.getElementById('cEmail').value.trim();
    const msg = document.getElementById('cMessage').value.trim();
    if (!name || !email || !msg) { alert('Please fill in all required fields.'); return; }
    const contactSuccess = document.getElementById('contactSuccess');
    if (contactSuccess) contactSuccess.style.display = 'block';
    e.target.reset();
    setTimeout(() => { if (contactSuccess) contactSuccess.style.display = 'none'; }, 5000);
  });
}

const b2bForm = document.getElementById('b2bForm');
if (b2bForm) {
  b2bForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('b2bName').value.trim();
    const contact = document.getElementById('b2bContact').value.trim();
    const phone = document.getElementById('b2bPhone').value.trim();
    const loc = document.getElementById('b2bLocation').value.trim();
    if (!name || !contact || !phone || !loc) { alert('Please fill in all required fields.'); return; }
    const b2bSuccess = document.getElementById('b2bSuccess');
    if (b2bSuccess) b2bSuccess.style.display = 'block';
    e.target.reset();
  });
}

const supportForm = document.getElementById('supportForm');
if (supportForm) {
  supportForm.addEventListener('submit', e => {
    e.preventDefault();
    const msg = document.getElementById('supportMsg').value.trim();
    if (!msg) { alert('Please describe your issue.'); return; }
    const supportSuccess = document.getElementById('supportSuccess');
    if (supportSuccess) supportSuccess.style.display = 'block';
    e.target.reset();
    setTimeout(() => { if (supportSuccess) supportSuccess.style.display = 'none'; }, 5000);
  });
}

// ── FEEDBACK ───────────────────────────────────────────────
let selectedRating = 0;
function rateStar(n) {
  selectedRating = n;
  document.querySelectorAll('.star').forEach((s, i) => s.classList.toggle('lit', i < n));
}
function submitFeedback() {
  if (!selectedRating) { alert('Please select a star rating.'); return; }
  document.getElementById('feedbackSuccess').style.display = 'block';
  document.getElementById('feedbackText').value = '';
  selectedRating = 0;
  document.querySelectorAll('.star').forEach(s => s.classList.remove('lit'));
  setTimeout(() => { document.getElementById('feedbackSuccess').style.display = 'none'; closeModal('feedbackModal'); }, 2500);
}

// ── CHARTS ─────────────────────────────────────────────────
window.addEventListener('load', () => {
  const wCtx = document.getElementById('waterChart');
  if (wCtx) new Chart(wCtx, {
    type: 'bar',
    data: {
      labels: ['Jan','Feb','Mar','Apr','May','Jun'],
      datasets: [
        { label: 'Captured (m³)', data: [4200,6800,8100,5500,3200,7400], backgroundColor: 'rgba(0,119,182,.75)', borderRadius: 6 },
        { label: 'Distributed (m³)', data: [3800,5900,7200,5100,3000,6800], backgroundColor: 'rgba(0,180,216,.75)', borderRadius: 6 }
      ]
    },
    options: { responsive: true, plugins: { legend: { position: 'bottom' } }, scales: { y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,.05)' } }, x: { grid: { display: false } } } }
  });

  const cCtx = document.getElementById('customerChart');
  if (cCtx) new Chart(cCtx, {
    type: 'doughnut',
    data: {
      labels: ['Households','Restaurants','Schools','Salons','Buildings','Other'],
      datasets: [{ data: [42,18,12,14,9,5], backgroundColor: ['#0077b6','#00b4d8','#16a34a','#90e0ef','#023e8a','#64748b'], borderWidth: 0, hoverOffset: 8 }]
    },
    options: { responsive: true, plugins: { legend: { position: 'bottom' } }, cutout: '65%' }
  });
});

// ── KPI COUNTERS ───────────────────────────────────────────
const kpiObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target; const target = parseInt(el.dataset.target);
      const step = target / 120;
      let cur = 0;
      const t = setInterval(() => { cur = Math.min(cur + step, target); el.textContent = Math.floor(cur).toLocaleString(); if (cur >= target) clearInterval(t); }, 16);
      kpiObs.unobserve(el);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.kpi-val[data-target]').forEach(el => kpiObs.observe(el));

// ── SCROLL REVEAL ──────────────────────────────────────────
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ── INIT ───────────────────────────────────────────────────
updateNavAuth();
const kioskList = document.getElementById('kioskList');
if (kioskList) renderKiosks(KIOSKS);
const creditsDisplay = document.getElementById('creditsDisplay');
if (creditsDisplay) creditsDisplay.textContent = AB.credits.toLocaleString();

// ── SUBSCRIPTIONS ──────────────────────────────────────────
function selectSubPlan(el, name) {
  document.querySelectorAll('.sub-tile').forEach(t => t.classList.remove('selected'));
  el.classList.add('selected');
  AB.selectedSubPlan = name;
}

function activateSub() {
  if (!AB.selectedSubPlan) { alert('Please select a subscription plan.'); return; }
  const loc = document.getElementById('subLocation').value.trim();
  if (!loc) { alert('Please enter your delivery location.'); return; }
  const freq = document.getElementById('subFreq').value;
  const next = new Date(); next.setDate(next.getDate() + 7);
  AB.subscription = { plan: AB.selectedSubPlan, freq, location: loc, nextDelivery: next.toLocaleDateString('en-GB', {day:'numeric',month:'short',year:'numeric'}), remaining: AB.selectedSubPlan === 'Basic' ? 500 : AB.selectedSubPlan === 'Standard' ? 1000 : 3000 };
  save();
  document.getElementById('subPlanName').textContent = AB.selectedSubPlan;
  document.getElementById('subNextDelivery').textContent = AB.subscription.nextDelivery;
  document.getElementById('subRemaining').textContent = AB.subscription.remaining.toLocaleString() + ' L';
  document.getElementById('activeSubStatus').style.display = 'block';
  document.getElementById('subActivateBtn').textContent = 'Update Subscription';
  addNotif('📅', AB.selectedSubPlan + ' subscription activated!', 'Just now');
}

function pauseSub() { alert('Subscription paused. (Demo only)'); }
function cancelSub() {
  if (confirm('Cancel your subscription?')) {
    AB.subscription = null; save();
    document.getElementById('activeSubStatus').style.display = 'none';
    document.getElementById('subActivateBtn').textContent = 'Activate Subscription';
  }
}

// ── DASHBOARD ──────────────────────────────────────────────
function updateDashboard() {
  if (!AB.user) return;
  const initials = AB.user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  document.getElementById('dashAvatar').textContent = initials;
  document.getElementById('dashName').textContent = AB.user.name;
  document.getElementById('dashType').textContent = AB.user.type || 'Customer';
  document.getElementById('dashWelcomeName').textContent = AB.user.name.split(' ')[0];
  document.getElementById('dashBalance').textContent = AB.credits.toLocaleString();
  document.getElementById('dashCreditsVal').textContent = AB.credits.toLocaleString();
  document.getElementById('profileName').value = AB.user.name || '';
  document.getElementById('profilePhone').value = AB.user.phone || '';
  document.getElementById('profileEmail').value = AB.user.email || '';
  document.getElementById('profileLocation').value = AB.user.location || '';
  renderDashOrders();
  if (AB.subscription) {
    document.getElementById('dashSubContent').innerHTML = `
      <div class="sub-status-box">
        <div class="ss-row"><span>Plan</span><span>${AB.subscription.plan}</span></div>
        <div class="ss-row"><span>Status</span><span style="color:var(--green);font-weight:700;">Active</span></div>
        <div class="ss-row"><span>Next Delivery</span><span>${AB.subscription.nextDelivery}</span></div>
        <div class="ss-row"><span>Frequency</span><span>${AB.subscription.freq}</span></div>
      </div>`;
  }
}

function renderDashOrders() {
  const statusClass = s => s === 'Delivered' ? 'badge badge-green' : s === 'In Transit' ? 'badge badge-blue' : s === 'Confirmed' ? 'badge badge-blue' : s === 'Cancelled' ? 'badge badge-red' : 'badge badge-orange';
  const rows = AB.orders.slice(0, 5).map(o => `<tr><td><strong>${o.ref}</strong></td><td>${o.date}</td><td>${typeof o.qty === 'number' ? o.qty.toLocaleString() + ' L' : o.qty}</td><td><span class="${statusClass(o.status)}">${o.status}</span></td></tr>`).join('');
  document.getElementById('dashOrdersBody').innerHTML = rows || '<tr><td colspan="4" style="text-align:center;color:var(--gray-400);padding:20px;">No orders yet</td></tr>';
  const allRows = AB.orders.map(o => `<tr><td><strong>${o.ref}</strong></td><td>${o.date}</td><td>${typeof o.qty === 'number' ? o.qty.toLocaleString() + ' L' : o.qty}</td><td>${o.type || '—'}</td><td><span class="${statusClass(o.status)}">${o.status}</span></td><td><button class="action-link" onclick="trackDemo('${o.ref}');closeModal('dashModal');openModal('trackModal')">Track</button></td></tr>`).join('');
  document.getElementById('allOrdersBody').innerHTML = allRows || '<tr><td colspan="6" style="text-align:center;color:var(--gray-400);padding:20px;">No orders yet</td></tr>';
}

function showDashPanel(id) {
  document.querySelectorAll('.dash-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.dash-nav a').forEach(a => a.classList.remove('active'));
  document.getElementById('dp-' + id).classList.add('active');
  event.currentTarget.classList.add('active');
}

function saveProfile() {
  if (!AB.user) return;
  AB.user.name = document.getElementById('profileName').value.trim() || AB.user.name;
  AB.user.phone = document.getElementById('profilePhone').value.trim() || AB.user.phone;
  AB.user.email = document.getElementById('profileEmail').value.trim() || AB.user.email;
  AB.user.location = document.getElementById('profileLocation').value.trim() || AB.user.location;
  save(); updateNavAuth(); updateDashboard();
  document.getElementById('profileSuccess').style.display = 'block';
  setTimeout(() => { document.getElementById('profileSuccess').style.display = 'none'; }, 3000);
}

// ── FORMS ──────────────────────────────────────────────────
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('cName').value.trim();
  const email = document.getElementById('cEmail').value.trim();
  const msg = document.getElementById('cMessage').value.trim();
  if (!name || !email || !msg) { alert('Please fill in all required fields.'); return; }
  document.getElementById('contactSuccess').style.display = 'block';
  e.target.reset();
  setTimeout(() => { document.getElementById('contactSuccess').style.display = 'none'; }, 5000);
});

document.getElementById('b2bForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('b2bName').value.trim();
  const type = document.getElementById('b2bType').value;
  const contact = document.getElementById('b2bContact').value.trim();
  const phone = document.getElementById('b2bPhone').value.trim();
  const loc = document.getElementById('b2bLocation').value.trim();
  if (!name || !type || !contact || !phone || !loc) { alert('Please fill in all required fields.'); return; }
  document.getElementById('b2bSuccess').style.display = 'block';
  e.target.reset();
});

document.getElementById('supportForm').addEventListener('submit', e => {
  e.preventDefault();
  const msg = document.getElementById('supportMsg').value.trim();
  if (!msg) { alert('Please describe your issue.'); return; }
  document.getElementById('supportSuccess').style.display = 'block';
  e.target.reset();
  setTimeout(() => { document.getElementById('supportSuccess').style.display = 'none'; }, 5000);
});

// ── FEEDBACK ───────────────────────────────────────────────
let currentRating = 0;
function rateStar(n) {
  currentRating = n;
  document.querySelectorAll('.star').forEach((s, i) => s.classList.toggle('lit', i < n));
}
function submitFeedback() {
  if (!currentRating) { alert('Please select a star rating.'); return; }
  document.getElementById('feedbackSuccess').style.display = 'block';
  document.getElementById('feedbackText').value = '';
  currentRating = 0;
  document.querySelectorAll('.star').forEach(s => s.classList.remove('lit'));
  setTimeout(() => { document.getElementById('feedbackSuccess').style.display = 'none'; closeModal('feedbackModal'); }, 2500);
}

// ── CHATBOT ────────────────────────────────────────────────
const CHAT_RESPONSES = {
  'order water': 'To order water, click the <strong>Order Water</strong> button on the homepage or in your dashboard. You can choose your quantity, delivery type, and preferred date.',
  'how do i order': 'Click <strong>Order Water</strong> from the hero section or your dashboard. Select your quantity, delivery method, enter your details, and confirm payment.',
  'delivery': 'We offer Home Delivery, Business Delivery, and Kiosk Pickup. You can track your delivery in real time from your dashboard.',
  'track': 'Go to <strong>Track Delivery</strong> and enter your order number or phone number. You can also track from your dashboard.',
  'kiosk': 'Click <strong>Find a Kiosk</strong> to see all AquaBank kiosks near you. Kiosks accept Mobile Money and cash.',
  'payment': 'We accept <strong>Mobile Money</strong> (MTN MoMo / Airtel Money), <strong>Cash on Delivery</strong>, and <strong>Water Credits</strong>.',
  'credits': 'Water Credits are prepaid litres stored in your account. Buy them via Mobile Money or cash at a kiosk, then use them for any order.',
  'subscription': 'Our subscription plans (Basic 500L, Standard 1,000L, Business 3,000L) give you regular water deliveries. Manage yours in the dashboard.',
  'quality': 'All AquaBank water is filtered, disinfected, and tested for pH, turbidity, and chlorine before delivery. Click <strong>Water Quality</strong> for details.',
  'price': 'Pricing is confirmed at the time of order. We do not publish fixed prices yet as they depend on quantity and location. Contact us for a quote.',
  'contact': 'Call us on <strong>+250 780 000 000</strong>, email <strong>info@aquabank.rw</strong>, or use the WhatsApp button in Support.',
  'hello': 'Hello! I\'m the AquaBank Assistant. How can I help you today? You can ask me about ordering water, deliveries, kiosks, payments, or subscriptions.',
  'hi': 'Hi there! How can I help you with your water needs today?',
  'default': 'I\'m not sure about that, but I\'m here to help! Try asking about <strong>ordering water</strong>, <strong>delivery tracking</strong>, <strong>kiosks</strong>, <strong>payments</strong>, or <strong>subscriptions</strong>.'
};

const CHAT_CHIPS_LIST = ['How do I order water?', 'Where is my delivery?', 'Find a kiosk', 'Payment options', 'Water quality', 'Subscription plans'];

function toggleChat() {
  const win = document.getElementById('chatWindow');
  const isOpen = win.classList.toggle('open');
  if (isOpen && document.getElementById('chatMsgs').children.length === 0) {
    addChatMsg('bot', 'Hello! I\'m the <strong>AquaBank Assistant</strong>. How can I help you today?');
    renderChatChips();
  }
}

function addChatMsg(type, text) {
  const msgs = document.getElementById('chatMsgs');
  const div = document.createElement('div');
  div.className = 'chat-msg ' + type;
  div.innerHTML = text;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function renderChatChips() {
  document.getElementById('chatChips').innerHTML = CHAT_CHIPS_LIST.map(c => `<span class="chat-chip" onclick="sendChatChip('${c}')">${c}</span>`).join('');
}

function sendChatChip(text) {
  addChatMsg('user', text);
  document.getElementById('chatChips').innerHTML = '';
  setTimeout(() => { addChatMsg('bot', getChatResponse(text)); renderChatChips(); }, 600);
}

function sendChat() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  addChatMsg('user', text);
  document.getElementById('chatChips').innerHTML = '';
  setTimeout(() => { addChatMsg('bot', getChatResponse(text)); renderChatChips(); }, 700);
}

function getChatResponse(text) {
  const t = text.toLowerCase();
  for (const [key, val] of Object.entries(CHAT_RESPONSES)) {
    if (key !== 'default' && t.includes(key)) return val;
  }
  return CHAT_RESPONSES.default;
}

// ── SCROLL ANIMATIONS & KPI COUNTERS ──────────────────────
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const kpiObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { animateKPI(e.target); kpiObserver.unobserve(e.target); }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.kpi-val[data-target]').forEach(el => kpiObserver.observe(el));

function animateKPI(el) {
  const target = parseInt(el.dataset.target);
  const step = target / (2000 / 16);
  let cur = 0;
  const t = setInterval(() => {
    cur = Math.min(cur + step, target);
    el.textContent = Math.floor(cur).toLocaleString();
    if (cur >= target) clearInterval(t);
  }, 16);
}

// ── CHARTS ─────────────────────────────────────────────────
window.addEventListener('load', () => {
  const wCtx = document.getElementById('waterChart');
  if (wCtx) new Chart(wCtx, {
    type: 'bar',
    data: {
      labels: ['Jan','Feb','Mar','Apr','May','Jun'],
      datasets: [
        { label: 'Captured (m³)', data: [4200,6800,8100,5500,3200,7400], backgroundColor: 'rgba(0,119,182,.75)', borderRadius: 6 },
        { label: 'Distributed (m³)', data: [3800,5900,7200,5100,3000,6800], backgroundColor: 'rgba(0,180,216,.75)', borderRadius: 6 }
      ]
    },
    options: { responsive: true, plugins: { legend: { position: 'bottom' } }, scales: { y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,.05)' } }, x: { grid: { display: false } } } }
  });

  const cCtx = document.getElementById('customerChart');
  if (cCtx) new Chart(cCtx, {
    type: 'doughnut',
    data: {
      labels: ['Households','Restaurants','Schools','Salons','Buildings','Other'],
      datasets: [{ data: [42,18,12,14,9,5], backgroundColor: ['#0077b6','#00b4d8','#16a34a','#90e0ef','#023e8a','#64748b'], borderWidth: 0, hoverOffset: 8 }]
    },
    options: { responsive: true, plugins: { legend: { position: 'bottom' } }, cutout: '65%' }
  });

  // Init kiosk list
  renderKiosks(KIOSKS);
  // Init credits display
  document.getElementById('creditsDisplay').textContent = AB.credits.toLocaleString();
  // Update nav auth state
  updateNavAuth();
});
