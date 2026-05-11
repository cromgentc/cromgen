import { SectionHeading } from '../components/SectionHeading.jsx'
import { ServiceIcon } from '../components/ServiceIcon.jsx'
import { getServiceLink } from '../data/services.js'
import { getServiceDetailImage } from '../data/serviceImages.js'

const benefits = [
  'Custom planning based on requirements',
  'Professional setup with clear milestones',
  'Performance tracking and regular reporting',
  'Scalable support for growing business needs',
]

const deliverables = [
  'Discovery and audit document',
  'Implementation roadmap',
  'Live setup or campaign execution',
  'Weekly optimization notes',
  'Final performance summary',
]

function buildServiceArticle(category, serviceName) {
  const shortTitle = category.shortTitle
  return [
    {
      title: `${serviceName} overview`,
      copy: [
        `${serviceName} is a focused ${shortTitle} service planned around daily workflows, customer experience, team productivity, and measurable growth goals. Cromgen Technology does not treat this as a one-off task; we first understand the business model, target audience, current process, available tools, risk areas, reporting needs, and expected outcomes. This creates a practical solution that is easy for teams to operate and simple for management to track.`,
        `When a company starts ${serviceName}, the first step is to define the baseline. We map the current process, identify delays, understand customer or internal team pain points, and document repeated activities. Cromgen Technology then sets the service scope, resources, timeline, quality checks, communication flow, and approval points so the project moves through structured delivery.`,
      ],
    },
    {
      title: 'Business value',
      copy: [
        `${serviceName} delivers the best value when it is designed for business impact, not only output. Cromgen Technology converts stakeholder expectations into practical milestones. If the goal is better lead quality, we define tracking fields, qualification rules, response workflows, and follow-up cadence. If the goal is customer support, we define SLAs, escalation rules, knowledge base needs, quality reviews, and feedback loops.`,
        `Before the service begins, Cromgen Technology defines success indicators such as response time, completion rate, lead status, ticket volume, uptime, engagement, conversion, cost control, or quality score. Reporting is then presented in clear language so founders, managers, and department heads can understand what improved, what still needs attention, and what should be optimized next.`,
      ],
    },
    {
      title: 'Planning and setup',
      copy: [
        `During the planning phase for ${serviceName}, Cromgen Technology breaks the requirement into clear details. Inputs are collected, current assets are reviewed, tools and channels are checked, and dependencies are listed. The team then creates a service blueprint covering scope, workflow, roles, communication methods, approvals, and delivery checkpoints.`,
        `During setup, the required accounts, systems, templates, scripts, integrations, dashboards, folders, documentation, and access permissions are organized. For marketing work, this may include campaign structure, audiences, creatives, landing paths, tracking, and reporting tags. For technical work, it may include environments, security, backups, permissions, test cases, and monitoring.`,
      ],
    },
    {
      title: 'Execution workflow',
      copy: [
        `During execution, ${serviceName} runs on a weekly or milestone-based cadence. The team completes assigned tasks, identifies blockers, and documents progress. Cromgen Technology keeps progress visible through updates, approvals, and performance notes so clients are not left waiting for a final result without context.`,
        `Every ${serviceName} engagement includes review points. After implementation, outputs are tested, data is verified, and user experience or operational accuracy is checked. If an activity is not producing the expected result, an improvement experiment is planned and added to the next cycle.`,
      ],
    },
    {
      title: 'Quality and reporting',
      copy: [
        `The quality system for ${serviceName} is customized by service type. Some services need checklist audits, some need call quality or response accuracy, and others need conversion tracking, uptime, security, testing, or documentation. Cromgen Technology includes quality in planning, setup, execution, and reporting instead of treating it as a final-stage task.`,
        `Reports include plain language and useful numbers. A ${serviceName} report can summarize completed work, pending items, performance signals, concerns, recommendations, and next actions. Where relevant, screenshots, dashboards, campaign data, ticket data, call notes, keyword positions, conversion data, system health, or task completion details can be attached.`,
      ],
    },
    {
      title: 'Long term improvement',
      copy: [
        `${serviceName} works best as an improvement cycle rather than a one-time activity. The first cycle creates setup and baseline outcomes. The second cycle refines the work based on data. Later cycles can add automation, scaling, segmentation, advanced reporting, or deeper optimization.`,
        `Long-term support can include documentation updates, team training, process handover, audit notes, and strategic recommendations. If a client wants to build an internal team, Cromgen Technology can support training and SOP creation. If a client wants a fully managed service, recurring operations can be handled as the business grows.`,
      ],
    },
  ]
}

