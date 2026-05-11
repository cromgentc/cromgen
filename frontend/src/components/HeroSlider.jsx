import { useEffect, useState } from 'react'
import { LEAD_ENDPOINTS, apiRequest } from '../api/apiEndpoint.js'
import { services } from '../data/services.js'
import { getServiceImage } from '../data/serviceImages.js'
import { ServiceIcon } from './ServiceIcon.jsx'

export function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)
  const [leadForm, setLeadForm] = useState({ name: '', email: '', service: '', query: '' })
  const [leadStatus, setLeadStatus] = useState({ type: '', message: '' })
  const [isLeadSubmitting, setIsLeadSubmitting] = useState(false)
  const active = services[activeIndex]

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % services.length)
    }, 4200)

    return () => window.clearInterval(timer)
  }, [])

  const openLeadModal = () => {
    setLeadForm((current) => ({
      ...current,
      service: current.service || active.title,
    }))
    setLeadStatus({ type: '', message: '' })
    setIsLeadModalOpen(true)
  }

  const updateLeadField = (field, value) => {
    setLeadForm((current) => ({ ...current, [field]: value }))
  }

  const submitLead = async (event) => {
    event.preventDefault()
    setIsLeadSubmitting(true)
    setLeadStatus({ type: '', message: '' })

    try {
      const data = await apiRequest(LEAD_ENDPOINTS.publicCreate, {
        method: 'POST',
        body: JSON.stringify(leadForm),
      })
      setLeadStatus({ type: 'success', message: data.message || 'Lead submitted successfully.' })
      setLeadForm({ name: '', email: '', service: active.title, query: '' })
      window.setTimeout(() => setIsLeadModalOpen(false), 900)
    } catch (error) {
      setLeadStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Unable to submit lead.',
      })
    } finally {
      setIsLeadSubmitting(false)
    }
  }

  return (
    <>
      <section className="hero-slider top-10 relative overflow-hidden bg-[#102021] text-white">
        <div className="hero-slider-bg absolute inset-0">
          {services.map((service, index) => (
            <img
              key={service.slug}
              src={getServiceImage(service)}
              alt=""
              aria-hidden={index !== activeIndex}
              className={index === activeIndex ? 'is-active' : ''}
            />
          ))}
          <div className="absolute inset-0 bg-[#102021]/72" />
        </div>

        <div className="hero-slider-inner relative mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-[0.92fr_1fr] lg:items-center lg:py-20">
        <div key={`card-${active.slug}`} className="hero-slider-panel">
          <div className="hero-slider-card rounded-[8px] border border-white/14 bg-white/10 p-5 backdrop-blur-md">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-[8px] bg-white text-[#102021]">
                <ServiceIcon name={active.icon} className="h-8 w-8" />
              </div>

            </div>
            <h2 className="text-2xl font-black">{active.title}</h2>
            <p className="mt-3 text-sm leading-7 text-[#d9e6e4]">{active.kicker}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {active.metrics.map(([value, label]) => (
                <div key={label} className="rounded-[8px] bg-white/10 p-4">
                  <div className="text-2xl font-black text-[#ffb09c]">{value}</div>
                  <div className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[#c7d6d4]">{label}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex gap-2">
              {services.map((service, index) => (
                <button
                  key={service.slug}
                  type="button"
                  aria-label={`Show ${service.title}`}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    index === activeIndex ? 'w-10 bg-[#ffb09c]' : 'w-2.5 bg-white/35 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`/${active.slug}`}
              className="rounded-full bg-[#ff4b2d] px-6 py-3 text-sm font-black text-white shadow-xl shadow-[#ff4b2d]/25 transition hover:bg-[#d9381e]"
            >
              Explore {active.shortTitle}
            </a>
            <button
              type="button"
              onClick={openLeadModal}
              className="rounded-full border border-[#ff4b2d] bg-[#ff4b2d] px-6 py-3 text-sm font-black text-white shadow-xl shadow-[#ff4b2d]/25 transition hover:border-[#d9381e] hover:bg-[#d9381e]"
            >
              Book Consultation
            </button>
          </div>
        </div>

        <div key={`copy-${active.slug}`} className="hero-slider-copy hero-slider-panel max-w-3xl">
          <p className="mb-5 text-sm font-black uppercase tracking-[0.2em] text-[#ffb09c]">{active.eyebrow}</p>
          <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">{active.heroTitle}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#d9e6e4]">{active.heroCopy}</p>
        </div>
        </div>
      </section>

      <div className="hero-news-ticker top-1 relative overflow-hidden bg-[#102021] text-white" aria-label="Cromgen Technology foundation announcement">
        <div>
          <span>
            Cromgen Technology is focused on building a strong service foundation for AI, digital marketing,
            customer operations, IT, software development, Cromgen Rozgar HR solutions, and telecommunications.
          </span>
          <span>
            Cromgen Technology is focused on building a strong service foundation for AI, digital marketing,
            customer operations, IT, software development, Cromgen Rozgar HR solutions, and telecommunications.
          </span>
        </div>
      </div>

      {isLeadModalOpen ? (
        <div className="hero-lead-modal" role="dialog" aria-modal="true" aria-labelledby="hero-lead-title">
          <form className="hero-lead-panel" onSubmit={submitLead}>
            <div className="hero-lead-head">
              <div>
                <span>Consultation Request</span>
                <h2 id="hero-lead-title">Tell us what you need.</h2>
              </div>
              <button type="button" onClick={() => setIsLeadModalOpen(false)} aria-label="Close consultation form">
                Close
              </button>
            </div>

            <div className="hero-lead-grid">
              <label>
                <span>Your Name</span>
                <input
                  value={leadForm.name}
                  onChange={(event) => updateLeadField('name', event.target.value)}
                  required
                />
              </label>
              <label>
                <span>Email</span>
                <input
                  type="email"
                  value={leadForm.email}
                  onChange={(event) => updateLeadField('email', event.target.value)}
                  required
                />
              </label>
              <label className="hero-lead-wide">
                <span>Service</span>
                <select
                  value={leadForm.service}
                  onChange={(event) => updateLeadField('service', event.target.value)}
                  required
                >
                  <option value="">Select service</option>
                  {services.map((service) => (
                    <option key={service.slug} value={service.title}>{service.title}</option>
                  ))}
                </select>
              </label>
              <label className="hero-lead-wide">
                <span>Requirement</span>
                <textarea
                  value={leadForm.query}
                  onChange={(event) => updateLeadField('query', event.target.value)}
                  required
                />
              </label>
            </div>

            {leadStatus.message ? (
              <p className={`hero-lead-status is-${leadStatus.type}`}>{leadStatus.message}</p>
            ) : null}

            <button type="submit" disabled={isLeadSubmitting}>
              {isLeadSubmitting ? 'Submitting...' : 'Submit Request'}
            </button>
          </form>
        </div>
      ) : null}
    </>
  )
}
