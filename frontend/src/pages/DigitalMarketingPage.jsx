import { useState } from 'react'
import { LeadCaptureModal } from '../components/LeadCaptureModal.jsx'
import { getServiceLink } from '../data/services.js'

const marketingServices = [
  ['Meta Ads Campaigns', 'High-converting paid campaigns for Facebook and Instagram with audience testing, creative strategy, and lead tracking.'],
  ['Content Marketing', 'Authority-building content systems for blogs, landing pages, social posts, case studies, and brand storytelling.'],
  ['Email Marketing', 'Lifecycle email flows, newsletters, lead nurturing, and conversion campaigns built around measurable action.'],
  ['WhatsApp Marketing', 'Direct customer communication, broadcasts, follow-up journeys, and lead engagement through WhatsApp workflows.'],
  ['Lead Generation', 'Landing pages, ad funnels, CRM capture, and qualification systems designed for consistent sales pipeline growth.'],
  ['Branding & Creative Design', 'Premium visual assets, campaign creatives, brand messaging, and conversion-focused design systems.'],
  ['Online Reputation Management', 'Review strategy, response systems, brand monitoring, and trust-building digital reputation support.'],
  ['Local SEO & Google Business Profile', 'Local visibility optimization, Google Business Profile growth, location SEO, and enquiry improvement.'],
  ['Conversion Rate Optimization', 'Data-led page improvements, form optimization, A/B thinking, and friction reduction for better conversion.'],
  ['Influencer Marketing', 'Creator discovery, collaboration planning, campaign coordination, and brand-safe influencer execution.'],
  ['Video Marketing', 'Video campaign strategy, short-form content direction, product explainers, and performance video planning.'],
  ['Marketing Analytics & Reporting', 'Executive dashboards, weekly performance reports, campaign insights, and growth recommendations.'],
]

const processSteps = [
  ['01', 'Audience Research', 'Understand buyer intent, market segments, channels, competitors, and conversion barriers.'],
  ['02', 'Campaign Planning', 'Define funnel structure, budgets, messages, creative direction, and measurable campaign KPIs.'],
  ['03', 'Creative Execution', 'Launch premium assets, landing pages, ads, content, and automation workflows.'],
  ['04', 'Optimization Reports', 'Improve campaigns with weekly insights, lead quality review, and performance actions.'],
]

const trustStats = [
  ['360°', 'Marketing Strategy'],
  ['Data-Driven', 'Campaigns'],
  ['Weekly', 'Performance Reports'],
  ['Lead-Focused', 'Execution'],
]

function MarketingIcon({ index }) {
  const paths = [
    'M4 12h16M12 4v16M6 6l12 12M18 6 6 18',
    'M5 5h14v14H5zM8 9h8M8 13h5',
    'M4 7l8 6 8-6M4 7v10h16V7',
    'M6 18l-2 3V5h16v13H6z',
    'M4 17V7h16v10H4zm4-6h8',
    'M12 3l8 4v10l-8 4-8-4V7l8-4z',
    'M12 5c5 0 8 7 8 7s-3 7-8 7-8-7-8-7 3-7 8-7zm0 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
    'M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11zm0-8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
    'M4 18 9 8l4 6 3-4 4 8H4z',
    'M7 11v2a5 5 0 0 0 10 0v-2M9 11V8a3 3 0 0 1 6 0v3',
    'M5 5l14 7-14 7V5z',
    'M4 19V5m4 14V9m4 10V7m4 12v-5m4 5V3',
  ]

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
      <path d={paths[index % paths.length]} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  )
}

