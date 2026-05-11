import { useState } from 'react'
import { LeadCaptureModal } from '../components/LeadCaptureModal.jsx'
import { getServiceLink } from '../data/services.js'

const callCenterServices = [
  ['Inbound Customer Support', 'Professional customer assistance for product queries, complaints, escalations, and service requests.'],
  ['Outbound Calling', 'Structured calling campaigns for follow-ups, reminders, surveys, verification, and business outreach.'],
  ['Technical Support Helpdesk', 'Tiered technical support for troubleshooting, ticket creation, issue tracking, and resolution updates.'],
  ['Telemarketing', 'Conversion-focused calling campaigns with clear scripts, lead handling, and performance reporting.'],
  ['Lead Qualification', 'Filter enquiries, validate interest, capture requirements, and pass sales-ready leads to your team.'],
  ['Appointment Setting', 'Schedule meetings, demos, callbacks, and consultations with organized calendar coordination.'],
  ['Live Chat Support', 'Real-time website chat assistance for customer questions, lead capture, and support routing.'],
  ['Email Support', 'Professional inbox handling, customer replies, ticket updates, and written support workflows.'],
  ['Order Processing', 'Order entry, verification, status updates, return coordination, and customer communication support.'],
  ['Back Office Support', 'Operational documentation, CRM updates, data entry, verification, and admin process support.'],
  ['Customer Feedback Surveys', 'Structured feedback calls and survey reporting to understand service quality and customer sentiment.'],
  ['Payment Reminder Calls', 'Polite reminder workflows for payments, renewals, pending invoices, and customer follow-ups.'],
  ['IVR Setup & Call Routing', 'Call flow planning, IVR prompts, department routing, escalation logic, and queue structure.'],
  ['Multilingual Support', 'Language-capable support teams for wider customer coverage and better communication experience.'],
  ['Quality Monitoring & Training', 'Call audits, scorecards, agent coaching, script refinement, and service quality improvement.'],
]

const heroStats = [
  ['15+', 'Support Services'],
  ['24/7', 'Coverage Option'],
  ['QA', 'Call Monitoring'],
]

const trustCards = [
  'Trained Agents',
  'SLA-Based Operations',
  'Call Monitoring & QA',
  'Multilingual Support',
  'Daily/Weekly Reports',
  'Scalable Team Setup',
]

const processSteps = [
  ['01', 'Script and SLA Setup', 'Define call scripts, escalation rules, service levels, CRM fields, and response expectations.'],
  ['02', 'Agent Training', 'Train agents on product knowledge, tone, compliance, objection handling, and documentation quality.'],
  ['03', 'Live Operations', 'Launch inbound, outbound, chat, email, or blended support with supervisor visibility.'],
  ['04', 'Quality Review', 'Monitor calls, review reports, coach agents, and improve customer experience continuously.'],
]

function CallCenterIcon({ index }) {
  const paths = [
    'M4 12a8 8 0 0 1 16 0v5a3 3 0 0 1-3 3h-2v-5h4v-3a7 7 0 0 0-14 0v3h4v5H7a3 3 0 0 1-3-3v-5z',
    'M5 12h4l2 7 4-14 2 7h2',
    'M5 5h14v10H8l-3 4V5z',
    'M4 7h16M7 7v10h10V7M9 11h6',
    'M12 3l8 5v8l-8 5-8-5V8l8-5z',
    'M7 4h10v16H7zM10 17h4',
    'M6 18l-2 3V5h16v13H6zM8 9h8M8 13h5',
    'M4 7l8 6 8-6M4 7v10h16V7',
    'M5 7h14v10H5zM8 11h8',
    'M4 6h16v12H4zM8 10h8M8 14h5',
    'M5 12l4 4 10-10',
    'M6 6h12v12H6zM9 9h6v6H9z',
    'M6 8h12M8 12h8M10 16h4',
    'M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm-7 8h14M12 4c2 2 3 5 3 8s-1 6-3 8M12 4c-2 2-3 5-3 8s1 6 3 8',
    'M4 18V6m4 12v-8m4 8V4m4 14v-5m4 5V8',
  ]

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
      <path d={paths[index % paths.length]} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  )
}

