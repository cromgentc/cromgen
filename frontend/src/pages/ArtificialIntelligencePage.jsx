import { useState } from 'react'
import { LeadCaptureModal } from '../components/LeadCaptureModal.jsx'

const aiFeatures = [
  ['Machine Learning', 'Custom models that learn from business data, detect patterns, and improve decisions at scale.'],
  ['Generative AI', 'Enterprise-grade assistants, content workflows, and knowledge tools built around your operations.'],
  ['Predictive Analytics', 'Forecast demand, risk, customer behavior, and performance trends with intelligent reporting.'],
  ['AI Automation', 'Automate repetitive workflows across sales, support, CRM, documents, and internal operations.'],
  ['NLP & Chatbots', 'Conversational AI for customer support, lead qualification, knowledge search, and service routing.'],
  ['Computer Vision', 'Visual recognition systems for inspection, verification, document intelligence, and monitoring.'],
]

const trustMetrics = [
  ['99.9%', 'Accuracy'],
  ['24/7', 'Automation'],
  ['Enterprise', 'Security'],
]

export function ArtificialIntelligencePage() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)

  return (
    <main className="overflow-hidden bg-[#0f172a] text-white">
      <section className="relative isolate px-5 pb-20 pt-32 sm:pt-36 lg:pt-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(255,75,45,0.22),transparent_32%),radial-gradient(circle_at_82%_22%,rgba(99,102,241,0.16),transparent_34%),linear-gradient(135deg,#0f172a,#111827_48%,#050816)]" />
        <div className="absolute left-1/2 top-16 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-[#ff4b2d]/20 blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
          <div>
            <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#ffb39f] shadow-2xl shadow-black/20 backdrop-blur">
              Enterprise AI Transformation
            </div>
            <h1 className="mt-7 max-w-4xl text-4xl font-black leading-[1.02] tracking-normal text-white sm:text-6xl lg:text-7xl">
              Artificial Intelligence Solutions
            </h1>
            <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-slate-300 sm:text-lg">
              Empowering businesses with intelligent automation, predictive analytics, and scalable AI-driven transformation.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="mailto:hello@cromgentechnology.com"
                className="group inline-flex items-center justify-center rounded-2xl bg-[#ff4b2d] px-7 py-4 text-sm font-black uppercase tracking-[0.12em] text-white shadow-2xl shadow-[#ff4b2d]/30 transition duration-300 hover:-translate-y-1 hover:bg-[#ff6348] hover:shadow-[#ff4b2d]/45"
              >
                Get Started
                <span className="ml-3 transition duration-300 group-hover:translate-x-1">→</span>
              </a>
              <button
                type="button"
                onClick={() => setIsLeadModalOpen(true)}
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/8 px-7 py-4 text-sm font-black uppercase tracking-[0.12em] text-white shadow-xl shadow-black/20 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#ff4b2d]/60 hover:bg-white/14"
              >
                Talk to Expert
              </button>
            </div>
          </div>

          <div className="ai-premium-visual relative mx-auto w-full max-w-xl rounded-[2rem] p-[1px]">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/8 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl">
              <div className="absolute right-8 top-8 h-24 w-24 rounded-full bg-[#ff4b2d]/25 blur-2xl" />
              <div className="absolute bottom-8 left-8 h-28 w-28 rounded-full bg-cyan-400/15 blur-2xl" />

              <div className="relative rounded-3xl border border-white/10 bg-[#111827]/88 p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">AI Command Center</p>
                    <h2 className="mt-2 text-xl font-black text-white">Live Intelligence Layer</h2>
                  </div>
                  <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-black text-emerald-300">Online</span>
                </div>

                <div className="grid gap-4">
                  {[
                    ['Automation Pipeline', '86%'],
                    ['Prediction Engine', '94%'],
                    ['Data Quality', '99%'],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-2xl border border-white/10 bg-white/6 p-4 transition duration-300 hover:border-[#ff4b2d]/50 hover:bg-white/10">
                      <div className="mb-3 flex items-center justify-between text-sm font-bold">
                        <span className="text-slate-300">{label}</span>
                        <span className="text-[#ff8a75]">{value}</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/10">
                        <i className="block h-full rounded-full bg-gradient-to-r from-[#ff4b2d] to-white/80" style={{ width: value }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3">
                  {['ML', 'GenAI', 'NLP'].map((item) => (
                    <div key={item} className="rounded-2xl border border-white/10 bg-[#0f172a] p-4 text-center text-sm font-black text-white">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-y border-white/10 bg-[#111827] px-5 py-14">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {trustMetrics.map(([value, label]) => (
            <article
              key={label}
              className="rounded-2xl border border-white/10 bg-white/6 p-7 shadow-xl shadow-black/20 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#ff4b2d]/50 hover:bg-white/10"
            >
              <strong className="block text-4xl font-black text-[#ff4b2d]">{value}</strong>
              <span className="mt-3 block text-sm font-black uppercase tracking-[0.14em] text-slate-300">{label}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="relative px-5 py-20">
        <div className="absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(circle_at_50%_0%,rgba(255,75,45,0.13),transparent_36%)]" />
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ff8a75]">AI Capabilities</p>
            <h2 className="mt-4 text-3xl font-black leading-tight text-white sm:text-5xl">
              Built for automation, intelligence, and measurable enterprise outcomes.
            </h2>
          </div>

          <div className="mt-11 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {aiFeatures.map(([title, copy], index) => (
              <article
                key={title}
                className="group rounded-2xl border border-white/10 bg-white/6 p-6 shadow-xl shadow-black/20 backdrop-blur transition duration-300 hover:-translate-y-2 hover:border-[#ff4b2d]/60 hover:bg-white/10"
              >
                <div className="mb-6 grid h-12 w-12 place-items-center rounded-2xl bg-[#ff4b2d] text-sm font-black text-white shadow-lg shadow-[#ff4b2d]/30">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="text-xl font-black text-white">{title}</h3>
                <p className="mt-4 text-sm font-semibold leading-7 text-slate-300">{copy}</p>
                <span className="mt-6 inline-flex text-sm font-black text-[#ff8a75] transition duration-300 group-hover:translate-x-1">
                  Explore capability
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>
      <LeadCaptureModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        serviceName="Artificial Intelligence Solutions"
      />
    </main>
  )
}