export function DigitalMarketingPage() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)

  return (
    <main className="overflow-hidden bg-[#0f172a] text-white">
      <section className="relative isolate px-5 pb-20 pt-32 sm:pt-36 lg:pt-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_14%,rgba(255,75,45,0.24),transparent_34%),radial-gradient(circle_at_86%_18%,rgba(251,146,60,0.14),transparent_32%),linear-gradient(135deg,#0f172a,#111827_50%,#070b16)]" />
        <div className="absolute right-0 top-20 -z-10 h-80 w-80 rounded-full bg-[#ff4b2d]/20 blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.04fr_0.96fr]">
          <div>
            <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#ffb39f] shadow-2xl shadow-black/20 backdrop-blur">
              Enterprise Growth Marketing
            </div>
            <h1 className="mt-7 max-w-4xl text-4xl font-black leading-[1.02] text-white sm:text-6xl lg:text-7xl">
              Digital Marketing Solutions
            </h1>
            <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-slate-300 sm:text-lg">
              Performance-driven digital marketing services designed to help brands grow, generate leads, and scale with measurable results.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="mailto:hello@cromgentechnology.com"
                className="group inline-flex items-center justify-center rounded-2xl bg-[#ff4b2d] px-7 py-4 text-sm font-black uppercase tracking-[0.12em] text-white shadow-2xl shadow-[#ff4b2d]/30 transition duration-300 hover:-translate-y-1 hover:bg-[#ff6348]"
              >
                Get Marketing Plan
                <span className="ml-3 transition duration-300 group-hover:translate-x-1">→</span>
              </a>
              <button
                type="button"
                onClick={() => setIsLeadModalOpen(true)}
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/8 px-7 py-4 text-sm font-black uppercase tracking-[0.12em] text-white shadow-xl shadow-black/20 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#ff4b2d]/60 hover:bg-white/14"
              >
                Talk to Expert
              </button>
            </div>
          </div>

          <div className="dm-premium-visual relative rounded-[2rem] border border-white/10 bg-white/8 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl">
            <div className="absolute right-8 top-8 h-28 w-28 rounded-full bg-[#ff4b2d]/25 blur-2xl" />
            <div className="absolute bottom-10 left-8 h-28 w-28 rounded-full bg-orange-300/15 blur-2xl" />
            <div className="relative rounded-3xl border border-white/10 bg-[#111827]/90 p-5">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Growth Dashboard</p>
                  <h2 className="mt-2 text-xl font-black text-white">Campaign Intelligence</h2>
                </div>
                <span className="rounded-full bg-[#ff4b2d]/12 px-3 py-1 text-xs font-black text-[#ff9b88]">Live</span>
              </div>
              <div className="grid gap-4">
                {[
                  ['Qualified Leads', '+68%'],
                  ['Conversion Rate', '7.4%'],
                  ['Campaign ROI', '4.8x'],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-white/6 p-4 transition duration-300 hover:border-[#ff4b2d]/50 hover:bg-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-300">{label}</span>
                      <strong className="text-2xl font-black text-[#ff8a75]">{value}</strong>
                    </div>
                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                      <i className="block h-full rounded-full bg-gradient-to-r from-[#ff4b2d] to-orange-200" style={{ width: label === 'Qualified Leads' ? '86%' : label === 'Conversion Rate' ? '72%' : '92%' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#111827] px-5 py-14">
        <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {trustStats.map(([value, label]) => (
            <article key={label} className="rounded-2xl border border-white/10 bg-white/6 p-6 shadow-xl shadow-black/20 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#ff4b2d]/50 hover:bg-white/10">
              <strong className="block text-2xl font-black text-[#ff4b2d]">{value}</strong>
              <span className="mt-3 block text-sm font-black uppercase tracking-[0.14em] text-slate-300">{label}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="relative px-5 py-20">
        <div className="absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(circle_at_50%_0%,rgba(255,75,45,0.13),transparent_36%)]" />
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ff8a75]">Marketing Services</p>
            <h2 className="mt-4 text-3xl font-black leading-tight text-white sm:text-5xl">
              Top enterprise digital marketing agency capabilities.
            </h2>
          </div>

          <div className="mt-11 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {marketingServices.map(([title, copy], index) => (
              <article key={title} className="group rounded-2xl border border-white/10 bg-white/6 p-6 shadow-xl shadow-black/20 backdrop-blur transition duration-300 hover:-translate-y-2 hover:border-[#ff4b2d]/60 hover:bg-white/10 hover:shadow-[#ff4b2d]/12">
                <div className="mb-6 grid h-12 w-12 place-items-center rounded-2xl bg-[#ff4b2d] text-white shadow-lg shadow-[#ff4b2d]/30">
                  <MarketingIcon index={index} />
                </div>
                <h3 className="text-xl font-black text-white">{title}</h3>
                <p className="mt-4 text-sm font-semibold leading-7 text-slate-300">{copy}</p>
                <a href={getServiceLink('digital-marketing', title)} className="mt-6 inline-flex text-sm font-black text-[#ff8a75] transition duration-300 group-hover:translate-x-1">
                  Open service page
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-24">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8 lg:p-10">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ff8a75]">Delivery Process</p>
            <h2 className="mt-4 text-3xl font-black text-white sm:text-5xl">Delivery Process</h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-300">
              Simple process, clear reporting, professional execution.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-4">
            {processSteps.map(([number, title, copy]) => (
              <article key={title} className="group relative rounded-2xl border border-white/10 bg-[#0f172a]/80 p-6 transition duration-300 hover:-translate-y-2 hover:border-[#ff4b2d]/60 hover:bg-[#111827]">
                <span className="absolute -top-4 left-6 grid h-10 w-10 place-items-center rounded-2xl bg-[#ff4b2d] text-sm font-black text-white shadow-lg shadow-[#ff4b2d]/30">
                  {number}
                </span>
                <h3 className="mt-5 text-xl font-black text-white">{title}</h3>
                <p className="mt-4 text-sm font-semibold leading-7 text-slate-300">{copy}</p>
                <i className="mt-6 block h-1 w-12 rounded-full bg-[#ff4b2d] transition duration-300 group-hover:w-20" />
              </article>
            ))}
          </div>
        </div>
      </section>
      <LeadCaptureModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        serviceName="Digital Marketing Solutions"
      />
    </main>
  )
}
