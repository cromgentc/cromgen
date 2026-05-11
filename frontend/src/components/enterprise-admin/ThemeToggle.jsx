import { Moon, Sun } from 'lucide-react'
import { useAdminTheme } from '../../context/AdminThemeContext.jsx'

export function ThemeToggle() {
  const { isDark, toggleTheme } = useAdminTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-11 items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-3 text-sm font-semibold text-white shadow-lg shadow-black/10 backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/15 dark:text-white"
      aria-label="Toggle theme"
    >
      {isDark ? <Moon size={18} /> : <Sun size={18} />}
      <span className="hidden lg:inline">{isDark ? 'Dark' : 'Light'}</span>
    </button>
  )
}
