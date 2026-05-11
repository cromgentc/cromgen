import { useEffect, useState } from 'react'
import logo from '../../assets/cromgen-logo.png'
import recruitmentHero from '../../assets/recruitment-services-hero.png'
import bulkTalentAcquisition from '../../assets/talent-acquisition/bulk-talent-acquisition.png'
import campusFresherHiring from '../../assets/talent-acquisition/campus-fresher-hiring.png'
import candidatePipeline from '../../assets/talent-acquisition/candidate-pipeline.png'
import diversityHiring from '../../assets/talent-acquisition/diversity-hiring.png'
import employerBranding from '../../assets/talent-acquisition/employer-branding.png'
import executiveSearch from '../../assets/talent-acquisition/executive-search.png'
import hiringAnalytics from '../../assets/talent-acquisition/hiring-analytics.png'
import interviewCoordination from '../../assets/talent-acquisition/interview-coordination.png'
import offerClosureSupport from '../../assets/talent-acquisition/offer-closure-support.png'
import screeningFramework from '../../assets/talent-acquisition/screening-framework.png'

const metrics = [
  ['360', 'Talent search'],
  ['48 hr', 'Sourcing plan'],
  ['Multi', 'Channel reach'],
]

const acquisitionServices = [
  {
    title: 'Bulk Talent Acquisition',
    copy: 'High-volume hiring support for BFSI, BPO, sales, support, field, and operations teams with batch-wise screening.',
    image: bulkTalentAcquisition,
  },
  {
    title: 'Campus & Fresher Hiring',
    copy: 'Entry-level talent pipeline for fresher roles, trainee positions, internships, and early-career workforce needs.',
    image: campusFresherHiring,
  },
  {
    title: 'Candidate Pipeline',
    copy: 'Build a ready pool of interested candidates for recurring roles, expansion hiring, and urgent future openings.',
    image: candidatePipeline,
  },
  {
    title: 'Diversity Hiring',
    copy: 'Broaden candidate reach with inclusive sourcing and balanced shortlist support across functions and locations.',
    image: diversityHiring,
  },
  {
    title: 'Employer Branding',
    copy: 'Present your company, role, benefits, growth path, and work culture clearly to improve candidate response.',
    image: employerBranding,
  },
  {
    title: 'Executive Search',
    copy: 'Confidential sourcing and screening support for senior, leadership, niche, and business-critical positions.',
    image: executiveSearch,
  },
  {
    title: 'Hiring Analytics',
    copy: 'Track sourcing response, shortlist quality, interview movement, closure progress, and hiring bottlenecks.',
    image: hiringAnalytics,
  },
  {
    title: 'Interview Coordination',
    copy: 'Organized interview scheduling, reminders, feedback follow-up, rescheduling, and candidate communication.',
    image: interviewCoordination,
  },
  {
    title: 'Offer & Closure Support',
    copy: 'Support for salary expectation checks, offer discussion, joining confirmation, and candidate follow-through.',
    image: offerClosureSupport,
  },
  {
    title: 'Screening Framework',
    copy: 'Filter candidates by skills, experience, salary budget, notice period, communication, and role-fit criteria.',
    image: screeningFramework,
  },
]

const process = [
  ['Workforce Brief', 'We define roles, ideal candidate persona, salary range, joining timeline, and hiring priority.'],
  ['Market Mapping', 'We study candidate availability, channel fit, competition, and sourcing difficulty.'],
  ['Outreach Campaign', 'We run targeted sourcing and candidate engagement across relevant talent channels.'],
  ['Shortlist Review', 'We share filtered profiles with remarks, expectations, and interview readiness.'],
]

const channels = [
  'Job portals',
  'Professional networks',
  'Referral search',
  'Passive candidates',
  'Local hiring pools',
  'Role-specific communities',
  'Campus and fresher pools',
  'Internal talent database',
]

