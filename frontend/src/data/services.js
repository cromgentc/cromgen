export function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export const services = [
  {
    slug: 'artificial-intelligence',
    title: 'Artificial Intelligence',
    navTitle: 'Artificial Intelligence',
    shortTitle: 'AI',
    kicker: 'AI tools, automation, and intelligent decision systems for faster business operations.',
      accent: '#082a66',
    warm: '#ff4b2d',
    icon: 'brain',
    image: 'ai',
    metrics: [
      ['12+', 'AI services'],
      ['60%', 'Workflow time saved'],
      ['24/7', 'Smart assistance'],
    ],
    services: [
      'AI Chatbot Development',
      'Machine Learning Solutions',
      'Natural Language Processing',
      'Computer Vision',
      'Predictive Analytics',
      'Business Process Automation',
      'Recommendation Systems',
      'Generative AI Content Tools',
      'Voice AI Assistant',
      'AI CRM Integration',
      'Data Labeling & Model Training',
      'AI Strategy Consulting',
    ],
    process: ['Use-case discovery', 'Model and data planning', 'Prototype build', 'Integration and monitoring'],
  },
  {
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    navTitle: 'Digital Marketing',
    shortTitle: 'Marketing',
    kicker: 'SEO, ads, social content, and analytics for consistent brand visibility and lead flow.',
      accent: '#3e3aa3',
    warm: '#ff4b2d',
    icon: 'chart',
    image: 'marketing',
    metrics: [
      ['15+', 'Marketing services'],
      ['3x', 'Campaign focus'],
      ['360', 'Brand coverage'],
    ],
    services: [
      'SEO Services',
      'Social Media Marketing',
      'Google Ads & PPC',
      'Meta Ads Campaigns',
      'Content Marketing',
      'Email Marketing',
      'WhatsApp Marketing',
      'Lead Generation',
      'Branding & Creative Design',
      'Online Reputation Management',
      'Local SEO & Google Business Profile',
      'Conversion Rate Optimization',
      'Influencer Marketing',
      'Video Marketing',
      'Marketing Analytics & Reporting',
    ],
    process: ['Audience research', 'Campaign planning', 'Creative execution', 'Optimization reports'],
  },
  {
    slug: 'call-center-service',
    title: 'Call Center Service',
    navTitle: 'Call Center',
    shortTitle: 'Call Center',
    kicker: 'Inbound, outbound, helpdesk, and back office support for reliable customer experience.',
    accent: '#082a66',
    warm: '#63bc45',
    icon: 'headset',
    image: 'callCenter',
    metrics: [
      ['15+', 'Support services'],
      ['24/7', 'Coverage option'],
      ['QA', 'Call monitoring'],
    ],
    services: [
      'Inbound Customer Support',
      'Outbound Calling',
      'Technical Support Helpdesk',
      'Telemarketing',
      'Lead Qualification',
      'Appointment Setting',
      'Live Chat Support',
      'Email Support',
      'Order Processing',
      'Back Office Support',
      'Customer Feedback Surveys',
      'Payment Reminder Calls',
      'IVR Setup & Call Routing',
      'Multilingual Support',
      'Quality Monitoring & Training',
    ],
    process: ['Script and SLA setup', 'Agent training', 'Live operations', 'Quality review'],
  },
  {
    slug: 'it-services',
    title: 'IT Services',
    navTitle: 'IT',
    shortTitle: 'IT',
    kicker: 'Infrastructure, cloud, cybersecurity, and technical support for stable daily operations.',
      accent: '#63bc45',
    warm: '#ff4b2d',
    icon: 'cloud',
    image: 'it',
    metrics: [
      ['16+', 'IT service areas'],
      ['99%', 'Uptime focus'],
      ['24/7', 'Monitoring option'],
    ],
    services: [
      'Managed IT Support',
      'Cloud Infrastructure Setup',
      'Cybersecurity Services',
      'Network Setup & Management',
      'Server Administration',
      'Data Backup & Recovery',
      'IT Helpdesk Support',
      'Endpoint Device Management',
      'Microsoft 365 Administration',
      'Google Workspace Setup',
      'Firewall & VPN Setup',
      'IT Asset Management',
      'Remote Desktop Support',
      'System Monitoring',
      'Database Administration',
      'IT Consulting & Audit',
    ],
    process: ['Infrastructure audit', 'Security planning', 'System implementation', 'Monitoring and support'],
  },
  {
    slug: 'software-development-services',
    title: 'Software Development Services',
    navTitle: 'Software Development',
    shortTitle: 'Software',
    kicker: 'Custom websites, apps, SaaS platforms, APIs, and business software built for growth.',
      accent: '#3e3aa3',
    warm: '#63bc45',
    icon: 'code',
    image: 'software',
    metrics: [
      ['18+', 'Development services'],
      ['Agile', 'Delivery process'],
      ['Full', 'Product lifecycle'],
    ],
    services: [
      'Custom Website Development',
      'Web Application Development',
      'Mobile App Development',
      'SaaS Platform Development',
      'E-commerce Development',
      'CRM Development',
      'ERP Software Development',
      'API Development & Integration',
      'Dashboard & Admin Panel Development',
      'UI/UX Design',
      'Frontend Development',
      'Backend Development',
      'Database Design',
      'Software Testing & QA',
      'DevOps & Deployment',
      'Maintenance & Support',
      'MVP Development',
      'Legacy Software Modernization',
    ],
    process: ['Product discovery', 'UI and architecture', 'Agile development', 'QA and deployment'],
  },
  {
    slug: 'hr-consultant',
    title: 'HR Consultant',
    navTitle: 'HR Consultant',
    shortTitle: 'HR',
    kicker: 'Recruitment, HR policies, payroll coordination, and workforce management support.',
      accent: '#ff4b2d',
    warm: '#3e3aa3',
    icon: 'users',
    image: 'hr',
    metrics: [
      ['14+', 'HR service areas'],
      ['Fast', 'Hiring support'],
      ['Clear', 'Policy setup'],
    ],
    services: [
      'Recruitment Services',
      'Talent Acquisition',
      'HR Policy Development',
      'Employee Onboarding',
      'Payroll Coordination',
      'Performance Management',
      'Training & Development',
      'Employee Engagement',
      'HR Documentation',
      'Compliance Support',
      'Job Description Creation',
      'Interview Coordination',
      'Background Verification',
      'Workforce Planning',
    ],
    process: ['HR audit', 'Role and policy planning', 'Recruitment execution', 'Performance and compliance review'],
  },
  {
    slug: 'telecommunications',
    title: 'Telecommunications',
    navTitle: 'Telecommunications',
    shortTitle: 'Telecom',
    kicker: 'VoIP, PBX, call routing, SIP trunks, and communication infrastructure for modern teams.',
      accent: '#082a66',
    warm: '#ff4b2d',
    icon: 'telecom',
    image: 'telecom',
    metrics: [
      ['12+', 'Telecom services'],
      ['VoIP', 'Ready systems'],
      ['Secure', 'Call routing'],
    ],
    services: [
      'VoIP Setup',
      'PBX System Setup',
      'SIP Trunking',
      'Call Routing Solutions',
      'IVR Configuration',
      'Business Phone Systems',
      'Telecom Billing Support',
      'Internet Connectivity Support',
      'Call Recording Setup',
      'Cloud Telephony',
      'Number Porting Support',
      'Contact Center Telephony',
    ],
    process: ['Communication audit', 'System design', 'Telecom setup', 'Testing and support'],
  },
]

