import { motion } from 'framer-motion'

export function Loader() {
  return (
    <div className="grid min-h-screen place-items-center bg-slate-950 text-white">
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
          className="mx-auto h-16 w-16 rounded-full border-4 border-cyan-300/20 border-t-cyan-300"
        />
        <h1 className="mt-6 text-2xl font-black">Launching Cromgen Command Center</h1>
        <p className="mt-2 text-sm text-slate-400">Syncing AI insights, revenue streams, and live operations.</p>
      </div>
    </div>
  )
}

export function SkeletonBlock({ className = '' }) {
  return <div className={`animate-pulse rounded-3xl bg-white/10 ${className}`} />
}
