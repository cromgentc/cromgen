export const API_ENDPOINT = (import.meta.env.VITE_API_ENDPOINT || '').replace(/\/$/, '')

export const AUTH_ENDPOINTS = {
  adminRegister: '/api/auth/admin/register',
  adminLogin: '/api/auth/admin/login',
  staffLogin: '/api/auth/staff/login',
  currentUser: '/api/auth/me',
  settingsUsers: '/api/settings/users',
  settingsUserStatus: (id) => `/api/settings/users/${encodeURIComponent(id)}/status`,
  settingsUserDelete: (id) => `/api/settings/users/${encodeURIComponent(id)}`,
  vendorRegister: '/api/auth/vendor/register',
  vendorLogin: '/api/auth/vendor/login',
}

export const POLICY_ENDPOINTS = {
  publicDetail: (slug) => `/api/policies/${slug}`,
  settingsList: '/api/settings/policies',
  settingsDetail: (slug) => `/api/settings/policies/${slug}`,
}

export const NEWS_ENDPOINTS = {
  publicList: '/api/news-posts',
  settingsList: '/api/settings/news-posts',
  settingsDelete: (slug) => `/api/settings/news-posts/${slug}`,
}

export const LEAD_ENDPOINTS = {
  publicCreate: '/api/leads',
  settingsList: '/api/settings/leads',
  settingsDeleteAll: '/api/settings/leads',
  settingsDelete: (id) => `/api/settings/leads/${encodeURIComponent(id)}`,
}

export const APPLICATION_ENDPOINTS = {
  publicCreate: '/api/applications',
  settingsList: '/api/settings/applications',
  settingsDeleteAll: '/api/settings/applications',
  settingsDelete: (id) => `/api/settings/applications/${encodeURIComponent(id)}`,
  settingsResume: (id) => `/api/settings/applications/${encodeURIComponent(id)}/resume`,
  settingsResumeDownload: (id) => `/api/settings/applications/${encodeURIComponent(id)}/resume/download`,
}

export const JOB_ENDPOINTS = {
  publicList: '/api/jobs',
  settingsList: '/api/settings/jobs',
  settingsDetail: (slug) => `/api/settings/jobs/${encodeURIComponent(slug)}`,
  settingsDeleteAll: '/api/settings/jobs',
  settingsDelete: (slug) => `/api/settings/jobs/${slug}`,
}

export const CONTRACT_ENDPOINTS = {
  settingsList: '/api/settings/contracts',
  settingsDetail: (token) => `/api/settings/contracts/${encodeURIComponent(token)}`,
  settingsDelete: (token) => `/api/settings/contracts/${encodeURIComponent(token)}`,
  publicSignDetail: (token) => `/api/contracts/${encodeURIComponent(token)}`,
  publicCompanySign: (token) => `/api/contracts/${encodeURIComponent(token)}/company-sign`,
  publicFile: (token) => `/api/contracts/${encodeURIComponent(token)}/file`,
  publicHtml: (token) => `/api/contracts/${encodeURIComponent(token)}/html`,
  publicSignedFile: (token) => `/api/contracts/${encodeURIComponent(token)}/signed-file`,
}

export const SITE_ENDPOINTS = {
  publicDetail: '/api/site-settings',
  settingsDetail: '/api/settings/site',
}

export async function apiRequest(path, options = {}) {
  const token = localStorage.getItem('cromgen_auth_token')
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${API_ENDPOINT}${path}`, {
    ...options,
    headers,
  })
  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    const message = data.message || 'Request failed'
    if (/^api route not found$/i.test(message)) {
      throw new Error('Updated backend route is not loaded yet. Please restart the backend server once.')
    }

    throw new Error(message)
  }

  return data
}
