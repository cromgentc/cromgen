import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart3,
  Bot,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Cloud,
  Code2,
  Database,
  FileAudio,
  Globe2,
  Headphones,
  HeartPulse,
  Landmark,
  Languages,
  Layers3,
  LineChart,
  Megaphone,
  Minus,
  Network,
  Phone,
  Plus,
  Rocket,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Star,
  Target,
  Truck,
  Users,
  Video,
} from 'lucide-react'
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

const outsourceStats = [
  ['500+', 'Projects Delivered'],
  ['10,000+', 'Workforce Network'],
  ['24/7', 'Operational Support'],
  ['Global', 'Client Coverage'],
]

const outsourceServices = [
  [Database, 'AI Data Collection', 'Collect speech, image, video, text, and human feedback datasets with managed project teams.'],
  [Target, 'Data Annotation & Labeling', 'Scale labeling, QA, classification, transcription, and validation workflows for AI operations.'],
  [FileAudio, 'Script Recording Projects', 'Run voice recording, script reading, pronunciation, and multilingual audio collection programs.'],
  [Video, 'Face Motion & Video Collection', 'Coordinate compliant face motion, gesture, video, and visual data collection assignments.'],
  [Users, 'Recruitment Process Outsourcing (RPO)', 'Outsource sourcing, screening, interview coordination, onboarding, and talent pipeline support.'],
  [Headphones, 'BPO & Call Center Operations', 'Deploy inbound, outbound, helpdesk, appointment setting, and customer care operations.'],
  [LineChart, 'Lead Generation Projects', 'Build prospecting, qualification, outreach, CRM updates, and sales support workflows.'],
  [Code2, 'Software & Web Development', 'Deliver portals, dashboards, web apps, automations, and business software with agile teams.'],
  [Cloud, 'CRM & Cloud Solutions', 'Implement CRM workflows, cloud administration, data migration, support desks, and integrations.'],
  [Megaphone, 'Digital Marketing Services', 'Outsource SEO, paid ads, content, social media, landing pages, and reporting.'],
  [Phone, 'Customer Support Outsourcing', 'Operate customer support with scripts, SLAs, QA scorecards, escalation, and reporting.'],
  [Languages, 'Multilingual AI Projects', 'Support language data, localization, transcription, tagging, and global workforce delivery.'],
]

const outsourceFeatures = [
  [BriefcaseBusiness, 'Dedicated Project Managers'],
  [Network, 'Global Vendor Network'],
  [Rocket, 'Fast Team Scaling'],
  [ShieldCheck, 'Enterprise Security Standards'],
  [BarChart3, 'Daily Reporting System'],
  [CheckCircle2, 'Quality Assurance Process'],
  [Languages, 'Multilingual Workforce'],
  [Layers3, 'Flexible Engagement Models'],
  [Target, 'Cost-Effective Operations'],
  [Users, 'Long-Term Partnership Support'],
]

const outsourceIndustries = [
  [Bot, 'Artificial Intelligence'],
  [Landmark, 'BFSI'],
  [HeartPulse, 'Healthcare'],
  [ShoppingCart, 'Retail & E-commerce'],
  [Phone, 'Telecom'],
  [Building2, 'Education'],
  [Truck, 'Logistics'],
  [Building2, 'Real Estate'],
  [Code2, 'IT & Software'],
  [Video, 'Media & Entertainment'],
]

const outsourceProcess = [
  'Requirement Discussion',
  'Team & Resource Planning',
  'Project Onboarding',
  'Execution & Daily Reporting',
  'Quality Check & Delivery',
  'Long-Term Support',
]

const outsourceTestimonials = [
  ['Global AI Platform', 'Cromgen helped us scale multilingual data collection with clear QA reporting and reliable delivery cycles.'],
  ['Recruitment Agency', 'Their RPO support improved screening speed and gave our team a dependable hiring operations partner.'],
  ['Technology Startup', 'We outsourced CRM cleanup, support workflows, and lead operations while maintaining strong visibility every day.'],
]

