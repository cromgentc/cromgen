import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

export function DashboardCard({ label, value, change, icon: Icon, tone, onClick }) {
  const isNegative = String(change).startsWith('-')
  const Component = onClick ? motion.button : motion.article

  return (
    <Component
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      whileHover={{ y: -6, scale: 1.01 }}
      className={`group overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.08] p-5 shadow-2xl shadow-black/10 backdrop-blur-2xl ${onClick ? 'text-left outline-none transition focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/20' : ''}`}
    >
      <div className="flex items-start justify-between gap-4">
        <span className={`grid h-13 w-13 place-items-center rounded-2xl bg-gradient-to-br ${tone} text-white shadow-lg shadow-black/20`}>
          <Icon size={23} />
        </span>
        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-black ${
          isNegative ? 'bg-rose-400/15 text-rose-200' : 'bg-emerald-400/15 text-emerald-200'
        }`}>
          {change} <ArrowUpRight size={13} />
        </span>
      </div>
      <div className="mt-7">
        <p className="text-sm font-semibold text-slate-400">{label}</p>
        <h3 className="mt-2 text-3xl font-black tracking-tight text-white">{value}</h3>
      </div>
      <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10">
        <div className={`h-full w-3/4 rounded-full bg-gradient-to-r ${tone}`}></div>
      </div>
    </Component>
  )
}
