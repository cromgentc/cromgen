import { useState } from 'react'
import { LeadCaptureModal } from '../components/LeadCaptureModal.jsx'
import { getServiceLink } from '../data/services.js'

const softwareServices = [
  ['Custom Website Development', 'High-performance business websites with premium UI, conversion flow, CMS-ready content, and responsive delivery.'],
  ['Web Application Development', 'Custom browser-based platforms for operations, customer portals, workflows, dashboards, and business tools.'],
  ['Mobile App Development', 'Scalable mobile application planning and development for customer, staff, and business use cases.'],
  ['SaaS Platform Development', 'Multi-tenant SaaS products with subscriptions, roles, dashboards, billing readiness, and scalable architecture.'],
  ['E-commerce Development', 'Online stores, catalogs, checkout flows, order workflows, product management, and conversion-focused commerce.'],
  ['CRM Development', 'Custom CRM systems for lead tracking, sales pipelines, customer records, follow-ups, and management reporting.'],
  ['ERP Software Development', 'Enterprise workflow systems for operations, finance, inventory, HR, approvals, and internal process control.'],
  ['API Development & Integration', 'Secure APIs, third-party integrations, payment systems, CRM sync, automation, and data exchange workflows.'],
  ['Dashboard & Admin Panel Development', 'Executive dashboards and admin panels with role controls, charts, tables, filters, and operational actions.'],
  ['UI/UX Design', 'Product design systems, wireframes, user journeys, interface design, and conversion-friendly user experience planning.'],
  ['Frontend Development', 'Fast, responsive, accessible interfaces built with modern component architecture and clean interaction patterns.'],
  ['Backend Development', 'Secure server-side systems, APIs, authentication, business logic, database access, and service orchestration.'],
  ['Database Design', 'Relational and document database planning, schema design, indexing, data integrity, and performance thinking.'],
  ['Software Testing & QA', 'Functional testing, regression checks, usability review, bug tracking, release validation, and quality assurance.'],
  ['DevOps & Deployment', 'CI/CD readiness, hosting setup, environment configuration, deployment pipelines, and production release support.'],
  ['Maintenance & Support', 'Continuous updates, bug fixes, monitoring, small improvements, security patches, and long-term care.'],
  ['MVP Development', 'Focused product builds that validate ideas quickly with the right core features and scalable foundations.'],
  ['Legacy Software Modernization', 'Upgrade old systems, improve UX, modernize architecture, migrate data, and reduce operational risk.'],
]

const heroStats = [
  ['18+', 'Development Services'],
  ['Agile', 'Delivery Process'],
  ['Full', 'Product Lifecycle'],
]

const trustCards = [
  'Scalable Architecture',
  'Secure Codebase',
  'Agile Sprint Delivery',
  'Cloud Deployment',
  'QA-Tested Products',
  'Long-Term Support',
]

const processSteps = [
  ['01', 'Product Discovery', 'Clarify business goals, users, features, workflows, technical scope, and success criteria.'],
  ['02', 'UI and Architecture', 'Design product experience, system structure, data model, roles, integrations, and release roadmap.'],
  ['03', 'Agile Development', 'Build in focused iterations with demos, reviews, sprint updates, and transparent progress tracking.'],
  ['04', 'QA and Deployment', 'Test, validate, deploy, monitor, and support the product through production readiness.'],
]

function SoftwareIcon({ index }) {
  const paths = [
    'M4 6h16v12H4zM8 10h8M8 14h5',
    'M5 5h14v14H5zM8 9h8M8 13h5',
    'M8 3h8v18H8zM10 6h4M10 18h4',
    'M4 8h16M8 4v16M16 4v16M4 16h16',
    'M4 7h16v10H4zM8 11h8',
    'M5 5h14v14H5zM8 8h8v3H8zM8 14h5',
    'M4 6h16v4H4zM4 14h16v4H4z',
    'M8 12h8M12 8v8M5 5h14v14H5z',
    'M4 5h16v14H4zM8 9h4M8 13h8M8 17h5',
    'M4 16l4-8 4 8 4-8 4 8',
    'M8 7l-4 5 4 5M16 7l4 5-4 5M14 5l-4 14',
    'M5 7h14M7 7v10h10V7M9 11h6',
    'M5 7c0-2 14-2 14 0v10c0 2-14 2-14 0V7zm0 5c0 2 14 2 14 0',
    'M5 12l4 4 10-10M5 6h10M5 18h14',
    'M4 17h16M6 17V7h12v10M9 10h6',
    'M12 3l8 4v10l-8 4-8-4V7l8-4z',
    'M4 12h5l3-6 3 12 3-6h2',
    'M6 6h12v12H6zM9 9h6v6H9zM4 10h2m12 0h2M4 14h2m12 0h2',
  ]

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
      <path d={paths[index % paths.length]} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  )
}

