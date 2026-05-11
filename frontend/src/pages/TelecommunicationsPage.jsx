import { useState } from 'react'
import { LeadCaptureModal } from '../components/LeadCaptureModal.jsx'
import { getServiceLink } from '../data/services.js'

const telecomServices = [
  ['VoIP Setup', 'Deploy business VoIP systems with secure configuration, call quality planning, and team-ready calling workflows.'],
  ['PBX System Setup', 'Configure PBX infrastructure for extensions, queues, routing, call handling, and enterprise communication control.'],
  ['SIP Trunking', 'Set up SIP trunk connectivity for scalable voice capacity, cost control, and dependable business calling.'],
  ['Call Routing Solutions', 'Route calls by department, time, priority, location, or business logic to reduce missed communication.'],
  ['IVR Configuration', 'Design IVR menus, prompts, queues, escalation flows, and automated caller navigation.'],
  ['Business Phone Systems', 'Modern office phone systems with extensions, user roles, call transfers, and professional calling features.'],
  ['Telecom Billing Support', 'Billing review, usage visibility, plan coordination, invoice support, and telecom cost management assistance.'],
  ['Internet Connectivity Support', 'Connectivity coordination, ISP support, failover planning, router checks, and uptime-focused troubleshooting.'],
  ['Call Recording Setup', 'Secure call recording workflows for compliance, quality review, training, and management visibility.'],
  ['Cloud Telephony', 'Cloud-based phone systems for distributed teams, remote agents, flexible routing, and scalable voice operations.'],
  ['Number Porting Support', 'Support for number transfer planning, documentation, carrier coordination, and continuity checks.'],
  ['Contact Center Telephony', 'Telephony setup for support teams with queues, routing, IVR, recordings, and supervisor controls.'],
]

const heroStats = [
  ['12+', 'Telecom Services'],
  ['VoIP', 'Ready Systems'],
  ['Secure', 'Call Routing'],
]

const trustCards = [
  'VoIP Infrastructure',
  'PBX Configuration',
  'SIP Trunk Support',
  'Secure Call Routing',
  'IVR & Automation',
  'Contact Center Ready',
]

const processSteps = [
  ['01', 'Communication Audit', 'Review calling workflows, current providers, call volume, routing needs, and communication gaps.'],
  ['02', 'System Design', 'Plan PBX, SIP trunks, IVR, routing logic, recording controls, and team access structure.'],
  ['03', 'Telecom Setup', 'Configure numbers, extensions, call flows, devices, cloud telephony, and contact center controls.'],
  ['04', 'Testing and Support', 'Test call quality, failover, routing, recordings, and provide ongoing support visibility.'],
]

function TelecomIcon({ index }) {
  const paths = [
    'M6 2h12v20H6zM9 18h6',
    'M4 12a8 8 0 0 1 16 0v5a3 3 0 0 1-3 3h-2v-5h4v-3a7 7 0 0 0-14 0v3h4v5H7a3 3 0 0 1-3-3v-5z',
    'M5 12h4l3-6 3 12 3-6h1',
    'M4 7h5l3 5-3 5H4M15 7h5v10h-5',
    'M6 8h12M8 12h8M10 16h4',
    'M7 4h10v16H7zM10 7h4M10 17h4',
    'M5 6h14v12H5zM8 10h8M8 14h5',
    'M4 12h4m8 0h4M8 12a4 4 0 0 1 8 0M6 18h12',
    'M8 5h8v14H8zM10 8h4M10 12h4M10 16h2',
    'M7 18a4 4 0 0 1 .8-7.9A5 5 0 0 1 17 9a4.5 4.5 0 0 1 .5 9H7z',
    'M6 6h12v12H6zM9 9h6v6H9zM4 10h2m12 0h2M4 14h2m12 0h2',
    'M5 12c3-5 11-5 14 0M8 15c2-3 7-3 9 0M11 18h2',
  ]

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
      <path d={paths[index % paths.length]} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  )
}

