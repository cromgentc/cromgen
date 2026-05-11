import { HeroSlider } from '../components/HeroSlider.jsx'
import { SectionHeading } from '../components/SectionHeading.jsx'
import { ServiceCard } from '../components/ServiceCard.jsx'
import homeServicesBanner from '../assets/home-services-banner.png'
import { companyStats, services } from '../data/services.js'

export function HomePage() {
  const industries = ['Healthcare', 'Real Estate', 'E-commerce', 'Education', 'Finance', 'Local Business']
  const capabilities = [
    ['Right Shoring', 'Flexible delivery models aligned with cost, skill, location, and operational control.'],
    ['Multilingual', 'Language-capable support for customers, candidates, vendors, and business teams.'],
    ['Omnichannel', 'Voice, chat, email, CRM, marketing, and support workflows managed across channels.'],
    ['Quality Assurance', 'Structured QA checks, reporting discipline, monitoring, and continuous improvement.'],
  ]
  const enterpriseSolutions = [
    ['AI Chatbot Development', 'Deploy intelligent assistants for enquiries, support, lead capture, and workflow automation.', '/artificial-intelligence/ai-chatbot-development'],
    ['Machine Learning Solutions', 'Build predictive models and data-driven systems that improve decisions and operational accuracy.', '/artificial-intelligence/machine-learning-solutions'],
    ['Natural Language Processing', 'Use NLP to understand text, classify intent, process documents, and improve communication workflows.', '/artificial-intelligence/natural-language-processing'],
    ['Computer Vision', 'Create visual intelligence systems for recognition, inspection, verification, and image-based automation.', '/artificial-intelligence/computer-vision'],
    ['Predictive Analytics', 'Forecast trends, risk, demand, performance, and customer behavior with enterprise reporting.', '/artificial-intelligence/predictive-analytics'],
    ['Digital Marketing', 'Grow visibility, leads, campaigns, content, conversion, and reporting through structured marketing execution.', '/digital-marketing'],
    ['Software Development', 'Build websites, SaaS platforms, dashboards, APIs, CRM, ERP, and secure enterprise applications.', '/software-development-services'],
    ['IT Infrastructure', 'Set up secure IT support, cloud infrastructure, cybersecurity, monitoring, and scalable operations.', '/it-services'],
  ]
  const proofPoints = [
    ['Consulting', 'Service roadmap, team planning, and execution strategy.'],
    ['Implementation', 'Design, development, campaign setup, and operations launch.'],
    ['Optimization', 'Reporting, QA, automation, and continuous improvement.'],
  ]

  return (
    <main>
      <HeroSlider />

      <section className="border-y border-[#dce7e5] bg-white py-14">
        <div className="mx-auto max-w-7xl px-5">
          <div className="home-services-banner">
            <img src={homeServicesBanner} alt="Cromgen Technology seven service verticals banner" />
            <div>
              <p>Integrated Service Delivery</p>
              <h2>Seven business service verticals, one reliable execution partner.</h2>
              <span>
                Artificial Intelligence, Digital Marketing, Call Center, IT, Software Development,
                HR Consultant, and Telecommunications solutions for growing companies.
              </span>
              <a href="/about-cromgen">Explore Cromgen</a>
            </div>
          </div>

          <SectionHeading
            className="business-growth-heading mx-auto text-center"
            eyebrow="Business growth services"
            copy="Cromgen Technology delivers AI automation, marketing growth, customer support, IT stability, custom software, Cromgen Rozgar HR solutions, and telecom communication through structured execution."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[rgba(15,23,42,0.08)] bg-[#f8fafc] py-16">
        <div className="mx-auto max-w-7xl px-5">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ff4b2d]">Our Capabilities</p>
            <h2 className="mt-4 text-3xl font-black leading-tight text-[#0f172a] sm:text-5xl">Our Capabilities</h2>
            <p className="mt-4 text-base font-semibold leading-8 text-[#475569]">
              Flexible delivery, multilingual support, omnichannel operations, and quality-driven execution for modern businesses.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map(([title, copy], index) => (
              <article
                key={title}
                className="group rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white/85 p-6 shadow-xl shadow-slate-900/5 backdrop-blur transition duration-300 hover:-translate-y-2 hover:border-[#ff4b2d]/50 hover:shadow-[#ff4b2d]/10"
              >
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-[#fff1ed] text-sm font-black text-[#ff4b2d] transition duration-300 group-hover:bg-[#ff4b2d] group-hover:text-white">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="text-xl font-black text-[#0f172a]">{title}</h3>
                <p className="mt-4 text-sm font-semibold leading-7 text-[#475569]">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-5">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ff4b2d]">Enterprise Solutions</p>
            <h2 className="mt-4 text-3xl font-black leading-tight text-[#0f172a] sm:text-5xl">Enterprise Solutions</h2>
            <p className="mt-4 text-base font-semibold leading-8 text-[#475569]">
              AI, software, marketing, and IT solutions designed to help businesses automate, grow, and scale professionally.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {enterpriseSolutions.map(([title, copy, href], index) => (
              <article
                key={title}
                className="group rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white/90 p-6 shadow-xl shadow-slate-900/5 backdrop-blur transition duration-300 hover:-translate-y-2 hover:border-[#ff4b2d]/50 hover:shadow-[#ff4b2d]/10"
              >
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-[#fff1ed] text-[#ff4b2d] transition duration-300 group-hover:bg-[#ff4b2d] group-hover:text-white">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
                    <path
                      d={[
                        'M12 3l8 4v10l-8 4-8-4V7l8-4z',
                        'M4 12h5l3-6 3 12 3-6h2',
                        'M5 5h14v14H5zM8 9h8M8 13h5',
                        'M4 6h16v12H4zM8 10h8M8 14h5',
                      ][index % 4]}
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-black text-[#0f172a]">{title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-[#475569]">{copy}</p>
                <a
                  href={href}
                  className="mt-6 inline-flex rounded-xl bg-[#f8fafc] px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-[#0f172a] transition duration-300 group-hover:bg-[#ff4b2d] group-hover:text-white"
                >
                  Explore Solution
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14">
        <div className="why-cromgen-heading mx-auto text-center">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#d95f43]">Why Cromgen</p>
          <p className="mt-5 text-base leading-8 text-[#53676a]">
            The experience is designed for a service company that needs to feel premium, focused, and conversion-ready.
            Visitors can open the right service page directly from the header.
          </p>
        </div>

        <div className="why-cromgen-panel mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="why-cromgen-graph">
            <div className="why-cromgen-graph-head">
              <div>
                <span>Growth System</span>
                <strong>Service performance flow</strong>
              </div>
              <b>2026</b>
            </div>
            <div className="why-cromgen-bars" aria-label="Cromgen growth performance chart">
              {[
                ['Strategy', '52%'],
                ['Execution', '72%'],
                ['Support', '64%'],
                ['Optimization', '86%'],
              ].map(([label, width]) => (
                <div key={label}>
                  <span>{label}</span>
                  <i style={{ '--bar-width': width }} />
                  <b>{width}</b>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {companyStats.map(([value, label]) => (
              <div key={label} className="why-cromgen-stat rounded-[8px] bg-white p-6">
                <div className="text-4xl font-black text-[#0b6868]">{value}</div>
                <div className="mt-3 text-sm font-bold uppercase tracking-[0.13em] text-[#66777a]">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="industries-section border-y border-[#dce7e5] bg-white py-14">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHeading
            className="industries-heading mx-auto text-center"
            eyebrow="Industries"
            copy="Cromgen Technology adapts AI, marketing, IT, software, and support operations to each business model."
          />
          <div className="industries-grid grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, index) => (
              <div key={industry} className="industry-tile">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{industry}</strong>
                <p>Focused service planning, execution, and reporting for {industry.toLowerCase()} teams.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="engagement-section mx-auto max-w-7xl px-5 py-14">
        <SectionHeading
          className="engagement-heading mx-auto text-center"
          eyebrow="Engagement model"
          copy="Every project starts with a clear business goal, followed by a roadmap, delivery plan, and reporting cadence."
        />

        <div className="engagement-shell grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="engagement-visual">
            <img src={homeServicesBanner} alt="Cromgen Technology engagement model" />
            <div>
              <span>Delivery Flow</span>
              <strong>Plan, launch, measure, improve.</strong>
            </div>
          </div>

          <div className="grid gap-5">
            {proofPoints.map(([title, copy], index) => (
              <div key={title} className="engagement-card">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
