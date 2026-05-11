import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export function DropdownMenu({ label, icon: Icon, isOpen, isActive, onToggle, children, collapsed }) {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        className={`group flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-semibold transition ${
          isActive
            ? 'bg-white/18 text-white shadow-lg shadow-cyan-500/10'
            : 'text-slate-300 hover:bg-white/10 hover:text-white'
        }`}
      >
        <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl transition ${
          isActive ? 'bg-cyan-400 text-slate-950' : 'bg-white/10 text-cyan-100 group-hover:bg-white/15'
        }`}>
          <Icon size={18} />
        </span>
        {!collapsed ? (
          <>
            <span className="min-w-0 flex-1 truncate">{label}</span>
            <ChevronDown size={16} className={`transition ${isOpen ? 'rotate-180' : ''}`} />
          </>
        ) : null}
      </button>
      <AnimatePresence initial={false}>
        {isOpen && !collapsed ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="overflow-hidden"
          >
            <div className="ml-6 mt-2 space-y-1 border-l border-white/10 pl-4">
              {children}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