export function TelecommunicationsPage() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)

  return (
    <main className="overflow-hidden bg-[#0f172a] text-white">
      <section className="relative isolate px-5 pb-20 pt-32 sm:pt-36 lg:pt-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_12%,rgba(255,75,45,0.22),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(34,211,238,0.14),transparent_32%),linear-gradient(135deg,#0f172a,#111827_50%,#050816)]" />
        <div className="absolute right-8 top-24 -z-10 h-80 w-80 rounded-full bg-[#ff4b2d]/18 blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.04fr_0.96fr]">
          <div>
            <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#ffb39f] shadow-2xl shadow-black/20 backdrop-blur">
              Enterprise Cloud Telephony
            </div>
            <h1 className="mt-7 max-w-4xl text-4xl font-black leading-[1.02] text-white sm:text-6xl lg:text-7xl">
              Telecommunications Services
            </h1>
            <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-slate-300 sm:text-lg">
              VoIP, PBX, SIP trunks, call routing, IVR, cloud telephony, and secure communication infrastructure for modern teams.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="mailto:hello@cromgentechnology.com"
                className="group inline-flex items-center justify-center rounded-2xl bg-[#ff4b2d] px-7 py-4 text-sm font-black uppercase tracking-[0.12em] text-white shadow-2xl shadow-[#ff4b2d]/30 transition duration-300 hover:-translate-y-1 hover:bg-[#ff6348]"
              >
                Start Project
                <span className="ml-3 transition duration-300 group-hover:translate-x-1">→</span>
              </a>
              <button
                type="button"
                onClick={() => setIsLeadModalOpen(true)}
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/8 px-7 py-4 text-sm font-black uppercase tracking-[0.12em] text-white shadow-xl shadow-black/20 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#ff4b2d]/60 hover:bg-white/14"
              >
                Talk to Expert
              </button>
              <a
                href="/"
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-[#111827]/80 px-7 py-4 text-sm font-black uppercase tracking-[0.12em] text-white shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:bg-white/10"
              >
                Back Home
              </a>
            </div>

            <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
              {heroStats.map(([value, label]) => (
                <article key={label} className="rounded-2xl border border-white/10 bg-white/6 p-5 shadow-xl shadow-black/20 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#ff4b2d]/50">
                  <strong className="block text-3xl font-black text-[#ff4b2d]">{value}</strong>
                  <span className="mt-2 block text-xs font-black uppercase tracking-[0.13em] text-slate-300">{label}</span>
                </article>
              ))}
            </div>
          </div>

          <div className="tel-premium-visual relative rounded-[2rem] border border-white/10 bg-white/8 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl">
            <div className="absolute right-8 top-8 h-28 w-28 rounded-full bg-[#ff4b2d]/25 blur-2xl" />
            <div className="absolute bottom-10 left-8 h-28 w-28 rounded-full bg-cyan-300/12 blur-2xl" />
            <div className="relative rounded-3xl border border-white/10 bg-[#111827]/90 p-5">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Voice Network</p>
                  <h2 className="mt-2 text-xl font-black text-white">Telephony Control</h2>
                </div>
                <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-black text-emerald-300">Connected</span>
              </div>

              <div className="grid gap-4">
                {[
                  ['Call Routing Health', '98%', '98%'],
                  ['SIP Availability', '99%', '99%'],
                  ['IVR Automation', '86%', '86%'],
                ].map(([label, value, width]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-white/6 p-4 transition duration-300 hover:border-[#ff4b2d]/50 hover:bg-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-300">{label}</span>
                      <strong className="text-2xl font-black text-[#ff8a75]">{value}</strong>
                    </div>
                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                      <i className="block h-full rounded-full bg-gradient-to-r from-[#ff4b2d] to-cyan-200" style={{ width }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3">
                {['VoIP', 'PBX', 'SIP'].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-[#0f172a] p-4 text-center text-sm font-black text-white">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#111827] px-5 py-14">
        <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {trustCards.map((item) => (
            <article key={item} className="rounded-2xl border border-white/10 bg-white/6 p-6 shadow-xl shadow-black/20 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#ff4b2d]/50 hover:bg-white/10">
              <strong className="block text-xl font-black text-white">{item}</strong>
              <span className="mt-3 block text-sm font-semibold leading-7 text-slate-300">Enterprise communication controls for secure, scalable, and dependable voice operations.</span>
            </article>
          ))}
        </div>
      </section>

      <section className="relative px-5 py-20">
        <div className="absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(circle_at_50%_0%,rgba(255,75,45,0.13),transparent_36%)]" />
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ff8a75]">Telecom Capabilities</p>
            <h2 className="mt-4 text-3xl font-black leading-tight text-white sm:text-5xl">
              Premium VoIP, PBX, and cloud telephony services for modern teams.
            </h2>
          </div>

          <div className="mt-11 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {telecomServices.map(([title, copy], index) => (
              <article key={title} className="group rounded-2xl border border-white/10 bg-white/6 p-6 shadow-xl shadow-black/20 backdrop-blur transition duration-300 hover:-translate-y-2 hover:border-[#ff4b2d]/60 hover:bg-white/10 hover:shadow-[#ff4b2d]/12">
                <div className="mb-6 flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#ff4b2d] text-sm font-black text-white shadow-lg shadow-[#ff4b2d]/30">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/8 text-[#ff8a75]">
                    <TelecomIcon index={index} />
                  </span>
                </div>
                <h3 className="text-xl font-black text-white">{title}</h3>
                <p className="mt-4 text-sm font-semibold leading-7 text-slate-300">{copy}</p>
                <a href={getServiceLink('telecommunications', title)} className="mt-6 inline-flex text-sm font-black text-[#ff8a75] transition duration-300 group-hover:translate-x-1">
                  Open service page
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-24">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8 lg:p-10">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ff8a75]">Delivery Process</p>
            <h2 className="mt-4 text-3xl font-black text-white sm:text-5xl">Delivery Process</h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-300">
              Simple process, clear reporting, professional execution.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-4">
            {processSteps.map(([number, title, copy], index) => (
              <article key={title} className="group relative rounded-2xl border border-white/10 bg-[#0f172a]/80 p-6 transition duration-300 hover:-translate-y-2 hover:border-[#ff4b2d]/60 hover:bg-[#111827]">
                {index < processSteps.length - 1 ? (
                  <span className="absolute left-[calc(100%-8px)] top-10 hidden h-px w-8 bg-gradient-to-r from-[#ff4b2d] to-transparent lg:block" />
                ) : null}
                <span className="absolute -top-4 left-6 grid h-10 w-10 place-items-center rounded-2xl bg-[#ff4b2d] text-sm font-black text-white shadow-lg shadow-[#ff4b2d]/30">
                  {number}
                </span>
                <div className="mt-5 grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/8 text-[#ff8a75]">
                  <TelecomIcon index={index} />
                </div>
                <h3 className="mt-5 text-xl font-black text-white">{title}</h3>
                <p className="mt-4 text-sm font-semibold leading-7 text-slate-300">{copy}</p>
                <i className="mt-6 block h-1 w-12 rounded-full bg-[#ff4b2d] transition duration-300 group-hover:w-20" />
              </article>
            ))}
          </div>
        </div>
      </section>
      <LeadCaptureModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        serviceName="Telecommunications Services"
      />
    </main>
  )
}
