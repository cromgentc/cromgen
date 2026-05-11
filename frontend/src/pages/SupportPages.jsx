import { useEffect, useState } from 'react'
import { WORKFORCE_ENDPOINTS, apiRequest } from '../api/apiEndpoint.js'

const pageContent = {
  'support-tickets': {
    title: 'Support Tickets',
    eyebrow: 'Support Center',
    copy: 'Submit a support ticket and Cromgen Technology will review your request.',
    type: 'supportTickets',
    mode: 'form',
  },
  'help-center': {
    title: 'Help Center',
    eyebrow: 'Knowledge Base',
    copy: 'Find support articles and guidance published by the Cromgen team.',
    type: 'helpCenter',
    mode: 'list',
  },
  'faq-management': {
    title: 'FAQ',
    eyebrow: 'Help Center',
    copy: 'Browse frequently asked questions managed from the admin dashboard.',
    type: 'faqs',
    mode: 'faq',
  },
  'contact-requests': {
    title: 'Contact Requests',
    eyebrow: 'Contact Desk',
    copy: 'Send a contact request to the Cromgen Technology team.',
    type: 'contactRequests',
    mode: 'form',
  },
}

export function SupportPage({ type }) {
  const page = pageContent[type] || pageContent['help-center']
  const [records, setRecords] = useState([])
  const [status, setStatus] = useState('')
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    priority: 'Medium',
    notes: '',
  })

  useEffect(() => {
    if (page.mode === 'form') return

    let mounted = true
    apiRequest(WORKFORCE_ENDPOINTS.publicList(page.type))
      .then((data) => {
        if (mounted) setRecords(data.records || [])
      })
      .catch(() => {
        if (mounted) setRecords([])
      })

    return () => {
      mounted = false
    }
  }, [page.mode, page.type])

  const updateForm = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const submit = async (event) => {
    event.preventDefault()
    setStatus('')

    try {
      await apiRequest(WORKFORCE_ENDPOINTS.publicCreate(page.type), {
        method: 'POST',
        body: JSON.stringify({
          ...form,
          ticketId: type === 'support-tickets' ? `CT-${Date.now()}` : '',
        }),
      })
      setForm({ name: '', email: '', subject: '', priority: 'Medium', notes: '' })
      setStatus('Request submitted successfully.')
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Request could not be submitted.')
    }
  }

  return (
    <main className="bg-[#f6faf9] pt-32 sm:pt-36 lg:pt-28">
      <section className="relative overflow-hidden bg-[#061f4d] px-5 py-20 text-white">
        <div className="absolute right-[-8rem] top-[-8rem] h-80 w-80 rounded-full bg-[#63bc45]/20 blur-3xl"></div>
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#63bc45]">{page.eyebrow}</p>
          <h1 className="mt-5 text-4xl font-black md:text-6xl">{page.title}</h1>
          <p className="mt-5 max-w-2xl text-base font-semibold leading-7 text-[#c8d8ff]">{page.copy}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        {page.mode === 'form' ? (
          <form onSubmit={submit} className="grid gap-4 rounded-[24px] border border-[#d8e5e2] bg-white p-6 shadow-xl shadow-[#5c736f]/10 md:grid-cols-2">
            {status ? <p className="md:col-span-2 rounded-2xl bg-[#eaf7e6] px-4 py-3 text-sm font-black text-[#1f5f21]">{status}</p> : null}
            <SupportInput label="Name" value={form.name} onChange={(value) => updateForm('name', value)} required />
            <SupportInput label="Email" type="email" value={form.email} onChange={(value) => updateForm('email', value)} />
            <SupportInput label="Subject" value={form.subject} onChange={(value) => updateForm('subject', value)} />
            <label>
              <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-[#5c736f]">Priority</span>
              <select value={form.priority} onChange={(event) => updateForm('priority', event.target.value)} className="h-12 w-full rounded-xl border border-[#d8e5e2] px-4 text-sm font-bold outline-none focus:border-[#63bc45]">
                {['Low', 'Medium', 'High', 'Urgent'].map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
            <label className="md:col-span-2">
              <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-[#5c736f]">Details</span>
              <textarea value={form.notes} onChange={(event) => updateForm('notes', event.target.value)} rows={5} className="w-full rounded-xl border border-[#d8e5e2] px-4 py-3 text-sm font-bold outline-none focus:border-[#63bc45]" />
            </label>
            <button type="submit" className="h-12 rounded-xl bg-[#ff4b2d] text-sm font-black uppercase tracking-[0.14em] text-white transition hover:bg-[#63bc45] md:col-span-2">Submit Request</button>
          </form>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {records.length ? records.map((record) => (
              <article key={record.id} className="rounded-[24px] border border-[#d8e5e2] bg-white p-6 shadow-xl shadow-[#5c736f]/10">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#63bc45]">{record.category || record.status || 'Support'}</p>
                <h2 className="mt-3 text-xl font-black text-[#061f4d]">{record.question || record.name}</h2>
                <p className="mt-3 text-sm font-semibold leading-7 text-[#5c736f]">{record.answer || record.notes || 'Details will be updated soon.'}</p>
                {record.articleUrl ? <a href={record.articleUrl} className="mt-4 inline-block text-sm font-black text-[#ff4b2d]">Open Article</a> : null}
              </article>
            )) : (
              <div className="rounded-[24px] border border-[#d8e5e2] bg-white p-8 text-sm font-bold text-[#5c736f] md:col-span-2">No support records are published yet.</div>
            )}
          </div>
        )}
      </section>
    </main>
  )
}

function SupportInput({ label, type = 'text', value, onChange, required }) {
  return (
    <label>
      <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-[#5c736f]">{label}</span>
      <input type={type} value={value} required={required} onChange={(event) => onChange(event.target.value)} className="h-12 w-full rounded-xl border border-[#d8e5e2] px-4 text-sm font-bold outline-none focus:border-[#63bc45]" />
    </label>
  )
}
