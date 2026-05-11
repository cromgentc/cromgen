import { motion } from 'framer-motion'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  BadgeDollarSign,
  Bot,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ChevronRight,
  Layers3,
  Plus,
  ShieldCheck,
  Sparkles,
  Users,
  WandSparkles,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Navbar } from '../components/enterprise-admin/Navbar.jsx'
import { Sidebar } from '../components/enterprise-admin/Sidebar.jsx'
import { DashboardCard } from '../components/enterprise-admin/DashboardCard.jsx'
import { ChartCard } from '../components/enterprise-admin/ChartCard.jsx'
import { EnterpriseTable } from '../components/enterprise-admin/Table.jsx'
import { Modal } from '../components/enterprise-admin/Modal.jsx'
import { Loader } from '../components/enterprise-admin/Loader.jsx'
import { NotificationPanel } from '../components/enterprise-admin/NotificationPanel.jsx'
import { AdminThemeProvider, useAdminTheme } from '../context/AdminThemeContext.jsx'
import { pageCatalog } from '../data/enterpriseAdmin.js'
import {
  APPLICATION_ENDPOINTS,
  AUTH_ENDPOINTS,
  CONTRACT_ENDPOINTS,
  JOB_ENDPOINTS,
  LEAD_ENDPOINTS,
  VENDOR_ENDPOINTS,
  apiRequest,
} from '../api/apiEndpoint.js'

const emptyData = {
  users: [],
  vendors: [],
  contracts: [],
  leads: [],
  applications: [],
  jobs: [],
}

const formDefaults = {
  'user-management': { name: '', email: '', password: '', role: 'staff' },
  'vendor-management': { name: '', company: '', email: '', phone: '', serviceCategory: '', password: '', status: 'active' },
  'project-management': { title: '', recipientName: '', recipientEmail: '', senderName: 'Cromgen Technology', projectStatus: 'active', contractBody: '' },
  'leads-management': { name: '', email: '', service: '', query: '' },
  'job-postings': { title: '', department: '', location: '', type: 'Full Time', experience: '', summary: '' },
}

const supportedCreatePages = Object.keys(formDefaults)

