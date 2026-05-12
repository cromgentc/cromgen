import { useMemo, useState } from 'react'
import { BarChart3, BrainCircuit, CheckCircle2, Download, LineChart, Mail, ShieldCheck, Sparkles } from 'lucide-react'
import aiServicesImage from '../../assets/artificial-intelligence-services.png'
import { LEAD_ENDPOINTS, SERVICE_SAMPLE_ENDPOINTS, apiRequest } from '../../api/apiEndpoint.js'

const serviceItems = [
  {
    title: 'Custom ML Models',
    copy: 'Purpose-built prediction, scoring, and automation models designed around your enterprise data, workflows, compliance needs, and integration landscape.',
    related: ['Data readiness assessment', 'Feature engineering', 'Model training pipeline', 'Production performance monitoring'],
    sample: 'Custom ML model blueprint sample',
  },
  {
    title: 'Fraud Detection Systems',
    copy: 'Real-time and batch fraud intelligence that analyzes transactions, user behavior, velocity patterns, and risk signals before losses scale.',
    related: ['Anomaly detection', 'Risk scoring', 'Alert orchestration', 'Investigation workflow'],
    sample: 'Fraud risk detection sample',
  },
  {
    title: 'Customer Behavior Analysis',
    copy: 'Enterprise customer intelligence that converts activity, purchases, engagement, and CRM data into practical segmentation and growth decisions.',
    related: ['Segment analysis', 'Purchase pattern mining', 'Retention insights', 'Customer lifetime value'],
    sample: 'Customer behavior insight sample',
  },
  {
    title: 'Sales Prediction Models',
    copy: 'Forecasting models that combine historical revenue, pipeline movement, seasonality, marketing activity, and external signals for better planning.',
    related: ['Revenue forecast', 'Demand planning', 'Pipeline scoring', 'Trend analysis'],
    sample: 'Sales prediction sample',
  },
  {
    title: 'Recommendation Engines',
    copy: 'Personalization systems that recommend the right product, service, content, offer, or next action across digital and sales channels.',
    related: ['Product matching', 'Next best offer', 'Personalization logic', 'Conversion lift analysis'],
    sample: 'Recommendation engine sample',
  },
  {
    title: 'Churn Prediction',
    copy: 'Early warning models that identify at-risk customers, explain churn drivers, and help retention teams take action before revenue is lost.',
    related: ['Risk indicators', 'Retention targeting', 'Engagement scoring', 'Customer health reporting'],
    sample: 'Churn prediction sample',
  },
  {
    title: 'Classification Models',
    copy: 'High-volume classification systems for leads, tickets, documents, images, transactions, support cases, and operational decisions.',
    related: ['Lead classification', 'Ticket routing', 'Document tagging', 'Quality control checks'],
    sample: 'Classification model sample',
  },
  {
    title: 'Data Forecasting',
    copy: 'Forecasting infrastructure for demand, inventory, staffing, sales, capacity, and operational planning with repeatable reporting cycles.',
    related: ['Time series modeling', 'Demand planning', 'Capacity forecasting', 'Executive trend reports'],
    sample: 'Data forecasting sample',
  },
  {
    title: 'AI Model Optimization',
    copy: 'Optimization programs that improve model accuracy, latency, operating cost, reliability, drift control, and production maintainability.',
    related: ['Accuracy tuning', 'Model monitoring', 'Cost optimization', 'Retraining strategy'],
    sample: 'AI model optimization sample',
  },
  {
    title: 'Deep Learning Solutions',
    copy: 'Advanced deep learning architectures for complex datasets, language, vision, pattern recognition, and high-scale automation use cases.',
    related: ['Neural network design', 'Computer vision', 'NLP models', 'Advanced automation'],
    sample: 'Deep learning solution sample',
  },
]

const enterprisePillars = [
  ['Data Strategy', 'We audit data quality, availability, ownership, and business definitions before model development begins.'],
  ['Secure Architecture', 'Models are designed for controlled access, clean handoffs, audit-friendly workflows, and enterprise deployment standards.'],
  ['Operational Adoption', 'We align predictions with dashboards, CRM actions, service workflows, and team-level decision processes.'],
  ['Continuous Improvement', 'Model drift, accuracy, feedback loops, and retraining plans are built into the operating model.'],
]

