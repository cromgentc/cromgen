import { useEffect } from 'react'
import logo from '../../assets/cromgen-logo.png'
import recruitmentHero from '../../assets/recruitment-services-hero.png'

const serviceGroups = [
  {
    title: 'Recruitment Services',
    copy: 'Complete hiring support from requirement collection to candidate joining. We help companies save time, improve candidate quality, and keep hiring communication organized.',
    points: ['Role requirement planning', 'Candidate database search', 'Shortlist sharing', 'Interview scheduling'],
  },
  {
    title: 'Payroll',
    copy: 'Payroll coordination support for businesses that need organized salary inputs, attendance data, documentation, and HR follow-up for active workforce teams.',
    points: ['Payroll data collection', 'Attendance coordination', 'Salary input checks', 'Employee record support'],
  },
  {
    title: 'HR Consulting',
    copy: 'Practical HR consulting for companies that need recruitment planning, workforce structure, employee documentation, and people-operation guidance.',
    points: ['Hiring strategy', 'HR process setup', 'Documentation guidance', 'Workforce planning'],
  },
]

const hiringModels = [
  ['Permanent hiring', 'Long-term employee hiring for business-critical roles with proper screening, expectation checks, and interview coordination.'],
  ['Contract staffing', 'Flexible staffing for project-based, temporary, seasonal, or urgent workforce needs with controlled timelines.'],
  ['Bulk hiring', 'High-volume hiring for BFSI, BPO, sales, field, support, operations, retail, and similar fast-scaling teams.'],
  ['Candidate sourcing', 'Active and passive candidate sourcing through portals, referrals, internal database, and role-specific talent mapping.'],
  ['Screening', 'Profile screening based on skills, communication, experience, salary expectation, location, notice period, and role fit.'],
  ['Interview coordination', 'Interview scheduling, candidate reminders, feedback follow-up, rescheduling support, and closure tracking.'],
]

const joinSteps = [
  ['Submit requirement', 'Company shares role title, location, openings, salary range, job description, experience level, and joining timeline.'],
  ['Cromgen Rozgar review', 'Our team reviews the requirement, clarifies missing details, and prepares a recruitment action plan.'],
  ['Sourcing and screening', 'Candidates are sourced, contacted, screened, and filtered before being shared with your hiring team.'],
  ['Interview and selection', 'We coordinate interview slots, manage communication, collect feedback, and support final selection.'],
  ['Offer and joining', 'Offer discussion, documentation follow-up, joining confirmation, and replacement-support terms can be coordinated as per engagement.'],
]

const industries = [
  'BFSI',
  'BPO / KPO',
  'IT & Software',
  'Telecom',
  'Retail',
  'Healthcare',
  'Field Sales',
  'Back Office',
]

export function RecruitmentServicesProcessPage() {
  useEffect(() => {
    const previousTitle = document.title
    document.title = 'Recruitment Process | Cromgen Rozgar Hiring Services'
    setMeta(
      'description',
      'Cromgen Rozgar recruitment process for permanent hiring, contract staffing, bulk hiring, candidate sourcing, screening, interview coordination, payroll and HR consulting.',
    )

    return () => {
      document.title = previousTitle
    }
  }, [])

  return (
    <main className="rozgar-process-page bg-[#f6faf9] pt-32 text-[#142123] sm:pt-36 lg:pt-28">
      <section className="rozgar-process-hero">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:py-20">
          <div>
            <p className="recruitment-eyebrow text-sm font-black uppercase tracking-[0.18em] text-[#ff4b2d]">
              Cromgen Rozgar
            </p>
            <h1 className="mt-4 text-4xl font-black leading-tight text-[#071936] sm:text-5xl lg:text-6xl">
              Join Cromgen Rozgar for recruitment, payroll, and HR consulting support.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#53676a]">
              Companies can connect with Cromgen Rozgar to hire permanent employees, contract staff,
              bulk teams, and screened candidates with a structured process from requirement to joining.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://cromgenrozgar.in"
                className="rounded-full bg-[#ff4b2d] px-6 py-3 text-sm font-black uppercase tracking-[0.12em] text-white shadow-lg shadow-[#ff4b2d]/20 transition hover:bg-[#082a66]"
              >
                Join Cromgen Rozgar
              </a>
              <a
                href="#rozgar-process-details"
                className="rounded-full border border-[#b8cbc7] bg-white px-6 py-3 text-sm font-black uppercase tracking-[0.12em] text-[#142123] transition hover:border-[#63bc45] hover:text-[#0b6868]"
              >
                See Full Details
              </a>
            </div>
          </div>

          <div className="rozgar-process-image">
            <img src={recruitmentHero} alt="Recruitment services team working on hiring requirements" />
            <div>
              <span className="grid h-14 w-14 place-items-center rounded-[8px] bg-white">
                <img src={logo} alt="Cromgen Technology" className="h-10 w-10 object-contain" />
              </span>
              <p>Permanent hiring, contract staffing, bulk hiring and HR operations in one process.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="rozgar-process-details" className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHeading
            eyebrow="Core services"
            title="What companies can get through Cromgen Rozgar."
            copy="Each service is designed for practical business hiring needs, from single senior positions to high-volume team hiring."
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {serviceGroups.map((service) => (
              <article key={service.title} className="rozgar-service-card">
                <h2>{service.title}</h2>
                <p>{service.copy}</p>
                <ul>
                  {service.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f6faf9] py-14">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHeading
            eyebrow="Hiring solutions"
            title="Full recruitment details for employers and hiring teams."
            copy="Cromgen Rozgar supports the main recruitment functions that most businesses need while scaling teams."
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {hiringModels.map(([title, copy]) => (
              <article key={title} className="rozgar-detail-card">
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHeading
            eyebrow="How to join"
            title="How companies can start hiring with Cromgen Rozgar."
            copy="The process is kept simple so the hiring team can move from requirement to candidate interviews without confusion."
          />
          <div className="rozgar-step-list">
            {joinSteps.map(([title, copy], index) => (
              <article key={title}>
                <span>{index + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#082a66] py-14 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#9ee383]">Bulk hiring focus</p>
            <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
              Built for BFSI, BPO, sales, support, and fast-scaling workforce hiring.
            </h2>
            <p className="mt-5 text-base leading-8 text-[#d7e4ff]">
              For volume requirements, Cromgen Rozgar can create structured candidate batches, screening
              criteria, interview slots, tracker updates, and joining follow-up.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((industry) => (
              <div key={industry} className="rounded-[8px] border border-white/15 bg-white/10 p-5 text-center text-sm font-black uppercase tracking-[0.1em]">
                {industry}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f6faf9] py-14">
        <div className="mx-auto max-w-7xl px-5">
          <div className="rozgar-cta">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ff4b2d]">Ready to start</p>
              <h2>Share your hiring requirement with Cromgen Rozgar.</h2>
              <p>
                Visit Cromgen Rozgar, submit your company and hiring details, and our recruitment team can help
                you with the next steps.
              </p>
            </div>
            <a href="https://cromgenrozgar.in">Go to Cromgen Rozgar</a>
          </div>
        </div>
      </section>
    </main>
  )
}

function SectionHeading({ eyebrow, title, copy }) {
  return (
    <div className="mb-9 max-w-3xl">
      <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ff4b2d]">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-black leading-tight text-[#0f191b] sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-8 text-[#53676a]">{copy}</p>
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
