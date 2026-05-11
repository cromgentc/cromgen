import { getServiceLink, services } from '../data/services.js'

const hrService = services.find((item) => item.slug === 'hr-consultant')

const coreServices = [
  ['Recruitment Services', 'Permanent, contract, and bulk hiring support with structured sourcing, screening, interview coordination, and closure tracking.'],
  ['Talent Acquisition', 'Strategic talent pipeline building, market mapping, employer branding support, and role-focused sourcing campaigns.'],
  ['Payroll', 'Payroll coordination, attendance input support, salary data checks, employee record assistance, and HR operations support.'],
  ['HR Consulting', 'Practical HR policies, documentation, compliance support, workforce planning, onboarding, and people operations setup.'],
]

const hiringCoverage = [
  ['Permanent Hiring', 'Full-time hiring for business-critical roles with structured shortlisting and closure support.'],
  ['Contract Staffing', 'Flexible workforce support for temporary, project-based, seasonal, and operational roles.'],
  ['Bulk Hiring', 'High-volume hiring support for BFSI, BPO, field sales, retail, support, and back-office teams.'],
  ['Candidate Sourcing', 'Multi-channel sourcing, candidate outreach, database search, and talent pipeline creation.'],
  ['Screening', 'Salary, notice period, communication, skills, location, and role-fit filtering before shortlist.'],
  ['Interview Coordination', 'Scheduling, reminders, feedback follow-up, selection tracking, and joining coordination.'],
]

const processSteps = [
  ['01', 'Requirement', 'Share role, location, salary, openings, timeline, skills, and joining expectations.'],
  ['02', 'Rozgar Review', 'Cromgen Rozgar reviews the requirement and creates the hiring action plan.'],
  ['03', 'Sourcing', 'Candidates are sourced, contacted, screened, and organized into structured shortlists.'],
  ['04', 'Selection', 'Interview coordination, feedback, offer support, and joining confirmation stay tracked.'],
]

const industries = ['BFSI', 'BPO / KPO', 'IT', 'Telecom', 'Retail', 'Healthcare', 'Field Sales', 'Back Office']

const serviceDescriptions = {
  'Recruitment Services': 'Structured hiring support for permanent, contract, and volume roles.',
  'Talent Acquisition': 'Pipeline strategy and role-based sourcing for growing teams.',
  'HR Policy Development': 'Practical HR policies aligned with business operations.',
  'Employee Onboarding': 'Joining documentation, induction support, and onboarding coordination.',
  'Payroll Coordination': 'Attendance, salary input, records, and payroll support workflow.',
  'Performance Management': 'Review structures, evaluation support, and performance documentation.',
  'Training & Development': 'Capability building plans, training coordination, and skill development.',
  'Employee Engagement': 'Engagement activities, communication support, and people experience.',
  'HR Documentation': 'Employee records, HR letters, forms, templates, and documentation control.',
  'Compliance Support': 'Practical statutory and HR compliance coordination support.',
  'Job Description Creation': 'Clear JD writing for role clarity, screening, and hiring accuracy.',
  'Interview Coordination': 'Scheduling, reminders, feedback collection, and candidate follow-up.',
  'Background Verification': 'Verification coordination and risk visibility for selected candidates.',
  'Workforce Planning': 'Headcount planning, manpower mapping, and role pipeline thinking.',
}

function HrIcon({ index }) {
  const paths = [
    'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-8 8c.8-4 3.6-6 8-6s7.2 2 8 6H4Z',
    'M4 7h16v12H4zM8 7V5h8v2M8 12h8M8 16h5',
    'M5 6h14v12H5zM8 10h8M8 14h5',
    'M12 3l8 4v10l-8 4-8-4V7l8-4z',
    'M4 12h4l3-6 3 12 3-6h3',
    'M6 18l-2 3V5h16v13H6zM8 9h8M8 13h5',
    'M5 12l4 4 10-10',
    'M6 6h12v12H6zM9 9h6v6H9z',
  ]

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
      <path d={paths[index % paths.length]} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  )
}

function SectionHead({ eyebrow, title, copy }) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ff8a75]">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-black leading-tight text-white sm:text-5xl">{title}</h2>
      {copy ? <p className="mt-4 text-base font-semibold leading-8 text-slate-300">{copy}</p> : null}
    </div>
  )
}