const enterpriseMetrics = [
  ['30-90 days', 'Pilot to production roadmap'],
  ['API-ready', 'Integration-first delivery'],
  ['Governed', 'Data and model controls'],
]

const deliveryStages = [
  ['Discovery & Data Audit', 'Use cases, datasets, quality gaps, security constraints, and business KPIs are mapped into a clear ML roadmap.'],
  ['Model Design & Validation', 'We build, test, compare, and validate models against measurable accuracy, precision, recall, and business impact targets.'],
  ['Enterprise Integration', 'Approved models connect into dashboards, APIs, CRMs, support workflows, reporting systems, or automation layers.'],
  ['Monitoring & Optimization', 'Post-launch monitoring tracks drift, performance, user adoption, feedback, and retraining opportunities.'],
]

const sampleRows = [
  ['Lead score', '87/100', 'High purchase intent from recent repeat visits'],
  ['Churn risk', '18%', 'Retention offer not required this week'],
  ['Sales forecast', '+24%', 'Demand lift expected in the next 30 days'],
  ['Fraud signal', 'Low', 'No unusual transaction pattern detected'],
]

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function MachineLearningSolutionsPage() {
  const [activeService, setActiveService] = useState(serviceItems[0])
  const [backendSamples, setBackendSamples] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    useCase: '',
    otp: '',
  })
  const [otpToken, setOtpToken] = useState('')
  const [status, setStatus] = useState({ type: '', message: '' })
  const [step, setStep] = useState('details')
  const [isBusy, setIsBusy] = useState(false)
  const [hasRequestedSamples, setHasRequestedSamples] = useState(false)
  const activeBackendSample = useMemo(() => {
    const aiSamples = backendSamples.filter((sample) => sample.category === 'Artificial Intelligence')
    return aiSamples.find((sample) => sample.title.toLowerCase().includes(activeService.title.toLowerCase())) || aiSamples[0] || null
  }, [activeService.title, backendSamples])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    if (name === 'email') {
      setOtpToken('')
      setStep('details')
    }
  }

  const openSampleModal = (service = activeService) => {
    setActiveService(service)
    setStatus({ type: '', message: '' })
    setIsModalOpen(true)

    if (!hasRequestedSamples) {
      setHasRequestedSamples(true)
      apiRequest(SERVICE_SAMPLE_ENDPOINTS.publicList)
        .then((data) => setBackendSamples(data.samples || []))
        .catch(() => setBackendSamples([]))
    }
  }

  const scrollToServices = () => {
    document.getElementById('ml-services')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const selectService = (service) => {
    setActiveService(service)
    window.setTimeout(() => {
      document.getElementById('ml-service-detail')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 0)
  }

  const closeSampleModal = () => {
    if (isBusy) return
    setIsModalOpen(false)
  }

  const sendOtp = async () => {
    const email = form.email.trim().toLowerCase()
    if (!emailPattern.test(email)) {
      setStatus({ type: 'error', message: 'Please enter a correct email address before OTP.' })
      return
    }

    setIsBusy(true)
    setStatus({ type: '', message: '' })

    try {
      const data = await apiRequest(LEAD_ENDPOINTS.sendOtp, {
        method: 'POST',
        body: JSON.stringify({ email }),
      })
      if (data.ok === false) {
        throw new Error(data.message || 'Unable to send OTP.')
      }
      setStep('otp')
      setStatus({ type: 'success', message: data.message || 'OTP sent to your email address.' })
    } catch (error) {
      setStatus({ type: 'error', message: error instanceof Error ? error.message : 'Unable to send OTP.' })
    } finally {
      setIsBusy(false)
    }
  }

  const verifyOtp = async () => {
    if (!form.otp.trim()) {
      setStatus({ type: 'error', message: 'Please enter the OTP sent to your email.' })
      return
    }

    setIsBusy(true)
    setStatus({ type: '', message: '' })

    try {
      const data = await apiRequest(LEAD_ENDPOINTS.verifyOtp, {
        method: 'POST',
        body: JSON.stringify({ email: form.email.trim().toLowerCase(), otp: form.otp.trim() }),
      })
      setOtpToken(data.otpToken)
      setStep('verified')
      setStatus({ type: 'success', message: 'Email verified. Submit now to download the sample.' })
    } catch (error) {
      setStatus({ type: 'error', message: error instanceof Error ? error.message : 'Unable to verify OTP.' })
    } finally {
      setIsBusy(false)
    }
  }

  const submitLead = async (event) => {
    event.preventDefault()
    if (!otpToken) {
      setStatus({ type: 'error', message: 'Please verify your email OTP first.' })
      return
    }

    setIsBusy(true)
    setStatus({ type: '', message: '' })

    try {
      await apiRequest(LEAD_ENDPOINTS.publicCreate, {
        method: 'POST',
        body: JSON.stringify({
          name: form.name,
          email: form.email.trim().toLowerCase(),
          service: `Machine Learning Solutions - ${activeService.title}`,
          requiresEmailVerification: true,
          otpToken,
          query: [
            form.phone ? `Phone: ${form.phone}` : '',
            form.company ? `Company: ${form.company}` : '',
            `Selected ML service: ${activeService.title}`,
            form.useCase ? `Use case: ${form.useCase}` : '',
            `Requested sample: ${activeBackendSample?.title || activeService.sample}`,
          ].filter(Boolean).join('\n\n'),
        }),
      })

      downloadSample(activeService, activeBackendSample)
      setStatus({ type: 'success', message: 'Lead submitted. Your sample download has started.' })
      setForm({ name: '', email: '', phone: '', company: '', useCase: '', otp: '' })
      setOtpToken('')
      setStep('details')
      window.setTimeout(() => {
        setIsModalOpen(false)
        setStatus({ type: '', message: '' })
      }, 1800)
    } catch (error) {
      setStatus({ type: 'error', message: error instanceof Error ? error.message : 'Unable to submit lead.' })
    } finally {
      setIsBusy(false)
    }
  }

  return (
    <main className="overflow-hidden bg-white text-[#0f172a]">
      <section className="relative isolate px-5 pb-16 pt-32 sm:pt-36 lg:pt-32">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,#ffffff,#f4fbff_48%,#fff7f4)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#ff4b2d]/20 bg-[#fff4ef] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#ff4b2d]">
              <BrainCircuit size={16} /> Machine Learning Solutions
            </span>
            <h1 className="mt-7 text-4xl font-black leading-[1.03] text-[#0f172a] sm:text-6xl lg:text-7xl">
              Enterprise machine learning solutions for predictive, automated, and data-driven operations.
            </h1>
            <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-[#475569] sm:text-lg">
              Cromgen Technology builds secure, scalable, and business-aligned ML systems that turn enterprise data into forecasts, risk scores, customer intelligence, recommendations, and automation-ready decisions.
            </p>
            <div className="mt-8 grid max-w-2xl gap-4 sm:grid-cols-3">
              {enterpriseMetrics.map(([value, label]) => (
                <article key={label} className="rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white/85 p-4 shadow-lg shadow-slate-900/5">
                  <strong className="block text-xl font-black text-[#ff4b2d]">{value}</strong>
                  <span className="mt-2 block text-xs font-black uppercase tracking-[0.12em] text-[#64748b]">{label}</span>
                </article>
              ))}
            </div>
            <div className="mt-9 flex flex-wrap gap-4">
              <button type="button" onClick={() => openSampleModal(activeService)} className="inline-flex items-center gap-3 rounded-2xl bg-[#ff4b2d] px-7 py-4 text-sm font-black uppercase tracking-[0.12em] text-white shadow-2xl shadow-[#ff4b2d]/25 transition duration-300 hover:-translate-y-1 hover:bg-[#ff6348]">
                <Download size={18} /> Download Sample
              </button>
              <button type="button" onClick={scrollToServices} className="inline-flex items-center gap-3 rounded-2xl border border-[rgba(15,23,42,0.1)] bg-white px-7 py-4 text-sm font-black uppercase tracking-[0.12em] text-[#0f172a] shadow-xl shadow-slate-900/5 transition duration-300 hover:-translate-y-1 hover:border-[#ff4b2d]/40 hover:text-[#ff4b2d]">
                View Services
              </button>
            </div>
          </div>

          <div className="relative">
            <img src={aiServicesImage} alt="Machine learning analytics dashboard" className="h-auto w-full rounded-[2rem] border border-white shadow-2xl shadow-slate-900/14" />
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/50 bg-white/88 p-4 shadow-xl shadow-slate-950/10 backdrop-blur">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-black text-[#0f172a]">Lead Generation Model</span>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">Sample Ready</span>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                {['Scoring', 'Forecast', 'Churn'].map((item) => (
                  <span key={item} className="rounded-xl bg-[#f8fafc] px-3 py-3 text-xs font-black text-[#475569]">{item}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[rgba(15,23,42,0.08)] bg-[#0f172a] px-5 py-16 text-white">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Enterprise ML Program"
            title="From business use case to production-grade intelligence."
            copy="Our machine learning delivery model is built for enterprises that need measurable outcomes, clean governance, reliable integrations, and practical adoption across teams."
            dark
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {enterprisePillars.map(([title, copy], index) => (
              <article key={title} className="rounded-2xl border border-white/10 bg-white/6 p-6 shadow-xl shadow-slate-950/15">
                <span className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-white text-sm font-black text-[#ff4b2d]">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="text-lg font-black text-white">{title}</h3>
                <p className="mt-4 text-sm font-semibold leading-7 text-slate-300">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="ml-services" className="border-y border-[rgba(15,23,42,0.08)] bg-[#f8fafc] px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="ML Service Portfolio"
            title="Specialized machine learning services for enterprise teams."
            copy="Select any service to view its enterprise scope, related capabilities, and a downloadable sample after email OTP verification."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {serviceItems.map((item, index) => (
              <button
                type="button"
                key={item.title}
                onClick={() => selectService(item)}
                className={`rounded-2xl border p-5 text-left shadow-xl shadow-slate-900/5 transition duration-300 hover:-translate-y-1 hover:border-[#ff4b2d]/45 ${activeService.title === item.title ? 'border-[#ff4b2d] bg-[#fff7f4]' : 'border-[rgba(15,23,42,0.08)] bg-white'}`}
              >
                <span className="mb-4 grid h-10 w-10 place-items-center rounded-xl bg-[#fff1ed] text-sm font-black text-[#ff4b2d]">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="text-base font-black leading-6 text-[#0f172a]">{item.title}</h3>
                <span className="mt-4 inline-flex text-xs font-black uppercase tracking-[0.12em] text-[#ff4b2d]">Open Details</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="ml-service-detail" className="px-5 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <SectionTitle
              eyebrow="Selected Service"
              title={activeService.title}
              copy={activeService.copy}
            />
            <button type="button" onClick={() => openSampleModal(activeService)} className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-[#0f172a] px-7 py-4 text-sm font-black uppercase tracking-[0.12em] text-white shadow-xl shadow-slate-900/15 transition duration-300 hover:-translate-y-1 hover:bg-[#ff4b2d]">
              <Download size={18} /> Download {activeBackendSample?.title || activeService.sample}
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {activeService.related.map((item, index) => (
              <article key={item} className="rounded-2xl border border-[rgba(15,23,42,0.08)] bg-[#f8fafc] p-5 shadow-lg shadow-slate-900/5">
                <span className="mb-4 grid h-10 w-10 place-items-center rounded-xl bg-white text-sm font-black text-[#ff4b2d]">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="text-lg font-black text-[#0f172a]">{item}</h3>
                <p className="mt-3 text-sm font-semibold leading-6 text-[#475569]">Cromgen maps this capability to your business data, reporting structure, system integrations, and operational handoff process.</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[rgba(15,23,42,0.08)] bg-[#f8fafc] px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Delivery Governance"
            title="A controlled implementation process for enterprise ML."
            copy="Every engagement is structured around data readiness, validation, integration, monitoring, and business adoption so the model becomes a useful operating asset."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-4">
            {deliveryStages.map(([title, copy], index) => (
              <article key={title} className="rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white p-6 shadow-xl shadow-slate-900/5">
                <span className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-[#fff1ed] text-sm font-black text-[#ff4b2d]">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="text-lg font-black text-[#0f172a]">{title}</h3>
                <p className="mt-4 text-sm font-semibold leading-7 text-[#475569]">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[rgba(15,23,42,0.08)] px-5 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <SectionTitle
              eyebrow="Sample Preview"
              title={`${activeService.title} sample preview.`}
              copy="Select a service, review the related enterprise scope, verify your email with OTP, submit the lead details, and the sample will download automatically."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                [LineChart, 'Prediction'],
                [ShieldCheck, 'Validation'],
                [Sparkles, 'Auto Download'],
              ].map(([Icon, label]) => (
                <div key={label} className="rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white p-5 shadow-lg shadow-slate-900/5">
                  <Icon className="text-[#ff4b2d]" size={24} />
                  <strong className="mt-4 block text-sm font-black text-[#0f172a]">{label}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-[rgba(15,23,42,0.08)] bg-[#0f172a] p-5 text-white shadow-2xl shadow-slate-900/20">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ff9b88]">Sample Dashboard</p>
                <h2 className="mt-2 text-2xl font-black">Lead AI Output</h2>
              </div>
              <BarChart3 className="text-[#ff9b88]" size={30} />
            </div>
            <div className="grid gap-3">
              {sampleRows.map(([metric, value, note]) => (
                <article key={metric} className="rounded-2xl border border-white/10 bg-white/6 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-bold text-slate-300">{metric}</span>
                    <strong className="text-lg font-black text-[#ff9b88]">{value}</strong>
                  </div>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-400">{note}</p>
                </article>
              ))}
            </div>
            <button type="button" onClick={() => openSampleModal(activeService)} className="mt-5 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-6 py-4 text-sm font-black uppercase tracking-[0.12em] text-[#0f172a] transition duration-300 hover:-translate-y-1 hover:text-[#ff4b2d]">
              <Mail size={18} /> Get Full Sample
            </button>
          </div>
        </div>
      </section>

      {isModalOpen ? (
        <SampleLeadModal
          form={form}
          status={status}
          step={step}
          isBusy={isBusy}
          otpToken={otpToken}
          selectedService={activeService}
          onChange={handleChange}
          onClose={closeSampleModal}
          onSendOtp={sendOtp}
          onVerifyOtp={verifyOtp}
          onSubmit={submitLead}
        />
      ) : null}
    </main>
  )
}

function SampleLeadModal({ form, status, step, isBusy, otpToken, selectedService, onChange, onClose, onSendOtp, onVerifyOtp, onSubmit }) {
  return (
    <div className="fixed inset-0 z-[90] grid place-items-center bg-[#0f172a]/55 px-4 py-6 backdrop-blur-md" role="dialog" aria-modal="true" aria-labelledby="ml-sample-title">
      <div className="max-h-[92vh] w-full max-w-[720px] overflow-y-auto rounded-[2rem] border border-white/60 bg-white text-[#0f172a] shadow-2xl shadow-slate-950/25">
        <div className="border-b border-[rgba(15,23,42,0.08)] bg-[#fff7f4] px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ff4b2d]">Email OTP Required</p>
              <h2 id="ml-sample-title" className="mt-2 text-2xl font-black">Download {selectedService.sample}</h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-[#475569]">After email verification, your lead details will be saved and the selected sample will download automatically.</p>
            </div>
            <button type="button" onClick={onClose} disabled={isBusy} className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white text-xl font-black text-[#475569] shadow-lg shadow-slate-900/5 transition hover:-translate-y-0.5 hover:border-[#ff4b2d]/40 hover:text-[#ff4b2d] disabled:cursor-wait">
              x
            </button>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-5 p-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <LeadField label="Your Name" name="name" value={form.name} onChange={onChange} required />
            <LeadField label="Correct Email ID" name="email" type="email" value={form.email} onChange={onChange} required />
            <LeadField label="Mobile Number" name="phone" type="tel" value={form.phone} onChange={onChange} />
            <LeadField label="Company Name" name="company" value={form.company} onChange={onChange} />
          </div>

          <label className="block">
            <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#475569]">ML Requirement</span>
            <textarea name="useCase" value={form.useCase} onChange={onChange} required rows="3" placeholder={`Example: ${selectedService.title} requirement, data source, goal, or report need`} className="w-full resize-none rounded-2xl border border-[rgba(15,23,42,0.08)] bg-[#f8fafc] px-4 py-4 text-sm font-bold text-[#0f172a] outline-none transition placeholder:text-[#94a3b8] focus:border-[#ff4b2d] focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,75,45,0.12)]" />
          </label>

          <div className="rounded-2xl border border-[rgba(15,23,42,0.08)] bg-[#f8fafc] p-4">
            <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
              <LeadField label="Email OTP" name="otp" value={form.otp} onChange={onChange} />
              <div className="flex items-end gap-3">
                <button type="button" onClick={onSendOtp} disabled={isBusy} className="min-h-[52px] rounded-2xl border border-[#ff4b2d]/25 bg-white px-5 text-xs font-black uppercase tracking-[0.12em] text-[#ff4b2d] transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70">
                  {step === 'details' ? 'Send OTP' : 'Resend OTP'}
                </button>
                <button type="button" onClick={onVerifyOtp} disabled={isBusy || step === 'details'} className="min-h-[52px] rounded-2xl bg-[#0f172a] px-5 text-xs font-black uppercase tracking-[0.12em] text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50">
                  Verify
                </button>
              </div>
            </div>
            {otpToken ? (
              <p className="mt-3 flex items-center gap-2 text-sm font-bold text-emerald-700"><CheckCircle2 size={18} /> Email verified successfully.</p>
            ) : null}
          </div>

          {status.message ? (
            <p className={`rounded-2xl px-4 py-3 text-sm font-bold ${status.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
              {status.message}
            </p>
          ) : null}

          <button type="submit" disabled={isBusy || !otpToken} className="w-full rounded-2xl bg-gradient-to-r from-[#ff4b2d] to-[#ff6b4a] px-6 py-4 text-sm font-black uppercase tracking-[0.12em] text-white shadow-2xl shadow-[#ff4b2d]/25 transition duration-300 hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-60">
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
      <input name={name} type={type} value={value} onChange={onChange} required={required} placeholder={label} className="min-h-[52px] w-full rounded-2xl border border-[rgba(15,23,42,0.08)] bg-[#f8fafc] px-4 py-4 text-sm font-bold text-[#0f172a] outline-none transition placeholder:text-[#94a3b8] focus:border-[#ff4b2d] focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,75,45,0.12)]" />
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

function downloadSample(service, backendSample) {
  const sample = [
    `Cromgen Technology - ${backendSample?.title || service.sample}`,
    '',
    `Selected service: ${service.title}`,
    `Overview: ${service.copy}`,
    backendSample?.summary ? `Backend sample summary: ${backendSample.summary}` : '',
    '',
    'Related scope:',
    ...service.related.map((item) => `- ${item}`),
    '',
    backendSample?.content || [
      'Model summary:',
      '- Lead score: 87/100',
      '- Churn risk: 18%',
      '- Sales forecast: +24% next 30 days',
      '- Fraud signal: Low',
      '',
      'Recommended actions:',
      '- Prioritize this lead for sales follow-up within 24 hours.',
      '- Use recommendation engine output for bundled service offer.',
      '- Track conversion outcome to retrain model quality.',
    ].join('\n'),
  ].filter(Boolean).join('\n')

  const blob = new Blob([sample], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'cromgen-machine-learning-lead-generation-sample.txt'
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

