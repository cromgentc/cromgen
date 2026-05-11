import { motion } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { adminNavigation } from '../../data/enterpriseAdmin.js'
import { DropdownMenu } from './DropdownMenu.jsx'

export function Sidebar({ activePage, collapsed, mobileOpen, onCloseMobile, onNavigate }) {
  const [query, setQuery] = useState('')
  const [openGroup, setOpenGroup] = useState('Dashboard')

  const visibleNavigation = useMemo(() => {
    const value = query.trim().toLowerCase()
    if (!value) return adminNavigation

    return adminNavigation
      .map((group) => ({
        ...group,
        items: group.items.filter(([, label]) => label.toLowerCase().includes(value) || group.label.toLowerCase().includes(value)),
      }))
      .filter((group) => group.items.length)
  }, [query])

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

      <nav className="flex-1 space-y-2 overflow-y-auto px-4 pb-5">
        {visibleNavigation.map((group) => {
          const isActive = group.items.some(([key]) => key === activePage)
          const isOpen = openGroup === group.label

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
