import axios from 'axios'

const fallbackApiEndpoint = import.meta.env.DEV ? '' : 'https://cromgen.onrender.com'

export const API_ENDPOINT = (import.meta.env.VITE_API_ENDPOINT || fallbackApiEndpoint).replace(/\/$/, '')

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
  unifiedLogin: '/api/auth/login',
  adminRegister: '/api/auth/admin/register',
  userRegister: '/api/auth/user/register',
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
  settingsDetail: (slug) => `/api/settings/news-posts/${encodeURIComponent(slug)}`,
  settingsDelete: (slug) => `/api/settings/news-posts/${slug}`,
}

export const LEAD_ENDPOINTS = {
  publicCreate: '/api/leads',
  sendOtp: '/api/leads/otp/send',
  verifyOtp: '/api/leads/otp/verify',
  settingsList: '/api/settings/leads',
  settingsDeleteAll: '/api/settings/leads',
  settingsDelete: (id) => `/api/settings/leads/${encodeURIComponent(id)}`,
}

export const SERVICE_SAMPLE_ENDPOINTS = {
  publicList: '/api/service-samples',
  settingsList: '/api/settings/service-samples',
  settingsDetail: (slug) => `/api/settings/service-samples/${encodeURIComponent(slug)}`,
  settingsDelete: (slug) => `/api/settings/service-samples/${encodeURIComponent(slug)}`,
}

export const APPLICATION_ENDPOINTS = {
  publicCreate: '/api/applications',
  settingsList: '/api/settings/applications',
  settingsDetail: (id) => `/api/settings/applications/${encodeURIComponent(id)}`,
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
  settingsPreview: '/api/settings/contracts/preview',
  settingsDetail: (token) => `/api/settings/contracts/${encodeURIComponent(token)}`,
  settingsDelete: (token) => `/api/settings/contracts/${encodeURIComponent(token)}`,
  publicSignDetail: (token) => `/api/contracts/${encodeURIComponent(token)}`,
  publicCompanySign: (token) => `/api/contracts/${encodeURIComponent(token)}/company-sign`,
  publicFile: (token) => `/api/contracts/${encodeURIComponent(token)}/file`,
  publicHtml: (token) => `/api/contracts/${encodeURIComponent(token)}/html`,
  publicSignedFile: (token) => `/api/contracts/${encodeURIComponent(token)}/signed-file`,
}

export const PROJECT_ENDPOINTS = {
  publicList: '/api/projects',
  publicApply: (id) => `/api/projects/${encodeURIComponent(id)}/apply`,
  settingsList: '/api/settings/projects',
  settingsDetail: (id) => `/api/settings/projects/${encodeURIComponent(id)}`,
  settingsDelete: (id) => `/api/settings/projects/${encodeURIComponent(id)}`,
}

export const SITE_ENDPOINTS = {
  publicDetail: '/api/site-settings',
  settingsDetail: '/api/settings/site',
}

export const WORKFORCE_ENDPOINTS = {
  settingsList: (type) => `/api/settings/workforce/${encodeURIComponent(type)}`,
  settingsDetail: (type, id) => `/api/settings/workforce/${encodeURIComponent(type)}/${encodeURIComponent(id)}`,
  publicList: (type) => `/api/support/${encodeURIComponent(type)}`,
  publicCreate: (type) => `/api/support/${encodeURIComponent(type)}`,
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
