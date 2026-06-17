import { useState } from 'react'
import { Clapperboard, Film, Mail, Megaphone, Sparkles, Video } from 'lucide-react'
import { LEAD_ENDPOINTS, apiRequest } from '../api/apiEndpoint.js'
import { getServiceLink, services } from '../data/services.js'

const filmService = services.find((service) => service.slug === 'film-industry')

const filmHighlights = [
  ['Production coordination', 'Planning support for shoots, crew coordination, schedules, documentation, and vendor communication.'],
  ['Post-production workflow', 'Editing, subtitles, dubbing, color, motion graphics, review cycles, and final delivery support.'],
  ['Release and marketing', 'OTT, YouTube, social media, teaser campaigns, posters, trailers, and audience growth execution.'],
]

const filmWorkflows = [
  ['Pre-Production', 'Creative brief, script support, casting, location planning, schedule planning, and production checklist.'],
  ['Production', 'Shoot coordination, content capture planning, crew support, daily updates, and production documentation.'],
  ['Post-Production', 'Editing, VFX, motion graphics, subtitles, dubbing, color grading, and final export support.'],
  ['Distribution', 'OTT preparation, YouTube setup, campaign planning, release assets, and reporting.'],
]

const filmCapabilities = [
  ['Script to Screen', 'Support from idea, script, cast, and shoot planning to finished film delivery.'],
  ['Digital Film Marketing', 'Campaign assets, social media rollout, influencer planning, YouTube growth, and release promotion.'],
  ['Creator & Studio Support', 'Showreels, music videos, short films, documentaries, portfolios, and channel operations.'],
  ['Multilingual Media', 'Subtitles, dubbing coordination, captions, and regional release support for wider reach.'],
]

