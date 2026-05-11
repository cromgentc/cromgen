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
  SITE_ENDPOINTS,
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
  siteSettings: null,
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
  const [currentAdmin, setCurrentAdmin] = useState(null)

  const loadMongoData = async () => {
    const requests = await Promise.allSettled([
      apiRequest(AUTH_ENDPOINTS.settingsUsers),
      apiRequest(VENDOR_ENDPOINTS.settingsList),
      apiRequest(CONTRACT_ENDPOINTS.settingsList),
      apiRequest(LEAD_ENDPOINTS.settingsList),
      apiRequest(APPLICATION_ENDPOINTS.settingsList),
      apiRequest(JOB_ENDPOINTS.settingsList),
      apiRequest(SITE_ENDPOINTS.settingsDetail),
      apiRequest(AUTH_ENDPOINTS.currentUser),
    ])

    const [users, vendors, contracts, leads, applications, jobs, siteSettings, currentUser] = requests.map((result) => (
      result.status === 'fulfilled' ? result.value : {}
    ))

    setData({
      users: users.users || [],
      vendors: vendors.vendors || [],
      contracts: contracts.contracts || [],
      leads: leads.leads || [],
      applications: applications.applications || [],
      jobs: jobs.jobs || [],
      siteSettings: siteSettings.settings || null,
    })
    setCurrentAdmin(currentUser.user || null)

    const failedCount = requests.filter((result) => result.status === 'rejected').length
    setToast(failedCount ? `${failedCount} data collections could not load. Check backend login/API.` : 'Live data synced.')
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
      return { title: 'Enterprise Command Center', tag: 'Live Data', icon: Sparkles }
    }

    return pageCatalog[activePage] || {
      title: titleize(activePage),
      tag: 'Live Module',
      icon: Layers3,
    }
  }, [activePage])

  const module = useMemo(() => getModuleConfig(activePage, data), [activePage, data])
  const liveNotifications = useMemo(() => createNotifications(data), [data])
  const PageIcon = pageMeta.icon

  const navigateAdmin = (page) => {
    if (page === 'logout') {
      localStorage.removeItem('cromgen_auth_token')
      localStorage.removeItem('cromgen_auth_role')
      window.location.assign('/admin-login')
      return
    }
    setActivePage(page)
    setMobileOpen(false)
  }

  const openCreateModal = () => {
    if (!supportedCreatePages.includes(activePage)) {
      setToast('Create API is not configured for this module yet.')
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
      setToast('Record saved successfully.')
      await loadMongoData()
    } catch (error) {
      setToast(error instanceof Error ? error.message : 'Record could not be saved.')
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
        setToast('Delete API is not configured for this module yet.')
        return
      }

      setToast('Record deleted successfully.')
      await loadMongoData()
    } catch (error) {
      setToast(error instanceof Error ? error.message : 'Record could not be deleted.')
    }
  }

  const saveSiteSettings = async (settings) => {
    try {
      const response = await apiRequest(SITE_ENDPOINTS.settingsDetail, {
        method: 'POST',
        body: JSON.stringify(settings),
      })
      setData((current) => ({ ...current, siteSettings: response.settings }))
      setToast('Settings saved successfully.')
    } catch (error) {
      setToast(error instanceof Error ? error.message : 'Settings could not be saved.')
    }
  }

  const saveProfileSettings = async (profile) => {
    try {
      const response = await apiRequest(AUTH_ENDPOINTS.updateCurrentUser, {
        method: 'POST',
        body: JSON.stringify(profile),
      })
      setCurrentAdmin(response.user)
      setData((current) => ({
        ...current,
        users: current.users.map((user) => (user.id === response.user.id ? response.user : user)),
      }))
      setToast('Profile updated successfully.')
    } catch (error) {
      setToast(error instanceof Error ? error.message : 'Profile could not be updated.')
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
            onNavigate={navigateAdmin}
          />

          <section className="h-screen min-w-0 flex-1 overflow-y-auto">
            <Navbar
              onToggleSidebar={() => setCollapsed((value) => !value)}
              onOpenMobile={() => setMobileOpen(true)}
              onToggleNotifications={() => setNotificationsOpen((open) => !open)}
              onNavigate={navigateAdmin}
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
                      Dashboard renders live data from the backend REST APIs.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button type="button" onClick={openCreateModal} className="inline-flex h-12 items-center gap-2 rounded-2xl bg-white px-4 text-sm font-black text-slate-950 shadow-xl shadow-cyan-500/10 transition hover:-translate-y-0.5">
                      <Plus size={18} /> Create Record
                    </button>
                    <button type="button" onClick={loadMongoData} className="inline-flex h-12 items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white/15">
                      <WandSparkles size={18} /> Refresh Data
                    </button>
                  </div>
                </div>
              </motion.header>

              {['overview', 'analytics', 'ai-insights', 'live-statistics'].includes(activePage) ? (
                <DashboardOverview data={data} onDelete={deleteRecord} />
              ) : activePage === 'profile-settings' ? (
                <ProfileSettingsPage currentAdmin={currentAdmin} onSave={saveProfileSettings} />
              ) : isSettingsPage(activePage) ? (
                <SettingsModule activePage={activePage} settings={data.siteSettings} onSave={saveSiteSettings} />
              ) : (
                <EnterpriseModule pageMeta={pageMeta} module={module} onDelete={deleteRecord} />
              )}
            </div>

            <footer className="px-7 pb-7 text-sm text-slate-500">
              Cromgen Technology Enterprise Admin - Live data - Secure admin workspace
            </footer>
          </section>
        </div>

        <NotificationPanel open={notificationsOpen} notifications={liveNotifications} onClose={() => setNotificationsOpen(false)} />
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
        <ChartCard title="Collection Growth" eyebrow="Live Database">
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
        <EnterpriseTable title="Recent Projects" rows={projectModule.rows} columns={projectModule.columns} onDelete={onDelete} />
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
            <h2 className="mt-2 text-xl font-black text-white">Live activity feed</h2>
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
            <div className="rounded-3xl bg-slate-950/35 p-6 text-sm font-semibold text-slate-400">Recent activity is currently empty.</div>
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
              ? 'This module reads live data from the backend. Search, sorting, pagination, CSV/PDF export, and delete actions are connected.'
              : 'The backend collection/API is not configured for this sidebar module yet.'}
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {['Live data', 'JWT protected', 'CSV/PDF export', 'Real records only'].map((item) => (
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

function SettingsModule({ activePage, settings, onSave }) {
  const [draft, setDraft] = useState(settings || createEmptySiteSettings())
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDraft(settings || createEmptySiteSettings())
    }, 0)

    return () => window.clearTimeout(timer)
  }, [settings])

  const tab = activePage === 'email-settings'
    ? 'email'
    : activePage === 'website-settings'
      ? 'brand'
      : 'social'

  const updateField = (field, value) => {
    setDraft((current) => ({ ...current, [field]: value }))
  }

  const updateEmailField = (field, value) => {
    setDraft((current) => ({
      ...current,
      emailConfig: {
        ...(current.emailConfig || {}),
        [field]: value,
      },
    }))
  }

  const updateSocialLink = (index, field, value) => {
    setDraft((current) => ({
      ...current,
      socialLinks: (current.socialLinks || []).map((link, itemIndex) => (
        itemIndex === index ? { ...link, [field]: value } : link
      )),
    }))
  }

  const addSocialLink = () => {
    setDraft((current) => ({
      ...current,
      socialLinks: [...(current.socialLinks || []), { label: '', url: '' }],
    }))
  }

  const removeSocialLink = (index) => {
    setDraft((current) => ({
      ...current,
      socialLinks: (current.socialLinks || []).filter((_, itemIndex) => itemIndex !== index),
    }))
  }

  const updateImageField = async (field, file) => {
    if (!file) return
    const dataUrl = await fileToDataUrl(file)
    updateField(field, dataUrl)
  }

  const submit = async (event) => {
    event.preventDefault()
    setSaving(true)
    await onSave(draft)
    setSaving(false)
  }

  return (
    <motion.form initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} onSubmit={submit} className="space-y-7">
      <section className="rounded-[28px] border border-white/10 bg-white/[0.08] p-6 shadow-2xl shadow-black/10 backdrop-blur-2xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-cyan-200">Existing Settings</p>
            <h2 className="mt-2 text-2xl font-black text-white">
              {tab === 'email' ? 'SMTP Email Settings' : tab === 'brand' ? 'Brand Assets' : 'Social Media Links'}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              These controls are connected to the same settings API used by the previous admin panel.
            </p>
          </div>
          <button type="submit" disabled={saving} className="inline-flex h-12 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-300 to-blue-500 px-5 text-sm font-black text-slate-950 shadow-xl shadow-cyan-500/20 disabled:opacity-60">
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </section>

      {tab === 'brand' ? (
        <section className="grid gap-5 xl:grid-cols-3">
          {[
            ['topbarLogo', 'Top Bar Logo', 'topbarLogoSize'],
            ['footerLogo', 'Footer Logo', 'footerLogoSize'],
            ['faviconLogo', 'Favicon Logo', 'faviconLogoSize'],
          ].map(([imageField, label, sizeField]) => (
            <article key={imageField} className="rounded-[28px] border border-white/10 bg-white/[0.08] p-5 shadow-2xl shadow-black/10 backdrop-blur-2xl">
              <div className="mb-4 flex h-28 items-center justify-center rounded-3xl bg-slate-950/35">
                {draft[imageField] ? (
                  <img
                    src={draft[imageField]}
                    alt={`${label} preview`}
                    style={{
                      width: Number(draft[sizeField]) || 48,
                      height: Number(draft[sizeField]) || 48,
                    }}
                    className="object-contain"
                  />
                ) : (
                  <span className="text-sm font-semibold text-slate-500">No image uploaded</span>
                )}
              </div>
              <label className="block">
                <span className="mb-2 block text-xs font-black uppercase tracking-[0.2em] text-slate-500">{label}</span>
                <input type="file" accept="image/*" onChange={(event) => updateImageField(imageField, event.target.files?.[0])} className="w-full rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-3 text-sm font-semibold text-slate-300" />
              </label>
              <label className="mt-4 block">
                <span className="mb-2 block text-xs font-black uppercase tracking-[0.2em] text-slate-500">Size</span>
                <input type="number" min="16" max="160" value={draft[sizeField] || ''} onChange={(event) => updateField(sizeField, event.target.value)} className="h-12 w-full rounded-2xl border border-white/10 bg-slate-950/35 px-4 text-sm font-semibold text-white outline-none focus:border-cyan-300/60" />
              </label>
            </article>
          ))}
        </section>
      ) : tab === 'email' ? (
        <section className="rounded-[28px] border border-white/10 bg-white/[0.08] p-6 shadow-2xl shadow-black/10 backdrop-blur-2xl">
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ['smtpHost', 'SMTP Host', 'smtp.example.com'],
              ['smtpPort', 'SMTP Port', '465'],
              ['smtpUser', 'SMTP User', 'name@domain.com'],
              ['smtpPass', 'SMTP Password', 'SMTP password'],
              ['mailFrom', 'Mail From', 'name@domain.com'],
              ['adminEmail', 'Admin Notification Email', 'admin@domain.com'],
            ].map(([field, label, placeholder]) => (
              <label key={field}>
                <span className="mb-2 block text-xs font-black uppercase tracking-[0.2em] text-slate-500">{label}</span>
                <input
                  type={field === 'smtpPass' ? 'password' : field === 'smtpPort' ? 'number' : 'text'}
                  value={draft.emailConfig?.[field] || ''}
                  placeholder={placeholder}
                  onChange={(event) => updateEmailField(field, event.target.value)}
                  className="h-12 w-full rounded-2xl border border-white/10 bg-slate-950/35 px-4 text-sm font-semibold text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/60"
                />
              </label>
            ))}
          </div>
        </section>
      ) : (
        <section className="rounded-[28px] border border-white/10 bg-white/[0.08] p-6 shadow-2xl shadow-black/10 backdrop-blur-2xl">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-xl font-black text-white">Social Links</h3>
            <button type="button" onClick={addSocialLink} className="rounded-2xl bg-white/10 px-4 py-2 text-sm font-black text-white hover:bg-white/15">Add Link</button>
          </div>
          <div className="space-y-3">
            {(draft.socialLinks || []).map((link, index) => (
              <div key={`${link.label}-${index}`} className="grid gap-3 md:grid-cols-[1fr_1.5fr_auto]">
                <input value={link.label || ''} placeholder="LinkedIn" onChange={(event) => updateSocialLink(index, 'label', event.target.value)} className="h-12 rounded-2xl border border-white/10 bg-slate-950/35 px-4 text-sm font-semibold text-white outline-none placeholder:text-slate-600 focus:border-cyan-300/60" />
                <input value={link.url || ''} placeholder="https://..." onChange={(event) => updateSocialLink(index, 'url', event.target.value)} className="h-12 rounded-2xl border border-white/10 bg-slate-950/35 px-4 text-sm font-semibold text-white outline-none placeholder:text-slate-600 focus:border-cyan-300/60" />
                <button type="button" onClick={() => removeSocialLink(index)} className="rounded-2xl bg-rose-400/10 px-4 py-2 text-sm font-black text-rose-200 hover:bg-rose-400/15">Remove</button>
              </div>
            ))}
          </div>
        </section>
      )}
    </motion.form>
  )
}

