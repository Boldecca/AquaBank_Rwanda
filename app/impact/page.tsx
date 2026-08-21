import ImpactMetrics from '../../components/ImpactMetrics'

export default function ImpactPage(){
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-4">Impact</h1>
      <p className="text-slate-700 mb-6">Pilot targets shown below. These are demo values to communicate likely early-stage KPIs.</p>
      <ImpactMetrics />
    </div>
  )
}
