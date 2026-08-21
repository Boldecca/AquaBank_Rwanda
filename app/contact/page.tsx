export default function ContactPage(){
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-4">Contact</h1>
      <p className="text-slate-700 mb-6">Reach out to discuss pilots, partnerships or B2B contracts.</p>
      <div className="card">
        <label className="block">Name</label>
        <input className="input mt-2" />
        <label className="block mt-3">Email</label>
        <input className="input mt-2" />
        <label className="block mt-3">Message</label>
        <textarea className="input mt-2 h-28" />
        <div className="mt-4">
          <button className="btn btn-primary">Send message (demo)</button>
        </div>
      </div>
    </div>
  )
}
