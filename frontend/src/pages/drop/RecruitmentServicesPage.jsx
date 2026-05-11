import { useEffect, useState } from 'react'
import logo from '../../assets/cromgen-logo.png'
import recruitmentHero from '../../assets/recruitment-services-hero.png'

const metrics = [
  ['48 hr', 'Shortlist planning'],
  ['14+', 'Hiring functions'],
  ['3-step', 'Quality screening'],
]

const hiringServices = [
  ['Executive search', 'Leadership and senior-role hiring with confidential market mapping.'],
  ['Bulk recruitment', 'High-volume hiring support for operations, sales, support, and field teams.'],
  ['Technical recruitment', 'Developer, IT, cloud, QA, data, and digital-role candidate screening.'],
  ['Non-IT recruitment', 'HR, finance, admin, marketing, customer support, and business roles.'],
  ['Interview coordination', 'Scheduling, candidate follow-up, panel alignment, and status tracking.'],
  ['Offer support', 'Salary benchmarking, negotiation assistance, and joining confirmation.'],
]

const process = [
  ['Role Discovery', 'We clarify business goals, must-have skills, budget range, location, shift, and joining timeline.'],
  ['Talent Mapping', 'Our team builds a targeted sourcing plan across job portals, networks, referrals, and passive candidates.'],
  ['Screening Layer', 'Candidates are checked for role fit, communication, experience proof, expectations, and availability.'],
  ['Interview Desk', 'We manage shortlists, interview schedules, feedback loops, and candidate engagement till closure.'],
]

const industries = [
  'IT & Software',
  'BPO & Customer Support',
  'Digital Marketing',
  'Telecom',
  'Healthcare',
  'Finance',
  'Retail',
  'Startups',
]

const differentiators = [
  'Role-specific sourcing strategy',
  'Verified candidate communication',
  'Clear hiring tracker and weekly reports',
  'Replacement-friendly engagement model',
  'Employer-brand focused candidate experience',
  'Confidential hiring support for sensitive roles',
]

const recruitmentHighlights = [
  ['Hiring brief setup', 'Role clarity, salary range, experience level, and screening filters before sourcing starts.'],
  ['Candidate sourcing', 'Job portals, referrals, networks, and passive talent reach for better-fit profiles.'],
  ['Shortlist reporting', 'Clean candidate tracker with status, remarks, feedback, and next action visibility.'],
]

const faq = [
  [
    'What type of recruitment services does Cromgen Technology provide?',
    'We support permanent hiring, bulk hiring, executive search, technical recruitment, non-IT recruitment, interview coordination, and offer-stage follow-up.',
  ],
  [
    'Can you manage urgent hiring requirements?',
    'Yes. For priority roles, we create a focused sourcing plan, share a shortlist timeline, and keep the hiring team updated with practical candidate availability.',
  ],
  [
    'Do you help with job descriptions and candidate screening?',
    'Yes. We can refine job descriptions, define screening questions, check expectations, and present only relevant candidates for interview rounds.',
  ],
]