function EnterpriseAdminApp() {
  const { isDark } = useAdminTheme()
  const [activePage, setActivePage] = useState('overview')
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')
  const [data, setData] = useState(emptyData)
  const [form, setForm] = useState(formDefaults['user-management'])

  const loadMongoData = async () => {
    const requests = await Promise.allSettled([
      apiRequest(AUTH_ENDPOINTS.settingsUsers),
      apiRequest(VENDOR_ENDPOINTS.settingsList),
      apiRequest(CONTRACT_ENDPOINTS.settingsList),
      apiRequest(LEAD_ENDPOINTS.settingsList),
      apiRequest(APPLICATION_ENDPOINTS.settingsList),
      apiRequest(JOB_ENDPOINTS.settingsList),
    ])

    const [users, vendors, contracts, leads, applications, jobs] = requests.map((result) => (
      result.status === 'fulfilled' ? result.value : {}
    ))

    setData({
      users: users.users || [],
      vendors: vendors.vendors || [],
      contracts: contracts.contracts || [],
      leads: leads.leads || [],
      applications: applications.applications || [],
      jobs: jobs.jobs || [],
    })

    const failedCount = requests.filter((result) => result.status === 'rejected').length
    setToast(failedCount ? `${failedCount} MongoDB collections could not load. Check backend login/API.` : 'MongoDB data synced.')
    setLoading(false)
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      loadMongoData()
    }, 0)

    return () => window.clearTimeout(timer)
  }, [])

  const pageMeta = useMemo(() => {
    if (['overview', 'analytics', 'ai-insights', 'live-statistics'].includes(activePage)) {
      return { title: 'Enterprise Command Center', tag: 'MongoDB Live Data', icon: Sparkles }
    }

    return pageCatalog[activePage] || {
      title: titleize(activePage),
      tag: 'MongoDB Module',
      icon: Layers3,
    }
  }, [activePage])

  const module = useMemo(() => getModuleConfig(activePage, data), [activePage, data])
  const PageIcon = pageMeta.icon

  const openCreateModal = () => {
    if (!supportedCreatePages.includes(activePage)) {
      setToast('Is module ke liye backend create API abhi configured nahi hai.')
      return
    }
    setForm(formDefaults[activePage])
    setModalOpen(true)
  }

  const createRecord = async (event) => {
    event.preventDefault()
    setSaving(true)

    try {
      if (activePage === 'user-management') {
        await apiRequest(AUTH_ENDPOINTS.settingsUsers, { method: 'POST', body: JSON.stringify(form) })
      } else if (activePage === 'vendor-management') {
        await apiRequest(VENDOR_ENDPOINTS.settingsList, { method: 'POST', body: JSON.stringify(form) })
      } else if (activePage === 'project-management') {
        await apiRequest(CONTRACT_ENDPOINTS.settingsList, { method: 'POST', body: JSON.stringify(form) })
      } else if (activePage === 'leads-management') {
        await apiRequest(LEAD_ENDPOINTS.publicCreate, { method: 'POST', body: JSON.stringify(form) })
      } else if (activePage === 'job-postings') {
        await apiRequest(JOB_ENDPOINTS.settingsList, { method: 'POST', body: JSON.stringify(form) })
      }

      setModalOpen(false)
      setToast('Record MongoDB mein save ho gaya.')
      await loadMongoData()
    } catch (error) {
      setToast(error instanceof Error ? error.message : 'Record save nahi ho paya.')
    } finally {
      setSaving(false)
    }
  }

  const deleteRecord = async (row) => {
    try {
      if (module.type === 'users') {
        await apiRequest(AUTH_ENDPOINTS.settingsUserDelete(row.id), { method: 'DELETE' })
      } else if (module.type === 'vendors') {
        await apiRequest(VENDOR_ENDPOINTS.settingsDelete(row.id), { method: 'DELETE' })
      } else if (module.type === 'contracts') {
        await apiRequest(CONTRACT_ENDPOINTS.settingsDelete(row.id), { method: 'DELETE' })
      } else if (module.type === 'leads') {
        await apiRequest(LEAD_ENDPOINTS.settingsDelete(row.id), { method: 'DELETE' })
      } else if (module.type === 'applications') {
        await apiRequest(APPLICATION_ENDPOINTS.settingsDelete(row.id), { method: 'DELETE' })
      } else if (module.type === 'jobs') {
        await apiRequest(JOB_ENDPOINTS.settingsDelete(row.id), { method: 'DELETE' })
      } else {
        setToast('Is module ke liye delete API configured nahi hai.')
        return
      }

      setToast('Record delete ho gaya.')
      await loadMongoData()
    } catch (error) {
      setToast(error instanceof Error ? error.message : 'Record delete nahi ho paya.')
    }
  }

  if (loading) return <Loader />

  return (
    <div className={isDark ? 'dark' : ''}>
      <main className={`h-screen overflow-hidden ${isDark ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-950'}`}>
        <div className="pointer-events-none fixed inset-0">
          <div className="absolute left-[-12%] top-[-20%] h-[520px] w-[520px] rounded-full bg-cyan-500/20 blur-3xl"></div>
          <div className="absolute right-[-10%] top-[10%] h-[540px] w-[540px] rounded-full bg-violet-500/20 blur-3xl"></div>
          <div className="absolute bottom-[-18%] left-[30%] h-[520px] w-[520px] rounded-full bg-blue-500/10 blur-3xl"></div>
        </div>

        <div className="relative flex h-screen overflow-hidden">
          <Sidebar
            activePage={activePage}
            collapsed={collapsed}
            mobileOpen={mobileOpen}
            onCloseMobile={() => setMobileOpen(false)}
            onNavigate={(page) => {
              if (page === 'logout') {
                localStorage.removeItem('cromgen_auth_token')
                localStorage.removeItem('cromgen_auth_role')
                window.location.assign('/admin-login')
                return
              }
              setActivePage(page)
              setMobileOpen(false)
            }}
          />

          <section className="h-screen min-w-0 flex-1 overflow-y-auto">
            <Navbar
              onToggleSidebar={() => setCollapsed((value) => !value)}
              onOpenMobile={() => setMobileOpen(true)}
              onToggleNotifications={() => setNotificationsOpen((open) => !open)}
            />

            <div className="px-4 py-6 lg:px-7">
              {toast ? (
                <motion.div
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-5 flex items-center justify-between rounded-2xl border border-cyan-300/20 bg-cyan-300/10 px-4 py-3 text-sm font-semibold text-cyan-100 backdrop-blur-xl"
                >
                  <span className="inline-flex items-center gap-2"><CheckCircle2 size={17} /> {toast}</span>
                  <button type="button" onClick={() => setToast('')} className="text-cyan-100/70 hover:text-white">Dismiss</button>
                </motion.div>
              ) : null}

              <motion.header
                key={activePage}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="mb-7 overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.08] p-6 shadow-2xl shadow-black/10 backdrop-blur-2xl"
              >
                <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
                  <div className="max-w-3xl">
                    <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-black uppercase tracking-[0.24em] text-cyan-100">
                      <PageIcon size={14} /> {pageMeta.tag}
                    </span>
                    <h1 className="mt-5 text-4xl font-black tracking-tight text-white md:text-6xl">{pageMeta.title}</h1>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                      Demo data removed. Dashboard ab backend REST APIs aur MongoDB collections se live data render karta hai.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button type="button" onClick={openCreateModal} className="inline-flex h-12 items-center gap-2 rounded-2xl bg-white px-4 text-sm font-black text-slate-950 shadow-xl shadow-cyan-500/10 transition hover:-translate-y-0.5">
                      <Plus size={18} /> Create Record
                    </button>
                    <button type="button" onClick={loadMongoData} className="inline-flex h-12 items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white/15">
                      <WandSparkles size={18} /> Refresh MongoDB
                    </button>
                  </div>
                </div>
              </motion.header>

              {['overview', 'analytics', 'ai-insights', 'live-statistics'].includes(activePage) ? (
                <DashboardOverview data={data} onDelete={deleteRecord} />
              ) : (
                <EnterpriseModule pageMeta={pageMeta} module={module} onDelete={deleteRecord} />
              )}
            </div>

            <footer className="px-7 pb-7 text-sm text-slate-500">
              Cromgen Technology Enterprise Admin - MongoDB live data - Secure admin workspace
            </footer>
          </section>
        </div>

        <NotificationPanel open={notificationsOpen} onClose={() => setNotificationsOpen(false)} />
        <RecordModal
          open={modalOpen}
          page={activePage}
          form={form}
          saving={saving}
          onChange={(field, value) => setForm((current) => ({ ...current, [field]: value }))}
          onSubmit={createRecord}
          onClose={() => setModalOpen(false)}
        />
      </main>
    </div>
  )
}

