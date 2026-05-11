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
  CheckCircle2,
  ChevronRight,
  CloudUpload,
  Layers3,
  Plus,
  Sparkles,
  WandSparkles,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { Navbar } from '../components/enterprise-admin/Navbar.jsx'
import { Sidebar } from '../components/enterprise-admin/Sidebar.jsx'
import { DashboardCard } from '../components/enterprise-admin/DashboardCard.jsx'
import { ChartCard } from '../components/enterprise-admin/ChartCard.jsx'
import { EnterpriseTable } from '../components/enterprise-admin/Table.jsx'
import { Modal } from '../components/enterprise-admin/Modal.jsx'
import { Loader, SkeletonBlock } from '../components/enterprise-admin/Loader.jsx'
import { NotificationPanel } from '../components/enterprise-admin/NotificationPanel.jsx'
import { AdminThemeProvider, useAdminTheme } from '../context/AdminThemeContext.jsx'
import {
  activities,
  enterpriseRows,
  pageCatalog,
  quickMetrics,
  revenueData,
  statCards,
  vendorData,
} from '../data/enterpriseAdmin.js'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT || '/',
})

const pieData = [
  { name: 'Completed', value: 62, color: '#22d3ee' },
  { name: 'In QC', value: 21, color: '#8b5cf6' },
  { name: 'Blocked', value: 9, color: '#fb7185' },
  { name: 'Planning', value: 8, color: '#f59e0b' },
]

function EnterpriseAdminApp() {
  const { isDark } = useAdminTheme()
  const [activePage, setActivePage] = useState('overview')
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState('AI operations workspace synced.')

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 650)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('cromgen_auth_token')
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`
    }
  }, [])

  const pageMeta = useMemo(() => {
    if (activePage === 'overview' || activePage === 'analytics' || activePage === 'ai-insights' || activePage === 'live-statistics') {
      return { title: 'Enterprise Command Center', tag: 'AI SaaS Operations', icon: Sparkles }
    }

    return pageCatalog[activePage] || {
      title: activePage.split('-').map((word) => word[0]?.toUpperCase() + word.slice(1)).join(' '),
      tag: 'Enterprise Module',
      icon: Layers3,
    }
  }, [activePage])

  const PageIcon = pageMeta.icon

  if (loading) return <Loader />

  return (
    <div className={isDark ? 'dark' : ''}>
      <main className={`min-h-screen overflow-hidden ${isDark ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-950'}`}>
        <div className="pointer-events-none fixed inset-0">
          <div className="absolute left-[-12%] top-[-20%] h-[520px] w-[520px] rounded-full bg-cyan-500/20 blur-3xl"></div>
          <div className="absolute right-[-10%] top-[10%] h-[540px] w-[540px] rounded-full bg-violet-500/20 blur-3xl"></div>
          <div className="absolute bottom-[-18%] left-[30%] h-[520px] w-[520px] rounded-full bg-blue-500/10 blur-3xl"></div>
        </div>

        <div className="relative flex min-h-screen">
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
              setToast(`${page.split('-').join(' ')} loaded.`)
            }}
          />

          <section className="min-w-0 flex-1">
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
                      AI-powered enterprise control plane for Cromgen Technology, built for data collection, vendor orchestration, finance, CRM, security, and live operations.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button type="button" onClick={() => setModalOpen(true)} className="inline-flex h-12 items-center gap-2 rounded-2xl bg-white px-4 text-sm font-black text-slate-950 shadow-xl shadow-cyan-500/10 transition hover:-translate-y-0.5">
                      <Plus size={18} /> Create Record
                    </button>
                    <button type="button" className="inline-flex h-12 items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white/15">
                      <WandSparkles size={18} /> Ask AI
                    </button>
                  </div>
                </div>
              </motion.header>

              {activePage === 'overview' || activePage === 'analytics' || activePage === 'ai-insights' || activePage === 'live-statistics' ? (
                <DashboardOverview />
              ) : (
                <EnterpriseModule pageMeta={pageMeta} />
              )}
            </div>

            <footer className="px-7 pb-7 text-sm text-slate-500">
              Cromgen Technology Enterprise Admin • API-ready architecture • Secure admin workspace
            </footer>
          </section>
        </div>

        <NotificationPanel open={notificationsOpen} onClose={() => setNotificationsOpen(false)} />
        <RecordModal open={modalOpen} onClose={() => setModalOpen(false)} />
      </main>
    </div>
  )
}

function DashboardOverview() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-7">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        {statCards.map((card) => (
          <DashboardCard key={card.label} {...card} />
        ))}
      </section>

      <section className="grid gap-7 xl:grid-cols-[1.35fr_0.65fr]">
        <ChartCard title="Revenue Analytics" eyebrow="Financial Intelligence">
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.55} />
                <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(148,163,184,0.15)" vertical={false} />
            <XAxis dataKey="month" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip contentStyle={{ background: '#020617', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 18, color: '#fff' }} />
            <Area type="monotone" dataKey="revenue" stroke="#22d3ee" strokeWidth={3} fill="url(#revenueGradient)" />
          </AreaChart>
        </ChartCard>

        <ChartCard title="Project Completion" eyebrow="Delivery Health">
          <PieChart>
            <Pie data={pieData} dataKey="value" innerRadius={72} outerRadius={112} paddingAngle={5}>
              {pieData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
            </Pie>
            <Tooltip contentStyle={{ background: '#020617', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 18, color: '#fff' }} />
          </PieChart>
        </ChartCard>
      </section>

      <section className="grid gap-7 xl:grid-cols-2">
        <ChartCard title="User Growth + AI Activity" eyebrow="Platform Adoption">
          <LineChart data={revenueData}>
            <CartesianGrid stroke="rgba(148,163,184,0.15)" vertical={false} />
            <XAxis dataKey="month" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip contentStyle={{ background: '#020617', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 18, color: '#fff' }} />
            <Line type="monotone" dataKey="users" stroke="#a78bfa" strokeWidth={3} dot={false} />
            <Line type="monotone" dataKey="ai" stroke="#22d3ee" strokeWidth={3} dot={false} />
          </LineChart>
        </ChartCard>

        <ChartCard title="Vendor Performance" eyebrow="Network Quality">
          <BarChart data={vendorData}>
            <CartesianGrid stroke="rgba(148,163,184,0.15)" vertical={false} />
            <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 11 }} />
            <YAxis stroke="#94a3b8" />
            <Tooltip contentStyle={{ background: '#020617', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 18, color: '#fff' }} />
            <Bar dataKey="score" radius={[14, 14, 0, 0]} fill="#38bdf8" />
          </BarChart>
        </ChartCard>
      </section>

      <section className="grid gap-7 xl:grid-cols-[1fr_0.78fr]">
        <EnterpriseTable title="Recent Projects" rows={enterpriseRows} />
        <OperationsPanel />
      </section>
    </motion.div>
  )
}