function ProfileSettingsPage({ currentAdmin, onSave }) {
  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [draft, setDraft] = useState(createProfileDraft(currentAdmin))

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDraft(createProfileDraft(currentAdmin))
    }, 0)

    return () => window.clearTimeout(timer)
  }, [currentAdmin])

  const initials = String(draft.name || draft.email || 'Admin')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || 'A'

  const updateDraft = (field, value) => {
    setDraft((current) => ({ ...current, [field]: value }))
  }

  const updateSocialLink = (index, field, value) => {
    setDraft((current) => ({
      ...current,
      socialLinks: (current.socialLinks || []).map((link, itemIndex) => (
        itemIndex === index ? { ...link, [field]: value } : link
      )),
    }))
  }

  const addSocialLink = () => {
    setDraft((current) => ({
      ...current,
      socialLinks: [...(current.socialLinks || []), { label: '', url: '' }],
    }))
    setIsEditing(true)
  }

  const removeSocialLink = (index) => {
    setDraft((current) => ({
      ...current,
      socialLinks: (current.socialLinks || []).filter((_, itemIndex) => itemIndex !== index),
    }))
  }

  const updateAvatar = async (file) => {
    if (!file) return
    const dataUrl = await fileToDataUrl(file)
    updateDraft('avatar', dataUrl)
    setIsEditing(true)
  }

  const submit = async (event) => {
    event.preventDefault()
    setSaving(true)
    await onSave(draft)
    setSaving(false)
    setIsEditing(false)
  }

  return (
    <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="grid gap-7 xl:grid-cols-[0.75fr_1.25fr]">
      <article className="rounded-[28px] border border-white/10 bg-white/[0.08] p-6 shadow-2xl shadow-black/10 backdrop-blur-2xl">
        <div className="flex items-center gap-4">
          {draft.avatar ? (
            <img src={draft.avatar} alt="Admin avatar" className="h-20 w-20 rounded-3xl object-cover shadow-lg shadow-cyan-500/20" />
          ) : (
            <div className="grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br from-cyan-300 via-blue-500 to-violet-500 text-2xl font-black text-white shadow-lg shadow-cyan-500/20">
              {initials}
            </div>
          )}
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-cyan-200">Admin Profile</p>
            <h2 className="mt-2 text-2xl font-black text-white">{draft.name || 'Admin User'}</h2>
            <p className="mt-1 text-sm font-semibold text-slate-400">{draft.email || 'No email available'}</p>
          </div>
        </div>

        <label className="mt-6 block rounded-3xl border border-dashed border-cyan-300/30 bg-cyan-300/10 p-4 text-center text-sm font-bold text-cyan-100">
          Change Profile Image
          <input type="file" accept="image/*" onChange={(event) => updateAvatar(event.target.files?.[0])} className="hidden" />
        </label>

        <div className="mt-7 grid gap-3">
          {[
            ['Role', draft.role || 'admin'],
            ['Account Status', currentAdmin ? 'Active' : 'Not loaded'],
            ['User ID', draft.id || '-'],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl bg-slate-950/35 p-4">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">{label}</p>
              <p className="mt-2 text-sm font-bold text-white">{value}</p>
            </div>
          ))}
        </div>
      </article>

      <form onSubmit={submit} className="rounded-[28px] border border-white/10 bg-white/[0.08] p-6 shadow-2xl shadow-black/10 backdrop-blur-2xl">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-cyan-200">Profile Settings</p>
            <h2 className="mt-2 text-2xl font-black text-white">Account Details</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Edit your admin profile, add details, and connect social profiles.
            </p>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => setIsEditing((value) => !value)} className="rounded-2xl bg-white/10 px-4 py-2 text-sm font-black text-white hover:bg-white/15">
              {isEditing ? 'Cancel Edit' : 'Edit Profile'}
            </button>
            <button type="submit" disabled={!isEditing || saving} className="rounded-2xl bg-gradient-to-r from-cyan-300 to-blue-500 px-4 py-2 text-sm font-black text-slate-950 disabled:opacity-50">
              {saving ? 'Updating...' : 'Update Profile'}
            </button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label>
            <span className="mb-2 block text-xs font-black uppercase tracking-[0.2em] text-slate-500">Name</span>
            <input readOnly={!isEditing} value={draft.name || ''} onChange={(event) => updateDraft('name', event.target.value)} className="h-12 w-full rounded-2xl border border-white/10 bg-slate-950/35 px-4 text-sm font-semibold text-white outline-none focus:border-cyan-300/60" />
          </label>
          <label>
            <span className="mb-2 block text-xs font-black uppercase tracking-[0.2em] text-slate-500">Email</span>
            <input readOnly value={draft.email || ''} className="h-12 w-full rounded-2xl border border-white/10 bg-slate-950/35 px-4 text-sm font-semibold text-slate-400 outline-none" />
          </label>
          <label>
            <span className="mb-2 block text-xs font-black uppercase tracking-[0.2em] text-slate-500">Role</span>
            <input readOnly value={draft.role || ''} className="h-12 w-full rounded-2xl border border-white/10 bg-slate-950/35 px-4 text-sm font-semibold text-slate-400 outline-none" />
          </label>
          <label>
            <span className="mb-2 block text-xs font-black uppercase tracking-[0.2em] text-slate-500">Title</span>
            <input readOnly={!isEditing} value={draft.title || ''} onChange={(event) => updateDraft('title', event.target.value)} placeholder="Operations Director" className="h-12 w-full rounded-2xl border border-white/10 bg-slate-950/35 px-4 text-sm font-semibold text-white outline-none placeholder:text-slate-600 focus:border-cyan-300/60" />
          </label>
          <label>
            <span className="mb-2 block text-xs font-black uppercase tracking-[0.2em] text-slate-500">Phone</span>
            <input readOnly={!isEditing} value={draft.phone || ''} onChange={(event) => updateDraft('phone', event.target.value)} placeholder="+1 555 000 0000" className="h-12 w-full rounded-2xl border border-white/10 bg-slate-950/35 px-4 text-sm font-semibold text-white outline-none placeholder:text-slate-600 focus:border-cyan-300/60" />
          </label>
          <label>
            <span className="mb-2 block text-xs font-black uppercase tracking-[0.2em] text-slate-500">Location</span>
            <input readOnly={!isEditing} value={draft.location || ''} onChange={(event) => updateDraft('location', event.target.value)} placeholder="New York, USA" className="h-12 w-full rounded-2xl border border-white/10 bg-slate-950/35 px-4 text-sm font-semibold text-white outline-none placeholder:text-slate-600 focus:border-cyan-300/60" />
          </label>
          <label className="md:col-span-2">
            <span className="mb-2 block text-xs font-black uppercase tracking-[0.2em] text-slate-500">Details / Bio</span>
            <textarea readOnly={!isEditing} rows={4} value={draft.bio || ''} onChange={(event) => updateDraft('bio', event.target.value)} placeholder="Add profile details, responsibilities, or admin notes..." className="w-full rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-3 text-sm font-semibold text-white outline-none placeholder:text-slate-600 focus:border-cyan-300/60" />
          </label>
        </div>

        <div className="mt-7 rounded-3xl border border-white/10 bg-slate-950/25 p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Social Connect</p>
              <h3 className="mt-1 text-lg font-black text-white">Connected Profiles</h3>
            </div>
            <button type="button" onClick={addSocialLink} className="rounded-2xl bg-white/10 px-4 py-2 text-sm font-black text-white hover:bg-white/15">Add Social</button>
          </div>
          <div className="space-y-3">
            {(draft.socialLinks || []).length ? draft.socialLinks.map((link, index) => (
              <div key={`${link.label}-${index}`} className="grid gap-3 md:grid-cols-[1fr_1.5fr_auto]">
                <input readOnly={!isEditing} value={link.label || ''} placeholder="LinkedIn" onChange={(event) => updateSocialLink(index, 'label', event.target.value)} className="h-12 rounded-2xl border border-white/10 bg-slate-950/35 px-4 text-sm font-semibold text-white outline-none placeholder:text-slate-600 focus:border-cyan-300/60" />
                <input readOnly={!isEditing} value={link.url || ''} placeholder="https://..." onChange={(event) => updateSocialLink(index, 'url', event.target.value)} className="h-12 rounded-2xl border border-white/10 bg-slate-950/35 px-4 text-sm font-semibold text-white outline-none placeholder:text-slate-600 focus:border-cyan-300/60" />
                <button type="button" disabled={!isEditing} onClick={() => removeSocialLink(index)} className="rounded-2xl bg-rose-400/10 px-4 py-2 text-sm font-black text-rose-200 hover:bg-rose-400/15 disabled:opacity-40">Remove</button>
              </div>
            )) : (
              <div className="rounded-2xl bg-slate-950/35 p-4 text-sm font-semibold text-slate-400">No social profiles connected yet.</div>
            )}
          </div>
        </div>
      </form>
    </motion.section>
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
          {saving ? 'Saving...' : 'Save Record'} <ChevronRight size={18} />
        </button>
      </form>
    </Modal>
  )
}

