import { ResponsiveContainer } from 'recharts'

export function ChartCard({ title, eyebrow, action, children, className = '', onClick }) {
  const handleKeyDown = (event) => {
    if (!onClick) return
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onClick()
    }
  }

  return (
    <section
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={`rounded-[28px] border border-white/10 bg-white/[0.08] p-5 shadow-2xl shadow-black/10 backdrop-blur-2xl ${onClick ? 'cursor-pointer outline-none transition hover:-translate-y-1 hover:bg-white/[0.11] focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/20' : ''} ${className}`}
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-cyan-200">{eyebrow}</p>
          <h2 className="mt-2 text-xl font-black text-white">{title}</h2>
        </div>
        {action ? <div>{action}</div> : null}
      </div>
      <div className="h-72 min-h-72 w-full min-w-0 overflow-hidden">
        <ResponsiveContainer width="100%" height={288} minWidth={0}>
          {children}
        </ResponsiveContainer>
      </div>
    </section>
  )
}
