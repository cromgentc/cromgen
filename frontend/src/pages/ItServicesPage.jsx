import { useState } from 'react'
import { LeadCaptureModal } from '../components/LeadCaptureModal.jsx'
import { getServiceLink } from '../data/services.js'

const itServices = [
  ['Managed IT Support', 'End-to-end IT operations support for users, systems, devices, and business-critical technology workflows.'],
  ['Cloud Infrastructure Setup', 'Secure cloud architecture, migration planning, hosting setup, and scalable infrastructure deployment.'],
  ['Cybersecurity Services', 'Threat protection, access control, security hardening, monitoring, and risk-focused defense planning.'],
  ['Network Setup & Management', 'Reliable LAN, Wi-Fi, routing, switching, network documentation, and performance management.'],
  ['Server Administration', 'Server setup, maintenance, patching, access management, performance tuning, and uptime support.'],
  ['Data Backup & Recovery', 'Backup strategy, recovery planning, business continuity controls, and data restoration workflows.'],
  ['IT Helpdesk Support', 'Responsive user support for troubleshooting, ticket handling, remote assistance, and issue resolution.'],
  ['Endpoint Device Management', 'Laptop, desktop, mobile, and endpoint policy management with security and inventory visibility.'],
  ['Microsoft 365 Administration', 'Microsoft 365 setup, mailbox management, Teams, SharePoint, security, and user administration.'],
  ['Google Workspace Setup', 'Workspace deployment, Gmail, Drive, admin controls, migration support, and collaboration setup.'],
  ['Firewall & VPN Setup', 'Firewall configuration, VPN access, secure remote connectivity, traffic rules, and perimeter protection.'],
  ['IT Asset Management', 'Asset tracking, lifecycle control, software inventory, device allocation, and compliance visibility.'],
  ['Remote Desktop Support', 'Secure remote troubleshooting, user support, software fixes, and device assistance without downtime.'],
  ['System Monitoring', 'Proactive system health monitoring, alerts, availability checks, and performance visibility.'],
  ['Database Administration', 'Database maintenance, access control, backup coordination, tuning, and reliability support.'],
  ['IT Consulting & Audit', 'Technology audits, infrastructure review, security checks, roadmap planning, and executive recommendations.'],
]

const heroStats = [
  ['16+', 'IT Service Areas'],
  ['99%', 'Uptime Focus'],
  ['24/7', 'Monitoring Option'],
]

const trustCards = [
  'Secure Infrastructure',
  'Cloud-Ready Systems',
  'SLA-Based Support',
  'Proactive Monitoring',
  'Backup & Recovery',
  'Scalable IT Operations',
]

const processSteps = [
  ['01', 'Infrastructure Audit', 'Review systems, networks, users, devices, cloud tools, risks, and operational gaps.'],
  ['02', 'Security Planning', 'Define protection layers, access controls, backup policy, monitoring rules, and response plans.'],
  ['03', 'System Implementation', 'Deploy infrastructure improvements, security controls, cloud services, and support workflows.'],
  ['04', 'Monitoring and Support', 'Track health, respond to tickets, optimize performance, and report clearly to leadership.'],
]

function ITIcon({ index }) {
  const paths = [
    'M4 5h16v10H4zM8 19h8M12 15v4',
    'M7 18a4 4 0 0 1 .8-7.9A5 5 0 0 1 17 9a4.5 4.5 0 0 1 .5 9H7z',
    'M12 3l8 4v5c0 5-3.3 8-8 9-4.7-1-8-4-8-9V7l8-4z',
    'M5 12h4m6 0h4M9 12a3 3 0 1 0 6 0 3 3 0 0 0-6 0zM12 5v4m0 6v4',
    'M6 4h12v16H6zM9 8h6M9 12h6M9 16h3',
    'M4 7h16v10H4zM8 11h8M8 15h4',
    'M4 12a8 8 0 0 1 16 0v5a3 3 0 0 1-3 3h-2v-5h4v-3a7 7 0 0 0-14 0v3h4v5H7a3 3 0 0 1-3-3v-5z',
    'M8 3h8v18H8zM10 6h4M10 18h4',
    'M4 6h16v12H4zM8 10h8M8 14h5',
    'M5 5h14v14H5zM8 8h8v8H8z',
    'M4 12h16M7 8h10M7 16h10M9 4h6M9 20h6',
    'M4 6h16v4H4zM4 14h16v4H4z',
    'M5 5h14v10H5zM9 19h6M12 15v4',
    'M4 12l4 4 4-8 4 8 4-4',
    'M5 7c0-2 14-2 14 0v10c0 2-14 2-14 0V7zm0 5c0 2 14 2 14 0',
    'M6 6h12v12H6zM9 9h6v6H9zM4 10h2m12 0h2M4 14h2m12 0h2',
  ]

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
      <path d={paths[index % paths.length]} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  )
}