function getModuleConfig(page, data) {
  if (['user-management', 'team-management', 'role-permissions'].includes(page)) {
    return {
      type: 'users',
      title: 'Users',
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
      emptyText: 'The users collection is empty.',
    }
  }

  if (['vendor-management', 'agency-management', 'partner-network', 'vendor-performance', 'vendor-payouts'].includes(page)) {
    return {
      type: 'vendors',
      title: 'Vendors',
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
      emptyText: 'The vendors collection is empty.',
    }
  }

  if (['project-management', 'client-projects', 'task-management', 'assign-tasks', 'deadlines', 'project-analytics', 'audio-recording-projects', 'video-collection-projects', 'script-management', 'quality-check', 'live-monitoring'].includes(page)) {
    return {
      type: 'contracts',
      title: 'Projects / Contracts',
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
      emptyText: 'The contracts/projects collection is empty.',
    }
  }

  if (['leads-management', 'sales-pipeline', 'follow-ups', 'email-campaigns', 'whatsapp-campaigns', 'contact-requests', 'clients', 'support-requests'].includes(page)) {
    return {
      type: 'leads',
      title: 'Leads',
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
      emptyText: 'The leads collection is empty.',
    }
  }

  if (['job-postings'].includes(page)) {
    return {
      type: 'jobs',
      title: 'Jobs',
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
      emptyText: 'The jobs collection is empty.',
    }
  }

  if (['applications', 'candidate-management', 'interview-management', 'hiring-pipeline'].includes(page)) {
    return {
      type: 'applications',
      title: 'Applications',
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
      emptyText: 'The applications collection is empty.',
    }
  }

  return {
    type: 'none',
    title: `${titleize(page)} Records`,
    source: 'Backend route not configured yet',
    isLive: false,
    rows: [],
    columns: commonColumns(['name', 'status', 'createdAt']),
    emptyText: 'The API for this module has not been configured yet.',
  }
}

