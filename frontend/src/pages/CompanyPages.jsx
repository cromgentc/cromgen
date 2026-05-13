import { useEffect, useState } from 'react'
import aiHero from '../assets/ai-services-hero.png'
import itHero from '../assets/it-services.png'
import recruitmentHero from '../assets/recruitment-services-hero.png'
import softwareHero from '../assets/software-development.png'
import bulkTalent from '../assets/talent-acquisition/bulk-talent-acquisition.png'
import candidatePipeline from '../assets/talent-acquisition/candidate-pipeline.png'
import executiveSearch from '../assets/talent-acquisition/executive-search.png'
import hiringAnalytics from '../assets/talent-acquisition/hiring-analytics.png'
import interviewCoordination from '../assets/talent-acquisition/interview-coordination.png'
import screeningFramework from '../assets/talent-acquisition/screening-framework.png'
import {
  APPLICATION_ENDPOINTS,
  JOB_ENDPOINTS,
  LEAD_ENDPOINTS,
  NEWS_ENDPOINTS,
  POLICY_ENDPOINTS,
  PROJECT_ENDPOINTS,
  apiRequest,
} from '../api/apiEndpoint.js'

const serviceAreas = [
  'Artificial Intelligence',
  'Digital Marketing',
  'Call Center',
  'IT',
  'Software Development',
  'HR Consultant',
  'Telecommunications',
]

const cromgenServiceStories = [
  {
    title: 'Artificial Intelligence',
    image: aiHero,
    accent: '#082a66',
    summary:
      'Cromgen approaches AI as a practical business capability, not just a chatbot project. The team studies repeat queries, data formats, decision points, and the areas where automation can reduce manual workload.',
    story:
      'For a growing company, a Cromgen AI assistant can capture enquiries, update CRM records, identify priority tickets, and share daily insight reports with management. The result is a useful AI layer that supports the team instead of replacing it.',
  },
  {
    title: 'Digital Marketing',
    image: softwareHero,
    accent: '#ff4b2d',
    summary:
      'Cromgen plans digital marketing around market position, audience behavior, local search presence, content quality, ad budget, and the client sales follow-up process.',
    story:
      'SEO, Google Business Profile, paid ads, social content, landing pages, remarketing, and monthly reporting work together as one growth system. Each month the team reviews audience response, message quality, and budget direction.',
  },
  {
    title: 'Call Center',
    image: recruitmentHero,
    accent: '#0b6868',
    summary:
      'Cromgen call center delivery focuses on clear scripts, trained agents, call routing, response quality, and reporting discipline across inbound and outbound operations.',
    story:
      'When a client has high call volume, Cromgen defines FAQs, escalation rules, call categories, and service-level expectations. Agents capture notes properly while supervisors use quality monitoring to improve training.',
  },
  {
    title: 'IT',
    image: itHero,
    accent: '#63bc45',
    summary:
      'Cromgen IT services support stable infrastructure across devices, networks, cloud tools, email systems, backups, security checks, helpdesk support, and remote troubleshooting.',
    story:
      'If a network is slow, email systems are unreliable, or backup processes are unclear, Cromgen identifies the root cause and creates a practical support roadmap with preventive monitoring.',
  },
  {
    title: 'Software Development',
    image: softwareHero,
    accent: '#3e3aa3',
    summary:
      'Cromgen software development starts with workflow mapping, user roles, data flow, dashboard needs, integrations, and future scale before building the product.',
    story:
      'For businesses running operations through spreadsheets and manual follow-ups, Cromgen converts those steps into software workflows with dashboards, task clarity, and management reporting.',
  },
  {
    title: 'HR Consultant',
    image: hiringAnalytics,
    accent: '#d9381e',
    summary:
      'Through Cromgen Rozgar, HR consulting covers recruitment, screening, interview coordination, onboarding, payroll coordination, compliance support, and workforce planning.',
    story:
      'When a company needs faster hiring, Cromgen refines job descriptions, builds candidate pipelines, applies screening frameworks, coordinates interviews, and tracks joining documentation.',
  },
  {
    title: 'Telecommunications',
    image: recruitmentHero,
    accent: '#071936',
    summary:
      'Cromgen telecommunications services make business calling more dependable through cloud telephony, IVR, call routing, PBX, SIP trunking, call recording, billing support, and number portability coordination.',
    story:
      'For sales, support, and operations teams, Cromgen designs call flows that move customers to the right department quickly while managers receive logs, recordings, and performance reports.',
  },
]

const cromgenStorySteps = [
  ['01', 'Discovery', 'The current workflow, pain points, tools, customer journey, and team capacity are reviewed.'],
  ['02', 'Service Blueprint', 'Scope, responsibilities, timelines, reporting format, and success indicators are defined.'],
  ['03', 'Execution', 'Specialist teams handle daily operations, implementation, campaigns, support, hiring, or technical setup.'],
  ['04', 'Reporting', 'Clients receive clear progress updates, issues, next actions, and measurable outcomes.'],
  ['05', 'Improvement', 'Processes are refined through data and feedback so the service continues creating business value.'],
]

const cromgenEnterpriseStats = [
  ['07', 'Service verticals'],
  ['360', 'Business support model'],
  ['05', 'Delivery stages'],
  ['24/7', 'Operational mindset'],
]

const cromgenEnterprisePillars = [
  {
    title: 'Business-first planning',
    copy: 'Cromgen builds execution plans after understanding client goals, current processes, team capacity, market pressure, and operational gaps.',
  },
  {
    title: 'Specialist delivery teams',
    copy: 'AI, marketing, support, IT, software, HR, and telecom work is handled with dedicated capability thinking instead of a generic service approach.',
  },
  {
    title: 'Clear reporting culture',
    copy: 'Progress, performance, issues, next steps, and improvement points are presented in clear business language for faster decisions.',
  },
]

const leadershipFunctions = [
  {
    title: 'Strategy Office',
    copy:
      'Defines business priorities, client roadmaps, market direction, and service portfolio alignment across Cromgen capabilities.',
    image: executiveSearch,
    meta: 'Direction',
  },
  {
    title: 'Delivery Leadership',
    copy:
      'Owns execution quality, team coordination, milestone discipline, risk visibility, and service performance reporting.',
    image: hiringAnalytics,
    meta: 'Execution',
  },
  {
    title: 'People Operations',
    copy:
      'Builds hiring discipline, training support, workforce planning, HR process control, and internal capability growth.',
    image: interviewCoordination,
    meta: 'People',
  },
]

