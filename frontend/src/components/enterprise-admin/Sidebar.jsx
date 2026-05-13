import { motion } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { adminNavigation } from '../../data/enterpriseAdmin.js'
import { DropdownMenu } from './DropdownMenu.jsx'

const restrictedGroupsForNonAdmin = new Set([
  'AI Management',
  'Client Management',
  'Legal Team',
  'CRM & Sales',
  'Recruitment',
  'Support Center',
  'API & Integrations',
  'Website Management',
  'Security',
  'Settings',
])
const restrictedRoles = new Set(['vendor', 'staff', 'user'])

export function Sidebar({ activePage, collapsed, mobileOpen, role, accessPages = [], onCloseMobile, onNavigate }) {
  const [query, setQuery] = useState('')
  const [openGroup, setOpenGroup] = useState('Dashboard')

  const visibleNavigation = useMemo(() => {
    const value = query.trim().toLowerCase()
    const normalizedRole = String(role || '').toLowerCase()
    const hasExplicitAccess = normalizeAccessPages(accessPages).size > 0
    const roleNavigation = restrictedRoles.has(normalizedRole) && !hasExplicitAccess
      ? adminNavigation.filter((group) => !restrictedGroupsForNonAdmin.has(group.label))
      : adminNavigation
    const scopedNavigation = roleNavigation
      .map((group) => ({
        ...group,
        items: group.items.filter(([page]) => isPageVisibleForRole(page, normalizedRole, accessPages)),
      }))
      .filter((group) => group.items.length)

    if (!value) return scopedNavigation

    return scopedNavigation
      .map((group) => ({
        ...group,
        items: group.items.filter(([, label]) => label.toLowerCase().includes(value) || group.label.toLowerCase().includes(value)),
      }))
      .filter((group) => group.items.length)
  }, [accessPages, query, role])

  const content = (
    <aside className={`flex h-screen flex-col border-r border-white/10 bg-slate-950/70 text-white shadow-2xl shadow-black/30 backdrop-blur-2xl ${collapsed ? 'w-[92px]' : 'w-[304px]'}`}>
      <div className="flex h-20 items-center gap-3 px-5">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-cyan-300 via-blue-500 to-violet-500 text-lg font-black text-white shadow-lg shadow-cyan-500/20">
          CT
        </div>
        {!collapsed ? (
          <div className="min-w-0">
            <h1 className="truncate text-base font-black tracking-wide">Cromgen</h1>
            <p className="truncate text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">Enterprise AI</p>
          </div>
        ) : null}
        <button type="button" onClick={onCloseMobile} className="ml-auto rounded-xl p-2 text-slate-300 hover:bg-white/10 lg:hidden" aria-label="Close sidebar">
          <X size={18} />
        </button>
      </div>

      {!collapsed ? (
        <label className="mx-4 mb-4 flex h-11 items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.07] px-3 text-sm text-slate-300">
          <Search size={16} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search menu"
            className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
          />
        </label>
      ) : null}

      <nav className="admin-scrollbar flex-1 space-y-2 overflow-y-auto px-4 pb-5">
        {visibleNavigation.map((group) => {
          const isActive = group.items.some(([key]) => key === activePage)
          const isOpen = openGroup === group.label
          const isDirectAction = group.items.length === 1 && group.items[0][0] === 'logout'
          const isSinglePageGroup = group.items.length === 1 && !isDirectAction
          const Icon = group.icon

          if (isDirectAction) {
            return (
              <button
                key={group.label}
                type="button"
                onClick={() => {
                  onNavigate('logout')
                  setOpenGroup('')
                }}
                className="group flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-semibold text-rose-100 transition hover:bg-rose-400/10 hover:text-white"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-rose-400/10 text-rose-100 transition group-hover:bg-rose-400/15">
                  <Icon size={18} />
                </span>
                {!collapsed ? <span className="min-w-0 flex-1 truncate">{group.label}</span> : null}
              </button>
            )
          }

          if (isSinglePageGroup) {
            const [targetPage] = group.items[0]
            return (
              <button
                key={group.label}
                type="button"
                onClick={() => {
                  onNavigate(targetPage)
                  setOpenGroup('')
                }}
                className={`group flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-semibold transition ${
                  isActive
                    ? 'bg-white/18 text-white shadow-lg shadow-cyan-500/10'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl transition ${
                  isActive
                    ? 'bg-cyan-400 text-slate-950'
                    : 'bg-white/10 text-cyan-100 group-hover:bg-white/15'
                }`}>
                  <Icon size={18} />
                </span>
                {!collapsed ? <span className="min-w-0 flex-1 truncate">{group.label}</span> : null}
              </button>
            )
          }

          return (
            <DropdownMenu
              key={group.label}
              label={group.label}
              icon={group.icon}
              isOpen={isOpen}
              isActive={isActive}
              collapsed={collapsed}
              onToggle={() => setOpenGroup((current) => (current === group.label ? '' : group.label))}
            >
              {group.items.map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    onNavigate(key)
                    setOpenGroup('')
                  }}
                  className={`block w-full rounded-xl px-3 py-2 text-left text-sm font-semibold transition ${
                    activePage === key
                      ? 'bg-cyan-400/15 text-cyan-100 ring-1 ring-cyan-300/20'
                      : 'text-slate-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {label}
                </button>
              ))}
            </DropdownMenu>
          )
        })}
      </nav>
    </aside>
  )

  return (
    <>
      <div className="sticky top-0 hidden h-screen shrink-0 lg:block">{content}</div>
      {mobileOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xl lg:hidden"
        >
          <motion.div initial={{ x: -320 }} animate={{ x: 0 }} className="h-full">
            {content}
          </motion.div>
        </motion.div>
      ) : null}
    </>
  )
}

function isPageVisibleForRole(page, role, accessPages = []) {
  if (role === 'admin') return true
  if (page === 'dashboard' || page === 'logout') return true
  const explicitAccess = normalizeAccessPages(accessPages)
  if (explicitAccess.has('*') || explicitAccess.has(page)) return true
  if (role === 'staff') return ['user-management', 'vendor-management', 'project-management', 'assign-tasks', 'job-postings', 'applications', 'wallet', 'withdraw-requests', 'invoice-management', 'performance-reports', 'user-reports', 'revenue-reports'].includes(page)
  if (role === 'vendor') return ['user-management', 'vendor-management', 'task-management', 'assign-tasks', 'wallet', 'withdraw-requests', 'invoice-management', 'performance-reports', 'user-reports', 'revenue-reports'].includes(page)
  return false
}

function normalizeAccessPages(accessPages = []) {
  const values = Array.isArray(accessPages) ? accessPages : String(accessPages || '').split(/[\n,]+/)
  return new Set(values.map((item) => String(item || '').trim()).filter(Boolean))
}