export function ServiceDetailPage({ detail }) {
  const { category, serviceName, relatedServices } = detail
  const heroImage = getServiceDetailImage(category, serviceName)
  const articleSections = buildServiceArticle(category, serviceName)

  return (
    <main className="overflow-x-hidden">
      <section className="bg-white pt-10">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:py-16">
          <div>
            <a
              href={`/${category.slug}`}
              className="mb-5 inline-flex rounded-full border border-[#d8e5e2] px-4 py-2 text-sm font-black text-[#425558] transition hover:border-[#0b6868] hover:text-[#0b6868]"
            >
              Back to {category.title}
            </a>
            <div
              className="mb-5 grid h-16 w-16 place-items-center rounded-[8px] text-white"
              style={{ backgroundColor: category.accent }}
            >
              <ServiceIcon name={category.icon} className="h-9 w-9" />
            </div>
            <p className="text-sm font-black uppercase tracking-[0.18em]" style={{ color: category.warm }}>
              {category.title}
            </p>
            <h1 className="mt-4 text-4xl font-black leading-tight text-[#0f191b] sm:text-5xl lg:text-6xl">
              {serviceName}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#53676a]">
              A complete professional workflow for {serviceName}, covering strategy, setup, execution, and reporting.
              Cromgen Technology delivers this service through the {category.shortTitle} department.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="mailto:hello@cromgentechnology.com"
                className="rounded-full px-6 py-3 text-sm font-black text-white shadow-lg transition hover:opacity-90"
                style={{ backgroundColor: category.accent }}
              >
                Request This Service
              </a>
              <a
                href="/"
                className="rounded-full border border-[#b8cbc7] bg-white px-6 py-3 text-sm font-black text-[#142123] transition hover:border-[#0b6868]"
              >
                Home
              </a>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[8px] border border-[#d8e5e2] shadow-2xl shadow-[#5a716d]/20">
            <img src={heroImage} alt={`${serviceName} service visual`} className="aspect-[4/3] w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#101d1f]/86 to-transparent p-5">
              <p className="max-w-lg text-sm font-semibold leading-6 text-white">{category.kicker}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#dce7e5] bg-[#f6faf9] py-14">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHeading
            eyebrow="Detailed service page"
            title={`Complete business content for ${serviceName}`}
            copy="This page explains the service overview, planning, execution, quality, reporting, and long-term support in a structured format."
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {[
              ['Discovery', 'Requirement, baseline, tools, audience, and current workflow review.'],
              ['Implementation', 'Setup, execution, testing, approvals, and milestone tracking.'],
              ['Optimization', 'Reports, quality checks, improvement notes, and next-cycle planning.'],
            ].map(([title, copy]) => (
              <div key={title} className="rounded-[8px] border border-[#dce7e5] bg-white p-6">
                <h2 className="text-xl font-black text-[#0f191b]">{title}</h2>
                <p className="mt-3 text-sm font-semibold leading-7 text-[#617174]">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-5">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <aside className="h-fit rounded-[8px] border border-[#dce7e5] bg-[#fbfdfd] p-6 lg:sticky lg:top-32">
              <div
                className="mb-5 grid h-14 w-14 place-items-center rounded-[8px] text-white"
                style={{ backgroundColor: category.accent }}
              >
                <ServiceIcon name={category.icon} className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-black text-[#0f191b]">{serviceName}</h2>
              <p className="mt-4 text-sm font-semibold leading-7 text-[#617174]">
                Dedicated page for {category.title}. Each selected service opens here, while the category page stays
                focused on the main service overview.
              </p>
              <div className="mt-6 grid gap-3">
                {category.process.map((step) => (
                  <div key={step} className="rounded-[8px] border border-[#dce7e5] bg-white p-4 text-sm font-black text-[#425558]">
                    {step}
                  </div>
                ))}
              </div>
            </aside>

            <article className="grid gap-5">
              {articleSections.map((section) => (
                <section key={section.title} className="rounded-[8px] border border-[#dce7e5] bg-white p-6 shadow-sm">
                  <h2 className="text-2xl font-black text-[#0f191b]">{section.title}</h2>
                  <div className="mt-5 grid gap-4 text-base leading-8 text-[#53676a]">
                    {section.copy.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
            </article>
          </div>
        </div>
      </section>

      <section className="border-y border-[#dce7e5] bg-[#f6faf9] py-14">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 lg:grid-cols-2">
          <div className="rounded-[8px] border border-[#dce7e5] bg-white p-6">
            <h2 className="text-2xl font-black text-[#0f191b]">Key Benefits</h2>
            <ul className="mt-5 grid gap-3">
              {benefits.map((item) => (
                <li key={item} className="flex gap-3 text-sm font-semibold leading-6 text-[#425558]">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: category.warm }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[8px] border border-[#dce7e5] bg-white p-6">
            <h2 className="text-2xl font-black text-[#0f191b]">Deliverables</h2>
            <ul className="mt-5 grid gap-3">
              {deliverables.map((item) => (
                <li key={item} className="flex gap-3 text-sm font-semibold leading-6 text-[#425558]">
                  <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#eaf3f1] text-xs font-black text-[#0b6868]">
                    OK
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHeading
            eyebrow="Execution plan"
            title={`Professional service flow for ${serviceName}`}
            copy="The page is designed so visitors can quickly understand the service scope, expected outcome, and next action."
          />
          <div className="grid gap-4 md:grid-cols-4">
            {['Audit', 'Plan', 'Launch', 'Optimize'].map((step, index) => (
              <div key={step} className="rounded-[8px] border border-[#dce7e5] bg-[#fbfdfd] p-5">
                <span className="text-sm font-black uppercase tracking-[0.15em]" style={{ color: category.warm }}>
                  Step {index + 1}
                </span>
                <h3 className="mt-3 text-lg font-black text-[#0f191b]">{step}</h3>
                <p className="mt-3 text-sm leading-6 text-[#617174]">
                  Clear action, owner, timeline, and reporting point are defined for every step.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#eaf3f1] py-14">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHeading eyebrow="Related services" title={`More ${category.title} services`} />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {relatedServices.map((item) => (
              <a
                key={item}
                href={getServiceLink(category.slug, item)}
                className="rounded-[8px] border border-[#cbdcd8] bg-white p-5 font-black text-[#0f191b] transition hover:-translate-y-1 hover:border-[#0b6868]"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
