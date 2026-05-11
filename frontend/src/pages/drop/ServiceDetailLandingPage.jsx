import { useState } from 'react'
import { LEAD_ENDPOINTS, apiRequest } from '../../api/apiEndpoint.js'

const categoryContext = {
  'artificial-intelligence': {
    eyebrow: 'AI Solutions',
    outcome: 'intelligent automation, better decisions, and scalable AI adoption',
    stats: ['AI-Ready Workflow', 'Automation First', 'Data-Led Execution'],
    visualTitle: 'AI Delivery Console',
  },
  'digital-marketing': {
    eyebrow: 'Growth Solutions',
    outcome: 'lead generation, brand visibility, and measurable campaign performance',
    stats: ['Campaign Strategy', 'Lead-Focused', 'Weekly Reporting'],
    visualTitle: 'Marketing Growth Desk',
  },
  'call-center-service': {
    eyebrow: 'BPO Operations',
    outcome: 'customer communication, faster response time, and professional support operations',
    stats: ['Trained Agents', 'SLA Operations', 'QA Monitoring'],
    visualTitle: 'Support Operations Desk',
  },
  'it-services': {
    eyebrow: 'IT Operations',
    outcome: 'secure infrastructure, stable systems, and scalable technology operations',
    stats: ['Secure Systems', 'Monitoring Ready', 'SLA Support'],
    visualTitle: 'Infrastructure Control',
  },
  'software-development-services': {
    eyebrow: 'Software Delivery',
    outcome: 'custom products, secure platforms, and growth-ready digital systems',
    stats: ['Agile Delivery', 'Secure Codebase', 'Cloud Ready'],
    visualTitle: 'Product Delivery Board',
  },
  'hr-consultant': {
    eyebrow: 'Cromgen Rozgar',
    outcome: 'structured hiring, workforce coordination, and practical HR execution',
    stats: ['Hiring Workflow', 'Talent Pipeline', 'HR Coordination'],
    visualTitle: 'Rozgar Talent Desk',
  },
  telecommunications: {
    eyebrow: 'Telecom Solutions',
    outcome: 'secure communication, call routing, and cloud telephony operations',
    stats: ['VoIP Ready', 'Secure Routing', 'Contact Center Fit'],
    visualTitle: 'Telecom Network Desk',
  },
}

const capabilities = [
  ['Right Shoring', 'Flexible delivery models that align work to the right team, location, cost, and service priority.'],
  ['Multilingual', 'Support and communication workflows that help businesses serve customers across language needs.'],
  ['Omnichannel', 'Connected service operations across voice, email, chat, CRM, digital channels, and business systems.'],
  ['Quality Assurance', 'Review discipline, reporting, monitoring, and improvement cycles for professional execution.'],
]