function OperationsPanel() {
  return (
    <div className="space-y-7">
      <section className="rounded-[28px] border border-white/10 bg-white/[0.08] p-5 shadow-2xl shadow-black/10 backdrop-blur-2xl">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-cyan-200">Recent Activity</p>
            <h2 className="mt-2 text-xl font-black text-white">Live command feed</h2>
          </div>
          <Sparkles className="text-cyan-200" />
        </div>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon
            return (
              <article key={activity.title} className="flex gap-3 rounded-3xl bg-slate-950/35 p-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-cyan-300/10 text-cyan-200">
                  <Icon size={18} />
                </span>
                <div>
                  <h3 className="font-black text-white">{activity.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-400">{activity.copy}</p>
                  <small className="mt-2 block text-xs font-bold text-slate-500">{activity.time}</small>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2">
        {quickMetrics.map((metric) => {
          const Icon = metric.icon
          return (
            <article key={metric.label} className="rounded-3xl border border-white/10 bg-white/[0.08] p-4 backdrop-blur-2xl">
              <Icon className="text-cyan-200" size={20} />
              <h3 className="mt-4 text-2xl font-black text-white">{metric.value}</h3>
              <p className="mt-1 text-sm font-semibold text-slate-400">{metric.label}</p>
            </article>
          )
        })}
      </section>
    </div>
  )
}

function EnterpriseModule({ pageMeta }) {
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
            API-ready module with enterprise search, workflow automation, validation-ready forms, role-aware actions, empty states, export controls, and analytics widgets.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {['Automations online', 'Role protected', 'CSV/PDF export', 'AI recommendations'].map((item) => (
              <div key={item} className="rounded-2xl bg-slate-950/35 p-4 text-sm font-bold text-slate-200">
                <CheckCircle2 className="mb-3 text-cyan-200" size={18} /> {item}
              </div>
            ))}
          </div>
        </article>

        <ModernForm />
      </section>

      <EnterpriseTable title={`${pageMeta.title} Records`} rows={enterpriseRows} />

      <section className="grid gap-7 lg:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <article key={item} className="rounded-[28px] border border-white/10 bg-white/[0.08] p-5 shadow-2xl shadow-black/10 backdrop-blur-2xl">
            <SkeletonBlock className="h-28" />
            <h3 className="mt-5 text-lg font-black text-white">Premium Empty State {item}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">Future backend data can hydrate this panel with zero layout changes.</p>
          </article>
        ))}
      </section>
    </motion.div>
  )
}

function ModernForm() {
  return (
    <form className="rounded-[28px] border border-white/10 bg-white/[0.08] p-6 shadow-2xl shadow-black/10 backdrop-blur-2xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-cyan-200">Smart Form</p>
          <h2 className="mt-2 text-xl font-black text-white">Create enterprise record</h2>
        </div>
        <Bot className="text-cyan-200" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {['Record Name', 'Owner Email', 'Start Date', 'Priority'].map((label) => (
          <label key={label} className="group relative">
            <span className="mb-2 block text-xs font-black uppercase tracking-[0.2em] text-slate-500">{label}</span>
            <input className="h-12 w-full rounded-2xl border border-white/10 bg-slate-950/35 px-4 text-sm font-semibold text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/60" placeholder={label} />
          </label>
        ))}
        <label className="md:col-span-2">
          <span className="mb-2 block text-xs font-black uppercase tracking-[0.2em] text-slate-500">Rich Text Notes</span>
          <textarea rows={4} className="w-full rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-3 text-sm font-semibold text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/60" placeholder="Add scope, instructions, dependencies, or AI prompts..." />
        </label>
        <label className="flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-cyan-300/30 bg-cyan-300/10 text-center text-sm font-bold text-cyan-100 md:col-span-2">
          <CloudUpload className="mb-2" />
          Upload files, media, contracts, or datasets
          <input type="file" className="hidden" />
        </label>
      </div>
      <button type="button" className="mt-5 inline-flex h-12 items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-300 to-blue-500 px-5 text-sm font-black text-slate-950 shadow-xl shadow-cyan-500/20">
        Save Record <ChevronRight size={18} />
      </button>
    </form>
  )
}

function RecordModal({ open, onClose }) {
  return (
    <Modal open={open} title="Create AI-powered record" onClose={onClose}>
      <ModernForm />
    </Modal>
  )
}

export function AdminDashboard() {
  return (
    <AdminThemeProvider>
      <EnterpriseAdminApp />
    </AdminThemeProvider>
  )
}