export function FilmIndustryPage() {
  const service = filmService
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState(service.services[0])
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', query: '' })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [isBusy, setIsBusy] = useState(false)

  const openLeadModal = (item = selectedService) => {
    setSelectedService(item)
    setStatus({ type: '', message: '' })
    setIsModalOpen(true)
  }

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsBusy(true)
    setStatus({ type: '', message: '' })

    try {
      await apiRequest(LEAD_ENDPOINTS.publicCreate, {
        method: 'POST',
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          service: `Film Industry - ${selectedService}`,
          query: [
            form.phone ? `Phone: ${form.phone}` : '',
            form.company ? `Company / Studio: ${form.company}` : '',
            form.query,
          ].filter(Boolean).join('\n\n'),
        }),
      })

      setStatus({ type: 'success', message: 'Thank you. Cromgen film support team will contact you shortly.' })
      setForm({ name: '', email: '', phone: '', company: '', query: '' })
      window.setTimeout(() => setIsModalOpen(false), 1400)
    } catch (error) {
      setStatus({ type: 'error', message: error instanceof Error ? error.message : 'Unable to submit lead.' })
    } finally {
      setIsBusy(false)
    }
  }

  return (
    <main className="overflow-hidden bg-white pt-32 text-[#0f172a] sm:pt-36 lg:pt-28">
      <section className="relative isolate px-5 py-16">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,#ffffff,#f8fafc_46%,#fff3ee)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#ff4b2d]/20 bg-[#fff4ef] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#ff4b2d]">
              <Clapperboard size={16} /> Creative Production Services
            </span>
            <h1 className="mt-7 text-4xl font-black leading-[1.03] sm:text-6xl lg:text-7xl">Film Industry</h1>
            <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-[#475569] sm:text-lg">
              Production, post-production, casting, subtitles, dubbing, marketing, OTT, YouTube, and digital release support for film makers, creators, studios, and media brands.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <button type="button" onClick={() => openLeadModal()} className="inline-flex items-center gap-3 rounded-2xl bg-[#ff4b2d] px-7 py-4 text-sm font-black uppercase tracking-[0.12em] text-white shadow-2xl shadow-[#ff4b2d]/25 transition hover:-translate-y-1">
                <Mail size={18} /> Start Film Project
              </button>
              <a href="#film-services" className="inline-flex items-center rounded-2xl border border-[rgba(15,23,42,0.1)] bg-white px-7 py-4 text-sm font-black uppercase tracking-[0.12em] text-[#0f172a] shadow-xl shadow-slate-900/5 transition hover:-translate-y-1 hover:text-[#ff4b2d]">
                View Services
              </a>
            </div>
          </div>
          <div className="rounded-[2rem] bg-[#0f172a] p-6 text-white shadow-2xl shadow-slate-900/20">
            <div className="grid gap-4">
              {[
                ['Pre', 'Planning, script, casting, locations'],
                ['Shoot', 'Coordination, capture, production support'],
                ['Post', 'Editing, VFX, color, subtitles, dubbing'],
                ['Release', 'OTT, YouTube, social, promotion'],
              ].map(([label, copy]) => (
                <article key={label} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <span className="text-xs font-black uppercase tracking-[0.18em] text-[#ffb7a8]">{label}</span>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-200">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[rgba(15,23,42,0.08)] bg-[#f8fafc] px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Film Support" title="Production and media operations under one roof." copy="Cromgen helps film and creator teams organize work from planning to final release with clear coordination, digital assets, and promotion support." />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {filmHighlights.map(([title, copy], index) => (
              <article key={title} className="rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white p-6 shadow-xl shadow-slate-900/5">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#fff1ed] text-sm font-black text-[#ff4b2d]">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="mt-5 text-xl font-black">{title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-[#475569]">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="film-services" className="px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Service Portfolio" title="Film industry categories." copy="Click any service to open its detail page, or request project support directly." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {service.services.map((item, index) => (
              <article key={item} className="rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white p-5 shadow-xl shadow-slate-900/5 transition hover:-translate-y-1 hover:border-[#ff4b2d]/40">
                <a href={getServiceLink(service.slug, item)} className="block">
                  <span className="mb-4 grid h-10 w-10 place-items-center rounded-xl bg-[#fff1ed] text-sm font-black text-[#ff4b2d]">{String(index + 1).padStart(2, '0')}</span>
                  <h3 className="text-base font-black leading-6">{item}</h3>
                  <p className="mt-3 text-sm font-semibold leading-6 text-[#475569]">Open category page with planning, execution, and reporting details.</p>
                </a>
                <button type="button" onClick={() => openLeadModal(item)} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#0f172a] px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-white transition hover:bg-[#ff4b2d]">
                  <Mail size={15} /> Enquire
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[rgba(15,23,42,0.08)] bg-[#f8fafc] px-5 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <SectionTitle eyebrow="Workflow" title="Film project delivery process." copy="From creative brief to release, each project can be structured by scope, deadline, production format, platform, and promotion goals." />
            <div className="mt-8 grid gap-3">
              {filmWorkflows.map(([title, copy], index) => (
                <div key={title} className="rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white p-4 shadow-lg shadow-slate-900/5">
                  <span className="text-xs font-black uppercase tracking-[0.16em] text-[#ff4b2d]">Step {index + 1}</span>
                  <h3 className="mt-2 text-lg font-black">{title}</h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-[#475569]">{copy}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[2rem] bg-[#0f172a] p-6 text-white shadow-2xl shadow-slate-900/20">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ffb7a8]">Capabilities</p>
            <h2 className="mt-4 text-3xl font-black leading-tight">Built for creators, studios, and production teams.</h2>
            <div className="mt-6 grid gap-3">
              {filmCapabilities.map(([title, copy]) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <h3 className="text-base font-black">{title}</h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-300">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {[
            [Film, 'Production Assets', 'Shoot plans, call sheets, content calendars, release files, and project coordination notes.'],
            [Video, 'Post-Production Support', 'Editing workflows, review cycles, subtitles, dubbing, color, and final delivery coordination.'],
            [Megaphone, 'Promotion Planning', 'Trailer, poster, social media, YouTube, OTT, and audience growth support.'],
          ].map(([Icon, title, copy]) => (
            <article key={title} className="rounded-2xl border border-[rgba(15,23,42,0.08)] bg-[#f8fafc] p-6 shadow-lg shadow-slate-900/5">
              <Icon className="text-[#ff4b2d]" size={24} />
              <h3 className="mt-4 text-xl font-black">{title}</h3>
              <p className="mt-3 text-sm font-semibold leading-7 text-[#475569]">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#0f172a] px-5 py-16 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.8fr]">
          <SectionTitle dark eyebrow="Project Enquiry" title="Plan your next film, video, or media release." copy="Submit the contact form and Cromgen will capture the lead with the selected film service." />
          <button type="button" onClick={() => openLeadModal()} className="inline-flex h-14 items-center justify-center gap-3 self-center rounded-2xl bg-white px-7 text-sm font-black uppercase tracking-[0.12em] text-[#0f172a] transition hover:-translate-y-1 hover:text-[#ff4b2d]">
            <Sparkles size={18} /> Start Project
          </button>
        </div>
      </section>

      {isModalOpen ? (
        <FilmLeadModal
          selectedService={selectedService}
          form={form}
          status={status}
          isBusy={isBusy}
          onChange={handleChange}
          onClose={() => !isBusy && setIsModalOpen(false)}
          onSubmit={handleSubmit}
        />
      ) : null}
    </main>
  )
}

function FilmLeadModal({ selectedService, form, status, isBusy, onChange, onClose, onSubmit }) {
  return (
    <div className="fixed inset-0 z-[90] grid place-items-center bg-[#0f172a]/55 px-4 py-6 backdrop-blur-md" role="dialog" aria-modal="true">
      <div className="max-h-[92vh] w-full max-w-[720px] overflow-y-auto rounded-[2rem] border border-white/60 bg-white text-[#0f172a] shadow-2xl">
        <div className="border-b border-[rgba(15,23,42,0.08)] bg-[#fff7f4] px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ff4b2d]">Film Project Enquiry</p>
              <h2 className="mt-2 text-2xl font-black">{selectedService}</h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-[#475569]">Share your requirement and Cromgen team will connect with you.</p>
            </div>
            <button type="button" onClick={onClose} disabled={isBusy} className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white text-xl font-black text-[#475569]">x</button>
          </div>
        </div>
        <form onSubmit={onSubmit} className="space-y-5 p-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <LeadField label="Your Name" name="name" value={form.name} onChange={onChange} required />
            <LeadField label="Email Address" name="email" type="email" value={form.email} onChange={onChange} required />
            <LeadField label="Mobile Number" name="phone" type="tel" value={form.phone} onChange={onChange} />
            <LeadField label="Company / Studio" name="company" value={form.company} onChange={onChange} />
          </div>
          <label className="block">
            <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#475569]">Requirement</span>
            <textarea name="query" value={form.query} onChange={onChange} required rows="4" placeholder="Tell us about your film, video, or media project." className="w-full resize-none rounded-2xl border border-[rgba(15,23,42,0.08)] bg-[#f8fafc] px-4 py-4 text-sm font-bold text-[#0f172a] outline-none focus:border-[#ff4b2d]" />
          </label>
          {status.message ? <p className={`rounded-2xl px-4 py-3 text-sm font-bold ${status.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>{status.message}</p> : null}
          <button type="submit" disabled={isBusy} className="w-full rounded-2xl bg-gradient-to-r from-[#ff4b2d] to-[#ff6b4a] px-6 py-4 text-sm font-black uppercase tracking-[0.12em] text-white shadow-2xl shadow-[#ff4b2d]/25 disabled:cursor-wait disabled:opacity-70">
            {isBusy ? 'Submitting...' : 'Submit Film Enquiry'}
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
      <input name={name} type={type} value={value} onChange={onChange} required={required} placeholder={label} className="min-h-[52px] w-full rounded-2xl border border-[rgba(15,23,42,0.08)] bg-[#f8fafc] px-4 py-4 text-sm font-bold text-[#0f172a] outline-none focus:border-[#ff4b2d]" />
    </label>
  )
}

function SectionTitle({ eyebrow, title, copy, dark = false }) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ff4b2d]">{eyebrow}</p>
      <h2 className={`mt-4 text-3xl font-black leading-tight sm:text-5xl ${dark ? 'text-white' : 'text-[#0f172a]'}`}>{title}</h2>
      {copy ? <p className={`mt-4 text-base font-semibold leading-8 ${dark ? 'text-slate-300' : 'text-[#475569]'}`}>{copy}</p> : null}
    </div>
  )
}