export function ServiceDetailLandingPage({ detail }) {
  const { category, serviceName, relatedServices } = detail
  const context = categoryContext[category.slug] || categoryContext['software-development-services']
  const features = buildFeatures(serviceName, category)
  const process = buildProcess(serviceName, category)
  const trust = buildTrust(serviceName, category)
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)
  const [leadForm, setLeadForm] = useState({ name: '', email: '', phone: '', query: '' })
  const [leadStatus, setLeadStatus] = useState({ type: '', message: '' })
  const [isLeadSubmitting, setIsLeadSubmitting] = useState(false)

  const handleLeadChange = (event) => {
    setLeadForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }))
  }

  const openLeadModal = () => {
    setLeadStatus({ type: '', message: '' })
    setIsLeadModalOpen(true)
  }

  const closeLeadModal = () => {
    if (isLeadSubmitting) return
    setIsLeadModalOpen(false)
  }

  const handleLeadSubmit = async (event) => {
    event.preventDefault()
    setIsLeadSubmitting(true)
    setLeadStatus({ type: '', message: '' })

    try {
      await apiRequest(LEAD_ENDPOINTS.publicCreate, {
        method: 'POST',
        body: JSON.stringify({
          name: leadForm.name,
          email: leadForm.email,
          service: serviceName,
          query: [
            leadForm.phone ? `Phone: ${leadForm.phone}` : '',
            leadForm.query,
          ].filter(Boolean).join('\n\n'),
        }),
      })

      setLeadStatus({ type: 'success', message: 'Thank you. Our expert team will contact you shortly.' })
      setLeadForm({ name: '', email: '', phone: '', query: '' })
      window.setTimeout(() => {
        setIsLeadModalOpen(false)
        setLeadStatus({ type: '', message: '' })
      }, 1800)
    } catch (error) {
      setLeadStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Unable to submit lead right now.',
      })
    } finally {
      setIsLeadSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-white pt-32 text-[#0f172a] sm:pt-36 lg:pt-28">
      <section className="relative isolate overflow-hidden px-5 py-16 sm:py-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_14%,rgba(255,75,45,0.16),transparent_30%),radial-gradient(circle_at_84%_18%,rgba(255,107,74,0.12),transparent_28%),linear-gradient(180deg,#ffffff,#f8fafc)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.04fr_0.96fr]">
          <div>
            <span className="inline-flex rounded-full border border-[rgba(15,23,42,0.08)] bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#ff4b2d] shadow-xl shadow-slate-900/5 backdrop-blur">
              {context.eyebrow}
            </span>
            <h1 className="mt-7 text-4xl font-black leading-[1.03] text-[#0f172a] sm:text-6xl lg:text-7xl">
              {serviceName}
            </h1>
            <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-[#475569] sm:text-lg">
              Premium {serviceName.toLowerCase()} services for {context.outcome}. Built for Cromgen Technology clients that need clean execution, transparent coordination, and enterprise-ready delivery.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <button type="button" onClick={openLeadModal} className="rounded-2xl bg-gradient-to-r from-[#ff4b2d] to-[#ff6b4a] px-7 py-4 text-sm font-black uppercase tracking-[0.12em] text-white shadow-2xl shadow-[#ff4b2d]/25 transition duration-300 hover:-translate-y-1">
                Talk to Expert
              </button>
              <a href={`/${category.slug}`} className="rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white/80 px-7 py-4 text-sm font-black uppercase tracking-[0.12em] text-[#0f172a] shadow-xl shadow-slate-900/5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#ff4b2d]/40 hover:text-[#ff4b2d]">
                Back to {category.navTitle || category.title}
              </a>
            </div>
            <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
              {context.stats.map((item) => (
                <article key={item} className="rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white/80 p-5 shadow-xl shadow-slate-900/5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#ff4b2d]/40">
                  <strong className="text-lg font-black text-[#0f172a]">{item}</strong>
                </article>
              ))}
            </div>
          </div>

          <VisualCard title={context.visualTitle} serviceName={serviceName} />
        </div>
      </section>

      <section className="border-y border-[rgba(15,23,42,0.08)] bg-[#f8fafc] px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Service Capabilities"
            title={`What ${serviceName} includes.`}
            copy={`A focused delivery model for ${serviceName.toLowerCase()} with practical workflow planning, execution, reporting, and support.`}
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {features.map(([title, copy], index) => (
              <PremiumCard key={title} index={index} title={title} copy={copy} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Delivery Process"
            title="Simple process, clear reporting, professional execution."
            copy={`Cromgen Technology keeps ${serviceName.toLowerCase()} delivery organized from requirement review to launch, tracking, and improvement.`}
          />
          <div className="mt-10 grid gap-4 lg:grid-cols-4">
            {process.map((step, index) => (
              <article key={step} className="group relative rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white p-6 shadow-xl shadow-slate-900/5 transition duration-300 hover:-translate-y-2 hover:border-[#ff4b2d]/50 hover:shadow-[#ff4b2d]/10">
                {index < process.length - 1 ? <span className="absolute left-[calc(100%-8px)] top-10 hidden h-px w-8 bg-gradient-to-r from-[#ff4b2d] to-transparent lg:block" /> : null}
                <span className="absolute -top-4 left-6 grid h-10 w-10 place-items-center rounded-2xl bg-[#ff4b2d] text-sm font-black text-white">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="mt-8 text-xl font-black text-[#0f172a]">{step}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[rgba(15,23,42,0.08)] bg-[#f8fafc] px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Capabilities"
            title="Our Capabilities"
            copy="Flexible delivery, multilingual support, omnichannel operations, and quality-driven execution for modern businesses."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {capabilities.map(([title, copy], index) => (
              <PremiumCard key={title} index={index} title={title} copy={copy} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Enterprise Trust" title={`${serviceName} built for business confidence.`} />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {trust.map((item, index) => (
              <PremiumCard key={item} index={index} title={item} copy="Professional delivery with clear communication, practical reporting, and scalable enterprise coordination." />
            ))}
          </div>
        </div>
      </section>

      {relatedServices?.length ? (
        <section className="border-t border-[rgba(15,23,42,0.08)] bg-[#f8fafc] px-5 py-16">
          <div className="mx-auto max-w-7xl">
            <SectionTitle eyebrow="Explore More" title={`More ${category.navTitle || category.title} services.`} />
            <div className="mt-10 flex flex-wrap gap-3">
              {relatedServices.map((item) => (
                <a key={item} href={`/${category.slug}/${slugifyLocal(item)}`} className="rounded-full border border-[rgba(15,23,42,0.08)] bg-white px-5 py-3 text-xs font-black uppercase tracking-[0.12em] text-[#475569] shadow-lg shadow-slate-900/5 transition duration-300 hover:-translate-y-1 hover:border-[#ff4b2d]/40 hover:text-[#ff4b2d]">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </section>
      ) : null}
      {isLeadModalOpen ? (
        <LeadModal
          serviceName={serviceName}
          leadForm={leadForm}
          leadStatus={leadStatus}
          isLeadSubmitting={isLeadSubmitting}
          onChange={handleLeadChange}
          onClose={closeLeadModal}
          onSubmit={handleLeadSubmit}
        />
      ) : null}
    </main>
  )
}

function LeadModal({ serviceName, leadForm, leadStatus, isLeadSubmitting, onChange, onClose, onSubmit }) {
  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-[#0f172a]/55 px-4 py-6 backdrop-blur-md" role="dialog" aria-modal="true" aria-labelledby="lead-modal-title">
      <div className="w-full max-w-[560px] overflow-hidden rounded-[2rem] border border-white/60 bg-white shadow-2xl shadow-slate-950/25">
        <div className="border-b border-[rgba(15,23,42,0.08)] bg-gradient-to-r from-[#fff7f4] to-white px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ff4b2d]">Talk to Expert</p>
              <h2 id="lead-modal-title" className="mt-2 text-2xl font-black text-[#0f172a]">{serviceName}</h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-[#475569]">Fill your details and Cromgen Technology team will connect with you.</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white text-xl font-black text-[#475569] shadow-lg shadow-slate-900/5 transition hover:-translate-y-0.5 hover:border-[#ff4b2d]/40 hover:text-[#ff4b2d]"
              aria-label="Close lead form"
            >
              ×
            </button>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-5 p-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <LeadField label="Your Name" name="name" value={leadForm.name} onChange={onChange} required />
            <LeadField label="Email Address" name="email" type="email" value={leadForm.email} onChange={onChange} required />
            <LeadField label="Mobile Number" name="phone" type="tel" value={leadForm.phone} onChange={onChange} />
            <label>
              <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#475569]">Service</span>
              <input
                value={serviceName}
                readOnly
                className="min-h-[52px] w-full rounded-2xl border border-[rgba(15,23,42,0.08)] bg-[#f8fafc] px-4 py-4 text-sm font-bold text-[#0f172a] outline-none"
              />
            </label>
          </div>
          <label className="block">
            <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#475569]">Message</span>
            <textarea
              name="query"
              value={leadForm.query}
              onChange={onChange}
              required
              rows="4"
              placeholder="Tell us what you want to build, improve, or discuss."
              className="w-full resize-none rounded-2xl border border-[rgba(15,23,42,0.08)] bg-[#f8fafc] px-4 py-4 text-sm font-bold text-[#0f172a] outline-none transition placeholder:text-[#94a3b8] focus:border-[#ff4b2d] focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,75,45,0.12)]"
            />
          </label>

          {leadStatus.message ? (
            <p className={`rounded-2xl px-4 py-3 text-sm font-bold ${leadStatus.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
              {leadStatus.message}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isLeadSubmitting}
            className="w-full rounded-2xl bg-gradient-to-r from-[#ff4b2d] to-[#ff6b4a] px-6 py-4 text-sm font-black uppercase tracking-[0.12em] text-white shadow-2xl shadow-[#ff4b2d]/25 transition duration-300 hover:-translate-y-1 disabled:cursor-wait disabled:opacity-70"
          >
            {isLeadSubmitting ? 'Submitting...' : 'Submit Lead'}
          </button>
        </form>
      </div>
    </div>
  )
}

function LeadField({ label, name, type = 'text', value, onChange, required = false }) {
  return (
    <label>
      <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#475569]">{label}</span>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={label}
        className="min-h-[52px] w-full rounded-2xl border border-[rgba(15,23,42,0.08)] bg-[#f8fafc] px-4 py-4 text-sm font-bold text-[#0f172a] outline-none transition placeholder:text-[#94a3b8] focus:border-[#ff4b2d] focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,75,45,0.12)]"
      />
    </label>
  )
}

function VisualCard({ title, serviceName }) {
  return (
    <div className="rounded-[2rem] border border-[rgba(15,23,42,0.08)] bg-white/85 p-6 shadow-2xl shadow-slate-900/10 backdrop-blur-xl">
      <div className="rounded-3xl border border-[#ff4b2d]/15 bg-[#f8fafc] p-5">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#64748b]">Live Workspace</p>
            <h2 className="mt-2 text-2xl font-black text-[#0f172a]">{title}</h2>
          </div>
          <span className="rounded-full bg-[#fff1ed] px-3 py-1 text-xs font-black text-[#ff4b2d]">Active</span>
        </div>
        {['Requirement Review', 'Execution Setup', 'Quality Check'].map((item, index) => (
          <div key={item} className="mb-4 rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-bold text-[#475569]">{item}</span>
              <strong className="text-xl font-black text-[#ff4b2d]">{88 - index * 13}%</strong>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#e2e8f0]">
              <i className="block h-full rounded-full bg-gradient-to-r from-[#ff4b2d] to-[#ff6b4a]" style={{ width: `${88 - index * 13}%` }} />
            </div>
          </div>
        ))}
        <p className="mt-5 rounded-2xl bg-[#fff1ed] p-4 text-sm font-bold leading-6 text-[#334155]">
          {serviceName} delivery stays mapped, measurable, and ready for business handoff.
        </p>
      </div>
    </div>
  )
}

function SectionTitle({ eyebrow, title, copy }) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ff4b2d]">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-black leading-tight text-[#0f172a] sm:text-5xl">{title}</h2>
      {copy ? <p className="mt-4 text-base font-semibold leading-8 text-[#475569]">{copy}</p> : null}
    </div>
  )
}

function PremiumCard({ index, title, copy }) {
  return (
    <article className="group rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white/90 p-6 shadow-xl shadow-slate-900/5 backdrop-blur transition duration-300 hover:-translate-y-2 hover:border-[#ff4b2d]/50 hover:shadow-[#ff4b2d]/10">
      <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-[#fff1ed] text-sm font-black text-[#ff4b2d] transition duration-300 group-hover:bg-[#ff4b2d] group-hover:text-white">
        {String(index + 1).padStart(2, '0')}
      </div>
      <h3 className="text-xl font-black text-[#0f172a]">{title}</h3>
      <p className="mt-4 text-sm font-semibold leading-7 text-[#475569]">{copy}</p>
    </article>
  )
}

function buildFeatures(serviceName, category) {
  return [
    [`${serviceName} Planning`, `Requirement review, scope mapping, and execution priorities for ${serviceName.toLowerCase()}.`],
    ['Workflow Setup', `Structured process design connected to ${category.navTitle || category.title} delivery standards.`],
    ['Implementation Support', 'Professional execution with clear milestones, communication, and handoff-ready documentation.'],
    ['Reporting & Insights', 'Performance updates, operational visibility, and improvement recommendations.'],
    ['System Coordination', 'Integration-friendly support for business tools, teams, and existing workflows.'],
    ['Quality Review', 'Review checkpoints to keep delivery accurate, consistent, and client-ready.'],
    ['Scalable Delivery', 'A delivery model that can expand with business volume, service complexity, and operational demand.'],
    ['Ongoing Optimization', 'Continuous refinement to improve quality, speed, conversion, customer experience, or stability.'],
  ]
}

function buildProcess(serviceName, category) {
  const slug = category.slug
  if (slug === 'call-center-service') return ['Campaign Brief', 'Script & SLA Setup', 'Live Operations', 'QA & Reporting']
  if (slug === 'digital-marketing') return ['Audience Research', 'Campaign Planning', 'Creative Execution', 'Optimization Reports']
  if (slug === 'it-services') return ['Infrastructure Review', 'Security Planning', 'System Setup', 'Monitoring & Support']
  if (slug === 'software-development-services') return ['Product Discovery', 'UI & Architecture', 'Agile Development', 'QA & Deployment']
  if (slug === 'hr-consultant') return ['Requirement Review', 'Candidate/HR Planning', 'Execution Coordination', 'Reporting & Closure']
  if (slug === 'telecommunications') return ['Communication Audit', 'System Design', 'Telecom Setup', 'Testing & Support']
  if (slug === 'artificial-intelligence') return ['Use Case Discovery', 'Data & Workflow Planning', 'AI Solution Build', 'Integration & Monitoring']
  return [`${serviceName} Review`, 'Planning', 'Execution', 'Reporting']
}

function buildTrust(serviceName, category) {
  return [
    `${serviceName} Expertise`,
    `${category.navTitle || category.title} Delivery`,
    'Secure Coordination',
    'Transparent Reporting',
    'Professional Support',
    'Scalable Operations',
  ]
}

function slugifyLocal(value) {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
