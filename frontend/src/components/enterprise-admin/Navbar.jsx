import { AnimatePresence, motion } from 'framer-motion'
import { Bell, Command, Menu, MessageSquare, Plus, Search, Sparkles, UserRound } from 'lucide-react'
import { useState } from 'react'
import { ThemeToggle } from './ThemeToggle.jsx'

export function Navbar({ onToggleSidebar, onOpenMobile, onToggleNotifications }) {
  const [profileOpen, setProfileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/55 px-4 py-4 shadow-xl shadow-black/5 backdrop-blur-2xl lg:px-7">
      <div className="flex items-center gap-3">
        <button type="button" onClick={onOpenMobile} className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10 text-white lg:hidden" aria-label="Open sidebar">
          <Menu size={20} />
        </button>
        <button type="button" onClick={onToggleSidebar} className="hidden h-11 w-11 place-items-center rounded-2xl bg-white/10 text-white transition hover:bg-white/15 lg:grid" aria-label="Collapse sidebar">
          <Menu size={20} />
        </button>

        <label className="hidden h-12 min-w-0 flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.08] px-4 text-sm text-slate-300 shadow-inner shadow-white/5 md:flex">
          <Search size={18} />
          <input className="w-full bg-transparent text-white outline-none placeholder:text-slate-500" placeholder="Search users, vendors, projects, invoices, prompts..." />
          <span className="inline-flex items-center gap-1 rounded-lg border border-white/10 px-2 py-1 text-xs text-slate-400">
            <Command size={12} /> K
          </span>
        </label>

        <button type="button" className="hidden h-11 items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 px-4 text-sm font-black text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5 xl:inline-flex">
          <Plus size={18} /> Quick Actions
        </button>
        <button type="button" className="inline-flex h-11 items-center gap-2 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 px-4 text-sm font-black text-cyan-100 transition hover:-translate-y-0.5 hover:bg-cyan-300/15">
          <Sparkles size={18} /> <span className="hidden sm:inline">AI Assistant</span>
        </button>
        <ThemeToggle />
        <button type="button" onClick={onToggleNotifications} className="relative grid h-11 w-11 place-items-center rounded-2xl bg-white/10 text-white transition hover:bg-white/15" aria-label="Notifications">
          <Bell size={18} />
          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-cyan-300 ring-2 ring-slate-950"></span>
        </button>
        <button type="button" className="hidden h-11 w-11 place-items-center rounded-2xl bg-white/10 text-white transition hover:bg-white/15 sm:grid" aria-label="Messages">
          <MessageSquare size={18} />
        </button>

        <div className="relative">
          <button type="button" onClick={() => setProfileOpen((open) => !open)} className="flex h-12 items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-2 pr-4 text-white transition hover:bg-white/15">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-violet-400 to-fuchsia-500 font-black">A</span>
            <span className="hidden text-left lg:block">
              <b className="block text-sm">Admin</b>
              <small className="block text-xs text-slate-400">Cromgen HQ</small>
            </span>
          </button>
          <AnimatePresence>
            {profileOpen ? (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.96 }}
                className="absolute right-0 mt-3 w-64 rounded-3xl border border-white/10 bg-slate-950/95 p-3 text-white shadow-2xl shadow-black/30 backdrop-blur-2xl"
              >
                {['Profile Settings', 'Admin Access Control', 'Billing Workspace', 'Logout'].map((item) => (
                  <button key={item} type="button" className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white">
                    <UserRound size={16} /> {item}
                  </button>
                ))}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}