export function ItServicesPage() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)

  return (
    <main className="overflow-hidden bg-[#0f172a] text-white">
      <section className="relative isolate px-5 pb-20 pt-32 sm:pt-36 lg:pt-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_12%,rgba(255,75,45,0.22),transparent_34%),radial-gradient(circle_at_82%_16%,rgba(59,130,246,0.16),transparent_32%),linear-gradient(135deg,#0f172a,#111827_50%,#050816)]" />
        <div className="absolute right-8 top-24 -z-10 h-80 w-80 rounded-full bg-[#ff4b2d]/18 blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.04fr_0.96fr]">
          <div>
            <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#ffb39f] shadow-2xl shadow-black/20 backdrop-blur">
              Enterprise IT Operations
            </div>
            <h1 className="mt-7 max-w-4xl text-4xl font-black leading-[1.02] text-white sm:text-6xl lg:text-7xl">
              IT Services
            </h1>
            <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-slate-300 sm:text-lg">
              Enterprise-grade IT support, cloud infrastructure, cybersecurity, and system management solutions designed for secure and scalable business operations.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="mailto:hello@cromgentechnology.com"
                className="group inline-flex items-center justify-center rounded-2xl bg-[#ff4b2d] px-7 py-4 text-sm font-black uppercase tracking-[0.12em] text-white shadow-2xl shadow-[#ff4b2d]/30 transition duration-300 hover:-translate-y-1 hover:bg-[#ff6348]"
              >
                Get IT Support
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

            <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
              {heroStats.map(([value, label]) => (
                <article key={label} className="rounded-2xl border border-white/10 bg-white/6 p-5 shadow-xl shadow-black/20 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#ff4b2d]/50">
                  <strong className="block text-3xl font-black text-[#ff4b2d]">{value}</strong>
                  <span className="mt-2 block text-xs font-black uppercase tracking-[0.13em] text-slate-300">{label}</span>
                </article>
              ))}
            </div>
          </div>

          <div className="it-premium-visual relative rounded-[2rem] border border-white/10 bg-white/8 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl">
            <div className="absolute right-8 top-8 h-28 w-28 rounded-full bg-[#ff4b2d]/25 blur-2xl" />
            <div className="absolute bottom-10 left-8 h-28 w-28 rounded-full bg-blue-300/12 blur-2xl" />
            <div className="relative rounded-3xl border border-white/10 bg-[#111827]/90 p-5">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Security Operations</p>
                  <h2 className="mt-2 text-xl font-black text-white">Infrastructure Health</h2>
                </div>
                <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-black text-emerald-300">Protected</span>
              </div>

              <div className="grid gap-4">
                {[
                  ['Uptime Focus', '99%', '99%'],
                  ['Threat Shield', '96%', '96%'],
                  ['Backup Readiness', '92%', '92%'],
                ].map(([label, value, width]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-white/6 p-4 transition duration-300 hover:border-[#ff4b2d]/50 hover:bg-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-300">{label}</span>
                      <strong className="text-2xl font-black text-[#ff8a75]">{value}</strong>
                    </div>
                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                      <i className="block h-full rounded-full bg-gradient-to-r from-[#ff4b2d] to-blue-200" style={{ width }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3">
                {['Cloud', 'SOC', 'Backup'].map((item) => (
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
              <span className="mt-3 block text-sm font-semibold leading-7 text-slate-300">Enterprise IT controls designed for secure, resilient, and scalable operations.</span>
            </article>
          ))}
        </div>
      </section>

      <section className="relative px-5 py-20">
        <div className="absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(circle_at_50%_0%,rgba(255,75,45,0.13),transparent_36%)]" />
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ff8a75]">IT Capabilities</p>
            <h2 className="mt-4 text-3xl font-black leading-tight text-white sm:text-5xl">
              Premium IT services for secure infrastructure and dependable operations.
            </h2>
          </div>

          <div className="mt-11 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {itServices.map(([title, copy], index) => (
              <article key={title} className="group rounded-2xl border border-white/10 bg-white/6 p-6 shadow-xl shadow-black/20 backdrop-blur transition duration-300 hover:-translate-y-2 hover:border-[#ff4b2d]/60 hover:bg-white/10 hover:shadow-[#ff4b2d]/12">
                <div className="mb-6 flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#ff4b2d] text-sm font-black text-white shadow-lg shadow-[#ff4b2d]/30">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/8 text-[#ff8a75]">
                    <ITIcon index={index} />
                  </span>
                </div>
                <h3 className="text-xl font-black text-white">{title}</h3>
                <p className="mt-4 text-sm font-semibold leading-7 text-slate-300">{copy}</p>
                <a href={getServiceLink('it-services', title)} className="mt-6 inline-flex text-sm font-black text-[#ff8a75] transition duration-300 group-hover:translate-x-1">
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
                  <ITIcon index={index} />
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
        serviceName="IT Services"
      />
    </main>
  )
}
