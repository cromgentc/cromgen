import { useState } from 'react'
import { LEAD_ENDPOINTS, apiRequest } from '../api/apiEndpoint.js'

export function LeadCaptureModal({ isOpen, onClose, serviceName = 'Cromgen Technology', title = 'Talk to Expert' }) {
  const [leadForm, setLeadForm] = useState({ name: '', email: '', phone: '', query: '' })
  const [leadStatus, setLeadStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isOpen) return null

  const handleChange = (event) => {
    setLeadForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setLeadStatus({ type: '', message: '' })

    try {
      await apiRequest(LEAD_ENDPOINTS.publicCreate, {
        method: 'POST',
        body: JSON.stringify({
          name: leadForm.name,
          email: leadForm.email,
          service: serviceName,
          query: [leadForm.phone ? `Phone: ${leadForm.phone}` : '', leadForm.query].filter(Boolean).join('\n\n'),
        }),
      })

      setLeadStatus({ type: 'success', message: 'Thank you. Our expert team will contact you shortly.' })
      setLeadForm({ name: '', email: '', phone: '', query: '' })
      window.setTimeout(() => {
        setLeadStatus({ type: '', message: '' })
        onClose()
      }, 1800)
    } catch (error) {
      setLeadStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Unable to submit lead right now.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[90] grid place-items-center bg-[#0f172a]/55 px-4 py-6 backdrop-blur-md" role="dialog" aria-modal="true" aria-labelledby="lead-modal-title">
      <div className="w-full max-w-[560px] overflow-hidden rounded-[2rem] border border-white/60 bg-white text-[#0f172a] shadow-2xl shadow-slate-950/25">
        <div className="border-b border-[rgba(15,23,42,0.08)] bg-gradient-to-r from-[#fff7f4] to-white px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ff4b2d]">{title}</p>
              <h2 id="lead-modal-title" className="mt-2 text-2xl font-black text-[#0f172a]">{serviceName}</h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-[#475569]">Fill your details and Cromgen Technology team will connect with you.</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white text-xl font-black text-[#475569] shadow-lg shadow-slate-900/5 transition hover:-translate-y-0.5 hover:border-[#ff4b2d]/40 hover:text-[#ff4b2d] disabled:cursor-wait"
              aria-label="Close lead form"
            >
              x
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <LeadField label="Your Name" name="name" value={leadForm.name} onChange={handleChange} required />
            <LeadField label="Email Address" name="email" type="email" value={leadForm.email} onChange={handleChange} required />
            <LeadField label="Mobile Number" name="phone" type="tel" value={leadForm.phone} onChange={handleChange} />
            <label>
              <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#475569]">Service</span>
              <input value={serviceName} readOnly className="min-h-[52px] w-full rounded-2xl border border-[rgba(15,23,42,0.08)] bg-[#f8fafc] px-4 py-4 text-sm font-bold text-[#0f172a] outline-none" />
            </label>
          </div>
          <label className="block">
            <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#475569]">Message</span>
            <textarea
              name="query"
              value={leadForm.query}
              onChange={handleChange}
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

          <button type="submit" disabled={isSubmitting} className="w-full rounded-2xl bg-gradient-to-r from-[#ff4b2d] to-[#ff6b4a] px-6 py-4 text-sm font-black uppercase tracking-[0.12em] text-white shadow-2xl shadow-[#ff4b2d]/25 transition duration-300 hover:-translate-y-1 disabled:cursor-wait disabled:opacity-70">
            {isSubmitting ? 'Submitting...' : 'Submit Lead'}
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