export function HrConsultantPage() {
  const relatedServices = hrService?.services || []

  return (
    <main className="overflow-hidden bg-[#0f172a] text-white">
      <section className="relative isolate px-5 pb-20 pt-32 sm:pt-36 lg:pt-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_12%,rgba(255,75,45,0.24),transparent_34%),radial-gradient(circle_at_84%_18%,rgba(16,185,129,0.13),transparent_32%),linear-gradient(135deg,#0f172a,#111827_50%,#050816)]" />
        <div className="absolute left-8 top-24 -z-10 h-80 w-80 rounded-full bg-[#ff4b2d]/18 blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.04fr_0.96fr]">
          <div>
            <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#ffb39f] shadow-2xl shadow-black/20 backdrop-blur">
              Cromgen Rozgar
            </div>
            <h1 className="mt-7 max-w-4xl text-4xl font-black leading-[1.02] text-white sm:text-6xl lg:text-7xl">
              Recruitment, Payroll, and HR Consulting for Growing Teams
            </h1>
            <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-slate-300 sm:text-lg">
              Cromgen Rozgar is the hiring and HR operations arm for companies that need structured recruitment, talent acquisition, payroll coordination, and practical HR consulting support.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="https://cromgenrozgar.in"
                className="group inline-flex items-center justify-center rounded-2xl bg-[#ff4b2d] px-7 py-4 text-sm font-black uppercase tracking-[0.12em] text-white shadow-2xl shadow-[#ff4b2d]/30 transition duration-300 hover:-translate-y-1 hover:bg-[#ff6348]"
              >
                Join Cromgen Rozgar
                <span className="ml-3 transition duration-300 group-hover:translate-x-1">-&gt;</span>
              </a>
              <a
                href="#rozgar-services"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/8 px-7 py-4 text-sm font-black uppercase tracking-[0.12em] text-white shadow-xl shadow-black/20 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#ff4b2d]/60 hover:bg-white/14"
              >
                View Services
              </a>
            </div>

            <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
              {[
                ['14+', 'HR Service Areas'],
                ['BFSI', 'Bulk Hiring Capable'],
                ['End-to-End', 'Recruitment Support'],
              ].map(([value, label]) => (
                <article key={label} className="rounded-2xl border border-white/10 bg-white/6 p-5 shadow-xl shadow-black/20 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#ff4b2d]/50">
                  <strong className="block text-3xl font-black text-[#ff4b2d]">{value}</strong>
                  <span className="mt-2 block text-xs font-black uppercase tracking-[0.13em] text-slate-300">{label}</span>
                </article>
              ))}
            </div>
          </div>

          <div className="hr-premium-visual relative rounded-[2rem] border border-white/10 bg-white/8 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl">
            <div className="absolute right-8 top-8 h-28 w-28 rounded-full bg-[#ff4b2d]/25 blur-2xl" />
            <div className="absolute bottom-10 left-8 h-28 w-28 rounded-full bg-emerald-300/12 blur-2xl" />
            <div className="relative rounded-3xl border border-white/10 bg-[#111827]/90 p-5">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Rozgar Workforce OS</p>
                  <h2 className="mt-2 text-xl font-black text-white">Hiring Workflow</h2>
                </div>
                <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-black text-emerald-300">Active</span>
              </div>

              <div className="grid gap-4">
                {[
                  ['Open Requirements', '32'],
                  ['Screened Candidates', '148'],
                  ['Joining Pipeline', '76%'],
                ].map(([label, value], index) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-white/6 p-4 transition duration-300 hover:border-[#ff4b2d]/50 hover:bg-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-300">{label}</span>
                      <strong className="text-2xl font-black text-[#ff8a75]">{value}</strong>
                    </div>
                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                      <i className="block h-full rounded-full bg-gradient-to-r from-[#ff4b2d] to-emerald-200" style={{ width: `${82 - index * 10}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid grid-cols-4 gap-3">
                {['Req', 'Review', 'Source', 'Join'].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-[#0f172a] p-3 text-center text-xs font-black text-white">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="rozgar-services" className="border-y border-white/10 bg-[#111827] px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHead
            eyebrow="Core Services"
            title="Recruitment, payroll, and HR operations under one Rozgar platform."
            copy="Cromgen Rozgar combines hiring execution, HR documentation, payroll coordination, and consulting support for growing teams."
          />
          <div className="mt-11 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {coreServices.map(([title, copy], index) => (
              <article key={title} className="group rounded-2xl border border-white/10 bg-white/6 p-6 shadow-xl shadow-black/20 backdrop-blur transition duration-300 hover:-translate-y-2 hover:border-[#ff4b2d]/60 hover:bg-white/10">
                <div className="mb-6 grid h-12 w-12 place-items-center rounded-2xl bg-[#ff4b2d] text-white shadow-lg shadow-[#ff4b2d]/30">
                  <HrIcon index={index} />
                </div>
                <h3 className="text-xl font-black text-white">{title}</h3>
                <p className="mt-4 text-sm font-semibold leading-7 text-slate-300">{copy}</p>
                <a href={getServiceLink('hr-consultant', title === 'Payroll' ? 'Payroll Coordination' : title === 'HR Consulting' ? 'HR Policy Development' : title)} className="mt-6 inline-flex text-sm font-black text-[#ff8a75] transition duration-300 group-hover:translate-x-1">
                  Open service
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHead
            eyebrow="Hiring Coverage"
            title="Permanent, Contract, and Bulk Hiring Under One Rozgar System"
            copy="A structured hiring engine for single-role recruitment, contract staffing, high-volume hiring, and practical candidate coordination."
          />
          <div className="mt-11 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {hiringCoverage.map(([title, copy], index) => (
              <article key={title} className="group rounded-2xl border border-white/10 bg-white/6 p-6 shadow-xl shadow-black/20 backdrop-blur transition duration-300 hover:-translate-y-2 hover:border-[#ff4b2d]/60 hover:bg-white/10">
                <div className="mb-5 flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#ff4b2d] text-sm font-black text-white">{String(index + 1).padStart(2, '0')}</span>
                  <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/8 text-[#ff8a75]"><HrIcon index={index + 3} /></span>
                </div>
                <h3 className="text-xl font-black text-white">{title}</h3>
                <p className="mt-4 text-sm font-semibold leading-7 text-slate-300">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-20">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8 lg:p-10">
          <SectionHead
            eyebrow="How Cromgen Rozgar Works"
            title="How Cromgen Rozgar Works"
            copy="From requirement to joining, every hiring step stays organized."
          />
          <div className="mt-10 grid gap-4 lg:grid-cols-4">
            {processSteps.map(([number, title, copy], index) => (
              <article key={title} className="group relative rounded-2xl border border-white/10 bg-[#0f172a]/80 p-6 transition duration-300 hover:-translate-y-2 hover:border-[#ff4b2d]/60 hover:bg-[#111827]">
                {index < processSteps.length - 1 ? (
                  <span className="absolute left-[calc(100%-8px)] top-10 hidden h-px w-8 bg-gradient-to-r from-[#ff4b2d] to-transparent lg:block" />
                ) : null}
                <span className="absolute -top-4 left-6 grid h-10 w-10 place-items-center rounded-2xl bg-[#ff4b2d] text-sm font-black text-white shadow-lg shadow-[#ff4b2d]/30">
                  {number}
                </span>
                <div className="mt-5 grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/8 text-[#ff8a75]">
                  <HrIcon index={index} />
                </div>
                <h3 className="mt-5 text-xl font-black text-white">{title}</h3>
                <p className="mt-4 text-sm font-semibold leading-7 text-slate-300">{copy}</p>
                <i className="mt-6 block h-1 w-12 rounded-full bg-[#ff4b2d] transition duration-300 group-hover:w-20" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#111827] px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHead
            eyebrow="Industry Focus"
            title="Hiring support for fast-moving sectors."
            copy="Cromgen Rozgar supports industries where hiring speed, screening quality, and joining coordination matter."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((industry, index) => (
              <article key={industry} className="group rounded-2xl border border-white/10 bg-white/6 p-5 text-center shadow-xl shadow-black/20 backdrop-blur transition duration-300 hover:-translate-y-2 hover:border-[#ff4b2d]/60 hover:bg-white/10">
                <div className="mx-auto mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-[#ff4b2d] text-sm font-black text-white">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <strong className="text-sm font-black uppercase tracking-[0.12em] text-white">{industry}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHead
            eyebrow="All HR Services"
            title="Explore complete Cromgen Rozgar service pages."
            copy="Open any service area to view the dedicated page and continue with enquiries or hiring support."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {relatedServices.map((item, index) => (
              <a key={item} href={getServiceLink('hr-consultant', item)} className="group rounded-2xl border border-white/10 bg-white/6 p-5 shadow-xl shadow-black/20 backdrop-blur transition duration-300 hover:-translate-y-2 hover:border-[#ff4b2d]/60 hover:bg-white/10">
                <div className="mb-4 flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#ff4b2d] text-xs font-black text-white">{String(index + 1).padStart(2, '0')}</span>
                  <span className="text-[#ff8a75]"><HrIcon index={index} /></span>
                </div>
                <strong className="block text-base font-black text-white">{item}</strong>
                <p className="mt-3 text-sm font-semibold leading-6 text-slate-300">{serviceDescriptions[item] || 'Professional HR support aligned with growing business operations.'}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
