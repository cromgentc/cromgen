import { useState } from 'react'
import { LeadCaptureModal } from '../../components/LeadCaptureModal.jsx'

const defaultTrustItems = [
  'Script-Based Calling',
  'QA Call Monitoring',
  'CRM Integration',
  'Daily MIS Reports',
  'Multilingual Agents',
  'Scalable Calling Team',
]

function BpoIcon({ index }) {
  const paths = [
    'M4 12a8 8 0 0 1 16 0v5a3 3 0 0 1-3 3h-2v-5h4v-3a7 7 0 0 0-14 0v3h4v5H7a3 3 0 0 1-3-3v-5z',
    'M6 18l-2 3V5h16v13H6zM8 9h8M8 13h5',
    'M5 5h14v14H5zM8 9h8M8 13h5',
    'M4 7l8 6 8-6M4 7v10h16V7',
    'M5 12l4 4 10-10',
    'M4 17V7h16v10H4zm4-6h8',
    'M5 6h14v12H5zM8 10h8M8 14h5',
    'M12 3l8 4v10l-8 4-8-4V7l8-4z',
  ]

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
      <path d={paths[index % paths.length]} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  )
}

function SectionIntro({ eyebrow, title, copy }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ff4b2d]">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-black leading-tight text-[#0f172a] sm:text-5xl">{title}</h2>
      {copy ? <p className="mt-4 text-base font-semibold leading-8 text-[#475569]">{copy}</p> : null}
    </div>
  )
}