function DashboardOverview({ data, onDelete }) {
  const stats = createStats(data)
  const chartData = createChartData(data)
  const pieData = createProjectPie(data.contracts)
  const vendorChart = data.vendors.map((vendor) => ({
    name: vendor.company || vendor.name || 'Vendor',
    score: vendor.status === 'active' ? 100 : vendor.status === 'pending' ? 55 : 25,
  }))
  const projectModule = getModuleConfig('project-management', data)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-7">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        {stats.map((card) => (
          <DashboardCard key={card.label} {...card} />
        ))}
      </section>

      <section className="grid gap-7 xl:grid-cols-[1.35fr_0.65fr]">
        <ChartCard title="MongoDB Collection Growth" eyebrow="Live Database">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.55} />
                <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(148,163,184,0.15)" vertical={false} />
            <XAxis dataKey="month" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" allowDecimals={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Area type="monotone" dataKey="records" stroke="#22d3ee" strokeWidth={3} fill="url(#revenueGradient)" />
          </AreaChart>
        </ChartCard>

        <ChartCard title="Project Completion" eyebrow="Contracts Collection">
          <PieChart>
            <Pie data={pieData} dataKey="value" innerRadius={72} outerRadius={112} paddingAngle={5}>
              {pieData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
            </Pie>
            <Tooltip contentStyle={tooltipStyle} />
          </PieChart>
        </ChartCard>
      </section>

      <section className="grid gap-7 xl:grid-cols-2">
        <ChartCard title="Users + Leads" eyebrow="CRM Activity">
          <LineChart data={chartData}>
            <CartesianGrid stroke="rgba(148,163,184,0.15)" vertical={false} />
            <XAxis dataKey="month" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" allowDecimals={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Line type="monotone" dataKey="users" stroke="#a78bfa" strokeWidth={3} dot={false} />
            <Line type="monotone" dataKey="leads" stroke="#22d3ee" strokeWidth={3} dot={false} />
          </LineChart>
        </ChartCard>

        <ChartCard title="Vendor Status" eyebrow="Vendor Collection">
          <BarChart data={vendorChart}>
            <CartesianGrid stroke="rgba(148,163,184,0.15)" vertical={false} />
            <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 11 }} />
            <YAxis stroke="#94a3b8" allowDecimals={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="score" radius={[14, 14, 0, 0]} fill="#38bdf8" />
          </BarChart>
        </ChartCard>
      </section>

      <section className="grid gap-7 xl:grid-cols-[1fr_0.78fr]">
        <EnterpriseTable title="Recent MongoDB Projects" rows={projectModule.rows} columns={projectModule.columns} onDelete={onDelete} />
        <OperationsPanel data={data} />
      </section>
    </motion.div>
  )
}