const outsourceFaqs = [
  ['How quickly can you start a project?', 'Most projects can begin with discovery and resource planning within a few business days after scope confirmation.'],
  ['Do you provide dedicated teams?', 'Yes. Cromgen can provide dedicated project managers, recruiters, agents, developers, data collectors, and QA teams.'],
  ['Can you support multilingual projects?', 'Yes. We support multilingual recording, annotation, customer support, recruitment, and data collection programs.'],
  ['What industries do you work with?', 'We support AI, BFSI, healthcare, retail, telecom, education, logistics, real estate, IT, and media clients.'],
  ['How is project reporting managed?', 'Reporting can include daily progress, QA summaries, attendance, blockers, delivery metrics, and project dashboards.'],
  ['Do you support long-term outsourcing?', 'Yes. Teams can be structured for short pilots, project-based execution, monthly retainers, or long-term managed operations.'],
]

const outsourceFooterGroups = [
  ['Services', ['AI Data Collection', 'BPO Operations', 'Software Teams', 'Recruitment Support']],
  ['Industries', ['Artificial Intelligence', 'Healthcare', 'Telecom', 'Retail']],
  ['Solutions', ['Managed Teams', 'Data Collection', 'RPO', 'Customer Support']],
  ['Company', ['About Cromgen', 'Leadership', 'Career', 'News Room']],
  ['Resources', ['Help Center', 'FAQ Management', 'Contact Requests', 'Sitemap']],
  ['Legal', ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Disclaimer']],
]

const projectTypeOptions = ['AI Data Collection', 'Recruitment Outsourcing', 'BPO Operations', 'Software Development', 'Data Annotation', 'Multilingual Projects']
const teamSizeOptions = ['1-5 specialists', '6-20 specialists', '21-50 specialists', '50+ specialists']
const budgetOptions = ['$1k - $5k', '$5k - $25k', '$25k - $100k', '$100k+']

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
  const [applyingProject, setApplyingProject] = useState('')
  const [applyStatus, setApplyStatus] = useState({ type: '', message: '' })
  const [activeFaq, setActiveFaq] = useState(0)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [leadStatus, setLeadStatus] = useState({ type: '', message: '' })
  const [leadForm, setLeadForm] = useState({
    companyName: '',
    fullName: '',
    email: '',
    phone: '',
    projectType: '',
    teamSize: '',
    budget: '',
    message: '',
  })
  const authRole = String(localStorage.getItem('cromgen_auth_role') || '').toLowerCase()
  const dashboardByRole = {
    admin: '/admin-dashboard',
    staff: '/staff-dashboard',
    user: '/user-dashboard',
    vendor: '/vendor-dashboard',
  }
  const dashboardHref = dashboardByRole[authRole] || '/user-dashboard'
  const applyHref = localStorage.getItem('cromgen_auth_token')
    ? dashboardHref
    : `/login?redirect=${encodeURIComponent(dashboardHref)}`

  const handleProjectApply = async (event, project) => {
    if (!localStorage.getItem('cromgen_auth_token')) return

    event.preventDefault()
    setApplyingProject(project.slug)
    setApplyStatus({ type: '', message: '' })

    try {
      const currentUser = JSON.parse(localStorage.getItem('cromgen_auth_user') || '{}')
      await apiRequest(PROJECT_ENDPOINTS.publicApply(project.slug), {
        method: 'POST',
        body: JSON.stringify({
          applicantName: currentUser.name || currentUser.company || '',
          applicantEmail: currentUser.email || '',
        }),
      })
      window.location.assign(dashboardHref)
    } catch (error) {
      setApplyStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Unable to apply for this project.',
      })
    } finally {
      setApplyingProject('')
    }
  }

  const updateLeadForm = (field, value) => {
    setLeadForm((current) => ({ ...current, [field]: value }))
  }

  const submitLeadForm = async (event) => {
    event.preventDefault()
    setLeadStatus({ type: '', message: '' })

    try {
      await apiRequest(LEAD_ENDPOINTS.publicCreate, {
        method: 'POST',
        body: JSON.stringify({
          name: leadForm.fullName,
          email: leadForm.email,
          service: leadForm.projectType || 'Outsource Project',
          query: [
            `Company: ${leadForm.companyName}`,
            `Phone: ${leadForm.phone}`,
            `Team Size: ${leadForm.teamSize}`,
            `Budget: ${leadForm.budget}`,
            `Message: ${leadForm.message}`,
          ].filter(Boolean).join('\n'),
        }),
      })
      setLeadStatus({ type: 'success', message: 'Requirement submitted successfully.' })
      setLeadForm({
        companyName: '',
        fullName: '',
        email: '',
        phone: '',
        projectType: '',
        teamSize: '',
        budget: '',
        message: '',
      })
    } catch (error) {
      setLeadStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Unable to submit requirement.',
      })
    }
  }

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

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveTestimonial((current) => (current + 1) % outsourceTestimonials.length)
    }, 4200)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <main className="bg-[#F8FAFC] pt-28 text-[#0F172A] sm:pt-32 lg:pt-24">
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,#E0F2FE,transparent_34%),linear-gradient(135deg,#ffffff_0%,#eef6ff_42%,#f5f3ff_100%)]">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[#2563EB] via-[#14B8A6] to-[#8B5CF6]" />
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:py-24">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#BFDBFE] bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#2563EB] shadow-sm">
              <Globe2 className="h-4 w-4" />
              Global Outsourcing Delivery
            </span>
            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight text-[#0F172A] sm:text-5xl lg:text-6xl">
              Outsource Your Projects With Trusted Enterprise Teams
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-[#475569]">
              Scale faster with dedicated outsourcing solutions for AI projects, recruitment, BPO operations, software
              development, and multilingual data collection.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#outsource-openings" className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#2563EB] px-6 text-sm font-black uppercase tracking-[0.12em] text-white shadow-xl shadow-blue-500/20 transition hover:-translate-y-0.5 hover:bg-[#1D4ED8]">
                Start a Project
                <ChevronRight className="h-4 w-4" />
              </a>
              <a href="#enterprise-contact" className="inline-flex h-12 items-center justify-center rounded-2xl border border-[#CBD5E1] bg-white px-6 text-sm font-black uppercase tracking-[0.12em] text-[#0F172A] shadow-sm transition hover:-translate-y-0.5 hover:border-[#14B8A6] hover:text-[#0F766E]">
                Talk to Our Team
              </a>
            </div>
          </motion.div>

          <motion.div className="relative min-h-[420px]" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.15 }}>
            <div className="absolute right-0 top-6 h-72 w-72 rounded-full bg-[#8B5CF6]/20 blur-3xl" />
            <div className="absolute bottom-2 left-0 h-64 w-64 rounded-full bg-[#14B8A6]/20 blur-3xl" />
            <div className="relative rounded-[2rem] border border-white/70 bg-white/75 p-5 shadow-2xl shadow-slate-200/80 backdrop-blur-xl">
              <div className="rounded-[1.4rem] bg-gradient-to-br from-[#0F172A] via-[#1E3A8A] to-[#0F766E] p-5 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">AI Operations Preview</p>
                    <h2 className="mt-2 text-2xl font-black">Enterprise Command Center</h2>
                  </div>
                  <Sparkles className="h-8 w-8 text-cyan-200" />
                </div>
                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {['Hiring', 'Data QA', 'BPO'].map((item, index) => (
                    <motion.div key={item} className="rounded-2xl border border-white/15 bg-white/10 p-4" animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity, delay: index * 0.25 }}>
                      <span className="text-xs font-bold text-cyan-100">{item}</span>
                      <strong className="mt-3 block text-2xl font-black">{[86, 94, 78][index]}%</strong>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_0.8fr]">
                <div className="rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm font-black text-[#0F172A]">Project Tracking</span>
                    <BarChart3 className="h-5 w-5 text-[#2563EB]" />
                  </div>
                  {[78, 62, 91].map((value, index) => (
                    <div key={value} className="mb-3">
                      <div className="h-2 rounded-full bg-[#E2E8F0]">
                        <div className="h-2 rounded-full bg-gradient-to-r from-[#2563EB] to-[#14B8A6]" style={{ width: `${value}%` }} />
                      </div>
                      <p className="mt-1 text-xs font-bold text-[#64748B]">Workflow {index + 1}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm">
                  <Users className="h-8 w-8 text-[#8B5CF6]" />
                  <strong className="mt-4 block text-3xl font-black">10k+</strong>
                  <span className="text-sm font-semibold text-[#64748B]">Global workforce network</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#2563EB]">Enterprise Outsourcing</p>
            <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">Enterprise Outsourcing Solutions Built For Modern Businesses</h2>
            <p className="mt-5 text-base font-medium leading-8 text-[#64748B]">
              Cromgen provides end-to-end outsourcing support through dedicated operational teams, a global vendor
              network, AI and technology expertise, scalable workforce management, process-driven execution, secure
              operations, and fast project onboarding for growing companies and enterprise clients.
            </p>
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2">
            {outsourceStats.map(([value, label], index) => (
              <motion.div key={label} className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-lg shadow-slate-200/60" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
                <strong className="text-3xl font-black text-[#0F172A]">{value}</strong>
                <p className="mt-2 text-sm font-bold text-[#64748B]">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <OutsourceSectionHeader eyebrow="Services We Outsource" title="Specialized teams for operations, hiring, AI data, and technology." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {outsourceServices.map(([Icon, title, copy], index) => (
              <motion.article key={title} className="group rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-100/80" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.03 }}>
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#E0F2FE] to-[#F5F3FF] text-[#2563EB]">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-black">{title}</h3>
                <p className="mt-3 text-sm font-medium leading-6 text-[#64748B]">{copy}</p>
                <button type="button" className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#2563EB]">
                  Learn More
                  <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </button>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6">
        <OutsourceSectionHeader eyebrow="Why Choose Us" title="Enterprise control with flexible outsourcing speed." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {outsourceFeatures.map(([Icon, title], index) => (
            <motion.div key={title} className="rounded-2xl border border-transparent bg-gradient-to-br from-[#2563EB]/20 via-[#14B8A6]/20 to-[#8B5CF6]/20 p-px" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.03 }}>
              <div className="h-full rounded-2xl bg-white/90 p-5 shadow-sm backdrop-blur transition hover:bg-white">
                <Icon className="h-6 w-6 text-[#14B8A6]" />
                <h3 className="mt-4 text-sm font-black leading-5">{title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-[#EEF6FF] py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <OutsourceSectionHeader eyebrow="Industries We Serve" title="Operational support for high-growth and regulated sectors." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {outsourceIndustries.map(([Icon, title]) => (
              <motion.article key={title} whileHover={{ scale: 1.03 }} className="rounded-2xl border border-white/80 bg-white/75 p-5 shadow-sm backdrop-blur">
                <Icon className="h-7 w-7 text-[#8B5CF6]" />
                <h3 className="mt-4 text-sm font-black">{title}</h3>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6">
        <OutsourceSectionHeader eyebrow="Process" title="How Our Outsourcing Process Works" />
        <div className="grid gap-4 lg:grid-cols-6">
          {outsourceProcess.map((step, index) => (
            <motion.div key={step} className="relative rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }}>
              <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[#2563EB] to-[#14B8A6] text-sm font-black text-white">{index + 1}</span>
              <h3 className="mt-5 text-sm font-black leading-5">{step}</h3>
              {index < outsourceProcess.length - 1 ? <ChevronRight className="absolute -right-4 top-8 hidden h-6 w-6 text-[#CBD5E1] lg:block" /> : null}
            </motion.div>
          ))}
        </div>
      </section>

      <section id="outsource-openings" className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <OutsourceSectionHeader eyebrow="Live Outsource Projects" title="Projects loaded from backend and MongoDB." copy="These projects come from the backend Project Management collection. Apply to create a Task Management record and continue through your dashboard." />

          {isLoadingProjects ? (
            <p className="rounded-2xl border border-[#BFDBFE] bg-[#E0F2FE] p-4 text-sm font-bold text-[#1D4ED8]">Loading projects...</p>
          ) : postedProjects.length ? (
            <>
              {applyStatus.message ? (
                <p className={`mb-4 rounded-2xl border p-4 text-sm font-bold ${applyStatus.type === 'success' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-rose-200 bg-rose-50 text-rose-700'}`}>
                  {applyStatus.message}
                </p>
              ) : null}
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {postedProjects.map((project) => (
                  <article key={project.slug} className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-lg shadow-slate-200/60 transition hover:-translate-y-1 hover:shadow-xl">
                    <div className="relative h-44">
                      <img src={project.image} alt={`${project.title} outsourcing`} className="h-full w-full object-cover" />
                      <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-black text-[#2563EB] backdrop-blur">{project.department}</span>
                    </div>
                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 text-xs font-bold text-[#64748B]">
                        <span className="rounded-full bg-[#F1F5F9] px-3 py-1">{project.location}</span>
                        <span className="rounded-full bg-[#F1F5F9] px-3 py-1">{project.type}</span>
                        <span className="rounded-full bg-[#F1F5F9] px-3 py-1">{project.experience}</span>
                      </div>
                      <h3 className="mt-4 text-xl font-black">{project.title}</h3>
                      <p className="mt-3 text-sm font-medium leading-6 text-[#64748B]">{renderFormattedText(project.summary)}</p>
                      <a href={applyHref} onClick={(event) => handleProjectApply(event, project)} className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-2xl bg-[#0F172A] text-sm font-black uppercase tracking-[0.12em] text-white transition hover:bg-[#2563EB]">
                        {applyingProject === project.slug ? 'Applying...' : 'Apply'}
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </>
          ) : (
            <p className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm font-bold text-rose-700">No outsource projects are available right now.</p>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6">
        <OutsourceSectionHeader eyebrow="Client Trust" title="Trusted By Global Clients" />
        <div className="overflow-hidden rounded-[2rem] border border-[#E2E8F0] bg-white p-6 shadow-xl shadow-slate-200/70">
          <motion.div key={activeTestimonial} initial={{ opacity: 0, x: 26 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45 }} className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
            <div className="rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#8B5CF6] p-8 text-white">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-blue-100">Client Review</span>
              <h3 className="mt-4 text-2xl font-black">{outsourceTestimonials[activeTestimonial][0]}</h3>
            </div>
            <div>
              <div className="flex gap-1 text-amber-400">
                {[1, 2, 3, 4, 5].map((star) => <Star key={star} className="h-5 w-5 fill-current" />)}
              </div>
              <p className="mt-5 text-2xl font-bold leading-10 text-[#0F172A]">"{outsourceTestimonials[activeTestimonial][1]}"</p>
              <div className="mt-6 flex gap-2">
                {outsourceTestimonials.map((item, index) => (
                  <button key={item[0]} type="button" aria-label={`Show testimonial ${index + 1}`} onClick={() => setActiveTestimonial(index)} className={`h-2 rounded-full transition ${activeTestimonial === index ? 'w-10 bg-[#2563EB]' : 'w-2 bg-[#CBD5E1]'}`} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#F1F5F9] py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
          <OutsourceSectionHeader eyebrow="FAQ" title="Common outsourcing questions." />
          <div className="grid gap-3">
            {outsourceFaqs.map(([question, answer], index) => {
              const open = activeFaq === index
              return (
                <div key={question} className={`rounded-2xl border bg-white p-5 shadow-sm transition ${open ? 'border-[#2563EB]' : 'border-[#E2E8F0]'}`}>
                  <button type="button" onClick={() => setActiveFaq(open ? -1 : index)} className="flex w-full items-center justify-between gap-4 text-left">
                    <span className="font-black">{question}</span>
                    {open ? <Minus className="h-5 w-5 text-[#2563EB]" /> : <Plus className="h-5 w-5 text-[#64748B]" />}
                  </button>
                  <motion.div initial={false} animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }} className="overflow-hidden">
                    <p className="pt-4 text-sm font-medium leading-6 text-[#64748B]">{answer}</p>
                  </motion.div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="enterprise-contact" className="mx-auto max-w-7xl px-5 py-16 sm:px-6">
        <div className="grid gap-8 rounded-[2rem] border border-[#E2E8F0] bg-white p-5 shadow-2xl shadow-slate-200/80 sm:p-8 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="rounded-[1.5rem] bg-gradient-to-br from-[#0F172A] via-[#1E3A8A] to-[#0F766E] p-8 text-white">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-100">Contact</p>
            <h2 className="mt-4 text-3xl font-black">Submit your outsourcing requirement.</h2>
            <p className="mt-4 text-sm font-medium leading-7 text-blue-100">Share your project scope, team size, and budget. Cromgen can respond with delivery planning and next steps.</p>
            <div className="mt-8 grid gap-3 text-sm font-bold">
              <a href="mailto:info@cromgentechnology.com" className="rounded-2xl bg-white/10 p-4">info@cromgentechnology.com</a>
              <a href="https://wa.me/" target="_blank" rel="noreferrer" className="rounded-2xl bg-white/10 p-4">WhatsApp Support</a>
              <span className="rounded-2xl bg-white/10 p-4">24/7 operational support</span>
            </div>
          </div>

          <form onSubmit={submitLeadForm} className="grid gap-4 sm:grid-cols-2">
            {leadStatus.message ? (
              <p className={`sm:col-span-2 rounded-2xl border p-4 text-sm font-bold ${leadStatus.type === 'success' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-rose-200 bg-rose-50 text-rose-700'}`}>
                {leadStatus.message}
              </p>
            ) : null}
            {[
              ['companyName', 'Company Name'],
              ['fullName', 'Full Name'],
              ['email', 'Email'],
              ['phone', 'Phone Number'],
            ].map(([name, label]) => (
              <label key={name} className="grid gap-2">
                <span className="text-sm font-black text-[#0F172A]">{label}</span>
                <input className="h-12 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 text-sm font-semibold outline-none focus:border-[#2563EB]" type={name === 'email' ? 'email' : 'text'} value={leadForm[name]} onChange={(event) => updateLeadForm(name, event.target.value)} required />
              </label>
            ))}
            <OutsourceSelect label="Project Type" value={leadForm.projectType} options={projectTypeOptions} onChange={(value) => updateLeadForm('projectType', value)} />
            <OutsourceSelect label="Team Size Requirement" value={leadForm.teamSize} options={teamSizeOptions} onChange={(value) => updateLeadForm('teamSize', value)} />
            <OutsourceSelect label="Budget Range" value={leadForm.budget} options={budgetOptions} onChange={(value) => updateLeadForm('budget', value)} />
            <label className="grid gap-2 sm:col-span-2">
              <span className="text-sm font-black text-[#0F172A]">Message</span>
              <textarea className="min-h-32 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm font-semibold outline-none focus:border-[#2563EB]" value={leadForm.message} onChange={(event) => updateLeadForm('message', event.target.value)} required />
            </label>
            <button type="submit" className="h-12 rounded-2xl bg-[#2563EB] text-sm font-black uppercase tracking-[0.12em] text-white transition hover:bg-[#1D4ED8]">Submit Requirement</button>
            <a href="/contact-requests?service=Outsource%20Project" className="inline-flex h-12 items-center justify-center rounded-2xl border border-[#CBD5E1] text-sm font-black uppercase tracking-[0.12em] text-[#0F172A] transition hover:border-[#14B8A6] hover:text-[#0F766E]">Schedule a Call</a>
          </form>
        </div>
      </section>

      <section className="border-t border-[#E2E8F0] bg-white py-14">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="h-1 rounded-full bg-gradient-to-r from-[#2563EB] via-[#14B8A6] to-[#8B5CF6]" />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
            {outsourceFooterGroups.map(([title, links]) => (
              <div key={title}>
                <h3 className="text-sm font-black uppercase tracking-[0.14em] text-[#0F172A]">{title}</h3>
                <div className="mt-4 grid gap-2">
                  {links.map((link) => (
                    <a key={link} href="/contact-requests" className="text-sm font-semibold text-[#64748B] transition hover:text-[#2563EB]">{link}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 grid gap-4 rounded-2xl bg-[#F8FAFC] p-5 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <h3 className="font-black">Enterprise outsourcing insights</h3>
              <p className="text-sm font-medium text-[#64748B]">Get project updates, hiring operations notes, and AI data collection guidance.</p>
            </div>
            <div className="flex gap-2">
              <input aria-label="Newsletter email" placeholder="Business email" className="h-11 min-w-0 rounded-2xl border border-[#E2E8F0] bg-white px-4 text-sm font-semibold outline-none" />
              <button type="button" className="h-11 rounded-2xl bg-[#0F172A] px-5 text-sm font-black text-white">Join</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function OutsourceSectionHeader({ eyebrow, title, copy }) {
  return (
    <div className="mb-10 max-w-3xl">
      <p className="text-sm font-black uppercase tracking-[0.18em] text-[#2563EB]">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-black leading-tight text-[#0F172A] sm:text-4xl">{title}</h2>
      {copy ? <p className="mt-4 text-base font-medium leading-7 text-[#64748B]">{copy}</p> : null}
    </div>
  )
}

function OutsourceSelect({ label, value, options, onChange }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-black text-[#0F172A]">{label}</span>
      <span className="relative">
        <select className="h-12 w-full appearance-none rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 pr-10 text-sm font-semibold outline-none focus:border-[#2563EB]" value={value} onChange={(event) => onChange(event.target.value)} required>
          <option value="">Select</option>
          {options.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748B]" />
      </span>
    </label>
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