export function BpoServiceLandingPage({
  eyebrow = 'Enterprise BPO Service',
  heading,
  subheading,
  primaryCta,
  secondaryCta = 'Talk to Expert',
  stats,
  features,
  workflowTitle,
  workflow,
  trustItems = defaultTrustItems,
}) {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)

  return (
    <main className="overflow-hidden bg-white text-[#0f172a]">
      <section className="relative isolate px-5 pb-16 pt-32 sm:pt-36 lg:pt-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_14%,rgba(255,75,45,0.14),transparent_30%),radial-gradient(circle_at_86%_12%,rgba(255,107,74,0.12),transparent_28%),linear-gradient(180deg,#ffffff,#f8fafc)]" />
        <div className="absolute left-1/2 top-24 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-[#ff4b2d]/12 blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.04fr_0.96fr]">
          <div>
            <div className="inline-flex rounded-full border border-[rgba(15,23,42,0.08)] bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#ff4b2d] shadow-xl shadow-slate-900/5 backdrop-blur">
              {eyebrow}
            </div>
            <h1 className="mt-7 max-w-4xl text-4xl font-black leading-[1.02] text-[#0f172a] sm:text-6xl lg:text-7xl">
              {heading}
            </h1>
            <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-[#475569] sm:text-lg">
              {subheading}
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="mailto:hello@cromgentechnology.com"
                className="group inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#ff4b2d] to-[#ff6b4a] px-7 py-4 text-sm font-black uppercase tracking-[0.12em] text-white shadow-2xl shadow-[#ff4b2d]/25 transition duration-300 hover:-translate-y-1 hover:shadow-[#ff4b2d]/40"
              >
                {primaryCta}
                <span className="ml-3 transition duration-300 group-hover:translate-x-1">-&gt;</span>
              </a>
              <button
                type="button"
                onClick={() => setIsLeadModalOpen(true)}
                className="inline-flex items-center justify-center rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white/80 px-7 py-4 text-sm font-black uppercase tracking-[0.12em] text-[#0f172a] shadow-xl shadow-slate-900/5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#ff4b2d]/40 hover:text-[#ff4b2d]"
              >
                {secondaryCta}
              </button>
            </div>

            <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
              {stats.map((item) => (
                <article key={item} className="rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white/80 p-5 shadow-xl shadow-slate-900/5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#ff4b2d]/40 hover:shadow-[#ff4b2d]/10">
                  <strong className="block text-lg font-black text-[#0f172a]">{item}</strong>
                </article>
              ))}
            </div>
          </div>

          <div className="relative rounded-[2rem] border border-[rgba(15,23,42,0.08)] bg-white/80 p-6 shadow-2xl shadow-slate-900/10 backdrop-blur-xl">
            <div className="absolute right-8 top-8 h-28 w-28 rounded-full bg-[#ff4b2d]/18 blur-2xl" />
            <div className="relative rounded-3xl border border-[rgba(15,23,42,0.08)] bg-[#f8fafc] p-5">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#64748b]">Campaign Desk</p>
                  <h2 className="mt-2 text-xl font-black text-[#0f172a]">Live Operations</h2>
                </div>
                <span className="rounded-full bg-[#fff1ed] px-3 py-1 text-xs font-black text-[#ff4b2d]">Active</span>
              </div>
              <div className="grid gap-4">
                {['Agent Capacity', 'Call Quality', 'Report Readiness'].map((label, index) => (
                  <div key={label} className="rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white p-4 transition duration-300 hover:-translate-y-1 hover:border-[#ff4b2d]/40">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-[#475569]">{label}</span>
                      <strong className="text-2xl font-black text-[#ff4b2d]">{92 - index * 6}%</strong>
                    </div>
                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#e2e8f0]">
                      <i className="block h-full rounded-full bg-gradient-to-r from-[#ff4b2d] to-[#ff6b4a]" style={{ width: `${92 - index * 6}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[rgba(15,23,42,0.08)] bg-[#f8fafc] px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Service Features"
            title="Built for professional customer communication and measurable execution."
            copy="Every workflow is structured around scripts, CRM updates, quality checks, and reporting discipline."
          />
          <div className="mt-11 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {features.map((feature, index) => (
              <article key={feature} className="group rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white/85 p-6 shadow-xl shadow-slate-900/5 backdrop-blur transition duration-300 hover:-translate-y-2 hover:border-[#ff4b2d]/50 hover:shadow-[#ff4b2d]/10">
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-[#fff1ed] text-[#ff4b2d] transition duration-300 group-hover:bg-[#ff4b2d] group-hover:text-white">
                  <BpoIcon index={index} />
                </div>
                <h3 className="text-lg font-black text-[#0f172a]">{feature}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-[#475569]">
                  Enterprise-ready execution with clear documentation, trained agents, and operational visibility.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-[rgba(15,23,42,0.08)] bg-white p-6 shadow-2xl shadow-slate-900/8 sm:p-8 lg:p-10">
          <SectionIntro
            eyebrow="Workflow"
            title={workflowTitle}
            copy="A simple operating model keeps every campaign organized from planning to reporting."
          />
          <div className="mt-11 grid gap-4 lg:grid-cols-4">
            {workflow.map((step, index) => (
              <article key={step} className="group relative rounded-2xl border border-[rgba(15,23,42,0.08)] bg-[#f8fafc] p-6 transition duration-300 hover:-translate-y-2 hover:border-[#ff4b2d]/50 hover:bg-white hover:shadow-xl hover:shadow-[#ff4b2d]/10">
                {index < workflow.length - 1 ? (
                  <span className="absolute left-[calc(100%-8px)] top-10 hidden h-px w-8 bg-gradient-to-r from-[#ff4b2d] to-transparent lg:block" />
                ) : null}
                <span className="absolute -top-4 left-6 grid h-10 w-10 place-items-center rounded-2xl bg-[#ff4b2d] text-sm font-black text-white shadow-lg shadow-[#ff4b2d]/25">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="mt-5 grid h-12 w-12 place-items-center rounded-2xl bg-white text-[#ff4b2d]">
                  <BpoIcon index={index} />
                </div>
                <h3 className="mt-5 text-xl font-black text-[#0f172a]">{step}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f8fafc] px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Enterprise Trust"
            title="Reliable BPO delivery controls for growing businesses."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {trustItems.map((item, index) => (
              <article key={item} className="rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white p-6 shadow-xl shadow-slate-900/5 transition duration-300 hover:-translate-y-2 hover:border-[#ff4b2d]/50 hover:shadow-[#ff4b2d]/10">
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-[#fff1ed] text-[#ff4b2d]">
                  <BpoIcon index={index} />
                </div>
                <strong className="text-lg font-black text-[#0f172a]">{item}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>
      <LeadCaptureModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        serviceName={heading}
      />
    </main>
  )
}