const faq = [
  [
    'How is talent acquisition different from recruitment?',
    'Recruitment usually focuses on filling current openings. Talent acquisition is broader and builds a long-term hiring strategy, talent pipeline, and employer positioning for future growth.',
  ],
  [
    'Can Cromgen support passive candidate sourcing?',
    'Yes. We can map the market, approach relevant candidates, explain the role professionally, and filter only interested and suitable profiles.',
  ],
  [
    'Do you support bulk and niche hiring?',
    'Yes. We can create separate sourcing plans for volume hiring and specialized roles depending on skills, location, salary range, and timeline.',
  ],
]

export function TalentAcquisitionPage() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    contact: '',
    requirement: '',
    message: '',
  })

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    alert('Talent acquisition enquiry submitted successfully.')
    setFormData({
      name: '',
      company: '',
      contact: '',
      requirement: '',
      message: '',
    })
  }

  useEffect(() => {
    const previousTitle = document.title
    document.title = 'Talent Acquisition Services | Cromgen Technology'
    setMeta(
      'description',
      'Talent acquisition services by Cromgen Technology for strategic sourcing, talent mapping, candidate pipeline, employer positioning, screening and hiring analytics.',
    )
    setMeta(
      'keywords',
      'talent acquisition services, strategic sourcing, talent mapping, candidate pipeline, hiring strategy, HR consultant, Cromgen Technology',
    )

    return () => {
      document.title = previousTitle
    }
  }, [])

  return (
    <main className="talent-page bg-[#f6faf9] pt-32 text-[#142123] sm:pt-36 lg:pt-28">
      <section className="talent-hero">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-[0.94fr_1.06fr] lg:items-center lg:py-20">
          <div>
            <p className="recruitment-eyebrow text-sm font-black uppercase tracking-[0.18em] text-[#ff4b2d]">
              Talent Acquisition
            </p>
            <h1 className="mt-4 text-4xl font-black leading-tight text-[#071936] sm:text-5xl lg:text-6xl">
              Build a reliable talent pipeline before hiring becomes urgent.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#53676a]">
              Cromgen Technology helps businesses plan, source, engage, screen, and organize talent for
              current and future roles. Our approach focuses on better-fit candidates, stronger hiring
              visibility, and a structured acquisition process.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#talent-enquiry"
                className="rounded-full bg-[#ff4b2d] px-6 py-3 text-sm font-black uppercase tracking-[0.12em] text-white shadow-lg shadow-[#ff4b2d]/20 transition hover:bg-[#082a66]"
              >
                Build Pipeline
              </a>
              <a
                href="#talent-process"
                className="rounded-full border border-[#b8cbc7] bg-white px-6 py-3 text-sm font-black uppercase tracking-[0.12em] text-[#142123] transition hover:border-[#63bc45] hover:text-[#0b6868]"
              >
                View Strategy
              </a>
            </div>
          </div>

          <div className="talent-hero-visual">
            <img src={recruitmentHero} alt="Talent acquisition team reviewing candidate strategy" />
            <div className="talent-hero-card">
              <span className="grid h-14 w-14 place-items-center rounded-[8px] bg-white">
                <img src={logo} alt="Cromgen Technology" className="h-10 w-10 object-contain" />
              </span>
              <div>
                <p>Talent Strategy Desk</p>
                <h2>Source, engage, screen, and nurture better candidates.</h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="talent-strip bg-white py-10">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 md:grid-cols-3">
          {metrics.map(([value, label]) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#f6faf9] py-14">
        <div className="mx-auto max-w-7xl px-5">
          <div className="talent-banner">
            <img src={candidatePipeline} alt="Talent acquisition candidate pipeline banner" />
            <div className="talent-banner-content">
              <p>Talent Acquisition Campaign</p>
              <h2>Plan hiring before vacancies slow your business down.</h2>
              <span>
                Build a ready candidate pipeline for sales, support, HR, IT, BFSI, BPO, and operations teams
                with structured sourcing and screening.
              </span>
              <a href="#talent-enquiry">Start Talent Campaign</a>
            </div>
          </div>
        </div>
      </section>

      <section className="talent-section bg-[#f6faf9] py-14">
        <div className="mx-auto max-w-7xl px-5">
          <SectionIntro
            eyebrow="What we do"
            title="Talent acquisition services for planned and growth-stage hiring."
            copy="We help you build a repeatable system for identifying, engaging, and converting the right talent for your business."
          />
          <div className="talent-image-grid">
            {acquisitionServices.map((service, index) => (
              <article key={service.title} className="talent-image-card">
                <div className="talent-image-card-media">
                  <img src={service.image} alt={`${service.title} talent acquisition service`} />
                  <span>{String(index + 1).padStart(2, '0')}</span>
                </div>
                <div className="talent-image-card-body">
                  <h3>{service.title}</h3>
                  <p>{service.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="talent-process" className="talent-section bg-white py-14">
        <div className="mx-auto max-w-7xl px-5">
          <SectionIntro
            eyebrow="Strategy process"
            title="A structured talent acquisition process from planning to shortlist."
            copy="The goal is to reduce random hiring activity and create a clear talent funnel for your team."
          />
          <div className="grid gap-4 lg:grid-cols-4">
            {process.map(([title, copy], index) => (
              <article key={title} className="talent-step">
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="talent-dark py-14 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#9ee383]">Sourcing channels</p>
            <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
              Multi-channel reach for active and passive candidates.
            </h2>
            <p className="mt-5 text-base leading-8 text-[#d7e4ff]">
              Every role needs a different sourcing mix. We select channels based on urgency, seniority,
              location, salary range, and candidate availability.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {channels.map((channel) => (
              <div key={channel} className="talent-channel">
                {channel}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="talent-section bg-white py-14">
        <div className="mx-auto max-w-7xl px-5">
          <SectionIntro eyebrow="FAQ" title="Talent acquisition questions." />
          <div className="grid gap-4 lg:grid-cols-3">
            {faq.map(([question, answer]) => (
              <article key={question} className="talent-card">
                <h3>{question}</h3>
                <p>{answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="talent-enquiry" className="bg-[#f6faf9] py-14">
        <div className="mx-auto max-w-7xl px-5">
          <div className="talent-enquiry">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ff4b2d]">Start acquisition</p>
              <h2>Share your talent requirement and get a sourcing strategy.</h2>
              <p>
                Tell us the role category, location, experience level, timeline, and hiring challenge. We will help
                you create a practical acquisition plan.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <LeadInput label="Your name" name="name" value={formData.name} onChange={handleChange} required />
                <LeadInput label="Company" name="company" value={formData.company} onChange={handleChange} required />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <LeadInput label="Phone or email" name="contact" value={formData.contact} onChange={handleChange} required />
                <LeadInput label="Hiring requirement" name="requirement" value={formData.requirement} onChange={handleChange} required />
              </div>
              <label>
                <span>Talent acquisition notes</span>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Example: Need sales pipeline for BFSI roles in Delhi NCR within 30 days."
                />
              </label>
              <button type="submit">Get Talent Plan</button>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}

function SectionIntro({ eyebrow, title, copy }) {
  return (
    <div className="mb-9 max-w-3xl">
      <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ff4b2d]">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-black leading-tight text-[#0f191b] sm:text-4xl">{title}</h2>
      {copy ? <p className="mt-4 text-base leading-8 text-[#53676a]">{copy}</p> : null}
    </div>
  )
}

function LeadInput({ label, name, value, onChange, required = false }) {
  return (
    <label>
      <span>{label}</span>
      <input type="text" name={name} value={value} onChange={onChange} required={required} />
    </label>
  )
}

function setMeta(name, content) {
  let tag = document.querySelector(`meta[name="${name}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('name', name)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}