function OperationsPanel({ data }) {
  const activities = [
    ...data.leads.slice(0, 2).map((lead) => ({ title: 'Lead received', copy: `${lead.name || lead.email} - ${lead.service || 'Service enquiry'}`, time: formatDate(lead.createdAt) })),
    ...data.contracts.slice(0, 2).map((contract) => ({ title: 'Project updated', copy: `${contract.title || 'Untitled'} - ${contract.status || 'pending'}`, time: formatDate(contract.createdAt) })),
    ...data.applications.slice(0, 2).map((application) => ({ title: 'Application submitted', copy: `${application.name || application.email} - ${application.jobTitle || 'Career'}`, time: formatDate(application.createdAt) })),
  ].slice(0, 5)

  return (
    <div className="space-y-7">
      <section className="rounded-[28px] border border-white/10 bg-white/[0.08] p-5 shadow-2xl shadow-black/10 backdrop-blur-2xl">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-cyan-200">Recent Activity</p>
            <h2 className="mt-2 text-xl font-black text-white">MongoDB activity feed</h2>
          </div>
          <Sparkles className="text-cyan-200" />
        </div>
        <div className="space-y-4">
          {activities.length ? activities.map((activity) => (
            <article key={`${activity.title}-${activity.copy}`} className="flex gap-3 rounded-3xl bg-slate-950/35 p-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-cyan-300/10 text-cyan-200">
                <Sparkles size={18} />
              </span>
              <div>
                <h3 className="font-black text-white">{activity.title}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-400">{activity.copy}</p>
                <small className="mt-2 block text-xs font-bold text-slate-500">{activity.time}</small>
              </div>
            </article>
          )) : (
            <div className="rounded-3xl bg-slate-950/35 p-6 text-sm font-semibold text-slate-400">MongoDB mein recent activity abhi empty hai.</div>
          )}
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2">
        {[
          ['Users', data.users.length],
          ['Vendors', data.vendors.length],
          ['Leads', data.leads.length],
          ['Applications', data.applications.length],
        ].map(([label, value]) => (
          <article key={label} className="rounded-3xl border border-white/10 bg-white/[0.08] p-4 backdrop-blur-2xl">
            <Bot className="text-cyan-200" size={20} />
            <h3 className="mt-4 text-2xl font-black text-white">{value}</h3>
            <p className="mt-1 text-sm font-semibold text-slate-400">{label}</p>
          </article>
        ))}
      </section>
    </div>
  )
}

function EnterpriseModule({ pageMeta, module, onDelete }) {
  const ModuleIcon = pageMeta.icon

  return (
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="space-y-7">
      <section className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
        <article className="rounded-[28px] border border-white/10 bg-white/[0.08] p-6 shadow-2xl shadow-black/10 backdrop-blur-2xl">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-cyan-300 to-violet-500 text-white shadow-lg shadow-cyan-500/20">
            <ModuleIcon size={24} />
          </span>
          <h2 className="mt-6 text-2xl font-black text-white">{pageMeta.title} Workspace</h2>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            {module.isLive
              ? 'Ye module MongoDB se live data read karta hai. Search, sort, pagination, CSV/PDF export aur delete connected hai.'
              : 'Is sidebar module ke liye backend collection/API abhi configured nahi hai, isliye demo data nahi dikhaya gaya.'}
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {['MongoDB live', 'JWT protected', 'CSV/PDF export', 'No demo data'].map((item) => (
              <div key={item} className="rounded-2xl bg-slate-950/35 p-4 text-sm font-bold text-slate-200">
                <CheckCircle2 className="mb-3 text-cyan-200" size={18} /> {item}
              </div>
            ))}
          </div>
        </article>

        <ModuleSummary module={module} />
      </section>

      <EnterpriseTable title={module.title} rows={module.rows} columns={module.columns} onDelete={module.isLive ? onDelete : null} emptyText={module.emptyText} />
    </motion.div>
  )
}

