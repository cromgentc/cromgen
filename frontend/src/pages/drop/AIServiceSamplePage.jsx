import { useState } from 'react'
import { BrainCircuit, Download, FileText, Mail, Sparkles } from 'lucide-react'
import aiServicesImage from '../../assets/artificial-intelligence-services.png'
import { LEAD_ENDPOINTS, apiRequest } from '../../api/apiEndpoint.js'

const googleDriveSampleLink = 'https://drive.google.com/drive/folders/service-samples'

const aiServiceConfigs = {
  nlp: {
    title: 'Natural Language Processing (NLP)',
    subtitle: 'Enterprise language intelligence for documents, conversations, search, analytics, and multilingual business workflows.',
    sampleName: 'Cromgen NLP Enterprise Sample',
    items: ['Text Classification', 'Sentiment Analysis', 'Language Translation', 'Speech-to-Text', 'Text-to-Speech', 'AI Summarization', 'Keyword Extraction', 'Intent Detection', 'AI Document Processing', 'Multilingual NLP Systems'],
    outcomes: ['Automated text understanding', 'Faster document review', 'Multilingual customer support', 'Search-ready knowledge workflows'],
  },
  computerVision: {
    title: 'Computer Vision',
    subtitle: 'Production-grade visual intelligence for recognition, inspection, OCR, surveillance, analytics, and quality control.',
    sampleName: 'Cromgen Computer Vision Sample',
    items: ['Face Recognition', 'Object Detection', 'OCR/Text Extraction', 'Video Analytics', 'Image Annotation', 'AI Surveillance Systems', 'Medical Image Analysis', 'Facial Motion Detection', 'Product Image Recognition', 'Quality Inspection AI'],
    outcomes: ['Visual quality automation', 'Real-time detection workflows', 'Structured image intelligence', 'Operational monitoring at scale'],
  },
  predictiveAnalytics: {
    title: 'Predictive Analytics',
    subtitle: 'Forecasting and intelligence systems that help enterprise teams plan demand, risk, revenue, inventory, and operations.',
    sampleName: 'Cromgen Predictive Analytics Sample',
    items: ['Demand Forecasting', 'Customer Prediction Models', 'Risk Analysis', 'Revenue Forecasting', 'Inventory Prediction', 'Marketing Analytics', 'Business Intelligence Dashboards', 'Financial Forecasting', 'AI Trend Analysis', 'Operational Analytics'],
    outcomes: ['Forecast-driven planning', 'Revenue and demand visibility', 'Risk-aware decisions', 'Executive analytics dashboards'],
  },
  automation: {
    title: 'Business Process Automation',
    subtitle: 'AI-powered workflow automation for operations, CRM, HR, finance, documents, email, and customer support.',
    sampleName: 'Cromgen Automation Workflow Sample',
    items: ['Workflow Automation', 'AI Email Automation', 'HR Process Automation', 'CRM Automation', 'Invoice Automation', 'Document Processing Automation', 'Customer Support Automation', 'Data Entry Automation', 'Task Scheduling Systems', 'AI Operations Management'],
    outcomes: ['Reduced manual workload', 'Cleaner process handoffs', 'Faster operational cycles', 'Traceable automation governance'],
  },
  recommendations: {
    title: 'Recommendation Systems',
    subtitle: 'Personalization engines for products, content, shopping journeys, learning paths, upselling, and customer interest prediction.',
    sampleName: 'Cromgen Recommendation Engine Sample',
    items: ['Product Recommendation Engine', 'Personalized Content Suggestions', 'AI Shopping Recommendations', 'Movie/Music Recommendation', 'Learning Recommendation System', 'AI Upselling Engine', 'Cross-Selling Recommendations', 'Customer Interest Prediction', 'Smart Search Systems', 'Personalized Marketing AI'],
    outcomes: ['Personalized customer journeys', 'Higher conversion relevance', 'Better cross-sell targeting', 'Smart discovery experiences'],
  },
  generativeContent: {
    title: 'Generative AI Content Tools',
    subtitle: 'Enterprise content generation tools for marketing, blogs, images, scripts, ads, product descriptions, emails, resumes, and design content.',
    sampleName: 'Cromgen Generative Content Sample',
    items: ['AI Content Generator', 'AI Blog Writing Tools', 'AI Image Generation', 'AI Video Script Generator', 'AI Social Media Content', 'AI Ad Copy Generator', 'AI Product Description Generator', 'AI Email Writer', 'AI Resume Builder', 'AI Design Content Tools'],
    outcomes: ['Faster content production', 'Brand-aligned content systems', 'Campaign-ready creative output', 'Reusable generation workflows'],
  },
  voiceAssistant: {
    title: 'Voice AI Assistant',
    subtitle: 'Voice automation for calling, IVR, search, speech recognition, analytics, multilingual support, and call operations.',
    sampleName: 'Cromgen Voice AI Sample',
    items: ['AI Voice Bot', 'Virtual Call Assistant', 'AI IVR Systems', 'Voice Search Assistant', 'AI Telecalling Assistant', 'Smart Voice Commands', 'Speech Recognition Systems', 'AI Voice Analytics', 'Multilingual Voice Support', 'AI Call Automation'],
    outcomes: ['Automated voice interactions', 'Smarter call routing', 'Multilingual voice support', 'Voice analytics for operations'],
  },
  aiCrm: {
    title: 'AI CRM Integration',
    subtitle: 'AI-driven CRM automation for lead scoring, customer insights, sales prediction, follow-ups, WhatsApp, email, and dashboards.',
    sampleName: 'Cromgen AI CRM Integration Sample',
    items: ['AI Lead Scoring', 'CRM Workflow Automation', 'Customer Insights AI', 'Sales Prediction AI', 'AI Customer Support Integration', 'WhatsApp CRM Integration', 'Email Automation Integration', 'AI Follow-Up System', 'AI Sales Assistant', 'Customer Analytics Dashboard'],
    outcomes: ['Better lead prioritization', 'Automated sales follow-up', 'Integrated customer intelligence', 'CRM-ready AI workflows'],
  },
  dataLabeling: {
    title: 'Data Labeling & Model Training',
    subtitle: 'Human-in-the-loop dataset preparation for image, video, audio, text, OCR, speech, segmentation, and model training.',
    sampleName: 'Cromgen Data Labeling Sample',
    items: ['Image Annotation', 'Video Annotation', 'Audio Transcription', 'Text Annotation', 'OCR Data Labeling', 'Bounding Box Annotation', 'Segmentation Annotation', 'Speech Data Collection', 'AI Training Dataset Creation', 'Human-in-the-loop AI Training'],
    outcomes: ['Training-ready datasets', 'Quality-controlled annotation', 'Scalable labeling operations', 'Human-reviewed model inputs'],
  },
  strategy: {
    title: 'AI Strategy Consulting',
    subtitle: 'Enterprise AI strategy for transformation planning, product roadmaps, infrastructure, governance, adoption, and business optimization.',
    sampleName: 'Cromgen AI Strategy Sample',
    items: ['AI Transformation Strategy', 'AI Workflow Planning', 'AI Product Roadmap', 'Enterprise AI Consulting', 'AI Infrastructure Planning', 'Automation Strategy', 'Data Strategy Consulting', 'AI Adoption Planning', 'AI Compliance & Governance', 'AI Business Optimization Solutions'],
    outcomes: ['Clear AI roadmap', 'Governed adoption planning', 'Infrastructure readiness', 'Business-aligned automation strategy'],
  },
  chatbot: {
    title: 'AI Chatbot Development',
    subtitle: 'Enterprise chatbot systems for support, WhatsApp, website live chat, FAQ automation, CRM integration, and lead generation.',
    sampleName: 'Cromgen AI Chatbot Sample',
    items: ['Customer Support Chatbots', 'WhatsApp AI Bots', 'Website Live Chat Bots', 'Voice Chatbots', 'FAQ Automation Bots', 'E-commerce Chatbots', 'AI Sales Assistant', 'Multi-language Chatbots', 'CRM-integrated Chatbots', 'Lead Generation Bots'],
    outcomes: ['24/7 customer support', 'Automated lead capture', 'CRM-connected conversations', 'Multi-language service journeys'],
  },
}