export const companyStats = [
  ['95+', 'Service options'],
  ['7', 'Dedicated departments'],
  ['24/7', 'Support capable'],
]

export const onboardingOptions = [
  {
    slug: 'vendor',
    title: 'Vendor Onboarding',
    subtitle: 'Register as a technology, marketing, or operations vendor.',
    points: ['Company profile review', 'Service category mapping', 'Documentation checklist', 'Partnership activation'],
  },
  {
    slug: 'freelancer',
    title: 'Freelancer Onboarding',
    subtitle: 'Join as an independent specialist for project-based work.',
    points: ['Skill profile review', 'Portfolio submission', 'Availability setup', 'Project matching'],
  },
]

export function getServiceLink(categorySlug, serviceName) {
  return `/${categorySlug}/${slugify(serviceName)}`
}

export function findServiceDetail(route) {
  const [categorySlug, itemSlug] = route.split('/')
  if (!categorySlug || !itemSlug) return null

  const category = services.find((service) => service.slug === categorySlug)
  if (!category) return null

  const serviceName = category.services.find((item) => slugify(item) === itemSlug)
  if (!serviceName) return null

  return {
    category,
    serviceName,
    slug: itemSlug,
    relatedServices: category.services.filter((item) => item !== serviceName).slice(0, 6),
  }
}

export function findOnboardingPage(route) {
  const [section, type] = route.split('/')
  if (section !== 'onboarding' || !type) return null
  return onboardingOptions.find((option) => option.slug === type) || null
}
