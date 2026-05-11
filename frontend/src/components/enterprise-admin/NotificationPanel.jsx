import { AnimatePresence, motion } from 'framer-motion'
import { Bell, X } from 'lucide-react'

export function NotificationPanel({ open, notifications = [], onClose }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.aside
          initial={{ x: 420, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 420, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          className="fixed bottom-0 right-0 top-0 z-[60] w-full max-w-md border-l border-white/10 bg-slate-950/90 p-6 text-white shadow-2xl shadow-black/40 backdrop-blur-2xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-cyan-200">Command Alerts</p>
              <h2 className="mt-2 text-2xl font-black">Notifications</h2>
            </div>
            <button type="button" onClick={onClose} className="grid h-10 w-10 place-items-center rounded-2xl bg-white/10 text-slate-300 hover:bg-white/15" aria-label="Close notifications">
              <X size={18} />
            </button>
          </div>

          <div className="mt-8 space-y-3">
            {notifications.length ? notifications.map((item) => (
              <article key={item.title} className="rounded-3xl border border-white/10 bg-white/[0.07] p-4">
                <div className="flex gap-3">
                  <span className={`mt-1 h-3 w-3 shrink-0 rounded-full ${item.tone}`}></span>
                  <div>
                    <h3 className="font-black">{item.title}</h3>
                    <p className="mt-1 text-sm text-slate-400">{item.meta}</p>
                  </div>
                </div>
              </article>
            )) : (
              <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-5 text-sm font-semibold text-slate-400">
                No notification records are available.
              </div>
            )}
          </div>

          <div className="mt-6 rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-5">
            <Bell className="text-cyan-200" />
            <h3 className="mt-4 font-black">Live summary</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              {notifications.length ? `${notifications.length} live records need admin attention.` : 'Live collections synced. No pending alert found.'}
            </p>
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  )
}