function ModuleSummary({ module }) {
  return (
    <section className="rounded-[28px] border border-white/10 bg-white/[0.08] p-6 shadow-2xl shadow-black/10 backdrop-blur-2xl">
      <p className="text-xs font-black uppercase tracking-[0.28em] text-cyan-200">Live Collection Summary</p>
      <h2 className="mt-2 text-xl font-black text-white">{module.title}</h2>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <article className="rounded-3xl bg-slate-950/35 p-4">
          <h3 className="text-3xl font-black text-white">{module.rows.length}</h3>
          <p className="mt-1 text-sm font-semibold text-slate-400">Total records</p>
        </article>
        <article className="rounded-3xl bg-slate-950/35 p-4">
          <h3 className="text-3xl font-black text-white">{module.isLive ? 'Live' : 'Empty'}</h3>
          <p className="mt-1 text-sm font-semibold text-slate-400">Backend status</p>
        </article>
      </div>
      <p className="mt-5 text-sm leading-7 text-slate-400">
        Data source: {module.source}
      </p>
    </section>
  )
}

function RecordModal({ open, page, form, saving, onChange, onSubmit, onClose }) {
  const fields = getFormFields(page)

  return (
    <Modal open={open} title={`Create ${titleize(page)}`} onClose={onClose}>
      <form onSubmit={onSubmit} className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          {fields.map((field) => (
            <label key={field.name} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
              <span className="mb-2 block text-xs font-black uppercase tracking-[0.2em] text-slate-500">{field.label}</span>
              {field.type === 'textarea' ? (
                <textarea
                  rows={4}
                  value={form[field.name] || ''}
                  onChange={(event) => onChange(field.name, event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-3 text-sm font-semibold text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/60"
                  required={field.required}
                />
              ) : field.type === 'select' ? (
                <select
                  value={form[field.name] || field.options[0]}
                  onChange={(event) => onChange(field.name, event.target.value)}
                  className="h-12 w-full rounded-2xl border border-white/10 bg-slate-950/35 px-4 text-sm font-semibold text-white outline-none transition focus:border-cyan-300/60"
                >
                  {field.options.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
              ) : (
                <input
                  type={field.type || 'text'}
                  value={form[field.name] || ''}
                  onChange={(event) => onChange(field.name, event.target.value)}
                  className="h-12 w-full rounded-2xl border border-white/10 bg-slate-950/35 px-4 text-sm font-semibold text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/60"
                  required={field.required}
                />
              )}
            </label>
          ))}
        </div>
        <button type="submit" disabled={saving} className="inline-flex h-12 items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-300 to-blue-500 px-5 text-sm font-black text-slate-950 shadow-xl shadow-cyan-500/20 disabled:opacity-60">
          {saving ? 'Saving...' : 'Save to MongoDB'} <ChevronRight size={18} />
        </button>
      </form>
    </Modal>
  )
}

function getModuleConfig(page, data) {
  if (['user-management', 'team-management', 'role-permissions'].includes(page)) {
    return {
      type: 'users',
      title: 'Users from MongoDB',
      source: AUTH_ENDPOINTS.settingsUsers,
      isLive: true,
      rows: data.users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.isActive ? 'Active' : 'Suspended',
        createdAt: formatDate(user.createdAt),
      })),
      columns: commonColumns(['name', 'email', 'role', 'status', 'createdAt']),
      emptyText: 'MongoDB users collection empty hai.',
    }
  }

  if (['vendor-management', 'agency-management', 'partner-network', 'vendor-performance', 'vendor-payouts'].includes(page)) {
    return {
      type: 'vendors',
      title: 'Vendors from MongoDB',
      source: VENDOR_ENDPOINTS.settingsList,
      isLive: true,
      rows: data.vendors.map((vendor) => ({
        id: vendor.id,
        code: vendor.vendorCode,
        name: vendor.name,
        company: vendor.company,
        email: vendor.email,
        service: vendor.serviceCategory,
        status: vendor.status,
        createdAt: formatDate(vendor.createdAt),
      })),
      columns: commonColumns(['code', 'name', 'company', 'email', 'service', 'status', 'createdAt']),
      emptyText: 'MongoDB vendors collection empty hai.',
    }
  }

  if (['project-management', 'client-projects', 'task-management', 'assign-tasks', 'deadlines', 'project-analytics', 'audio-recording-projects', 'video-collection-projects', 'script-management', 'quality-check', 'live-monitoring'].includes(page)) {
    return {
      type: 'contracts',
      title: 'Projects / Contracts from MongoDB',
      source: CONTRACT_ENDPOINTS.settingsList,
      isLive: true,
      rows: data.contracts.map((contract) => ({
        id: contract.signingToken || contract.slug,
        title: contract.title,
        client: contract.recipientName,
        email: contract.recipientEmail,
        status: contract.status || 'pending',
        projectStatus: contract.projectStatus || 'active',
        createdAt: formatDate(contract.createdAt),
      })),
      columns: commonColumns(['title', 'client', 'email', 'projectStatus', 'status', 'createdAt']),
      emptyText: 'MongoDB contracts/projects collection empty hai.',
    }
  }

  if (['leads-management', 'sales-pipeline', 'follow-ups', 'email-campaigns', 'whatsapp-campaigns', 'contact-requests', 'clients', 'support-requests'].includes(page)) {
    return {
      type: 'leads',
      title: 'Leads from MongoDB',
      source: LEAD_ENDPOINTS.settingsList,
      isLive: true,
      rows: data.leads.map((lead) => ({
        id: lead.id,
        name: lead.name,
        email: lead.email,
        service: lead.service,
        query: lead.query,
        createdAt: formatDate(lead.createdAt),
      })),
      columns: commonColumns(['name', 'email', 'service', 'query', 'createdAt']),
      emptyText: 'MongoDB leads collection empty hai.',
    }
  }

  if (['job-postings'].includes(page)) {
    return {
      type: 'jobs',
      title: 'Jobs from MongoDB',
      source: JOB_ENDPOINTS.settingsList,
      isLive: true,
      rows: data.jobs.map((job) => ({
        id: job.slug,
        title: job.title,
        department: job.department,
        location: job.location,
        type: job.type,
        createdAt: formatDate(job.createdAt),
      })),
      columns: commonColumns(['title', 'department', 'location', 'type', 'createdAt']),
      emptyText: 'MongoDB jobs collection empty hai.',
    }
  }

  if (['applications', 'candidate-management', 'interview-management', 'hiring-pipeline'].includes(page)) {
    return {
      type: 'applications',
      title: 'Applications from MongoDB',
      source: APPLICATION_ENDPOINTS.settingsList,
      isLive: true,
      rows: data.applications.map((application) => ({
        id: application.id,
        name: application.name,
        email: application.email,
        role: application.jobTitle || application.role,
        status: application.status || 'submitted',
        createdAt: formatDate(application.createdAt),
      })),
      columns: commonColumns(['name', 'email', 'role', 'status', 'createdAt']),
      emptyText: 'MongoDB applications collection empty hai.',
    }
  }

  return {
    type: 'none',
    title: `${titleize(page)} Records`,
    source: 'No backend route configured yet',
    isLive: false,
    rows: [],
    columns: commonColumns(['name', 'status', 'createdAt']),
    emptyText: 'Demo data removed. Is module ke liye MongoDB API configure karna baaki hai.',
  }
}

