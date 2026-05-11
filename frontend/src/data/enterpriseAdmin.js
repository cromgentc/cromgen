import {
  Activity,
  BadgeDollarSign,
  Bell,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  Building2,
  CalendarClock,
  ChartArea,
  Cloud,
  Code2,
  Contact,
  Database,
  FileBarChart,
  FileCog,
  FileText,
  Gauge,
  Headphones,
  LayoutDashboard,
  LockKeyhole,
  LogOut,
  MessagesSquare,
  RadioTower,
  Settings,
  ShieldCheck,
  Sparkles,
  Users,
  Wallet,
  Workflow,
} from 'lucide-react'

export const adminNavigation = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    items: [
      ['overview', 'Overview'],
      ['analytics', 'Analytics'],
      ['ai-insights', 'AI Insights'],
      ['live-statistics', 'Live Statistics'],
    ],
  },
  {
    label: 'AI Management',
    icon: BrainCircuit,
    items: [
      ['ai-services', 'AI Services'],
      ['ai-models', 'AI Models'],
      ['ai-agents', 'AI Agents'],
      ['ai-tools', 'AI Tools'],
      ['prompt-management', 'Prompt Management'],
      ['workflow-automation', 'Workflow Automation'],
      ['ai-training-jobs', 'AI Training Jobs'],
    ],
  },
  {
    label: 'Data Collection',
    icon: Database,
    items: [
      ['audio-recording-projects', 'Audio Recording Projects'],
      ['video-collection-projects', 'Video Collection Projects'],
      ['image-collection', 'Image Collection'],
      ['script-management', 'Script Management'],
      ['metadata-management', 'Metadata Management'],
      ['quality-check', 'Quality Check (QC)'],
      ['live-monitoring', 'Live Monitoring'],
    ],
  },
  {
    label: 'User & Team Management',
    icon: Users,
    items: [
      ['user-management', 'User Management'],
      ['candidate-management', 'Candidate Management'],
      ['team-management', 'Team Management'],
      ['role-permissions', 'Role & Permissions'],
      ['attendance', 'Attendance'],
      ['team-performance', 'Team Performance'],
    ],
  },
  {
    label: 'Vendor & Agency',
    icon: Building2,
    items: [
      ['vendor-management', 'Vendor Management'],
      ['agency-management', 'Agency Management'],
      ['partner-network', 'Partner Network'],
      ['vendor-performance', 'Vendor Performance'],
      ['vendor-payouts', 'Vendor Payouts'],
    ],
  },
  {
    label: 'Client Management',
    icon: BriefcaseBusiness,
    items: [
      ['clients', 'Clients'],
      ['client-projects', 'Client Projects'],
      ['client-billing', 'Client Billing'],
      ['client-reports', 'Client Reports'],
      ['support-requests', 'Support Requests'],
    ],
  },
  {
    label: 'Projects & Tasks',
    icon: Workflow,
    items: [
      ['project-management', 'Project Management'],
      ['task-management', 'Task Management'],
      ['assign-tasks', 'Assign Tasks'],
      ['deadlines', 'Deadlines'],
      ['project-analytics', 'Project Analytics'],
    ],
  },
  {
    label: 'Finance',
    icon: Wallet,
    items: [
      ['payments', 'Payments'],
      ['billing-cycle', 'Billing Cycle'],
      ['invoice-management', 'Invoice Management'],
      ['revenue-analytics', 'Revenue Analytics'],
      ['wallet', 'Wallet'],
      ['withdraw-requests', 'Withdraw Requests'],
    ],
  },
  {
    label: 'CRM & Sales',
    icon: Contact,
    items: [
      ['leads-management', 'Leads Management'],
      ['sales-pipeline', 'Sales Pipeline'],
      ['follow-ups', 'Follow-ups'],
      ['email-campaigns', 'Email Campaigns'],
      ['whatsapp-campaigns', 'WhatsApp Campaigns'],
    ],
  },
  {
    label: 'Reports & Analytics',
    icon: FileBarChart,
    items: [
      ['performance-reports', 'Performance Reports'],
      ['user-reports', 'User Reports'],
      ['vendor-reports', 'Vendor Reports'],
      ['revenue-reports', 'Revenue Reports'],
      ['ai-analytics', 'AI Analytics'],
    ],
  },
  {
    label: 'Recruitment',
    icon: CalendarClock,
    items: [
      ['job-postings', 'Job Postings'],
      ['applications', 'Applications'],
      ['interview-management', 'Interview Management'],
      ['hiring-pipeline', 'Hiring Pipeline'],
    ],
  },
  {
    label: 'Support Center',
    icon: Headphones,
    items: [
      ['support-tickets', 'Support Tickets'],
      ['help-center', 'Help Center'],
      ['faq-management', 'FAQ Management'],
      ['contact-requests', 'Contact Requests'],
    ],
  },
  {
    label: 'File & Cloud',
    icon: Cloud,
    items: [
      ['file-manager', 'File Manager'],
      ['cloud-storage', 'Cloud Storage'],
      ['upload-center', 'Upload Center'],
      ['media-library', 'Media Library'],
    ],
  },
  {
    label: 'API & Integrations',
    icon: Code2,
    items: [
      ['api-management', 'API Management'],
      ['third-party-integrations', 'Third-party Integrations'],
      ['webhooks', 'Webhooks'],
      ['developer-settings', 'Developer Settings'],
    ],
  },
  {
    label: 'Website Management',
    icon: FileCog,
    items: [
      ['website-settings', 'Website Settings'],
      ['seo-settings', 'SEO Settings'],
      ['theme-customization', 'Theme Customization'],
      ['legal-pages', 'Legal Pages'],
      ['blog-management', 'Blog Management'],
    ],
  },
  {
    label: 'Security',
    icon: ShieldCheck,
    items: [
      ['security-settings', 'Security Settings'],
      ['login-history', 'Login History'],
      ['activity-logs', 'Activity Logs'],
      ['admin-access-control', 'Admin Access Control'],
      ['two-factor-authentication', 'Two-Factor Authentication'],
    ],
  },
  {
    label: 'Settings',
    icon: Settings,
    items: [
      ['system-settings', 'System Settings'],
      ['notification-settings', 'Notification Settings'],
      ['email-settings', 'Email Settings'],
      ['profile-settings', 'Profile Settings'],
    ],
  },
  {
    label: 'Logout',
    icon: LogOut,
    items: [['logout', 'Logout']],
  },
]