const leadershipPrinciples = [
  ['Accountability', 'Every commitment is translated into ownership, timelines, and measurable delivery checkpoints.'],
  ['Clarity', 'Leadership communication stays practical, direct, and aligned with client business priorities.'],
  ['Quality Discipline', 'Service quality is reviewed through process checks, feedback loops, and continuous improvement.'],
  ['Scalable Thinking', 'Decisions are made with long-term growth, team capacity, technology, and operating resilience in mind.'],
]

const leadershipMetrics = [
  ['07', 'Integrated service verticals'],
  ['05', 'Operating review stages'],
  ['03', 'Leadership focus areas'],
  ['100%', 'Accountability mindset'],
]

const newsroomStats = [
  ['07', 'Service verticals'],
  ['03', 'Company update streams'],
  ['05', 'Business focus areas'],
  ['2026', 'Current newsroom cycle'],
]

const newsroomUpdates = [
  {
    title: 'Cromgen Rozgar expands its workforce solutions focus',
    copy:
      'Cromgen continues building a dedicated identity for recruitment, staffing, payroll coordination, compliance support, and HR consulting services.',
    image: recruitmentHero,
    category: 'People Operations',
    date: 'Company Update',
  },
  {
    title: 'Image-led service pages improve service discovery',
    copy:
      'New visual service pages help visitors understand Cromgen capabilities across talent acquisition, software, AI, IT, support, and telecom delivery.',
    image: candidatePipeline,
    category: 'Digital Experience',
    date: 'Platform Update',
  },
  {
    title: 'Integrated service portfolio strengthens client delivery',
    copy:
      'Cromgen aligns AI, digital marketing, software development, IT services, call center operations, HR consulting, and telecommunications into one practical service model.',
    image: aiHero,
    category: 'Service Portfolio',
    date: 'Business Update',
  },
]

const newsroomCategories = [
  ['Company News', 'Official updates about Cromgen Technology, Cromgen Rozgar, service growth, and platform improvements.'],
  ['Service Insights', 'Practical articles about AI, marketing, support operations, IT, software, HR, and telecommunications.'],
  ['Media Notes', 'Brand announcements, visual updates, leadership messages, and professional communication resources.'],
]

const awardsMetrics = [
  ['04', 'Recognition pillars'],
  ['07', 'Service areas represented'],
  ['100%', 'Quality-focused mindset'],
  ['2026', 'Enterprise review cycle'],
]

const recognitionPillars = [
  {
    title: 'Service Excellence',
    copy:
      'Recognition for dependable execution, structured reporting, and consistent client communication across service engagements.',
    image: bulkTalent,
    tag: 'Delivery',
  },
  {
    title: 'Innovation Mindset',
    copy:
      'Recognition for applying AI, automation, digital systems, and practical process improvements to business workflows.',
    image: aiHero,
    tag: 'Innovation',
  },
  {
    title: 'Client Trust',
    copy:
      'Recognition for transparent work habits, responsible coordination, and outcome-focused professional service behavior.',
    image: candidatePipeline,
    tag: 'Trust',
  },
  {
    title: 'Operational Quality',
    copy:
      'Recognition for quality checks, documentation discipline, review cycles, and continuous service improvement.',
    image: hiringAnalytics,
    tag: 'Quality',
  },
]

const certificationMetrics = [
  ['04', 'Control areas'],
  ['05', 'Review stages'],
  ['07', 'Service verticals aligned'],
  ['360', 'Documentation mindset'],
]

const certificationControls = [
  {
    title: 'Business Documentation',
    copy: 'Clear proposals, scope notes, process records, review logs, and service documentation for every engagement.',
  },
  {
    title: 'Data Handling',
    copy: 'Responsible treatment of client, candidate, vendor, and operational data through access control and business-use discipline.',
  },
  {
    title: 'Quality Review',
    copy: 'Internal review habits for deliverables, reports, client updates, service performance, and continuous improvement.',
  },
  {
    title: 'Compliance Support',
    copy: 'Practical support for HR, operational, policy, and documentation requirements aligned with client business needs.',
  },
]

const careerOpenings = [
  {
    slug: 'ai-solutions-associate',
    title: 'AI Solutions Associate',
    department: 'Artificial Intelligence',
    location: 'Remote / Hybrid',
    type: 'Full Time',
    experience: '1-3 years',
    image: aiHero,
    summary:
      'Support AI chatbot, workflow automation, CRM intelligence, and business process improvement projects for client teams.',
    responsibilities: ['Map business workflows', 'Coordinate AI implementation tasks', 'Prepare client-ready reports'],
  },
  {
    slug: 'digital-marketing-executive',
    title: 'Digital Marketing Executive',
    department: 'Digital Marketing',
    location: 'Remote / Office',
    type: 'Full Time',
    experience: '1-4 years',
    image: softwareHero,
    summary:
      'Plan and execute SEO, paid ads, social media, landing page, and reporting activities for business growth campaigns.',
    responsibilities: ['Manage campaign calendars', 'Track lead quality', 'Prepare monthly performance insights'],
  },
  {
    slug: 'customer-support-specialist',
    title: 'Customer Support Specialist',
    department: 'Call Center',
    location: 'Office / Hybrid',
    type: 'Full Time',
    experience: '0-3 years',
    image: recruitmentHero,
    summary:
      'Handle inbound and outbound customer communication with professional scripts, clear notes, and service discipline.',
    responsibilities: ['Manage customer conversations', 'Capture call notes', 'Follow escalation processes'],
  },
  {
    slug: 'frontend-developer',
    title: 'Frontend Developer',
    department: 'Software Development',
    location: 'Remote / Hybrid',
    type: 'Full Time',
    experience: '2-5 years',
    image: softwareHero,
    summary:
      'Build responsive business websites, dashboards, admin panels, and application interfaces for Cromgen client projects.',
    responsibilities: ['Develop React interfaces', 'Improve UI quality', 'Coordinate with backend teams'],
  },
  {
    slug: 'hr-recruitment-coordinator',
    title: 'HR Recruitment Coordinator',
    department: 'Cromgen Rozgar',
    location: 'Office / Hybrid',
    type: 'Full Time',
    experience: '1-4 years',
    image: hiringAnalytics,
    summary:
      'Coordinate candidate sourcing, screening, interview scheduling, documentation, and hiring pipeline communication.',
    responsibilities: ['Screen candidate profiles', 'Schedule interviews', 'Track joining documentation'],
  },
]