function createStats(data) {
  return [
    { label: 'Total Users', value: data.users.length, change: 'Live', icon: Users, tone: 'from-cyan-400 to-blue-500' },
    { label: 'Active Projects', value: data.contracts.filter((item) => (item.projectStatus || 'active') === 'active').length, change: 'MongoDB', icon: BriefcaseBusiness, tone: 'from-violet-400 to-fuchsia-500' },
    { label: 'Revenue', value: '$0', change: 'No finance API', icon: BadgeDollarSign, tone: 'from-emerald-400 to-teal-500' },
    { label: 'Vendors', value: data.vendors.length, change: 'Live', icon: Building2, tone: 'from-amber-300 to-orange-500' },
    { label: 'AI Tasks', value: 0, change: 'No AI API', icon: Bot, tone: 'from-sky-300 to-indigo-500' },
    { label: 'Pending QC', value: data.contracts.filter((item) => item.status !== 'signed').length, change: 'Live', icon: ShieldCheck, tone: 'from-rose-300 to-red-500' },
  ]
}

function createChartData(data) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return months.map((month, index) => {
    const monthNumber = index
    return {
      month,
      records: countMonth(data.users, monthNumber) + countMonth(data.vendors, monthNumber) + countMonth(data.contracts, monthNumber) + countMonth(data.leads, monthNumber),
      users: countMonth(data.users, monthNumber),
      leads: countMonth(data.leads, monthNumber),
    }
  })
}