export function AIServiceSamplePage({ type }) {
  const config = aiServiceConfigs[type] || aiServiceConfigs.nlp
  const [selectedItem, setSelectedItem] = useState(config.items[0])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isBusy, setIsBusy] = useState(false)
  const [status, setStatus] = useState({ type: '', message: '' })
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', useCase: '' })

  const openSample = (item = selectedItem) => {
    setSelectedItem(item)
    setStatus({ type: '', message: '' })
    setIsModalOpen(true)
  }

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const submitLead = async (event) => {
    event.preventDefault()
    setIsBusy(true)
    setStatus({ type: '', message: '' })

    try {
      await apiRequest(LEAD_ENDPOINTS.publicCreate, {
        method: 'POST',
        body: JSON.stringify({
          name: form.name,
          email: form.email.trim().toLowerCase(),
          service: `${config.title} - ${selectedItem}`,
          query: [
            form.phone ? `Phone: ${form.phone}` : '',
            form.company ? `Company: ${form.company}` : '',
            `Selected service: ${selectedItem}`,
            form.useCase ? `Use case: ${form.useCase}` : '',
            `Google Drive sample link: ${googleDriveSampleLink}`,
          ].filter(Boolean).join('\n\n'),
        }),
      })

      downloadSample(config, selectedItem)
      setStatus({ type: 'success', message: 'Lead submitted. Your sample download has started.' })
      setForm({ name: '', email: '', phone: '', company: '', useCase: '' })
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
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,#ffffff,#f5fbff_48%,#fff7f4)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#ff4b2d]/20 bg-[#fff4ef] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#ff4b2d]">
              <BrainCircuit size={16} /> Enterprise AI Service
            </span>
            <h1 className="mt-7 text-4xl font-black leading-[1.03] sm:text-6xl lg:text-7xl">{config.title}</h1>
            <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-[#475569] sm:text-lg">{config.subtitle}</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <button type="button" onClick={() => openSample(selectedItem)} className="inline-flex items-center gap-3 rounded-2xl bg-[#ff4b2d] px-7 py-4 text-sm font-black uppercase tracking-[0.12em] text-white shadow-2xl shadow-[#ff4b2d]/25 transition hover:-translate-y-1">
                <Download size={18} /> Download Sample
              </button>
              <a href="/artificial-intelligence" className="inline-flex items-center rounded-2xl border border-[rgba(15,23,42,0.1)] bg-white px-7 py-4 text-sm font-black uppercase tracking-[0.12em] text-[#0f172a] shadow-xl shadow-slate-900/5 transition hover:-translate-y-1 hover:text-[#ff4b2d]">
                Back to AI
              </a>
            </div>
          </div>
          <div className="relative">
            <img src={aiServicesImage} alt={`${config.title} enterprise AI dashboard`} className="w-full rounded-[2rem] border border-white shadow-2xl shadow-slate-900/14" />
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/50 bg-white/90 p-4 shadow-xl backdrop-blur">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#64748b]">Premium sample includes</p>
              <h2 className="mt-2 text-xl font-black">{selectedItem}</h2>
              <p className="mt-2 text-sm font-bold text-[#475569]">Download file includes service scope, enterprise actions, and Google Drive sample link.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[rgba(15,23,42,0.08)] bg-[#f8fafc] px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Service Portfolio" title={`Specialized ${config.title} capabilities.`} copy="Select any capability to view its enterprise context and download a service-specific sample after submitting lead details." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {config.items.map((item, index) => (
              <button key={item} type="button" onClick={() => setSelectedItem(item)} className={`rounded-2xl border p-5 text-left shadow-xl shadow-slate-900/5 transition hover:-translate-y-1 ${selectedItem === item ? 'border-[#ff4b2d] bg-[#fff7f4]' : 'border-[rgba(15,23,42,0.08)] bg-white'}`}>
                <span className="mb-4 grid h-10 w-10 place-items-center rounded-xl bg-[#fff1ed] text-sm font-black text-[#ff4b2d]">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="text-base font-black leading-6">{item}</h3>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionTitle eyebrow="Selected Capability" title={selectedItem} copy={`Cromgen maps ${selectedItem.toLowerCase()} into secure workflows, measurable KPIs, operational reporting, and enterprise-ready handoff documentation.`} />
          <div className="grid gap-4 sm:grid-cols-2">
            {config.outcomes.map((outcome, index) => (
              <article key={outcome} className="rounded-2xl border border-[rgba(15,23,42,0.08)] bg-[#f8fafc] p-5 shadow-lg shadow-slate-900/5">
                <Sparkles className="text-[#ff4b2d]" size={22} />
                <h3 className="mt-4 text-lg font-black">{outcome}</h3>
                <p className="mt-3 text-sm font-semibold leading-6 text-[#475569]">Built for scale, governance, and measurable business value.</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[rgba(15,23,42,0.08)] bg-[#0f172a] px-5 py-16 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.8fr]">
          <SectionTitle dark eyebrow="Sample Download" title={`${selectedItem} enterprise sample.`} copy="Submit the lead form and the sample file will download automatically with the Google Drive sample link included." />
          <button type="button" onClick={() => openSample(selectedItem)} className="inline-flex h-14 items-center justify-center gap-3 self-center rounded-2xl bg-white px-7 text-sm font-black uppercase tracking-[0.12em] text-[#0f172a] transition hover:-translate-y-1 hover:text-[#ff4b2d]">
            <Mail size={18} /> Get Full Sample
          </button>
        </div>
      </section>

      {isModalOpen ? (
        <LeadSampleModal config={config} selectedItem={selectedItem} form={form} status={status} isBusy={isBusy} onChange={handleChange} onClose={() => !isBusy && setIsModalOpen(false)} onSubmit={submitLead} />
      ) : null}
    </main>
  )
}

function LeadSampleModal({ config, selectedItem, form, status, isBusy, onChange, onClose, onSubmit }) {
  return (
    <div className="fixed inset-0 z-[90] grid place-items-center bg-[#0f172a]/55 px-4 py-6 backdrop-blur-md" role="dialog" aria-modal="true">
      <div className="max-h-[92vh] w-full max-w-[720px] overflow-y-auto rounded-[2rem] border border-white/60 bg-white text-[#0f172a] shadow-2xl">
        <div className="border-b border-[rgba(15,23,42,0.08)] bg-[#fff7f4] px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ff4b2d]">Lead Details Required</p>
              <h2 className="mt-2 text-2xl font-black">Download {config.sampleName}</h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-[#475569]">Selected capability: {selectedItem}. The sample includes a Google Drive link.</p>
            </div>
            <button type="button" onClick={onClose} disabled={isBusy} className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white text-xl font-black text-[#475569]">x</button>
          </div>
        </div>
        <form onSubmit={onSubmit} className="space-y-5 p-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <LeadField label="Your Name" name="name" value={form.name} onChange={onChange} required />
            <LeadField label="Email Address" name="email" type="email" value={form.email} onChange={onChange} required />
            <LeadField label="Mobile Number" name="phone" type="tel" value={form.phone} onChange={onChange} />
            <LeadField label="Company Name" name="company" value={form.company} onChange={onChange} />
          </div>
          <label className="block">
            <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#475569]">Requirement</span>
            <textarea name="useCase" value={form.useCase} onChange={onChange} required rows="3" placeholder={`Tell us about your ${selectedItem} requirement`} className="w-full resize-none rounded-2xl border border-[rgba(15,23,42,0.08)] bg-[#f8fafc] px-4 py-4 text-sm font-bold text-[#0f172a] outline-none focus:border-[#ff4b2d]" />
          </label>
          {status.message ? <p className={`rounded-2xl px-4 py-3 text-sm font-bold ${status.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>{status.message}</p> : null}
          <button type="submit" disabled={isBusy} className="w-full rounded-2xl bg-gradient-to-r from-[#ff4b2d] to-[#ff6b4a] px-6 py-4 text-sm font-black uppercase tracking-[0.12em] text-white shadow-2xl shadow-[#ff4b2d]/25 disabled:cursor-wait disabled:opacity-70">
            {isBusy ? 'Processing...' : 'Submit Lead & Download Sample'}
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

function downloadSample(config, selectedItem) {
  const sample = [
    `Cromgen Technology - ${config.sampleName}`,
    '',
    `Service: ${config.title}`,
    `Selected capability: ${selectedItem}`,
    `Google Drive sample link: ${googleDriveSampleLink}`,
    '',
    'Enterprise overview:',
    config.subtitle,
    '',
    'Included service capabilities:',
    ...config.items.map((item) => `- ${item}`),
    '',
    'Recommended enterprise actions:',
    ...config.outcomes.map((item) => `- ${item}`),
  ].join('\n')

  const blob = new Blob([sample], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${config.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-sample.txt`
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}