export function RecruitmentServicesPage() {
  const [leadForm, setLeadForm] = useState({
    name: '',
    company: '',
    contact: '',
    role: '',
    openings: '',
    timeline: '',
    details: '',
  })

  const handleLeadChange = (event) => {
    setLeadForm({ ...leadForm, [event.target.name]: event.target.value })
  }

  const handleLeadSubmit = (event) => {
    event.preventDefault()
    alert('Recruitment lead submitted successfully. Our team will contact you shortly.')
    setLeadForm({
      name: '',
      company: '',
      contact: '',
      role: '',
      openings: '',
      timeline: '',
      details: '',
    })
  }

  useEffect(() => {
    const previousTitle = document.title
    const description =
      'Premium recruitment services by Cromgen Technology for permanent hiring, bulk recruitment, technical recruitment, executive search, screening, interviews, and offer support.'
    const canonicalUrl = `${window.location.origin}/hr-consultant/recruitment-services`

    document.title = 'Recruitment Services | Hiring & Talent Staffing | Cromgen Technology'
    setMeta('description', description)
    setMeta('keywords', 'recruitment services, hiring agency, staffing services, talent acquisition, bulk hiring, technical recruitment, HR consultant')
    setLink('canonical', canonicalUrl)
    setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Recruitment Services',
      provider: {
        '@type': 'Organization',
        name: 'Cromgen Technology',
        url: window.location.origin,
      },
      areaServed: 'Global',
      serviceType: 'Recruitment, Staffing, Talent Acquisition and HR Consulting',
      description,
    })

    return () => {
      document.title = previousTitle
    }
  }, [])

  return (
    <main className="recruitment-page bg-[#f6faf9] pt-32 text-[#142123] sm:pt-36 lg:pt-28">
      <section className="recruitment-hero relative overflow-hidden border-b border-[#d8e5e2] bg-white">
        <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#082a66,#ff4b2d,#63bc45)]" />
        <div className="absolute left-0 top-16 hidden h-px w-full bg-[#d8e5e2] lg:block" />
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-20">
          <div className="recruitment-hero-copy-block">
            <p className="recruitment-eyebrow text-sm font-black uppercase tracking-[0.18em] text-[#ff4b2d]">
              Strategic Recruitment Partner
            </p>
            <h1 className="recruitment-hero-title mt-4 max-w-4xl text-4xl font-black leading-tight text-[#0f191b] sm:text-5xl lg:text-6xl">
              Build a stronger team with a smarter hiring desk.
            </h1>
            <p className="recruitment-hero-copy mt-6 max-w-2xl text-lg leading-8 text-[#53676a]">
              Cromgen Technology helps companies source, screen, coordinate, and close the right talent with a
              structured recruitment system. You get clear role planning, filtered shortlists, interview support,
              and practical hiring follow-up from one reliable HR team.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://cromgenrozgar.in"
                className="rounded-full bg-[#ff4b2d] px-6 py-3 text-sm font-black uppercase tracking-[0.12em] text-white shadow-lg shadow-[#ff4b2d]/20 transition hover:bg-[#082a66]"
              >
                Start Hiring
              </a>
              <a
                href="/hr-consultant/recruitment-services/process"
                className="rounded-full border border-[#b8cbc7] bg-white px-6 py-3 text-sm font-black uppercase tracking-[0.12em] text-[#142123] transition hover:border-[#63bc45] hover:text-[#0b6868]"
              >
                View Process
              </a>
            </div>
          </div>

          <div className="recruitment-visual recruitment-image-showcase relative">
            <div className="recruitment-photo-card">
              <img
                src={recruitmentHero}
                alt="Professional recruitment team reviewing candidate profiles"
              />
              <div className="recruitment-photo-overlay">
                <span className="talent-logo">
                  <img src={logo} alt="Cromgen Technology" />
                </span>
                <div>
                  <p>Recruitment Services</p>
                  <h2>Screened talent, organized hiring, faster closures.</h2>
                </div>
              </div>
            </div>

            <div className="recruitment-image-panel">
              <span>What we manage</span>
              <h3>JD creation, sourcing, screening, interview coordination, and offer follow-up.</h3>
            </div>

            <div className="talent-metric-strip image-metric-strip">
              {metrics.map(([value, label]) => (
                <div key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="recruitment-section bg-white py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ff4b2d]">Recruitment content</p>
            <h2 className="mt-3 text-3xl font-black leading-tight text-[#0f191b] sm:text-4xl">
              End-to-end recruitment support for quality hiring.
            </h2>
            <p className="mt-4 text-base leading-8 text-[#53676a]">
              We do not only forward resumes. Our recruitment team understands your business requirement,
              prepares a hiring brief, filters candidates, coordinates interviews, and keeps follow-up active
              until the role is closed.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {recruitmentHighlights.map(([title, copy]) => (
              <article key={title} className="rounded-[8px] border border-[#dce7e5] bg-[#fbfdfd] p-6">
                <h3 className="text-lg font-black text-[#0f191b]">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#617174]">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="recruitment-section border-b border-[#dce7e5] bg-[#f6faf9] py-14">
        <div className="mx-auto max-w-7xl px-5">
          <SectionIntro
            eyebrow="Recruitment solutions"
            title="Complete hiring support for technical, non-technical, and volume roles."
            copy="Every requirement gets a clear hiring brief, defined candidate filters, shortlist cadence, and practical follow-up so your internal team can focus on decisions."
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {hiringServices.map(([title, copy]) => (
              <article
                key={title}
                className="rounded-[8px] border border-[#dce7e5] bg-white p-6 transition hover:-translate-y-1 hover:border-[#b6cbc7] hover:shadow-xl hover:shadow-[#5c736f]/10"
              >
                <h3 className="text-xl font-black text-[#0f191b]">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#617174]">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="recruitment-process" className="recruitment-section bg-white py-14">
        <div className="mx-auto max-w-7xl px-5">
          <SectionIntro
            eyebrow="Hiring process"
            title="A clean recruitment workflow from requirement to joining."
            copy="Premium hiring is not just sending resumes. It is role clarity, market reach, candidate trust, screening quality, and disciplined communication."
          />
          <div className="grid gap-4 lg:grid-cols-4">
            {process.map(([title, copy], index) => (
              <article key={title} className="relative rounded-[8px] border border-[#dce7e5] bg-[#fbfdfd] p-6">
                <span className="text-sm font-black uppercase tracking-[0.14em] text-[#3e3aa3]">
                  Step {index + 1}
                </span>
                <h3 className="mt-3 text-xl font-black text-[#0f191b]">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#617174]">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="recruitment-band border-y border-[#dce7e5] bg-[#082a66] py-14 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#9ee383]">Why choose Cromgen</p>
            <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
              Recruitment designed for speed, fit, and professional candidate experience.
            </h2>
            <p className="mt-5 text-base leading-8 text-[#d7e4ff]">
              We combine HR consulting discipline with practical sourcing execution, giving your company a hiring
              partner that understands both people and business urgency.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {differentiators.map((item) => (
              <div key={item} className="rounded-[8px] border border-white/15 bg-white/8 p-5">
                <span className="mb-4 block h-1.5 w-12 rounded-full bg-[#ff4b2d]" />
                <h3 className="text-base font-black leading-6">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="recruitment-section bg-[#f6faf9] py-14">
        <div className="mx-auto max-w-7xl px-5">
          <SectionIntro
            eyebrow="Industries and roles"
            title="Flexible hiring support for fast-moving business teams."
            copy="Cromgen can support hiring across operational, technical, customer-facing, and business functions with a custom plan for each role category."
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((industry) => (
              <div
                key={industry}
                className="rounded-[8px] border border-[#dce7e5] bg-white p-5 text-center text-sm font-black uppercase tracking-[0.1em] text-[#0f191b]"
              >
                {industry}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="recruitment-section bg-white py-14">
        <div className="mx-auto max-w-7xl px-5">
          <SectionIntro
            eyebrow="Recruitment FAQ"
            title="Helpful answers before you start hiring with us."
          />
          <div className="grid gap-4 lg:grid-cols-3">
            {faq.map(([question, answer]) => (
              <article key={question} className="rounded-[8px] border border-[#dce7e5] bg-[#fbfdfd] p-6">
                <h3 className="text-lg font-black leading-7 text-[#0f191b]">{question}</h3>
                <p className="mt-4 text-sm leading-7 text-[#617174]">{answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="recruitment-lead-form" className="recruitment-lead-section border-t border-[#dce7e5] bg-[#f6faf9] py-14">
        <div className="mx-auto max-w-7xl px-5">
          <div className="recruitment-lead-shell grid gap-8 rounded-[8px] border border-[#d8e5e2] bg-white p-6 shadow-xl shadow-[#5c736f]/10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start lg:p-8">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ff4b2d]">Start hiring</p>
              <h2 className="mt-3 text-3xl font-black leading-tight text-[#0f191b]">
                Share your requirement and get a structured recruitment plan.
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-[#53676a]">
                Send us the role title, location, salary range, experience level, and expected joining timeline.
                Our team will help you convert the requirement into a clear hiring action plan.
              </p>
              <div className="mt-6 grid gap-3 text-sm font-bold text-[#425558] sm:grid-cols-2">
                <div className="rounded-[8px] border border-[#dce7e5] bg-[#fbfdfd] p-4">
                  Shortlist strategy within 48 hours
                </div>
                <div className="rounded-[8px] border border-[#dce7e5] bg-[#fbfdfd] p-4">
                  Screening, interview, and offer support
                </div>
              </div>
            </div>

            <form onSubmit={handleLeadSubmit} className="recruitment-form grid gap-4 rounded-[8px] border border-[#dce7e5] bg-[#fbfdfd] p-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <LeadInput
                  label="Your name"
                  name="name"
                  value={leadForm.name}
                  onChange={handleLeadChange}
                  placeholder="Enter full name"
                  required
                />
                <LeadInput
                  label="Company name"
                  name="company"
                  value={leadForm.company}
                  onChange={handleLeadChange}
                  placeholder="Enter company name"
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <LeadInput
                  label="Phone or email"
                  name="contact"
                  value={leadForm.contact}
                  onChange={handleLeadChange}
                  placeholder="Best contact detail"
                  required
                />
                <LeadInput
                  label="Role to hire"
                  name="role"
                  value={leadForm.role}
                  onChange={handleLeadChange}
                  placeholder="Example: HR Executive"
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <LeadSelect
                  label="Open positions"
                  name="openings"
                  value={leadForm.openings}
                  onChange={handleLeadChange}
                  required
                >
                  <option value="">Select openings</option>
                  <option value="1-2">1-2 positions</option>
                  <option value="3-5">3-5 positions</option>
                  <option value="6-10">6-10 positions</option>
                  <option value="10+">10+ positions</option>
                </LeadSelect>
                <LeadSelect
                  label="Hiring timeline"
                  name="timeline"
                  value={leadForm.timeline}
                  onChange={handleLeadChange}
                  required
                >
                  <option value="">Select timeline</option>
                  <option value="Urgent">Urgent</option>
                  <option value="Within 7 days">Within 7 days</option>
                  <option value="Within 15 days">Within 15 days</option>
                  <option value="Within 30 days">Within 30 days</option>
                </LeadSelect>
              </div>

              <label className="grid gap-2">
                <span className="text-xs font-black uppercase tracking-[0.12em] text-[#425558]">
                  Requirement details
                </span>
                <textarea
                  name="details"
                  value={leadForm.details}
                  onChange={handleLeadChange}
                  rows="4"
                  placeholder="Share location, salary range, experience, shift, skills, or any special requirement."
                  className="w-full resize-none rounded-[8px] border border-[#cbdcd8] bg-white px-4 py-3 text-sm font-semibold leading-6 text-[#142123] outline-none transition placeholder:text-[#7d9295] focus:border-[#ff4b2d] focus:ring-4 focus:ring-[#ff4b2d]/10"
                />
              </label>

              <button
                type="submit"
                className="mt-1 inline-flex h-13 items-center justify-center rounded-full bg-[#082a66] px-7 py-4 text-sm font-black uppercase tracking-[0.12em] text-white shadow-lg shadow-[#082a66]/20 transition hover:bg-[#ff4b2d]"
              >
                Get Hiring Plan
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}

function LeadInput({ label, name, value, onChange, placeholder, required = false }) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-black uppercase tracking-[0.12em] text-[#425558]">{label}</span>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="h-12 w-full rounded-[8px] border border-[#cbdcd8] bg-white px-4 text-sm font-semibold text-[#142123] outline-none transition placeholder:text-[#7d9295] focus:border-[#ff4b2d] focus:ring-4 focus:ring-[#ff4b2d]/10"
      />
    </label>
  )
}

function LeadSelect({ label, name, value, onChange, required = false, children }) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-black uppercase tracking-[0.12em] text-[#425558]">{label}</span>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="h-12 w-full rounded-[8px] border border-[#cbdcd8] bg-white px-4 text-sm font-semibold text-[#142123] outline-none transition focus:border-[#ff4b2d] focus:ring-4 focus:ring-[#ff4b2d]/10"
      >
        {children}
      </select>
    </label>
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

function setMeta(name, content) {
  let tag = document.querySelector(`meta[name="${name}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('name', name)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

function setLink(rel, href) {
  let tag = document.querySelector(`link[rel="${rel}"]`)
  if (!tag) {
    tag = document.createElement('link')
    tag.setAttribute('rel', rel)
    document.head.appendChild(tag)
  }
  tag.setAttribute('href', href)
}

function setJsonLd(data) {
  const id = 'recruitment-services-json-ld'
  let script = document.getElementById(id)
  if (!script) {
    script = document.createElement('script')
    script.id = id
    script.type = 'application/ld+json'
    document.head.appendChild(script)
  }
  script.textContent = JSON.stringify(data)
}