export const statCards = [
  { label: 'Total Users', value: '128,420', change: '+18.6%', icon: Users, tone: 'from-cyan-400 to-blue-500' },
  { label: 'Active Projects', value: '1,284', change: '+11.2%', icon: BriefcaseBusiness, tone: 'from-violet-400 to-fuchsia-500' },
  { label: 'Revenue', value: '$8.72M', change: '+24.9%', icon: BadgeDollarSign, tone: 'from-emerald-400 to-teal-500' },
  { label: 'Vendors', value: '946', change: '+7.4%', icon: Building2, tone: 'from-amber-300 to-orange-500' },
  { label: 'AI Tasks', value: '42.8K', change: '+31.5%', icon: Bot, tone: 'from-sky-300 to-indigo-500' },
  { label: 'Pending QC', value: '312', change: '-8.1%', icon: ShieldCheck, tone: 'from-rose-300 to-red-500' },
]

export const revenueData = [
  { month: 'Jan', revenue: 720, users: 420, projects: 280, ai: 540 },
  { month: 'Feb', revenue: 860, users: 510, projects: 310, ai: 620 },
  { month: 'Mar', revenue: 930, users: 610, projects: 420, ai: 740 },
  { month: 'Apr', revenue: 1140, users: 760, projects: 520, ai: 810 },
  { month: 'May', revenue: 1280, users: 870, projects: 610, ai: 920 },
  { month: 'Jun', revenue: 1510, users: 990, projects: 760, ai: 1120 },
  { month: 'Jul', revenue: 1690, users: 1180, projects: 820, ai: 1290 },
]