function isSettingsPage(page) {
  return ['system-settings', 'website-settings', 'email-settings', 'notification-settings', 'profile-settings'].includes(page)
}

function createEmptySiteSettings() {
  return {
    topbarLogo: '',
    topbarLogoSize: 64,
    footerLogo: '',
    footerLogoSize: 52,
    faviconLogo: '',
    faviconLogoSize: 32,
    emailConfig: {
      smtpHost: '',
      smtpPort: 465,
      smtpUser: '',
      smtpPass: '',
      mailFrom: '',
      adminEmail: '',
    },
    socialLinks: [],
  }
}

function createProfileDraft(user) {
  return {
    id: user?.id || '',
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || '',
    avatar: user?.avatar || '',
    title: user?.title || '',
    phone: user?.phone || '',
    location: user?.location || '',
    bio: user?.bio || '',
    socialLinks: Array.isArray(user?.socialLinks) ? user.socialLinks : [],
  }
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result || ''))
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

function createStats(data) {
  return [
    { label: 'Total Users', value: data.users.length, change: 'Live', icon: Users, tone: 'from-cyan-400 to-blue-500' },
    { label: 'Active Projects', value: data.contracts.filter((item) => (item.projectStatus || 'active') === 'active').length, change: 'Live', icon: BriefcaseBusiness, tone: 'from-violet-400 to-fuchsia-500' },
    { label: 'Vendors', value: data.vendors.length, change: 'Live', icon: Building2, tone: 'from-amber-300 to-orange-500' },
    { label: 'Total Leads', value: data.leads.length, change: 'Live', icon: Sparkles, tone: 'from-sky-300 to-indigo-500' },
    { label: 'Applications', value: data.applications.length, change: 'Live', icon: Users, tone: 'from-emerald-400 to-teal-500' },
    { label: 'Pending QC', value: data.contracts.filter((item) => item.status !== 'signed').length, change: 'Live', icon: ShieldCheck, tone: 'from-rose-300 to-red-500' },
  ]
}

function createNotifications(data) {
  return [
    ...data.leads.slice(0, 3).map((lead) => ({
      title: 'New lead',
      meta: `${lead.name || lead.email || 'Lead'} - ${lead.service || 'Service enquiry'}`,
      tone: 'bg-cyan-400',
    })),
    ...data.contracts.filter((contract) => contract.status !== 'signed').slice(0, 3).map((contract) => ({
      title: 'Pending project / contract',
      meta: `${contract.title || 'Untitled'} - ${contract.recipientEmail || 'No email'}`,
      tone: 'bg-amber-400',
    })),
    ...data.applications.slice(0, 3).map((application) => ({
      title: 'New application',
      meta: `${application.name || application.email || 'Candidate'} - ${application.jobTitle || application.role || 'Role'}`,
      tone: 'bg-emerald-400',
    })),
  ].slice(0, 8)
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
