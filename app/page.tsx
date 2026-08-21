import Hero from '../components/Hero'
import SolutionSteps from '../components/SolutionSteps'
import WhoWeServe from '../components/WhoWeServe'
import HowGetWater from '../components/HowGetWater'
import BusinessModel from '../components/BusinessModel'
import TechGrid from '../components/TechGrid'
import ImpactMetrics from '../components/ImpactMetrics'
import Roadmap from '../components/Roadmap'

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-aquanavy/95 via-aquateal/5 to-white">
      <Hero />

      <main className="max-w-6xl mx-auto px-6 py-12">
        <section id="problem" className="mb-12">
          <h2 className="text-2xl font-semibold mb-3">The Problem</h2>
          <p className="text-slate-700">Kigali experiences seasonal rainfall that often runs off unused during the wet months, while dry seasons leave communities with unreliable access. Capturing and storing that seasonal abundance is the core challenge AquaBank addresses.</p>
        </section>

        <section id="solution" className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Our Solution</h2>
          <SolutionSteps />
        </section>

        <section id="who" className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Who We Serve</h2>
          <WhoWeServe />
        </section>

        <section id="how" className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">How Customers Get Water</h2>
          <HowGetWater />
        </section>

        <section id="business" className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Business Model</h2>
          <BusinessModel />
        </section>

        <section id="technology" className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Technology</h2>
          <TechGrid />
        </section>

        <section id="impact" className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Impact (Pilot targets)</h2>
          <ImpactMetrics />
        </section>

        <section id="roadmap" className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Pilot → Prove → Expand</h2>
          <Roadmap />
        </section>

        <section className="text-center py-12">
          <h3 className="text-2xl font-bold mb-4">Help build a more water-resilient Kigali.</h3>
          <div className="flex gap-4 justify-center">
            <a href="/order" className="btn btn-primary">Get Started</a>
            <a href="/contact" className="btn btn-outline">Partner With Us</a>
          </div>
        </section>
      </main>
    </div>
  )
}
