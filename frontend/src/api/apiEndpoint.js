import axios from 'axios'

export const API_ENDPOINT = (import.meta.env.VITE_API_ENDPOINT || '').replace(/\/$/, '')

export const apiClient = axios.create({
  baseURL: API_ENDPOINT || '/',
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('cromgen_auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const AUTH_ENDPOINTS = {
  adminRegister: '/api/auth/admin/register',
  adminLogin: '/api/auth/admin/login',
  staffLogin: '/api/auth/staff/login',
  currentUser: '/api/auth/me',
  updateCurrentUser: '/api/auth/me',
  settingsUsers: '/api/settings/users',
  settingsUserStatus: (id) => `/api/settings/users/${encodeURIComponent(id)}/status`,
  settingsUserDelete: (id) => `/api/settings/users/${encodeURIComponent(id)}`,
  vendorRegister: '/api/auth/vendor/register',
  vendorLogin: '/api/auth/vendor/login',
}

export const VENDOR_ENDPOINTS = {
  settingsList: '/api/settings/vendors',
  settingsStatus: (id) => `/api/settings/vendors/${encodeURIComponent(id)}/status`,
  settingsDelete: (id) => `/api/settings/vendors/${encodeURIComponent(id)}`,
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
  try {
    const isJsonBody = typeof options.body === 'string'
    const response = await apiClient.request({
      url: path,
      method: options.method || 'GET',
      data: isJsonBody ? JSON.parse(options.body) : options.body || options.data,
      headers: options.headers,
    })

    return response.data
  } catch (error) {
    const message = error.response?.data?.message || 'Request failed'
    if (/^api route not found$/i.test(message)) {
      throw new Error('Updated backend route is not loaded yet. Please restart the backend server once.', { cause: error })
    }

    throw new Error(message, { cause: error })
  }
}