export function SoftwareDevelopmentServicesPage() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)

  return (
    <main className="overflow-hidden bg-[#0f172a] text-white">
      <section className="relative isolate px-5 pb-20 pt-32 sm:pt-36 lg:pt-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_12%,rgba(255,75,45,0.22),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(168,85,247,0.16),transparent_32%),linear-gradient(135deg,#0f172a,#111827_50%,#050816)]" />
        <div className="absolute left-8 top-24 -z-10 h-80 w-80 rounded-full bg-[#ff4b2d]/18 blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.04fr_0.96fr]">
          <div>
            <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#ffb39f] shadow-2xl shadow-black/20 backdrop-blur">
              Enterprise Product Engineering
            </div>
            <h1 className="mt-7 max-w-4xl text-4xl font-black leading-[1.02] text-white sm:text-6xl lg:text-7xl">
              Software Development Services
            </h1>
            <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-slate-300 sm:text-lg">
              Custom websites, web applications, SaaS platforms, mobile apps, CRM, ERP, APIs, and enterprise software solutions built for growth, security, and scalability.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="mailto:hello@cromgentechnology.com"
                className="group inline-flex items-center justify-center rounded-2xl bg-[#ff4b2d] px-7 py-4 text-sm font-black uppercase tracking-[0.12em] text-white shadow-2xl shadow-[#ff4b2d]/30 transition duration-300 hover:-translate-y-1 hover:bg-[#ff6348]"
              >
                Start Your Project
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

          <div className="sw-premium-visual relative rounded-[2rem] border border-white/10 bg-white/8 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl">
            <div className="absolute right-8 top-8 h-28 w-28 rounded-full bg-[#ff4b2d]/25 blur-2xl" />
            <div className="absolute bottom-10 left-8 h-28 w-28 rounded-full bg-purple-300/12 blur-2xl" />
            <div className="relative rounded-3xl border border-white/10 bg-[#111827]/90 p-5">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Engineering Console</p>
                  <h2 className="mt-2 text-xl font-black text-white">Product Delivery</h2>
                </div>
                <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-black text-emerald-300">Shipping</span>
              </div>

              <div className="grid gap-4">
                {[
                  ['Sprint Velocity', '92%', '92%'],
                  ['Code Quality', '96%', '96%'],
                  ['Release Readiness', '89%', '89%'],
                ].map(([label, value, width]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-white/6 p-4 transition duration-300 hover:border-[#ff4b2d]/50 hover:bg-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-300">{label}</span>
                      <strong className="text-2xl font-black text-[#ff8a75]">{value}</strong>
                    </div>
                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                      <i className="block h-full rounded-full bg-gradient-to-r from-[#ff4b2d] to-purple-200" style={{ width }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3">
                {['Web', 'SaaS', 'API'].map((item) => (
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
              <span className="mt-3 block text-sm font-semibold leading-7 text-slate-300">Enterprise software delivery controls for reliable, secure, and scalable product growth.</span>
            </article>
          ))}
        </div>
      </section>

      <section className="relative px-5 py-20">
        <div className="absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(circle_at_50%_0%,rgba(255,75,45,0.13),transparent_36%)]" />
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ff8a75]">Development Capabilities</p>
            <h2 className="mt-4 text-3xl font-black leading-tight text-white sm:text-5xl">
              Premium software development for products, platforms, and enterprise workflows.
            </h2>
          </div>

          <div className="mt-11 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {softwareServices.map(([title, copy], index) => (
              <article key={title} className="group rounded-2xl border border-white/10 bg-white/6 p-6 shadow-xl shadow-black/20 backdrop-blur transition duration-300 hover:-translate-y-2 hover:border-[#ff4b2d]/60 hover:bg-white/10 hover:shadow-[#ff4b2d]/12">
                <div className="mb-6 flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#ff4b2d] text-sm font-black text-white shadow-lg shadow-[#ff4b2d]/30">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/8 text-[#ff8a75]">
                    <SoftwareIcon index={index} />
                  </span>
                </div>
                <h3 className="text-xl font-black text-white">{title}</h3>
                <p className="mt-4 text-sm font-semibold leading-7 text-slate-300">{copy}</p>
                <a href={getServiceLink('software-development-services', title)} className="mt-6 inline-flex text-sm font-black text-[#ff8a75] transition duration-300 group-hover:translate-x-1">
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
                  <SoftwareIcon index={index} />
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
        serviceName="Software Development Services"
      />
    </main>
  )
}