const projectImageMap = {
  ai: aiHero,
  hr: hiringAnalytics,
  it: itHero,
  recruitment: recruitmentHero,
  software: softwareHero,
}

const defaultProjectSummary =
  'This project was posted from Cromgen Project Management. Apply to discuss scope, timeline, and delivery support.'

function getAllCareerOpenings(apiJobs = []) {
  return [
    ...apiJobs.map((job) => ({
      ...job,
      image: job.image || hiringAnalytics,
      responsibilities: Array.isArray(job.responsibilities) ? job.responsibilities : [],
    })),
    ...careerOpenings,
  ]
}

function renderFormattedText(text) {
  const parts = String(text || '').split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).filter(Boolean)

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>
    }

    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={index}>{part.slice(1, -1)}</em>
    }

    return part
  })
}

const policyLinks = [
  ['Privacy Policy', '/privacy-policy'],
  ['Terms of Service', '/terms-of-service'],
  ['Cookie Policy', '/cookie-policy'],
  ['Refund Policy', '/refund-policy'],
  ['Disclaimer', '/disclaimer'],
  ['Sitemap', '/sitemap'],
]

const policyPages = {
  'privacy-policy': {
    title: 'Privacy Policy',
    eyebrow: 'Data protection',
    summary:
      'How Cromgen Technology handles enquiry details, contact information, service requirements, and communication data with responsible business use.',
    image: aiHero,
    updated: 'May 2026',
    accent: '#082a66',
    sections: [
      ['INFORMATION WE COLLECT', 'Name, phone, email, company details, service interest, and enquiry messages.'],
      ['HOW WE USE INFORMATION', 'We use details for replies, proposals, delivery coordination, and business records.'],
      ['DATA HANDLING', 'Access stays limited to relevant Cromgen team members.'],
      ['YOUR CHOICES', 'You can request updates, clarification, or removal where records allow it.'],
    ],
    highlights: ['Limited access', 'Business-only usage', 'Clear communication records'],
  },
  'terms-of-service': {
    title: 'Terms of Service',
    eyebrow: 'Service agreement',
    summary:
      'The service terms explain how Cromgen Technology scopes, delivers, reviews, and supports work across technology, marketing, support, HR, and telecom projects.',
    image: softwareHero,
    updated: 'May 2026',
    accent: '#ff4b2d',
    sections: [
      ['SERVICE SCOPE', 'Projects follow the approved proposal, timeline, and deliverables.'],
      ['CLIENT RESPONSIBILITIES', 'Clients provide requirements, access, approvals, assets, and feedback.'],
      ['DELIVERY AND REVIEW', 'Work moves through planning, setup, execution, review, and reporting.'],
      ['COMMERCIAL TERMS', 'Fees, renewals, cancellations, and conditions are confirmed in writing.'],
    ],
    highlights: ['Written scope', 'Clear timelines', 'Structured reviews'],
  },
  'cookie-policy': {
    title: 'Cookie Policy',
    eyebrow: 'Website experience',
    summary:
      'Cromgen Technology may use basic cookies and analytics signals to understand website usage, improve navigation, and keep the browsing experience reliable.',
    image: itHero,
    updated: 'May 2026',
    accent: '#63bc45',
    sections: [
      ['WHAT COOKIES DO', 'Cookies help remember preferences and measure website visits.'],
      ['HOW WE USE THEM', 'They support analytics, traffic checks, and page improvement.'],
      ['THIRD-PARTY TOOLS', 'Some tools may process limited technical information.'],
      ['MANAGING COOKIES', 'You can control cookies through browser settings.'],
    ],
    highlights: ['Performance insights', 'Navigation improvement', 'Browser-level control'],
  },
  'refund-policy': {
    title: 'Refund Policy',
    eyebrow: 'Commercial clarity',
    summary:
      'Refunds, credits, or cancellations depend on the approved proposal, service stage, work already completed, and written agreement between both parties.',
    image: hiringAnalytics,
    updated: 'May 2026',
    accent: '#3e3aa3',
    sections: [
      ['PROJECT-BASED SERVICES', 'Refund eligibility depends on completed discovery, planning, setup, or delivery work.'],
      ['RECURRING SERVICES', 'Monthly services follow the agreed cancellation and notice terms.'],
      ['NON-REFUNDABLE WORK', 'Completed work, campaigns, tools, assets, and third-party costs may be non-refundable.'],
      ['RESOLUTION PROCESS', 'Requests are reviewed using scope, delivery status, and written terms.'],
    ],
    highlights: ['Proposal-based terms', 'Stage-wise review', 'Documented resolution'],
  },
  disclaimer: {
    title: 'Disclaimer',
    eyebrow: 'Important notice',
    summary:
      'Website content is provided for general business information. Final service details, pricing, timelines, and outcomes are confirmed through official proposals and communication.',
    image: recruitmentHero,
    updated: 'May 2026',
    accent: '#082a66',
    sections: [
      ['INFORMATIONAL CONTENT', 'Website content explains services and capabilities at a general level.'],
      ['SERVICE OUTCOMES', 'Results may vary by inputs, market, budget, approvals, and dependencies.'],
      ['EXTERNAL LINKS', 'Cromgen is not responsible for external website content or policies.'],
      ['UPDATES', 'Content, visuals, service details, and policies may change when required.'],
    ],
    highlights: ['General information', 'No guaranteed outcome', 'Subject to updates'],
  },
  sitemap: {
    title: 'Sitemap',
    eyebrow: 'Website navigation',
    summary:
      'Use this page to explore Cromgen Technology services, company pages, onboarding options, Cromgen Rozgar HR solutions, and legal information.',
    image: softwareHero,
    updated: 'May 2026',
    accent: '#ff4b2d',
    sections: [
      ['CORE SERVICE PAGES', 'AI, Digital Marketing, Call Center, IT, Software, HR, and Telecom.'],
      ['COMPANY PAGES', 'About, Story, Leadership, Awards, Certifications, and News.'],
      ['ONBOARDING', 'Vendor and freelancer profile review pages.'],
      ['LEGAL PAGES', 'Privacy, Terms, Cookie, Refund, Disclaimer, and Sitemap.'],
    ],
    highlights: ['Service directory', 'Company links', 'Legal navigation'],
  },
}