export const vendorData = [
  { name: 'North AI Lab', score: 96, payout: '$42.8K', status: 'Active', region: 'US-East' },
  { name: 'Signal Voice Ops', score: 91, payout: '$28.1K', status: 'Active', region: 'EU-West' },
  { name: 'Cortex Media', score: 87, payout: '$22.4K', status: 'Review', region: 'India' },
  { name: 'Pixel Annotate', score: 84, payout: '$18.9K', status: 'Pending', region: 'APAC' },
]

export const enterpriseRows = [
  { id: 'CG-AI-2048', name: 'Voice Corpus Collection', owner: 'AI Data Ops', status: 'Live', priority: 'High', progress: 88, budget: '$92,400' },
  { id: 'CG-QC-1932', name: 'Video Gesture QC', owner: 'Quality Team', status: 'QC', priority: 'Medium', progress: 64, budget: '$38,900' },
  { id: 'CG-CRM-1844', name: 'Enterprise CRM Migration', owner: 'Client Success', status: 'Planning', priority: 'High', progress: 42, budget: '$118,000' },
  { id: 'CG-IMG-1720', name: 'Retail Image Annotation', owner: 'Vendor Network', status: 'Live', priority: 'Low', progress: 76, budget: '$54,700' },
  { id: 'CG-AUT-1699', name: 'Prompt Workflow Automation', owner: 'AI Agents', status: 'Blocked', priority: 'Critical', progress: 29, budget: '$71,300' },
  { id: 'CG-SEC-1640', name: 'Admin Security Review', owner: 'Security Desk', status: 'Done', priority: 'Medium', progress: 100, budget: '$16,800' },
]

export const activities = [
  { icon: Sparkles, title: 'AI insight generated', copy: 'Revenue forecast improved by 12.4% with vendor clustering.', time: '2 min ago' },
  { icon: RadioTower, title: 'Live monitoring alert', copy: 'Audio project CG-AI-2048 crossed 80% completion.', time: '11 min ago' },
  { icon: LockKeyhole, title: 'Security event reviewed', copy: 'New admin session verified with risk score 0.08.', time: '24 min ago' },
  { icon: FileText, title: 'Contract ready', copy: 'Client project agreement moved to signature queue.', time: '49 min ago' },
]

export const notifications = [
  { title: 'QC approval waiting', meta: '17 batches need review', tone: 'bg-amber-400' },
  { title: 'Payout cycle ready', meta: 'Vendor payouts close today', tone: 'bg-emerald-400' },
  { title: 'AI training completed', meta: 'Model CTX-9B is ready', tone: 'bg-cyan-400' },
]

export const quickMetrics = [
  { label: 'Model uptime', value: '99.98%', icon: Activity },
  { label: 'Open tickets', value: '42', icon: Bell },
  { label: 'Messages', value: '1,204', icon: MessagesSquare },
  { label: 'Automation runs', value: '18.7K', icon: Gauge },
]

export const pageCatalog = {
  'ai-services': { title: 'AI Services', tag: 'AI Management', icon: BrainCircuit },
  'user-management': { title: 'User Management', tag: 'Identity Control', icon: Users },
  'vendor-management': { title: 'Vendor Management', tag: 'Partner Network', icon: Building2 },
  'project-management': { title: 'Project Management', tag: 'Delivery Command', icon: BriefcaseBusiness },
  payments: { title: 'Finance', tag: 'Revenue Operations', icon: Wallet },
  'leads-management': { title: 'CRM & Sales', tag: 'Growth Pipeline', icon: Contact },
  'job-postings': { title: 'Recruitment', tag: 'Hiring Operations', icon: CalendarClock },
  'performance-reports': { title: 'Reports', tag: 'Executive Analytics', icon: ChartArea },
  'system-settings': { title: 'Settings', tag: 'Platform Control', icon: Settings },
}