function createProjectPie(contracts) {
  const signed = contracts.filter((contract) => contract.status === 'signed').length
  const pending = contracts.filter((contract) => contract.status !== 'signed').length
  const active = contracts.filter((contract) => (contract.projectStatus || 'active') === 'active').length
  const closed = contracts.filter((contract) => contract.projectStatus === 'closed').length

  return [
    { name: 'Signed', value: signed, color: '#22d3ee' },
    { name: 'Pending', value: pending, color: '#8b5cf6' },
    { name: 'Active', value: active, color: '#10b981' },
    { name: 'Closed', value: closed, color: '#f59e0b' },
  ].filter((item) => item.value > 0)
}

function countMonth(items, monthNumber) {
  return items.filter((item) => {
    const date = item.createdAt ? new Date(item.createdAt) : null
    return date instanceof Date && !Number.isNaN(date.valueOf()) && date.getMonth() === monthNumber
  }).length
}

function getFormFields(page) {
  const commonRequired = { required: true }
  const map = {
    'user-management': [
      { name: 'name', label: 'Name', ...commonRequired },
      { name: 'email', label: 'Email', type: 'email', ...commonRequired },
      { name: 'password', label: 'Password', type: 'password', ...commonRequired },
      { name: 'role', label: 'Role', type: 'select', options: ['staff', 'admin'] },
    ],
    'vendor-management': [
      { name: 'name', label: 'Vendor Name', ...commonRequired },
      { name: 'company', label: 'Company' },
      { name: 'email', label: 'Email', type: 'email', ...commonRequired },
      { name: 'phone', label: 'Phone' },
      { name: 'serviceCategory', label: 'Service Category' },
      { name: 'password', label: 'Password', type: 'password', ...commonRequired },
      { name: 'status', label: 'Status', type: 'select', options: ['active', 'pending', 'suspended'] },
    ],
    'project-management': [
      { name: 'title', label: 'Project Name', ...commonRequired },
      { name: 'recipientName', label: 'Client Name', ...commonRequired },
      { name: 'recipientEmail', label: 'Client Email', type: 'email', ...commonRequired },
      { name: 'senderName', label: 'Project Owner' },
      { name: 'projectStatus', label: 'Project Status', type: 'select', options: ['live', 'active', 'inactive', 'closed'] },
      { name: 'contractBody', label: 'Description', type: 'textarea' },
    ],
    'leads-management': [
      { name: 'name', label: 'Name', ...commonRequired },
      { name: 'email', label: 'Email', type: 'email', ...commonRequired },
      { name: 'service', label: 'Service', ...commonRequired },
      { name: 'query', label: 'Query', type: 'textarea', ...commonRequired },
    ],
    'job-postings': [
      { name: 'title', label: 'Title', ...commonRequired },
      { name: 'department', label: 'Department', ...commonRequired },
      { name: 'location', label: 'Location', ...commonRequired },
      { name: 'type', label: 'Type', type: 'select', options: ['Full Time', 'Part Time', 'Contract', 'Internship'] },
      { name: 'experience', label: 'Experience' },
      { name: 'summary', label: 'Summary', type: 'textarea', ...commonRequired },
    ],
  }

  return map[page] || []
}

function commonColumns(keys) {
  const labels = {
    id: 'ID',
    code: 'Code',
    name: 'Name',
    email: 'Email',
    role: 'Role',
    status: 'Status',
    createdAt: 'Created',
    company: 'Company',
    service: 'Service',
    title: 'Title',
    client: 'Client',
    projectStatus: 'Project Status',
    query: 'Query',
    department: 'Department',
    location: 'Location',
    type: 'Type',
  }

  return keys.map((key) => ({
    key,
    label: labels[key] || titleize(key),
    type: key.toLowerCase().includes('status') ? 'status' : undefined,
  }))
}

function formatDate(value) {
  return value ? new Date(value).toLocaleString() : '-'
}

function titleize(value) {
  return String(value || '')
    .split('-')
    .filter(Boolean)
    .map((word) => word[0]?.toUpperCase() + word.slice(1))
    .join(' ')
}

const tooltipStyle = {
  background: '#020617',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: 18,
  color: '#fff',
}

export function AdminDashboard() {
  return (
    <AdminThemeProvider>
      <EnterpriseAdminApp />
    </AdminThemeProvider>
  )
}
