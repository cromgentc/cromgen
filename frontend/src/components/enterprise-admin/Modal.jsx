import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

export function Modal({ open, title, children, onClose }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] grid place-items-center overflow-y-auto bg-slate-950/70 p-4 backdrop-blur-xl">
          <motion.section
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            className="my-6 max-h-[calc(100vh-3rem)] w-full max-w-3xl overflow-y-auto rounded-[32px] border border-white/10 bg-slate-950/95 p-6 text-white shadow-2xl shadow-black/40"
          >
            <div className="sticky top-0 z-10 -mx-6 -mt-6 mb-6 flex items-center justify-between rounded-t-[32px] border-b border-white/10 bg-slate-950/95 px-6 py-5 backdrop-blur-xl">
              <h2 className="text-2xl font-black">{title}</h2>
              <button type="button" onClick={onClose} className="grid h-10 w-10 place-items-center rounded-2xl bg-white/10 text-slate-200 hover:bg-white/15" aria-label="Close modal">
                <X size={18} />
              </button>
            </div>
            {children}
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