export function CallCenterServicePage() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)

  return (
    <main className="overflow-hidden bg-[#0f172a] text-white">
      <section className="relative isolate px-5 pb-20 pt-32 sm:pt-36 lg:pt-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_12%,rgba(255,75,45,0.24),transparent_34%),radial-gradient(circle_at_86%_18%,rgba(56,189,248,0.12),transparent_32%),linear-gradient(135deg,#0f172a,#111827_50%,#070b16)]" />
        <div className="absolute left-10 top-24 -z-10 h-80 w-80 rounded-full bg-[#ff4b2d]/18 blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.04fr_0.96fr]">
          <div>
            <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#ffb39f] shadow-2xl shadow-black/20 backdrop-blur">
              Enterprise BPO Operations
            </div>
            <h1 className="mt-7 max-w-4xl text-4xl font-black leading-[1.02] text-white sm:text-6xl lg:text-7xl">
              Call Center Services
            </h1>
            <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-slate-300 sm:text-lg">
              Professional inbound, outbound, and customer support solutions designed to improve communication, response time, and customer experience.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="mailto:hello@cromgentechnology.com"
                className="group inline-flex items-center justify-center rounded-2xl bg-[#ff4b2d] px-7 py-4 text-sm font-black uppercase tracking-[0.12em] text-white shadow-2xl shadow-[#ff4b2d]/30 transition duration-300 hover:-translate-y-1 hover:bg-[#ff6348]"
              >
                Start Your Support Team
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

          <div className="cc-premium-visual relative rounded-[2rem] border border-white/10 bg-white/8 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl">
            <div className="absolute right-8 top-8 h-28 w-28 rounded-full bg-[#ff4b2d]/25 blur-2xl" />
            <div className="absolute bottom-10 left-8 h-28 w-28 rounded-full bg-cyan-300/12 blur-2xl" />
            <div className="relative rounded-3xl border border-white/10 bg-[#111827]/90 p-5">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Support Command Center</p>
                  <h2 className="mt-2 text-xl font-black text-white">Live Operations</h2>
                </div>
                <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-black text-emerald-300">Active</span>
              </div>

              <div className="grid gap-4">
                {[
                  ['Average Response', '18s', '88%'],
                  ['Resolved Tickets', '94%', '94%'],
                  ['QA Score', '97%', '97%'],
                ].map(([label, value, width]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-white/6 p-4 transition duration-300 hover:border-[#ff4b2d]/50 hover:bg-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-300">{label}</span>
                      <strong className="text-2xl font-black text-[#ff8a75]">{value}</strong>
                    </div>
                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                      <i className="block h-full rounded-full bg-gradient-to-r from-[#ff4b2d] to-orange-200" style={{ width }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3">
                {['Voice', 'Chat', 'Email'].map((item) => (
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
              <span className="mt-3 block text-sm font-semibold leading-7 text-slate-300">Enterprise-ready support controls for dependable customer communication.</span>
            </article>
          ))}
        </div>
      </section>

      <section className="relative px-5 py-20">
        <div className="absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(circle_at_50%_0%,rgba(255,75,45,0.13),transparent_36%)]" />
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ff8a75]">Support Services</p>
            <h2 className="mt-4 text-3xl font-black leading-tight text-white sm:text-5xl">
              Premium call center capabilities for scalable customer operations.
            </h2>
          </div>

          <div className="mt-11 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {callCenterServices.map(([title, copy], index) => (
              <article key={title} className="group rounded-2xl border border-white/10 bg-white/6 p-6 shadow-xl shadow-black/20 backdrop-blur transition duration-300 hover:-translate-y-2 hover:border-[#ff4b2d]/60 hover:bg-white/10 hover:shadow-[#ff4b2d]/12">
                <div className="mb-6 flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#ff4b2d] text-sm font-black text-white shadow-lg shadow-[#ff4b2d]/30">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/8 text-[#ff8a75]">
                    <CallCenterIcon index={index} />
                  </span>
                </div>
                <h3 className="text-xl font-black text-white">{title}</h3>
                <p className="mt-4 text-sm font-semibold leading-7 text-slate-300">{copy}</p>
                <a href={getServiceLink('call-center-service', title)} className="mt-6 inline-flex text-sm font-black text-[#ff8a75] transition duration-300 group-hover:translate-x-1">
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
                  <CallCenterIcon index={index} />
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
        serviceName="Call Center Services"
      />
    </main>
  )
}