const sitemapGroups = [
  {
    title: 'Services',
    links: [
      ['Artificial Intelligence', '/artificial-intelligence'],
      ['Digital Marketing', '/digital-marketing'],
      ['Call Center', '/call-center-service'],
      ['IT Services', '/it-services'],
      ['Software Development', '/software-development-services'],
      ['HR Consultant', '/hr-consultant'],
      ['Telecommunications', '/telecommunications'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['About Cromgen', '/about-cromgen'],
      ['Our Story', '/our-story'],
      ['Leadership', '/leadership'],
      ['Awards & Recognition', '/awards-recognition'],
      ['Certifications', '/certifications'],
      ['News Room', '/news-room'],
    ],
  },
  {
    title: 'Legal',
    links: policyLinks,
  },
]

export function AboutCromgenPage() {
  return (
    <main className="company-page pt-32 sm:pt-36 lg:pt-28">
      <section className="company-hero company-hero-about about-cromgen-hero">
        <div className="about-hero-pattern" aria-hidden="true" />
        <div className="about-hero-shell mx-auto grid max-w-7xl gap-10 px-5 py-16">
          <div className="about-hero-copy">
            <p className="company-eyebrow">About Cromgen</p>
            <h1>About Cromgen</h1>
            <p>
              Cromgen Technology is a multi-service business partner connecting Artificial Intelligence, Digital
              Marketing, Call Center Operations, IT, Software Development, HR Consulting, and Telecommunications
              with real operational workflows. Every service is designed around clear planning, dependable
              execution, and measurable improvement.
            </p>
            <div className="company-actions">
              <a href="/hr-consultant">Explore Cromgen Rozgar</a>
              <a href="/software-development-services">View Capabilities</a>
            </div>
            <div className="about-proof-strip">
              {['7 Service Verticals', 'Structured Delivery', 'Practical Reporting'].map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <div className="about-enterprise-stats">
              {cromgenEnterpriseStats.map(([value, label]) => (
                <article key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </article>
              ))}
            </div>
          </div>
          <div className="about-visual-board">
            <div className="about-image-frame">
              <img src={recruitmentHero} alt="Cromgen enterprise service delivery team" />
              <div className="about-image-glass">
                <span>Enterprise Delivery View</span>
                <strong>Strategy, people, technology, and operations in one service system.</strong>
              </div>
            </div>
            <div className="about-image-pair">
              <img src={aiHero} alt="Cromgen AI capability" />
              <img src={softwareHero} alt="Cromgen software capability" />
            </div>
            <div className="about-floating-note">
              <strong>Realistic service model</strong>
              <span>Plan, execute, measure, improve.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="company-section about-enterprise-section">
        <div className="mx-auto max-w-7xl px-5">
          <div className="about-enterprise-layout">
            <SectionIntro
              className="about-centered-intro"
              eyebrow="What Cromgen does"
              title="One company, seven focused service verticals."
            />
            <p>
              Cromgen gives enterprise teams a coordinated service model where strategy, technology, marketing,
              support, people operations, and communication infrastructure can move under one accountable partner.
            </p>
          </div>
          <div className="company-service-grid">
            {serviceAreas.map((item, index) => (
              <article key={item}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{item}</strong>
              </article>
            ))}
          </div>
          <div className="about-pillar-grid">
            {cromgenEnterprisePillars.map((pillar) => (
              <article key={pillar.title}>
                <h3>{pillar.title}</h3>
                <p>{pillar.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-story-section">
        <div className="mx-auto max-w-7xl px-5">
          <div className="about-section-header">
            <p className="company-eyebrow">Service Stories</p>
            <h2>How Cromgen services work in a realistic business environment.</h2>
            <p>
              Each service story explains how delivery works with real clients through planning, implementation,
              support, reporting, and continuous improvement.
            </p>
          </div>

          <div className="about-story-grid">
            {cromgenServiceStories.map((service, index) => (
              <article key={service.title} className="about-service-story" style={{ '--story-accent': service.accent }}>
                <div className="about-story-media">
                  <img src={service.image} alt={`${service.title} service story`} />
                  <span>{String(index + 1).padStart(2, '0')}</span>
                </div>
                <div className="about-story-content">
                  <h3>{service.title}</h3>
                  <p>{service.summary}</p>
                  <div>
                    <strong>Realistic delivery story</strong>
                    <p>{service.story}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-operating-section">
        <div className="about-operating-shell mx-auto grid max-w-7xl gap-8 px-5 py-16">
          <div className="about-operating-intro">
            <p className="company-eyebrow">Cromgen Engine</p>
            <h2>From first conversation to continuous improvement.</h2>
            <p>
              Cromgen handles every project as a structured service journey. Clients know which stage the work is
              in, what the next action is, and how the result will be measured.
            </p>
          </div>
          <div className="about-process-list">
            {cromgenStorySteps.map(([number, title, copy]) => (
              <article key={title}>
                <span>{number}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <VideoPanel image={itHero} title="Cromgen service engine" copy="A structured delivery model for planning, execution, reporting, and continuous service improvement." />
    </main>
  )
}

export function OurStoryPage() {
  return (
    <main className="company-page pt-32 sm:pt-36 lg:pt-28">
      <section className="story-hero story-hero-centered">
        <img src={softwareHero} alt="Cromgen story and technology journey" />
        <div>
          <p className="company-eyebrow">Our Story</p>
          <h1>Our Story</h1>
          <p>
            Cromgen was built around a practical idea: businesses need a dependable partner that can understand
            the goal, organize the workflow, and keep service delivery accountable from planning to improvement.
          </p>
        </div>
      </section>
      <section className="company-section">
        <div className="mx-auto max-w-7xl px-5">
          <div className="about-section-header mb-10">
            <p className="company-eyebrow">Company Journey</p>
            <h2>From service-first thinking to a multi-service business platform.</h2>
            <p>
              The Cromgen journey connects technology, operations, people support, marketing, and communication
              services into one structured delivery model for modern businesses.
            </p>
          </div>
          <div className="story-timeline">
            {[
              ['Foundation', 'Service-first mindset across technology, support, and operations.'],
              ['Expansion', 'Added AI, digital marketing, IT, software, telecom, and call center capabilities.'],
              ['Cromgen Rozgar', 'Created a stronger focus on recruitment, payroll, staffing, and HR consulting.'],
              ['Today', 'A multi-service partner for companies that need structured growth support.'],
            ].map(([title, copy]) => (
              <article key={title}>
                <span />
                <h2>{title}</h2>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <VideoPanel image={recruitmentHero} title="People, process, performance" copy="The Cromgen journey is about making complex service operations easier to execute and measure." />
    </main>
  )
}

export function LeadershipPage() {
  return (
    <main className="company-page pt-32 sm:pt-36 lg:pt-28">
      <section className="leadership-hero">
        <div className="leadership-hero-shell mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="leadership-hero-copy">
            <p className="company-eyebrow">Leadership</p>
            <h1>Enterprise leadership built for accountable service delivery.</h1>
            <p>
              Cromgen leadership brings strategy, delivery, people operations, and quality governance together so
              every service line can move with clarity, consistency, and measurable client value.
            </p>
            <div className="leadership-metrics">
              {leadershipMetrics.map(([value, label]) => (
                <article key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </article>
              ))}
            </div>
          </div>

          <div className="leadership-command-panel">
            <img src={executiveSearch} alt="Cromgen enterprise leadership planning" />
            <div>
              <span>Leadership Model</span>
              <strong>Strategic direction, delivery discipline, and people capability working as one system.</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="leadership-operating-section">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <div className="about-section-header">
            <p className="company-eyebrow">Operating Model</p>
            <h2>Leadership functions that keep service delivery structured.</h2>
            <p>
              Cromgen leadership is organized around practical business outcomes: clear direction, reliable
              execution, capable teams, and transparent communication.
            </p>
          </div>

          <div className="leadership-grid">
            {leadershipFunctions.map((item) => (
              <article key={item.title}>
                <div className="leadership-card-media">
                  <img src={item.image} alt={`${item.title} at Cromgen`} />
                  <span>{item.meta}</span>
                </div>
                <h2>{item.title}</h2>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="leadership-principles-section">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="leadership-principles-copy">
            <p className="company-eyebrow">Governance</p>
            <h2>Professional standards behind every decision.</h2>
            <p>
              The leadership culture at Cromgen is designed to reduce ambiguity, protect service quality, and keep
              teams aligned around client outcomes.
            </p>
          </div>
          <div className="leadership-principles-grid">
            {leadershipPrinciples.map(([title, copy], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <VideoPanel
        image={hiringAnalytics}
        title="Leadership measured through delivery quality."
        copy="Cromgen leadership focuses on clear ownership, operational review, people capability, and service improvement across every engagement."
      />
    </main>
  )
}

export function AwardsRecognitionPage() {
  return (
    <main className="company-page pt-32 sm:pt-36 lg:pt-28">
      <section className="awards-hero">
        <div className="awards-hero-shell mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="awards-hero-copy">
            <p className="company-eyebrow">Awards & Recognition</p>
            <h1>Recognition built around quality, trust, and measurable delivery.</h1>
            <p>Cromgen's recognition culture is focused on professional service discipline, innovation, client trust, and operational quality across every business function.</p>
            <div className="awards-metrics">
              {awardsMetrics.map(([value, label]) => (
                <article key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </article>
              ))}
            </div>
          </div>
          <div className="awards-feature-card">
            <img src={bulkTalent} alt="Cromgen awards and recognition" />
            <div>
              <span>Recognition Framework</span>
              <strong>Celebrating teams that deliver clarity, accountability, and practical client value.</strong>
            </div>
          </div>
        </div>
      </section>
      <section className="awards-recognition-section">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <div className="about-section-header">
            <p className="company-eyebrow">Recognition Pillars</p>
            <h2>Enterprise standards behind every recognition category.</h2>
            <p>
              Cromgen recognizes the behaviors that improve service delivery: accountable ownership, strong
              execution habits, responsible communication, and measurable improvement.
            </p>
          </div>

          <div className="awards-grid">
            {recognitionPillars.map((item) => (
              <article key={item.title}>
                <div className="awards-card-media">
                  <img src={item.image} alt={`${item.title} recognition`} />
                  <span>{item.tag}</span>
                </div>
                <div>
                  <h2>{item.title}</h2>
                  <p>{item.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <VideoPanel image={bulkTalent} title="Recognition through results" copy="Awards matter most when they reflect consistent delivery, transparent reporting, and better outcomes." />
    </main>
  )
}

export function CertificationsPage() {
  return (
    <main className="company-page pt-32 sm:pt-36 lg:pt-28">
      <section className="cert-hero">
        <div className="cert-hero-shell mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="cert-hero-copy">
            <p className="company-eyebrow">Certifications</p>
            <h1>Process confidence through controls, documentation, and review discipline.</h1>
            <p>
              Cromgen's certification mindset is built around practical governance: clear records, responsible
              data handling, quality checks, and compliance-aware service delivery.
            </p>
            <div className="cert-metrics">
              {certificationMetrics.map(([value, label]) => (
                <article key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </article>
              ))}
            </div>
          </div>

          <div className="cert-feature-card">
            <img src={screeningFramework} alt="Cromgen certification and documentation controls" />
            <div>
              <span>Control Framework</span>
              <strong>Documentation, review, and compliance focus across Cromgen service operations.</strong>
            </div>
          </div>
        </div>
      </section>
      <section className="cert-controls-section">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <div className="about-section-header">
            <p className="company-eyebrow">Control Areas</p>
            <h2>Professional controls that support reliable service delivery.</h2>
            <p>
              These certification-focused controls help Cromgen maintain clarity, reduce operational risk, and
              support clients with dependable business documentation.
            </p>
          </div>

          <div className="cert-grid">
            {certificationControls.map((item, index) => (
              <article key={item.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h2>{item.title}</h2>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <VideoPanel image={screeningFramework} title="Certification mindset for business confidence." copy="Cromgen uses documentation, quality review, and compliance-aware processes to support dependable service delivery." />
    </main>
  )
}

export function NewsRoomPage() {
  const [remotePosts, setRemotePosts] = useState([])
  const displayPosts = [
    ...remotePosts.map((post) => ({
      title: post.title,
      copy: post.summary,
      image: post.image || aiHero,
      category: post.category,
      date: post.date,
    })),
    ...newsroomUpdates,
  ]

  useEffect(() => {
    let isMounted = true

    apiRequest(NEWS_ENDPOINTS.publicList)
      .then((data) => {
        if (isMounted) setRemotePosts(data.posts || [])
      })
      .catch(() => {
        if (isMounted) setRemotePosts([])
      })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <main className="company-page pt-32 sm:pt-36 lg:pt-28">
      <section className="news-hero">
        <div className="news-hero-shell mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="news-hero-copy">
            <p className="company-eyebrow">News Room</p>
            <h1>Enterprise updates from Cromgen Technology.</h1>
            <p>
              Explore official company updates, service portfolio news, Cromgen Rozgar announcements, and business
              insights from the teams building Cromgen’s multi-service delivery platform.
            </p>
            <div className="newsroom-stats">
              {newsroomStats.map(([value, label]) => (
                <article key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </article>
              ))}
            </div>
          </div>

          <article className="news-feature-card">
            <img src={softwareHero} alt="Cromgen Technology newsroom feature" />
            <div>
              <span>Featured Update</span>
              <h2>Cromgen continues building an integrated service ecosystem for modern businesses.</h2>
              <p>
                The newsroom highlights how Cromgen connects technology, people operations, marketing, support,
                and communication services into structured business delivery.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="news-updates-section">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <div className="about-section-header">
            <p className="company-eyebrow">Latest Updates</p>
            <h2>Company news, service updates, and platform progress.</h2>
            <p>
              News Room content is written for clients, partners, candidates, and business leaders who want a clear
              view of Cromgen’s service direction and operating focus.
            </p>
          </div>

          <div className="news-layout">
            {displayPosts.map((item) => (
              <article key={item.title}>
                <div className="news-card-media">
                  <img src={item.image} alt={item.title} />
                  <span>{item.category}</span>
                </div>
                <div>
                  <span>{item.date}</span>
                  <h2>{item.title}</h2>
                  <p>{item.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="news-categories-section">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div className="news-categories-copy">
            <p className="company-eyebrow">Editorial Areas</p>
            <h2>Organized communication for every stakeholder.</h2>
            <p>
              Cromgen’s newsroom is structured to keep information clear, professional, and useful for business
              decision-makers.
            </p>
          </div>
          <div className="news-category-grid">
            {newsroomCategories.map(([title, copy], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <VideoPanel
        image={bulkTalent}
        title="News built around progress, clarity, and credibility."
        copy="Cromgen shares updates that reflect service growth, operational discipline, and the company’s commitment to practical business outcomes."
      />
    </main>
  )
}

export function CareerPage() {
  const [openings, setOpenings] = useState(() => getAllCareerOpenings())

  useEffect(() => {
    let isMounted = true

    apiRequest(JOB_ENDPOINTS.publicList)
      .then((data) => {
        if (isMounted) setOpenings(getAllCareerOpenings(data.jobs || []))
      })
      .catch(() => {
        if (isMounted) setOpenings(getAllCareerOpenings())
      })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <main className="company-page pt-32 sm:pt-36 lg:pt-28">
      <section className="career-hero">
        <div className="career-hero-shell mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="career-hero-copy">
            <p className="company-eyebrow">Career</p>
            <h1>Build an enterprise service career with Cromgen.</h1>
            <p>
              Join teams working across AI, digital marketing, call center operations, IT, software development,
              HR consulting, and telecommunications. Cromgen careers are built around practical skills, structured
              delivery, and measurable client impact.
            </p>
            <div className="company-actions">
              <a href="#career-openings">View Vacancies</a>
              <a href="/candidate-register">Candidate Register</a>
            </div>
          </div>
          <div className="career-visual-panel">
            <img src={candidatePipeline} alt="Cromgen career opportunities" />
            <div>
              <span>Open Opportunities</span>
              <strong>{openings.length} active vacancies across Cromgen service teams.</strong>
            </div>
          </div>
        </div>
      </section>

      <section id="career-openings" className="career-openings-section">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <div className="about-section-header">
            <p className="company-eyebrow">Vacancies</p>
            <h2>Current openings at Cromgen Technology.</h2>
            <p>
              Select a vacancy to review the role and apply. Candidates who are not logged in will be guided to the
              candidate login or registration page before submitting an application.
            </p>
          </div>

          <div className="career-vacancy-grid">
            {openings.map((job) => (
              <article key={job.slug} className="career-vacancy-card">
                <div className="career-vacancy-media">
                  <img src={job.image} alt={`${job.title} vacancy`} />
                  <span>{job.department}</span>
                </div>
                <div className="career-vacancy-body">
                  <div className="career-vacancy-meta">
                    <span>{job.location}</span>
                    <span>{job.type}</span>
                    <span>{job.experience}</span>
                  </div>
                  <h3>{job.title}</h3>
                  <p>{renderFormattedText(job.summary)}</p>
                  <a href={`/career/apply/${job.slug}`}>View and Apply</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export function OutsourceProjectPage() {
  const [postedProjects, setPostedProjects] = useState([])
  const [isLoadingProjects, setIsLoadingProjects] = useState(true)
  const isUserLoggedIn =
    Boolean(localStorage.getItem('cromgen_auth_token')) &&
    ['user', 'admin', 'staff'].includes(String(localStorage.getItem('cromgen_auth_role') || '').toLowerCase())
  const applyHref = isUserLoggedIn ? '/user-dashboard' : '/login?redirect=/user-dashboard'

  useEffect(() => {
    let isMounted = true

    apiRequest(PROJECT_ENDPOINTS.publicList)
      .then((data) => {
        if (!isMounted) return
        const projects = (data.projects || [])
          .filter((project) => project.title)
          .map((project) => ({
            slug: project.id || project.title,
            title: project.title,
            department: project.department || 'Project Management',
            location: project.location || 'Cromgen Admin Post',
            type: project.projectType || project.projectStatus || 'Outsource',
            experience: project.experience || 'Outsource Project',
            image: projectImageMap[project.imageKey] || softwareHero,
            summary: project.publicSummary || defaultProjectSummary,
          }))

        setPostedProjects(projects)
      })
      .catch(() => {
        if (isMounted) setPostedProjects([])
      })
      .finally(() => {
        if (isMounted) setIsLoadingProjects(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <main className="company-page pt-32 sm:pt-36 lg:pt-28">
      <section className="career-hero">
        <div className="career-hero-shell mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="career-hero-copy">
            <p className="company-eyebrow">Outsource Project</p>
            <h1>Outsource business work to Cromgen delivery teams.</h1>
            <p>
              Share your project requirement and let Cromgen support execution across AI, digital marketing, call center,
              IT, software development, HR consulting, and telecommunications with structured delivery and reporting.
            </p>
            <div className="company-actions">
              <a href="#outsource-openings">View Project Options</a>
              <a href="/contact-requests?service=Outsource%20Project">Submit Requirement</a>
            </div>
          </div>
          <div className="career-visual-panel">
            <img src={softwareHero} alt="Outsource project opportunities" />
            <div>
              <span>Project Outsourcing</span>
              <strong>{postedProjects.length} project opportunities ready for Cromgen delivery support.</strong>
            </div>
          </div>
        </div>
      </section>

      <section id="outsource-openings" className="career-openings-section">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <div className="about-section-header">
            <p className="company-eyebrow">Project Management</p>
            <h2>Projects loaded from backend and MongoDB.</h2>
            <p>
              These projects come from the backend Project Management collection. Apply to continue through your user
              dashboard.
            </p>
          </div>

          {isLoadingProjects ? (
            <p className="auth-status is-success">Loading projects...</p>
          ) : postedProjects.length ? (
            <div className="career-vacancy-grid">
              {postedProjects.map((project) => (
                <article key={project.slug} className="career-vacancy-card">
                  <div className="career-vacancy-media">
                    <img src={project.image} alt={`${project.title} outsourcing`} />
                    <span>{project.department}</span>
                  </div>
                  <div className="career-vacancy-body">
                    <div className="career-vacancy-meta">
                      <span>{project.location}</span>
                      <span>{project.type}</span>
                      <span>{project.experience}</span>
                    </div>
                    <h3>{project.title}</h3>
                    <p>{renderFormattedText(project.summary)}</p>
                    <a href={applyHref}>Apply</a>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="auth-status is-error">No outsource projects are available right now.</p>
          )}
        </div>
      </section>
    </main>
  )
}

export function CareerApplyPage({ slug }) {
  const [openings, setOpenings] = useState(() => getAllCareerOpenings())
  const job = openings.find((item) => item.slug === slug) || careerOpenings[0]
  const isCandidateLoggedIn = localStorage.getItem('cromgen_candidate_auth') === 'true'
  const isCandidateRegistered = localStorage.getItem('cromgen_candidate_registered') === 'true'
  const savedProfile = JSON.parse(localStorage.getItem('cromgen_candidate_profile') || '{}')
  const [formData, setFormData] = useState({
    name: savedProfile.name || '',
    email: savedProfile.email || localStorage.getItem('cromgen_candidate_email') || '',
    phone: savedProfile.phone || '',
    experience: savedProfile.experience || '',
    portfolio: '',
    noticePeriod: '',
    message: '',
    resume: { name: '', type: '', data: '' },
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [applyStatus, setApplyStatus] = useState({ type: '', message: '' })

  useEffect(() => {
    let isMounted = true

    apiRequest(JOB_ENDPOINTS.publicList)
      .then((data) => {
        if (isMounted) setOpenings(getAllCareerOpenings(data.jobs || []))
      })
      .catch(() => {
        if (isMounted) setOpenings(getAllCareerOpenings())
      })

    return () => {
      isMounted = false
    }
  }, [])

  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }))
  }

  const handleResumeChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ]

    if (!allowedTypes.includes(file.type) && !/\.(pdf|doc|docx)$/i.test(file.name)) {
      setApplyStatus({ type: 'error', message: 'Please upload a PDF, DOC, or DOCX resume.' })
      event.target.value = ''
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      setFormData((current) => ({
        ...current,
        resume: {
          name: file.name,
          type: file.type || 'application/octet-stream',
          data: String(reader.result || ''),
        },
      }))
      setApplyStatus({ type: 'success', message: 'Resume attached successfully.' })
    }
    reader.onerror = () => {
      setApplyStatus({ type: 'error', message: 'Unable to read selected resume.' })
    }
    reader.readAsDataURL(file)
  }

  const handleApply = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setApplyStatus({ type: '', message: '' })

    try {
      await apiRequest(APPLICATION_ENDPOINTS.publicCreate, {
        method: 'POST',
        body: JSON.stringify({
          job: job.slug,
          title: job.title,
          department: job.department,
          location: job.location,
          candidate: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            experience: formData.experience,
            portfolio: formData.portfolio,
            noticePeriod: formData.noticePeriod,
            message: formData.message,
          },
          resume: formData.resume,
        }),
      })
      setIsSubmitted(true)
    } catch (error) {
      setApplyStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Unable to submit application.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="career-apply-page pt-32 sm:pt-36 lg:pt-28">
      <section className="career-apply-hero">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="company-eyebrow">Apply for Role</p>
            <h1>{job.title}</h1>
            <p>{job.summary}</p>
            <div className="career-vacancy-meta">
              <span>{job.department}</span>
              <span>{job.location}</span>
              <span>{job.experience}</span>
            </div>
          </div>
          <div className="career-apply-card">
            {!isCandidateLoggedIn ? (
              <>
                <span>Candidate access required</span>
                <h2>{isCandidateRegistered ? 'Login to continue your application.' : 'Register or login to apply.'}</h2>
                <p>
                  Candidate access keeps your application details connected with the selected vacancy and allows the
                  Cromgen team to review your profile properly.
                </p>
                <div className="career-apply-actions">
                  <a href={`/candidate-login?redirect=/career/apply/${job.slug}`}>Candidate Login</a>
                  <a href={`/candidate-register?redirect=/career/apply/${job.slug}`}>Candidate Register</a>
                </div>
              </>
            ) : isSubmitted ? (
              <>
                <span>Application submitted</span>
                <h2>Submitted application</h2>
                <p>
                  Your application for {job.title} has been submitted. The Cromgen recruitment team can now review
                  your details.
                </p>
                <a href="/career">View More Vacancies</a>
              </>
            ) : (
              <form onSubmit={handleApply}>
                <span>Candidate details</span>
                <h2>Complete your application.</h2>
                {applyStatus.message ? (
                  <p className={`auth-status ${applyStatus.type === 'success' ? 'is-success' : 'is-error'}`}>
                    {applyStatus.message}
                  </p>
                ) : null}
                <div className="career-apply-form-grid">
                  {[
                    ['name', 'Full Name'],
                    ['email', 'Email Address'],
                    ['phone', 'Phone Number'],
                    ['experience', 'Experience'],
                    ['portfolio', 'Portfolio or LinkedIn'],
                    ['noticePeriod', 'Notice Period'],
                  ].map(([name, label]) => (
                    <label key={name}>
                      <span>{label}</span>
                      <input
                        name={name}
                        type={name === 'email' ? 'email' : 'text'}
                        value={formData[name]}
                        onChange={handleChange}
                        required={['name', 'email', 'phone'].includes(name)}
                      />
                    </label>
                  ))}
                  <label className="career-apply-wide">
                    <span>Why are you a good fit?</span>
                    <textarea name="message" value={formData.message} onChange={handleChange} required />
                  </label>
                  <label className="career-apply-wide career-resume-upload">
                    <span>Resume Upload</span>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={handleResumeChange}
                    />
                    {formData.resume?.name ? <b>{formData.resume.name}</b> : null}
                  </label>
                </div>
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

export function PolicyPage({ type }) {
  const fallbackPage = policyPages[type] || policyPages['privacy-policy']
  const [remotePage, setRemotePage] = useState(null)
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [leadForm, setLeadForm] = useState({ name: '', email: '', service: '', query: '' })
  const [leadStatus, setLeadStatus] = useState({ type: '', message: '' })
  const page = remotePage || fallbackPage

  useEffect(() => {
    let isMounted = true

    apiRequest(POLICY_ENDPOINTS.publicDetail(type))
      .then((data) => {
        if (isMounted) setRemotePage(data.policy || null)
      })
      .catch(() => {
        if (isMounted) setRemotePage(null)
      })

    return () => {
      isMounted = false
    }
  }, [type])

  const updateLeadField = (field, value) => {
    setLeadForm((current) => ({ ...current, [field]: value }))
  }

  const submitLead = async (event) => {
    event.preventDefault()
    setLeadStatus({ type: '', message: '' })

    try {
      await apiRequest(LEAD_ENDPOINTS.publicCreate, {
        method: 'POST',
        body: JSON.stringify(leadForm),
      })
      setLeadForm({ name: '', email: '', service: '', query: '' })
      setLeadStatus({ type: 'success', message: 'Your enquiry has been submitted successfully.' })
    } catch (error) {
      setLeadStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Unable to submit enquiry.',
      })
    }
  }

  return (
    <main className="policy-page pt-32 sm:pt-36 lg:pt-28">
      <section className="policy-hero">
        <img src={page.image} alt={`${page.title} visual`} />
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="policy-eyebrow">{page.eyebrow}</p>
            <h1>{page.title}</h1>
            <p>{page.summary}</p>
            <div className="policy-meta">
              <span>Updated {page.updated}</span>
              <span>Cromgen Technology</span>
            </div>
          </div>

          <div className="policy-highlight-card">
            <span>Legal Clarity</span>
            <strong>Clear, practical, and business-focused information.</strong>
            <ul>
              {page.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="policy-body">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-14 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="policy-nav">
            <span>Legal Pages</span>
            {policyLinks.map(([label, href]) => (
              <a key={label} href={href} className={href === `/${type}` ? 'is-active' : ''}>
                {label}
              </a>
            ))}
          </aside>

          <div>
            <div className="policy-section-grid">
              {page.sections.map(([title, copy], index) => (
                <article key={title} className="policy-info-card">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h2>{title}</h2>
                  <p>{copy}</p>
                </article>
              ))}
            </div>

            {type === 'sitemap' ? (
              <div className="sitemap-panel">
                {sitemapGroups.map((group) => (
                  <article key={group.title}>
                    <h2>{group.title}</h2>
                    <div>
                      {group.links.map(([label, href]) => (
                        <a key={label} href={href}>
                          {label}
                        </a>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            ) : null}

            <div className="policy-contact-strip">
              <div>
                <span>Need clarification?</span>
                <strong>Contact Cromgen Technology through official enquiry channels.</strong>
              </div>
              <button type="button" onClick={() => setIsContactOpen(true)}>Contact Team</button>
            </div>
          </div>
        </div>
      </section>

      {isContactOpen ? (
        <div className="contact-modal-backdrop" role="dialog" aria-modal="true" aria-label="Contact Cromgen">
          <form className="contact-modal" onSubmit={submitLead}>
            <div className="contact-modal-head">
              <div>
                <span>Contact Team</span>
                <h2>Send your enquiry</h2>
              </div>
              <button type="button" onClick={() => setIsContactOpen(false)} aria-label="Close contact form">×</button>
            </div>
            <div className="contact-modal-grid">
              <label>
                <span>Name</span>
                <input value={leadForm.name} onChange={(event) => updateLeadField('name', event.target.value)} required />
              </label>
              <label>
                <span>Email</span>
                <input type="email" value={leadForm.email} onChange={(event) => updateLeadField('email', event.target.value)} required />
              </label>
              <label className="contact-modal-wide">
                <span>Select Service</span>
                <select value={leadForm.service} onChange={(event) => updateLeadField('service', event.target.value)} required>
                  <option value="">Select service</option>
                  {serviceAreas.map((service) => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </label>
              <label className="contact-modal-wide">
                <span>Write your query</span>
                <textarea value={leadForm.query} onChange={(event) => updateLeadField('query', event.target.value)} required />
              </label>
            </div>
            {leadStatus.message ? (
              <p className={`auth-status ${leadStatus.type === 'success' ? 'is-success' : 'is-error'}`}>
                {leadStatus.message}
              </p>
            ) : null}
            <button type="submit">Submit Enquiry</button>
          </form>
        </div>
      ) : null}
    </main>
  )
}

function VideoPanel({ image, title, copy }) {
  return (
    <section className="company-video-panel">
      <img src={image} alt={title} />
      <div>
        <button type="button" aria-label="Play video preview">▶</button>
        <h2>{title}</h2>
        <p>{copy}</p>
      </div>
    </section>
  )
}

function SectionIntro({ eyebrow, title, className = '' }) {
  return (
    <div className={`mb-9 max-w-3xl ${className}`}>
      <p className="company-eyebrow">{eyebrow}</p>
      <h2 className="text-3xl font-black leading-tight text-[#071936] sm:text-4xl">{title}</h2>
    </div>
  )
}
