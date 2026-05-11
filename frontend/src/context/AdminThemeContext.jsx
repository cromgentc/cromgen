/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AdminThemeContext = createContext(null)

export function AdminThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('cromgen_admin_theme') || 'dark')

  useEffect(() => {
    localStorage.setItem('cromgen_admin_theme', theme)
  }, [theme])

  const value = useMemo(() => ({
    theme,
    isDark: theme === 'dark',
    toggleTheme: () => setTheme((current) => (current === 'dark' ? 'light' : 'dark')),
  }), [theme])

  return (
    <AdminThemeContext.Provider value={value}>
      {children}
    </AdminThemeContext.Provider>
  )
}

export function useAdminTheme() {
  const context = useContext(AdminThemeContext)
  if (!context) {
    throw new Error('useAdminTheme must be used inside AdminThemeProvider')
  }

  return context
}
